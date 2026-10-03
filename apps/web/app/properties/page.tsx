"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  KeyRound,
  Handshake,
  Calendar,
  Plus,
  Search,
  List,
  Map as MapIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMapView } from "@/components/property/PropertyMapView";
import { getStoredProperties, Property } from "@/lib/propertyStore";
import { exportPropertyPresentation } from "@/lib/pptExport";
import { cn } from "@/lib/utils";

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [landUseFilter, setLandUseFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [rentFilter, setRentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setProperties(getStoredProperties());
  }, []);

  // Filter properties logic
  const filteredProperties = properties.filter((item) => {
    if (searchTerm) {
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase());
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

    if (rentFilter !== "All") {
      if (rentFilter === "Under ₹20" && item.rentPerSqft >= 20) return false;
      if (rentFilter === "₹20 - ₹100" && (item.rentPerSqft < 20 || item.rentPerSqft > 100)) return false;
      if (rentFilter === "Above ₹100" && item.rentPerSqft <= 100) return false;
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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProperties.length / itemsPerPage));
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Compute live stats
  const totalCount = properties.length;
  const availableCount = properties.filter((p) => p.status === "available").length;
  const underNegotiationCount = properties.filter((p) => p.status === "under_negotiation").length;
  const underVerificationCount = properties.filter((p) => p.status === "under_verification").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Greeting & Page Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[14px] text-ink-500 font-medium block leading-none">
            Good morning,
          </span>
          <h1 className="text-[26px] font-bold text-ink-900 tracking-tight mt-1 leading-tight">
            John Doe
          </h1>
          <p className="text-[14px] text-ink-500 mt-0.5">
            Here&apos;s your property overview and latest listings.
          </p>
        </div>

        <Link
          href="/properties/new"
          className="h-[44px] px-4 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* 2. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={Building2}
          label="Total Properties"
          value={totalCount}
          delta={{ value: "+3 new this week", isPositive: true }}
        />
        <StatCard
          icon={KeyRound}
          label="Available"
          value={availableCount}
          subtext={`${totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0}% of total`}
        />
        <StatCard
          icon={Handshake}
          label="Under Negotiation"
          value={underNegotiationCount}
          subtext={`${totalCount > 0 ? Math.round((underNegotiationCount / totalCount) * 100) : 0}% of total`}
        />
        <StatCard
          icon={Calendar}
          label="New This Week"
          value={underVerificationCount || 3}
          delta={{ value: "+12% from last week", isPositive: true }}
        />
      </div>

      {/* 3. Filter Card (Search + View Switcher + 3 Selects) */}
      <div className="bg-white rounded-card border border-line p-4 shadow-card space-y-3.5">
        {/* Top Row: Search Input + Segmented Control */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by locality, district or project..."
              className="w-full h-[36px] pl-9 pr-3 rounded-[8px] border border-line hover:border-line-strong focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-[13px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
            />
          </div>

          {/* Segmented Control: List View | Map View */}
          <div className="inline-flex items-center rounded-[8px] bg-[#EEF2F8] p-1 self-start md:self-auto border border-line/60">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "h-[30px] px-3.5 rounded-[6px] text-[13px] font-medium inline-flex items-center gap-1.5 transition-all select-none",
                viewMode === "list"
                  ? "bg-navy-800 text-white shadow-xs font-semibold"
                  : "text-ink-700 hover:text-navy-900"
              )}
            >
              <List className="w-3.5 h-3.5 stroke-[2]" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={cn(
                "h-[30px] px-3.5 rounded-[6px] text-[13px] font-medium inline-flex items-center gap-1.5 transition-all select-none",
                viewMode === "map"
                  ? "bg-navy-800 text-white shadow-xs font-semibold"
                  : "text-ink-700 hover:text-navy-900"
              )}
            >
              <MapIcon className="w-3.5 h-3.5 stroke-[2]" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* 3 Labelled Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-line/50">
          <div>
            <label className="block text-[12px] font-medium text-ink-500 mb-1">
              Land Use
            </label>
            <div className="relative">
              <select
                value={landUseFilter}
                onChange={(e) => setLandUseFilter(e.target.value)}
                className="w-full h-[36px] px-3 pr-8 rounded-[8px] border border-line bg-white text-[13px] text-ink-900 appearance-none focus:outline-none focus:border-brand-600 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
                <option value="Industrial">Industrial</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </select>
              <ChevronDown className="w-4 h-4 text-ink-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink-500 mb-1">
              Availability
            </label>
            <div className="relative">
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full h-[36px] px-3 pr-8 rounded-[8px] border border-line bg-white text-[13px] text-ink-900 appearance-none focus:outline-none focus:border-brand-600 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Under Verification">Under Verification</option>
                <option value="Under Negotiation">Under Negotiation</option>
                <option value="Rented">Rented</option>
              </select>
              <ChevronDown className="w-4 h-4 text-ink-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink-500 mb-1">
              Rent / Price Range
            </label>
            <div className="relative">
              <select
                value={rentFilter}
                onChange={(e) => setRentFilter(e.target.value)}
                className="w-full h-[36px] px-3 pr-8 rounded-[8px] border border-line bg-white text-[13px] text-ink-900 appearance-none focus:outline-none focus:border-brand-600 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Under ₹20">Under ₹20 / sq ft</option>
                <option value="₹20 - ₹100">₹20 - ₹100 / sq ft</option>
                <option value="Above ₹100">Above ₹100 / sq ft</option>
              </select>
              <ChevronDown className="w-4 h-4 text-ink-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Results Header Row */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-[20px] font-semibold text-ink-900 tracking-tight">
          Properties ({sortedProperties.length})
        </h2>

        <div className="flex items-center gap-1.5 text-[13px] text-ink-700">
          <span className="text-ink-500">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent pr-5 py-0.5 font-medium text-ink-900 cursor-pointer focus:outline-none"
            >
              <option value="Newest First">Newest First</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Area: Large to Small">Area: Large to Small</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-ink-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 5. List View OR Map View */}
      {viewMode === "list" ? (
        <div className="space-y-3.5">
          {paginatedProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onBookmarkToggle={(id) => console.log("Bookmark", id)}
              onEdit={(id) => router.push(`/properties/new?edit=${id}`)}
              onSharePPT={(id) => {
                const target = properties.find((p) => p.id === id);
                if (target) exportPropertyPresentation(target);
              }}
            />
          ))}

          {paginatedProperties.length === 0 && (
            <div className="bg-white rounded-card border border-line p-12 text-center text-ink-500">
              <p className="text-[15px] font-medium text-ink-700">No properties match your filters</p>
              <p className="text-[13px] text-ink-400 mt-1">Try resetting the search or filter options.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLandUseFilter("All");
                  setAvailabilityFilter("All");
                  setRentFilter("All");
                }}
                className="mt-4 px-4 py-2 text-[13px] font-medium text-brand-link hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <PropertyMapView properties={sortedProperties} />
      )}

      {/* 6. Pagination */}
      {viewMode === "list" && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 pb-6">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-[6px] border border-line bg-white flex items-center justify-center text-ink-500 hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-[6px] text-[13px] font-medium flex items-center justify-center transition-colors",
                    currentPage === pageNum
                      ? "bg-navy-900 text-white font-semibold"
                      : "bg-white border border-line text-ink-700 hover:bg-subtle"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-[6px] border border-line bg-white flex items-center justify-center text-ink-500 hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[13px] text-ink-500">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, sortedProperties.length)} of {sortedProperties.length} properties
          </span>
        </div>
      )}
    </div>
  );
}
