"use client";

import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  User,
  ShieldCheck,
  Bell,
  RefreshCw,
  Camera,
  Save,
  Check,
  Building2,
  Lock,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { StatusPill } from "@/components/ui/StatusPill";
import { resetDemoData } from "@/lib/propertyStore";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

export default function SettingsPage() {
  // Profile state
  const [legalName, setLegalName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@expertcompany.in");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [organization, setOrganization] = useState("Expert Company Realty Ventures LLP");

  // DPDP Policies
  const [aadhaarMasking, setAadhaarMasking] = useState(true);
  const [digiLockerTokenized, setDigiLockerTokenized] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState("365 Days (1 Year)");

  // Automation & WhatsApp
  const [whatsappReminders, setWhatsappReminders] = useState(true);
  const [inspectionConfirmations, setInspectionConfirmations] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Dirty state tracking
  const [isDirty, setIsDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const markDirty = () => {
    setIsDirty(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDirty(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetDemo = () => {
    if (confirm("Reset demo properties and leads back to default seed data?")) {
      resetDemoData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 animate-fadeUp">
      {/* 1. Header */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0 pr-0 lg:pr-[380px]">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Configuration</span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
              <SettingsIcon className="w-5 h-5 stroke-[2]" />
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#102F57] tracking-tight leading-tight">
              Account & System Settings
            </h1>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Manage your profile, security preferences, DPDP policies and automation settings.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: User Profile */}
        <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#102F57]">User Profile</h3>
                <p className="text-[12px] text-[#6F87A5]">Personal details and verified organization credentials</p>
              </div>
            </div>
            <StatusPill value="Admin" variant="role" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar 80px + camera badge */}
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-[#EAF3FF] text-[#0B2B57] text-[24px] font-bold flex items-center justify-center border-2 border-[#DCE8F5]">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1769EB] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full text-[13px]">
              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => {
                    setLegalName(e.target.value);
                    markDirty();
                  }}
                  className="w-full h-[42px] px-3 rounded-[10px] border border-[#DCE8F5] text-[13px] text-[#102F57] outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    markDirty();
                  }}
                  className="w-full h-[42px] px-3 rounded-[10px] border border-[#DCE8F5] text-[13px] text-[#102F57] outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Direct Phone (WhatsApp Enabled)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    markDirty();
                  }}
                  className="w-full h-[42px] px-3 rounded-[10px] border border-[#DCE8F5] text-[13px] text-[#102F57] outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => {
                    setOrganization(e.target.value);
                    markDirty();
                  }}
                  className="w-full h-[42px] px-3 rounded-[10px] border border-[#DCE8F5] text-[13px] text-[#102F57] outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: DPDP Act & Identity Protection Policies */}
        <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E3F7EE] flex items-center justify-center text-[#16B77A]">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#102F57]">
                  DPDP Act & Identity Protection Policies
                </h3>
                <p className="text-[12px] text-[#6F87A5]">
                  Statutory compliance with Digital Personal Data Protection Act rules
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle Row: Aadhaar Masking */}
            <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  Aadhaar Last 4-Digit Masking
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Strictly redacts first 8 digits across landlord title agreements and KYC uploads.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={aadhaarMasking}
                onClick={() => {
                  setAadhaarMasking(!aadhaarMasking);
                  markDirty();
                }}
                className={cn(
                  "w-[44px] h-[24px] rounded-full transition-colors relative flex items-center p-0.5",
                  aadhaarMasking ? "bg-[#16B77A]" : "bg-[#CBD7E6]"
                )}
              >
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    aadhaarMasking ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Toggle Row: DigiLocker */}
            <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5 max-w-lg">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  DigiLocker Tokenized Verification
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Fetches digitally signed municipal property tax receipts and ownership certificates.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={digiLockerTokenized}
                onClick={() => {
                  setDigiLockerTokenized(!digiLockerTokenized);
                  markDirty();
                }}
                className={cn(
                  "w-[44px] h-[24px] rounded-full transition-colors relative flex items-center p-0.5",
                  digiLockerTokenized ? "bg-[#16B77A]" : "bg-[#CBD7E6]"
                )}
              >
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    digiLockerTokenized ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Retention Period Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  Audit Log Retention Period
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Immutable record retention duration for tenant data access and GPS geo-stamps.
                </span>
              </div>
              <div className="relative">
                <select
                  value={retentionPeriod}
                  onChange={(e) => {
                    setRetentionPeriod(e.target.value);
                    markDirty();
                  }}
                  className="h-[38px] pl-3 pr-8 rounded-[8px] border border-[#DCE8F5] bg-white text-[13px] font-semibold text-[#102F57] appearance-none cursor-pointer outline-none hover:border-[#6F87A5]/40"
                >
                  <option>365 Days (1 Year)</option>
                  <option>730 Days (2 Years)</option>
                  <option>1825 Days (5 Years)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#6F87A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Statutory Banner */}
            <div className="p-3.5 rounded-[12px] bg-[#E3F7EE] border border-[#16B77A]/30 flex items-center gap-3">
              <Check className="w-5 h-5 text-[#0F9D63] flex-shrink-0" />
              <div className="text-[13px] text-[#0F9D63] font-medium">
                <strong>Statutory DPDP Compliance Certified</strong> — All client identification, PAN documents, and phone numbers are encrypted with AES-256 and stored in compliant Indian data zones.
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Automation & WhatsApp Notifications */}
        <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#E3F7EE] flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-5 h-5 fill-[#25D366]/20" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#102F57]">
                  Automation & WhatsApp Notifications
                </h3>
                <p className="text-[12px] text-[#6F87A5]">
                  Automate pipeline alerts, follow-up agendas, and field confirmations
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* WhatsApp Follow-up */}
            <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  WhatsApp Follow-up Reminders
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Sends scheduled meeting alerts to prospective tenants 2 hours prior to site inspections.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={whatsappReminders}
                onClick={() => {
                  setWhatsappReminders(!whatsappReminders);
                  markDirty();
                }}
                className={cn(
                  "w-[44px] h-[24px] rounded-full transition-colors relative flex items-center p-0.5",
                  whatsappReminders ? "bg-[#16B77A]" : "bg-[#CBD7E6]"
                )}
              >
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    whatsappReminders ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Site Inspection Confirmations */}
            <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  Site Inspection Confirmations
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Instantly sends geotagged location pin and broker contact details to arriving tenants.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={inspectionConfirmations}
                onClick={() => {
                  setInspectionConfirmations(!inspectionConfirmations);
                  markDirty();
                }}
                className={cn(
                  "w-[44px] h-[24px] rounded-full transition-colors relative flex items-center p-0.5",
                  inspectionConfirmations ? "bg-[#16B77A]" : "bg-[#CBD7E6]"
                )}
              >
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    inspectionConfirmations ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Daily Digest */}
            <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F5F8FC] border border-[#DCE8F5]">
              <div className="space-y-0.5">
                <span className="text-[14px] font-bold text-[#102F57] block">
                  Daily Executive Digest
                </span>
                <span className="text-[12px] text-[#6F87A5] block">
                  Summary email and WhatsApp briefing of closed deals, new inquiries, and overdue follow-ups.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={dailyDigest}
                onClick={() => {
                  setDailyDigest(!dailyDigest);
                  markDirty();
                }}
                className={cn(
                  "w-[44px] h-[24px] rounded-full transition-colors relative flex items-center p-0.5",
                  dailyDigest ? "bg-[#16B77A]" : "bg-[#CBD7E6]"
                )}
              >
                <div
                  className={cn(
                    "w-[20px] h-[20px] rounded-full bg-white shadow-sm transition-transform duration-200",
                    dailyDigest ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: Demo Data & Dev Tools */}
        <div className="bg-[#FFF8F0] rounded-[16px] border border-[#F4B740]/40 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[17px] font-bold text-[#B7791F]">
                Demo Data & Dev Tools
              </h3>
              <p className="text-[12px] text-[#6F87A5]">
                Reset mock database properties, leads pipeline, and scheduled visits to factory defaults.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetDemo}
              className="h-[40px] px-4 rounded-[10px] border border-[#E08A00] text-[#E08A00] bg-white hover:bg-[#FFF1DC] font-semibold text-[13px] inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <RefreshCw className={cn("w-4 h-4", resetSuccess && "animate-spin")} />
              <span>{resetSuccess ? "Resetting..." : "Reset Demo Data"}</span>
            </button>
          </div>
        </div>

        {/* Sticky Bottom-Right Save Preferences Bar */}
        <div className="fixed bottom-6 right-8 z-30 flex items-center gap-3">
          {saveSuccess && (
            <div className="bg-[#16B77A] text-white px-4 py-2.5 rounded-[10px] text-[13px] font-semibold shadow-md flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Preferences Saved!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!isDirty}
            className={cn(
              "h-[46px] px-6 rounded-[12px] text-[14px] font-semibold inline-flex items-center gap-2 transition-all shadow-md",
              isDirty
                ? "bg-[#0B2B57] hover:bg-[#071D3F] text-white cursor-pointer active:scale-95"
                : "bg-[#0B2B57]/40 text-white/70 cursor-not-allowed"
            )}
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
