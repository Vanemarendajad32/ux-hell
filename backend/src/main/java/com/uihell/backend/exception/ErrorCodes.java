package com.uihell.backend.exception;

public final class ErrorCodes {

    private ErrorCodes() {} // prevent instantiation

    public static final String INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
    public static final String USERNAME_TAKEN = "USERNAME_TAKEN";
    public static final String WEAK_PASSWORD = "WEAK_PASSWORD";
    public static final String FORBIDDEN = "FORBIDDEN";
}
