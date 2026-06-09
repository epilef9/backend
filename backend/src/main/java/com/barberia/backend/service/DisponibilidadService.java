package com.barberia.backend.service;

import com.barberia.backend.entity.Disponibilidad;
import com.barberia.backend.repository.DisponibilidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DisponibilidadService {
    
    @Autowired
    private DisponibilidadRepository disponibilidadRepository;
    
    // Obtener todas las disponibilidades
    public List<Disponibilidad> obtenerTodas() {
        return disponibilidadRepository.findAll();
    }
    
    // Obtener disponibilidad por ID
    public Optional<Disponibilidad> obtenerPorId(Long id) {
        return disponibilidadRepository.findById(id);
    }
    
    // Guardar disponibilidad
    public Disponibilidad guardar(Disponibilidad disponibilidad) {
        return disponibilidadRepository.save(disponibilidad);
    }
    
    // Actualizar disponibilidad
    public Disponibilidad actualizar(Long id, Disponibilidad disponibilidadActualizada) {
        Optional<Disponibilidad> disponibilidadExistente = disponibilidadRepository.findById(id);
        if (disponibilidadExistente.isPresent()) {
            Disponibilidad disponibilidad = disponibilidadExistente.get();
            disponibilidad.setDiaSemanai(disponibilidadActualizada.getDiaSemanai());
            disponibilidad.setHoraInicio(disponibilidadActualizada.getHoraInicio());
            disponibilidad.setHoraFin(disponibilidadActualizada.getHoraFin());
            return disponibilidadRepository.save(disponibilidad);
        }
        return null;
    }
    
    // Eliminar disponibilidad
    public void eliminar(Long id) {
        disponibilidadRepository.deleteById(id);
    }
}