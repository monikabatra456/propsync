"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeroBuildingProps {
  className?: string;
}

export function HeroBuilding({ className }: HeroBuildingProps) {
  return (
    <div
      className={cn(
        "hidden lg:flex items-center absolute -top-3 right-0 pointer-events-none select-none z-0",
        className
      )}
    >
      {/* Script Tagline */}
      <div className="mr-3 text-right">
        <span
          className="font-script text-[21px] xl:text-[23px] text-[#1769EB] font-semibold block leading-tight tracking-wide"
          style={{
            transform: "rotate(-8deg)",
            display: "inline-block",
            filter: "drop-shadow(0 2px 4px rgba(23,105,235,0.15))",
          }}
        >
          Better Spaces<br />Brighter Futures
        </span>
      </div>

      {/* Building Image with left fade */}
      <div
        className="w-[230px] xl:w-[270px] h-[115px] xl:h-[125px] overflow-hidden relative"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-building.png"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>
    </div>
  );
}
