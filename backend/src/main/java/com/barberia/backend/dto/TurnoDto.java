package com.barberia.backend.dto;

import lombok.Data;

@Data
public class TurnoDto {
    private Long id;
    private Integer clienteId;
    private String cliente;
    private String telefono;
    private String fecha;
    private String hora;
    private String servicio;
    private String peluquero;
    private String estado;
}
