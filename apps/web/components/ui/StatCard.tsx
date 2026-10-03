import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  delta?: {
    text?: string;
    value?: string;
    isPositive?: boolean;
    prefix?: string;
  };
  subtext?: string;
  progress?: {
    percentage: number;
    sublabel?: string;
  };
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  subtext,
  progress,
  className,
}: StatCardProps) {
  const deltaText = delta?.text || delta?.value;

  return (
    <div
      className={cn(
        "bg-white rounded-card border border-line p-4 sm:p-5 flex flex-col justify-between shadow-card transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-[10px] bg-[#EEF2F8] flex items-center justify-center text-navy-800 flex-shrink-0">
          <Icon className="w-5 h-5 stroke-[1.8]" />
        </div>
        <div className="text-right">
          <span className="text-[13px] font-medium text-ink-500 block leading-tight">
            {label}
          </span>
          <div className="text-[30px] font-bold text-ink-900 tracking-tight leading-none mt-1">
            {value}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2">
        {progress ? (
          <div>
            <div className="w-full bg-[#E3E8F0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.max(0, progress.percentage))}%` }}
              />
            </div>
            {progress.sublabel && (
              <span className="text-[12px] font-medium text-ink-500 mt-1.5 block">
                {progress.sublabel}
              </span>
            )}
          </div>
        ) : deltaText ? (
          <div className="flex items-center gap-1 text-[12px] font-medium">
            <span
              className={cn(
                delta?.isPositive ? "text-[#1E9E6A]" : "text-ink-500"
              )}
            >
              {delta?.prefix || (delta?.isPositive ? "↑ " : "")}
              {deltaText}
            </span>
          </div>
        ) : subtext ? (
          <span className="text-[12px] font-medium text-ink-500">{subtext}</span>
        ) : null}
      </div>
    </div>
  );
}
