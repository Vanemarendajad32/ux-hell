package com.uihell.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.security.JwtService;
import com.uihell.backend.service.AttemptService;
import com.uihell.backend.support.WebMvcSecurityTestConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = AttemptController.class)
@Import(WebMvcSecurityTestConfig.class)
class AttemptControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private AttemptService attemptService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    @WithMockUser(username = "player")
    void submit_returnsOkAndDelegatesToService() throws Exception {
        AttemptRequest body = new AttemptRequest(
            "registration",
            5_000L,
            2,
            1,
            0,
            1,
            true
        );

        mockMvc
            .perform(
                post("/api/attempts/7")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(body))
            )
            .andExpect(status().isOk());

        verify(attemptService).submit(eq(7L), eq("player"), any(AttemptRequest.class));
    }

    @Test
    void submit_returns401WhenNotAuthenticated() throws Exception {
        AttemptRequest body = new AttemptRequest(
            "registration",
            5_000L,
            2,
            1,
            0,
            1,
            true
        );

        mockMvc
            .perform(
                post("/api/attempts/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(body))
            )
            .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "player")
    void myAttempts_returnsOk() throws Exception {
        when(attemptService.myAttempts("player")).thenReturn(java.util.Collections.emptyList());

        mockMvc.perform(get("/api/attempts/me")).andExpect(status().isOk());

        verify(attemptService).myAttempts("player");
    }

    @Test
    void myAttempts_returns401WhenNotAuthenticated() throws Exception {
        mockMvc.perform(get("/api/attempts/me")).andExpect(status().isUnauthorized());
    }
}
