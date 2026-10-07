"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
  Plus,
  Compass,
  Building,
  Layers,
  IndianRupee,
  ShieldCheck,
  Video,
  FileText,
  X,
  Sparkles,
} from "lucide-react";
import { Stepper } from "@/components/ui/Stepper";
import { InfoBanner } from "@/components/ui/InfoBanner";
import {
  saveProperty,
  getPropertyById,
  Property,
  FloorDetail,
  ComplianceDoc,
  LandUseType,
  PropertyStatus,
} from "@/lib/propertyStore";
import { AreaUnit, convertArea, formatArea, formatCurrencyINR } from "@/lib/units";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

const STEPS = [
  { id: 1, label: "Address & Location" },
  { id: 2, label: "Building & Floors" },
  { id: 3, label: "Area & Commercials" },
  { id: 4, label: "Amenities & Compliance" },
  { id: 5, label: "Media Upload" },
];

export default function NewPropertyPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-ink-500">Loading form...</div>}>
      <NewPropertyForm />
    </React.Suspense>
  );
}

function NewPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [currentStep, setCurrentStep] = useState(1);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsFetched, setGpsFetched] = useState(true);

  // Step 1: Address & Location state
  const [propertyName, setPropertyName] = useState("");
  const [district, setDistrict] = useState("Noida (Gautam Buddha Nagar)");
  const [locality, setLocality] = useState("Sector 62");
  const [pinCode, setPinCode] = useState("201309");
  const [address, setAddress] = useState(
    "Plot No. B-9, Sector 62, Electronic City, Noida, Uttar Pradesh"
  );
  const [latitude, setLatitude] = useState(28.6139);
  const [longitude, setLongitude] = useState(77.209);
  const [accuracy, setAccuracy] = useState(5);
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
  ]);

  // Step 2: Building & Floors
  const [buildingName, setBuildingName] = useState("");
  const [buildingAge, setBuildingAge] = useState("3 Years");
  const [totalFloors, setTotalFloors] = useState(4);
  const [totalLifts, setTotalLifts] = useState(4);
  const [parkingSlots, setParkingSlots] = useState(30);
  const [floorsList, setFloorsList] = useState<FloorDetail[]>([
    {
      floor: "Ground Floor",
      carpetAreaSqft: 1200,
      builtUpAreaSqft: 1500,
      rentPerSqft: 22,
      availability: "Available",
      facilities: "Reception, Cafeteria, Lobby",
    },
    {
      floor: "1st Floor",
      carpetAreaSqft: 1200,
      builtUpAreaSqft: 1500,
      rentPerSqft: 20,
      availability: "Available",
      facilities: "Fitted Workstations, Conference Room",
    },
  ]);

  // Step 3: Area & Commercials
  const [totalAreaSqft, setTotalAreaSqft] = useState(3000);
  const [unitMode, setUnitMode] = useState<AreaUnit>("sqft");
  const [landUse, setLandUse] = useState<LandUseType>("Office");
  const [rentPerSqft, setRentPerSqft] = useState(20);
  const [securityDeposit, setSecurityDeposit] = useState("3 Months");
  const [maintenance, setMaintenance] = useState(2);
  const [leaseTerm, setLeaseTerm] = useState("3+ Years Negotiable");
  const [lockInPeriod, setLockInPeriod] = useState("1 Year");
  const [status, setStatus] = useState<PropertyStatus>("available");
  const [landlordName, setLandlordName] = useState("Rohit Sharma");
  const [landlordPhone, setLandlordPhone] = useState("+91 98765 43210");
  const [landlordEmail, setLandlordEmail] = useState("rohit.sharma@example.com");
  const [brokerName, setBrokerName] = useState("Neha Verma");
  const [brokerPhone, setBrokerPhone] = useState("+91 91234 56789");

  // Step 4: Amenities & Compliance
  const [amenities, setAmenities] = useState<string[]>([
    "High-Speed Lifts",
    "100% DG Power Backup",
    "Multi-Level Parking",
    "24/7 CCTV & Security",
    "Central HVAC / AC",
    "High-Speed Fiber WiFi",
    "Fire NOC / Sprinklers",
  ]);
  const [complianceDocs, setComplianceDocs] = useState<ComplianceDoc[]>([
    {
      id: "doc-1",
      name: "Title Deed Verification",
      type: "Ownership",
      status: "verified",
      remarks: "Clear ownership verified.",
      docNumber: "TD-2024-88",
    },
    {
      id: "doc-2",
      name: "Building Plan Approval (OC)",
      type: "Municipal",
      status: "verified",
      remarks: "Occupancy Certificate approved.",
      docNumber: "OC-2024-11",
    },
    {
      id: "doc-3",
      name: "Fire Safety Certificate (NOC)",
      type: "Safety",
      status: "valid",
      validUntil: "Dec 2026",
      remarks: "Fire clearance valid.",
      docNumber: "FS-2024-90",
    },
    {
      id: "doc-4",
      name: "RERA Registration",
      type: "Regulatory",
      status: "valid",
      validUntil: "Mar 2029",
      remarks: "RERA registered.",
      docNumber: "RERA-2024-33",
    },
  ]);

  // Step 5: Media Upload
  const [videoUrl, setVideoUrl] = useState(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  );
  const [description, setDescription] = useState(
    "Premium commercial listing with modern infrastructure, high connectivity, and ready-to-move office layouts."
  );

  // Load existing property if in Edit mode
  useEffect(() => {
    if (editId) {
      const existing = getPropertyById(editId);
      if (existing) {
        setPropertyName(existing.title);
        setDistrict(existing.district);
        setLocality(existing.locality);
        setPinCode(existing.pinCode);
        setAddress(existing.location);
        setLatitude(existing.coordinates.lat);
        setLongitude(existing.coordinates.lng);
        setPhotos(existing.images);
        setBuildingName(existing.buildingName);
        setBuildingAge(existing.buildingAge);
        setTotalFloors(existing.totalFloors);
        setFloorsList(existing.floors || []);
        setTotalAreaSqft(existing.areaSqft);
        setLandUse(existing.landUse);
        setRentPerSqft(existing.rentPerSqft);
        setSecurityDeposit(existing.securityDeposit);
        setMaintenance(existing.maintenance);
        setLeaseTerm(existing.leaseTerm);
        setLockInPeriod(existing.lockInPeriod);
        setStatus(existing.status);
        setAmenities(existing.amenities || []);
        setComplianceDocs(existing.complianceDocs || []);
        setDescription(existing.description);
        if (existing.contacts?.[0]) {
          setLandlordName(existing.contacts[0].name);
          setLandlordPhone(existing.contacts[0].phone);
        }
        if (existing.contacts?.[1]) {
          setBrokerName(existing.contacts[1].name);
          setBrokerPhone(existing.contacts[1].phone);
        }
      }
    }
  }, [editId]);

  // Handle GPS Auto-fetch
  const handleFetchGPS = () => {
    setGpsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(4)));
          setLongitude(Number(pos.coords.longitude.toFixed(4)));
          setAccuracy(Math.round(pos.coords.accuracy) || 5);
          setGpsFetched(true);
          setGpsLoading(false);
        },
        (err) => {
          console.warn("GPS access denied, using simulated coordinates", err);
          setLatitude(28.6139);
          setLongitude(77.209);
          setGpsFetched(true);
          setGpsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGpsLoading(false);
    }
  };

  // Photo upload trigger
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotos((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Floor helper
  const handleAddFloor = () => {
    const floorNumber = floorsList.length + 1;
    const newFloor: FloorDetail = {
      floor: `${floorNumber}${floorNumber === 2 ? "nd" : floorNumber === 3 ? "rd" : "th"} Floor`,
      carpetAreaSqft: 1000,
      builtUpAreaSqft: 1250,
      rentPerSqft: rentPerSqft,
      availability: "Available",
      facilities: "Fitted Workstations, Washroom",
    };
    setFloorsList([...floorsList, newFloor]);
  };

  // Toggle Amenity
  const toggleAmenity = (name: string) => {
    if (amenities.includes(name)) {
      setAmenities(amenities.filter((a) => a !== name));
    } else {
      setAmenities([...amenities, name]);
    }
  };

  // Submit Handler
  const handleSubmit = () => {
    const newPropertyId = editId || `prop-${Date.now()}`;
    const newProp: Property = {
      id: newPropertyId,
      title: propertyName || "Commercial Office Tower",
      location: address || `${locality}, ${district} ${pinCode}`,
      locality: locality || "Sector 62",
      district: district || "Noida",
      pinCode: pinCode || "201309",
      coordinates: { lat: latitude, lng: longitude },
      accuracy: accuracy,
      source: "Browser GPS",
      status: status,
      areaSqft: totalAreaSqft,
      areaSqyd: Math.round(totalAreaSqft / 9),
      landUse: landUse,
      rentPerSqft: rentPerSqft,
      securityDeposit: securityDeposit,
      maintenance: maintenance,
      leaseTerm: leaseTerm,
      lockInPeriod: lockInPeriod,
      buildingName: buildingName || "Apex Tower",
      buildingAge: buildingAge,
      totalFloors: totalFloors,
      listedBy: brokerName ? `${brokerName} (Broker)` : "S. R. Properties",
      description: description,
      images: photos.length > 0 ? photos : [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      ],
      videoUrl: videoUrl,
      has360Tour: true,
      highlights: [
        "100% DG Power Backup & Uninterrupted Power Supply",
        "Grade-A Commercial Building with High Visibility",
        "Dedicated Multi-Level Basement Parking",
        "24/7 Security, Access Control, and CCTV Surveillance",
      ],
      floors: floorsList,
      amenities: amenities,
      complianceDocs: complianceDocs,
      contacts: [
        { id: "c-1", name: landlordName, role: "Landlord", phone: landlordPhone, email: landlordEmail },
        { id: "c-2", name: brokerName, role: "Broker", phone: brokerPhone },
      ],
      followups: [],
      createdAt: new Date().toISOString(),
    };

    saveProperty(newProp);
    router.push(`/properties/${newProp.id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Row */}
      <div className="relative flex items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-3">
          <Link
            href="/properties"
            className="p-2 rounded-field border border-line bg-white hover:bg-subtle text-ink-700 transition-colors"
            aria-label="Back to properties"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">
              {editId ? "Edit Property" : "Add New Property"}
            </h1>
            <p className="text-[13px] text-ink-500">
              Field data collection: GPS location, specifications, floor layout, and compliance proofs.
            </p>
          </div>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-card border border-line p-6 shadow-card space-y-6">
        {/* Stepper Header (Steps 1–5) */}
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={(s) => setCurrentStep(s)}
        />

        <div className="border-t border-line pt-6">
          {/* ========================================================================= */}
          {/* STEP 1: Address & Location (M3 Pixel-Match) */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-brand-info flex items-center justify-center text-brand-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink-900">
                    1. Address & Location
                  </h3>
                  <p className="text-[13px] text-ink-500">
                    Confirm site coordinates via phone/browser GPS and specify administrative boundary.
                  </p>
                </div>
              </div>

              {/* GPS Strip (matching M3 mockup) */}
              <div className="bg-brand-info/70 border border-brand-600/20 rounded-[10px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center">
                    <Compass className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-ink-900">
                        Current GPS Location
                      </span>
                      {gpsFetched && (
                        <span className="bg-[#E3F6EE] text-[#1E9E6A] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Auto-fetched
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-ink-600 font-mono mt-0.5">
                      {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E (±{accuracy}m accuracy)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFetchGPS}
                  disabled={gpsLoading}
                  className="px-3.5 py-2 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[12px] font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{gpsLoading ? "Fetching GPS..." : "Use Current Location"}</span>
                </button>
              </div>

              {/* Two Columns: Fields Left (340px) vs Map Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-ink-700 mb-1">
                      Property Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      placeholder="e.g. Premium Office Space – Sector 62"
                      className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-medium text-ink-700 mb-1">
                        District *
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full h-[40px] px-3 rounded-[8px] border border-line bg-white text-[13px] text-ink-900 focus:outline-none focus:border-brand-600"
                      >
                        <option value="Noida (Gautam Buddha Nagar)">Noida</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Thane">Thane</option>
                        <option value="Bengaluru Urban">Bengaluru Urban</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-ink-700 mb-1">
                        Locality / Area *
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Sector 62"
                        className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-600"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-ink-700 mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="201309"
                      className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[13px] font-medium text-ink-700">
                        Address (Auto-filled from location)
                      </label>
                      <Pencil className="w-3.5 h-3.5 text-ink-400" />
                    </div>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 rounded-[8px] border border-line text-[13px] text-ink-900 focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                {/* Right: Map Pin Picker Card */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="relative w-full h-[292px] rounded-[10px] overflow-hidden border border-line bg-[#E2EAF4] flex items-center justify-center shadow-xs">
                    {/* Simulated Map Grid */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "radial-gradient(#2F5FA3 1px, transparent 1px), radial-gradient(#2F5FA3 1px, #E2EAF4 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Draggable pin */}
                    <div className="relative z-10 flex flex-col items-center cursor-grab active:cursor-grabbing">
                      <div className="bg-navy-900 text-white p-2.5 rounded-full shadow-xl border-2 border-white animate-bounce">
                        <MapPin className="w-6 h-6 text-brand-teal fill-brand-teal/20" />
                      </div>
                      <span className="bg-navy-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow mt-1">
                        {locality || "Pin Location"}
                      </span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-[6px] border border-line text-[11px] font-semibold text-navy-800">
                      Map View
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-[6px] border border-line text-[11px] text-ink-700 flex items-center gap-1.5 shadow-xs">
                      <span>Drag the pin to adjust location</span>
                    </div>
                  </div>

                  {/* 4 Quick Location Details mini-tiles */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-subtle rounded-[6px] border border-line text-center">
                      <span className="text-[10px] text-ink-400 block uppercase">Latitude</span>
                      <span className="text-[12px] font-mono font-bold text-ink-900">
                        {latitude.toFixed(4)}°
                      </span>
                    </div>
                    <div className="p-2 bg-subtle rounded-[6px] border border-line text-center">
                      <span className="text-[10px] text-ink-400 block uppercase">Longitude</span>
                      <span className="text-[12px] font-mono font-bold text-ink-900">
                        {longitude.toFixed(4)}°
                      </span>
                    </div>
                    <div className="p-2 bg-subtle rounded-[6px] border border-line text-center">
                      <span className="text-[10px] text-ink-400 block uppercase">Accuracy</span>
                      <span className="text-[12px] font-mono font-bold text-ink-900">
                        ±{accuracy} m
                      </span>
                    </div>
                    <div className="p-2 bg-subtle rounded-[6px] border border-line text-center">
                      <span className="text-[10px] text-ink-400 block uppercase">Source</span>
                      <span className="text-[12px] font-bold text-[#1E9E6A]">GPS Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos Card & Camera Dropzone */}
              <div className="border border-line rounded-[10px] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-ink-900">Site Photos & Verification</h4>
                    <p className="text-[12px] text-ink-500">
                      Capture current site photos for inspection verification.
                    </p>
                  </div>

                  {/* Camera file input with mobile camera environment capture */}
                  <label className="h-[36px] px-3.5 bg-navy-700 hover:bg-navy-800 text-white rounded-field text-[12px] font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs transition-colors">
                    <Camera className="w-4 h-4" />
                    <span>Take Photo / Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Thumbnails + Add Tile */}
                  <div className="md:col-span-8 flex flex-wrap items-center gap-3">
                    {photos.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative w-[180px] h-[130px] rounded-[8px] overflow-hidden border border-line bg-slate-100 group"
                      >
                        <Image src={src} alt="Upload" fill className="object-cover" unoptimized />
                        {idx === 0 && (
                          <div className="absolute top-2 left-2 bg-[#1E9E6A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                            Main Image
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <label className="w-[180px] h-[130px] rounded-[8px] border-2 border-dashed border-line-strong hover:border-brand-600 bg-subtle flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors">
                      <Camera className="w-7 h-7 text-ink-400" />
                      <span className="text-[12px] font-semibold text-ink-700">Add Photos</span>
                      <span className="text-[10px] text-ink-400">Tap to capture or upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Tips box */}
                  <div className="md:col-span-4 bg-brand-info/60 border border-brand-600/20 rounded-[8px] p-3.5 text-[12px] space-y-1.5">
                    <p className="font-bold text-ink-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Tips for better photos
                    </p>
                    <ul className="text-ink-600 space-y-1 list-disc list-inside">
                      <li>Capture the building elevation in bright daylight</li>
                      <li>Include road entrance, approach road, and lobby</li>
                      <li>Upload at least 2 clear wide-angle pictures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <InfoBanner
                variant="success"
                title="Location & address will be verified during review"
                message="Geotagged site data will be matched against municipal records. You can make adjustments before submitting."
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: Building & Floors */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-brand-info flex items-center justify-center text-brand-600">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink-900">2. Building & Floors</h3>
                  <p className="text-[13px] text-ink-500">
                    Specify building name, age, lift configurations, and floor-by-floor breakdown.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Building Name
                  </label>
                  <input
                    type="text"
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    placeholder="e.g. Apex Corporate Tower"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Building Age
                  </label>
                  <input
                    type="text"
                    value={buildingAge}
                    onChange={(e) => setBuildingAge(e.target.value)}
                    placeholder="e.g. 3 Years"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Total Passenger Lifts
                  </label>
                  <input
                    type="number"
                    value={totalLifts}
                    onChange={(e) => setTotalLifts(Number(e.target.value))}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Parking Slots (Basement/Open)
                  </label>
                  <input
                    type="number"
                    value={parkingSlots}
                    onChange={(e) => setParkingSlots(Number(e.target.value))}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>
              </div>

              {/* Floor Breakdown Table */}
              <div className="border border-line rounded-[10px] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-bold text-ink-900">Floor Layout & Area Allocation</h4>
                  <button
                    type="button"
                    onClick={handleAddFloor}
                    className="h-[34px] px-3 bg-navy-700 hover:bg-navy-800 text-white rounded-field text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Floor
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="bg-subtle border-y border-line text-ink-600 font-semibold">
                        <th className="py-2.5 px-3">Floor Level</th>
                        <th className="py-2.5 px-3">Carpet Area (sq ft)</th>
                        <th className="py-2.5 px-3">Built-up Area (sq ft)</th>
                        <th className="py-2.5 px-3">Rent (₹/sqft)</th>
                        <th className="py-2.5 px-3">Key Facilities</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {floorsList.map((f, i) => (
                        <tr key={i}>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={f.floor}
                              onChange={(e) => {
                                const copy = [...floorsList];
                                copy[i].floor = e.target.value;
                                setFloorsList(copy);
                              }}
                              className="h-[32px] px-2 rounded border border-line text-[12px] font-semibold w-28"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              value={f.carpetAreaSqft}
                              onChange={(e) => {
                                const copy = [...floorsList];
                                copy[i].carpetAreaSqft = Number(e.target.value);
                                setFloorsList(copy);
                              }}
                              className="h-[32px] px-2 rounded border border-line text-[12px] w-28"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              value={f.builtUpAreaSqft}
                              onChange={(e) => {
                                const copy = [...floorsList];
                                copy[i].builtUpAreaSqft = Number(e.target.value);
                                setFloorsList(copy);
                              }}
                              className="h-[32px] px-2 rounded border border-line text-[12px] w-28"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              value={f.rentPerSqft}
                              onChange={(e) => {
                                const copy = [...floorsList];
                                copy[i].rentPerSqft = Number(e.target.value);
                                setFloorsList(copy);
                              }}
                              className="h-[32px] px-2 rounded border border-line text-[12px] w-20"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={f.facilities}
                              onChange={(e) => {
                                const copy = [...floorsList];
                                copy[i].facilities = e.target.value;
                                setFloorsList(copy);
                              }}
                              className="h-[32px] px-2 rounded border border-line text-[12px] w-full"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <button
                              type="button"
                              onClick={() => setFloorsList(floorsList.filter((_, idx) => idx !== i))}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: Area & Commercials */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-brand-info flex items-center justify-center text-brand-600">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink-900">3. Area & Commercials</h3>
                  <p className="text-[13px] text-ink-500">
                    Pricing terms, security deposit, maintenance, and landlord/broker contacts.
                  </p>
                </div>
              </div>

              {/* Area & Unit Toggle */}
              <div className="p-4 rounded-field bg-subtle border border-line grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Total Area *
                  </label>
                  <input
                    type="number"
                    value={totalAreaSqft}
                    onChange={(e) => setTotalAreaSqft(Number(e.target.value))}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line bg-white text-[14px] font-bold text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Area Unit Display Toggle
                  </label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-[8px] border border-line">
                    {(["sqft", "sqyd", "acre", "sqm"] as AreaUnit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnitMode(u)}
                        className={cn(
                          "px-2.5 py-1 text-[12px] font-semibold rounded-[6px] transition-colors flex-1",
                          unitMode === u ? "bg-navy-800 text-white" : "text-ink-600 hover:bg-subtle"
                        )}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[12px] text-ink-500 block">Converted Equivalent</span>
                  <span className="text-[16px] font-bold text-brand-600">
                    {formatArea(totalAreaSqft, unitMode)}
                  </span>
                </div>
              </div>

              {/* Commercial Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Land Use Classification
                  </label>
                  <select
                    value={landUse}
                    onChange={(e) => setLandUse(e.target.value as LandUseType)}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line bg-white text-[13px] text-ink-900"
                  >
                    <option value="Office">Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Rent (₹ / sq ft / month) *
                  </label>
                  <input
                    type="number"
                    value={rentPerSqft}
                    onChange={(e) => setRentPerSqft(Number(e.target.value))}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Security Deposit
                  </label>
                  <input
                    type="text"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    placeholder="e.g. 3 Months"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Maintenance (₹ / sq ft / month)
                  </label>
                  <input
                    type="number"
                    value={maintenance}
                    onChange={(e) => setMaintenance(Number(e.target.value))}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Lease Term
                  </label>
                  <input
                    type="text"
                    value={leaseTerm}
                    onChange={(e) => setLeaseTerm(e.target.value)}
                    placeholder="e.g. 3+ Years Negotiable"
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line text-[13px] text-ink-900"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-ink-700 mb-1">
                    Availability Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                    className="w-full h-[40px] px-3 rounded-[8px] border border-line bg-white text-[13px] text-ink-900"
                  >
                    <option value="available">Available</option>
                    <option value="under_verification">Under Verification</option>
                    <option value="under_negotiation">Under Negotiation</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>

              {/* Contacts */}
              <div className="border border-line rounded-[10px] p-4 space-y-4">
                <h4 className="text-[15px] font-bold text-ink-900">Stakeholder Contacts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-subtle rounded-[8px] border border-line">
                    <span className="text-[12px] font-bold text-navy-800 uppercase">
                      Landlord / Owner
                    </span>
                    <input
                      type="text"
                      value={landlordName}
                      onChange={(e) => setLandlordName(e.target.value)}
                      placeholder="Landlord Name"
                      className="w-full h-[36px] px-2.5 rounded border border-line text-[13px]"
                    />
                    <input
                      type="text"
                      value={landlordPhone}
                      onChange={(e) => setLandlordPhone(e.target.value)}
                      placeholder="Phone (+91)"
                      className="w-full h-[36px] px-2.5 rounded border border-line text-[13px]"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-subtle rounded-[8px] border border-line">
                    <span className="text-[12px] font-bold text-navy-800 uppercase">
                      Assigned Broker / Agent
                    </span>
                    <input
                      type="text"
                      value={brokerName}
                      onChange={(e) => setBrokerName(e.target.value)}
                      placeholder="Broker Name"
                      className="w-full h-[36px] px-2.5 rounded border border-line text-[13px]"
                    />
                    <input
                      type="text"
                      value={brokerPhone}
                      onChange={(e) => setBrokerPhone(e.target.value)}
                      placeholder="Phone (+91)"
                      className="w-full h-[36px] px-2.5 rounded border border-line text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: Amenities & Compliance */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-brand-info flex items-center justify-center text-brand-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink-900">
                    4. Amenities & Statutory Compliance
                  </h3>
                  <p className="text-[13px] text-ink-500">
                    Select facility infrastructure and register document legal proofs (Title, OC, Fire NOC).
                  </p>
                </div>
              </div>

              {/* Amenities multi-select */}
              <div className="space-y-2">
                <label className="block text-[13px] font-bold text-ink-900">
                  Building Amenities (Multi-select)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "High-Speed Lifts",
                    "100% DG Power Backup",
                    "Multi-Level Parking",
                    "24/7 CCTV & Security",
                    "Central HVAC / AC",
                    "High-Speed Fiber WiFi",
                    "Fire NOC / Sprinklers",
                    "ETP / Waste Management",
                    "Cafeteria",
                    "EV Charging Stations",
                  ].map((amenity) => {
                    const isSelected = amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all flex items-center gap-1.5",
                          isSelected
                            ? "bg-navy-800 text-white border-navy-800 shadow-xs"
                            : "bg-white text-ink-700 border-line hover:border-brand-600"
                        )}
                      >
                        <CheckCircle2
                          className={cn("w-3.5 h-3.5", isSelected ? "text-brand-teal" : "opacity-30")}
                        />
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Tracker */}
              <div className="border border-line rounded-[10px] p-4 space-y-3">
                <h4 className="text-[15px] font-bold text-ink-900">
                  Statutory Document & Approval Status
                </h4>
                <div className="space-y-3">
                  {complianceDocs.map((doc, i) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-subtle rounded-[8px] border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-ink-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-600" />
                          {doc.name}
                        </span>
                        <p className="text-[12px] text-ink-500">{doc.remarks}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={doc.status}
                          onChange={(e) => {
                            const copy = [...complianceDocs];
                            copy[i].status = e.target.value as any;
                            setComplianceDocs(copy);
                          }}
                          className="h-[34px] px-2.5 rounded border border-line bg-white text-[12px] font-semibold"
                        >
                          <option value="verified">Verified</option>
                          <option value="valid">Valid</option>
                          <option value="pending">Pending</option>
                          <option value="expired">Expired</option>
                        </select>
                        <input
                          type="text"
                          value={doc.docNumber || ""}
                          onChange={(e) => {
                            const copy = [...complianceDocs];
                            copy[i].docNumber = e.target.value;
                            setComplianceDocs(copy);
                          }}
                          placeholder="Ref / Doc No."
                          className="h-[34px] px-2.5 rounded border border-line text-[12px] w-32"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <InfoBanner
                variant="info"
                title="Aadhaar Masking Policy"
                message="We store only last 4 digits / DigiLocker status as per DPDP policy guidelines."
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: Media Upload & Review */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-brand-info flex items-center justify-center text-brand-600">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-ink-900">5. Media Upload & Final Review</h3>
                  <p className="text-[13px] text-ink-500">
                    Verify entered data, add 360° virtual tour link, and publish the listing.
                  </p>
                </div>
              </div>

              {/* 360 Tour & Video link */}
              <div className="p-4 bg-subtle rounded-field border border-line space-y-2">
                <label className="block text-[13px] font-bold text-ink-900 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-brand-600" /> 360° Virtual Tour / Video URL
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-[40px] px-3 rounded-[8px] border border-line bg-white text-[13px]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] font-medium text-ink-700 mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-[8px] border border-line text-[13px] text-ink-900"
                />
              </div>

              {/* Review Summary Card */}
              <div className="border border-line rounded-[10px] p-5 space-y-4 bg-white shadow-xs">
                <h4 className="text-[16px] font-bold text-ink-900 border-b border-line pb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1E9E6A]" /> Summary Preview
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
                  <div>
                    <span className="text-ink-400 block text-[11px]">PROPERTY NAME</span>
                    <span className="font-semibold text-ink-900">{propertyName || "Commercial Space"}</span>
                  </div>
                  <div>
                    <span className="text-ink-400 block text-[11px]">LOCATION</span>
                    <span className="font-semibold text-ink-900">{locality}, {district}</span>
                  </div>
                  <div>
                    <span className="text-ink-400 block text-[11px]">SUPER AREA</span>
                    <span className="font-semibold text-ink-900">{totalAreaSqft.toLocaleString()} sq ft</span>
                  </div>
                  <div>
                    <span className="text-ink-400 block text-[11px]">RENT PER SQFT</span>
                    <span className="font-semibold text-ink-900">₹{rentPerSqft} / mo</span>
                  </div>
                </div>

                <div className="pt-2 text-[12px] text-ink-500">
                  {photos.length} photos ready for verification • {floorsList.length} floors configured • {amenities.length} amenities selected • {complianceDocs.length} statutory records.
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Action Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-line mt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="h-[40px] px-4 rounded-field border border-line bg-white hover:bg-subtle text-ink-700 text-[13px] font-semibold transition-colors"
              >
                Previous Step
              </button>
            ) : (
              <Link
                href="/properties"
                className="h-[40px] px-4 rounded-field border border-line bg-white hover:bg-subtle text-ink-500 text-[13px] font-medium inline-flex items-center transition-colors"
              >
                Cancel
              </Link>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="h-[40px] px-5 rounded-field bg-navy-700 hover:bg-navy-800 text-white text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Next: {STEPS[currentStep].label}</span>
                <span className="text-brand-teal">→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="h-[42px] px-6 rounded-field bg-[#1E9E6A] hover:bg-emerald-700 text-white text-[13px] font-bold inline-flex items-center gap-2 transition-colors shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Property Listing</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
