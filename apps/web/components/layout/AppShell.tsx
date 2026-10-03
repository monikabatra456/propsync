"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { usePathname } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
  userRole?: string;
}

export function AppShell({ children, userRole: defaultRole = "admin" }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(defaultRole);
  const [currentEmail, setCurrentEmail] = useState("admin@propsync.com");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("propsync_current_role");
      const storedEmail = localStorage.getItem("propsync_current_email");
      if (storedRole) {
        setCurrentRole(storedRole.toLowerCase().replace(/\s+/g, "_"));
      }
      if (storedEmail) {
        setCurrentEmail(storedEmail);
      }
    }
  }, [pathname]);

  // If this is an auth page (like /login), do not render the sidebar/topbar shell
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");
  if (isAuthPage) {
    return <>{children}</>;
  }

  const roleLabels: Record<string, string> = {
    admin: "Admin",
    field_staff: "Field Staff",
    sales: "Sales",
    space_sales: "Space Sales",
    owner: "Owner",
  };

  const roleInitials: Record<string, string> = {
    admin: "AD",
    field_staff: "FS",
    sales: "JD",
    space_sales: "SS",
    owner: "OW",
  };

  const user = {
    name: currentRole === "admin" ? "John Doe" : currentRole === "field_staff" ? "Field Agent" : currentRole === "owner" ? "Property Owner" : "Sales Executive",
    role: roleLabels[currentRole] || "Sales",
    initials: roleInitials[currentRole] || "JD",
  };

  return (
    <div className="min-h-screen bg-page flex">
      {/* Fixed Sidebar */}
      <Sidebar
        userRole={currentRole}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[198px]">
        <TopBar
          user={user}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-[30px] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
