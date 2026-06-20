package com.barberia.backend.config;

import com.barberia.backend.entity.Servicio;
import com.barberia.backend.entity.Usuario;
import com.barberia.backend.repository.ServicioRepository;
import com.barberia.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Optional;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initData(UsuarioRepository usuarioRepository, ServicioRepository servicioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<Usuario> adminOptional = usuarioRepository.findByEmail("admin@barberia.com");
            if (adminOptional.isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("Carlos López");
                admin.setEmail("admin@barberia.com");
                admin.setPassword(passwordEncoder.encode("admin123")); // Contraseña por defecto
                admin.setTelefono("1234567890");
                admin.setRol(Usuario.Rol.ADMIN);
                
                usuarioRepository.save(admin);
                System.out.println("Usuario ADMIN creado exitosamente: admin@barberia.com / admin123");
            }

            // Sembrar Servicios si no existen
            if (servicioRepository.count() == 0) {
                servicioRepository.save(new Servicio(null, "Corte Clásico", "Corte de cabello tradicional", new BigDecimal("15.00"), 30));
                servicioRepository.save(new Servicio(null, "Corte y Barba", "Corte de cabello y perfilado de barba", new BigDecimal("25.00"), 45));
                servicioRepository.save(new Servicio(null, "Perfilado de Barba", "Solo arreglo de barba", new BigDecimal("10.00"), 20));
                servicioRepository.save(new Servicio(null, "Corte Premium", "Corte, lavado y peinado", new BigDecimal("20.00"), 40));
                System.out.println("Servicios por defecto creados exitosamente.");
            }
        };
    }
}