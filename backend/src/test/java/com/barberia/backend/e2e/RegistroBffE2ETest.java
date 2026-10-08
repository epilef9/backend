package com.barberia.backend.e2e;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.UUID;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.jayway.jsonpath.JsonPath;

/**
 * E2E HTTP: BFF -> backend -> BD, sin mocks ni servidores embebidos.
 * Levantar backend y BFF externamente; para ejecutar también Selenium se necesita
 * el frontend.
 * Solo esta clase: mvn test -Dgroups="external-stack" -Dtest=RegistroBffE2ETest
 * Ambos E2E externos: mvn test -Dgroups="external-stack"
 * URL configurable: -De2e.bffUrl=http://localhost:3000 (sin /api).
 * Crea usuarios con email único en la BD del backend externo.
 */
@Tag("external-stack")
class RegistroBffE2ETest {

    private final String bffUrl = System.getProperty("e2e.bffUrl", "http://localhost:3000")
            .replaceAll("/+$", "");

    private HttpResponse<String> post(String path, String json) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(bffUrl + "/api/auth" + path))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        try (HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build()) {
            return http.send(request, HttpResponse.BodyHandlers.ofString());
        }
    }

    private String registroJson(String email) {
        return """
                {"nombre":"Usuario E2E BFF","email":"%s","password":"secreta123","telefono":"1155550000","rol":"CLIENTE"}
                """.formatted(email);
    }

    private void verificarAutenticacion(HttpResponse<String> response, String email) {
        // auth.js usa res.json(response.data): el BFF responde 200, no el 201 del backend.
        assertThat(response.statusCode()).as("Estado HTTP del BFF").isEqualTo(200);
        assertThat(response.headers().firstValue("Content-Type").orElse(""))
                .contains("application/json");
        assertThat((String) JsonPath.read(response.body(), "$.token")).isNotBlank();
        assertThat((String) JsonPath.read(response.body(), "$.email")).isEqualTo(email);
        assertThat((String) JsonPath.read(response.body(), "$.rol")).isEqualTo("CLIENTE");
    }

    @Test
    void registroPorBff_persisteUsuario_yPermiteLoginConElContratoDelFrontend() throws Exception {
        String email = "e2e-bff-" + UUID.randomUUID() + "@test.com";
        verificarAutenticacion(post("/register", registroJson(email)), email);

        // Una segunda petición por el BFF comprueba que el backend persistió el usuario.
        verificarAutenticacion(post("/login", """
                {"email":"%s","password":"secreta123"}
                """.formatted(email)), email);
    }

    @Test
    void registroPorBff_conEmailDuplicado_devuelve400() throws Exception {
        String email = "duplicado-bff-" + UUID.randomUUID() + "@test.com";
        verificarAutenticacion(post("/register", registroJson(email)), email);

        HttpResponse<String> duplicado = post("/register", registroJson(email));
        assertThat(duplicado.statusCode()).isEqualTo(400);
        // errorHandler.js transforma el error de Axios a {error, status}.
        assertThat((Integer) JsonPath.read(duplicado.body(), "$.status")).isEqualTo(400);
        assertThat((String) JsonPath.read(duplicado.body(), "$.error")).isNotBlank();
    }
}
