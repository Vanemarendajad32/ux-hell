import { Suspense } from "react";
import DashboardContent from "./_components/dashboard-content";
import DashboardSurface from "./_components/dashboard-surface";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSurface />}>
      <DashboardContent />
    </Suspense>
  );
}
