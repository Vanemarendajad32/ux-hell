package com.uihell.backend.service;

import static com.uihell.backend.dto.LeaderboardGameType.ACCOUNT_VERIFICATION;
import static com.uihell.backend.dto.LeaderboardGameType.REGISTRATION;
import static com.uihell.backend.dto.LeaderboardGameType.ROBOT_TEST;

import com.uihell.backend.dto.LeaderboardEntryResponse;
import com.uihell.backend.dto.LeaderboardGameType;
import com.uihell.backend.dto.LeaderboardResponse;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardService {

    private static final Map<LeaderboardGameType, LeaderboardGameData> MOCK_DATA = Map.of(
        REGISTRATION,
        new LeaderboardGameData(
            "0:42",
            "9,850",
            List.of(
                new LeaderboardEntryResponse(1, "SpeedRunner", "0:42", "15%", "9,850", "2026-03-14"),
                new LeaderboardEntryResponse(2, "UX_Master", "0:58", "20%", "9,620", "2026-03-13"),
                new LeaderboardEntryResponse(3, "PatternHunter", "1:05", "25%", "9,380", "2026-03-14"),
                new LeaderboardEntryResponse(4, "ClickWizard", "1:11", "30%", "9,150", "2026-03-12"),
                new LeaderboardEntryResponse(5, "DarkSlayer", "1:29", "35%", "8,820", "2026-03-14"),
                new LeaderboardEntryResponse(6, "CookieCrusher", "1:35", "42%", "8,550", "2026-03-13"),
                new LeaderboardEntryResponse(7, "FormNinja", "1:43", "48%", "8,280", "2026-03-11"),
                new LeaderboardEntryResponse(8, "PopupHater", "1:58", "55%", "7,890", "2026-03-14"),
                new LeaderboardEntryResponse(9, "CloseButton", "2:07", "63%", "7,540", "2026-03-10"),
                new LeaderboardEntryResponse(10, "AntiPattern", "2:25", "72%", "7,120", "2026-03-14")
            )
        ),
        ROBOT_TEST,
        new LeaderboardGameData(
            "0:31",
            "9,920",
            List.of(
                new LeaderboardEntryResponse(1, "BotBreaker", "0:31", "8%", "9,920", "2026-03-15"),
                new LeaderboardEntryResponse(2, "CaptchaQueen", "0:37", "10%", "9,770", "2026-03-14"),
                new LeaderboardEntryResponse(3, "ScrollSamurai", "0:45", "18%", "9,540", "2026-03-13"),
                new LeaderboardEntryResponse(4, "HoverGhost", "0:56", "21%", "9,300", "2026-03-12"),
                new LeaderboardEntryResponse(5, "JitterClick", "1:04", "28%", "9,060", "2026-03-14"),
                new LeaderboardEntryResponse(6, "LoopDodger", "1:13", "34%", "8,830", "2026-03-11"),
                new LeaderboardEntryResponse(7, "FocusTrap", "1:22", "40%", "8,610", "2026-03-10"),
                new LeaderboardEntryResponse(8, "UndoHero", "1:39", "52%", "8,130", "2026-03-09")
            )
        ),
        ACCOUNT_VERIFICATION,
        new LeaderboardGameData(
            "1:12",
            "9,430",
            List.of(
                new LeaderboardEntryResponse(1, "TokenTamer", "1:12", "19%", "9,430", "2026-03-15"),
                new LeaderboardEntryResponse(2, "VerifierPro", "1:20", "22%", "9,280", "2026-03-14"),
                new LeaderboardEntryResponse(3, "MultiTabber", "1:27", "26%", "9,140", "2026-03-13"),
                new LeaderboardEntryResponse(4, "OTPHunter", "1:34", "29%", "9,010", "2026-03-12"),
                new LeaderboardEntryResponse(5, "LinkChaser", "1:45", "33%", "8,820", "2026-03-13"),
                new LeaderboardEntryResponse(6, "ModalRunner", "1:53", "38%", "8,670", "2026-03-11"),
                new LeaderboardEntryResponse(7, "CodeShifter", "2:02", "45%", "8,410", "2026-03-10"),
                new LeaderboardEntryResponse(8, "TimeoutMage", "2:16", "53%", "8,120", "2026-03-09"),
                new LeaderboardEntryResponse(9, "ResendLoop", "2:32", "61%", "7,760", "2026-03-08")
            )
        )
    );

    public LeaderboardResponse getLeaderboardByGame(LeaderboardGameType gameType, int page, int size) {
        LeaderboardGameData gameData = MOCK_DATA.get(gameType);
        List<LeaderboardEntryResponse> allEntries = gameData.entries();
        int totalPlayers = allEntries.size();

        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, totalPlayers);
        List<LeaderboardEntryResponse> paginatedEntries = fromIndex >= totalPlayers
            ? Collections.emptyList()
            : allEntries.subList(fromIndex, toIndex);

        int totalPages = totalPlayers == 0 ? 0 : (int) Math.ceil((double) totalPlayers / size);

        return new LeaderboardResponse(
            gameType.apiValue(),
            gameData.bestTime(),
            gameData.topScore(),
            totalPlayers,
            page,
            size,
            totalPages,
            paginatedEntries
        );
    }

    private record LeaderboardGameData(
        String bestTime,
        String topScore,
        List<LeaderboardEntryResponse> entries
    ) {}
}
