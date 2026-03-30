package com.uihell.backend.dto;

public record ApiErrorResponse(
    int status,
    String error,
    String message
) {}
