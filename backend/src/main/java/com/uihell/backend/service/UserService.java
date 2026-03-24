package com.uihell.backend.service;

import com.uihell.backend.entity.User;
import com.uihell.backend.repository.UserRepository;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = User.builder()
            .username(username)
            .passwordHash(passwordEncoder.encode(password))
            .createdAt(Instant.now())
            .build();

        return userRepository.save(user);
    }
}
