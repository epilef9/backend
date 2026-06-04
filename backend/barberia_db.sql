CREATE DATABASE barber_db;
USE barber_db;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('ADMIN', 'BARBERO', 'CLIENTE') NOT NULL
);

CREATE TABLE servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion_minutos INT NOT NULL
);

CREATE TABLE disponibilidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    barbero_id INT NOT NULL,
    dia_semana INT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,

    CONSTRAINT fk_disponibilidad_barbero
        FOREIGN KEY (barbero_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);

CREATE TABLE turno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    barbero_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADO', 'CANCELADO', 'COMPLETADO') NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT fk_turno_cliente FOREIGN KEY (cliente_id) REFERENCES usuario(id),

    CONSTRAINT fk_turno_barbero FOREIGN KEY (barbero_id) REFERENCES usuario(id),

    CONSTRAINT fk_turno_servicio FOREIGN KEY (servicio_id) REFERENCES servicio(id)
);

CREATE TABLE pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    turno_id INT NOT NULL UNIQUE, 
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('EFECTIVO', 'MP', 'TRANSFERENCIA') NOT NULL,
    estado ENUM('PENDIENTE', 'PAGADO') NOT NULL DEFAULT 'PENDIENTE',
    fecha_pago DATETIME,

    CONSTRAINT fk_pago_turno
        FOREIGN KEY (turno_id)
        REFERENCES turno(id)
        ON DELETE CASCADE
);