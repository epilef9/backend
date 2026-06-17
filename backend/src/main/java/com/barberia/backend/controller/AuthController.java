package com.barberia.backend.controller;

import com.barberia.backend.dto.LoginRequest;
import com.barberia.backend.dto.LoginResponse;
import com.barberia.backend.dto.RegisterRequest;
import com.barberia.backend.entity.Usuario;
import com.barberia.backend.security.JwtTokenProvider;
import com.barberia.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // POST login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.obtenerPorEmail(loginRequest.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }
        
        Usuario usuario = usuarioOpt.get();
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
        
        String token = jwtTokenProvider.generateToken(usuario.getEmail());
        
        LoginResponse response = new LoginResponse(
            token,
            usuario.getEmail(),
            usuario.getNombre(),
            usuario.getRol()
        );
        
        return ResponseEntity.ok(response);
    }
    
    // POST register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        Optional<Usuario> usuarioExistente = usuarioService.obtenerPorEmail(registerRequest.getEmail());
        
        if (usuarioExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email ya está registrado");
        }
        
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(registerRequest.getNombre());
        nuevoUsuario.setEmail(registerRequest.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        nuevoUsuario.setTelefono(registerRequest.getTelefono());
        nuevoUsuario.setRol(registerRequest.getRol());
        
        Usuario usuarioCreado = usuarioService.guardar(nuevoUsuario);
        
        String token = jwtTokenProvider.generateToken(usuarioCreado.getEmail());
        
        LoginResponse response = new LoginResponse(
            token,
            usuarioCreado.getEmail(),
            usuarioCreado.getNombre(),
            usuarioCreado.getRol()
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}