package com.uihell.backend.service;

import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import com.uihell.backend.repository.AttemptRepository;
import com.uihell.backend.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public Attempt submit(Long userId, AttemptRequest req) {
        User user = userRepository
            .findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Attempt attempt = Attempt.builder()
            .user(user)
            .completionTimeMs(req.completionTimeMs())
            .clickCount(req.clickCount())
            .frustrationLevel(req.frustrationLevel())
            .errorCount(req.errorCount())
            .submitAttempts(req.submitAttempts())
            .completed(req.completed())
            .createdAt(Instant.now())
            .build();

        return attemptRepository.save(attempt);
    }

    public List<Attempt> leaderboard() {
        return attemptRepository.findLeaderboard();
    }
}
