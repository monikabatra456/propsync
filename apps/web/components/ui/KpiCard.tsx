"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FlipCard } from "./FlipCard";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  delta?: {
    text: string;
    isPositive?: boolean;
    prefix?: string;
  };
  subtext?: string;
  sparkline?: boolean;
  ghost?: "building" | "people" | "target";
  breakdown?: { label: string; count: string | number }[];
  className?: string;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  subtext,
  sparkline = false,
  ghost,
  breakdown,
  className,
}: KpiCardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const frontContent = (
    <div
      className={cn(
        "relative w-full h-[140px] bg-white rounded-[16px] border border-[#DCE8F5] p-4 sm:p-4.5 flex flex-col justify-between shadow-sm overflow-hidden select-none",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#DCE8F5]",
        className
      )}
    >
      {/* Ghost illustration bottom-right */}
      {ghost && (
        <div className="absolute -bottom-1 -right-1 w-[85px] h-[75px] pointer-events-none opacity-15 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/brand/ghost-${ghost}.svg`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Sparkline curve bottom-right */}
      {sparkline && !ghost && (
        <div className="absolute right-3.5 bottom-2.5 w-[105px] h-[40px] pointer-events-none">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <path
              d="M 2 32 Q 22 28, 38 34 T 68 22 T 98 8"
              fill="none"
              stroke="#1769EB"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75 group-hover:opacity-100 transition-opacity"
            />
            <circle cx="98" cy="8" r="3" fill="#1769EB" />
          </svg>
        </div>
      )}

      {/* Top row: Icon tile + Label & Value */}
      <div className="flex items-start justify-between relative z-10 gap-2">
        <div className="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-[13px] bg-[#EAF3FF] flex items-center justify-center text-[#0B2B57] flex-shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </div>
        <div className="text-right min-w-0 flex-1">
          <span className="text-[12px] sm:text-[13px] font-medium text-[#6F87A5] block leading-tight truncate">
            {label}
          </span>
          <div
            className={cn(
              "font-bold text-[#102F57] tracking-tight leading-none mt-1 truncate",
              typeof displayValue === "string" && displayValue.length > 8
                ? "text-[22px] sm:text-[25px] xl:text-[27px]"
                : "text-[28px] sm:text-[30px] xl:text-[32px]"
            )}
          >
            {displayValue}
          </div>
        </div>
      </div>

      {/* Bottom row: Delta or subtext */}
      <div className="flex items-center text-[12px] font-medium relative z-10 pt-1">
        {delta ? (
          <span className={cn(delta.isPositive ? "text-[#16B77A]" : "text-[#6F87A5]", "flex items-center gap-1 truncate")}>
            {delta.prefix || (delta.isPositive ? "↑ " : "→ ")}
            {delta.text}
          </span>
        ) : subtext ? (
          <span className="text-[#6F87A5] truncate">{subtext}</span>
        ) : null}
      </div>
    </div>
  );

  if (!breakdown || breakdown.length === 0) {
    return frontContent;
  }

  const backContent = (
    <div className="w-full h-[140px] bg-[#0B2B57] text-white rounded-[16px] p-3.5 flex flex-col justify-between shadow-md border border-[#14376B] select-none overflow-hidden">
      {/* Header with room for the flip icon button */}
      <div className="flex items-center justify-between border-b border-white/12 pb-1.5 pr-6">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#DCEBFF] truncate">
          {label} Breakdown
        </span>
        <span className="text-[10px] text-white/60 flex-shrink-0">Details</span>
      </div>

      {/* 2x2 Grid with responsive typography */}
      <div className="grid grid-cols-2 gap-1.5 my-auto">
        {breakdown.slice(0, 4).map((item, idx) => (
          <div key={idx} className="bg-white/[0.09] hover:bg-white/[0.14] rounded-[7px] px-2 py-1 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-white/70 block truncate leading-tight">
              {item.label}
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold text-white block truncate leading-tight mt-0.5">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="text-[9px] sm:text-[10px] text-[#DCEBFF]/75 text-center leading-none">
        Click card or icon to flip back
      </div>
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      heightClass="h-[140px]"
      className={className}
    />
  );
}
