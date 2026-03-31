package com.uihell.backend.exception;

import com.uihell.backend.dto.ApiErrorResponse;
import java.time.Instant;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handleApiException(
        ApiException ex
    ) {
        return ResponseEntity.status(ex.getStatus()).body(
            Map.of(
                "timestamp",
                Instant.now(),
                "status",
                ex.getStatus().value(),
                "code",
                ex.getCode(),
                "message",
                ex.getMessage()
            )
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(
        MethodArgumentNotValidException ex
    ) {
        String message = ex
            .getBindingResult()
            .getFieldErrors()
            .stream()
            .findFirst()
            .map(err -> err.getDefaultMessage())
            .orElse("Validation error");

        return ResponseEntity.badRequest().body(
            Map.of(
                "status",
                400,
                "code",
                "VALIDATION_ERROR",
                "message",
                message
            )
        );
    }

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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return ResponseEntity.status(500).body(
            Map.of(
                "timestamp",
                Instant.now(),
                "status",
                500,
                "code",
                "INTERNAL_ERROR",
                "message",
                "Something went wrong"
            )
        );
    }
}
