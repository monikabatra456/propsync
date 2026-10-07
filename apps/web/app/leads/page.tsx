"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Download,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Ellipsis,
  X,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

interface LeadItem {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  initialsColor?: string;
  phone: string;
  email: string;
  propertyName: string;
  locality: string;
  commercials: string;
  propertyImage: string;
  source: string;
  lastContact: string;
  contactBy: string;
  status: string;
}

const SEED_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    phone: "+91 98765 43210",
    email: "priya@email.com",
    propertyName: "Premium Office Space",
    locality: "Sector 62",
    commercials: "₹18,000/sqft · 5,000 sqft",
    propertyImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
    source: "Website",
    lastContact: "Today, 11:30 AM",
    contactBy: "by You",
    status: "Interested",
  },
  {
    id: "lead-2",
    name: "Rohit Kumar",
    initials: "RK",
    initialsColor: "bg-[#EAF3FF] text-[#1769EB]",
    phone: "+91 87654 32109",
    email: "rohit@email.com",
    propertyName: "Retail Space – Cyber City",
    locality: "Cyber City",
    commercials: "₹120/sqft · 2,500 sqft",
    propertyImage: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=150&q=80",
    source: "Google Ads",
    lastContact: "Yesterday, 04:15 PM",
    contactBy: "by Anjali",
    status: "Follow Up",
  },
  {
    id: "lead-3",
    name: "Amit Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    phone: "+91 91234 56789",
    email: "amit@email.com",
    propertyName: "Warehouse – Bhiwandi",
    locality: "Mankoli Naka",
    commercials: "₹8/sqft · 10,000 sqft",
    propertyImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&q=80",
    source: "Referral",
    lastContact: "Oct 1, 2026",
    contactBy: "by You",
    status: "Site Visit Scheduled",
  },
  {
    id: "lead-4",
    name: "Sneha Patel",
    initials: "SP",
    initialsColor: "bg-[#E3F7EE] text-[#0F9D63]",
    phone: "+91 99887 76655",
    email: "sneha@email.com",
    propertyName: "Commercial Space – Connaught Place",
    locality: "Connaught Place",
    commercials: "₹250/sqft · 3,200 sqft",
    propertyImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=150&q=80",
    source: "Facebook",
    lastContact: "Sep 30, 2026",
    contactBy: "by Rahul",
    status: "In Discussion",
  },
  {
    id: "lead-5",
    name: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    phone: "+91 93456 12345",
    email: "neha@email.com",
    propertyName: "Grade-A IT Park Tech Center",
    locality: "Whitefield",
    commercials: "₹65/sqft · 25,000 sqft",
    propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80",
    source: "Website",
    lastContact: "Sep 29, 2026",
    contactBy: "by Anjali",
    status: "Converted",
  },
  {
    id: "lead-6",
    name: "Vikram Singh",
    initials: "VS",
    initialsColor: "bg-[#F0EAFD] text-[#7A4FE0]",
    phone: "+91 90012 34567",
    email: "vikram@email.com",
    propertyName: "Residential Land – Dwarka",
    locality: "Dwarka Expressway",
    commercials: "₹10/sqft · 12,000 sqft",
    propertyImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=150&q=80",
    source: "Property Portals",
    lastContact: "Sep 28, 2026",
    contactBy: "by You",
    status: "Not Interested",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>(SEED_LEADS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New lead state
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProperty, setNewProperty] = useState("Premium Office Space – Sector 62");
  const [newSource, setNewSource] = useState("Website");
  const [newStatus, setNewStatus] = useState("Interested");

  const filteredLeads = leads.filter((l) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.propertyName.toLowerCase().includes(q) ||
        l.locality.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== "All" && l.status !== statusFilter) return false;
    if (sourceFilter !== "All" && l.source !== sourceFilter) return false;
    return true;
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: newName,
      initials: newName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      initialsColor: "bg-[#EAF3FF] text-[#1769EB]",
      phone: newPhone || "+91 98765 00000",
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      propertyName: newProperty,
      locality: "Sector 62",
      commercials: "₹20/sqft · 5,000 sqft",
      propertyImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80",
      source: newSource,
      lastContact: "Just now",
      contactBy: "by You",
      status: newStatus,
    };
    setLeads([newLead, ...leads]);
    setShowAddDrawer(false);
    setNewName("");
    setNewPhone("");
    setNewEmail("");
  };

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Page Header with inline title + action buttons */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        {/* Left: Eyebrow + Title row + subtitle */}
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Leads</span>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight">
              Manage Your Leads
            </h1>
            {/* Buttons inline with title */}
            <div className="flex items-center gap-2 mb-0.5">
              <button
                onClick={() => setShowAddDrawer(true)}
                className="h-[38px] px-4 rounded-[10px] bg-[#0B2B57] hover:bg-[#071D3F] text-white text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Lead</span>
              </button>
              <button
                onClick={() => {}}
                className="h-[38px] px-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#0B2B57] text-[13px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 stroke-[2]" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Track, follow up and convert leads into successful property deals.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. 4 KPI Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Leads"
          value="48"
          icon={Users}
          delta={{ text: "+12% vs last month", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "New Inquiries", count: "16 leads" },
            { label: "Active Discussion", count: "20 leads" },
            { label: "Qualified Corporate", count: "12 leads" },
            { label: "Channel Mix", count: "5 sources" },
          ]}
        />
        <KpiCard
          label="Active Leads"
          value="32"
          icon={Users}
          delta={{ text: "+18% vs last month", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Sector 62 Office", count: "14 leads" },
            { label: "Cyber City Retail", count: "8 leads" },
            { label: "Bhiwandi Warehouse", count: "6 leads" },
            { label: "CP Commercial", count: "4 leads" },
          ]}
        />
        <KpiCard
          label="Site Visits Scheduled"
          value="12"
          icon={Users}
          delta={{ text: "+33% vs last month", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "This Week", count: "7 visits" },
            { label: "Next Week", count: "5 visits" },
            { label: "Assigned Staff", count: "3 agents" },
            { label: "Attendance Rate", count: "92%" },
          ]}
        />
        <KpiCard
          label="Converted"
          value="6"
          icon={Users}
          delta={{ text: "+50% vs last month", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Total Deal Volume", count: "₹24.8 L" },
            { label: "Avg Conversion Time", count: "14 Days" },
            { label: "Top Agent", count: "Anjali (3)" },
            { label: "Customer NPS", count: "4.9 / 5" },
          ]}
        />
      </div>

      {/* 3. Filter Card with Floating Mini-Labels */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#6F87A5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, property or location…"
              className="w-full h-[44px] pl-9 pr-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:border-[#6F87A5]/40 focus:border-[#1769EB] focus:ring-3 focus:ring-[#1769EB]/20 text-[13px] text-[#102F57] placeholder:text-[#6F87A5]/80 outline-none transition-all"
            />
          </div>

          {/* Lead Status */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Lead Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Interested">Interested</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Converted">Converted</option>
                <option value="Not Interested">Not Interested</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Property */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Property
              </label>
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Premium Office Space">Premium Office Space</option>
                <option value="Retail Space – Cyber City">Retail Space – Cyber City</option>
                <option value="Warehouse – Bhiwandi">Warehouse – Bhiwandi</option>
                <option value="Commercial Space – CP">Commercial Space – CP</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Source */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Source
              </label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Website">Website</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Referral">Referral</option>
                <option value="Facebook">Facebook</option>
                <option value="Property Portals">Property Portals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Filter button */}
          <div className="md:col-span-1">
            <button
              onClick={() => {}}
              className="w-full h-[44px] rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#F5F8FC] text-[#102F57] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#6F87A5]" />
              <span className="hidden xl:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Leads Table */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] border-b border-[#DCE8F5]">
                <th className="py-3 px-5">Lead Details</th>
                <th className="py-3 px-5">Interested In</th>
                <th className="py-3 px-5">Source</th>
                <th className="py-3 px-5">Last Contact</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {filteredLeads.map((l) => (
                <tr
                  key={l.id}
                  className="hover:bg-[#F7FAFF] transition-colors group cursor-pointer"
                >
                  {/* Lead Details: Avatar, Name, Phone, Email */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      {l.avatar ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.avatar} alt={l.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0",
                            l.initialsColor || "bg-[#EAF3FF] text-[#1769EB]"
                          )}
                        >
                          {l.initials}
                        </div>
                      )}
                      <div>
                        <span className="text-[15px] font-semibold text-[#102F57] block group-hover:text-[#1769EB] transition-colors">
                          {l.name}
                        </span>
                        <div className="flex items-center gap-3 text-[12px] text-[#6F87A5] mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#6F87A5]" />
                            {l.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#6F87A5]" />
                            {l.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Interested In: Thumbnail 56x56, Property, Locality, Commercials */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={l.propertyImage}
                          alt={l.propertyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#102F57] block line-clamp-1">
                          {l.propertyName}
                        </span>
                        <span className="text-[11px] text-[#6F87A5] block">
                          {l.locality}
                        </span>
                        <span className="text-[12px] font-semibold text-[#0F9D63] block mt-0.5">
                          {l.commercials}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="py-4 px-5">
                    <StatusPill value={l.source} variant="lead_source" />
                  </td>

                  {/* Last Contact */}
                  <td className="py-4 px-5">
                    <span className="text-[13px] font-medium text-[#102F57] block">
                      {l.lastContact}
                    </span>
                    <span className="text-[11px] text-[#6F87A5] block">
                      {l.contactBy}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <StatusPill value={l.status} variant="lead_status" />
                  </td>

                  {/* Actions: Eye, Phone, More */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:text-[#1769EB] text-[#102F57] flex items-center justify-center transition-colors shadow-xs"
                        title="View Lead"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={`tel:${l.phone}`}
                        className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] bg-white hover:bg-[#E3F7EE] hover:text-[#0F9D63] text-[#102F57] flex items-center justify-center transition-colors shadow-xs"
                        title="Call Tenant"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:text-[#1769EB] text-[#102F57] flex items-center justify-center transition-colors shadow-xs"
                        title="More"
                      >
                        <Ellipsis className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Footer: Count & Pagination */}
        <div className="p-4 sm:px-6 border-t border-[#DCE8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[#6F87A5]">
          <span>Showing 1–{filteredLeads.length} of 48 leads</span>

          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center hover:bg-[#F5F8FC] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "w-8 h-8 rounded-[8px] font-semibold text-[13px] transition-colors",
                  pageNum === currentPage
                    ? "bg-[#0B2B57] text-white"
                    : "border border-[#DCE8F5] text-[#102F57] hover:bg-[#F5F8FC]"
                )}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
              disabled={currentPage === 5}
              className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center hover:bg-[#F5F8FC] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Add Lead Slide-out Drawer */}
      {showAddDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setShowAddDrawer(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
                <h3 className="text-[18px] font-bold text-[#102F57]">Add New Lead</h3>
                <button
                  onClick={() => setShowAddDrawer(false)}
                  className="p-1.5 rounded-full hover:bg-[#F5F8FC] text-[#6F87A5]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLead} className="space-y-4 mt-5">
                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="ramesh@example.com"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Interested Property
                  </label>
                  <select
                    value={newProperty}
                    onChange={(e) => setNewProperty(e.target.value)}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] bg-white outline-none focus:border-[#1769EB]"
                  >
                    <option>Premium Office Space – Sector 62</option>
                    <option>Retail Space – Cyber City</option>
                    <option>Warehouse – Bhiwandi</option>
                    <option>Commercial Space – Connaught Place</option>
                    <option>Grade-A IT Park Tech Center – Whitefield</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                      Lead Source
                    </label>
                    <select
                      value={newSource}
                      onChange={(e) => setNewSource(e.target.value)}
                      className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] bg-white outline-none focus:border-[#1769EB]"
                    >
                      <option>Website</option>
                      <option>Google Ads</option>
                      <option>Referral</option>
                      <option>Facebook</option>
                      <option>Property Portals</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                      Initial Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] bg-white outline-none focus:border-[#1769EB]"
                    >
                      <option>Interested</option>
                      <option>Follow Up</option>
                      <option>Site Visit Scheduled</option>
                      <option>In Discussion</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddDrawer(false)}
                    className="flex-1 h-[42px] rounded-[10px] border border-[#DCE8F5] text-[13px] font-semibold text-[#102F57] hover:bg-[#F5F8FC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-[42px] rounded-[10px] bg-[#0B2B57] text-white text-[13px] font-semibold hover:bg-[#071D3F] shadow-sm"
                  >
                    Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
