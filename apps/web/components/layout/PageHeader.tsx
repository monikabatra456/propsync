"use client";

import React, { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "./HeroBuilding";

interface PageHeaderProps {
  eyebrow?: string;
  greeting?: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  heroType?: "building" | "leads" | "none";
  className?: string;
}

export function PageHeader({
  eyebrow,
  greeting,
  title,
  subtitle,
  actions,
  heroType = "building",
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 min-h-[105px]",
        className
      )}
    >
      {/* Left Column: Eyebrow / Greeting, H1, Subtitle */}
      <div className="relative z-10 max-w-2xl">
        {eyebrow && (
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">
            {eyebrow}
          </span>
        )}

        {greeting && (
          <div className="text-[22px] font-medium text-[#6F87A5] mb-0.5">
            {greeting}
          </div>
        )}

        <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight flex items-center gap-2">
          {title}
        </h1>

        <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Right Column: Actions */}
      <div className="relative z-10 flex items-center gap-3 flex-wrap self-start md:self-center">
        {actions}
      </div>

      {/* Hero Illustration (Building 3D render + Script Tagline) */}
      {heroType === "building" && <HeroBuilding />}

      {/* Leads Header Card */}
      {heroType === "leads" && (
        <div className="hidden lg:flex items-center absolute -top-2 right-0 pointer-events-none select-none z-0">
          <div className="flex items-center bg-white/90 backdrop-blur-xs rounded-[16px] border border-[#DCE8F5] p-2 pl-4 shadow-md gap-4">
            <div>
              <span className="text-[14px] font-bold text-[#102F57] block leading-tight">
                More leads.
              </span>
              <span className="text-[14px] font-bold text-[#1769EB] block leading-tight">
                More deals.
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="w-[120px] h-[65px] rounded-[10px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-building.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
