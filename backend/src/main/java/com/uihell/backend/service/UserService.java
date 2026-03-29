package com.uihell.backend.service;

import static com.uihell.backend.exception.ErrorCodes.*;

import com.uihell.backend.entity.User;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.repository.UserRepository;
import com.uihell.backend.security.JwtService;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new ApiException(
                USERNAME_TAKEN,
                "Username already exists",
                HttpStatus.CONFLICT
            );
        }

        // TODO: legacy check, replaced by RegisterRequest validation
        if (password.length() < 6) {
            throw new ApiException(
                WEAK_PASSWORD,
                "Password must be at least 6 characters",
                HttpStatus.BAD_REQUEST
            );
        }

        User user = User.builder()
            .username(username)
            .passwordHash(passwordEncoder.encode(password))
            .createdAt(Instant.now())
            .build();

        return userRepository.save(user);
    }

    public String login(String username, String password) {
        User user = userRepository
            .findByUsername(username)
            .orElseThrow(() ->
                new ApiException(
                    INVALID_CREDENTIALS,
                    "Invalid username or password",
                    HttpStatus.UNAUTHORIZED
                )
            );

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new ApiException(
                "INVALID_CREDENTIALS",
                "Invalid username or password",
                HttpStatus.UNAUTHORIZED
            );
        }

        return jwtService.generateToken(user.getUsername());
    }
}
