package com.uihell.backend.repository;

import com.uihell.backend.entity.Attempt;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUserIdAndCompletedTrueOrderByCreatedAtAsc(Long userId);

    Page<Attempt> findByCompletedTrueAndGameTypeIn(
        List<String> gameTypes,
        Pageable pageable
    );

    List<Attempt> findByCompletedTrueAndGameTypeIn(List<String> gameTypes);

    List<Attempt> findByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAscIdAsc(
        List<String> gameTypes
    );

    Optional<Attempt> findFirstByCompletedTrueAndGameTypeInOrderByCompletionTimeMsAscCreatedAtAsc(
        List<String> gameTypes
    );
}
