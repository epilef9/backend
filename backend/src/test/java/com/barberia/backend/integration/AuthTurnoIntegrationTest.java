package com.barberia.backend.integration;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import jakarta.servlet.Filter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.barberia.backend.config.SecurityConfig;
import com.barberia.backend.controller.AuthController;
import com.barberia.backend.controller.TurnoController;
import com.barberia.backend.entity.Servicio;
import com.barberia.backend.entity.Turno;
import com.barberia.backend.entity.Usuario;
import com.barberia.backend.repository.ServicioRepository;
import com.barberia.backend.repository.TurnoRepository;
import com.barberia.backend.repository.UsuarioRepository;
import com.barberia.backend.security.JwtTokenProvider;
import com.barberia.backend.service.TurnoService;
import com.barberia.backend.service.UsuarioService;

/**
 * Tests de integración: se levanta el "stack" real de Spring MVC
 * (Controller -> Service -> Security/JWT/BCrypt) y SOLO se mockean los repositorios,
 * que son los que hablan con la base de datos.
 *
 * Nota: JwtAuthenticationFilter (@Component) lo detecta @WebMvcTest solo, por eso no se importa.
 */
@WebMvcTest(controllers = { AuthController.class, TurnoController.class })
@Import({ SecurityConfig.class, JwtTokenProvider.class, UsuarioService.class, TurnoService.class })
class AuthTurnoIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    // Cadena de filtros de Spring Security (incluye JwtAuthenticationFilter, ver SecurityConfig)
    @Autowired
    @Qualifier("springSecurityFilterChain")
    private Filter springSecurityFilterChain;

    private MockMvc mockMvc;

    @Autowired
    private PasswordEncoder passwordEncoder; // BCrypt real, definido en SecurityConfig

    @Autowired
    private JwtTokenProvider jwtTokenProvider; // real

    // Únicos mocks: la capa de acceso a la BD
    @MockitoBean
    private UsuarioRepository usuarioRepository;

    @MockitoBean
    private ServicioRepository servicioRepository;

    @MockitoBean
    private TurnoRepository turnoRepository;

    @BeforeEach
    void setUp() {
        // Armamos el MockMvc a mano con UN solo filtro: la cadena de Spring Security, igual que en producción.
        // Con el MockMvc autoconfigurado, JwtAuthenticationFilter (@Component) se agrega además como filtro
        // suelto y puede ejecutarse antes que la cadena, que le borra la autenticación -> 403 con token válido.
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilters(springSecurityFilterChain)
                .build();
    }

    private Usuario usuario(int id, String nombre, String email, String passwordHash, Usuario.Rol rol) {
        Usuario u = new Usuario();
        u.setId(id);
        u.setNombre(nombre);
        u.setEmail(email);
        u.setPassword(passwordHash);
        u.setRol(rol);
        return u;
    }

    // Test de integración 1
    @Test
    void postLogin_conCredencialesValidas_devuelve200YUnJwt() throws Exception {
        Usuario ana = usuario(1, "Ana", "ana@test.com", passwordEncoder.encode("secreta123"), Usuario.Rol.CLIENTE);
        when(usuarioRepository.findByEmail("ana@test.com")).thenReturn(Optional.of(ana));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"ana@test.com","password":"secreta123"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("ana@test.com"))
                .andExpect(jsonPath("$.rol").value("CLIENTE"))
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    // Test de integración 2
    @Test
    void postLogin_conPasswordIncorrecta_devuelve401() throws Exception {
        Usuario ana = usuario(1, "Ana", "ana@test.com", passwordEncoder.encode("secreta123"), Usuario.Rol.CLIENTE);
        when(usuarioRepository.findByEmail("ana@test.com")).thenReturn(Optional.of(ana));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"ana@test.com","password":"otra-clave"}
                                """))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("incorrecta")));
    }

    // Test de integración 3
    @Test
    void getTurnos_conJwtValido_devuelveLosTurnosConvertidosADto() throws Exception {
        Usuario cliente = usuario(1, "Ana", "ana@test.com", "hash", Usuario.Rol.CLIENTE);
        Usuario barbero = usuario(2, "Carlos", "carlos@test.com", "hash", Usuario.Rol.BARBERO);
        Servicio servicio = new Servicio(1, "Corte", "Corte clasico", new BigDecimal("15.00"), 30);

        Turno turno = new Turno();
        turno.setId(10);
        turno.setCliente(cliente);
        turno.setBarbero(barbero);
        turno.setServicio(servicio);
        turno.setFechaHora(LocalDateTime.of(2026, 10, 5, 10, 30));
        turno.setEstado(Turno.Estado.CONFIRMADO);
        when(turnoRepository.findAll()).thenReturn(List.of(turno));

        // Token generado por el JwtTokenProvider real: pasa por JwtAuthenticationFilter + SecurityConfig
        String token = jwtTokenProvider.generateToken("ana@test.com");

        mockMvc.perform(get("/api/turnos").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(10))
                .andExpect(jsonPath("$[0].cliente").value("Ana"))
                .andExpect(jsonPath("$[0].peluquero").value("Carlos"))
                .andExpect(jsonPath("$[0].servicio").value("Corte"))
                .andExpect(jsonPath("$[0].fecha").value("2026-10-05"))
                .andExpect(jsonPath("$[0].hora").value("10:30"))
                .andExpect(jsonPath("$[0].estado").value("Confirmado"));
    }
}