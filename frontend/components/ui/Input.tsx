import React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const inputClassName = "border-2 border-slate-200 rounded-xl px-4 py-3.5 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none";

export default function Input({ label, error, ...props }: InputProps) {
  const errorClassName = error ? "border-red-500" : undefined;

  return (
    <div className="flex flex-col mb-4">
      <label
        className="block text-sm font-semibold mb-2.5 text-slate-700"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        id={props.name}
        {...props}
        className={cn(inputClassName, errorClassName)}
      />
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
