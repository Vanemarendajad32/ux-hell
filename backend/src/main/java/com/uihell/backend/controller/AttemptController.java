package com.uihell.backend.controller;

import com.uihell.backend.dto.AttemptRequest;
import com.uihell.backend.service.AttemptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> submit(
        @PathVariable Long userId,
        @Valid @RequestBody AttemptRequest req
    ) {
        attemptService.submit(userId, req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<?> leaderboard() {
        return ResponseEntity.ok(attemptService.leaderboard());
    }
}
