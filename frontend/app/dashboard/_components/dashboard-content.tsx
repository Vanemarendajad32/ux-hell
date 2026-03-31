"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
