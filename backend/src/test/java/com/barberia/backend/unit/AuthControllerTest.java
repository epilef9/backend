package com.barberia.backend.unit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.barberia.backend.controller.AuthController;
import com.barberia.backend.dto.LoginRequest;
import com.barberia.backend.dto.LoginResponse;
import com.barberia.backend.entity.Usuario;
import com.barberia.backend.security.JwtTokenProvider;
import com.barberia.backend.service.UsuarioService;

/**
 * Tests unitarios de AuthController.login().
 * Se testea UN método y se mockean todas las dependencias externas
 * (servicio de usuarios, generador de JWT y encoder de contraseñas).
 */
@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    private LoginRequest loginRequest(String email, String password) {
        LoginRequest request = new LoginRequest();
        request.setEmail(email);
        request.setPassword(password);
        return request;
    }

    private Usuario usuarioCliente() {
        Usuario usuario = new Usuario();
        usuario.setId(1);
        usuario.setNombre("Ana");
        usuario.setEmail("ana@test.com");
        usuario.setPassword("hash-bcrypt");
        usuario.setRol(Usuario.Rol.CLIENTE);
        return usuario;
    }

    // Test unitario 1
    @Test
    void login_conCredencialesValidas_devuelve200ConTokenYDatosDelUsuario() {
        when(usuarioService.obtenerPorEmail("ana@test.com")).thenReturn(Optional.of(usuarioCliente()));
        when(passwordEncoder.matches("secreta123", "hash-bcrypt")).thenReturn(true);
        when(jwtTokenProvider.generateToken("ana@test.com")).thenReturn("token-falso");

        ResponseEntity<?> response = authController.login(loginRequest("ana@test.com", "secreta123"));

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        LoginResponse body = (LoginResponse) response.getBody();
        assertThat(body).isNotNull();
        assertThat(body.getToken()).isEqualTo("token-falso");
        assertThat(body.getEmail()).isEqualTo("ana@test.com");
        assertThat(body.getRol()).isEqualTo("CLIENTE");
    }

    // Test unitario 2
    @Test
    void login_conEmailInexistente_devuelve401YNoGeneraToken() {
        when(usuarioService.obtenerPorEmail("nadie@test.com")).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.login(loginRequest("nadie@test.com", "secreta123"));

        assertThat(response.getStatusCode().value()).isEqualTo(401);
        assertThat(response.getBody()).isEqualTo("Usuario no encontrado");
        verifyNoInteractions(passwordEncoder, jwtTokenProvider);
    }

    // Test unitario 3
    @Test
    void login_conPasswordIncorrecta_devuelve401YNoGeneraToken() {
        when(usuarioService.obtenerPorEmail("ana@test.com")).thenReturn(Optional.of(usuarioCliente()));
        when(passwordEncoder.matches("clave-mala", "hash-bcrypt")).thenReturn(false);

        ResponseEntity<?> response = authController.login(loginRequest("ana@test.com", "clave-mala"));

        assertThat(response.getStatusCode().value()).isEqualTo(401);
        assertThat(response.getBody()).isEqualTo("Contraseña incorrecta");
        verify(jwtTokenProvider, never()).generateToken(anyString());
    }
}
