"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronDown, Menu, User, Shield, LogOut } from "lucide-react";
import Link from "next/link";
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
    role: "Sales",
    initials: "JD",
  },
}: TopBarProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const placeholder = isAdmin
    ? "Search users, properties, or audit logs…"
    : "Search by locality, district, or project name…";

  return (
    <header className="h-[66px] bg-white border-b border-line flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 flex-shrink-0">
      {/* Left: Mobile hamburger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-[520px]">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-md hover:bg-subtle text-ink-700"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-[465px]">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[36px] pl-9 pr-4 rounded-[8px] bg-white border border-line hover:border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 text-[13px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-full hover:bg-subtle text-ink-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          {/* 8px red dot */}
          <span className="w-2 h-2 rounded-full bg-[#E5484D] absolute top-2 right-2 ring-2 ring-white" />
        </button>

        {/* User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 rounded-[8px] hover:bg-subtle transition-colors select-none text-left"
            aria-expanded={showUserMenu}
          >
            {/* 36px Navy Avatar */}
            <div className="w-9 h-9 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-[13px] tracking-wider flex-shrink-0 shadow-xs">
              {user.initials}
            </div>

            <div className="hidden sm:block">
              <span className="text-[14px] font-semibold text-ink-900 block leading-tight">
                {user.name}
              </span>
              <span className="text-[12px] text-ink-500 font-medium block leading-tight">
                {user.role}
              </span>
            </div>

            <ChevronDown className="w-4 h-4 text-ink-400 stroke-[2] ml-0.5" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-card border border-line shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3.5 py-2 border-b border-line sm:hidden">
                <p className="text-[13px] font-semibold text-ink-900">{user.name}</p>
                <p className="text-[11px] text-ink-500">{user.role}</p>
              </div>

              <Link
                href="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-ink-700 hover:bg-subtle transition-colors"
              >
                <User className="w-4 h-4 text-ink-500" />
                <span>Account Profile</span>
              </Link>

              {user.role === "Admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-ink-700 hover:bg-subtle transition-colors"
                >
                  <Shield className="w-4 h-4 text-ink-500" />
                  <span>Admin Panel</span>
                </Link>
              ) : null}

              <div className="h-[1px] bg-line my-1" />

              <Link
                href="/login"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-status-red-text hover:bg-status-red-bg transition-colors"
              >
                <LogOut className="w-4 h-4 text-status-red-text" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
