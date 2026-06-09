package com.barberia.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.backend.entity.Turno;
import com.barberia.backend.repository.TurnoRepository;

@Service
public class TurnoService {
    
    @Autowired
    private TurnoRepository turnoRepository;
    
    // Obtener todos los turnos
    public List<Turno> obtenerTodos() {
        return turnoRepository.findAll();
    }
    
    // Obtener turno por ID
    public Optional<Turno> obtenerPorId(Long id) {
        return turnoRepository.findById(id);
    }
    
    // Obtener turnos por cliente
    public List<Turno> obtenerPorCliente(Long clienteId) {
        return turnoRepository.findByClienteId(clienteId);
    }
    
    // Obtener turnos por barbero
    public List<Turno> obtenerPorBarbero(Long barberoId) {
        return turnoRepository.findByBarberoId(barberoId);
    }
    
    // Guardar turno
    public Turno guardar(Turno turno) {
        return turnoRepository.save(turno);
    }
    
    // Actualizar turno
    public Turno actualizar(Long id, Turno turnoActualizado) {
        Optional<Turno> turnoExistente = turnoRepository.findById(id);
        if (turnoExistente.isPresent()) {
            Turno turno = turnoExistente.get();
            turno.setFechaHora(turnoActualizado.getFechaHora());
            turno.setEstado(turnoActualizado.getEstado());
            return turnoRepository.save(turno);
        }
        return null;
    }
    
    // Eliminar turno
    public void eliminar(Long id) {
        turnoRepository.deleteById(id);
    }
}