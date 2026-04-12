package com.uihell.backend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.uihell.backend.entity.User;
import com.uihell.backend.repository.AttemptRepository;
import com.uihell.backend.repository.UserRepository;
import com.uihell.backend.security.JwtService;
import com.uihell.backend.support.WebMvcSecurityTestConfig;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = DebugController.class)
@Import(WebMvcSecurityTestConfig.class)
class DebugControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private AttemptRepository attemptRepository;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void users_returnsJsonFromRepository() throws Exception {
        User u = User.builder()
            .id(1L)
            .username("u1")
            .passwordHash("h")
            .createdAt(Instant.parse("2025-01-01T00:00:00Z"))
            .build();
        when(userRepository.findAll()).thenReturn(List.of(u));

        mockMvc
            .perform(get("/debug/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].username").value("u1"));
    }

    @Test
    void stats_returnsCounts() throws Exception {
        when(userRepository.count()).thenReturn(3L);
        when(attemptRepository.count()).thenReturn(10L);

        mockMvc
            .perform(get("/debug/stats"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userCount").value(3))
            .andExpect(jsonPath("$.attemptCount").value(10));
    }
}
