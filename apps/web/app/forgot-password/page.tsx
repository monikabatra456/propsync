"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { PropSyncLogo } from "@/components/ui/PropSyncLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E9EFF8] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-card border border-line p-8 shadow-login space-y-6">
        <div className="flex justify-center">
          <PropSyncLogo size={40} variant="navy" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">Reset Password</h1>
          <p className="text-[13px] text-ink-500">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#E3F6EE] border border-[#1E9E6A]/20 p-5 rounded-field text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#1E9E6A] mx-auto" />
            <h3 className="text-[15px] font-bold text-ink-900">Check Your Inbox</h3>
            <p className="text-[13px] text-ink-700">
              A secure password reset link has been dispatched to <span className="font-semibold">{email}</span>.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="text-[13px] font-semibold text-brand-link hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            <div>
              <label className="block font-medium text-ink-700 mb-1">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@propsync.com"
                  className="w-full h-[42px] pl-9 pr-3 rounded-[8px] border border-line focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[46px] bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold text-[14px] transition-colors shadow-xs"
            >
              Send Reset Link
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-[13px] font-medium text-ink-500 hover:text-navy-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
