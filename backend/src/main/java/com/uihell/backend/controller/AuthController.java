package com.uihell.backend.controller;

import com.uihell.backend.dto.AuthResponse;
import com.uihell.backend.dto.LoginRequest;
import com.uihell.backend.dto.RegisterRequest;
import com.uihell.backend.dto.RegisterResponse;
import com.uihell.backend.entity.User;
import com.uihell.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
        @Valid @RequestBody RegisterRequest req
    ) {
        User user = userService.register(req.username(), req.password());
        return ResponseEntity.ok(new RegisterResponse(user.getId(), user.getUsername()));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String token = userService.login(
            request.username(),
            request.password()
        );

        return new AuthResponse(token);
    }
}
