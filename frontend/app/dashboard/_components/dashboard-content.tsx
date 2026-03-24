"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { registrationResult } from "../_data/registration-result";
import DashboardSurface from "./dashboard-surface";
import RegistrationSuccessModal from "./registration-success-modal";

export default function DashboardContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // Registration can later redirect here: /dashboard?registered=true
  const shouldShowSuccessModal = searchParams.get("registered") === "true";
  const [isModalOpen, setIsModalOpen] = useState(shouldShowSuccessModal);

  useEffect(() => {
    setIsModalOpen(shouldShowSuccessModal);
  }, [shouldShowSuccessModal]);

  function handleCloseModal() {
    setIsModalOpen(false);
    router.replace(pathname);
  }

  return (
    <div className="relative">
      <DashboardSurface />
      <RegistrationSuccessModal
        email={registrationResult.email}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={registrationResult.username}
      />
    </div>
  );
}
