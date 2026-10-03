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
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4 relative">
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
                    isCompleted ? "bg-navy-700" : "bg-[#BFD2EC]"
                  )}
                />
              )}

              {/* Step Circle */}
              <button
                type="button"
                disabled={!isCompleted && !isActive}
                onClick={() => isCompleted && onStepClick?.(step.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold transition-all relative z-10 select-none",
                  isActive && "bg-navy-700 text-white shadow-sm ring-4 ring-navy-700/10",
                  isCompleted && "bg-navy-700 text-white cursor-pointer hover:bg-navy-800",
                  !isActive && !isCompleted && "bg-white border border-[#BFD2EC] text-brand-600"
                )}
                aria-label={`Step ${step.id}: ${step.label}`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.2]" /> : step.id}
              </button>

              {/* Label */}
              <span
                className={cn(
                  "text-[13px] mt-2 font-medium text-center transition-colors whitespace-nowrap",
                  isActive && "text-navy-800 font-semibold",
                  isCompleted && "text-ink-700",
                  !isActive && !isCompleted && "text-ink-500"
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
