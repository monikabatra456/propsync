"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Phone,
  Mail,
  Eye,
  FileText,
  ChevronRight,
  Calendar,
  Sparkles,
  Shield,
  MapPin,
} from "lucide-react";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { getCurrentUserRole, UserRole } from "@/lib/permissions";
import { formatCurrencyINR } from "@/lib/units";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

interface OwnerProperty {
  id: string;
  title: string;
  address: string;
  type: string;
  areaSqft: number;
  rentPerSqft: number;
  status: "rented" | "available" | "under_negotiation";
  tenantName?: string;
  tenantCompany?: string;
  leaseStart?: string;
  leaseEnd?: string;
  securityDeposit: number;
  maintenanceIncome: number;
  lastRentReceived?: string;
  complianceDue?: { item: string; dueDate: string; status: "ok" | "due_soon" | "overdue" }[];
}

const OWNER_PROPERTIES: OwnerProperty[] = [
  {
    id: "prop-1",
    title: "Anand Heights – Office Unit 4B",
    address: "Sector 62, Noida, Uttar Pradesh – 201301",
    type: "Office",
    areaSqft: 4800,
    rentPerSqft: 22,
    status: "rented",
    tenantName: "Mehul Joshi",
    tenantCompany: "Cleartrip India Pvt Ltd",
    leaseStart: "Apr 1, 2025",
    leaseEnd: "Mar 31, 2028",
    securityDeposit: 422400,
    maintenanceIncome: 8000,
    lastRentReceived: "Oct 1, 2026",
    complianceDue: [
      { item: "Fire NOC Renewal", dueDate: "Dec 31, 2026", status: "ok" },
      { item: "Lift Safety Certificate", dueDate: "Nov 15, 2026", status: "due_soon" },
      { item: "Property Tax (FY 26-27)", dueDate: "Mar 31, 2027", status: "ok" },
    ],
  },
  {
    id: "prop-2",
    title: "Emerald Tower – Unit 12 Ground Floor",
    address: "Cyber City, Sector 24, Gurugram, Haryana – 122002",
    type: "Retail",
    areaSqft: 2200,
    rentPerSqft: 145,
    status: "rented",
    tenantName: "Sheetal Kapoor",
    tenantCompany: "W for Woman Fashion Retail",
    leaseStart: "Jan 1, 2026",
    leaseEnd: "Dec 31, 2028",
    securityDeposit: 957000,
    maintenanceIncome: 5500,
    lastRentReceived: "Oct 1, 2026",
    complianceDue: [
      { item: "Shop License", dueDate: "Dec 31, 2026", status: "ok" },
      { item: "Building Insurance", dueDate: "Oct 31, 2026", status: "due_soon" },
    ],
  },
  {
    id: "prop-5",
    title: "Industrial Shed – Plot 18B",
    address: "Bhiwandi Logistics Zone, NH-3 Bypass, Thane – 421302",
    type: "Industrial",
    areaSqft: 12000,
    rentPerSqft: 9,
    status: "available",
    securityDeposit: 0,
    maintenanceIncome: 0,
    complianceDue: [
      { item: "Environmental Clearance", dueDate: "Sep 30, 2026", status: "overdue" },
      { item: "Factory License", dueDate: "Nov 30, 2026", status: "ok" },
    ],
  },
];

const RENT_HISTORY = [
  { month: "Jul 2026", collected: true, amount: 445600 },
  { month: "Aug 2026", collected: true, amount: 445600 },
  { month: "Sep 2026", collected: true, amount: 445600 },
  { month: "Oct 2026", collected: true, amount: 445600 },
];

export default function OwnerPage() {
  const [role, setRole] = useState<UserRole>("owner");
  const [properties] = useState<OwnerProperty[]>(OWNER_PROPERTIES);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setRole(getCurrentUserRole());
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const totalMonthlyIncome = properties
    .filter(p => p.status === "rented")
    .reduce((acc, p) => acc + p.rentPerSqft * p.areaSqft + p.maintenanceIncome, 0);

  const totalDeposits = properties.reduce((acc, p) => acc + p.securityDeposit, 0);
  const rentedCount = properties.filter(p => p.status === "rented").length;
  const availableCount = properties.filter(p => p.status === "available").length;

  const allCompliance = properties.flatMap(p => (p.complianceDue || []).map(c => ({ ...c, property: p.title })));
  const urgentCompliance = allCompliance.filter(c => c.status !== "ok");

  const handleDownloadStatement = () => {
    showToast("Rental income statement for Q3 2026 downloaded!");
  };

  const statusBadge: Record<OwnerProperty["status"], string> = {
    rented: "bg-emerald-50 text-emerald-700",
    available: "bg-blue-50 text-blue-700",
    under_negotiation: "bg-orange-50 text-orange-700",
  };

  return (
    <RoleGuard
      currentRole={role}
      allowed={role === "owner" || role === "admin"}
      requiredRoleName="Property Owners"
    >
      <div className="space-y-6 max-w-5xl mx-auto pb-16">
        {toast && (
          <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-field shadow-login text-[13px] font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
            <CheckCircle2 className="w-4 h-4 text-brand-teal" />
            <span>{toast}</span>
          </div>
        )}

        {/* Header */}
        <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
          <div className="flex-1 min-w-0 pr-0 lg:pr-[380px]">
            <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Portfolio</span>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-9 h-9 rounded-[10px] bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <h1 className="text-[28px] sm:text-[32px] font-bold text-[#102F57] tracking-tight leading-tight">
                Owner Asset Hub
              </h1>
              <div className="flex items-center gap-2 mb-0.5">
                <button
                  onClick={handleDownloadStatement}
                  className="h-[38px] px-3.5 bg-[#0B2B57] hover:bg-[#071D3F] text-white rounded-[10px] text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Statement</span>
                </button>
              </div>
            </div>
            <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
              Your property portfolio, rental income tracker, and compliance deadlines — all in one place.
            </p>
          </div>

          {/* Right: Building Hero Illustration */}
          <HeroBuilding />
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-card p-4 text-white shadow-card col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="w-4 h-4 text-brand-teal" />
              <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider">Monthly Rental Income</span>
            </div>
            <div className="text-[32px] font-bold tracking-tight">{formatCurrencyINR(totalMonthlyIncome)}</div>
            <div className="text-[12px] text-white/60 mt-0.5">+8.2% YoY from last contract renewal</div>
          </div>
          <div className="bg-white rounded-card border border-line p-4 shadow-card text-center">
            <div className="text-[24px] font-bold text-ink-900">{rentedCount}</div>
            <div className="text-[12px] font-medium text-emerald-600">Rented Units</div>
          </div>
          <div className="bg-white rounded-card border border-line p-4 shadow-card text-center">
            <div className="text-[24px] font-bold text-ink-900">{availableCount}</div>
            <div className="text-[12px] font-medium text-blue-600">Vacant Units</div>
          </div>
        </div>

        {/* Compliance Alerts */}
        {urgentCompliance.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-card p-4 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-[14px] font-bold text-amber-800">Compliance Alerts</h3>
            </div>
            <div className="space-y-2">
              {urgentCompliance.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white rounded-[8px] p-3 border border-amber-100">
                  <div>
                    <span className="text-[13px] font-semibold text-ink-900 block">{c.item}</span>
                    <span className="text-[11px] text-ink-500">{c.property}</span>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                      c.status === "overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {c.status === "overdue" ? "⚠ Overdue" : "Due Soon"}
                    </span>
                    <span className="text-[11px] text-ink-500 block mt-0.5">{c.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property Cards */}
        <div>
          <h2 className="text-[15px] font-bold text-ink-900 mb-3">Your Properties</h2>
          <div className="space-y-4">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-white rounded-card border border-line p-5 shadow-card space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", statusBadge[prop.status])}>
                        {prop.status.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-ink-400 font-medium">{prop.type}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-ink-900">{prop.title}</h3>
                    <p className="text-[12px] text-ink-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {prop.address}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {prop.status === "rented" && (
                      <>
                        <div className="text-[20px] font-bold text-ink-900">
                          {formatCurrencyINR(prop.rentPerSqft * prop.areaSqft + prop.maintenanceIncome)}
                        </div>
                        <div className="text-[11px] text-ink-400">per month</div>
                      </>
                    )}
                    {prop.status === "available" && (
                      <div className="text-[13px] font-semibold text-blue-600">Seeking Tenant</div>
                    )}
                  </div>
                </div>

                {/* Tenant Info */}
                {prop.status === "rented" && prop.tenantName && (
                  <div className="bg-subtle rounded-[10px] p-3 space-y-2 text-[13px]">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] text-ink-400 font-semibold uppercase block">CURRENT TENANT</span>
                        <span className="font-bold text-ink-900">{prop.tenantName}</span>
                        <span className="text-ink-500 ml-2">{prop.tenantCompany}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-ink-400 font-semibold uppercase block">LEASE PERIOD</span>
                        <span className="font-medium text-ink-900">{prop.leaseStart} → {prop.leaseEnd}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-ink-500">Security Deposit: <strong className="text-ink-900">{formatCurrencyINR(prop.securityDeposit)}</strong></span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Rent received {prop.lastRentReceived}
                      </span>
                    </div>
                  </div>
                )}

                {/* Compliance */}
                {prop.complianceDue && prop.complianceDue.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {prop.complianceDue.map((c, idx) => (
                      <div key={idx} className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-[8px] border text-[11px] font-medium",
                        c.status === "ok" ? "border-emerald-100 bg-emerald-50/50 text-emerald-700" :
                        c.status === "due_soon" ? "border-amber-200 bg-amber-50 text-amber-700" :
                        "border-red-200 bg-red-50 text-red-700"
                      )}>
                        <Shield className="w-3 h-3 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="block truncate">{c.item}</span>
                          <span className="text-[10px] opacity-70">{c.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View Property Link */}
                <div className="flex justify-end border-t border-line pt-3">
                  <Link href={`/properties/${prop.id}`}
                    className="text-[12px] text-brand-link hover:underline inline-flex items-center gap-1 font-medium">
                    <Eye className="w-3.5 h-3.5" /> View Full Property Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rent Collection History */}
        <div className="bg-white rounded-card border border-line p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="text-[15px] font-bold text-ink-900">Rent Collection History</h3>
            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">100% Collected</span>
          </div>
          <div className="mt-4 space-y-2">
            {RENT_HISTORY.map((r, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-line/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-[13px] font-medium text-ink-900">{r.month}</span>
                </div>
                <span className="text-[14px] font-bold text-ink-900">{formatCurrencyINR(r.amount)}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 mt-1 border-t border-line flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink-900">Total Collected (4 months)</span>
            <span className="text-[15px] font-bold text-ink-900">{formatCurrencyINR(RENT_HISTORY.reduce((a, r) => a + r.amount, 0))}</span>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
