package com.barberia.backend.service;

import com.barberia.backend.entity.Usuario;
import com.barberia.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Obtener todos los usuarios
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }
    
    // Obtener usuario por ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    // Obtener usuario por email
    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    
    // Guardar usuario
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    // Actualizar usuario
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setTelefono(usuarioActualizado.getTelefono());
            return usuarioRepository.save(usuario);
        }
        return null;
    }
    
    // Eliminar usuario
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}