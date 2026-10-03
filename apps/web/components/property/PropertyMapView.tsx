"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, ArrowRight, IndianRupee } from "lucide-react";
import { Property } from "@/lib/propertyStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

interface PropertyMapViewProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export function PropertyMapView({ properties, onSelectProperty }: PropertyMapViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    properties[0] || null
  );
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const [zoomLevel, setZoomLevel] = useState(1);

  // Normalize map coordinates to relative positions inside the visual container
  const minLat = 19.0;
  const maxLat = 29.0;
  const minLng = 72.5;
  const maxLng = 78.0;

  return (
    <div className="relative w-full h-[620px] rounded-card border border-line overflow-hidden bg-[#E2EAF4] shadow-card flex flex-col">
      {/* Top Map Segmented Controls & Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="inline-flex rounded-[8px] bg-white/95 backdrop-blur-xs p-1 border border-line shadow-sm">
          <button
            onClick={() => setMapType("standard")}
            className={cn(
              "px-3 py-1 rounded-[6px] text-[12px] font-semibold transition-all",
              mapType === "standard"
                ? "bg-navy-800 text-white shadow-xs"
                : "text-ink-600 hover:text-navy-900"
            )}
          >
            Map
          </button>
          <button
            onClick={() => setMapType("satellite")}
            className={cn(
              "px-3 py-1 rounded-[6px] text-[12px] font-semibold transition-all",
              mapType === "satellite"
                ? "bg-navy-800 text-white shadow-xs"
                : "text-ink-600 hover:text-navy-900"
            )}
          >
            Satellite
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-[8px] border border-line text-[12px] text-ink-700 shadow-sm font-medium hidden sm:flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>{properties.length} Active Listings on Map</span>
        </div>
      </div>

      {/* Map Tools on Right */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
          className="w-9 h-9 rounded-[8px] bg-white border border-line text-ink-700 hover:text-navy-900 flex items-center justify-center shadow-sm transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="w-9 h-9 rounded-[8px] bg-white border border-line text-ink-700 hover:text-navy-900 flex items-center justify-center shadow-sm transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedProperty(properties[0] || null)}
          className="w-9 h-9 rounded-[8px] bg-white border border-line text-ink-700 hover:text-brand-600 flex items-center justify-center shadow-sm transition-colors"
          title="Reset View"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Map Graphic Canvas Simulation with Interactive Pins */}
      <div
        className={cn(
          "w-full h-full relative transition-all duration-300",
          mapType === "satellite" ? "bg-[#1E293B]" : "bg-[#EDF2F9]"
        )}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "center center",
        }}
      >
        {/* Geographic grid textures */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              mapType === "satellite"
                ? "radial-gradient(#38BDF8 1px, transparent 1px), radial-gradient(#38BDF8 1px, #1E293B 1px)"
                : "radial-gradient(#2F5FA3 1px, transparent 1px), radial-gradient(#2F5FA3 1px, #EDF2F9 1px)",
            backgroundSize: "36px 36px",
            backgroundPosition: "0 0, 18px 18px",
          }}
        />

        {/* Map Road network simulation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path
            d="M 50,300 Q 250,150 500,280 T 950,200"
            fill="none"
            stroke={mapType === "satellite" ? "#475569" : "#CBD5E1"}
            strokeWidth="8"
          />
          <path
            d="M 200,50 Q 300,350 450,550"
            fill="none"
            stroke={mapType === "satellite" ? "#475569" : "#CBD5E1"}
            strokeWidth="6"
          />
          <path
            d="M 100,500 C 400,450 600,100 850,450"
            fill="none"
            stroke={mapType === "satellite" ? "#334155" : "#E2E8F0"}
            strokeWidth="5"
          />
        </svg>

        {/* Interactive Property Pins */}
        {properties.map((prop, idx) => {
          // Spread pins organically based on index or coordinates
          const leftOffsets = [24, 62, 78, 38, 52, 70];
          const topOffsets = [38, 28, 65, 58, 44, 75];

          const left = `${leftOffsets[idx % leftOffsets.length]}%`;
          const top = `${topOffsets[idx % topOffsets.length]}%`;
          const isSelected = selectedProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              onClick={() => {
                setSelectedProperty(prop);
                onSelectProperty?.(prop);
              }}
              style={{ left, top }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            >
              <div
                className={cn(
                  "relative flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg transition-transform hover:scale-110",
                  isSelected
                    ? "bg-navy-900 text-white ring-4 ring-brand-teal/40 scale-110"
                    : "bg-white text-ink-900 border border-line hover:border-brand-600"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    prop.status === "available"
                      ? "bg-[#1E9E6A]"
                      : prop.status === "under_verification"
                      ? "bg-[#E8870E]"
                      : "bg-[#5B6B80]"
                  )}
                />
                <span className="text-[12px] font-bold tracking-tight">
                  ₹{prop.rentPerSqft}
                  <span className="text-[10px] font-normal opacity-75">/sqft</span>
                </span>
              </div>

              {/* Pin pointing caret */}
              <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-navy-900 mx-auto -mt-0.5 opacity-90" />
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Card: Selected Property Preview (Matching M2 specs) */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 sm:w-[420px] bg-white rounded-card border border-line p-3.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-3">
            <div className="relative w-28 h-24 rounded-[8px] overflow-hidden flex-shrink-0 bg-slate-100">
              <Image
                src={selectedProperty.images[0] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"}
                alt={selectedProperty.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <StatusBadge status={selectedProperty.status} />
                  <span className="text-[11px] font-semibold text-ink-500">
                    {selectedProperty.landUse}
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-ink-900 truncate">
                  {selectedProperty.title}
                </h4>
                <p className="text-[12px] text-ink-500 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-ink-400 flex-shrink-0" />
                  <span>{selectedProperty.location}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-line/60">
                <div className="text-[12px] font-bold text-ink-900">
                  ₹{selectedProperty.rentPerSqft}{" "}
                  <span className="text-[10px] font-normal text-ink-500">/ sq ft / mo</span>
                </div>

                <Link
                  href={`/properties/${selectedProperty.id}`}
                  className="px-3 py-1 bg-navy-700 hover:bg-navy-800 text-white rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Instructions Bottom-Left */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-[8px] border border-line text-[12px] text-ink-700 shadow-sm">
        <MapPin className="w-3.5 h-3.5 text-brand-600" />
        <span>Click any pin to inspect property specifications and open details.</span>
      </div>
    </div>
  );
}
