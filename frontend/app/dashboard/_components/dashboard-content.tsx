"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "@/lib/api/error";
import { getLeaderboard } from "@/lib/api/services/attempt-service";
import {
  createDashboardData,
  type DashboardData,
} from "@/lib/dashboard/dashboard-view-model";
import { readRegistrationSession } from "@/lib/dashboard/registration-session";
import DashboardSurface from "./dashboard-surface";
import RegistrationSuccessModal from "./registration-success-modal";

const fallbackDashboardData: DashboardData = {
  username: "Unknown survivor",
  email: "No registration email stored",
  totalTimePlayed: "--:--",
  totalClicks: 0,
  totalAttempts: 0,
  fastestTime: "--:--",
  lastTime: "--:--",
  leaderboardPlace: "Unranked",
};

export default function DashboardContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldShowSuccessModal = searchParams.get("registered") === "true";
  const [isModalOpen, setIsModalOpen] = useState(shouldShowSuccessModal);
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    fallbackDashboardData,
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsModalOpen(shouldShowSuccessModal);
  }, [shouldShowSuccessModal]);

  useEffect(() => {
    let isActive = true;

    async function loadDashboard() {
      const registration = readRegistrationSession();

      try {
        const leaderboard = await getLeaderboard();

        if (!isActive) {
          return;
        }

        setDashboardData(
          createDashboardData({
            leaderboard,
            registration,
          }),
        );
        setErrorMessage("");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setDashboardData(
          createDashboardData({
            leaderboard: [],
            registration,
          }),
        );
        setErrorMessage(
          `${getApiErrorMessage(error)} Showing locally available registration info only.`,
        );
      }
    }

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  function handleCloseModal() {
    setIsModalOpen(false);
    router.replace(pathname);
  }

  return (
    <div className="relative">
      <DashboardSurface data={dashboardData} errorMessage={errorMessage} />
      <RegistrationSuccessModal
        email={dashboardData.email}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={dashboardData.username}
      />
    </div>
  );
}
