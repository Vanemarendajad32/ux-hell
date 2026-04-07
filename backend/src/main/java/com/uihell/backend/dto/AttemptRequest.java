package com.uihell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AttemptRequest(
    @NotBlank String gameType,
    @NotNull Long completionTimeMs,
    @NotNull Integer clickCount,
    @NotNull Integer frustrationLevel,
    @NotNull Integer errorCount,
    @NotNull Integer submitAttempts,
    @NotNull Boolean completed
) {}
