"use client";

import { ChevronDown, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/services/auth-service";

type DashboardHeaderProps = {
  username: string;
};

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutUser();
    } finally {
      router.push("/");
    }
  }

<<<<<<< ux-hell-24-login-session-logout
=======
type DashboardHeaderProps = {
  username: string;
};

export default function DashboardHeader({ username }: DashboardHeaderProps) {
>>>>>>> main
  return (
    <header className="px-2.5 py-2 sm:px-5 sm:py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[1.4rem] leading-none font-bold tracking-tight text-slate-900 sm:text-[2.2rem]">
          UX HELL
        </p>

        <details className="group relative">
          <summary className="list-none">
<<<<<<< ux-hell-24-login-session-logout
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-md shadow-orange-100/60 transition-colors hover:bg-rose-50/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100">
              <UserRound className="size-4 text-rose-400" />
              {username}
              <ChevronDown className="size-4 text-slate-500 transition-transform group-open:rotate-180" />
=======
            <span className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-rose-100 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-md shadow-orange-100/60 transition-colors hover:bg-rose-50/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-100 sm:min-h-0 sm:px-3 sm:py-2 sm:text-sm">
              <UserRound className="size-3.5 text-rose-400 sm:size-4" />
              {username}
              <ChevronDown className="size-3.5 text-slate-500 transition-transform group-open:rotate-180 sm:size-4" />
>>>>>>> main
            </span>
          </summary>

          <div className="absolute top-full right-0 z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-rose-100 bg-white py-1 shadow-xl shadow-orange-100/70">
            <button
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-rose-50"
              type="button"
            >
              Profile
            </button>
            <button
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-rose-50"
              type="button"
            >
              Settings
            </button>
            <button
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-rose-600 transition-colors hover:bg-rose-50"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </details>
      </div>
    </header>
  );
}
