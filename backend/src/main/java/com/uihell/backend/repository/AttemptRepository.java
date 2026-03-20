package com.uihell.backend.repository;

import com.uihell.backend.entity.Attempt;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    @Query(
        """
            SELECT a FROM Attempt a
            WHERE a.completed = true
            ORDER BY a.completionTimeMs ASC
        """
    )
    List<Attempt> findLeaderboard();
}
