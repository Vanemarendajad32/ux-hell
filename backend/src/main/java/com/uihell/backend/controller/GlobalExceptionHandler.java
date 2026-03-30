package com.uihell.backend.controller;

import com.uihell.backend.dto.ApiErrorResponse;
import com.uihell.backend.exception.UsernameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> handleUsernameAlreadyExists(
        UsernameAlreadyExistsException exception
    ) {
        HttpStatus status = HttpStatus.CONFLICT;

        return ResponseEntity
            .status(status)
            .body(
                new ApiErrorResponse(
                    status.value(),
                    status.getReasonPhrase(),
                    exception.getMessage()
                )
            );
    }
}
