"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { usePathname } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
  userRole?: string;
}

export function AppShell({ children, userRole = "admin" }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If this is an auth page (like /login), do not render the sidebar/topbar shell
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup");
  if (isAuthPage) {
    return <>{children}</>;
  }

  const user = {
    name: "John Doe",
    role: userRole === "admin" ? "Admin" : "Sales",
    initials: "JD",
  };

  return (
    <div className="min-h-screen bg-page flex">
      {/* Fixed Sidebar */}
      <Sidebar
        userRole={userRole}
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
