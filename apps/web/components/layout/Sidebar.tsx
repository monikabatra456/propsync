"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  PlusCircle,
  Users,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { PropSyncLogo } from "@/components/ui/PropSyncLogo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function Sidebar({
  userRole = "admin", // default role or can be passed dynamically
  isOpenMobile = false,
  onCloseMobile,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Properties",
      href: "/properties",
      icon: Building2,
    },
    {
      label: "Add Property",
      href: "/properties/new",
      icon: PlusCircle,
    },
    {
      label: "Leads",
      href: "/leads",
      icon: Users,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  // Admin item shown only to role `admin`
  if (userRole === "admin") {
    navItems.push({
      label: "Admin",
      href: "/admin",
      icon: Shield,
    });
  }

  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "sidebar-gradient text-white w-[198px] flex-shrink-0 flex flex-col justify-between fixed top-0 bottom-0 left-0 z-50 transition-transform duration-200 select-none",
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Top Section */}
        <div>
          {/* Logo block */}
          <div className="pt-6 pb-6 px-6 flex items-center justify-between">
            <Link href="/properties" className="flex items-center gap-3">
              <PropSyncLogo size={32} variant="white" />
              <span className="text-[23px] font-semibold tracking-tight text-white font-sans">
                PropSync
              </span>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-white/80 hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1 px-3 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/properties"
                  ? pathname === "/properties" || (pathname?.startsWith("/properties/") && pathname !== "/properties/new")
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "h-[44px] px-3.5 rounded-[8px] flex items-center gap-3 text-[15px] font-medium transition-colors group relative",
                    isActive
                      ? "bg-brand-600 text-white font-semibold shadow-xs"
                      : "text-[#B8C5DB] hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 stroke-[1.8] flex-shrink-0",
                      isActive ? "text-white stroke-[2.2]" : "text-[#B8C5DB] group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-white/10">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 text-brand-teal">
              {isAdminPage ? (
                <Shield className="w-5 h-5 stroke-[2]" />
              ) : (
                <PropSyncLogo size={22} variant="white" />
              )}
            </div>
            <div>
              <p className="text-[13px] font-medium text-white leading-tight">
                {isAdminPage ? "Secure & Trusted" : "Smarter Real Estate Management"}
              </p>
              {/* 32px teal accent line */}
              <div className="w-8 h-[2px] bg-brand-teal rounded-full my-1.5" />
              <p className="text-[11px] text-[#B8C5DB] leading-tight">
                {isAdminPage
                  ? "Your data is protected with industry standard security."
                  : "Connect. Track. Grow."}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
