package com.barberia.backend.controller;

import com.barberia.backend.entity.Disponibilidad;
import com.barberia.backend.service.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/disponibilidades")
public class DisponibilidadController {
    
    @Autowired
    private DisponibilidadService disponibilidadService;
    
    // GET todas las disponibilidades
    @GetMapping
    public ResponseEntity<List<Disponibilidad>> obtenerTodas() {
        List<Disponibilidad> disponibilidades = disponibilidadService.obtenerTodas();
        return ResponseEntity.ok(disponibilidades);
    }
    
    // GET disponibilidad por ID
    @GetMapping("/{id}")
    public ResponseEntity<Disponibilidad> obtenerPorId(@PathVariable Long id) {
        Optional<Disponibilidad> disponibilidad = disponibilidadService.obtenerPorId(id);
        return disponibilidad.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST crear disponibilidad
    @PostMapping
    public ResponseEntity<Disponibilidad> crear(@RequestBody Disponibilidad disponibilidad) {
        Disponibilidad disponibilidadCreada = disponibilidadService.guardar(disponibilidad);
        return ResponseEntity.status(HttpStatus.CREATED).body(disponibilidadCreada);
    }
    
    // PUT actualizar disponibilidad
    @PutMapping("/{id}")
    public ResponseEntity<Disponibilidad> actualizar(@PathVariable Long id, @RequestBody Disponibilidad disponibilidadActualizada) {
        Disponibilidad disponibilidad = disponibilidadService.actualizar(id, disponibilidadActualizada);
        if (disponibilidad != null) {
            return ResponseEntity.ok(disponibilidad);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE disponibilidad
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        disponibilidadService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}