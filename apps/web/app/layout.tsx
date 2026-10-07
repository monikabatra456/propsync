import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Expert Company — Smarter Real Estate Management",
  description: "Connect. Track. Grow. Modern platform for property inventory, commercial leasing, and field operations.",
  icons: {
    icon: "/brand/expertcompany-glyph.svg",
    shortcut: "/brand/expertcompany-glyph.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-page text-ink-900 selection:bg-brand-600/20 selection:text-navy-900 min-h-screen">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
