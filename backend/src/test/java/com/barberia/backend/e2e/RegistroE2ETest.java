package com.barberia.backend.e2e;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.jayway.jsonpath.JsonPath;

/**
 * Test end-to-end sobre el endpoint POST /api/auth/register.
 *
 * Se levanta la aplicación COMPLETA en un puerto aleatorio (Tomcat embebido, Spring Security,
 * JPA/Hibernate y una base H2 en memoria, perfil "test") y se le pega con HTTP real.
 * No hay ningún mock: la petición atraviesa todas las capas hasta la BD y vuelve.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class RegistroE2ETest {

    @Value("${local.server.port}")
    private int port;

    private final HttpClient http = HttpClient.newHttpClient();

    private HttpResponse<String> post(String path, String json) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + path))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        return http.send(request, HttpResponse.BodyHandlers.ofString());
    }

    private String registroJson(String email) {
        return """
                {"nombre":"Usuario E2E","email":"%s","password":"secreta123","telefono":"1155550000","rol":"CLIENTE"}
                """.formatted(email);
    }

    @Test
    void postRegister_creaElUsuario_yLuegoSePuedeLoguear() throws Exception {
        String email = "e2e-" + UUID.randomUUID() + "@test.com";

        // 1) Registro
        HttpResponse<String> registro = post("/api/auth/register", registroJson(email));

        assertThat(registro.statusCode()).isEqualTo(201);
        assertThat((String) JsonPath.read(registro.body(), "$.email")).isEqualTo(email);
        assertThat((String) JsonPath.read(registro.body(), "$.rol")).isEqualTo("CLIENTE");
        assertThat((String) JsonPath.read(registro.body(), "$.token")).isNotBlank();

        // 2) Login con los mismos datos: prueba que el usuario quedó persistido en la BD
        HttpResponse<String> login = post("/api/auth/login", """
                {"email":"%s","password":"secreta123"}
                """.formatted(email));

        assertThat(login.statusCode()).isEqualTo(200);
        assertThat((String) JsonPath.read(login.body(), "$.email")).isEqualTo(email);
    }

    @Test
    void postRegister_conEmailYaRegistrado_devuelve400() throws Exception {
        String email = "duplicado-" + UUID.randomUUID() + "@test.com";

        HttpResponse<String> primero = post("/api/auth/register", registroJson(email));
        HttpResponse<String> segundo = post("/api/auth/register", registroJson(email));

        assertThat(primero.statusCode()).isEqualTo(201);
        assertThat(segundo.statusCode()).isEqualTo(400);
        assertThat(segundo.body()).contains("registrado");
    }
}
