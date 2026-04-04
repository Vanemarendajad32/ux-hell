"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLeaderboard } from "@/lib/api/services/attempt-service";
import {
  createDashboardData,
  type DashboardData,
} from "@/lib/dashboard/dashboard-view-model";
import { readRegistrationSession } from "@/lib/dashboard/registration-session";
import { submitPendingAttempt } from "@/lib/tracking/submit-pending-attempt";
import DashboardSurface from "./dashboard-surface";
import RegistrationSuccessModal from "./registration-success-modal";

const fallbackDashboardData: DashboardData = createDashboardData();

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
    const registration = readRegistrationSession();
    const registrationUsername = registration?.username?.trim();
    if (registrationUsername && isActiveRef.current) {
      setUsername(registrationUsername);
    }

    await submitPendingAttempt();

    try {
      const leaderboard = await getLeaderboard(registration?.token);

      if (!isActiveRef.current) {
        return;
      }

      setDashboardData(
        createDashboardData({
          leaderboard,
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
          registration,
        }),
      );
    }
  }, []);

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
        username={username}
      />
    </div>
  );
}
