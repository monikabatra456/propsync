"use client";

import React, { ReactNode, useState } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  heightClass?: string;
  className?: string;
}

export function FlipCard({
  front,
  back,
  heightClass = "h-[140px]",
  className,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn("flip relative group rounded-[16px]", heightClass, className)}
      data-flipped={flipped}
      onKeyDown={(e) => e.key === "Escape" && setFlipped(false)}
      tabIndex={0}
      role="region"
      aria-label="Interactive metric card"
    >
      <div className="flip-inner w-full h-full rounded-[16px]">
        <div className="flip-face flip-front w-full h-full rounded-[16px] overflow-hidden">
          {front}
        </div>
        <div className="flip-face flip-back w-full h-full rounded-[16px] overflow-hidden">
          {back}
        </div>
      </div>

      {/* Flip affordance button (visible on mobile / hover on desktop) */}
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? "Show front" : "Show breakdown details"}
        className="absolute right-2.5 top-2.5 z-20 w-6 h-6 rounded-full bg-white/80 hover:bg-white text-[#6F87A5] hover:text-[#1769EB] border border-[#DCE8F5] flex items-center justify-center transition-all md:opacity-0 md:group-hover:opacity-100 shadow-xs"
        onClick={(e) => {
          e.stopPropagation();
          setFlipped((v) => !v);
        }}
      >
        <RotateCw className="w-3 h-3" />
      </button>
    </div>
  );
}
