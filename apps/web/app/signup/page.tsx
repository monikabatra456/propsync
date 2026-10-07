"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Shield, UserCheck, Briefcase, Building, Mail, Lock, User } from "lucide-react";
import { ExpertCompanyLogo } from "@/components/ui/ExpertCompanyLogo";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleRequested, setRoleRequested] = useState("field");
  const [department, setDepartment] = useState("Field Operations");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/pending-approval");
  };

  return (
    <div className="min-h-screen bg-[#E9EFF8] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-card border border-line p-8 shadow-login space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2.5">
            <ExpertCompanyLogo size={32} variant="navy" />
            <span className="text-[20px] font-bold text-navy-800 tracking-tight">Expert Company</span>
          </div>
          <Link
            href="/login"
            className="text-[13px] font-semibold text-brand-link hover:underline"
          >
            Existing User? Sign In
          </Link>
        </div>

        <div>
          <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">Join Expert Company Team</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            Submit your employee registration for administrative clearance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
          <div>
            <label className="block font-medium text-ink-700 mb-1">Full Legal Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Chandra"
                className="w-full h-[42px] pl-9 pr-3 rounded-[8px] border border-line focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-ink-700 mb-1">Corporate Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@expertcompany.com"
                className="w-full h-[42px] pl-9 pr-3 rounded-[8px] border border-line focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-ink-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full h-[42px] pl-9 pr-3 rounded-[8px] border border-line focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-ink-700 mb-1">Role Requested *</label>
              <select
                value={roleRequested}
                onChange={(e) => setRoleRequested(e.target.value)}
                className="w-full h-[42px] px-3 rounded-[8px] border border-line bg-white focus:outline-none focus:border-brand-600"
              >
                <option value="field">Field Staff (GPS survey)</option>
                <option value="sales">Sales (Commercial)</option>
                <option value="space_sales">Space Sales (Retail)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-ink-700 mb-1">Department / Region</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. NCR Operations"
                className="w-full h-[42px] px-3 rounded-[8px] border border-line focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-[48px] bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Submit Registration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
