import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, ShieldCheck } from "lucide-react";

interface InfoBannerProps {
  title?: string;
  children?: React.ReactNode;
  message?: string;
  variant?: "info" | "success" | "warning";
  className?: string;
}

export function InfoBanner({
  title,
  children,
  message,
  variant = "info",
  className,
}: InfoBannerProps) {
  const isInfo = variant === "info";
  const isSuccess = variant === "success";

  const content = children || message;

  return (
    <div
      className={cn(
        "rounded-field p-3.5 sm:p-4 flex items-start gap-3 border",
        isInfo && "bg-info border-[#D2E2F8] text-ink-700",
        isSuccess && "bg-success-soft border-[#C5EBDA] text-[#1E9E6A]",
        variant === "warning" && "bg-status-orange-bg border-[#FCE1B6] text-status-orange-text",
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isInfo && <Info className="w-5 h-5 text-brand-link stroke-[2]" />}
        {isSuccess && <ShieldCheck className="w-5 h-5 text-[#1E9E6A] stroke-[2]" />}
        {variant === "warning" && <AlertTriangle className="w-5 h-5 text-status-orange-text stroke-[2]" />}
      </div>
      <div className="text-left flex-1 min-w-0">
        {title && (
          <h4
            className={cn(
              "text-[14px] font-semibold leading-snug mb-0.5",
              isInfo && "text-ink-900",
              isSuccess && "text-[#1E9E6A]",
              variant === "warning" && "text-[#E8870E]"
            )}
          >
            {title}
          </h4>
        )}
        {content && (
          <div className="text-[13px] leading-relaxed text-ink-700">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
