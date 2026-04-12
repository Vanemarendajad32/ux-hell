package com.uihell.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.uihell.backend.entity.User;
import java.time.Instant;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByUsername_returnsEmptyWhenMissing() {
        Optional<User> found = userRepository.findByUsername("does-not-exist");

        assertThat(found).isEmpty();
    }

    @Test
    void saveAndFindByUsername_roundTrips() {
        User user = User.builder()
            .username("repo-user")
            .passwordHash("hash")
            .createdAt(Instant.parse("2025-03-01T12:00:00Z"))
            .build();

        userRepository.save(user);

        Optional<User> found = userRepository.findByUsername("repo-user");
        assertThat(found).isPresent();
        assertThat(found.get().getUsername()).isEqualTo("repo-user");
        assertThat(found.get().getPasswordHash()).isEqualTo("hash");
    }
}
