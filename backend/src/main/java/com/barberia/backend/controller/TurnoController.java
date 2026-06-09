package com.barberia.backend.controller;

import com.barberia.backend.entity.Turno;
import com.barberia.backend.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {
    
    @Autowired
    private TurnoService turnoService;
    
    // GET todos los turnos
    @GetMapping
    public ResponseEntity<List<Turno>> obtenerTodos() {
        List<Turno> turnos = turnoService.obtenerTodos();
        return ResponseEntity.ok(turnos);
    }
    
    // GET turno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Turno> obtenerPorId(@PathVariable Long id) {
        Optional<Turno> turno = turnoService.obtenerPorId(id);
        return turno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // GET turnos por cliente
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Turno>> obtenerPorCliente(@PathVariable Long clienteId) {
        List<Turno> turnos = turnoService.obtenerPorCliente(clienteId);
        return ResponseEntity.ok(turnos);
    }
    
    // GET turnos por barbero
    @GetMapping("/barbero/{barberoId}")
    public ResponseEntity<List<Turno>> obtenerPorBarbero(@PathVariable Long barberoId) {
        List<Turno> turnos = turnoService.obtenerPorBarbero(barberoId);
        return ResponseEntity.ok(turnos);
    }
    
    // POST crear turno
    @PostMapping
    public ResponseEntity<Turno> crear(@RequestBody Turno turno) {
        Turno turnoCreado = turnoService.guardar(turno);
        return ResponseEntity.status(HttpStatus.CREATED).body(turnoCreado);
    }
    
    // PUT actualizar turno
    @PutMapping("/{id}")
    public ResponseEntity<Turno> actualizar(@PathVariable Long id, @RequestBody Turno turnoActualizado) {
        Turno turno = turnoService.actualizar(id, turnoActualizado);
        if (turno != null) {
            return ResponseEntity.ok(turno);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE turno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        turnoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}