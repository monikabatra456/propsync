"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  FileText,
  Users,
  Clock,
  Flame,
  Building2,
  Zap,
  Plus,
  BarChart3,
  Shield,
  ChevronRight,
  MapPin,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { getStoredProperties, Property } from "@/lib/propertyStore";
import { getStoredLeads, Lead } from "@/lib/leadStore";
import { getCurrentUserRole, UserRole, DEMO_USERS } from "@/lib/permissions";
import { formatCurrencyINR } from "@/lib/units";

export default function DashboardPage() {
  const [role, setRole] = useState<UserRole>("admin");
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setRole(getCurrentUserRole());
    setProperties(getStoredProperties());
    setLeads(getStoredLeads());
  }, []);

  const userInfo = DEMO_USERS[role] ?? DEMO_USERS.admin;

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning,";
    if (h < 17) return "Good afternoon,";
    return "Good evening,";
  };

  // 4 Hot Tenant Inquiries from Mockup
  const hotInquiries = [
    {
      id: "inq-1",
      tag: "INQUIRY",
      company: "NEXGEN FINTECH SOLUTIONS",
      contact: "Rajiv Singhania",
      description: "Fitted 5,000 sq ft Office Space with 100% DG backup & metro proximity",
      price: "₹1,00,000",
      rate: "₹20/sqft",
      priority: "High Priority",
      time: "Today, 10:45 AM",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "inq-2",
      tag: "SITE VISIT",
      company: "BLUESTONE RETAIL VENTURES",
      contact: "Kavita Rao",
      description: "High-street retail showroom with minimum 40 ft road frontage",
      price: "₹3,50,000",
      rate: "₹140/sqft",
      priority: "Medium",
      time: "Yesterday, 04:30 PM",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "inq-3",
      tag: "NEGOTIATION",
      company: "ZEPTO EXPRESS LOGISTICS",
      contact: "Mahesh Agarwal",
      description: "Industrial fulfillment center with 12m clear height & 4+ docking bays",
      price: "₹1,00,000",
      rate: "₹10/sqft",
      priority: "High Priority",
      time: "Oct 1, 2026",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "inq-4",
      tag: "NEGOTIATION",
      company: "MACQUARIE ADVISORY INDIA",
      contact: "Alistair Campbell",
      description: "Grade A Corporate suite in CBD landmark with high security and LEED certification",
      price: "₹8,00,000",
      rate: "₹250/sqft",
      priority: "Medium",
      time: "Sep 30, 2026",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
    },
  ];

  // 3 Prime Listings from Mockup
  const primeListings = [
    {
      id: "prop-1",
      title: "Premium Office Space – Sector 62",
      subtitle: "Sector 62 · Office",
      rate: "₹18/sqft/mo",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "prop-2",
      title: "Retail Space – Cyber City",
      subtitle: "Cyber City · Retail",
      rate: "₹120/sqft/mo",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "prop-3",
      title: "Warehouse – Bhiwandi",
      subtitle: "Mankoli Naka · Industrial",
      rate: "₹8/sqft/mo",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Hero Section */}
      <PageHeader
        greeting={greetingTime()}
        title={`${userInfo.name.split(" ")[0]} 👋`}
        subtitle="Here's what's happening across your property portfolio."
      />

      {/* 2. KPI 4-Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Contracted Rental"
          value="₹69,20,000"
          icon={Coins}
          delta={{ text: "+12% portfolio growth", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Commercial Office", count: "₹42.8 L" },
            { label: "High-street Retail", count: "₹18.4 L" },
            { label: "Logistics Hub", count: "₹8.0 L" },
            { label: "Active Leases", count: "8 total" },
          ]}
        />
        <KpiCard
          label="Available Listings"
          value="6"
          icon={FileText}
          subtext="8 total inventory"
          ghost="building"
          breakdown={[
            { label: "Office", count: "3 units" },
            { label: "Retail", count: "1 unit" },
            { label: "Industrial", count: "1 unit" },
            { label: "Commercial", count: "1 unit" },
          ]}
        />
        <KpiCard
          label="Active Lead Pipeline"
          value="5"
          icon={Users}
          delta={{ text: "₹22,66,000 pipeline", isPositive: true }}
          ghost="people"
          breakdown={[
            { label: "Negotiation Stage", count: "2 leads" },
            { label: "Site Visit Scheduled", count: "1 lead" },
            { label: "Initial Inquiry", count: "2 leads" },
            { label: "Win Probability", count: "78%" },
          ]}
        />
        <KpiCard
          label="Deals Won (Month)"
          value="1"
          icon={Clock}
          delta={{ text: "+4% vs target", isPositive: true }}
          ghost="target"
          breakdown={[
            { label: "Whitefield IT Park", count: "1 deal" },
            { label: "Monthly Rental", count: "₹16.25 L" },
            { label: "Lock-in Period", count: "3 Years" },
            { label: "Broker Commission", count: "₹1.62 L" },
          ]}
        />
      </div>

      {/* 3. Middle Section: Two Columns (2fr / 1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Hot Tenant Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🔥</span>
              <div>
                <h2 className="text-[18px] font-bold text-[#102F57] tracking-tight">
                  Hot Tenant Inquiries
                </h2>
                <p className="text-[13px] text-[#6F87A5]">
                  High-priority leads requiring attention
                </p>
              </div>
            </div>
            <Link
              href="/leads"
              className="text-[13px] font-semibold text-[#1769EB] hover:text-[#0F57CC] flex items-center gap-1 group transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            {hotInquiries.map((item) => (
              <Link
                key={item.id}
                href="/leads"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-[12px] bg-white border border-[#DCE8F5] hover:bg-[#F9FBFF] hover:border-[#1769EB]/30 transition-all duration-150 shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-[80px] h-[72px] rounded-[10px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusPill value={item.tag} variant="inquiry_tag" />
                      <span className="text-[12px] font-bold text-[#102F57] uppercase tracking-wide truncate">
                        {item.company}
                      </span>
                    </div>
                    <p className="text-[13px] font-semibold text-[#102F57]">
                      {item.contact}
                    </p>
                    <p className="text-[12px] text-[#6F87A5] line-clamp-1 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#DCE8F5]">
                  <div className="text-left sm:text-right">
                    <span className="text-[15px] font-bold text-[#102F57] block leading-tight group-hover:text-[#1769EB] transition-colors">
                      {item.price}
                    </span>
                    <span className="text-[12px] font-medium text-[#12A3A3] block">
                      {item.rate}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusPill value={item.priority} variant="priority" />
                    <span className="text-[11px] text-[#6F87A5] block">
                      {item.time}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6F87A5] group-hover:text-[#1769EB] group-hover:translate-x-1 transition-all hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Prime Listings + Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Prime Listings Card */}
          <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCE8F5]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0B2B57]" />
                <h3 className="text-[16px] font-bold text-[#102F57]">
                  Prime Listings
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-[13px] font-semibold text-[#1769EB] hover:underline flex items-center gap-1"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {primeListings.map((prop) => (
                <Link
                  key={prop.id}
                  href={`/properties/${prop.id}`}
                  className="group flex items-center justify-between p-2.5 rounded-[12px] border border-[#DCE8F5] bg-white hover:bg-[#F9FBFF] hover:border-[#1769EB]/30 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-[72px] h-[58px] rounded-[8px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-bold text-[#102F57] truncate group-hover:text-[#1769EB] transition-colors">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-[#6F87A5] truncate mt-0.5">
                        {prop.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="text-[12px] font-bold text-[#102F57]">
                      {prop.rate}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#6F87A5] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions Dark Card */}
          <div className="relative overflow-hidden rounded-[16px] p-5 text-white shadow-md bg-gradient-to-br from-[#0B2B57] to-[#071D3F] border border-[#14376B]">
            {/* Subtle architectural background texture */}
            <div className="absolute right-0 top-0 w-36 h-36 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="10" y="10" width="80" height="80" />
                <line x1="10" y1="30" x2="90" y2="30" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="10" y1="70" x2="90" y2="70" />
                <line x1="30" y1="10" x2="30" y2="90" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="70" y1="10" x2="70" y2="90" />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Zap className="w-4 h-4 text-[#1769EB]" />
              <span className="text-[14px] font-bold tracking-wide">Quick Actions</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 relative z-10">
              <Link
                href="/properties/new"
                className="group flex items-center justify-between p-3 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Plus className="w-4 h-4 text-[#DCEBFF] flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-white leading-tight">
                    Add New Property
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/leads"
                className="group flex items-center justify-between p-3 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Users className="w-4 h-4 text-[#DCEBFF] flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-white leading-tight">
                    View Lead Pipeline
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/reports"
                className="group flex items-center justify-between p-3 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BarChart3 className="w-4 h-4 text-[#DCEBFF] flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-white leading-tight">
                    Market Reports
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/admin"
                className="group flex items-center justify-between p-3 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Shield className="w-4 h-4 text-[#DCEBFF] flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-white leading-tight">
                    Admin Panel
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Full Property Inventory Table */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#DCE8F5]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#102F57]">
                Full Property Inventory
              </h3>
              <p className="text-[12px] text-[#6F87A5]">
                {properties.length} listings across 7 districts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/properties"
              className="h-[38px] px-3.5 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#F5F8FC] text-[13px] font-semibold text-[#102F57] inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#6F87A5]" />
              <span>Filter</span>
            </Link>
            <Link
              href="/properties"
              className="h-[38px] px-3.5 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#F5F8FC] text-[13px] font-semibold text-[#1769EB] inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Browse All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Table representation matching Mockup 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] rounded-[8px]">
                <th className="py-2.5 px-4 rounded-l-[8px]">Property</th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Area</th>
                <th className="py-2.5 px-4">Rent/sqft</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 rounded-r-[8px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {properties.slice(0, 5).map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[#F7FAFF] transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <Link href={`/properties/${p.id}`} className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-[6px] overflow-hidden bg-[#EAF3FF] flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-[#102F57] group-hover:text-[#1769EB] transition-colors line-clamp-1">
                        {p.title}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-[#6F87A5]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#6F87A5]" />
                      <span>{p.locality}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusPill value={p.landUse} variant="property_type" />
                  </td>
                  <td className="py-3.5 px-4 text-[#102F57] font-medium">
                    {p.areaSqft.toLocaleString()} sqft
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#102F57]">
                    ₹{p.rentPerSqft}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusPill value={p.status} variant="property_status" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <ChevronRight className="w-4 h-4 text-[#6F87A5] inline-block group-hover:translate-x-0.5 group-hover:text-[#1769EB] transition-all" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
