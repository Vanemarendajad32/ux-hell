package com.uihell.backend.support;

import com.uihell.backend.config.SecurityConfig;
import com.uihell.backend.exception.GlobalExceptionHandler;
import com.uihell.backend.security.JwtAuthenticationFilter;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;

@TestConfiguration
@Import({ SecurityConfig.class, JwtAuthenticationFilter.class, GlobalExceptionHandler.class })
public class WebMvcSecurityTestConfig {}
