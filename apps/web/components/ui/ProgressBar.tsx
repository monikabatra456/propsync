"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  variant?: "blue" | "warning" | "success" | "auto";
  className?: string;
}

export function ProgressBar({
  current,
  total,
  label,
  variant = "auto",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, total > 0 ? (current / total) * 100 : 0));

  let fillColor = "bg-[#1769EB]";
  if (variant === "auto") {
    if (percentage === 100) {
      fillColor = "bg-[#16B77A]";
    } else if (percentage > 0) {
      fillColor = "bg-[#1769EB]";
    } else {
      fillColor = "bg-[#F4B740]";
    }
  } else if (variant === "warning") {
    fillColor = "bg-[#F4B740]";
  } else if (variant === "success") {
    fillColor = "bg-[#16B77A]";
  }

  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="flex justify-between text-[11px] font-semibold text-[#6F87A5]">
        {label && <span>{label}</span>}
        <span className="ml-auto font-mono">
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-1.5 bg-[#E6EEF8] rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", fillColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
