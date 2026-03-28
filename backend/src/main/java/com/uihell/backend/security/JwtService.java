package com.uihell.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final Key key = Keys.hmacShaKeyFor(
        "supersecretkeysupersecretkeysupersecret".getBytes()
    );

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(
                new Date(System.currentTimeMillis() + 1000 * 60 * 60)
            )
            .signWith(key)
            .compact();
    }
}
