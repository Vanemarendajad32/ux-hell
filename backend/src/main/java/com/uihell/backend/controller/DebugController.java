package com.uihell.backend.controller;

import com.uihell.backend.entity.Attempt;
import com.uihell.backend.entity.User;
import com.uihell.backend.repository.AttemptRepository;
import com.uihell.backend.repository.UserRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/debug")
@RequiredArgsConstructor
public class DebugController {

    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/attempts")
    public List<Attempt> getAttempts() {
        return attemptRepository.findAll();
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return Map.of(
            "userCount",
            userRepository.count(),
            "attemptCount",
            attemptRepository.count()
        );
    }
}
