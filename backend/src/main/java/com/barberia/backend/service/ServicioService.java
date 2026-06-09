package com.barberia.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.backend.entity.Servicio;
import com.barberia.backend.repository.ServicioRepository;

@Service
public class ServicioService {
    
    @Autowired
    private ServicioRepository servicioRepository;
    
    // Obtener todos los servicios
    public List<Servicio> obtenerTodos() {
        return servicioRepository.findAll();
    }
    
    // Obtener servicio por ID
    public Optional<Servicio> obtenerPorId(Long id) {
        return servicioRepository.findById(id);
    }
    
    // Guardar servicio
    public Servicio guardar(Servicio servicio) {
        return servicioRepository.save(servicio);
    }
    
    // Actualizar servicio
    public Servicio actualizar(Long id, Servicio servicioActualizado) {
        Optional<Servicio> servicioExistente = servicioRepository.findById(id);
        if (servicioExistente.isPresent()) {
            Servicio servicio = servicioExistente.get();
            servicio.setNombre(servicioActualizado.getNombre());
            servicio.setDescripcion(servicioActualizado.getDescripcion());
            servicio.setPrecio(servicioActualizado.getPrecio());
            servicio.setDuracionMinutos(servicioActualizado.getDuracionMinutos());
            return servicioRepository.save(servicio);
        }
        return null;
    }
    
    // Eliminar servicio
    public void eliminar(Long id) {
        servicioRepository.deleteById(id);
    }
}
