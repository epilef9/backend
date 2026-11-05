package com.barberia.backend.unit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.barberia.backend.entity.Usuario;
import com.barberia.backend.repository.UsuarioRepository;
import com.barberia.backend.service.UsuarioService;

/**
 * Tests unitarios de UsuarioService.actualizar().
 * El repositorio (acceso a la BD) se mockea: no se toca ninguna base real.
 */
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    // Test unitario 4
    @Test
    void actualizar_cuandoElUsuarioExiste_copiaLosCamposYGuarda() {
        Usuario existente = new Usuario();
        existente.setId(1);
        existente.setNombre("Ana");
        existente.setEmail("ana@test.com");
        existente.setPassword("hash-original");
        existente.setRol(Usuario.Rol.CLIENTE);

        Usuario cambios = new Usuario();
        cambios.setNombre("Ana María");
        cambios.setEmail("ana.maria@test.com");
        cambios.setTelefono("1122334455");
        cambios.setDescripcion("Clienta frecuente");
        cambios.setImagenUrl("http://img/ana.png");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Usuario resultado = usuarioService.actualizar(1L, cambios);

        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        verify(usuarioRepository).save(captor.capture());
        Usuario guardado = captor.getValue();

        assertThat(resultado).isSameAs(guardado);
        assertThat(guardado.getNombre()).isEqualTo("Ana María");
        assertThat(guardado.getEmail()).isEqualTo("ana.maria@test.com");
        assertThat(guardado.getTelefono()).isEqualTo("1122334455");
        assertThat(guardado.getDescripcion()).isEqualTo("Clienta frecuente");
        assertThat(guardado.getImagenUrl()).isEqualTo("http://img/ana.png");
        // actualizar() no debe tocar ni la contraseña ni el rol
        assertThat(guardado.getPassword()).isEqualTo("hash-original");
        assertThat(guardado.getRol()).isEqualTo(Usuario.Rol.CLIENTE);
    }

    // Test unitario 5
    @Test
    void actualizar_cuandoElUsuarioNoExiste_devuelveNullYNoGuarda() {
        when(usuarioRepository.findById(99L)).thenReturn(Optional.empty());

        Usuario resultado = usuarioService.actualizar(99L, new Usuario());

        assertThat(resultado).isNull();
        verify(usuarioRepository, never()).save(any(Usuario.class));
    }
}
