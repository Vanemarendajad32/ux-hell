"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

type BackButtonProps = {
  to?: string;
  className?: string;
  label?: string;
};

export default function BackButton({ to = "/", className = "", label = "Back" }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    router.push(to);
  }

  return (
    <Button
      variant="ghost"
      className={`inline-flex gap-2 text-slate-600 hover:text-slate-900 ${className}`}
      onClick={handleBack}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}