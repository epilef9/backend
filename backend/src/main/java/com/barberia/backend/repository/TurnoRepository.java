package com.barberia.backend.repository;

import com.barberia.backend.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {

    List<Turno> findByClienteId(Long clienteId);

    List<Turno> findByBarberoId(Long barberoId);
}