package com.uihell.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import com.uihell.backend.dto.LeaderboardGameType;
import com.uihell.backend.dto.LeaderboardResponse;
import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import com.uihell.backend.repository.AttemptRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock
    private AttemptRepository attemptRepository;

    @InjectMocks
    private LeaderboardService leaderboardService;

    @Test
    void getLeaderboardByGame_mapsPageAndAggregates() {
        User user = User.builder()
            .id(1L)
            .username("winner")
            .passwordHash("x")
            .createdAt(Instant.now())
            .build();
        Attempt fastest = Attempt.builder()
            .id(100L)
            .user(user)
            .gameType("registration")
            .completionTimeMs(65_000L)
            .clickCount(5)
            .frustrationLevel(2)
            .errorCount(0)
            .submitAttempts(1)
            .completed(true)
            .createdAt(Instant.parse("2025-01-10T10:00:00Z"))
            .build();
        List<String> gameTypes = List.of(LeaderboardGameType.REGISTRATION.apiValue());
        Page<Attempt> page = new PageImpl<>(List.of(fastest), org.springframework.data.domain.PageRequest.of(0, 10), 1);

        when(attemptRepository.findByCompletedTrueAndGameTypeIn(eq(gameTypes), any(Pageable.class))).thenReturn(page);
        when(attemptRepository.findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc(gameTypes))
            .thenReturn(List.of(fastest));
        when(attemptRepository.findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc(gameTypes))
            .thenReturn(Optional.of(fastest));

        LeaderboardResponse response = leaderboardService.getLeaderboardByGame(
            LeaderboardGameType.REGISTRATION,
            0,
            10,
            "winner"
        );

        assertThat(response.gameType()).isEqualTo("registration");
        assertThat(response.bestTime()).isEqualTo("1:05");
        assertThat(response.totalPlayers()).isEqualTo(1);
        assertThat(response.currentUserRank()).isEqualTo(1);
        assertThat(response.entries()).hasSize(1);
        assertThat(response.entries().getFirst().userName()).isEqualTo("winner");
        assertThat(response.entries().getFirst().rank()).isEqualTo(1);
    }

    @Test
    void getLeaderboardByGame_nullUsernameYieldsNullRank() {
        List<String> gameTypes = List.of(LeaderboardGameType.ROBOT_TEST.apiValue(), "checkbox-hell");
        Page<Attempt> emptyPage = new PageImpl<>(List.of(), org.springframework.data.domain.PageRequest.of(0, 5), 0);

        when(attemptRepository.findByCompletedTrueAndGameTypeIn(eq(gameTypes), any(Pageable.class)))
            .thenReturn(emptyPage);
        when(attemptRepository.findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc(gameTypes))
            .thenReturn(List.of());
        when(attemptRepository.findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc(gameTypes))
            .thenReturn(Optional.empty());

        LeaderboardResponse response = leaderboardService.getLeaderboardByGame(
            LeaderboardGameType.ROBOT_TEST,
            0,
            5,
            null
        );

        assertThat(response.currentUserRank()).isNull();
        assertThat(response.bestTime()).isEqualTo("--:--");
        assertThat(response.topScore()).isEqualTo("0");
    }
}
