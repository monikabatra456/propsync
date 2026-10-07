"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Download,
  Building,
  Layers,
  IndianRupee,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { KpiCard } from "@/components/ui/KpiCard";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

const BENCHMARKS = [
  { microMarket: "BKC (Bandra Kurla Complex)", city: "Mumbai", avgRent: 380, occupancy: 96, growth: "+14.2%", benchmarkScore: 92 },
  { microMarket: "Connaught Place (CBD)", city: "Delhi", avgRent: 250, occupancy: 94, growth: "+8.5%", benchmarkScore: 87 },
  { microMarket: "DLF Cyber City", city: "Gurgaon", avgRent: 120, occupancy: 91, growth: "+11.0%", benchmarkScore: 76 },
  { microMarket: "Whitefield Tech Corridor", city: "Bengaluru", avgRent: 65, occupancy: 88, growth: "+9.8%", benchmarkScore: 69 },
  { microMarket: "Okhla Phase III", city: "Delhi", avgRent: 45, occupancy: 82, growth: "+6.4%", benchmarkScore: 61 },
  { microMarket: "Sector 62 Institutional", city: "Noida", avgRent: 18, occupancy: 78, growth: "+5.1%", benchmarkScore: 52 },
  { microMarket: "Bhiwandi Logistics Hub", city: "Thane", avgRent: 8, occupancy: 95, growth: "+15.3%", benchmarkScore: 47 },
];

const OCCUPANCY_DATA = [
  { period: "Q2 2025", rate: 81.4 },
  { period: "Q3 2025", rate: 83.2 },
  { period: "Q4 2025", rate: 84.1 },
  { period: "Q1 2026", rate: 86.7 },
  { period: "Q2 2026", rate: 88.3 },
  { period: "Q3 2026", rate: 89.2 },
];

const RENTAL_GROWTH_DATA = [
  { period: "Q4 2025", growth: 5.2, fill: "#BFD7FF" },
  { period: "Q1 2026", growth: 7.8, fill: "#7EACFD" },
  { period: "Q2 2026", growth: 10.1, fill: "#3E83F6" },
  { period: "Q3 2026", growth: 14.2, fill: "#1769EB" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("Q3 2026 (Jul – Sep)");
  const [exported, setExported] = useState(false);

  const handleExportCSV = () => {
    setExported(true);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Micro Market & Hub,City,Avg Rate (INR/sqft/mo),Occupancy Rate,YoY Rental Growth,Rental Benchmark Bar"]
        .concat(
          BENCHMARKS.map(
            (m) =>
              `"${m.microMarket}","${m.city}",${m.avgRent},"${m.occupancy}%","${m.growth}","${m.benchmarkScore}%"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Expert_Company_Commercial_Intelligence_${period.replace(/[\s–()]+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Header with Period Select & Export Button */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0 pr-0 lg:pr-[380px]">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Analytics</span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-[10px] bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
              <BarChart3 className="w-5 h-5 stroke-[2]" />
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#102F57] tracking-tight leading-tight">
              Reports & Intelligence
            </h1>

            {/* Controls inline with title */}
            <div className="flex items-center gap-2 mb-0.5">
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="h-[38px] pl-3.5 pr-8 rounded-[10px] border border-[#DCE8F5] bg-white text-[13px] font-semibold text-[#102F57] appearance-none cursor-pointer outline-none hover:border-[#6F87A5]/40 shadow-xs"
                >
                  <option>Q3 2026 (Jul – Sep)</option>
                  <option>Q2 2026 (Apr – Jun)</option>
                  <option>Q1 2026 (Jan – Mar)</option>
                  <option>FY 2025–26 Annual</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#6F87A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <button
                onClick={handleExportCSV}
                className="h-[38px] px-3.5 rounded-[10px] bg-[#0B2B57] hover:bg-[#071D3F] text-white text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                {exported ? (
                  <>
                    <Check className="w-4 h-4 text-[#16B77A]" />
                    <span>Exported ✓</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 stroke-[2]" />
                    <span>Export CSV</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Micro-market commercial rent benchmarks, absorption velocities, and lease occupancy analytics.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. 4 KPI Cards (no sparkline per spec) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Avg Portfolio Rent"
          value="₹113 / sqft"
          icon={TrendingUp}
          delta={{ text: "+10.4% YoY", isPositive: true }}
          breakdown={[
            { label: "Prime IT CBD", count: "₹210/sqft" },
            { label: "Institutional Suburbs", count: "₹45/sqft" },
            { label: "Gross Yield Index", count: "8.6%" },
            { label: "Quarter Variance", count: "+₹12" },
          ]}
        />
        <KpiCard
          label="Overall Occupancy"
          value="89.2%"
          icon={Building}
          delta={{ text: "+3.8% vs last quarter", isPositive: true }}
          breakdown={[
            { label: "Total Commercial Area", count: "76,500 sqft" },
            { label: "Active Occupied", count: "68,200 sqft" },
            { label: "Available Leasable", count: "8,300 sqft" },
            { label: "Under Fitout", count: "2,500 sqft" },
          ]}
        />
        <KpiCard
          label="Leased Space"
          value="68,200 sq ft"
          icon={Layers}
          subtext="Across 8 commercial complexes"
          breakdown={[
            { label: "Sector 62 Noida", count: "5,000 sqft" },
            { label: "Cyber City Gurgaon", count: "2,500 sqft" },
            { label: "Bhiwandi Logistics", count: "10,000 sqft" },
            { label: "Whitefield IT Park", count: "25,000 sqft" },
          ]}
        />
        <KpiCard
          label="Total Gross Collections"
          value="₹38.6 L"
          icon={IndianRupee}
          delta={{ text: "Monthly contracted rent", isPositive: true, prefix: "" }}
          breakdown={[
            { label: "Direct RTGS / Wire", count: "92%" },
            { label: "Escrow Auto-Debit", count: "8%" },
            { label: "On-time Collection", count: "98.4%" },
            { label: "Zero Default Record", count: "12 Months" },
          ]}
        />
      </div>

      {/* 3. Micro-Market Rent & Occupancy Benchmarks Table */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-4">
        <div className="border-b border-[#DCE8F5] pb-3">
          <h2 className="text-[18px] font-bold text-[#102F57]">
            Key Micro-Market Rent & Occupancy Benchmarks
          </h2>
          <p className="text-[13px] text-[#6F87A5]">
            Comparison across premium grade-A commercial corridors in India
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] border-b border-[#DCE8F5]">
                <th className="py-3 px-4">Micro Market & Hub</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Avg Rate (₹/sqft/mo)</th>
                <th className="py-3 px-4">Occupancy Rate</th>
                <th className="py-3 px-4">YoY Rental Growth</th>
                <th className="py-3 px-4">Rental Benchmark Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {BENCHMARKS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F7FAFF] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#102F57]">
                    {row.microMarket}
                  </td>
                  <td className="py-3.5 px-4 text-[#6F87A5]">{row.city}</td>
                  <td className="py-3.5 px-4 font-bold text-[#102F57]">
                    ₹{row.avgRent}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-24 h-2 bg-[#E3F7EE] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#16B77A] rounded-full"
                          style={{ width: `${row.occupancy}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[#0F9D63] text-[12px]">
                        {row.occupancy}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#0F9D63] font-semibold">
                      ↑ {row.growth}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-28 h-2 bg-[#EAF3FF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1769EB] rounded-full"
                          style={{ width: `${row.benchmarkScore}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[#1769EB] text-[12px]">
                        {row.benchmarkScore}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Two Charts Cards: Occupancy Trend & Rental Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend Area Chart */}
        <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE8F5]">
            <div>
              <h3 className="text-[16px] font-bold text-[#102F57]">
                Occupancy Trend
              </h3>
              <p className="text-[12px] text-[#6F87A5]">Portfolio occupancy rate trajectory</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#EAF3FF] text-[#1769EB] text-[11px] font-semibold">
              Last 6 Quarters
            </span>
          </div>

          <div className="h-[260px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={OCCUPANCY_DATA}>
                <defs>
                  <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1769EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1769EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE8F5" vertical={false} />
                <XAxis dataKey="period" stroke="#6F87A5" fontSize={12} tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#6F87A5" fontSize={12} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, "Occupancy"]}
                  contentStyle={{ backgroundColor: "#0B2B57", color: "#fff", borderRadius: 8, border: "none" }}
                  labelStyle={{ color: "#DCEBFF", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#1769EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#occupancyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rental Growth Bar Chart */}
        <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE8F5]">
            <div>
              <h3 className="text-[16px] font-bold text-[#102F57]">
                Rental Growth
              </h3>
              <p className="text-[12px] text-[#6F87A5]">Quarterly year-over-year rate acceleration</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#E3F7EE] text-[#0F9D63] text-[11px] font-semibold">
              YoY Growth
            </span>
          </div>

          <div className="h-[260px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RENTAL_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DCE8F5" vertical={false} />
                <XAxis dataKey="period" stroke="#6F87A5" fontSize={12} tickLine={false} />
                <YAxis stroke="#6F87A5" fontSize={12} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(val: any) => [`+${val}%`, "YoY Growth"]}
                  contentStyle={{ backgroundColor: "#0B2B57", color: "#fff", borderRadius: 8, border: "none" }}
                  labelStyle={{ color: "#DCEBFF", fontWeight: "bold" }}
                />
                <Bar dataKey="growth" radius={[6, 6, 0, 0]} isAnimationActive={true} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
