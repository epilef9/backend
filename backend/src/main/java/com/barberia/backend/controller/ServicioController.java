package com.barberia.backend.controller;

import com.barberia.backend.entity.Servicio;
import com.barberia.backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {
    
    @Autowired
    private ServicioService servicioService;
    
    // GET todos los servicios
    @GetMapping
    public ResponseEntity<List<Servicio>> obtenerTodos() {
        List<Servicio> servicios = servicioService.obtenerTodos();
        return ResponseEntity.ok(servicios);
    }
    
    // GET servicio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerPorId(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.obtenerPorId(id);
        return servicio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST crear servicio
    @PostMapping
    public ResponseEntity<Servicio> crear(@RequestBody Servicio servicio) {
        Servicio servicioCreado = servicioService.guardar(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(servicioCreado);
    }
    
    // PUT actualizar servicio
    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(@PathVariable Long id, @RequestBody Servicio servicioActualizado) {
        Servicio servicio = servicioService.actualizar(id, servicioActualizado);
        if (servicio != null) {
            return ResponseEntity.ok(servicio);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE servicio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}