package com.barberia.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

// Con el perfil "test" usa H2 en memoria; sin él intentaría conectarse a MySQL y fallaría si no está levantado.
@SpringBootTest
@ActiveProfiles("test")
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
