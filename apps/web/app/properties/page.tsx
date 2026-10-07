"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  House,
  Clock,
  CalendarDays,
  Plus,
  Download,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Maximize2,
  IndianRupee,
  Eye,
  Pencil,
  EllipsisVertical,
  LayoutGrid,
  List as ListIcon,
  RotateCw,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { getStoredProperties, Property } from "@/lib/propertyStore";
import { exportPropertyPresentation } from "@/lib/pptExport";
import { formatCurrencyINR } from "@/lib/units";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [landUseFilter, setLandUseFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProperties(getStoredProperties());
  }, []);

  // Aggregates
  const totalCount = properties.length || 8;
  const availableCount = properties.filter((p) => p.status === "available").length || 6;
  const underVerificationCount = properties.filter((p) => p.status === "under_verification").length || 0;

  // Filter properties logic
  const filteredProperties = properties.filter((item) => {
    if (searchTerm) {
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }

    if (landUseFilter !== "All" && item.landUse.toLowerCase() !== landUseFilter.toLowerCase()) {
      return false;
    }

    if (availabilityFilter !== "All") {
      const normAvailability = item.status.toLowerCase().replace(/[\s_]+/g, "");
      const normFilter = availabilityFilter.toLowerCase().replace(/[\s_]+/g, "");
      if (normAvailability !== normFilter) return false;
    }

    if (statusFilter !== "All") {
      const normStatus = item.status.toLowerCase().replace(/[\s_]+/g, "");
      const normFilter = statusFilter.toLowerCase().replace(/[\s_]+/g, "");
      if (normStatus !== normFilter) return false;
    }

    return true;
  });

  // Sort logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.rentPerSqft - b.rentPerSqft;
    if (sortBy === "Price: High to Low") return b.rentPerSqft - a.rentPerSqft;
    if (sortBy === "Area: Large to Small") return b.areaSqft - a.areaSqft;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-[1536px] mx-auto animate-fadeUp">
      {/* 1. Page Header with inline title + action buttons */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Properties</span>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight">
              All Properties
            </h1>
            {/* Buttons inline with title */}
            <div className="flex items-center gap-2 mb-0.5">
              <Link
                href="/properties/new"
                className="h-[38px] px-4 rounded-[10px] bg-[#0B2B57] hover:bg-[#071D3F] text-white text-[13px] font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add New Property</span>
              </Link>
              <button
                onClick={() => {
                  if (properties.length > 0) exportPropertyPresentation(properties[0]);
                }}
                className="h-[38px] px-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#0B2B57] text-[13px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 stroke-[2]" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Manage, track and monitor all your properties in one place.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Properties"
          value={totalCount}
          icon={Building2}
          delta={{ text: "+12% vs last month", isPositive: true }}
          ghost="building"
          breakdown={[
            { label: "Commercial Office", count: "3 units" },
            { label: "Retail Showrooms", count: "2 units" },
            { label: "Industrial Warehouses", count: "2 units" },
            { label: "Residential Plots", count: "1 unit" },
          ]}
        />
        <KpiCard
          label="Available"
          value={availableCount}
          icon={House}
          delta={{ text: "+18% vs last month", isPositive: true }}
          ghost="people"
          breakdown={[
            { label: "Sector 62 Noida", count: "₹90,000/mo" },
            { label: "Whitefield Tech Center", count: "₹16,25,000/mo" },
            { label: "Immediate Occupancy", count: "4 units" },
            { label: "Average Rate", count: "₹42/sqft" },
          ]}
        />
        <KpiCard
          label="Under Verification"
          value={underVerificationCount}
          icon={Clock}
          subtext="→ No change"
          ghost="target"
          breakdown={[
            { label: "Title Deed Audit", count: "Completed" },
            { label: "Municipal OC", count: "In Review" },
            { label: "Fire Safety NOC", count: "Verified" },
            { label: "Geo-fence Tag", count: "Auto-matched" },
          ]}
        />
        <KpiCard
          label="New This Week"
          value="1"
          icon={CalendarDays}
          delta={{ text: "+12% vs last week", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Listed Property", count: "Sector 62" },
            { label: "Carpet Area", count: "5,000 sqft" },
            { label: "Verified Agent", count: "S.R. Properties" },
            { label: "Pipeline Views", count: "14 visits" },
          ]}
        />
      </div>

      {/* 3. Filter Card with Floating Mini-Labels */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          {/* Search Field */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-[#6F87A5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by property name, location, or ID…"
              className="w-full h-[44px] pl-9 pr-4 rounded-[10px] bg-white border border-[#DCE8F5] hover:border-[#6F87A5]/40 focus:border-[#1769EB] focus:ring-3 focus:ring-[#1769EB]/20 text-[13px] text-[#102F57] placeholder:text-[#6F87A5]/80 outline-none transition-all"
            />
          </div>

          {/* Select: Land Use */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Land Use
              </label>
              <select
                value={landUseFilter}
                onChange={(e) => setLandUseFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
                <option value="Industrial">Industrial</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Select: Availability */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="available">Available</option>
                <option value="under_verification">Under Verification</option>
                <option value="rented">Rented</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Select: Property Type */}
          <div className="md:col-span-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Property Type
              </label>
              <select
                value={propertyTypeFilter}
                onChange={(e) => setPropertyTypeFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="Grade A">Grade-A Commercial</option>
                <option value="Warehouse">Warehouse Hub</option>
                <option value="Retail Center">Retail Center</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Select: Status / Filter Button */}
          <div className="md:col-span-2 flex items-center gap-2">
            <div className="relative flex-1 border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-5 cursor-pointer mt-0.5"
              >
                <option value="All">All</option>
                <option value="available">Available</option>
                <option value="under_verification">Under Verification</option>
                <option value="rented">Rented</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 bottom-2.5 pointer-events-none" />
            </div>

            <button
              onClick={() => {}}
              className="h-[44px] px-3.5 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#F5F8FC] text-[#102F57] font-semibold text-[13px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#6F87A5]" />
              <span className="hidden xl:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section Header: Title, Sort & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold text-[#102F57] tracking-tight">
          Properties ({sortedProperties.length})
        </h2>

        <div className="flex items-center gap-3">
          {/* Grid / List Switcher */}
          <div className="hidden md:flex items-center bg-white border border-[#DCE8F5] rounded-[10px] p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-[8px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors",
                viewMode === "list" ? "bg-[#0B2B57] text-white" : "text-[#6F87A5] hover:text-[#102F57]"
              )}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-[8px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors",
                viewMode === "grid" ? "bg-[#0B2B57] text-white" : "text-[#6F87A5] hover:text-[#102F57]"
              )}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-[13px] text-[#6F87A5]">
            <span>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-[36px] pl-3 pr-7 bg-white border border-[#DCE8F5] rounded-[10px] text-[13px] font-semibold text-[#102F57] appearance-none cursor-pointer outline-none hover:border-[#6F87A5]/40"
              >
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Area: Large to Small</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F87A5] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Properties List Rows / Grid Cards */}
      {viewMode === "list" ? (
        <div className="space-y-3.5">
          {sortedProperties.map((p) => {
            const monthlyRent = p.rentPerSqft * p.areaSqft;
            const photoCount = p.images?.length || 6;

            return (
              <div
                key={p.id}
                className="group relative bg-white rounded-[16px] border border-[#DCE8F5] p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#1769EB]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left side indicator bar */}
                <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#1769EB] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Left: Thumbnail & Info */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {/* Thumbnail (142x88) with "1/6" badge */}
                  <div className="relative w-[142px] h-[88px] rounded-[10px] overflow-hidden flex-shrink-0 bg-[#EAF3FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-[#0B2B57]/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>🖼</span>
                      <span>1/{photoCount}</span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <Link
                        href={`/properties/${p.id}`}
                        className="text-[16px] font-bold text-[#102F57] hover:text-[#1769EB] transition-colors line-clamp-1"
                      >
                        {p.title}
                      </Link>
                      <StatusPill value={p.status} variant="property_status" />
                    </div>

                    <p className="text-[12px] text-[#6F87A5] flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#6F87A5] flex-shrink-0" />
                      <span>{p.location || `${p.locality}, ${p.district}`}</span>
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-[#102F57] font-medium pt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[#6F87A5]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-[#102F57]">{p.landUse}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[#6F87A5]">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="text-[#102F57]">{p.areaSqft.toLocaleString()} sqft</span>
                      </span>
                      <span className="flex items-center gap-1 text-[#6F87A5]">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span className="text-[#102F57]">₹{p.rentPerSqft} /sqft/month</span>
                      </span>
                    </div>

                    <p className="text-[13px] text-[#6F87A5] line-clamp-1 max-w-2xl pt-0.5">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Right: Commercials & Action Trio */}
                <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0 pt-3 md:pt-0 border-t md:border-0 border-[#DCE8F5]">
                  <div className="text-left md:text-right">
                    <div className="text-[20px] font-bold text-[#102F57] tracking-tight">
                      {formatCurrencyINR(monthlyRent)}
                      <span className="text-[13px] font-normal text-[#6F87A5]"> / month</span>
                    </div>
                    <div className="mt-1 flex justify-start md:justify-end">
                      <StatusPill value={p.status} variant="property_status" />
                    </div>
                  </div>

                  {/* Action Trio: Eye, Pencil, Ellipsis */}
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/properties/${p.id}`}
                      className="w-10 h-10 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:border-[#1769EB]/30 text-[#102F57] hover:text-[#1769EB] flex items-center justify-center transition-all shadow-xs"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/properties/${p.id}/edit`}
                      className="w-10 h-10 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:border-[#1769EB]/30 text-[#102F57] hover:text-[#1769EB] flex items-center justify-center transition-all shadow-xs"
                      title="Edit Property"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => exportPropertyPresentation(p)}
                      className="w-10 h-10 rounded-[10px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:border-[#1769EB]/30 text-[#102F57] hover:text-[#1769EB] flex items-center justify-center transition-all shadow-xs"
                      title="More Options / Export PPT"
                    >
                      <EllipsisVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3D Flip Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedProperties.map((p) => {
            const isFlipped = !!flippedCards[p.id];
            const monthlyRent = p.rentPerSqft * p.areaSqft;

            return (
              <div
                key={p.id}
                className="flip h-[360px] relative group"
                data-flipped={isFlipped}
              >
                <div className="flip-inner w-full h-full">
                  {/* Front Face */}
                  <div className="flip-face flip-front bg-white border border-[#DCE8F5] rounded-[16px] overflow-hidden shadow-sm flex flex-col justify-between p-4">
                    <div>
                      <div className="relative h-[180px] rounded-[12px] overflow-hidden bg-[#EAF3FF]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <StatusPill value={p.status} variant="property_status" />
                        </div>
                        <div className="absolute bottom-2 left-2 bg-[#0B2B57]/80 text-white text-[11px] px-2 py-0.5 rounded-full">
                          🖼 1/{p.images.length}
                        </div>
                      </div>

                      <h3 className="text-[16px] font-bold text-[#102F57] mt-3 line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-[12px] text-[#6F87A5] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#6F87A5]" />
                        <span>{p.locality}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#DCE8F5]">
                      <div>
                        <div className="text-[18px] font-bold text-[#102F57]">
                          {formatCurrencyINR(monthlyRent)}
                        </div>
                        <div className="text-[11px] text-[#6F87A5]">₹{p.rentPerSqft}/sqft/mo</div>
                      </div>
                      <Link
                        href={`/properties/${p.id}`}
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#0B2B57] text-white text-[12px] font-semibold hover:bg-[#071D3F]"
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="flip-face flip-back bg-[#0B2B57] text-white border border-[#14376B] rounded-[16px] p-5 flex flex-col justify-between shadow-md">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-[#DCEBFF]">
                          Property Specifications
                        </span>
                        <StatusPill value={p.landUse} variant="property_type" />
                      </div>

                      <div className="space-y-2 mt-4 text-[13px]">
                        <div className="flex justify-between">
                          <span className="text-white/70">Carpet Area:</span>
                          <span className="font-bold">{p.areaSqft.toLocaleString()} sqft</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Deposit:</span>
                          <span className="font-bold">{p.securityDeposit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Lock-in Period:</span>
                          <span className="font-bold">{p.lockInPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Total Floors:</span>
                          <span className="font-bold">{p.totalFloors} Storeys</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <div className="flex gap-2">
                        <Link
                          href={`/properties/${p.id}`}
                          className="flex-1 py-2 text-center rounded-[8px] bg-[#1769EB] text-white text-[12px] font-semibold hover:bg-[#0F57CC]"
                        >
                          Full Details
                        </Link>
                        <button
                          onClick={() => exportPropertyPresentation(p)}
                          className="px-3 py-2 rounded-[8px] bg-white/10 text-white text-[12px] font-semibold hover:bg-white/20"
                        >
                          Export PPT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flip affordance button */}
                <button
                  onClick={(e) => toggleFlip(p.id, e)}
                  className="absolute right-3 top-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#102F57] flex items-center justify-center shadow-md md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                  title="Flip Card"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
