"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Building2,
  CirclePlus,
  Users,
  Calendar,
  Camera,
  KeyRound,
  BarChart3,
  Settings,
  Shield,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { PropSyncLogo } from "@/components/ui/PropSyncLogo";
import { UserRole, ROLE_PERMISSIONS } from "@/lib/permissions";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function Sidebar({
  userRole = "admin",
  isOpenMobile = false,
  onCloseMobile,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  const cleanRole = (userRole.toLowerCase().replace(/\s+/g, "_") as UserRole) || "admin";
  const perms = ROLE_PERMISSIONS[cleanRole] ?? ROLE_PERMISSIONS.admin;

  const allNavItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: House,
      visible: true,
    },
    {
      label: "Properties",
      href: "/properties",
      icon: Building2,
      visible: perms.canAccessProperties,
    },
    {
      label: "Add Property",
      href: "/properties/new",
      icon: CirclePlus,
      visible: perms.canAddProperty,
    },
    {
      label: "Leads",
      href: "/leads",
      icon: Users,
      visible: perms.canAccessLeads,
    },
    {
      label: "Calendar",
      href: "/calendar",
      icon: Calendar,
      visible: perms.canAccessCalendar,
    },
    {
      label: "Field Survey",
      href: "/field",
      icon: Camera,
      visible: perms.canAccessFieldSurvey,
    },
    {
      label: "My Properties",
      href: "/owner",
      icon: KeyRound,
      visible: perms.canAccessOwnerPortal,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: BarChart3,
      visible: perms.canAccessReports,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      visible: true,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: Shield,
      visible: perms.canAccessAdmin,
    },
  ];

  const navItems = allNavItems.filter((i) => i.visible);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container: 220px fixed, gradient #0B2B57 -> #071D3F */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between select-none transition-all duration-200",
          "w-[220px] md:w-[72px] lg:w-[220px]",
          "text-white overflow-hidden",
          "bg-gradient-to-b from-[#0B2B57] to-[#071D3F] border-r border-[#14376B]/40",
          isOpenMobile ? "translate-x-0 !w-[220px]" : "-translate-x-full lg:translate-x-0 md:translate-x-0",
          className
        )}
      >
        {/* Faint building watermark at bottom (opacity ~.25, masked fade) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[360px] pointer-events-none opacity-20 overflow-hidden mix-blend-screen"
          style={{
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 95%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sidebar-bg.png"
            className="w-full h-full object-cover object-bottom"
            alt=""
          />
        </div>

        {/* Top Section */}
        <div className="relative z-10">
          {/* Logo block */}
          <div className="pt-7 pb-6 px-5 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-[30px] h-[30px] flex-shrink-0 text-white flex items-center justify-center">
                <PropSyncLogo size={30} variant="white" />
              </div>
              <span className="text-[24px] font-semibold tracking-tight text-white font-sans md:hidden lg:inline leading-none">
                PropSync
              </span>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-white/70 hover:text-white p-1"
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
                  : pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={item.label}
                  className={cn(
                    "relative h-[42px] px-3.5 rounded-[10px] flex items-center gap-3.5 text-[15px] font-medium transition-all group select-none",
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#D5E2F5] hover:text-white hover:bg-white/[0.08]"
                  )}
                >
                  {/* Active sliding pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#1769EB] rounded-[10px] shadow-sm -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      "w-[22px] h-[22px] flex-shrink-0 transition-transform duration-150 relative z-10",
                      isActive ? "text-white stroke-[2.2]" : "text-[#D5E2F5] group-hover:text-white group-hover:translate-x-0.5 stroke-[1.8]"
                    )}
                  />
                  <span className="relative z-10 md:hidden lg:inline truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="relative z-10 p-4 border-t border-white/12 bg-[#071D3F]/40 backdrop-blur-xs">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 text-white flex-shrink-0">
              <PropSyncLogo size={22} variant="white" />
            </div>
            <div className="md:hidden lg:block min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight truncate">
                Smarter Real Estate Management
              </p>
              <p className="text-[11px] text-[#6F87A5] leading-tight mt-1 truncate">
                Connect. Track. Grow.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
