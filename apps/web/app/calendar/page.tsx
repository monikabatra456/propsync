"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  UserRound,
  FileText,
  MapPin,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

interface CalendarEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  time: string;
  timeRange?: string;
  type: "Site Visit" | "Follow Up" | "Document Review" | "Client Call" | "Overdue Follow-up";
  client: string;
  location: string;
  propertyThumb?: string;
}

const EVENTS: CalendarEvent[] = [
  // Oct 1
  { id: "e-1", day: 1, month: 10, year: 2026, title: "Site Visit", time: "10:00 AM", type: "Site Visit", client: "Rajiv Singhania", location: "Sector 62, Noida" },
  { id: "e-2", day: 1, month: 10, year: 2026, title: "Follow Up", time: "2:00 PM", type: "Follow Up", client: "Pooja Batra", location: "Remote" },
  { id: "e-3", day: 1, month: 10, year: 2026, title: "Client Call", time: "5:30 PM", type: "Client Call", client: "Vikram Malhotra", location: "Remote" },

  // Oct 2
  { id: "e-4", day: 2, month: 10, year: 2026, title: "Document Review", time: "11:00 AM", type: "Document Review", client: "Dr. Arvind", location: "Sector 62, Noida" },
  { id: "e-5", day: 2, month: 10, year: 2026, title: "Client Call", time: "4:00 PM", type: "Client Call", client: "Alistair Campbell", location: "Remote" },

  // Oct 4 (Today)
  {
    id: "e-t1", day: 4, month: 10, year: 2026, title: "Site Visit – Kavita Rao", time: "3:00 PM", timeRange: "3:00 PM – 4:00 PM",
    type: "Site Visit", client: "Kavita Rao", location: "Cyber City, Gurgaon",
    propertyThumb: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "e-t2", day: 4, month: 10, year: 2026, title: "Client Call – Rohan Mehta", time: "5:00 PM", timeRange: "5:00 PM – 6:00 PM",
    type: "Client Call", client: "Rohan Mehta", location: "Remote",
  },
  {
    id: "e-t3", day: 4, month: 10, year: 2026, title: "Follow Up – Priya Sharma", time: "6:00 PM", timeRange: "6:00 PM – 7:00 PM",
    type: "Follow Up", client: "Priya Sharma", location: "Remote",
  },

  // Oct 5
  { id: "e-6", day: 5, month: 10, year: 2026, title: "Overdue Follow-up", time: "6:00 PM", type: "Overdue Follow-up", client: "NexGen Fintech", location: "Remote" },
  {
    id: "e-7", day: 5, month: 10, year: 2026, title: "Document Review – Amit Verma", time: "11:00 AM", timeRange: "11:00 AM – 12:00 PM",
    type: "Document Review", client: "Amit Verma", location: "Sector 62, Noida",
  },
  {
    id: "e-8", day: 5, month: 10, year: 2026, title: "Site Visit – Sneha Patel", time: "3:00 PM", timeRange: "3:00 PM – 4:00 PM",
    type: "Site Visit", client: "Sneha Patel", location: "Gurgaon",
    propertyThumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=150&q=80",
  },

  // Oct 6
  {
    id: "e-9", day: 6, month: 10, year: 2026, title: "Client Call – Rohit Kumar", time: "10:30 AM", timeRange: "10:30 AM – 11:30 AM",
    type: "Client Call", client: "Rohit Kumar", location: "Remote",
  },
  {
    id: "e-10", day: 6, month: 10, year: 2026, title: "Site Visit – Neha Gupta", time: "1:00 PM", timeRange: "1:00 PM – 2:00 PM",
    type: "Site Visit", client: "Neha Gupta", location: "Greater Noida",
    propertyThumb: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80",
  },

  // Oct 8
  { id: "e-11", day: 8, month: 10, year: 2026, title: "Document Review", time: "11:30 AM", type: "Document Review", client: "DLF Mall", location: "Gurgaon" },
  { id: "e-12", day: 8, month: 10, year: 2026, title: "Client Call", time: "4:30 PM", type: "Client Call", client: "S.R. Properties", location: "Remote" },

  // Oct 9
  { id: "e-13", day: 9, month: 10, year: 2026, title: "Site Visit", time: "9:00 AM", type: "Site Visit", client: "Zepto Express", location: "Dwarka Expressway" },

  // Oct 12
  { id: "e-14", day: 12, month: 10, year: 2026, title: "Client Call", time: "11:00 AM", type: "Client Call", client: "Macquarie Advisory", location: "Remote" },
  { id: "e-15", day: 12, month: 10, year: 2026, title: "Follow Up", time: "3:00 PM", type: "Follow Up", client: "BlueStone", location: "Remote" },

  // Oct 14
  { id: "e-16", day: 14, month: 10, year: 2026, title: "Site Visit", time: "10:00 AM", type: "Site Visit", client: "Whitefield IT", location: "Bengaluru" },
  { id: "e-17", day: 14, month: 10, year: 2026, title: "Document Review", time: "2:00 PM", type: "Document Review", client: "Legal Team", location: "Noida" },

  // Oct 16
  { id: "e-18", day: 16, month: 10, year: 2026, title: "Overdue Follow-up", time: "5:00 PM", type: "Overdue Follow-up", client: "LogiPark Hub", location: "Remote" },

  // Oct 19
  { id: "e-19", day: 19, month: 10, year: 2026, title: "Site Visit", time: "9:30 AM", type: "Site Visit", client: "Fintech Client", location: "Sector 62" },
  { id: "e-20", day: 19, month: 10, year: 2026, title: "Client Call", time: "2:30 PM", type: "Client Call", client: "Capital Assets", location: "Remote" },

  // Oct 21
  { id: "e-21", day: 21, month: 10, year: 2026, title: "Follow Up", time: "11:00 AM", type: "Follow Up", client: "Priya Nair", location: "Remote" },
  { id: "e-22", day: 21, month: 10, year: 2026, title: "Site Visit", time: "3:00 PM", type: "Site Visit", client: "Zomato", location: "Bhiwandi" },

  // Oct 23
  { id: "e-23", day: 23, month: 10, year: 2026, title: "Document Review", time: "10:30 AM", type: "Document Review", client: "Title Registrar", location: "Noida" },
  { id: "e-24", day: 23, month: 10, year: 2026, title: "Client Call", time: "4:00 PM", type: "Client Call", client: "Dr. Arvind", location: "Remote" },

  // Oct 26
  { id: "e-25", day: 26, month: 10, year: 2026, title: "Overdue Follow-up", time: "6:00 PM", type: "Overdue Follow-up", client: "Zepto Express", location: "Remote" },

  // Oct 28
  { id: "e-26", day: 28, month: 10, year: 2026, title: "Site Visit", time: "10:00 AM", type: "Site Visit", client: "Retail Partner", location: "Cyber Hub" },
  { id: "e-27", day: 28, month: 10, year: 2026, title: "Follow Up", time: "2:00 PM", type: "Follow Up", client: "Alistair Campbell", location: "Remote" },

  // Oct 30
  { id: "e-28", day: 30, month: 10, year: 2026, title: "Client Call", time: "11:30 AM", type: "Client Call", client: "Rahul Sharma", location: "Remote" },
  { id: "e-29", day: 30, month: 10, year: 2026, title: "Document Review", time: "3:00 PM", type: "Document Review", client: "Lease Execution", location: "CP" },
];

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "List">("Month");
  const [selectedDay, setSelectedDay] = useState(4);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState("All Activities");

  // Schedule modal form state
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newType, setNewType] = useState<CalendarEvent["type"]>("Site Visit");
  const [newTime, setNewTime] = useState("10:00 AM");
  const [newLocation, setNewLocation] = useState("Sector 62, Noida");

  // Oct 2026 calendar days:
  // Starts on Thursday (Oct 1). Previous month (Sep) has 30 days: Sep 27 (Sun), 28 (Mon), 29 (Tue), 30 (Wed).
  // Oct has 31 days. Total 35 cells (7x5).
  const calendarDays = [
    { num: 27, inMonth: false },
    { num: 28, inMonth: false },
    { num: 29, inMonth: false },
    { num: 30, inMonth: false },
    { num: 1, inMonth: true },
    { num: 2, inMonth: true },
    { num: 3, inMonth: true },
    { num: 4, inMonth: true },
    { num: 5, inMonth: true },
    { num: 6, inMonth: true },
    { num: 7, inMonth: true },
    { num: 8, inMonth: true },
    { num: 9, inMonth: true },
    { num: 10, inMonth: true },
    { num: 11, inMonth: true },
    { num: 12, inMonth: true },
    { num: 13, inMonth: true },
    { num: 14, inMonth: true },
    { num: 15, inMonth: true },
    { num: 16, inMonth: true },
    { num: 17, inMonth: true },
    { num: 18, inMonth: true },
    { num: 19, inMonth: true },
    { num: 20, inMonth: true },
    { num: 21, inMonth: true },
    { num: 22, inMonth: true },
    { num: 23, inMonth: true },
    { num: 24, inMonth: true },
    { num: 25, inMonth: true },
    { num: 26, inMonth: true },
    { num: 27, inMonth: true },
    { num: 28, inMonth: true },
    { num: 29, inMonth: true },
    { num: 30, inMonth: true },
    { num: 31, inMonth: true },
  ];

  const getDotColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Site Visit":
        return "bg-[#16B77A]";
      case "Follow Up":
        return "bg-[#7A4FE0]";
      case "Document Review":
        return "bg-[#E08A00]";
      case "Client Call":
        return "bg-[#1769EB]";
      case "Overdue Follow-up":
        return "bg-[#E5484D]";
      default:
        return "bg-[#6F87A5]";
    }
  };

  const getBadgeStyle = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Site Visit":
        return "bg-[#E3F7EE] text-[#0F9D63]";
      case "Client Call":
        return "bg-[#EAF3FF] text-[#1769EB]";
      case "Follow Up":
        return "bg-[#F0EAFD] text-[#7A4FE0]";
      case "Document Review":
        return "bg-[#FFF1DC] text-[#E08A00]";
      case "Overdue Follow-up":
        return "bg-[#FDECEC] text-[#E5484D]";
    }
  };

  const todayEvents = EVENTS.filter((e) => e.day === 4);
  const upcomingEvents = EVENTS.filter((e) => e.day > 4 && e.day <= 6);

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Header with inline title + Schedule button */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Calendar</span>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight">
              Follow-up Calendar
            </h1>
            {/* Button inline with title */}
            <div className="flex items-center gap-2 mb-0.5">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="h-[38px] px-4 rounded-[10px] bg-[#0B2B57] hover:bg-[#071D3F] text-white text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Schedule Follow-up</span>
              </button>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Manage site visits, tenant calls, and lease document reviews across your pipeline.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. Main Two-Column Layout (2/3 Grid + 1/3 Upcoming) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (~ 2/3): Calendar Card */}
        <div className="lg:col-span-8 bg-white rounded-[16px] border border-[#DCE8F5] p-5 sm:p-6 shadow-sm space-y-4">
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#DCE8F5]">
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:border-[#1769EB] text-[#102F57] flex items-center justify-center transition-colors shadow-xs"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5 text-[#1769EB]" />
              </button>
              <h2 className="text-[20px] font-bold text-[#102F57] tracking-tight">
                October 2026
              </h2>
              <button
                className="w-10 h-10 rounded-full border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:border-[#1769EB] text-[#102F57] flex items-center justify-center transition-colors shadow-xs"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5 text-[#1769EB]" />
              </button>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Segmented Month | Week | List */}
              <div className="bg-[#F5F8FC] border border-[#DCE8F5] rounded-[10px] p-1 flex items-center">
                {(["Month", "Week", "List"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={cn(
                      "px-3 py-1 rounded-[8px] text-[13px] font-semibold transition-all",
                      viewMode === mode
                        ? "bg-[#0B2B57] text-white shadow-xs"
                        : "text-[#6F87A5] hover:text-[#102F57]"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="h-5 w-[1px] bg-[#DCE8F5] hidden sm:block" />

              {/* All Activities Dropdown */}
              <div className="relative">
                <select
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  className="h-[38px] pl-3 pr-8 rounded-[10px] border border-[#DCE8F5] bg-white text-[13px] font-semibold text-[#102F57] appearance-none cursor-pointer outline-none hover:border-[#6F87A5]/40"
                >
                  <option>All Activities</option>
                  <option>Site Visits</option>
                  <option>Follow Ups</option>
                  <option>Client Calls</option>
                  <option>Document Reviews</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#6F87A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 text-center text-[13px] font-semibold text-[#6F87A5] py-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* 7x5 Calendar Grid */}
          <div className="grid grid-cols-7 border-t border-l border-[#DCE8F5] rounded-[8px] overflow-hidden">
            {calendarDays.map((d, index) => {
              const dayEvents = d.inMonth ? EVENTS.filter((e) => e.day === d.num) : [];
              const isSelected = d.inMonth && d.num === selectedDay;
              const isToday = d.inMonth && d.num === 4;

              return (
                <div
                  key={index}
                  onClick={() => d.inMonth && setSelectedDay(d.num)}
                  className={cn(
                    "min-h-[125px] p-2 border-r border-b border-[#DCE8F5] transition-colors relative flex flex-col justify-between group",
                    !d.inMonth ? "bg-[#FAFBFD] text-[#6F87A5]/40" : "bg-white hover:bg-[#F7FAFF] cursor-pointer",
                    isSelected && "ring-2 ring-inset ring-[#1769EB]/30 bg-[#F9FBFF]"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[13px] font-semibold inline-flex items-center justify-center rounded-full w-6 h-6",
                        isToday ? "bg-[#1769EB] text-white" : d.inMonth ? "text-[#102F57]" : "text-[#6F87A5]/50"
                      )}
                    >
                      {d.num}
                    </span>
                  </div>

                  {/* Day Events (max 2 then +N more) */}
                  <div className="space-y-1 mt-1 flex-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className="text-[11px] font-medium leading-tight py-0.5 px-1.5 rounded-[4px] bg-[#F5F8FC] border border-[#DCE8F5] flex items-center gap-1.5 truncate group/item hover:border-[#1769EB]/40 transition-colors"
                        title={`${ev.title} (${ev.time})`}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", getDotColor(ev.type))} />
                        <span className="text-[#102F57] font-semibold truncate">{ev.title}</span>
                        <span className="text-[#6F87A5] text-[10px] ml-auto flex-shrink-0">{ev.time}</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] font-bold text-[#1769EB] hover:underline block pl-1">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Card Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#DCE8F5] text-[13px] text-[#6F87A5]">
            <span>Showing 1–31 of 31 days</span>
            <div className="flex items-center gap-1">
              <button className="h-[32px] px-2.5 rounded-[8px] border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#102F57] font-medium">
                ‹
              </button>
              <button
                onClick={() => setSelectedDay(4)}
                className="h-[32px] px-3 rounded-[8px] border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#102F57] font-semibold"
              >
                Today
              </button>
              <button className="h-[32px] px-2.5 rounded-[8px] border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#102F57] font-medium">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (~ 1/3): Upcoming & Today Panel */}
        <div className="lg:col-span-4 bg-white rounded-[16px] border border-[#DCE8F5] p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[#DCE8F5]">
            <h3 className="text-[16px] font-bold text-[#102F57]">
              Upcoming & Today
            </h3>
            <button className="text-[13px] font-semibold text-[#1769EB] hover:underline">
              View All
            </button>
          </div>

          {/* Section: Today • Oct 4, 2026 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 py-1.5 px-3 rounded-[8px] bg-[#EAF3FF] text-[#1769EB] text-[13px] font-bold">
              <CalendarIcon className="w-4 h-4" />
              <span>Today • Oct 4, 2026</span>
            </div>

            <div className="space-y-2.5">
              {todayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-[12px] border border-[#DCE8F5] bg-white hover:bg-[#F9FBFF] hover:border-[#1769EB]/30 transition-all flex items-start gap-3 shadow-xs"
                >
                  {/* Icon or Thumbnail 44px */}
                  {ev.propertyThumb ? (
                    <div className="w-11 h-11 rounded-[8px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ev.propertyThumb} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0",
                        ev.type === "Client Call"
                          ? "bg-[#EAF3FF] text-[#1769EB]"
                          : ev.type === "Follow Up"
                          ? "bg-[#F0EAFD] text-[#7A4FE0]"
                          : "bg-[#FFF1DC] text-[#E08A00]"
                      )}
                    >
                      {ev.type === "Client Call" ? (
                        <Phone className="w-5 h-5" />
                      ) : ev.type === "Follow Up" ? (
                        <UserRound className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[11px] font-semibold text-[#6F87A5]">
                        {ev.timeRange || ev.time}
                      </span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", getBadgeStyle(ev.type))}>
                        {ev.type}
                      </span>
                    </div>
                    <h4 className="text-[13px] font-bold text-[#102F57] truncate">
                      {ev.title}
                    </h4>
                    <p className="text-[11px] text-[#6F87A5] flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#6F87A5] flex-shrink-0" />
                      <span>{ev.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Upcoming (Oct 5 & 6) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 py-1.5 px-3 rounded-[8px] bg-[#F5F8FC] text-[#102F57] text-[13px] font-bold border border-[#DCE8F5]">
              <span className="text-base">🕒</span>
              <span>Upcoming</span>
            </div>

            <div className="space-y-2.5">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-[12px] border border-[#DCE8F5] bg-white hover:bg-[#F9FBFF] hover:border-[#1769EB]/30 transition-all flex items-start gap-3 shadow-xs"
                >
                  {ev.propertyThumb ? (
                    <div className="w-11 h-11 rounded-[8px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ev.propertyThumb} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0",
                        ev.type === "Client Call"
                          ? "bg-[#EAF3FF] text-[#1769EB]"
                          : ev.type === "Follow Up"
                          ? "bg-[#F0EAFD] text-[#7A4FE0]"
                          : "bg-[#FFF1DC] text-[#E08A00]"
                      )}
                    >
                      {ev.type === "Client Call" ? (
                        <Phone className="w-5 h-5" />
                      ) : ev.type === "Follow Up" ? (
                        <UserRound className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[11px] font-semibold text-[#6F87A5]">
                        Oct {ev.day}, {ev.timeRange || ev.time}
                      </span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", getBadgeStyle(ev.type))}>
                        {ev.type}
                      </span>
                    </div>
                    <h4 className="text-[13px] font-bold text-[#102F57] truncate">
                      {ev.title}
                    </h4>
                    <p className="text-[11px] text-[#6F87A5] flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#6F87A5] flex-shrink-0" />
                      <span>{ev.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Follow-up Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setShowScheduleModal(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[16px] shadow-2xl z-10 p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
              <h3 className="text-[18px] font-bold text-[#102F57]">Schedule Follow-up</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded-full text-[#6F87A5] hover:bg-[#F5F8FC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowScheduleModal(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Activity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Site Visit – Client Team Inspection"
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Activity Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] bg-white outline-none focus:border-[#1769EB]"
                  >
                    <option>Site Visit</option>
                    <option>Follow Up</option>
                    <option>Client Call</option>
                    <option>Document Review</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    defaultValue="Oct 5, 2026 – 11:00 AM"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Client / Lead Contact
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kavita Rao (BlueStone Retail)"
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#6F87A5] block mb-1">
                  Location / Meeting Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cyber Hub Galleria, Sector 24, Gurgaon"
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#DCE8F5] text-[13px] outline-none focus:border-[#1769EB]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 h-[42px] rounded-[10px] border border-[#DCE8F5] text-[13px] font-semibold text-[#102F57] hover:bg-[#F5F8FC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-[42px] rounded-[10px] bg-[#0B2B57] text-white text-[13px] font-semibold hover:bg-[#071D3F] shadow-sm"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
