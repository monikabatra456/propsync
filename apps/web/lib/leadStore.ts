export type LeadStage = "inquiry" | "site_visit" | "negotiation" | "won" | "lost";
export type LeadPriority = "high" | "medium" | "low";

export interface Lead {
  id: string;
  tenantName: string;
  company: string;
  requirement: string;
  preferredLocations: string[];
  budgetPerSqft: number;
  minAreaSqft: number;
  stage: LeadStage;
  assignedAgent: string;
  phone: string;
  email: string;
  lastContactDate: string;
  priority: LeadPriority;
  notes: string;
  dealValueMonthly: number;
  createdAt: string;
}

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    tenantName: "Rajiv Singhania",
    company: "NexGen Fintech Solutions",
    requirement: "Fitted 5,000 sq ft Office Space with 100% DG backup & metro proximity",
    preferredLocations: ["Sector 62, Noida", "Cyber City, Gurgaon"],
    budgetPerSqft: 20,
    minAreaSqft: 5000,
    stage: "inquiry",
    assignedAgent: "Neha Verma",
    phone: "+91 98112 34567",
    email: "rajiv@nexgenfintech.io",
    lastContactDate: "Today, 10:45 AM",
    priority: "high",
    notes: "Requires immediate occupancy by Nov 1. Expanding engineering team from 35 to 80 members.",
    dealValueMonthly: 100000,
    createdAt: "2026-10-02T10:00:00Z",
  },
  {
    id: "lead-2",
    tenantName: "Kavita Rao",
    company: "BlueStone Retail Ventures",
    requirement: "High-street retail showroom with minimum 40 ft road frontage",
    preferredLocations: ["Cyber City, Gurgaon", "Connaught Place, New Delhi"],
    budgetPerSqft: 140,
    minAreaSqft: 2500,
    stage: "site_visit",
    assignedAgent: "Priya Nair",
    phone: "+91 99201 88765",
    email: "kavita.rao@bluestone.com",
    lastContactDate: "Yesterday, 04:30 PM",
    priority: "high",
    notes: "Site inspection scheduled at Cyber Hub Galleria for Thursday 3:00 PM.",
    dealValueMonthly: 350000,
    createdAt: "2026-09-29T14:30:00Z",
  },
  {
    id: "lead-3",
    tenantName: "Mahesh Agarwal",
    company: "Zepto Express Logistics",
    requirement: "Industrial fulfillment center with 12m clear height & 4+ docking bays",
    preferredLocations: ["Bhiwandi, Maharashtra", "Dwarka Expressway, Gurgaon"],
    budgetPerSqft: 10,
    minAreaSqft: 10000,
    stage: "negotiation",
    assignedAgent: "Rahul Sharma",
    phone: "+91 97690 12345",
    email: "mahesh.a@zeptonow.com",
    lastContactDate: "Oct 1, 2026",
    priority: "high",
    notes: "Finalizing 3-year lease draft. Negotiating security deposit from 4 months to 3 months.",
    dealValueMonthly: 100000,
    createdAt: "2026-09-25T11:00:00Z",
  },
  {
    id: "lead-4",
    tenantName: "Alistair Campbell",
    company: "Macquarie Advisory India",
    requirement: "Grade A corporate suite in CBD landmark with high security and LEED certification",
    preferredLocations: ["Statesman House, Connaught Place", "BKC, Mumbai"],
    budgetPerSqft: 250,
    minAreaSqft: 3200,
    stage: "negotiation",
    assignedAgent: "Neha Verma",
    phone: "+91 98101 99887",
    email: "a.campbell@macquarie.com",
    lastContactDate: "Sep 30, 2026",
    priority: "high",
    notes: "Sent revised draft for Statesman House 8th Floor. Board approval expected this Friday.",
    dealValueMonthly: 800000,
    createdAt: "2026-09-22T09:00:00Z",
  },
  {
    id: "lead-5",
    tenantName: "Dr. Arvind Swaminathan",
    company: "Manipal Diagnostic Labs",
    requirement: "Commercial ground floor unit with heavy power & bio-waste drainage sanction",
    preferredLocations: ["Sector 62, Noida", "Okhla, New Delhi"],
    budgetPerSqft: 25,
    minAreaSqft: 4000,
    stage: "won",
    assignedAgent: "John Doe",
    phone: "+91 98450 67890",
    email: "arvind.s@manipalhospitals.com",
    lastContactDate: "Sep 28, 2026",
    priority: "medium",
    notes: "Agreement signed! 5-year lease registered. Handover completed on Oct 1.",
    dealValueMonthly: 100000,
    createdAt: "2026-09-15T15:00:00Z",
  },
  {
    id: "lead-6",
    tenantName: "Sanjay Singhal",
    company: "Decathlon Sports Hub",
    requirement: "Large-format retail anchor store with parking for 100+ four-wheelers",
    preferredLocations: ["Dwarka Expressway, Gurgaon"],
    budgetPerSqft: 50,
    minAreaSqft: 15000,
    stage: "lost",
    assignedAgent: "Priya Nair",
    phone: "+91 98119 55443",
    email: "sanjay.s@decathlon.in",
    lastContactDate: "Sep 20, 2026",
    priority: "low",
    notes: "Chose alternative mall property with direct metro bridge connectivity.",
    dealValueMonthly: 750000,
    createdAt: "2026-09-10T12:00:00Z",
  },
  {
    id: "lead-7",
    tenantName: "Pooja Batra",
    company: "Zomato Hyperpure",
    requirement: "Cold storage & warehousing facility with 3-phase heavy power connection",
    preferredLocations: ["Bhiwandi", "Okhla Phase 3"],
    budgetPerSqft: 12,
    minAreaSqft: 8000,
    stage: "site_visit",
    assignedAgent: "Rahul Sharma",
    phone: "+91 99100 44321",
    email: "pooja.batra@zomato.com",
    lastContactDate: "Today, 02:15 PM",
    priority: "medium",
    notes: "Site visit confirmed for tomorrow morning with technical facilities team.",
    dealValueMonthly: 96000,
    createdAt: "2026-10-01T16:00:00Z",
  },
];

const LEADS_STORAGE_KEY = "expertcompany_leads_v1";

export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") {
    return INITIAL_LEADS;
  }

  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Error reading leads from storage", err);
  }

  return INITIAL_LEADS;
}

export function saveLead(lead: Lead): Lead {
  const current = getStoredLeads();
  const index = current.findIndex((l) => l.id === lead.id);
  let updated: Lead[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = lead;
  } else {
    updated = [lead, ...current];
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  }

  return lead;
}

export function updateLeadStage(id: string, newStage: LeadStage): Lead | undefined {
  const current = getStoredLeads();
  const lead = current.find((l) => l.id === id);
  if (lead) {
    lead.stage = newStage;
    lead.lastContactDate = "Just now";
    saveLead(lead);
    return lead;
  }
  return undefined;
}

export function deleteLead(id: string): boolean {
  const current = getStoredLeads();
  const updated = current.filter((l) => l.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  }

  return true;
}
