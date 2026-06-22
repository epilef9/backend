# Backend Barbería

## ¿Qué hace el proyecto?
API REST desarrollada en Spring Boot (Java) para la gestión de la barbería. Maneja la lógica de negocio principal, la persistencia de datos conectándose a una base de datos MySQL, y la seguridad (generación y validación de tokens JWT).

## Cómo instalar dependencias
El proyecto utiliza Maven para la gestión de dependencias. Para descargarlas, hay que tener Java instalado y ejecutar en la raíz del backend:

```bash
./mvnw clean install
```

## Cómo ejecutar (comandos)
Para iniciar el servidor localmente (por defecto en el puerto 8080):
```bash
./mvnw spring-boot:run
```

## Endpoints disponibles (Principales)
Base URL: `http://localhost:8080`

**Autenticación (`/api/auth`)**
* `POST /api/auth/login` - Iniciar sesión (Devuelve JWT)
* `POST /api/auth/register` - Registrar usuario

**Usuarios (`/api/usuarios`)**
* `GET /api/usuarios` - Obtener todos los usuarios.
* `GET /api/usuarios/{id}` - Obtener un usuario por su ID.
* `GET /api/usuarios/email/{email}` - Obtener un usuario por su email.
* `POST /api/usuarios` - Crear un nuevo usuario.
* `PUT /api/usuarios/{id}` - Actualizar un usuario existente.
* `DELETE /api/usuarios/{id}` - Eliminar un usuario.

**Turnos (`/api/turnos`)**
* `GET /api/turnos` - Obtener todos los turnos.
* `GET /api/turnos/{id}` - Obtener turno por ID.
* `GET /api/turnos/cliente/{clienteId}` - Obtener turnos de un cliente.
* `GET /api/turnos/barbero/{barberoId}` - Obtener turnos asignados a un barbero.
* `POST /api/turnos` - Crear un nuevo turno (Agendar).
* `PUT /api/turnos/{id}` - Modificar un turno.
* `DELETE /api/turnos/{id}` - Cancelar/eliminar un turno.

**Servicios (`/api/servicios`) (Funcionalidad en desarrollo,sin implementar)**
* `GET`, `POST`, `PUT /{id}`, `DELETE /{id}` para la gestión del catálogo de servicios.

**Disponibilidad (`/api/disponibilidades`) (Funcionalidad en desarrollo,sin implementar)**
* `GET`, `POST`, `PUT /{id}`, `DELETE /{id}` para la gestión de horarios de los barberos.

**Pagos (`/api/pagos`) (Funcionalidad en desarrollo,sin implementar)**
* `GET`, `POST`, `PUT /{id}`, `DELETE /{id}` para el registro de pagos.
