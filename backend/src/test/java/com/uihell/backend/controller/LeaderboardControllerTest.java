package com.uihell.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.uihell.backend.dto.LeaderboardEntryResponse;
import com.uihell.backend.dto.LeaderboardGameType;
import com.uihell.backend.dto.LeaderboardResponse;
import com.uihell.backend.security.JwtService;
import com.uihell.backend.service.LeaderboardService;
import com.uihell.backend.support.WebMvcSecurityTestConfig;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = LeaderboardController.class)
@Import(WebMvcSecurityTestConfig.class)
class LeaderboardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private LeaderboardService leaderboardService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void getLeaderboard_returnsPayload() throws Exception {
        LeaderboardResponse payload = new LeaderboardResponse(
            "registration",
            "0:30",
            "9,500",
            null,
            1,
            0,
            20,
            1,
            List.of(
                new LeaderboardEntryResponse(1, "alice", "0:30", "20%", "9,500", "2025-01-02")
            )
        );
        when(
            leaderboardService.getLeaderboardByGame(
                eq(LeaderboardGameType.REGISTRATION),
                eq(0),
                eq(20),
                any()
            )
        )
            .thenReturn(payload);

        mockMvc
            .perform(get("/api/leaderboard").param("gameType", "registration").param("page", "0").param("size", "20"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.gameType").value("registration"))
            .andExpect(jsonPath("$.bestTime").value("0:30"))
            .andExpect(jsonPath("$.totalPlayers").value(1))
            .andExpect(jsonPath("$.entries[0].userName").value("alice"));
    }

    @Test
    @WithMockUser(username = "bob")
    void getLeaderboard_passesAuthenticatedUsernameToService() throws Exception {
        LeaderboardResponse payload = new LeaderboardResponse(
            "robot-test",
            "--:--",
            "0",
            2,
            0,
            0,
            10,
            0,
            List.of()
        );
        when(
            leaderboardService.getLeaderboardByGame(
                eq(LeaderboardGameType.ROBOT_TEST),
                eq(0),
                eq(10),
                eq("bob")
            )
        )
            .thenReturn(payload);

        mockMvc
            .perform(get("/api/leaderboard").param("gameType", "robot-test").param("size", "10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.currentUserRank").value(2));
    }

    @Test
    void getLeaderboard_returns400ForInvalidGameType() throws Exception {
        mockMvc
            .perform(get("/api/leaderboard").param("gameType", "not-a-game"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void getLeaderboard_returns400WhenPageNegative() throws Exception {
        mockMvc
            .perform(get("/api/leaderboard").param("page", "-1"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    void getLeaderboard_returns400WhenSizeOutOfRange() throws Exception {
        mockMvc
            .perform(get("/api/leaderboard").param("size", "0"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }
}
