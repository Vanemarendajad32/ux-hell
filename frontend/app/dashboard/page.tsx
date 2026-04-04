import { Suspense } from "react";
import { createDashboardData } from "@/lib/dashboard/dashboard-view-model";
import DashboardContent from "./_components/dashboard-content";
import DashboardSurface from "./_components/dashboard-surface";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <DashboardSurface data={createDashboardData()} username="Loading..." />
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
