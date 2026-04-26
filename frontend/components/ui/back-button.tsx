"use client";

import HomeIcon from "../icons/home-icon";
import { useRouter } from "next/navigation";
import { Button } from "./button";

type BackButtonProps = {
  to?: string;
  className?: string;
  label?: string;
};

export default function BackButton({
  to = "/",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    router.push(to);
  }

  return (
    <Button
      variant="ghost"
      className={`inline-flex gap-2 text-slate-600 hover:text-slate-900 ${className}`}
      onClick={handleBack}
      aria-label="Home"
    >
      <HomeIcon />
    </Button>
  );
}
