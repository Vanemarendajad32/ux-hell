package com.uihell.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Value("${app.auth.cookie-name:UIHELL_SESSION}")
    private String authCookieName;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractCookieToken(request);

        // No token → continue
        if (token == null || token.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtService.isValid(token)) {
            String username = jwtService.extractUsername(token);

            var authToken = new UsernamePasswordAuthenticationToken(
                username,
                null,
                List.of()
            );

            authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }

    private String extractCookieToken(HttpServletRequest request) {
        var cookies = request.getCookies();
        if (cookies == null || authCookieName == null || authCookieName.isBlank()) {
            return null;
        }

        for (var cookie : cookies) {
            if (cookie != null && authCookieName.equals(cookie.getName())) {
                String value = cookie.getValue();
                return value == null ? null : value.trim();
            }
        }

        return null;
    }
}
