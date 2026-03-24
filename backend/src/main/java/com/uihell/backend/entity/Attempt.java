package com.uihell.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;

@Entity
@Table(name = "attempts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    private Long completionTimeMs;
    private Integer clickCount;
    private Integer frustrationLevel;
    private Integer errorCount;
    private Integer submitAttempts;
    private Boolean completed;

    @Column(nullable = false)
    private Instant createdAt;
}
