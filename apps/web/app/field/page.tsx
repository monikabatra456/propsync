"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Calendar,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Navigation,
  RotateCw,
  LayoutGrid,
  List as ListIcon,
  X,
  FileCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

interface SurveyCardItem {
  id: string;
  title: string;
  address: string;
  dueDate: string;
  type: string;
  gpsTracked: boolean;
  notes: string;
  status: "In Progress" | "Pending" | "Submitted";
  photoCount: number;
  requiredPhotos: number;
  checklistDone: number;
  checklistTotal: number;
  thumb: string;
}

const SEED_SURVEYS: SurveyCardItem[] = [
  {
    id: "surv-1",
    title: "Prestige Tech Park – Block C, 3rd Floor",
    address: "Outer Ring Road, Marathahalli, Bengaluru – 560103",
    dueDate: "Oct 4, 2026",
    type: "Commercial Office",
    gpsTracked: true,
    notes: "Requires lobby, lifts, and terrace verification",
    status: "In Progress",
    photoCount: 7,
    requiredPhotos: 15,
    checklistDone: 4,
    checklistTotal: 8,
    thumb: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "surv-2",
    title: "DLF Corporate Park – Tower A",
    address: "Sector 74A, Gurugram, Haryana – 122004",
    dueDate: "Oct 5, 2026",
    type: "Grade-A IT Park",
    gpsTracked: false,
    notes: "Site manager Mr. Ahuja will meet at 11 AM",
    status: "Pending",
    photoCount: 0,
    requiredPhotos: 20,
    checklistDone: 0,
    checklistTotal: 6,
    thumb: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "surv-3",
    title: "Bhiwandi Mega Warehouse – Unit B-22",
    address: "Bhiwandi Logistics Park, NH-3 Bypass, Thane – 421302",
    dueDate: "Sep 26, 2026",
    type: "Industrial Hub",
    gpsTracked: true,
    notes: "Completed docking bay & internal laser level check",
    status: "Submitted",
    photoCount: 22,
    requiredPhotos: 20,
    checklistDone: 6,
    checklistTotal: 6,
    thumb: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80",
  },
];

export default function FieldSurveyPage() {
  const [surveys, setSurveys] = useState<SurveyCardItem[]>(SEED_SURVEYS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeModalSurvey, setActiveModalSurvey] = useState<SurveyCardItem | null>(null);

  const filtered = surveys.filter((s) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.address.toLowerCase().includes(q)) return false;
    }
    if (statusFilter !== "All" && s.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Header with inline title + action buttons */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0 pr-0 lg:pr-[380px]">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">‹ Field Survey</span>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight">
              Field Survey Station
            </h1>
            {/* Buttons inline with title */}
            <div className="flex items-center gap-2 mb-0.5">
              <button
                onClick={() => {}}
                className="h-[38px] px-4 rounded-[10px] bg-[#1769EB] hover:bg-[#0F57CC] text-white text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Survey</span>
              </button>
              <Link
                href="/calendar"
                className="h-[38px] px-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#0B2B57] text-[13px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#1769EB]" />
                <span>View Schedule</span>
              </Link>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Manage assigned surveys, site visits, photos, GPS tracking and checklist completion.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. 4 KPI Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Active Surveys"
          value="2"
          icon={Camera}
          delta={{ text: "+100% vs last month", isPositive: true }}
          sparkline={true}
        />
        <KpiCard
          label="In Progress"
          value="1"
          icon={Camera}
          delta={{ text: "+50% vs last month", isPositive: true }}
          sparkline={true}
        />
        <KpiCard
          label="Submitted"
          value="1"
          icon={CheckCircle2}
          delta={{ text: "+33% vs last month", isPositive: true }}
          sparkline={true}
        />
        <KpiCard
          label="Photos Taken"
          value="29"
          icon={Camera}
          delta={{ text: "+76% vs last month", isPositive: true }}
          sparkline={true}
        />
      </div>

      {/* 3. Filter Card */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#6F87A5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by property name, location or survey type…"
              className="w-full h-[44px] pl-9 pr-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:border-[#6F87A5]/40 focus:border-[#1769EB] focus:ring-3 focus:ring-[#1769EB]/20 text-[13px] text-[#102F57] placeholder:text-[#6F87A5]/80 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-3">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Survey Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Grade-A IT Park">Grade-A IT Park</option>
                <option value="Industrial Hub">Industrial Hub</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

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

      {/* 4. Section Header: Title & View Switcher */}
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-[#102F57]">
          Assigned Surveys ({filtered.length})
        </h2>

        <div className="flex items-center bg-white border border-[#DCE8F5] rounded-[10px] p-0.5 shadow-xs">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1.5 rounded-[8px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors",
              viewMode === "list" ? "bg-[#0B2B57] text-white" : "text-[#6F87A5] hover:text-[#102F57]"
            )}
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded-[8px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors",
              viewMode === "grid" ? "bg-[#0B2B57] text-white" : "text-[#6F87A5] hover:text-[#102F57]"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Surveys List / Grid View */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {filtered.map((s) => {
            const photoPercent = Math.min(100, Math.round((s.photoCount / s.requiredPhotos) * 100));
            const checkPercent = Math.min(100, Math.round((s.checklistDone / s.checklistTotal) * 100));

            return (
              <div
                key={s.id}
                className="bg-white rounded-[16px] border border-[#DCE8F5] p-5 shadow-sm hover:shadow-md hover:border-[#1769EB]/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Thumb 100x100 */}
                  <div className="w-[100px] h-[100px] rounded-[12px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.thumb} alt={s.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-[17px] font-bold text-[#102F57] line-clamp-1">
                        {s.title}
                      </h3>
                      <StatusPill value={s.status} variant="survey_status" dot />
                    </div>

                    <p className="text-[12px] text-[#6F87A5] flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#6F87A5] flex-shrink-0" />
                      <span>{s.address}</span>
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-[#6F87A5] pt-0.5 flex-wrap">
                      <span>Due: <strong className="text-[#102F57]">{s.dueDate}</strong></span>
                      <span>·</span>
                      <span>{s.type}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Navigation className={cn("w-3 h-3", s.gpsTracked ? "text-[#16B77A]" : "text-[#6F87A5]")} />
                        <span className={s.gpsTracked ? "text-[#0F9D63] font-semibold" : "text-[#6F87A5]"}>
                          {s.gpsTracked ? "GPS Tracked" : "GPS Not Tracked"}
                        </span>
                      </span>
                      <span>·</span>
                      <span className="italic">{s.notes}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bars + Open Survey button */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end xl:items-center gap-5 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-0 border-[#DCE8F5]">
                  <div className="w-full sm:w-[220px] space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-[#6F87A5] mb-1">
                        <span>Photos</span>
                        <span>{s.photoCount}/{s.requiredPhotos}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E6EEF8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1769EB] rounded-full transition-all duration-500"
                          style={{ width: `${photoPercent}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-[#6F87A5] mb-1">
                        <span>Checklist</span>
                        <span>{s.checklistDone}/{s.checklistTotal}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E6EEF8] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            checkPercent === 100 ? "bg-[#16B77A]" : "bg-[#F4B740]"
                          )}
                          style={{ width: `${checkPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalSurvey(s)}
                    className="h-[38px] px-4 rounded-[10px] border border-[#1769EB] text-[#1769EB] hover:bg-[#1769EB] hover:text-white font-semibold text-[13px] inline-flex items-center gap-1.5 transition-all shadow-xs self-end sm:self-auto"
                  >
                    <span>Open Survey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const photoPercent = Math.min(100, Math.round((s.photoCount / s.requiredPhotos) * 100));
            const checkPercent = Math.min(100, Math.round((s.checklistDone / s.checklistTotal) * 100));

            return (
              <div
                key={s.id}
                className="bg-white rounded-[16px] border border-[#DCE8F5] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative h-[160px] rounded-[12px] overflow-hidden bg-[#EAF3FF] mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.thumb} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 left-2.5">
                      <StatusPill value={s.status} variant="survey_status" dot />
                    </div>
                  </div>

                  <h3 className="text-[16px] font-bold text-[#102F57] line-clamp-1">
                    {s.title}
                  </h3>
                  <p className="text-[12px] text-[#6F87A5] flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#6F87A5] flex-shrink-0" />
                    <span>{s.address}</span>
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#DCE8F5]">
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-[#6F87A5] mb-1">
                        <span>Photos Uploaded</span>
                        <span>{s.photoCount}/{s.requiredPhotos}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E6EEF8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1769EB] rounded-full transition-all"
                          style={{ width: `${photoPercent}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-[#6F87A5] mb-1">
                        <span>Checklist Tasks</span>
                        <span>{s.checklistDone}/{s.checklistTotal}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E6EEF8] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            checkPercent === 100 ? "bg-[#16B77A]" : "bg-[#F4B740]"
                          )}
                          style={{ width: `${checkPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalSurvey(s)}
                    className="w-full h-[38px] rounded-[10px] border border-[#1769EB] text-[#1769EB] hover:bg-[#1769EB] hover:text-white font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Open Survey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pager footer */}
      <div className="p-4 border-t border-[#DCE8F5] flex items-center justify-between text-[13px] text-[#6F87A5]">
        <span>Showing 1–{filtered.length} of 3 surveys</span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center disabled:opacity-40" disabled>
            ‹
          </button>
          <button className="w-8 h-8 rounded-[8px] bg-[#0B2B57] text-white font-semibold">
            1
          </button>
          <button className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center disabled:opacity-40" disabled>
            ›
          </button>
        </div>
      </div>

      {/* Survey Modal Details */}
      {activeModalSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setActiveModalSurvey(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[16px] shadow-2xl z-10 p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
              <div>
                <h3 className="text-[17px] font-bold text-[#102F57]">
                  {activeModalSurvey.title}
                </h3>
                <span className="text-[12px] text-[#6F87A5]">{activeModalSurvey.address}</span>
              </div>
              <button
                onClick={() => setActiveModalSurvey(null)}
                className="p-1 rounded-full text-[#6F87A5] hover:bg-[#F5F8FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-[#EAF3FF] rounded-[10px] text-[#102F57] space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>GPS Status:</span>
                  <span className={activeModalSurvey.gpsTracked ? "text-[#16B77A]" : "text-[#6F87A5]"}>
                    {activeModalSurvey.gpsTracked ? "✔ Geotagged (12.9599° N, 77.6972° E)" : "Not Tracked"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-semibold">{activeModalSurvey.dueDate}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#102F57] mb-1">Checklist Progress</h4>
                <p className="text-[12px] text-[#6F87A5] mb-2">
                  {activeModalSurvey.checklistDone} of {activeModalSurvey.checklistTotal} inspection criteria verified
                </p>
                <div className="space-y-1.5">
                  {[
                    "Building Elevation in Bright Daylight",
                    "Entry Road & Reception Lobby",
                    "Electrical DG Backup & Lift Shafts",
                    "Municipal Boundary Geofence Match",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px]">
                      <CheckCircle2 className="w-4 h-4 text-[#16B77A]" />
                      <span className="text-[#102F57]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => setActiveModalSurvey(null)}
                  className="flex-1 h-[42px] rounded-[10px] border border-[#DCE8F5] text-[13px] font-semibold text-[#102F57] hover:bg-[#F5F8FC]"
                >
                  Close
                </button>
                <button
                  onClick={() => setActiveModalSurvey(null)}
                  className="flex-1 h-[42px] rounded-[10px] bg-[#1769EB] text-white text-[13px] font-semibold hover:bg-[#0F57CC] shadow-sm"
                >
                  Upload New Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
