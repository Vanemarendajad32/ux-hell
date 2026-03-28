package com.uihell.backend.exception;

import java.time.Instant;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
