import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-4 focus-visible:ring-rose-100 focus-visible:border-rose-500 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold shadow-lg hover:opacity-90",
        outline:
          "rounded-xl border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50",
        secondary:
          "rounded-xl border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50",
        ghost: "rounded-xl text-slate-700 hover:bg-slate-50",
        destructive:
          "rounded-xl bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-100",
        link: "text-slate-500 underline text-sm text-left hover:text-slate-700",
      },
      size: {
        default:
          "h-11 gap-2 px-6 py-3 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-8 gap-1.5 px-3 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-9 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-12 gap-2.5 px-8 text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-11 rounded-2xl",
        "icon-xs": "size-8 rounded-xl",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
