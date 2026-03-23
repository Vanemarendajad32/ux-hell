import type * as React from "react";

import { cn } from "@/lib/utils";

const cardBaseClassName =
  "group/card flex flex-col gap-4 rounded-3xl border border-rose-200 bg-white p-6 text-sm text-slate-900 shadow-2xl data-[size=sm]:gap-3 data-[size=sm]:rounded-2xl data-[size=sm]:p-5 data-[size=sm]:shadow-lg";
const cardHeaderClassName =
  "group/card-header @container/card-header grid auto-rows-min items-start gap-1 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]";
const cardTitleClassName =
  "font-heading text-lg leading-snug font-semibold text-slate-900 group-data-[size=sm]/card:text-base";
const cardDescriptionClassName = "text-sm text-slate-600";
const cardActionClassName =
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end";
const cardContentClassName = "text-slate-700";
const cardFooterClassName = "flex items-center border-t border-rose-200 pt-4";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(cardBaseClassName, className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderClassName, className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleClassName, className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionClassName, className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(cardActionClassName, className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentClassName, className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterClassName, className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
