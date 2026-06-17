package com.barberia.backend.dto;

import lombok.Data;

import lombok.AllArgsConstructor;



@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String email;
    private String nombre;
    private String rol;
}