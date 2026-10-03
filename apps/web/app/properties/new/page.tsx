"use client";

import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { Stepper } from "@/components/ui/Stepper";

const STEPS = [
  { id: 1, label: "Address & Location" },
  { id: 2, label: "Building & Floors" },
  { id: 3, label: "Area & Commercials" },
  { id: 4, label: "Amenities & Compliance" },
  { id: 5, label: "Media Upload" },
];

export default function NewPropertyPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/properties"
          className="p-2 rounded-field border border-line bg-white hover:bg-subtle text-ink-700 transition-colors"
          aria-label="Back to properties"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">Add New Property</h1>
          <p className="text-[13px] text-ink-500">Fill in the details to add a new property to your portfolio.</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-6">
        <Stepper steps={STEPS} currentStep={1} />
        <div className="border-t border-line pt-6 text-center text-ink-500 py-12">
          <Building2 className="w-12 h-12 text-brand-600 mx-auto mb-3" />
          <p className="text-[15px] font-medium text-ink-700">Add Property Stepper</p>
          <p className="text-[13px] text-ink-400 mt-1">Full 5-step stepper workflow will be implemented in Phase 5.</p>
        </div>
      </div>
    </div>
  );
}
