"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type PillVariant =
  | "property_status"
  | "lead_status"
  | "lead_source"
  | "inquiry_tag"
  | "priority"
  | "survey_status"
  | "property_type"
  | "role";

interface StatusPillProps {
  value: string;
  variant?: PillVariant;
  className?: string;
  dot?: boolean;
}

export function StatusPill({
  value,
  variant = "property_status",
  className,
  dot = false,
}: StatusPillProps) {
  const norm = value.toLowerCase().replace(/[\s_-]+/g, "_");

  let colorClasses = "bg-[#EEF2F7] text-[#6F87A5]";
  let dotColor = "bg-[#6F87A5]";
  let label = value;

  if (variant === "property_status") {
    if (norm === "available") {
      colorClasses = "bg-[#E3F7EE] text-[#0F9D63]";
      dotColor = "bg-[#16B77A]";
      label = "Available";
    } else if (norm === "under_verification") {
      colorClasses = "bg-[#FFF1DC] text-[#E08A00]";
      dotColor = "bg-[#E08A00]";
      label = "Under Verification";
    } else if (norm === "rented") {
      colorClasses = "bg-[#E3F7EE] text-[#0F9D63]";
      dotColor = "bg-[#16B77A]";
      label = "Rented";
    } else if (norm === "not_interested") {
      colorClasses = "bg-[#EEF2F7] text-[#6F87A5]";
      dotColor = "bg-[#6F87A5]";
      label = "Not Interested";
    }
  } else if (variant === "lead_status") {
    if (norm === "interested") {
      colorClasses = "bg-[#E3F7EE] text-[#0F9D63]";
      dotColor = "bg-[#16B77A]";
      label = "Interested";
    } else if (norm === "follow_up") {
      colorClasses = "bg-[#EAF3FF] text-[#1769EB]";
      dotColor = "bg-[#1769EB]";
      label = "Follow Up";
    } else if (norm === "site_visit_scheduled" || norm === "site_visit") {
      colorClasses = "bg-[#FFF3D6] text-[#B7791F]";
      dotColor = "bg-[#F4B740]";
      label = "Site Visit Scheduled";
    } else if (norm === "in_discussion") {
      colorClasses = "bg-[#F0EAFD] text-[#7A4FE0]";
      dotColor = "bg-[#7A4FE0]";
      label = "In Discussion";
    } else if (norm === "converted" || norm === "won") {
      colorClasses = "bg-[#E3F7EE] text-[#0F9D63]";
      dotColor = "bg-[#16B77A]";
      label = "Converted";
    } else if (norm === "not_interested" || norm === "lost") {
      colorClasses = "bg-[#EEF2F7] text-[#6F87A5]";
      dotColor = "bg-[#6F87A5]";
      label = "Not Interested";
    }
  } else if (variant === "lead_source") {
    if (norm === "website") {
      colorClasses = "bg-[#EAF3FF] text-[#1769EB]";
    } else if (norm === "google_ads" || norm === "google") {
      colorClasses = "bg-[#FDECEC] text-[#E5484D]";
    } else if (norm === "referral") {
      colorClasses = "bg-[#F0EAFD] text-[#7A4FE0]";
    } else if (norm === "facebook") {
      colorClasses = "bg-[#EAF3FF] text-[#1769EB]";
    } else if (norm === "property_portals" || norm === "portal") {
      colorClasses = "bg-[#E1F6F6] text-[#12A3A3]";
    }
  } else if (variant === "inquiry_tag") {
    if (norm === "inquiry") {
      colorClasses = "bg-[#EAF3FF] text-[#1769EB]";
      label = "INQUIRY";
    } else if (norm === "site_visit") {
      colorClasses = "bg-[#F0EAFD] text-[#7A4FE0]";
      label = "SITE VISIT";
    } else if (norm === "negotiation") {
      colorClasses = "bg-[#FFF1DC] text-[#E08A00]";
      label = "NEGOTIATION";
    }
  } else if (variant === "priority") {
    if (norm.includes("high")) {
      colorClasses = "bg-[#DCEBFF] text-[#1769EB]";
      label = "High Priority";
    } else {
      colorClasses = "bg-[#EEF2F7] text-[#6F87A5]";
      label = "Medium";
    }
  } else if (variant === "property_type") {
    if (norm === "office") {
      colorClasses = "bg-[#EAF3FF] text-[#1769EB]";
    } else if (norm === "retail") {
      colorClasses = "bg-[#F0EAFD] text-[#7A4FE0]";
    } else if (norm === "industrial") {
      colorClasses = "bg-[#EEF2F7] text-[#6F87A5]";
    } else if (norm === "commercial") {
      colorClasses = "bg-[#E1F6F6] text-[#12A3A3]";
    } else if (norm === "residential") {
      colorClasses = "bg-[#FFF3D6] text-[#B7791F]";
    }
  } else if (variant === "survey_status") {
    if (norm === "in_progress") {
      colorClasses = "bg-[#FFF3D6] text-[#B7791F]";
      dotColor = "bg-[#F4B740]";
      label = "In Progress";
    } else if (norm === "pending") {
      colorClasses = "bg-[#FFF8E7] text-[#C2821E]";
      dotColor = "bg-[#F4B740]";
      label = "Pending";
    } else if (norm === "submitted") {
      colorClasses = "bg-[#E3F7EE] text-[#0F9D63]";
      dotColor = "bg-[#16B77A]";
      label = "Submitted";
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-tight transition-transform hover:scale-[1.03] select-none",
        colorClasses,
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />}
      <span>{label}</span>
    </span>
  );
}
