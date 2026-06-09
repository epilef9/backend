package com.barberia.backend.service;

import com.barberia.backend.entity.Pago;
import com.barberia.backend.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PagoService {
    
    @Autowired
    private PagoRepository pagoRepository;
    
    // Obtener todos los pagos
    public List<Pago> obtenerTodos() {
        return pagoRepository.findAll();
    }
    
    // Obtener pago por ID
    public Optional<Pago> obtenerPorId(Long id) {
        return pagoRepository.findById(id);
    }
    
    // Guardar pago
    public Pago guardar(Pago pago) {
        return pagoRepository.save(pago);
    }
    
    // Actualizar pago
    public Pago actualizar(Long id, Pago pagoActualizado) {
        Optional<Pago> pagoExistente = pagoRepository.findById(id);
        if (pagoExistente.isPresent()) {
            Pago pago = pagoExistente.get();
            pago.setMonto(pagoActualizado.getMonto());
            pago.setMetodoPago(pagoActualizado.getMetodoPago());
            pago.setEstado(pagoActualizado.getEstado());
            pago.setFechaPago(pagoActualizado.getFechaPago());
            return pagoRepository.save(pago);
        }
        return null;
    }
    
    // Eliminar pago
    public void eliminar(Long id) {
        pagoRepository.deleteById(id);
    }
}