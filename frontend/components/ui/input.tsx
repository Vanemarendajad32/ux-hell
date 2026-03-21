import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
