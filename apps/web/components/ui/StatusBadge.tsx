import React from "react";
import { cn } from "@/lib/utils";

export type StatusType =
  | "available"
  | "under_verification"
  | "under_negotiation"
  | "rented"
  | "verified"
  | "valid"
  | "pending"
  | "expired"
  | "active"
  | "disabled";

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; textClass: string; bgClass: string; dotClass: string }
> = {
  available: {
    label: "Available",
    textClass: "text-[#1E9E6A]",
    bgClass: "bg-[#E3F6EE]",
    dotClass: "bg-[#1E9E6A]",
  },
  under_verification: {
    label: "Under Verification",
    textClass: "text-[#E8870E]",
    bgClass: "bg-[#FFF0D9]",
    dotClass: "bg-[#E8870E]",
  },
  under_negotiation: {
    label: "Under Negotiation",
    textClass: "text-[#E8870E]",
    bgClass: "bg-[#FFF0D9]",
    dotClass: "bg-[#E8870E]",
  },
  rented: {
    label: "Rented",
    textClass: "text-[#5B6B80]",
    bgClass: "bg-[#ECEFF4]",
    dotClass: "bg-[#5B6B80]",
  },
  verified: {
    label: "Verified",
    textClass: "text-[#1E9E6A]",
    bgClass: "bg-[#E3F6EE]",
    dotClass: "bg-[#1E9E6A]",
  },
  valid: {
    label: "Valid",
    textClass: "text-[#1E9E6A]",
    bgClass: "bg-[#E3F6EE]",
    dotClass: "bg-[#1E9E6A]",
  },
  pending: {
    label: "Pending",
    textClass: "text-[#E8870E]",
    bgClass: "bg-[#FFF0D9]",
    dotClass: "bg-[#E8870E]",
  },
  expired: {
    label: "Expired",
    textClass: "text-[#E5484D]",
    bgClass: "bg-[#FDECEC]",
    dotClass: "bg-[#E5484D]",
  },
  active: {
    label: "Active",
    textClass: "text-[#1E9E6A]",
    bgClass: "bg-[#E3F6EE]",
    dotClass: "bg-[#1E9E6A]",
  },
  disabled: {
    label: "Disabled",
    textClass: "text-[#5B6B80]",
    bgClass: "bg-[#ECEFF4]",
    dotClass: "bg-[#5B6B80]",
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  const config = statusConfig[normalized] || {
    label: label || status,
    textClass: "text-[#5B6B80]",
    bgClass: "bg-[#ECEFF4]",
    dotClass: "bg-[#5B6B80]",
  };

  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-5 px-2 rounded-[6px] text-[11px] font-medium leading-none select-none",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", config.dotClass)} />
      <span>{displayLabel}</span>
    </span>
  );
}
