package com.uihell.backend.dto;

import java.util.List;

public record LeaderboardResponse(
    String gameType,
    String bestTime,
    String topScore,
    int totalPlayers,
    int page,
    int size,
    int totalPages,
    List<LeaderboardEntryResponse> entries
) {}
