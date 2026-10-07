"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Building,
  IndianRupee,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  Edit3,
  Trash2,
  ChevronRight,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { getStoredLeads, saveLead, deleteLead, Lead, LeadStage, LeadPriority } from "@/lib/leadStore";
import { getCurrentUserRole, ROLE_PERMISSIONS, UserRole } from "@/lib/permissions";
import { formatCurrencyINR } from "@/lib/units";
import { cn } from "@/lib/utils";

const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: "inquiry", label: "New Inquiry", color: "bg-blue-500" },
  { id: "site_visit", label: "Site Visit", color: "bg-purple-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "won", label: "Closed Won", color: "bg-emerald-500" },
  { id: "lost", label: "Lost", color: "bg-gray-400" },
];

const DEMO_ACTIVITIES: Record<string, { date: string; action: string; by: string; channel: string; note: string }[]> = {
  "lead-1": [
    { date: "Oct 3, 2026 – 10:45 AM", action: "Follow-up Call", by: "Neha Verma", channel: "Phone", note: "Discussed power backup requirement. Client confirmed 100% DG is mandatory. Will share shortlisted options by EOD." },
    { date: "Oct 1, 2026 – 3:00 PM", action: "Initial Site Inquiry", by: "Rajiv Singhania", channel: "Email", note: "Inquiry received via website. Company expanding headcount from 35 to 80 engineers. Need immediate November occupancy." },
  ],
  "lead-2": [
    { date: "Oct 2, 2026 – 4:30 PM", action: "Site Visit Scheduled", by: "Priya Nair", channel: "WhatsApp", note: "Cyber Hub Galleria 4th floor walkthrough confirmed for Thursday 3PM. Client to bring interior architect." },
    { date: "Sep 30, 2026 – 11:00 AM", action: "First Interaction", by: "Kavita Rao", channel: "Call", note: "BlueStone looking for a flagship showroom. Minimum 40ft road frontage is non-negotiable." },
  ],
  "lead-3": [
    { date: "Oct 1, 2026 – 2:00 PM", action: "Negotiation Round 2", by: "Rahul Sharma", channel: "In-Person", note: "Negotiating security deposit reduction from 4 to 3 months. Client team includes logistics head and legal counsel." },
    { date: "Sep 28, 2026 – 10:00 AM", action: "Lease Draft Sent", by: "Rahul Sharma", channel: "Email", note: "3-year lease agreement draft shared with Zepto legal team. Requesting response within 5 working days." },
  ],
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params?.id as string;

  const [role, setRole] = useState<UserRole>("admin");
  const [lead, setLead] = useState<Lead | null>(null);
  const [editStage, setEditStage] = useState<LeadStage | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteChannel, setNoteChannel] = useState("Call");
  const [activities, setActivities] = useState<{ date: string; action: string; by: string; channel: string; note: string }[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const current = getCurrentUserRole();
    setRole(current);
    const leads = getStoredLeads();
    const found = leads.find((l) => l.id === leadId);
    if (found) {
      setLead(found);
      setActivities(DEMO_ACTIVITIES[leadId] || []);
    }
  }, [leadId]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStageUpdate = (stage: LeadStage) => {
    if (!lead) return;
    const updated = { ...lead, stage };
    saveLead(updated);
    setLead(updated);
    setEditStage(null);
    showToast(`Lead moved to ${stage.replace("_", " ").toUpperCase()}`);
  };

  const handleAddNote = () => {
    if (!noteText || !lead) return;
    const newAct = {
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      action: "Follow-up Note",
      by: role === "admin" ? "Admin User" : role === "sales" ? "Priya Nair" : "Field Agent",
      channel: noteChannel,
      note: noteText,
    };
    setActivities([newAct, ...activities]);
    setNoteText("");
    setShowNoteModal(false);
    showToast("Activity note logged successfully!");
  };

  const handleDelete = () => {
    if (!lead) return;
    deleteLead(lead.id);
    router.push("/leads");
  };

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-ink-400 mx-auto" />
          <p className="text-ink-600 font-medium">Lead not found.</p>
          <Link href="/leads" className="text-brand-link text-sm hover:underline">← Back to Pipeline</Link>
        </div>
      </div>
    );
  }

  const currentStageIdx = STAGES.findIndex((s) => s.id === lead.stage);
  const canEdit = ROLE_PERMISSIONS[role]?.canScheduleFollowup ?? false;

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-field shadow-login text-[13px] font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
          <span>{toast}</span>
        </div>
      )}

      {/* Back + Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/leads" className="p-2 rounded-full hover:bg-subtle text-ink-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-bold text-ink-900 tracking-tight">{lead.tenantName}</h1>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                lead.priority === "high" && "bg-red-50 text-red-600",
                lead.priority === "medium" && "bg-amber-50 text-amber-600",
                lead.priority === "low" && "bg-gray-100 text-gray-600"
              )}>
                {lead.priority}
              </span>
            </div>
            <p className="text-[14px] text-ink-500 font-medium">{lead.company}</p>
          </div>
        </div>

        {canEdit && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNoteModal(true)}
              className="h-[38px] px-3.5 bg-navy-700 hover:bg-navy-800 text-white rounded-field text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Log Activity
            </button>
            <button
              onClick={handleDelete}
              className="h-[38px] px-3 rounded-field border border-red-200 text-red-600 hover:bg-red-50 text-[12px] font-medium inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Stage Progress Bar */}
      <div className="bg-white rounded-card border border-line p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold text-ink-900">Pipeline Stage</h3>
          {canEdit && (
            <button
              onClick={() => setEditStage(lead.stage)}
              className="text-[12px] text-brand-link hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" /> Change Stage
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          {STAGES.map((s, idx) => {
            const isPast = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <React.Fragment key={s.id}>
                <div className={cn(
                  "flex-1 h-2 rounded-full transition-all",
                  isCurrent ? s.color : isPast ? "bg-emerald-400" : "bg-gray-200"
                )} />
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2">
          {STAGES.map((s, idx) => (
            <span key={s.id} className={cn(
              "text-[10px] font-medium",
              idx === currentStageIdx ? "text-ink-900 font-bold" : "text-ink-400"
            )}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Lead Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Contact Card */}
          <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-4">
            <h3 className="text-[14px] font-bold text-ink-900 border-b border-line pb-2">Contact Details</h3>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                  <User className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <span className="block text-[10px] text-ink-400 uppercase font-semibold">CONTACT</span>
                  <span className="font-semibold text-ink-900">{lead.tenantName}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                  <Building className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <span className="block text-[10px] text-ink-400 uppercase font-semibold">COMPANY</span>
                  <span className="font-semibold text-ink-900">{lead.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                  <Phone className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <span className="block text-[10px] text-ink-400 uppercase font-semibold">PHONE</span>
                  <a href={`tel:${lead.phone}`} className="font-semibold text-brand-link hover:underline">{lead.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <span className="block text-[10px] text-ink-400 uppercase font-semibold">EMAIL</span>
                  <a href={`mailto:${lead.email}`} className="font-semibold text-brand-link hover:underline truncate block max-w-[160px]">{lead.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <span className="block text-[10px] text-ink-400 uppercase font-semibold">PREFERRED LOCATION</span>
                  <span className="font-semibold text-ink-900">{lead.preferredLocations.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2 border-t border-line">
              <a
                href={`tel:${lead.phone}`}
                className="flex-1 h-[38px] rounded-field bg-subtle hover:bg-brand-600 hover:text-white text-ink-700 text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(lead.tenantName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-[38px] rounded-field bg-[#E3F6EE] text-[#1E9E6A] hover:bg-[#1E9E6A] hover:text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Deal Economics */}
          <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-3">
            <h3 className="text-[14px] font-bold text-ink-900 border-b border-line pb-2">Deal Economics</h3>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div className="bg-subtle rounded-field p-3">
                <span className="block text-[10px] text-ink-400 uppercase font-semibold mb-0.5">MONTHLY VALUE</span>
                <span className="font-bold text-ink-900 text-[16px]">{formatCurrencyINR(lead.dealValueMonthly)}</span>
              </div>
              <div className="bg-subtle rounded-field p-3">
                <span className="block text-[10px] text-ink-400 uppercase font-semibold mb-0.5">BUDGET / SQFT</span>
                <span className="font-bold text-ink-900 text-[16px]">₹{lead.budgetPerSqft}</span>
              </div>
              <div className="bg-subtle rounded-field p-3">
                <span className="block text-[10px] text-ink-400 uppercase font-semibold mb-0.5">AREA NEEDED</span>
                <span className="font-bold text-ink-900 text-[16px]">{lead.minAreaSqft.toLocaleString()} sqft</span>
              </div>
              <div className="bg-subtle rounded-field p-3">
                <span className="block text-[10px] text-ink-400 uppercase font-semibold mb-0.5">ANN. POTENTIAL</span>
                <span className="font-bold text-ink-900 text-[16px]">{formatCurrencyINR(lead.dealValueMonthly * 12)}</span>
              </div>
            </div>
          </div>

          {/* Agent & Meta */}
          <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-2 text-[13px]">
            <h3 className="text-[14px] font-bold text-ink-900 border-b border-line pb-2">Assigned Agent</h3>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 h-9 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-[12px]">
                {lead.assignedAgent.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <span className="font-semibold text-ink-900 block">{lead.assignedAgent}</span>
                <span className="text-ink-400 text-[11px]">Commercial Leasing Executive</span>
              </div>
            </div>
            <div className="pt-2 space-y-1 text-ink-500">
              <div className="flex items-center justify-between">
                <span>Last Contact</span>
                <span className="font-medium text-ink-900">{lead.lastContactDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Created</span>
                <span className="font-medium text-ink-900">{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Activity Timeline + Notes */}
        <div className="lg:col-span-2 space-y-4">
          {/* Requirement Brief */}
          <div className="bg-white rounded-card border border-line p-5 shadow-card">
            <h3 className="text-[14px] font-bold text-ink-900 border-b border-line pb-2 mb-3">Space Requirement Brief</h3>
            <p className="text-[14px] text-ink-700 leading-relaxed">{lead.requirement}</p>
            {lead.notes && (
              <div className="mt-3 p-3 bg-amber-50 rounded-field border border-amber-200">
                <p className="text-[12px] text-amber-800 font-medium">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-card border border-line p-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="text-[14px] font-bold text-ink-900">Activity Timeline</h3>
              <span className="text-[11px] text-ink-400 font-medium">{activities.length} interactions</span>
            </div>

            {activities.length === 0 ? (
              <div className="py-10 text-center text-ink-400 text-[13px]">
                <Clock className="w-8 h-8 mx-auto mb-2 text-ink-300" />
                No activities logged yet.
              </div>
            ) : (
              <div className="mt-4 space-y-4 relative">
                <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-line" />
                {activities.map((act, idx) => (
                  <div key={idx} className="flex gap-4 pl-2 relative">
                    <div className="w-7 h-7 rounded-full bg-brand-600/10 border-2 border-brand-600 flex items-center justify-center flex-shrink-0 z-10 relative">
                      <Sparkles className="w-3 h-3 text-brand-600" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-[13px] font-bold text-ink-900">{act.action}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                          act.channel === "Call" && "bg-blue-50 text-blue-700",
                          act.channel === "WhatsApp" && "bg-emerald-50 text-emerald-700",
                          act.channel === "Email" && "bg-purple-50 text-purple-700",
                          act.channel === "In-Person" && "bg-orange-50 text-orange-700",
                        )}>
                          {act.channel}
                        </span>
                      </div>
                      <p className="text-[12px] text-ink-500 mt-0.5">{act.date} · by {act.by}</p>
                      <p className="text-[13px] text-ink-700 mt-1.5 leading-relaxed">{act.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage Change Modal */}
      {editStage !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-sm p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-ink-900">Change Pipeline Stage</h3>
              <button onClick={() => setEditStage(null)} className="text-ink-400 hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStageUpdate(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-field border text-[13px] font-medium transition-all",
                    lead.stage === s.id
                      ? "bg-navy-900 text-white border-navy-900"
                      : "border-line hover:border-brand-600 hover:bg-subtle"
                  )}
                >
                  <div className={cn("w-3 h-3 rounded-full", s.color)} />
                  {s.label}
                  {lead.stage === s.id && <CheckCircle2 className="w-4 h-4 ml-auto text-brand-teal" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-ink-900">Log Activity Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-ink-400 hover:text-ink-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-[13px]">
              <div>
                <label className="block font-medium text-ink-700 mb-1">Channel / Method</label>
                <select
                  value={noteChannel}
                  onChange={(e) => setNoteChannel(e.target.value)}
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] bg-white focus:outline-none focus:border-brand-600"
                >
                  <option>Call</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>In-Person</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-ink-700 mb-1">Interaction Notes *</label>
                <textarea
                  rows={4}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Describe the conversation, client concerns, and next steps..."
                  className="w-full p-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1 border-t border-line">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 border border-line rounded-field text-ink-700 hover:bg-subtle text-[13px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-5 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold text-[13px] inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
