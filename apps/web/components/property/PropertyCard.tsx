"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Building2,
  Layers,
  IndianRupee,
  Bookmark,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Edit,
  Share2,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export interface PropertyData {
  id: string;
  title: string;
  location: string;
  status: string;
  areaSqft: number;
  areaSqyd?: number;
  landUse: string;
  rentPerSqft: number;
  description: string;
  images: string[];
  isBookmarked?: boolean;
}

interface PropertyCardProps {
  property: PropertyData;
  onBookmarkToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSharePPT?: (id: string) => void;
}

export function PropertyCard({
  property,
  onBookmarkToggle,
  onEdit,
  onSharePPT,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(property.isBookmarked ?? false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ["/images/property-placeholder.jpg"];

  const sqyd = property.areaSqyd || Math.round(property.areaSqft / 9);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(property.id);
  };

  return (
    <div className="bg-white rounded-card border border-line p-4 shadow-card hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 lg:gap-5">
      {/* Image Carousel Tile */}
      <div className="relative w-full md:w-[185px] h-[167px] flex-shrink-0 rounded-[8px] overflow-hidden bg-slate-100 group">
        <Image
          src={images[currentImageIndex]}
          alt={property.title}
          fill
          className="object-cover select-none"
          sizes="185px"
          unoptimized
        />

        {/* Carousel indicators & arrows overlay */}
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px] pointer-events-auto">
            <button
              onClick={handlePrevImage}
              className="hover:text-brand-teal transition-colors p-0.5"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="tabular-nums">
              {currentImageIndex + 1}/{images.length}
            </span>
            <button
              onClick={handleNextImage}
              className="hover:text-brand-teal transition-colors p-0.5"
              aria-label="Next photo"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Details Column */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Header Row: Status Badge & Actions */}
          <div className="flex items-center justify-between mb-1.5">
            <StatusBadge status={property.status} />

            <div className="flex items-center gap-1 text-ink-500">
              <button
                onClick={handleBookmark}
                className={cn(
                  "p-1.5 rounded-md hover:bg-subtle transition-colors",
                  bookmarked ? "text-brand-600 fill-brand-600" : "text-ink-400 hover:text-ink-700"
                )}
                aria-label="Bookmark property"
              >
                <Bookmark className={cn("w-4 h-4", bookmarked && "fill-brand-600")} />
              </button>
              <button
                className="p-1.5 rounded-md text-ink-400 hover:text-ink-700 hover:bg-subtle transition-colors"
                aria-label="Property options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/properties/${property.id}`}
            className="text-[17px] font-semibold text-ink-900 hover:text-brand-600 transition-colors line-clamp-1 block leading-tight"
          >
            {property.title}
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1 text-[13px] text-ink-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-ink-400 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* 3-item Meta Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2.5 py-1 text-[13px] text-ink-700">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-ink-500 stroke-[1.8]" />
              <span className="font-semibold text-ink-900">{property.areaSqft.toLocaleString("en-IN")} sq ft</span>
              <span className="text-ink-500 text-[12px]">({sqyd.toLocaleString("en-IN")} sq yd)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-ink-500 stroke-[1.8]" />
              <div>
                <span className="font-medium text-ink-900">{property.landUse}</span>
                <span className="text-[11px] text-ink-500 ml-1">Land Use</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-ink-500 stroke-[1.8]" />
              <div>
                <span className="font-semibold text-ink-900">₹ {property.rentPerSqft}</span>
                <span className="text-ink-500 text-[12px]"> / sq ft / month</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-ink-500 line-clamp-1 mt-1.5 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-end gap-2.5 mt-3 pt-2 border-t border-line/60">
          <Link
            href={`/properties/${property.id}`}
            className="h-[34px] px-3.5 rounded-[8px] bg-navy-700 hover:bg-navy-800 text-white text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </Link>

          <button
            onClick={() => onEdit?.(property.id)}
            className="h-[34px] px-3 rounded-[8px] bg-white border border-line-strong hover:bg-subtle text-navy-800 text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-ink-500 stroke-[1.8]" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onSharePPT?.(property.id)}
            className="h-[34px] px-3 rounded-[8px] bg-white border border-line-strong hover:bg-subtle text-navy-800 text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-ink-500 stroke-[1.8]" />
            <span>Share PPT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
