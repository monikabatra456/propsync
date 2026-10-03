import React from "react";
import { cn } from "@/lib/utils";
import { Shield, Briefcase, MapPin, User, Building } from "lucide-react";

export type UserRole = "admin" | "sales" | "field" | "space_sales" | "owner";

interface RoleBadgeProps {
  role: UserRole | string;
  showIcon?: boolean;
  className?: string;
}

const roleConfig: Record<
  string,
  { label: string; textClass: string; bgClass: string; icon: React.ElementType }
> = {
  admin: {
    label: "Admin",
    textClass: "text-[#6B4FD8]",
    bgClass: "bg-[#EDE7FB]",
    icon: Shield,
  },
  sales: {
    label: "Sales",
    textClass: "text-[#2563C9]",
    bgClass: "bg-[#E3EEFC]",
    icon: Briefcase,
  },
  field: {
    label: "Field",
    textClass: "text-[#1E9E6A]",
    bgClass: "bg-[#E3F6EE]",
    icon: MapPin,
  },
  space_sales: {
    label: "Space Sales",
    textClass: "text-[#E8870E]",
    bgClass: "bg-[#FFF0D9]",
    icon: Building,
  },
  owner: {
    label: "Owner",
    textClass: "text-[#E5484D]",
    bgClass: "bg-[#FDECEC]",
    icon: User,
  },
};

export function RoleBadge({ role, showIcon = true, className }: RoleBadgeProps) {
  const normalized = role.toLowerCase().replace(/[\s-]+/g, "_");
  const config = roleConfig[normalized] || {
    label: role,
    textClass: "text-[#6B7A90]",
    bgClass: "bg-[#ECEFF4]",
    icon: User,
  };

  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-[22px] px-2.5 rounded-[999px] text-[11px] font-semibold leading-none select-none",
        config.bgClass,
        config.textClass,
        className
      )}
    >
      {showIcon && <IconComponent className="w-3 h-3 stroke-[2.2]" />}
      <span>{config.label}</span>
    </span>
  );
}
