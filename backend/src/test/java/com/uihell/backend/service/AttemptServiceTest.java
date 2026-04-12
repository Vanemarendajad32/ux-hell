package com.uihell.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.repository.AttemptRepository;
import com.uihell.backend.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
class AttemptServiceTest {

    @Mock
    private AttemptRepository attemptRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AttemptService attemptService;

    @Test
    void submit_savesWhenAuthenticatedUserMatchesPathUserId() {
        User user = User.builder()
            .id(5L)
            .username("player")
            .passwordHash("hash")
            .createdAt(Instant.parse("2024-01-01T00:00:00Z"))
            .build();
        AttemptRequest req = new AttemptRequest(
            "registration",
            12_000L,
            3,
            2,
            0,
            1,
            true
        );
        when(userRepository.findByUsername("player")).thenReturn(Optional.of(user));
        when(attemptRepository.save(any(Attempt.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        Attempt saved = attemptService.submit(5L, "player", req);

        assertThat(saved.getUser()).isSameAs(user);
        assertThat(saved.getGameType()).isEqualTo("registration");
        assertThat(saved.getCompletionTimeMs()).isEqualTo(12_000L);
        assertThat(saved.getCompleted()).isTrue();
        verify(attemptRepository).save(any(Attempt.class));
    }

    @Test
    void submit_throwsForbiddenWhenUserNotInRepository() {
        when(userRepository.findByUsername("ghost")).thenReturn(Optional.empty());
        AttemptRequest req = new AttemptRequest("registration", 1L, 1, 0, 0, 1, true);

        assertThatThrownBy(() -> attemptService.submit(1L, "ghost", req))
            .isInstanceOf(ApiException.class)
            .satisfies(ex -> {
                ApiException api = (ApiException) ex;
                assertThat(api.getStatus()).isEqualTo(HttpStatus.FORBIDDEN);
            });
    }

    @Test
    void submit_throwsForbiddenWhenUserIdDoesNotMatchAuthenticatedUser() {
        User user = User.builder()
            .id(9L)
            .username("player")
            .passwordHash("hash")
            .createdAt(Instant.now())
            .build();
        when(userRepository.findByUsername("player")).thenReturn(Optional.of(user));
        AttemptRequest req = new AttemptRequest("registration", 1L, 1, 0, 0, 1, true);

        assertThatThrownBy(() -> attemptService.submit(5L, "player", req))
            .isInstanceOf(ApiException.class)
            .satisfies(ex -> assertThat(((ApiException) ex).getStatus()).isEqualTo(HttpStatus.FORBIDDEN));
    }

    @Test
    void submitForCurrentUser_savesForResolvedAuthenticatedUser() {
        User user = User.builder()
            .id(7L)
            .username("current-user")
            .passwordHash("hash")
            .createdAt(Instant.parse("2024-01-01T00:00:00Z"))
            .build();
        AttemptRequest req = new AttemptRequest(
            "cursed-volume-slider",
            8_500L,
            12,
            3,
            1,
            2,
            true
        );
        when(userRepository.findByUsername("current-user")).thenReturn(Optional.of(user));
        when(attemptRepository.save(any(Attempt.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));

        Attempt saved = attemptService.submitForCurrentUser("current-user", req);

        assertThat(saved.getUser()).isSameAs(user);
        assertThat(saved.getGameType()).isEqualTo("cursed-volume-slider");
        assertThat(saved.getCompletionTimeMs()).isEqualTo(8_500L);
        assertThat(saved.getClickCount()).isEqualTo(12);
        assertThat(saved.getFrustrationLevel()).isEqualTo(3);
        assertThat(saved.getErrorCount()).isEqualTo(1);
        assertThat(saved.getSubmitAttempts()).isEqualTo(2);
        assertThat(saved.getCompleted()).isTrue();
        verify(attemptRepository).save(any(Attempt.class));
    }

    @Test
    void submitForCurrentUser_throwsForbiddenWhenUserMissing() {
        when(userRepository.findByUsername("missing-user")).thenReturn(Optional.empty());
        AttemptRequest req = new AttemptRequest(
            "name-input-carousel",
            1L,
            1,
            0,
            0,
            1,
            true
        );

        assertThatThrownBy(() ->
            attemptService.submitForCurrentUser("missing-user", req)
        )
            .isInstanceOf(ApiException.class)
            .satisfies(ex -> {
                ApiException api = (ApiException) ex;
                assertThat(api.getStatus()).isEqualTo(HttpStatus.FORBIDDEN);
            });
    }

    @Test
    void myAttempts_returnsCompletedAttemptsForUser() {
        User user = User.builder()
            .id(2L)
            .username("alice")
            .passwordHash("hash")
            .createdAt(Instant.now())
            .build();
        List<Attempt> expected = List.of(
            Attempt.builder()
                .id(1L)
                .user(user)
                .gameType("registration")
                .completionTimeMs(1000L)
                .clickCount(1)
                .frustrationLevel(0)
                .errorCount(0)
                .submitAttempts(1)
                .completed(true)
                .createdAt(Instant.now())
                .build()
        );
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));
        when(attemptRepository.findByUserIdAndCompletedTrueOrderByCreatedAtAsc(2L)).thenReturn(expected);

        List<Attempt> result = attemptService.myAttempts("alice");

        assertThat(result).isEqualTo(expected);
    }

    @Test
    void myAttempts_throwsForbiddenWhenUserMissing() {
        when(userRepository.findByUsername("nobody")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> attemptService.myAttempts("nobody")).isInstanceOf(ApiException.class);
    }
}
