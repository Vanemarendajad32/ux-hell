"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMyAttempts } from "@/lib/api/services/attempt-service";
import { getSession } from "@/lib/api/services/auth-service";
import {
  getLeaderboard as getGlobalLeaderboard,
  type LeaderboardGameType,
} from "@/lib/api/services/leaderboard-service";
import {
  createDashboardData,
  type DashboardData,
} from "@/lib/dashboard/dashboard-view-model";
import {
  clearRegistrationSession,
  readRegistrationSession,
} from "@/lib/dashboard/registration-session";
import type { GameType } from "@/lib/tracking/game-types";
import { clearPendingAttempt } from "@/lib/tracking/pending-attempt";
import { submitPendingAttempt } from "@/lib/tracking/submit-pending-attempt";
import DashboardSurface from "./dashboard-surface";
import RegistrationSuccessModal from "./registration-success-modal";

const fallbackDashboardData: DashboardData = createDashboardData();
const globalLeaderboardMappings: Array<{
  dashboardGameType: GameType;
  leaderboardGameType: LeaderboardGameType;
}> = [
  {
    dashboardGameType: "registration",
    leaderboardGameType: "registration",
  },
  {
    dashboardGameType: "checkbox-hell",
    leaderboardGameType: "robot-test",
  },
  {
    dashboardGameType: "account-verification",
    leaderboardGameType: "account-verification",
  },
];

function createEmptyGlobalRanks(): Partial<Record<GameType, number | null>> {
  return {
    registration: null,
    "checkbox-hell": null,
    "account-verification": null,
    unknown: null,
  };
}

async function loadGlobalRanks(): Promise<
  Partial<Record<GameType, number | null>>
> {
  const baseRanks = createEmptyGlobalRanks();
  const responses = await Promise.allSettled(
    globalLeaderboardMappings.map((mapping) =>
      getGlobalLeaderboard(mapping.leaderboardGameType, 0, 1),
    ),
  );

  responses.forEach((response, index) => {
    const mapping = globalLeaderboardMappings[index];
    if (!mapping) {
      return;
    }

    baseRanks[mapping.dashboardGameType] =
      response.status === "fulfilled"
        ? (response.value.currentUserRank ?? null)
        : null;
  });

  return baseRanks;
}

export default function DashboardContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldShowSuccessModal = searchParams.get("registered") === "true";
  const [isModalOpen, setIsModalOpen] = useState(shouldShowSuccessModal);
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    fallbackDashboardData,
  );
  const [username, setUsername] = useState("Survivor");
  const isActiveRef = useRef(true);

  const loadDashboard = useCallback(async () => {
    if (!isActiveRef.current) {
      return;
    }

    setDashboardData(createDashboardData());
    let sessionUsername: string | null = null;
    try {
      const session = await getSession();
      if (!session.authenticated) {
        clearRegistrationSession();
        clearPendingAttempt();
        router.replace("/login");
        return;
      }
      sessionUsername = session.username;
    } catch {
      clearRegistrationSession();
      clearPendingAttempt();
      router.replace("/login");
      return;
    }

    const registration = readRegistrationSession();
    if (isActiveRef.current && sessionUsername) {
      setUsername(sessionUsername);
    }

    await submitPendingAttempt();

    try {
      const [leaderboard, globalRanks] = await Promise.all([
        getMyAttempts(),
        loadGlobalRanks(),
      ]);

      if (!isActiveRef.current) {
        return;
      }

      setDashboardData(
        createDashboardData({
          leaderboard,
          globalRanks,
          registration,
        }),
      );
    } catch {
      if (!isActiveRef.current) {
        return;
      }

      setDashboardData(
        createDashboardData({
          leaderboard: [],
          globalRanks: createEmptyGlobalRanks(),
          registration,
        }),
      );
    }
  }, [router]);

  useEffect(() => {
    setIsModalOpen(shouldShowSuccessModal);
  }, [shouldShowSuccessModal]);

  useEffect(() => {
    isActiveRef.current = true;
    loadDashboard();

    return () => {
      isActiveRef.current = false;
    };
  }, [loadDashboard]);

  function handleCloseModal() {
    setIsModalOpen(false);
    router.replace(pathname);
  }

  return (
    <div className="relative">
      <DashboardSurface
        data={dashboardData}
        onAttemptRecorded={loadDashboard}
        username={username}
      />
      <RegistrationSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
