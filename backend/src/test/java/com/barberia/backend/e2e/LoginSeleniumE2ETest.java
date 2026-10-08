package com.barberia.backend.e2e;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

/**
 * E2E desde Chrome: frontend -> BFF -> backend -> BD, sin mocks ni Spring embebido.
 * Requiere backend, BFF y frontend corriendo antes de ejecutar el test.
 * Desde la carpeta del pom: mvn test -Dgroups="selenium"
 * URL configurable: -De2e.frontendUrl=http://localhost:5173
 * Requiere Chrome y el admin sembrado por DataSeeder (admin@barberia.com/admin123).
 */
@Tag("selenium")
@Tag("external-stack")
class LoginSeleniumE2ETest {

    private WebDriver driver;

    @BeforeEach
    void abrirChrome() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new", "--window-size=1440,1000");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
    }

    @AfterEach
    void cerrarChrome() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void loginAdmin_redirigeAlDashboard() {
        String frontendUrl = System.getProperty("e2e.frontendUrl", "http://localhost:5173")
                .replaceAll("/+$", "");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        driver.get(frontendUrl + "/login");

        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[placeholder='correo@ejemplo.com']")))
                .sendKeys("admin@barberia.com");
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[placeholder='•••••••••']")))
                .sendKeys("admin123");
        wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[@type='submit' and normalize-space()='ENTRAR']"))).click();

        // El login redirige después de 1,5 segundos.
        wait.until(d -> "/dashboard".equals(URI.create(d.getCurrentUrl()).getPath()));
        assertThat(URI.create(driver.getCurrentUrl()).getPath()).isEqualTo("/dashboard");
        assertThat(wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h1[contains(., 'Dashboard')]"))).getText()).containsIgnoringCase("Dashboard");
    }
}
