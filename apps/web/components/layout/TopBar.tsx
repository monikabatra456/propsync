"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  Shield,
  LogOut,
  UserCheck,
  Briefcase,
  Building,
  KeyRound,
  Check,
} from "lucide-react";
import Link from "next/link";
import { UserRole, setCurrentUserRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onOpenMobileMenu?: () => void;
  user?: {
    name: string;
    role: string;
    initials: string;
  };
}

export function TopBar({
  onOpenMobileMenu,
  user = {
    name: "John Doe",
    role: "Admin",
    initials: "JD",
  },
}: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith("/admin");
  const isDashboardOrLeads = pathname === "/dashboard" || pathname === "/leads";
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const placeholder = isAdmin
    ? "Search users, properties, or audit logs…"
    : isDashboardOrLeads
    ? "Search properties, locations, leads…"
    : "Search by locality, district, or project name…";

  const availableRoles: { id: UserRole; label: string; icon: React.ElementType }[] = [
    { id: "admin", label: "Admin (Full Access)", icon: Shield },
    { id: "sales", label: "Sales (Commercial Deals)", icon: Briefcase },
    { id: "field", label: "Field Staff (Site Survey)", icon: UserCheck },
    { id: "space_sales", label: "Space Sales (Retail)", icon: Building },
    { id: "owner", label: "Owner (Landlord View)", icon: KeyRound },
  ];

  const handleSwitchRole = (role: UserRole) => {
    setCurrentUserRole(role);
    setShowUserMenu(false);
    if (role === "field") router.push("/field");
    else if (role === "owner") router.push("/owner");
    else router.push("/dashboard");
    window.location.reload();
  };

  const currentRoleNormalized = user.role.toLowerCase().replace(/\s+/g, "_");

  return (
    <header className="h-[60px] bg-white border-b border-[#DCE8F5] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 flex-shrink-0">
      {/* Left: Mobile hamburger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-[520px]">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-md hover:bg-[#F5F8FC] text-[#102F57]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-[470px]">
          <Search className="w-4 h-4 text-[#6F87A5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[38px] pl-9 pr-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:border-[#6F87A5]/40 focus:border-[#1769EB] focus:ring-3 focus:ring-[#1769EB]/20 text-[13px] text-[#102F57] placeholder:text-[#6F87A5]/80 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Bell with 8px red dot */}
        <button
          className="relative p-2 rounded-full hover:bg-[#F5F8FC] text-[#102F57] transition-colors group"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8] text-[#102F57] group-hover:scale-105 transition-transform" />
          <span className="w-2 h-2 rounded-full bg-[#E5484D] absolute top-2 right-2 ring-2 ring-white animate-pulseRing" />
        </button>

        {/* User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-[10px] hover:bg-[#F5F8FC] transition-colors select-none text-left"
            aria-expanded={showUserMenu}
          >
            {/* 36px Navy Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#0B2B57] text-white flex items-center justify-center font-bold text-[13px] tracking-wider flex-shrink-0 shadow-xs">
              {user.initials}
            </div>

            <div className="hidden sm:block text-left">
              <span className="text-[14px] font-semibold text-[#102F57] block leading-tight">
                {user.name}
              </span>
              <span className="text-[12px] text-[#6F87A5] font-medium block leading-tight">
                {user.role}
              </span>
            </div>

            <ChevronDown className="w-4 h-4 text-[#6F87A5] stroke-[2] ml-0.5" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-[16px] border border-[#DCE8F5] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-[#DCE8F5]">
                <p className="text-[13px] font-semibold text-[#102F57]">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#16B77A]" />
                  <span className="text-[11px] font-medium text-[#6F87A5] uppercase tracking-wider">{user.role}</span>
                </div>
              </div>

              {/* Dynamic Role Switcher */}
              <div className="px-4 pt-2.5 pb-1 text-[11px] font-bold text-[#6F87A5] uppercase tracking-wider">
                Switch Role Context
              </div>

              <div className="space-y-0.5 px-2">
                {availableRoles.map((r) => {
                  const Icon = r.icon;
                  const isCurrent = currentRoleNormalized === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSwitchRole(r.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors text-left",
                        isCurrent
                          ? "bg-[#0B2B57] text-white font-semibold"
                          : "text-[#102F57] hover:bg-[#F5F8FC]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-3.5 h-3.5", isCurrent ? "text-[#1769EB]" : "text-[#6F87A5]")} />
                        <span>{r.label}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#16B77A]" />}
                    </button>
                  );
                })}
              </div>

              <div className="h-[1px] bg-[#DCE8F5] my-2" />

              <Link
                href="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#102F57] hover:bg-[#F5F8FC] transition-colors"
              >
                <User className="w-4 h-4 text-[#6F87A5]" />
                <span>Account & Settings</span>
              </Link>

              {user.role === "Admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#102F57] hover:bg-[#F5F8FC] transition-colors"
                >
                  <Shield className="w-4 h-4 text-[#7A4FE0]" />
                  <span>Admin Panel</span>
                </Link>
              ) : null}

              <div className="h-[1px] bg-[#DCE8F5] my-1" />

              <Link
                href="/login"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#E5484D] hover:bg-[#FDECEC] transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#E5484D]" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
