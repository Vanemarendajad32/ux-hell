package com.uihell.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AttemptRepositoryTest {

    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        user = userRepository.save(
            User.builder()
                .username("attempt-owner")
                .passwordHash("h")
                .createdAt(Instant.parse("2025-02-01T00:00:00Z"))
                .build()
        );
    }

    @Test
    void findByUserIdAndCompletedTrueOrderByCreatedAtAsc_ordersByCreatedAt() {
        Instant t1 = Instant.parse("2025-02-10T10:00:00Z");
        Instant t2 = Instant.parse("2025-02-10T11:00:00Z");
        attemptRepository.save(
            completedAttempt("registration", t2, 2000L)
        );
        attemptRepository.save(
            completedAttempt("registration", t1, 3000L)
        );
        attemptRepository.save(
            incompleteAttempt("registration", Instant.parse("2025-02-09T10:00:00Z"))
        );

        List<Attempt> list = attemptRepository.findByUserIdAndCompletedTrueOrderByCreatedAtAsc(
            user.getId()
        );

        assertThat(list).hasSize(2);
        assertThat(list.getFirst().getCreatedAt()).isEqualTo(t1);
        assertThat(list.get(1).getCreatedAt()).isEqualTo(t2);
    }

    @Test
    void findByCompletedTrueAndGameTypeIn_returnsPage() {
        attemptRepository.save(completedAttempt("registration", Instant.now(), 1000L));
        attemptRepository.flush();

        Page<Attempt> page = attemptRepository.findByCompletedTrueAndGameTypeIn(
            List.of("registration"),
            PageRequest.of(0, 10)
        );

        assertThat(page.getTotalElements()).isEqualTo(1);
        assertThat(page.getContent()).hasSize(1);
        assertThat(page.getContent().getFirst().getGameType()).isEqualTo("registration");
    }

    @Test
    void findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc_sortsByTime() {
        Instant created = Instant.parse("2025-02-15T08:00:00Z");
        attemptRepository.save(completedAttempt("robot-test", created, 5000L));
        attemptRepository.save(completedAttempt("robot-test", created, 2000L));

        List<Attempt> sorted = attemptRepository
            .findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc(
                List.of("robot-test")
            );

        assertThat(sorted).hasSize(2);
        assertThat(sorted.getFirst().getCompletionTimeMs()).isEqualTo(2000L);
        assertThat(sorted.get(1).getCompletionTimeMs()).isEqualTo(5000L);
    }

    @Test
    void findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc_returnsFastest() {
        Instant created = Instant.parse("2025-02-20T08:00:00Z");
        attemptRepository.save(completedAttempt("account-verification", created, 9000L));
        attemptRepository.save(completedAttempt("account-verification", created, 3000L));

        var fastest = attemptRepository.findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc(
            List.of("account-verification")
        );

        assertThat(fastest).isPresent();
        assertThat(fastest.get().getCompletionTimeMs()).isEqualTo(3000L);
    }

    private Attempt completedAttempt(String gameType, Instant createdAt, long completionMs) {
        return Attempt.builder()
            .user(user)
            .gameType(gameType)
            .completionTimeMs(completionMs)
            .clickCount(1)
            .frustrationLevel(0)
            .errorCount(0)
            .submitAttempts(1)
            .completed(true)
            .createdAt(createdAt)
            .build();
    }

    private Attempt incompleteAttempt(String gameType, Instant createdAt) {
        return Attempt.builder()
            .user(user)
            .gameType(gameType)
            .completionTimeMs(null)
            .clickCount(0)
            .frustrationLevel(0)
            .errorCount(0)
            .submitAttempts(1)
            .completed(false)
            .createdAt(createdAt)
            .build();
    }
}
