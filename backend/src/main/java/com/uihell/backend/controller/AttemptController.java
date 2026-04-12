package com.uihell.backend.controller;

import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.service.AttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> submit(
        @PathVariable Long userId,
        Authentication authentication,
        @Valid @RequestBody AttemptRequest req
    ) {
        if (authentication == null) {
            throw new ApiException(
                "UNAUTHORIZED",
                "Authentication required",
                HttpStatus.UNAUTHORIZED
            );
        }
        attemptService.submit(userId, authentication.getName(), req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/me")
    public ResponseEntity<?> submitForCurrentUser(
        Authentication authentication,
        @Valid @RequestBody AttemptRequest req
    ) {
        if (authentication == null) {
            throw new ApiException(
                "UNAUTHORIZED",
                "Authentication required",
                HttpStatus.UNAUTHORIZED
            );
        }
        attemptService.submitForCurrentUser(authentication.getName(), req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> myAttempts(Authentication authentication) {
        if (authentication == null) {
            throw new ApiException(
                "UNAUTHORIZED",
                "Authentication required",
                HttpStatus.UNAUTHORIZED
            );
        }

        return ResponseEntity.ok(attemptService.myAttempts(authentication.getName()));
    }
}
