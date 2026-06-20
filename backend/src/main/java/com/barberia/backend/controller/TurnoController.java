package com.barberia.backend.controller;

import com.barberia.backend.dto.TurnoDto;
import com.barberia.backend.entity.Turno;
import com.barberia.backend.entity.Usuario;
import com.barberia.backend.entity.Servicio;
import com.barberia.backend.repository.UsuarioRepository;
import com.barberia.backend.repository.ServicioRepository;
import com.barberia.backend.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {
    
    @Autowired
    private TurnoService turnoService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    private TurnoDto convertToDto(Turno turno) {
        TurnoDto dto = new TurnoDto();
        dto.setId(Long.valueOf(turno.getId()));
        dto.setCliente(turno.getCliente().getNombre());
        dto.setTelefono(turno.getCliente().getTelefono());
        dto.setFecha(turno.getFechaHora().toLocalDate().toString());
        dto.setHora(turno.getFechaHora().toLocalTime().toString());
        dto.setServicio(turno.getServicio().getNombre());
        dto.setPeluquero(turno.getBarbero().getNombre());
        
        String estadoMap = turno.getEstado().name();
        dto.setEstado(estadoMap.substring(0, 1).toUpperCase() + estadoMap.substring(1).toLowerCase());
        return dto;
    }

    private Turno convertToEntity(TurnoDto dto) {
        Turno turno = new Turno();

        // Cliente
        Usuario cliente;
        String emailTemporal = dto.getCliente().replaceAll("\\s+", "").toLowerCase() + "@temp.com";
        var clienteOpt = usuarioRepository.findByEmail(emailTemporal);
        if (clienteOpt.isEmpty()) {
            cliente = new Usuario();
            cliente.setNombre(dto.getCliente());
            cliente.setTelefono(dto.getTelefono());
            cliente.setEmail(emailTemporal);
            cliente.setPassword("123456");
            cliente.setRol(Usuario.Rol.CLIENTE);
            usuarioRepository.save(cliente);
        } else {
            cliente = clienteOpt.get();
        }
        turno.setCliente(cliente);

        // Barbero
        List<Usuario> barberos = usuarioRepository.findAll().stream()
            .filter(u -> u.getNombre().equalsIgnoreCase(dto.getPeluquero()))
            .collect(Collectors.toList());
        if (!barberos.isEmpty()) {
            turno.setBarbero(barberos.get(0));
        } else {
            turno.setBarbero(usuarioRepository.findByEmail("admin@barberia.com").orElse(cliente));
        }

        // Servicio
        List<Servicio> servicios = servicioRepository.findAll().stream()
            .filter(s -> s.getNombre().equalsIgnoreCase(dto.getServicio()))
            .collect(Collectors.toList());
        if (!servicios.isEmpty()) {
            turno.setServicio(servicios.get(0));
        } else {
            if(servicioRepository.count() > 0) {
               turno.setServicio(servicioRepository.findAll().get(0));
            }
        }

        // Fecha Hora
        if (dto.getFecha() != null && dto.getHora() != null) {
            LocalDate fecha = LocalDate.parse(dto.getFecha());
            LocalTime hora = LocalTime.parse(dto.getHora());
            turno.setFechaHora(LocalDateTime.of(fecha, hora));
        } else {
             turno.setFechaHora(LocalDateTime.now());
        }

        // Estado
        if (dto.getEstado() != null) {
            turno.setEstado(Turno.Estado.valueOf(dto.getEstado().toUpperCase()));
        } else {
            turno.setEstado(Turno.Estado.PENDIENTE);
        }

        return turno;
    }

    @GetMapping
    public ResponseEntity<List<TurnoDto>> obtenerTodos() {
        List<TurnoDto> turnos = turnoService.obtenerTodos().stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(turnos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> obtenerPorId(@PathVariable Long id) {
        return turnoService.obtenerPorId(id).map(this::convertToDto).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<TurnoDto>> obtenerPorCliente(@PathVariable Long clienteId) {
        List<TurnoDto> turnos = turnoService.obtenerPorCliente(clienteId).stream()
                .map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(turnos);
    }
    
    @GetMapping("/barbero/{barberoId}")
    public ResponseEntity<List<TurnoDto>> obtenerPorBarbero(@PathVariable Long barberoId) {
        List<TurnoDto> turnos = turnoService.obtenerPorBarbero(barberoId).stream()
                .map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(turnos);
    }
    
    @PostMapping
    public ResponseEntity<TurnoDto> crear(@RequestBody TurnoDto dto) {
        Turno turno = convertToEntity(dto);
        Turno turnoCreado = turnoService.guardar(turno);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(turnoCreado));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TurnoDto> actualizar(@PathVariable Long id, @RequestBody TurnoDto dto) {
        Turno turnoActualizado = convertToEntity(dto);
        Turno turno = turnoService.actualizar(id, turnoActualizado);
        if (turno != null) {
            return ResponseEntity.ok(convertToDto(turno));
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        turnoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
