package com.uihell.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.uihell.backend.entity.User;
import com.uihell.backend.exception.ApiException;
import com.uihell.backend.exception.UsernameAlreadyExistsException;
import com.uihell.backend.repository.UserRepository;
import com.uihell.backend.security.JwtService;
import java.time.Instant;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserService userService;

    @Test
    void register_persistsEncodedUserWhenUsernameFree() {
        when(userRepository.findByUsername("newbie")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("secret-password")).thenReturn("encoded");
        User saved = User.builder()
            .id(10L)
            .username("newbie")
            .passwordHash("encoded")
            .createdAt(Instant.parse("2025-06-01T12:00:00Z"))
            .build();
        when(userRepository.save(any(User.class))).thenReturn(saved);

        User result = userService.register("newbie", "secret-password");

        assertThat(result).isSameAs(saved);
        verify(passwordEncoder).encode("secret-password");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_throwsWhenUsernameTaken() {
        User existing = User.builder()
            .id(1L)
            .username("taken")
            .passwordHash("x")
            .createdAt(Instant.now())
            .build();
        when(userRepository.findByUsername("taken")).thenReturn(Optional.of(existing));

        assertThatThrownBy(() -> userService.register("taken", "password123"))
            .isInstanceOf(UsernameAlreadyExistsException.class);
    }

    @Test
    void login_returnsJwtWhenCredentialsValid() {
        User user = User.builder()
            .id(3L)
            .username("bob")
            .passwordHash("stored-hash")
            .createdAt(Instant.now())
            .build();
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plain", "stored-hash")).thenReturn(true);
        when(jwtService.generateToken("bob")).thenReturn("jwt-token");

        String token = userService.login("bob", "plain");

        assertThat(token).isEqualTo("jwt-token");
        verify(jwtService).generateToken(eq("bob"));
    }

    @Test
    void login_throwsWhenUserUnknown() {
        when(userRepository.findByUsername("missing")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.login("missing", "x"))
            .isInstanceOf(ApiException.class)
            .satisfies(ex -> assertThat(((ApiException) ex).getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED));
    }

    @Test
    void login_throwsWhenPasswordWrong() {
        User user = User.builder()
            .id(4L)
            .username("bob")
            .passwordHash("stored-hash")
            .createdAt(Instant.now())
            .build();
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "stored-hash")).thenReturn(false);

        assertThatThrownBy(() -> userService.login("bob", "wrong"))
            .isInstanceOf(ApiException.class)
            .satisfies(ex -> assertThat(((ApiException) ex).getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED));
    }
}
