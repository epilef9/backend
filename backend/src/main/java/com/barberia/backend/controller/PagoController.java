package com.barberia.backend.controller;

import com.barberia.backend.entity.Pago;
import com.barberia.backend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {
    
    @Autowired
    private PagoService pagoService;
    
    // GET todos los pagos
    @GetMapping
    public ResponseEntity<List<Pago>> obtenerTodos() {
        List<Pago> pagos = pagoService.obtenerTodos();
        return ResponseEntity.ok(pagos);
    }
    
    // GET pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPorId(@PathVariable Long id) {
        Optional<Pago> pago = pagoService.obtenerPorId(id);
        return pago.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST crear pago
    @PostMapping
    public ResponseEntity<Pago> crear(@RequestBody Pago pago) {
        Pago pagoCreado = pagoService.guardar(pago);
        return ResponseEntity.status(HttpStatus.CREATED).body(pagoCreado);
    }
    
    // PUT actualizar pago
    @PutMapping("/{id}")
    public ResponseEntity<Pago> actualizar(@PathVariable Long id, @RequestBody Pago pagoActualizado) {
        Pago pago = pagoService.actualizar(id, pagoActualizado);
        if (pago != null) {
            return ResponseEntity.ok(pago);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE pago
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pagoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}