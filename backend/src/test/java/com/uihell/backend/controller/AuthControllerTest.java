package com.uihell.backend.controller;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uihell.backend.dto.LoginRequest;
import com.uihell.backend.dto.RegisterRequest;
import com.uihell.backend.entity.User;
import com.uihell.backend.security.JwtService;
import com.uihell.backend.service.UserService;
import com.uihell.backend.support.WebMvcSecurityTestConfig;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.hamcrest.Matchers;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = AuthController.class)
@Import(WebMvcSecurityTestConfig.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void register_returnsUserPayload() throws Exception {
        User user = User.builder()
            .id(42L)
            .username("newuser")
            .passwordHash("encoded")
            .createdAt(Instant.parse("2025-01-01T00:00:00Z"))
            .build();
        when(userService.register("newuser", "secret12")).thenReturn(user);

        mockMvc
            .perform(
                post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(new RegisterRequest("newuser", "secret12")))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(42))
            .andExpect(jsonPath("$.username").value("newuser"));

        verify(userService).register(eq("newuser"), eq("secret12"));
    }

    @Test
    void register_returns400WhenValidationFails() throws Exception {
        mockMvc
            .perform(
                post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(new RegisterRequest("ab", "short")))
            )
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void login_setsSessionCookieAnd204() throws Exception {
        when(userService.login("bob", "pass1234")).thenReturn("jwt-value-here");

        mockMvc
            .perform(
                post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(new LoginRequest("bob", "pass1234")))
            )
            .andExpect(status().isNoContent())
            .andExpect(cookie().exists("UIHELL_SESSION"))
            .andExpect(cookie().value("UIHELL_SESSION", "jwt-value-here"));

        verify(userService).login("bob", "pass1234");
    }

    @Test
    void logout_clearsSessionCookie() throws Exception {
        mockMvc
            .perform(post("/api/auth/logout"))
            .andExpect(status().isOk())
            .andExpect(cookie().maxAge("UIHELL_SESSION", 0));
    }

    @Test
    void session_returnsUnauthenticatedWhenNoPrincipal() throws Exception {
        mockMvc
            .perform(get("/api/auth/session"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.authenticated").value(false))
            .andExpect(jsonPath("$.username").value(Matchers.nullValue()));
    }

    @Test
    @WithMockUser(username = "alice")
    void session_returnsUsernameWhenAuthenticated() throws Exception {
        mockMvc
            .perform(get("/api/auth/session"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.authenticated").value(true))
            .andExpect(jsonPath("$.username").value("alice"));
    }
}
