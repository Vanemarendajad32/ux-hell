package com.uihell.backend.dto;

import java.util.Arrays;
import java.util.Locale;
import java.util.Optional;

public enum LeaderboardGameType {
    REGISTRATION("registration"),
    ROBOT_TEST("robot-test"),
    ACCOUNT_VERIFICATION("account-verification"),
    CURSED_VOLUME_SLIDER("cursed-volume-slider"),
    NAME_INPUT_CAROUSEL("name-input-carousel");

    private final String apiValue;

    LeaderboardGameType(String apiValue) {
        this.apiValue = apiValue;
    }

    public String apiValue() {
        return apiValue;
    }

    public static Optional<LeaderboardGameType> fromApiValue(String value) {
        if (value == null || value.isBlank()) {
            return Optional.empty();
        }

        String normalizedValue = value.trim().toLowerCase(Locale.ROOT);
        return Arrays
            .stream(values())
            .filter(type -> type.apiValue.equals(normalizedValue))
            .findFirst();
    }
}
