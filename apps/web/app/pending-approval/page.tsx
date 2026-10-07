"use client";

import React from "react";
import Link from "next/link";
import { Clock, ShieldAlert, ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { ExpertCompanyLogo } from "@/components/ui/ExpertCompanyLogo";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-[#E9EFF8] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-card border border-line p-8 shadow-login text-center space-y-6">
        <div className="flex justify-center">
          <ExpertCompanyLogo size={44} variant="navy" />
        </div>

        <div className="w-16 h-16 rounded-full bg-[#FFF0D9] text-[#E8870E] mx-auto flex items-center justify-center">
          <Clock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">
            Account Pending Approval
          </h1>
          <p className="text-[14px] text-ink-500 leading-relaxed">
            Your account has been registered and is currently awaiting administrator verification.
          </p>
        </div>

        <div className="bg-subtle p-4 rounded-field border border-line text-left text-[13px] space-y-2">
          <div className="flex items-center gap-2 text-ink-900 font-semibold">
            <ShieldAlert className="w-4 h-4 text-brand-600" />
            <span>Verification Process</span>
          </div>
          <p className="text-ink-600">
            For security, role privileges (Field Staff, Sales, or Space Sales) must be authorized by an administrator before site data can be accessed.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/login"
            className="w-full h-[46px] bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Login</span>
          </Link>

          <a
            href="mailto:admin@expertcompany.com?subject=Approval%20Inquiry%20for%20Expert%20Company%20Account"
            className="w-full h-[40px] text-brand-link hover:underline font-medium text-[13px] inline-flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Administrator</span>
          </a>
        </div>
      </div>
    </div>
  );
}
