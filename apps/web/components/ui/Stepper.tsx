"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepItem {
  id: number;
  label: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepperProps) {
  return (
    <div className={cn("w-full py-4 select-none", className)}>
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative group">
              {/* Connector line to next step */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-[1px] -z-0 transition-colors",
                    isCompleted ? "bg-[#1769EB]" : "bg-[#DCE8F5]"
                  )}
                />
              )}

              {/* Step Circle (40px) */}
              <button
                type="button"
                disabled={!isCompleted && !isActive}
                onClick={() => isCompleted && onStepClick?.(step.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all relative z-10 select-none",
                  isActive && "bg-[#0B2B57] text-white font-bold ring-4 ring-[#0B2B57]/15 shadow-sm",
                  isCompleted && "bg-[#0B2B57] text-white cursor-pointer hover:bg-[#071D3F]",
                  !isActive && !isCompleted && "bg-white border border-[#DCE8F5] text-[#6F87A5]"
                )}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.2] text-[#16B77A]" /> : step.id}
              </button>

              {/* Label 14px */}
              <span
                className={cn(
                  "text-[14px] mt-2 text-center transition-colors whitespace-nowrap",
                  isActive && "text-[#0B2B57] font-bold",
                  isCompleted && "text-[#102F57] font-medium",
                  !isActive && !isCompleted && "text-[#6F87A5]"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
