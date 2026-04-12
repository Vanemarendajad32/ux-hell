package com.uihell.backend.service;

import static com.uihell.backend.dto.LeaderboardGameType.ACCOUNT_VERIFICATION;
import static com.uihell.backend.dto.LeaderboardGameType.CURSED_VOLUME_SLIDER;
import static com.uihell.backend.dto.LeaderboardGameType.NAME_INPUT_CAROUSEL;
import static com.uihell.backend.dto.LeaderboardGameType.REGISTRATION;
import static com.uihell.backend.dto.LeaderboardGameType.ROBOT_TEST;

import com.uihell.backend.entity.Attempt;
import com.uihell.backend.dto.LeaderboardEntryResponse;
import com.uihell.backend.dto.LeaderboardGameType;
import com.uihell.backend.dto.LeaderboardResponse;
import com.uihell.backend.repository.AttemptRepository;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private static final DateTimeFormatter COMPLETED_AT_FORMATTER = DateTimeFormatter
        .ofPattern("yyyy-MM-dd")
        .withLocale(Locale.ROOT)
        .withZone(ZoneOffset.UTC);

    private final AttemptRepository attemptRepository;

    public LeaderboardResponse getLeaderboardByGame(
        LeaderboardGameType gameType,
        int page,
        int size,
        String username
    ) {
        List<String> gameTypes = resolveAttemptGameTypes(gameType);
        Sort sort = Sort
            .by(Sort.Order.asc("completionTimeMs"), Sort.Order.asc("createdAt"), Sort.Order.asc("id"));
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        Page<Attempt> attemptsPage = attemptRepository.findByCompletedTrueAndGameTypeIn(
            gameTypes,
            pageRequest
        );
        List<LeaderboardEntryResponse> paginatedEntries = attemptsPage.isEmpty()
            ? Collections.emptyList()
            : mapEntries(attemptsPage.getContent(), (page * size) + 1);

        List<Attempt> sortedAttempts = attemptRepository.findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc(
            gameTypes
        );
        int totalPages = attemptsPage.getTotalPages();
        String bestTime = attemptRepository
            .findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc(gameTypes)
            .map(attempt -> formatDuration(attempt.getCompletionTimeMs()))
            .orElse("--:--");
        String topScore = formatScore(
            sortedAttempts
                .stream()
                .mapToInt(this::computeScore)
                .max()
                .orElse(0)
        );
        Integer currentUserRank = resolveCurrentUserRank(sortedAttempts, username);

        return new LeaderboardResponse(
            gameType.apiValue(),
            bestTime,
            topScore,
            currentUserRank,
            (int) attemptsPage.getTotalElements(),
            page,
            size,
            totalPages,
            paginatedEntries
        );
    }

    private List<LeaderboardEntryResponse> mapEntries(List<Attempt> attempts, int firstRank) {
        return IntStream
            .range(0, attempts.size())
            .mapToObj(index -> {
                Attempt attempt = attempts.get(index);
                String username = attempt.getUser() == null ? "Unknown" : attempt.getUser().getUsername();
                int frustrationValue = Math.max(0, attempt.getFrustrationLevel() == null ? 0 : attempt.getFrustrationLevel());

                return new LeaderboardEntryResponse(
                    firstRank + index,
                    username,
                    formatDuration(attempt.getCompletionTimeMs()),
                    formatFrustration(frustrationValue),
                    formatScore(computeScore(attempt)),
                    attempt.getCreatedAt() == null
                        ? "-"
                        : COMPLETED_AT_FORMATTER.format(attempt.getCreatedAt())
                );
            })
            .toList();
    }

    private List<String> resolveAttemptGameTypes(LeaderboardGameType gameType) {
        return switch (gameType) {
            case REGISTRATION -> List.of(REGISTRATION.apiValue());
            case ROBOT_TEST -> List.of(ROBOT_TEST.apiValue(), "checkbox-hell");
            case ACCOUNT_VERIFICATION -> List.of(ACCOUNT_VERIFICATION.apiValue());
            case CURSED_VOLUME_SLIDER -> List.of(CURSED_VOLUME_SLIDER.apiValue());
            case NAME_INPUT_CAROUSEL -> List.of(NAME_INPUT_CAROUSEL.apiValue());
        };
    }

    private String formatDuration(Long completionTimeMs) {
        if (completionTimeMs == null || completionTimeMs < 0) {
            return "--:--";
        }

        long totalSeconds = completionTimeMs / 1000;
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;
        return String.format(Locale.ROOT, "%d:%02d", minutes, seconds);
    }

    private String formatFrustration(int frustrationLevel) {
        int percent = Math.min(100, Math.max(0, frustrationLevel * 10));
        return percent + "%";
    }

    private String formatScore(int score) {
        return String.format(Locale.ROOT, "%,d", score);
    }

    private int computeScore(Attempt attempt) {
        long completionPenalty = (attempt.getCompletionTimeMs() == null ? 0L : attempt.getCompletionTimeMs()) / 100;
        int clickPenalty = (attempt.getClickCount() == null ? 0 : attempt.getClickCount()) * 4;
        int errorPenalty = (attempt.getErrorCount() == null ? 0 : attempt.getErrorCount()) * 180;
        int retryPenalty = Math.max(0, (attempt.getSubmitAttempts() == null ? 1 : attempt.getSubmitAttempts()) - 1) * 120;
        int frustrationPenalty = (attempt.getFrustrationLevel() == null ? 0 : attempt.getFrustrationLevel()) * 80;

        long rawScore =
            10_000L - completionPenalty - clickPenalty - errorPenalty - retryPenalty - frustrationPenalty;
        return (int) Math.max(0, rawScore);
    }

    private Integer resolveCurrentUserRank(List<Attempt> sortedAttempts, String username) {
        if (username == null || username.isBlank()) {
            return null;
        }

        return IntStream
            .range(0, sortedAttempts.size())
            .filter(index -> {
                Attempt attempt = sortedAttempts.get(index);
                return attempt.getUser() != null &&
                Objects.equals(attempt.getUser().getUsername(), username);
            })
            .map(index -> index + 1)
            .boxed()
            .findFirst()
            .orElse(null);
    }
}
