"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import { UserRole, setCurrentUserRole } from "@/lib/permissions";

interface RoleGuardProps {
  requiredRoleName?: string;
  currentRole: UserRole;
  children: React.ReactNode;
  allowed: boolean;
}

export function RoleGuard({
  requiredRoleName = "Authorized Personnel",
  currentRole,
  children,
  allowed,
}: RoleGuardProps) {
  if (allowed) {
    return <>{children}</>;
  }

  const roleLabels: Record<UserRole, string> = {
    admin: "Admin",
    sales: "Sales Executive",
    space_sales: "Space Sales",
    field: "Field Staff",
    owner: "Property Owner / Landlord",
  };

  const handleSwitchToAdmin = () => {
    setCurrentUserRole("admin");
    window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#FDECEC] text-[#E5484D] mx-auto flex items-center justify-center shadow-xs">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#E5484D] bg-[#FDECEC] px-3 py-1 rounded-full">
          403 Access Restricted
        </span>
        <h2 className="text-[26px] font-bold text-ink-900 tracking-tight">
          Unauthorized for {roleLabels[currentRole] || currentRole}
        </h2>
        <p className="text-[14px] text-ink-500 leading-relaxed max-w-md mx-auto">
          This module is designated for <span className="font-semibold text-ink-800">{requiredRoleName}</span>. Your current account role does not have viewing permissions for this dataset.
        </p>
      </div>

      <div className="bg-white p-4 rounded-card border border-line text-left text-[13px] space-y-2 shadow-xs">
        <h4 className="font-semibold text-ink-900 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Role Isolation Security Policy
        </h4>
        <p className="text-ink-600">
          Field staff accounts are isolated to mobile site surveys. Landlords are isolated to their own verified asset cashflow. To test this module, switch your session role below:
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/properties"
          className="w-full sm:w-auto px-5 py-2.5 rounded-field border border-line bg-white hover:bg-subtle text-ink-700 text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>

        <button
          onClick={handleSwitchToAdmin}
          className="w-full sm:w-auto px-5 py-2.5 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Switch to Admin View</span>
        </button>
      </div>
    </div>
  );
}
