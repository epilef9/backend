package com.barberia.backend.dto;

import lombok.Data;

import lombok.AllArgsConstructor;



@Data
@AllArgsConstructor
public class LoginResponse {
    private Integer id;
    private String token;
    private String email;
    private String nombre;
    private String rol;
    private String telefono;
    private String descripcion;
    private String imagenUrl;
}