package com.uihell.backend.controller;

import com.uihell.backend.dto.LoginRequest;
import com.uihell.backend.dto.RegisterRequest;
import com.uihell.backend.dto.SessionResponse;
import com.uihell.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @Value("${app.auth.cookie-name:UIHELL_SESSION}")
    private String authCookieName;

    @Value("${app.auth.cookie-secure:false}")
    private boolean authCookieSecure;

    @Value("${jwt.expiration-ms:3600000}")
    private long jwtExpirationMs;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        userService.register(req.username(), req.password());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(
        @Valid @RequestBody LoginRequest request,
        HttpServletResponse response
    ) {
        String token = userService.login(
            request.username(),
            request.password()
        );

        long maxAgeSeconds = (jwtExpirationMs + 999) / 1000;
        ResponseCookie cookie = ResponseCookie
            .from(authCookieName, token)
            .httpOnly(true)
            .secure(authCookieSecure)
            .sameSite("Lax")
            .path("/")
            .maxAge(maxAgeSeconds)
            .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie
            .from(authCookieName, "")
            .httpOnly(true)
            .secure(authCookieSecure)
            .sameSite("Lax")
            .path("/")
            .maxAge(0)
            .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/session")
    public SessionResponse session(Authentication authentication) {
        if (authentication == null) {
            return new SessionResponse(false, null);
        }

        return new SessionResponse(true, authentication.getName());
    }
}
