package com.uihell.backend.service;

import static com.uihell.backend.exception.ErrorCodes.FORBIDDEN;

import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.repository.AttemptRepository;
import com.uihell.backend.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public Attempt submit(Long userId, String username, AttemptRequest req) {
        User user = resolveUser(username);

        if (!user.getId().equals(userId)) {
            throw new ApiException(
                FORBIDDEN,
                "You can only submit attempts for yourself",
                HttpStatus.FORBIDDEN
            );
        }

        return saveAttempt(user, req);
    }

    public Attempt submitForCurrentUser(String username, AttemptRequest req) {
        User user = resolveUser(username);
        return saveAttempt(user, req);
    }

    private User resolveUser(String username) {
        return userRepository
            .findByUsername(username)
            .orElseThrow(() ->
                new ApiException(
                    FORBIDDEN,
                    "Invalid authentication context",
                    HttpStatus.FORBIDDEN
                )
            );
    }

    private Attempt saveAttempt(User user, AttemptRequest req) {
        Attempt attempt = Attempt.builder()
            .user(user)
            .gameType(req.gameType())
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

    public List<Attempt> myAttempts(String username) {
        User user = resolveUser(username);

        return attemptRepository.findByUserIdAndCompletedTrueOrderByCreatedAtAsc(
            user.getId()
        );
    }
}
