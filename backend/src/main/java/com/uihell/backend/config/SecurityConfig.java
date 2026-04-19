package com.uihell.backend.config;

import com.uihell.backend.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    @Value("${app.cors.allowed-origins:http://localhost:3000}")
    private List<String> allowedOrigins;

    @Value("${app.monitoring.prometheus.username:prometheus}")
    private String prometheusUsername;

    @Value("${app.monitoring.prometheus.password:prometheus}")
    private String prometheusPassword;

    @Bean
    @Order(1)
    public SecurityFilterChain actuatorSecurityFilterChain(HttpSecurity http)
        throws Exception {
        http
            .securityMatcher("/actuator/**")
            .cors(cors -> cors.disable())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers(
                        "/actuator/health",
                        "/actuator/health/**"
                    )
                    .permitAll()
                    .requestMatchers("/actuator/prometheus")
                    .hasRole("PROMETHEUS")
                    .anyRequest()
                    .denyAll()
            )
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // Public vs protected routes
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers(
                        HttpMethod.OPTIONS,
                        "/**"
                    )
                    .permitAll()
                    .requestMatchers(
                        "/health",
                        "/actuator/health",
                        "/actuator/health/**",
                        "/api/auth/**",
                        "/api/leaderboard/**",
                        "/auth/**",
                        // "/api/attempts/**",
                        "/debug/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/v3/api-docs/**"
                    )
                    .permitAll()
                    .anyRequest()
                    .permitAll()
            )
            //  Handle unauthorized access (no/invalid token)
            .exceptionHandling(ex ->
                ex.authenticationEntryPoint(
                    (request, response, authException) -> {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.setContentType("application/json");
                        response
                            .getWriter()
                            .write(
                                """
                                    {
                                      "status": 401,
                                      "error": "Unauthorized",
                                      "message": "Authentication required"
                                    }
                                """
                            );
                    }
                )
            )
            .addFilterBefore(
                jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(
        PasswordEncoder passwordEncoder
    ) {
        UserDetails prometheusUser = User
            .withUsername(prometheusUsername)
            .password(passwordEncoder.encode(prometheusPassword))
            .roles("PROMETHEUS")
            .build();

        return new InMemoryUserDetailsManager(prometheusUser);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
