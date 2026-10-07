import { AreaUnit, convertArea, formatArea, formatCurrencyINR } from "./units";

export type PropertyStatus = "available" | "under_verification" | "under_negotiation" | "rented";
export type LandUseType = "Office" | "Retail" | "Industrial" | "Commercial" | "Residential";

export interface FloorDetail {
  floor: string;
  carpetAreaSqft: number;
  builtUpAreaSqft: number;
  rentPerSqft: number;
  availability: string;
  facilities: string;
}

export interface ComplianceDoc {
  id: string;
  name: string;
  type: string;
  status: "verified" | "valid" | "pending" | "expired";
  validUntil?: string;
  expectedDate?: string;
  remarks: string;
  docNumber?: string;
  fileUrl?: string;
}

export interface PropertyContact {
  id: string;
  name: string;
  role: "Landlord" | "Broker" | "Site Manager";
  phone: string;
  email?: string;
}

export interface FollowupRecord {
  id: string;
  date: string;
  time: string;
  channel: "WhatsApp" | "Call" | "Email" | "In-Person";
  contactName: string;
  notes: string;
  status: "scheduled" | "completed" | "cancelled";
}

export interface Property {
  id: string;
  title: string;
  location: string;
  locality: string;
  district: string;
  pinCode: string;
  coordinates: { lat: number; lng: number };
  accuracy?: number;
  source?: string;
  status: PropertyStatus;
  areaSqft: number;
  areaSqyd: number;
  landUse: LandUseType;
  rentPerSqft: number;
  securityDeposit: string;
  maintenance: number;
  leaseTerm: string;
  lockInPeriod: string;
  buildingName: string;
  buildingAge: string;
  totalFloors: number;
  listedBy: string;
  description: string;
  images: string[];
  videoUrl?: string;
  has360Tour?: boolean;
  highlights: string[];
  floors: FloorDetail[];
  amenities: string[];
  complianceDocs: ComplianceDoc[];
  contacts: PropertyContact[];
  followups: FollowupRecord[];
  createdAt: string;
  ownerId?: string;
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Premium Office Space – Sector 62",
    location: "Sector 62, Noida, Uttar Pradesh 201309",
    locality: "Sector 62",
    district: "Noida (Gautam Buddha Nagar)",
    pinCode: "201309",
    coordinates: { lat: 28.6139, lng: 77.209 },
    accuracy: 5,
    source: "Browser GPS",
    status: "available",
    areaSqft: 5000,
    areaSqyd: 556,
    landUse: "Office",
    rentPerSqft: 18,
    securityDeposit: "3 Months",
    maintenance: 2,
    leaseTerm: "3+ Years Negotiable",
    lockInPeriod: "1 Year",
    buildingName: "Apex Corporate Tower",
    buildingAge: "3 Years",
    totalFloors: 5,
    listedBy: "S. R. Properties",
    description: "Modern office space in a prime business location with excellent connectivity and amenities.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    has360Tour: true,
    highlights: [
      "100% DG Power Backup & UPS supply",
      "Grade-A Commercial Building with LEED Gold certification",
      "High-speed Mitsubishi Elevators (4 Passenger + 2 Service)",
      "Dedicated multi-level basement parking (40 slots)",
      "24/7 Monitored CCTV Security & Biometric Access",
      "Centralized VRV / HVAC Air-Conditioning",
    ],
    floors: [
      { floor: "Ground Floor", carpetAreaSqft: 1000, builtUpAreaSqft: 1250, rentPerSqft: 22, availability: "Available", facilities: "Reception, Cafeteria, Meeting Lounges" },
      { floor: "1st Floor", carpetAreaSqft: 1000, builtUpAreaSqft: 1250, rentPerSqft: 20, availability: "Available", facilities: "Open Workstations, 2 Conference Rooms" },
      { floor: "2nd Floor", carpetAreaSqft: 1000, builtUpAreaSqft: 1250, rentPerSqft: 20, availability: "Available", facilities: "Executive Cabins, Server Room" },
      { floor: "3rd Floor", carpetAreaSqft: 1000, builtUpAreaSqft: 1250, rentPerSqft: 18, availability: "Under Negotiation", facilities: "Fitted Workstations, Phone Booths" },
      { floor: "4th Floor", carpetAreaSqft: 1000, builtUpAreaSqft: 1250, rentPerSqft: 18, availability: "Available", facilities: "Terrace Garden Access, Breakout Zone" },
    ],
    amenities: [
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
    ],
    complianceDocs: [
      { id: "doc-1", name: "Title Deed Verification", type: "Ownership", status: "verified", remarks: "Clear title, verified by legal team with Registrar record.", docNumber: "TD-2021-9844" },
      { id: "doc-2", name: "Building Plan Approval (OC)", type: "Municipal", status: "verified", remarks: "Noida Authority approved occupancy certificate.", docNumber: "NOIDA/OC/2022/411" },
      { id: "doc-3", name: "Fire Safety Certificate (NOC)", type: "Safety", status: "valid", validUntil: "Dec 2025", remarks: "Renewed annually. All hydrants and detectors operational.", docNumber: "UPFS-2023-5591" },
      { id: "doc-4", name: "RERA Registration", type: "Regulatory", status: "valid", validUntil: "Mar 2028", remarks: "Commercial project verified under UP RERA.", docNumber: "UPRERA-PRJ-6789" },
      { id: "doc-5", name: "Environmental Clearance", type: "State Board", status: "pending", expectedDate: "Nov 2026", remarks: "Application under assessment by UP Pollution Control Board.", docNumber: "UPPCB-APP-102" },
    ],
    contacts: [
      { id: "c-1", name: "Rohit Sharma", role: "Landlord", phone: "+91 98765 43210", email: "rohit.sharma@example.com" },
      { id: "c-2", name: "Neha Verma", role: "Broker", phone: "+91 91234 56789", email: "neha.verma@srproperties.in" },
    ],
    followups: [
      { id: "f-1", date: "2026-10-01", time: "11:30 AM", channel: "WhatsApp", contactName: "Rohit Sharma", notes: "Shared updated lease agreement draft with commercial terms.", status: "completed" },
      { id: "f-2", date: "2026-10-05", time: "02:00 PM", channel: "Call", contactName: "Neha Verma", notes: "Site inspection scheduled with prospective IT tenant.", status: "scheduled" },
    ],
    createdAt: "2026-09-28T10:00:00Z",
  },
  {
    id: "prop-2",
    title: "Retail Space – Cyber City",
    location: "DLF Cyber City, Phase 2, Gurgaon, Haryana 122002",
    locality: "Cyber City",
    district: "Gurgaon",
    pinCode: "122002",
    coordinates: { lat: 28.4907, lng: 77.0898 },
    accuracy: 6,
    source: "Browser GPS",
    status: "under_verification",
    areaSqft: 2500,
    areaSqyd: 278,
    landUse: "Retail",
    rentPerSqft: 120,
    securityDeposit: "6 Months",
    maintenance: 12,
    leaseTerm: "5 Years",
    lockInPeriod: "2 Years",
    buildingName: "Cyber Hub Galleria",
    buildingAge: "2 Years",
    totalFloors: 2,
    listedBy: "Capital Assets Realty",
    description: "Well-located retail space in a high footfall commercial hub with high glass frontage.",
    images: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Massive 60-ft wide road-facing frontage",
      "Adjacent to Cyber Hub Rapid Metro station",
      "Surrounded by Fortune 500 corporate offices",
      "Equipped with dedicated commercial kitchen exhaust",
    ],
    floors: [
      { floor: "Ground Floor", carpetAreaSqft: 1500, builtUpAreaSqft: 1800, rentPerSqft: 140, availability: "Under Verification", facilities: "Retail Display, Cash Counter" },
      { floor: "Mezzanine", carpetAreaSqft: 1000, builtUpAreaSqft: 1200, rentPerSqft: 100, availability: "Under Verification", facilities: "Stock Room, Staff Lounge" },
    ],
    amenities: [
      "Lifts",
      "100% DG Power Backup",
      "Valet Parking",
      "24/7 Security",
      "Central Air Conditioning",
      "Fire NOC / Hydrants",
    ],
    complianceDocs: [
      { id: "doc-21", name: "DLF Mall License", type: "Commercial", status: "verified", remarks: "All retail retail permits approved.", docNumber: "DLF-RT-2023-88" },
      { id: "doc-22", name: "Fire NOC", type: "Safety", status: "valid", validUntil: "Jan 2027", remarks: "Commercial category A certified.", docNumber: "HR-FIRE-2024-9" },
    ],
    contacts: [
      { id: "c-21", name: "Vikram Malhotra", role: "Landlord", phone: "+91 98111 22334", email: "v.malhotra@dlfretail.in" },
    ],
    followups: [],
    createdAt: "2026-09-30T14:30:00Z",
  },
  {
    id: "prop-3",
    title: "Warehouse – Bhiwandi",
    location: "Mumbai-Nashik Highway, Bhiwandi, Maharashtra 421302",
    locality: "Mankoli Naka",
    district: "Thane",
    pinCode: "421302",
    coordinates: { lat: 19.2967, lng: 73.0631 },
    accuracy: 10,
    source: "Field Agent Handheld",
    status: "rented",
    areaSqft: 10000,
    areaSqyd: 1111,
    landUse: "Industrial",
    rentPerSqft: 8,
    securityDeposit: "3 Months",
    maintenance: 1,
    leaseTerm: "3 Years",
    lockInPeriod: "1 Year",
    buildingName: "LogiPark Logistics Hub",
    buildingAge: "4 Years",
    totalFloors: 1,
    listedBy: "Prime Industrial Brokers",
    description: "Spacious warehouse with 12m clear height, heavy duty flooring, and docking bays.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "12-meter clear height with pre-engineered steel structure",
      "FM2 grade laser-screeded heavy duty industrial flooring (5 MT/sqm)",
      "6 automated hydraulic dock levelers",
      "Equipped with ESFR automated sprinkler systems",
    ],
    floors: [
      { floor: "Ground Bay A-C", carpetAreaSqft: 10000, builtUpAreaSqft: 10500, rentPerSqft: 8, availability: "Rented", facilities: "Hydraulic Docks, Office Mezzanine" },
    ],
    amenities: [
      "Heavy Power Load (150 HP)",
      "Fire Hydrant & ESFR Sprinklers",
      "Weighbridge (60 MT)",
      "24/7 Gated Security & Boom Barriers",
      "Truck Parking Bay",
    ],
    complianceDocs: [
      { id: "doc-31", name: "Industrial NA Order", type: "Zoning", status: "verified", remarks: "Non-agricultural industrial use order approved by Collector.", docNumber: "THN-NA-2020-410" },
      { id: "doc-32", name: "Pollution Board Consent (CTO)", type: "MPCB", status: "valid", validUntil: "Aug 2027", remarks: "Consent to Operate issued by MPCB.", docNumber: "MPCB-CTO-2022-77" },
    ],
    contacts: [
      { id: "c-31", name: "Anand Deshmukh", role: "Landlord", phone: "+91 97654 32190" },
    ],
    followups: [],
    createdAt: "2026-09-25T08:00:00Z",
  },
  {
    id: "prop-4",
    title: "Commercial Space – Connaught Place",
    location: "Barakhamba Road, Connaught Place, New Delhi 110001",
    locality: "Connaught Place",
    district: "New Delhi",
    pinCode: "110001",
    coordinates: { lat: 28.6304, lng: 77.2177 },
    accuracy: 4,
    source: "Browser GPS",
    status: "available",
    areaSqft: 3200,
    areaSqyd: 356,
    landUse: "Commercial",
    rentPerSqft: 250,
    securityDeposit: "4 Months",
    maintenance: 15,
    leaseTerm: "5 Years",
    lockInPeriod: "2 Years",
    buildingName: "Statesman House",
    buildingAge: "7 Years",
    totalFloors: 12,
    listedBy: "Heritage Commercial Realty",
    description: "Premium commercial space in the heart of Delhi's central business district with metro access.",
    images: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Landmark CBD building right at Barakhamba Metro Station",
      "3-tier security with baggage scanners & facial recognition",
      "Prestigious corporate address with diplomatic enclave proximity",
    ],
    floors: [
      { floor: "8th Floor", carpetAreaSqft: 3200, builtUpAreaSqft: 3900, rentPerSqft: 250, availability: "Available", facilities: "Corner Suite, Boardroom, High-speed lifts" },
    ],
    amenities: [
      "High-Speed Lifts",
      "100% Power Backup",
      "Central HVAC",
      "CCTV & Armed Guard Security",
      "Basement Parking",
      "Fire NOC",
    ],
    complianceDocs: [
      { id: "doc-41", name: "NDMC Occupancy Certificate", type: "Municipal", status: "verified", remarks: "NDMC full building clearance certificate.", docNumber: "NDMC-OC-2018-91" },
      { id: "doc-42", name: "Delhi Fire Service Certificate", type: "Safety", status: "valid", validUntil: "May 2027", remarks: "Fully compliant with Delhi Fire Safety Act.", docNumber: "DFS-NOC-2024-332" },
    ],
    contacts: [
      { id: "c-41", name: "Suresh Narang", role: "Landlord", phone: "+91 98100 11223" },
      { id: "c-42", name: "Amit Kapoor", role: "Broker", phone: "+91 99990 88776" },
    ],
    followups: [],
    createdAt: "2026-10-02T12:00:00Z",
  },
  {
    id: "prop-5",
    title: "Residential Land – Dwarka Expressway",
    location: "Sector 112, Dwarka Expressway, Gurgaon, Haryana 122017",
    locality: "Sector 112",
    district: "Gurgaon",
    pinCode: "122017",
    coordinates: { lat: 28.5145, lng: 77.0182 },
    accuracy: 8,
    source: "Field GPS",
    status: "available",
    areaSqft: 12000,
    areaSqyd: 1333,
    landUse: "Residential",
    rentPerSqft: 10,
    securityDeposit: "2 Months",
    maintenance: 0,
    leaseTerm: "2 Years",
    lockInPeriod: "6 Months",
    buildingName: "Expressway Enclave",
    buildingAge: "Plot / Land",
    totalFloors: 0,
    listedBy: "NCR Land Bankers",
    description: "Ideal for residential development, pre-fab office, or nursery with direct expressway frontage.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Direct 60-meter wide expressway service road connectivity",
      "5 minutes to Delhi IGI Airport Terminal 3 via tunnel",
      "Freehold land parcel with clear boundary demarcation",
    ],
    floors: [],
    amenities: [
      "Gated Boundary Wall",
      "24/7 Security Guard Cabin",
      "Water & Electricity Connection",
      "Wide Access Road",
    ],
    complianceDocs: [
      { id: "doc-51", name: "Registry & Mutation Proof", type: "Revenue", status: "verified", remarks: "Clean Jamabandi records verified in tehsil.", docNumber: "HR-REG-2022-771" },
      { id: "doc-52", name: "DTCP Master Plan Clearance", type: "Town Planning", status: "valid", validUntil: "Lifetime", remarks: "Approved under Gurgaon Manesar Urban Complex Plan.", docNumber: "DTCP-CLU-2021" },
    ],
    contacts: [
      { id: "c-51", name: "Chaudhary Balraj", role: "Landlord", phone: "+91 98188 77665" },
    ],
    followups: [],
    createdAt: "2026-10-01T09:00:00Z",
    ownerId: "usr-owner",
  },
  {
    id: "prop-6",
    title: "Grade-A IT Park Tech Center – Whitefield",
    location: "ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066",
    locality: "Whitefield",
    district: "Bengaluru Urban",
    pinCode: "560066",
    coordinates: { lat: 12.9845, lng: 77.7376 },
    accuracy: 5,
    source: "Field GPS Handheld",
    status: "available",
    areaSqft: 25000,
    areaSqyd: 2778,
    landUse: "Office",
    rentPerSqft: 65,
    securityDeposit: "6 Months",
    maintenance: 8,
    leaseTerm: "5 Years",
    lockInPeriod: "3 Years",
    buildingName: "Cybertech International Park",
    buildingAge: "2 Years",
    totalFloors: 8,
    listedBy: "Bangalore Prime Commercial",
    description: "LEED Platinum certified tech campus with high-density cabling, captive solar power, and 24/7 technical NOC.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "N+1 redundant DG backup with 10,000 kVA substation",
      "Direct footbridge access to Whitefield Kadugodi Metro Station",
      "Campus amenities including food court, gym, and daycare",
    ],
    floors: [
      { floor: "3rd Floor Wing A", carpetAreaSqft: 12500, builtUpAreaSqft: 15000, rentPerSqft: 65, availability: "Available", facilities: "Warm Shell, HVAC Ducted" },
      { floor: "3rd Floor Wing B", carpetAreaSqft: 12500, builtUpAreaSqft: 15000, rentPerSqft: 65, availability: "Available", facilities: "Warm Shell, Server Room" },
    ],
    amenities: [
      "High-Speed Lifts (12)",
      "100% DG Power Backup",
      "Multi-Level Basement Parking",
      "Central HVAC / Air Handling",
      "24/7 Security & CCTV",
      "Food Court & Cafeteria",
      "EV Fast Charging",
    ],
    complianceDocs: [
      { id: "doc-61", name: "KIADB Industrial Allotment", type: "State Agency", status: "verified", remarks: "Allotment deed clear with KIADB.", docNumber: "KIADB-IT-2019-33" },
      { id: "doc-62", name: "Karnataka Fire Force Clearance", type: "Safety", status: "valid", validUntil: "Nov 2027", remarks: "High-rise category safety compliance.", docNumber: "KFS-2023-884" },
    ],
    contacts: [
      { id: "c-61", name: "K. R. Venkatesh", role: "Landlord", phone: "+91 98450 11229", email: "venkatesh@cybertech.in" },
    ],
    followups: [],
    createdAt: "2026-10-02T16:00:00Z",
  },
  {
    id: "prop-7",
    title: "Corporate HQ Penthouse – Bandra Kurla Complex (BKC)",
    location: "G-Block, BKC, Bandra East, Mumbai, Maharashtra 400051",
    locality: "Bandra Kurla Complex",
    district: "Mumbai Suburban",
    pinCode: "400051",
    coordinates: { lat: 19.0657, lng: 72.8687 },
    accuracy: 3,
    source: "Browser GPS",
    status: "available",
    areaSqft: 8500,
    areaSqyd: 944,
    landUse: "Commercial",
    rentPerSqft: 380,
    securityDeposit: "6 Months",
    maintenance: 25,
    leaseTerm: "5 Years",
    lockInPeriod: "3 Years",
    buildingName: "One BKC Corporate Tower",
    buildingAge: "3 Years",
    totalFloors: 14,
    listedBy: "South Mumbai Luxury Commercials",
    description: "Ultra-premium corporate headquarters with sweeping city views, private executive elevator, and boardrooms.",
    images: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "Prestigious G-Block BKC location next to US Consulate",
      "Dedicated high-speed VIP elevator access to 14th floor",
      "Custom acoustic boardroom with telepresence infrastructure",
    ],
    floors: [
      { floor: "14th Penthouse", carpetAreaSqft: 7200, builtUpAreaSqft: 8500, rentPerSqft: 380, availability: "Available", facilities: "Fully Furnished, Boardroom, CEO Suite" },
    ],
    amenities: [
      "Private VIP Elevators",
      "100% N+1 Power Backup",
      "Executive Valet Parking",
      "Central HVAC & Air Filtration",
      "Biometric Access & 24/7 Security",
    ],
    complianceDocs: [
      { id: "doc-71", name: "MMRDA Lease Conveyance", type: "Statutory", status: "verified", remarks: "MMRDA commercial development consent.", docNumber: "MMRDA-BKC-2020-09" },
      { id: "doc-72", name: "Mumbai Fire Brigade NOC", type: "Safety", status: "valid", validUntil: "Dec 2027", remarks: "Full sprinkler & fire lift compliance.", docNumber: "MFB-2023-77" },
    ],
    contacts: [
      { id: "c-71", name: "Nadir Godrej", role: "Landlord", phone: "+91 98200 44556" },
    ],
    followups: [],
    createdAt: "2026-10-03T08:00:00Z",
  },
  {
    id: "prop-8",
    title: "Industrial Manufacturing Shed – Okhla Phase III",
    location: "Okhla Industrial Area Phase III, New Delhi 110020",
    locality: "Okhla Phase III",
    district: "South Delhi",
    pinCode: "110020",
    coordinates: { lat: 28.5362, lng: 77.2711 },
    accuracy: 6,
    source: "Field GPS",
    status: "available",
    areaSqft: 15000,
    areaSqyd: 1667,
    landUse: "Industrial",
    rentPerSqft: 45,
    securityDeposit: "3 Months",
    maintenance: 3,
    leaseTerm: "3 Years",
    lockInPeriod: "1 Year",
    buildingName: "Okhla Tech Industrial Complex",
    buildingAge: "5 Years",
    totalFloors: 2,
    listedBy: "Delhi Industrial Brokers",
    description: "Heavy manufacturing and warehousing facility with 250 kVA sanctioned power load and freight lift.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    ],
    highlights: [
      "250 kVA heavy industrial power connection with separate transformer",
      "Wide 40-ft road for 40-ft container truck maneuverability",
      "3-ton industrial freight elevator installed",
    ],
    floors: [
      { floor: "Ground Floor", carpetAreaSqft: 7500, builtUpAreaSqft: 8000, rentPerSqft: 50, availability: "Available", facilities: "Heavy Machinery Floor, Dock" },
      { floor: "1st Floor", carpetAreaSqft: 7500, builtUpAreaSqft: 8000, rentPerSqft: 40, availability: "Available", facilities: "Assembly Line, R&D Labs" },
    ],
    amenities: [
      "Freight Lift (3 Ton)",
      "High Power Load",
      "Industrial Effluent Drainage",
      "Gated Security & CCTV",
      "Fire Hydrant Ring",
    ],
    complianceDocs: [
      { id: "doc-81", name: "DSIIDC Factory License", type: "Industrial", status: "verified", remarks: "Approved for light engineering / assembly.", docNumber: "DSIIDC-LIC-2021-99" },
    ],
    contacts: [
      { id: "c-81", name: "Harpreet Singh", role: "Landlord", phone: "+91 98111 67890" },
    ],
    followups: [],
    createdAt: "2026-10-02T18:00:00Z",
  },
];

const STORAGE_KEY = "expertcompany_properties_v2"; // bump version to force fresh seed

export function resetDemoData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("expertcompany_leads_v1");
    localStorage.removeItem("expertcompany_leads_v2");
    window.location.reload();
  }
}

export function getStoredProperties(): Property[] {
  if (typeof window === "undefined") {
    return INITIAL_PROPERTIES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
      return INITIAL_PROPERTIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Error reading properties from storage", err);
  }

  return INITIAL_PROPERTIES;
}

export function getPropertyById(id: string): Property | undefined {
  const list = getStoredProperties();
  return list.find((p) => p.id === id);
}

export function saveProperty(property: Property): Property {
  const current = getStoredProperties();
  const index = current.findIndex((p) => p.id === property.id);
  let updated: Property[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = property;
  } else {
    updated = [property, ...current];
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return property;
}

export function deleteProperty(id: string): boolean {
  const current = getStoredProperties();
  const updated = current.filter((p) => p.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return true;
}

export function addPropertyFollowup(propertyId: string, followup: Omit<FollowupRecord, "id">): FollowupRecord {
  const current = getStoredProperties();
  const prop = current.find((p) => p.id === propertyId);
  const newFollowup: FollowupRecord = {
    ...followup,
    id: `f-${Date.now()}`,
  };

  if (prop) {
    prop.followups = [newFollowup, ...(prop.followups || [])];
    saveProperty(prop);
  }

  return newFollowup;
}
