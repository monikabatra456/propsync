import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PropSync — Smarter Real Estate Management",
  description: "Connect. Track. Grow. Modern platform for property inventory, commercial leasing, and field operations.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-page text-ink-900 selection:bg-brand-600/20 selection:text-navy-900 min-h-screen">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
