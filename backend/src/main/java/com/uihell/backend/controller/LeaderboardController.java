package com.uihell.backend.controller;

import static com.uihell.backend.exception.ErrorCodes.VALIDATION_ERROR;

import com.uihell.backend.dto.LeaderboardGameType;
import com.uihell.backend.dto.LeaderboardResponse;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping
    public LeaderboardResponse getLeaderboard(
        @RequestParam(name = "gameType", defaultValue = "registration") String gameType,
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "20") int size,
        Authentication authentication
    ) {
        LeaderboardGameType resolvedGameType = LeaderboardGameType
            .fromApiValue(gameType)
            .orElseThrow(() ->
                new ApiException(
                    VALIDATION_ERROR,
                    "Invalid gameType. Allowed values: registration, robot-test, account-verification, cursed-volume-slider, name-input-carousel",
                    HttpStatus.BAD_REQUEST
                )
            );

        if (page < 0) {
            throw new ApiException(
                VALIDATION_ERROR,
                "page must be greater than or equal to 0",
                HttpStatus.BAD_REQUEST
            );
        }

        if (size < 1 || size > 100) {
            throw new ApiException(
                VALIDATION_ERROR,
                "size must be between 1 and 100",
                HttpStatus.BAD_REQUEST
            );
        }

        String username = authentication == null ? null : authentication.getName();
        return leaderboardService.getLeaderboardByGame(resolvedGameType, page, size, username);
    }
}
