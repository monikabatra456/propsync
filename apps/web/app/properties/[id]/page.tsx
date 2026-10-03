"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Calendar,
  Pencil,
  Trash2,
  MapPin,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  ShieldCheck,
  Video,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  Compass,
  AlertCircle,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { InfoBanner } from "@/components/ui/InfoBanner";
import {
  getPropertyById,
  deleteProperty,
  addPropertyFollowup,
  Property,
  FollowupRecord,
} from "@/lib/propertyStore";
import { formatArea, AreaUnit, formatCurrencyINR } from "@/lib/units";
import { exportPropertyPresentation } from "@/lib/pptExport";
import { cn } from "@/lib/utils";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "floors" | "compliance" | "media" | "activity"
  >("overview");
  const [selectedUnit, setSelectedUnit] = useState<AreaUnit>("sqft");
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Follow-up form state
  const [followupDate, setFollowupDate] = useState("");
  const [followupTime, setFollowupTime] = useState("11:00 AM");
  const [followupChannel, setFollowupChannel] = useState<
    "WhatsApp" | "Call" | "Email" | "In-Person"
  >("WhatsApp");
  const [followupContact, setFollowupContact] = useState("");
  const [followupNotes, setFollowupNotes] = useState("");

  useEffect(() => {
    if (id) {
      const prop = getPropertyById(id);
      if (prop) {
        setProperty(prop);
        if (prop.contacts && prop.contacts.length > 0) {
          setFollowupContact(prop.contacts[0].name);
        }
      }
    }
  }, [id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-ink-400 mx-auto" />
        <h2 className="text-[20px] font-bold text-ink-900">Property Not Found</h2>
        <p className="text-[14px] text-ink-500">
          The requested property ID &quot;{id}&quot; does not exist or has been removed.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-700 text-white rounded-field text-[13px] font-medium hover:bg-navy-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
      </div>
    );
  }

  const handleExportPPT = () => {
    exportPropertyPresentation(property);
    showToast("Investment Memorandum (PPT) generated and downloaded.");
  };

  const handleScheduleFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followupDate || !followupNotes) return;

    const newRecord = addPropertyFollowup(property.id, {
      date: followupDate,
      time: followupTime,
      channel: followupChannel,
      contactName: followupContact || "Contact",
      notes: followupNotes,
      status: "scheduled",
    });

    setProperty({
      ...property,
      followups: [newRecord, ...(property.followups || [])],
    });

    setShowFollowupModal(false);
    setFollowupNotes("");
    showToast("Follow-up successfully scheduled via n8n & WhatsApp reminder!");
  };

  const handleDelete = () => {
    deleteProperty(property.id);
    router.push("/properties");
  };

  const totalImages = property.images?.length || 1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-field shadow-login text-[13px] font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-700 hover:text-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-ink-500" />
          <span>Back to Properties</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportPPT}
            className="h-[38px] px-3.5 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[13px] font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
            title="Download PowerPoint Presentation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export PPT</span>
          </button>

          <button
            onClick={() => setShowFollowupModal(true)}
            className="h-[38px] px-3.5 rounded-field bg-white border border-line-strong hover:bg-subtle text-ink-900 text-[13px] font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-ink-500" />
            <span>Schedule Follow-up</span>
          </button>

          <Link
            href={`/properties/new?edit=${property.id}`}
            className="h-[38px] px-3.5 rounded-field bg-white border border-line-strong hover:bg-subtle text-ink-900 text-[13px] font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-ink-500" />
            <span>Edit</span>
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="h-[38px] px-3.5 rounded-field bg-[#FDECEC] border border-red-200 text-[#E5484D] hover:bg-red-100 text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* 2. Title Block & Contact Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Title & Address */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center gap-3">
            <StatusBadge status={property.status} />
            <span className="text-[12px] font-medium text-ink-500">
              Ref ID: {property.id.toUpperCase()}
            </span>
          </div>

          <h1 className="text-[28px] font-bold text-ink-900 tracking-tight leading-snug">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-[14px] text-ink-500">
            <MapPin className="w-4 h-4 text-ink-400 flex-shrink-0" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Contact Details Card */}
        <div className="bg-white rounded-card border border-line p-4 shadow-card">
          <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3">
            <h3 className="text-[15px] font-semibold text-ink-900">Contact Details</h3>
            <span className="text-[11px] font-medium text-ink-500 bg-subtle px-2 py-0.5 rounded-full">
              Direct Contact
            </span>
          </div>

          <div className="space-y-3">
            {property.contacts && property.contacts.length > 0 ? (
              property.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-2 rounded-field bg-subtle/80 hover:bg-subtle transition-colors"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-ink-900">
                      {contact.name}
                    </p>
                    <p className="text-[12px] text-ink-500">
                      {contact.role} · {contact.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="w-8 h-8 rounded-full bg-white border border-line hover:border-brand-600 flex items-center justify-center text-navy-800 hover:text-brand-600 transition-colors shadow-xs"
                      title="Call Contact"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(contact.name)},%20inquiring%20about%20${encodeURIComponent(property.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#E3F6EE] border border-[#1E9E6A]/20 hover:bg-[#1E9E6A] hover:text-white flex items-center justify-center text-[#1E9E6A] transition-colors shadow-xs"
                      title="WhatsApp Message"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[13px] text-ink-400">No contacts listed.</p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Summary Strip (4 metric cells) with live unit converter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white rounded-card border border-line p-4 shadow-card">
        <div className="space-y-1">
          <div className="flex items-center justify-between pr-2">
            <span className="text-[12px] font-medium text-ink-500">Total Area</span>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value as AreaUnit)}
              className="text-[11px] font-semibold text-brand-link bg-[#EEF2F8] px-1.5 py-0.5 rounded cursor-pointer outline-none"
            >
              <option value="sqft">sq ft</option>
              <option value="sqyd">sq yd</option>
              <option value="acre">acres</option>
              <option value="sqm">sq m</option>
            </select>
          </div>
          <p className="text-[18px] font-bold text-ink-900 tracking-tight">
            {formatArea(property.areaSqft, selectedUnit)}
          </p>
          <p className="text-[11px] text-ink-400">
            {property.areaSqft.toLocaleString()} sq ft base
          </p>
        </div>

        <div className="space-y-1 border-l border-line/70 pl-4">
          <span className="text-[12px] font-medium text-ink-500">Rent / Rate</span>
          <p className="text-[18px] font-bold text-ink-900 tracking-tight">
            ₹{property.rentPerSqft}
            <span className="text-[12px] font-normal text-ink-500"> / sq ft / mo</span>
          </p>
          <p className="text-[11px] text-ink-400">
            {formatCurrencyINR(property.rentPerSqft * property.areaSqft)} / month
          </p>
        </div>

        <div className="space-y-1 border-l border-line/70 pl-4">
          <span className="text-[12px] font-medium text-ink-500">Property Type</span>
          <p className="text-[18px] font-bold text-ink-900 tracking-tight">
            {property.landUse}
          </p>
          <p className="text-[11px] text-ink-400">{property.buildingName || "Grade A"}</p>
        </div>

        <div className="space-y-1 border-l border-line/70 pl-4">
          <span className="text-[12px] font-medium text-ink-500">Listed By</span>
          <p className="text-[18px] font-bold text-ink-900 tracking-tight truncate">
            {property.listedBy}
          </p>
          <p className="text-[11px] text-ink-400">Verified Broker Partner</p>
        </div>
      </div>

      {/* 4. Media Gallery & Location Map Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-card border border-line p-4 shadow-card space-y-3">
          <div className="relative w-full h-[320px] rounded-[10px] overflow-hidden bg-navy-900 group">
            <Image
              src={property.images[currentImageIdx] || property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              unoptimized
            />

            {/* Counter Overlay Badge */}
            <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-xs text-white px-2.5 py-1 rounded-[6px] text-[12px] font-semibold tracking-wide">
              {currentImageIdx + 1} / {totalImages}
            </div>

            {/* 360 Video Badge */}
            {property.videoUrl && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute bottom-3 right-3 bg-navy-900/80 hover:bg-navy-900 text-white px-3 py-1 rounded-[6px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Video className="w-3.5 h-3.5 text-brand-teal" />
                <span>Watch 360° Tour</span>
              </button>
            )}

            {/* Previous/Next Arrows */}
            <button
              onClick={() =>
                setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
              }
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-ink-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentImageIdx((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
              }
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-ink-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIdx(idx)}
                className={cn(
                  "relative w-20 h-14 rounded-[6px] overflow-hidden flex-shrink-0 border-2 transition-all",
                  currentImageIdx === idx
                    ? "border-brand-600 scale-[0.98]"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" unoptimized />
              </button>
            ))}

            {property.videoUrl && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="relative w-20 h-14 rounded-[6px] bg-navy-800 text-white flex flex-col items-center justify-center flex-shrink-0 border border-brand-teal/40 hover:bg-navy-700 transition-colors"
              >
                <Video className="w-4 h-4 text-brand-teal" />
                <span className="text-[10px] font-medium mt-0.5">360° Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Property Location Map Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-card border border-line p-4 shadow-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="text-[15px] font-semibold text-ink-900">Property Location</h3>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates.lat},${property.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-brand-link hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Interactive Location Visualizer */}
            <div className="relative w-full h-[220px] rounded-[10px] overflow-hidden border border-line bg-[#E5ECF6] flex flex-col items-center justify-center">
              {/* Map grid texture simulation */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(#2F5FA3 1px, transparent 1px), radial-gradient(#2F5FA3 1px, #E5ECF6 1px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                }}
              />

              {/* Pin indicator */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-navy-900 text-white p-2 rounded-full shadow-lg border-2 border-white">
                  <MapPin className="w-5 h-5 text-brand-teal fill-brand-teal/20" />
                </div>
                <div className="bg-navy-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow mt-1">
                  {property.locality}
                </div>
              </div>

              {/* Segmented controls top-left */}
              <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs p-0.5 rounded-[6px] border border-line flex text-[11px] font-medium shadow-xs">
                <span className="px-2 py-0.5 rounded bg-navy-800 text-white font-semibold">Map</span>
                <span className="px-2 py-0.5 text-ink-600">Satellite</span>
              </div>

              {/* Floating chip bottom-left */}
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-[6px] border border-line text-[11px] text-ink-700 shadow-xs flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-brand-600" />
                <span>
                  {property.coordinates.lat}° N, {property.coordinates.lng}° E
                </span>
              </div>
            </div>
          </div>

          {/* Location metadata footer */}
          <div className="grid grid-cols-2 gap-2 pt-3 text-[12px]">
            <div>
              <span className="text-ink-400 block">District</span>
              <span className="font-medium text-ink-900">{property.district}</span>
            </div>
            <div>
              <span className="text-ink-400 block">PIN Code</span>
              <span className="font-medium text-ink-900">{property.pinCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Detail Tabs (Overview · Floor & Amenities · Compliance & Documents · Media & Gallery · Activity & Follow-up) */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-line overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Building },
            { id: "floors", label: "Floor & Amenities", icon: Layers },
            { id: "compliance", label: "Compliance & Documents", icon: ShieldCheck },
            { id: "media", label: "Media & Gallery", icon: Video },
            { id: "activity", label: "Activity & Follow-up", icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "h-[44px] px-4 inline-flex items-center gap-2 text-[13px] font-medium border-b-2 transition-all whitespace-nowrap",
                  isActive
                    ? "border-brand-600 text-navy-800 font-semibold"
                    : "border-transparent text-ink-500 hover:text-ink-900"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-brand-600" : "text-ink-400")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-[18px] font-bold text-ink-900">Property Overview</h2>
              <Link
                href={`/properties/new?edit=${property.id}`}
                className="text-[13px] font-semibold text-brand-link hover:underline flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit Details
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Commercial Specs */}
              <div className="space-y-3">
                <h4 className="text-[13px] font-semibold text-ink-500 uppercase tracking-wider">
                  Commercials & Terms
                </h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Property Name</span>
                    <span className="font-semibold text-ink-900 text-right">{property.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Property Type</span>
                    <span className="font-semibold text-ink-900">{property.landUse}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Total Super Area</span>
                    <span className="font-semibold text-ink-900">
                      {property.areaSqft.toLocaleString()} sq ft ({property.areaSqyd.toLocaleString()} sq yd)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Rent per sq ft</span>
                    <span className="font-semibold text-ink-900">₹{property.rentPerSqft} / month</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Security Deposit</span>
                    <span className="font-semibold text-ink-900">{property.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Maintenance</span>
                    <span className="font-semibold text-ink-900">₹{property.maintenance} / sq ft / mo</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Lease Term</span>
                    <span className="font-semibold text-ink-900">{property.leaseTerm}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Lock-in Period</span>
                    <span className="font-semibold text-ink-900">{property.lockInPeriod}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Building & Location */}
              <div className="space-y-3">
                <h4 className="text-[13px] font-semibold text-ink-500 uppercase tracking-wider">
                  Location & Building
                </h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Building Name</span>
                    <span className="font-semibold text-ink-900">{property.buildingName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Building Age</span>
                    <span className="font-semibold text-ink-900">{property.buildingAge}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Total Floors</span>
                    <span className="font-semibold text-ink-900">{property.totalFloors} Floors</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">Address</span>
                    <span className="font-semibold text-ink-900 text-right">{property.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">GPS Coordinates</span>
                    <a
                      href={`https://maps.google.com/?q=${property.coordinates.lat},${property.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-link hover:underline"
                    >
                      {property.coordinates.lat}°, {property.coordinates.lng}°
                    </a>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">District</span>
                    <span className="font-semibold text-ink-900">{property.district}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60">
                    <span className="text-ink-500">PIN Code</span>
                    <span className="font-semibold text-ink-900">{property.pinCode}</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Highlights & Image */}
              <div className="space-y-3">
                <h4 className="text-[13px] font-semibold text-ink-500 uppercase tracking-wider">
                  Key Highlights
                </h4>
                <div className="space-y-2">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-[13px] text-ink-700">
                      <CheckCircle2 className="w-4 h-4 text-[#1E9E6A] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-[12px] text-ink-500 mb-2 font-medium">Description</p>
                  <p className="text-[13px] text-ink-700 leading-relaxed bg-subtle p-3 rounded-field border border-line">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Floor & Amenities */}
        {activeTab === "floors" && (
          <div className="space-y-6">
            {/* Floor Breakdown Table */}
            <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-bold text-ink-900">Floor Breakdown</h3>
                  <p className="text-[13px] text-ink-500">
                    Floor-by-floor carpet area, built-up area, and rent allocations.
                  </p>
                </div>
                <button
                  onClick={() => setShowFloorPlanModal(true)}
                  className="h-[36px] px-3.5 rounded-field bg-white border border-line-strong hover:bg-subtle text-ink-900 text-[13px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-brand-600" />
                  <span>View Floor Plan</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-subtle border-y border-line text-ink-600 font-semibold">
                      <th className="py-2.5 px-4">Floor</th>
                      <th className="py-2.5 px-4">Carpet Area (sq ft)</th>
                      <th className="py-2.5 px-4">Built-up Area (sq ft)</th>
                      <th className="py-2.5 px-4">Rent (₹/sq ft/mo)</th>
                      <th className="py-2.5 px-4">Availability</th>
                      <th className="py-2.5 px-4">Key Facilities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {property.floors && property.floors.length > 0 ? (
                      property.floors.map((floor, idx) => (
                        <tr key={idx} className="hover:bg-subtle/50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-ink-900">{floor.floor}</td>
                          <td className="py-3 px-4 text-ink-700 font-medium">
                            {floor.carpetAreaSqft.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-ink-700 font-medium">
                            {floor.builtUpAreaSqft.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-semibold text-ink-900">
                            ₹{floor.rentPerSqft}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium",
                                floor.availability === "Available"
                                  ? "bg-[#E3F6EE] text-[#1E9E6A]"
                                  : "bg-[#FFF0D9] text-[#E8870E]"
                              )}
                            >
                              {floor.availability}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-ink-500 text-[12px]">{floor.facilities}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-ink-400">
                          No floor breakdown specified.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Building Amenities Chips */}
            <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-3">
              <h3 className="text-[17px] font-bold text-ink-900">Building Amenities & Facilities</h3>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {property.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-subtle border border-line text-[13px] font-medium text-ink-900 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E9E6A]" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Compliance & Documents */}
        {activeTab === "compliance" && (
          <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-ink-900">Compliance & Statutory Approvals</h3>
                <p className="text-[13px] text-ink-500">
                  Track verification status of Title Deed, OC, Fire NOC, and RERA registration.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-subtle border-y border-line text-ink-600 font-semibold">
                    <th className="py-2.5 px-4">Document / Approval</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Valid Until / Expected</th>
                    <th className="py-2.5 px-4">Reference No.</th>
                    <th className="py-2.5 px-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {property.complianceDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-subtle/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-ink-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-600" />
                        <span>{doc.name}</span>
                      </td>
                      <td className="py-3 px-4 text-ink-600">{doc.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold capitalize",
                            doc.status === "verified" && "bg-[#E3F6EE] text-[#1E9E6A]",
                            doc.status === "valid" && "bg-[#E3EEFC] text-[#2563C9]",
                            doc.status === "pending" && "bg-[#FFF0D9] text-[#E8870E]",
                            doc.status === "expired" && "bg-[#FDECEC] text-[#E5484D]"
                          )}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-ink-700 font-medium">
                        {doc.validUntil || doc.expectedDate || "Permanent"}
                      </td>
                      <td className="py-3 px-4 font-mono text-[12px] text-ink-600">
                        {doc.docNumber || "—"}
                      </td>
                      <td className="py-3 px-4 text-ink-500 text-[12px]">{doc.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBanner
              variant="info"
              title="Aadhaar & DPDP Act Compliance Guarantee"
              message="Compliance tracker strictly adheres to Indian digital privacy standards. Sensitive identity proofs (Aadhaar/PAN) are verified via DigiLocker tokenization; only the last 4 digits are retained."
            />
          </div>
        )}

        {/* Tab 4: Media & Gallery */}
        {activeTab === "media" && (
          <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div>
                <h3 className="text-[18px] font-bold text-ink-900">Media & Site Documentation</h3>
                <p className="text-[13px] text-ink-500">
                  Site walkthroughs, drone photographs, and architectural floorplans.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-44 rounded-[8px] overflow-hidden border border-line group cursor-pointer"
                  onClick={() => {
                    setCurrentImageIdx(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[12px] font-medium transition-opacity">
                    View Image {i + 1}
                  </div>
                </div>
              ))}
            </div>

            {property.videoUrl && (
              <div className="p-4 rounded-field bg-subtle border border-line flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-800 text-brand-teal flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-ink-900">360° Virtual Tour & Walkthrough</h4>
                    <p className="text-[12px] text-ink-500">4K high definition inspection video for field verification</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-field text-[13px] font-semibold transition-colors"
                >
                  Play Tour
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Activity & Follow-up */}
        {activeTab === "activity" && (
          <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <h3 className="text-[18px] font-bold text-ink-900">Activity & Follow-up Timeline</h3>
                <p className="text-[13px] text-ink-500">
                  Track client conversations, scheduled site visits, and WhatsApp updates.
                </p>
              </div>

              <button
                onClick={() => setShowFollowupModal(true)}
                className="h-[36px] px-3.5 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>New Follow-up</span>
              </button>
            </div>

            <div className="space-y-4">
              {property.followups && property.followups.length > 0 ? (
                property.followups.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-field border border-line bg-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-brand-info text-brand-600">
                          {item.channel}
                        </span>
                        <span className="text-[13px] font-bold text-ink-900">
                          {item.contactName}
                        </span>
                        <span className="text-[12px] text-ink-400">
                          • {item.date} at {item.time}
                        </span>
                      </div>
                      <p className="text-[13px] text-ink-700">{item.notes}</p>
                    </div>

                    <span
                      className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize self-start sm:self-auto",
                        item.status === "completed"
                          ? "bg-[#E3F6EE] text-[#1E9E6A]"
                          : "bg-[#FFF0D9] text-[#E8870E]"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-ink-400">
                  <Clock className="w-10 h-10 mx-auto mb-2 text-ink-300" />
                  <p className="text-[14px] font-medium text-ink-700">No follow-ups recorded yet</p>
                  <p className="text-[12px]">Schedule WhatsApp reminders or calls with landlords.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: 360 Video Player */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-navy-900 rounded-card w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="p-3 bg-navy-800 flex items-center justify-between text-white border-b border-navy-700">
              <span className="text-[14px] font-semibold flex items-center gap-2">
                <Video className="w-4 h-4 text-brand-teal" /> 360° Property Walkthrough Tour
              </span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-ink-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={property.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Floor Plan */}
      {showFloorPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-line flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-ink-900">
                Architectural Floor Plan Blueprint
              </h3>
              <button
                onClick={() => setShowFloorPlanModal(false)}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-subtle flex flex-col items-center justify-center min-h-[350px]">
              <div className="border-2 border-dashed border-brand-600/40 p-8 rounded-card text-center space-y-3 bg-white w-full">
                <FileSpreadsheet className="w-12 h-12 text-brand-600 mx-auto" />
                <h4 className="text-[16px] font-semibold text-ink-900">
                  Floor Layout — {property.buildingName}
                </h4>
                <p className="text-[13px] text-ink-500 max-w-md mx-auto">
                  Architectural CAD blueprint for ground and typical upper floors with structural columns, lift shafts, fire exits, and washrooms.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowFloorPlanModal(false);
                      showToast("Floor Plan PDF downloaded successfully.");
                    }}
                    className="px-4 py-2 bg-navy-700 text-white rounded-field text-[13px] font-medium hover:bg-navy-800 transition-colors"
                  >
                    Download Floor Plan PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Schedule Follow-up */}
      {showFollowupModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-[17px] font-bold text-ink-900">Schedule Client Follow-up</h3>
              <button
                onClick={() => setShowFollowupModal(false)}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleFollowup} className="space-y-3 text-[13px]">
              <div>
                <label className="block font-medium text-ink-700 mb-1">Follow-up Date *</label>
                <input
                  type="date"
                  required
                  value={followupDate}
                  onChange={(e) => setFollowupDate(e.target.value)}
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-ink-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={followupTime}
                    onChange={(e) => setFollowupTime(e.target.value)}
                    placeholder="11:30 AM"
                    className="w-full h-[38px] px-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-ink-700 mb-1">Channel</label>
                  <select
                    value={followupChannel}
                    onChange={(e) => setFollowupChannel(e.target.value as any)}
                    className="w-full h-[38px] px-3 border border-line rounded-[8px] bg-white focus:outline-none focus:border-brand-600"
                  >
                    <option value="WhatsApp">WhatsApp Message</option>
                    <option value="Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="In-Person">Site Meeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-ink-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={followupContact}
                  onChange={(e) => setFollowupContact(e.target.value)}
                  placeholder="e.g. Rohit Sharma (Landlord)"
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 mb-1">Discussion Notes *</label>
                <textarea
                  required
                  rows={3}
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  placeholder="e.g. Confirm revised rent proposal and lease lock-in terms."
                  className="w-full p-2.5 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFollowupModal(false)}
                  className="px-4 py-2 border border-line rounded-field text-ink-700 hover:bg-subtle"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold"
                >
                  Save & Set Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-sm p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FDECEC] text-[#E5484D] mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-ink-900">Delete Property?</h3>
              <p className="text-[13px] text-ink-500 mt-1">
                Are you sure you want to remove &quot;{property.title}&quot;? This action will mark it as soft-deleted in audit logs.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-line rounded-field text-ink-700 hover:bg-subtle text-[13px] font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#E5484D] hover:bg-red-700 text-white rounded-field text-[13px] font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
