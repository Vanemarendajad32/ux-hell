"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/api/services/auth-service";
import {
  createDashboardData,
  type DashboardData,
} from "@/lib/dashboard/dashboard-view-model";
import { readRegistrationSession } from "@/lib/dashboard/registration-session";
import DashboardSurface from "./dashboard-surface";
import RegistrationSuccessModal from "./registration-success-modal";

const fallbackDashboardData: DashboardData = {
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
  const [username, setUsername] = useState("Survivor");

  useEffect(() => {
    setIsModalOpen(shouldShowSuccessModal);
  }, [shouldShowSuccessModal]);

  useEffect(() => {
    setDashboardData(createDashboardData());
    const registration = readRegistrationSession();
    const registrationUsername = registration?.username?.trim();
    if (registrationUsername) {
      setUsername(registrationUsername);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        const session = await getSession();
        if (!isActive) return;
        if (session.authenticated) {
          setUsername(session.username);
        }
      } catch {
        // ignore: dashboard should still render even if session check fails
      }
    })();

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
      <DashboardSurface data={dashboardData} username={username} />
      <RegistrationSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={username}
      />
    </div>
  );
}
