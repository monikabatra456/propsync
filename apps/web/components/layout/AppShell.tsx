"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Building2,
  Plus,
  Users,
  Menu,
  Calendar,
  Camera,
  KeyRound,
  BarChart3,
  Settings,
  Shield,
  X,
} from "lucide-react";
import { getCurrentUserRole, DEMO_USERS, UserRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("admin");
  const pathname = usePathname();

  useEffect(() => {
    const role = getCurrentUserRole();
    setCurrentRole(role);
  }, [pathname]);

  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/pending-approval") ||
    pathname?.startsWith("/forgot-password");

  if (isAuthPage) {
    return <>{children}</>;
  }

  const userInfo = DEMO_USERS[currentRole] ?? DEMO_USERS.admin;

  const user = {
    name: userInfo.name,
    role: currentRole.charAt(0).toUpperCase() + currentRole.slice(1).replace("_", " "),
    initials: userInfo.initials,
    title: userInfo.title,
  };

  const moreItems = [
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Field Survey", href: "/field", icon: Camera },
    { label: "My Properties", href: "/owner", icon: KeyRound },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Admin Panel", href: "/admin", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex flex-col selection:bg-[#1769EB]/20 selection:text-[#0B2B57]">
      {/* Fixed Sidebar for desktop and tablet rail */}
      <Sidebar
        userRole={currentRole}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-[72px] lg:pl-[220px]">
        <TopBar
          user={user}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar (<768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#DCE8F5] flex items-center justify-around px-2 z-40 pb-[env(safe-area-inset-bottom)] shadow-lg">
        <Link
          href="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center w-14 h-full text-[10px] font-semibold transition-colors",
            pathname === "/dashboard" ? "text-[#1769EB]" : "text-[#6F87A5]"
          )}
        >
          <House className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/properties"
          className={cn(
            "flex flex-col items-center justify-center w-14 h-full text-[10px] font-semibold transition-colors",
            pathname?.startsWith("/properties") && pathname !== "/properties/new" ? "text-[#1769EB]" : "text-[#6F87A5]"
          )}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>Properties</span>
        </Link>

        {/* Raised Centre Add Button */}
        <Link
          href="/properties/new"
          className="relative -top-3 w-12 h-12 rounded-full bg-[#1769EB] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          aria-label="Add Property"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </Link>

        <Link
          href="/leads"
          className={cn(
            "flex flex-col items-center justify-center w-14 h-full text-[10px] font-semibold transition-colors",
            pathname === "/leads" ? "text-[#1769EB]" : "text-[#6F87A5]"
          )}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Leads</span>
        </Link>

        <button
          onClick={() => setMoreDrawerOpen(true)}
          className="flex flex-col items-center justify-center w-14 h-full text-[10px] font-semibold text-[#6F87A5] hover:text-[#102F57]"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile "More" Drawer */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMoreDrawerOpen(false)}
          />
          <div className="relative bg-white rounded-t-[20px] p-5 pb-8 space-y-3 z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE8F5]">
              <span className="text-[15px] font-bold text-[#102F57]">More Stations</span>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 rounded-full text-[#6F87A5] hover:bg-[#F5F8FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-[12px] border text-[13px] font-semibold transition-all",
                      isActive
                        ? "bg-[#EAF3FF] border-[#1769EB]/30 text-[#1769EB]"
                        : "bg-[#F5F8FC] border-[#DCE8F5] text-[#102F57] hover:bg-[#EAF3FF]/50"
                    )}
                  >
                    <Icon className="w-4 h-4 text-[#1769EB]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
