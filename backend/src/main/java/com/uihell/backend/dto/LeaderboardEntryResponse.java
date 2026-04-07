package com.uihell.backend.dto;

public record LeaderboardEntryResponse(
    int rank,
    String userName,
    String time,
    String frustration,
    String score,
    String completedAt
) {}
