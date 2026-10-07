"use client";

import React, { useState } from "react";
import {
  Shield,
  Users,
  UserCheck,
  Building2,
  HardDrive,
  Search,
  Plus,
  MoreVertical,
  Check,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Edit,
  Trash2,
  LogIn,
  Share2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { cn } from "@/lib/utils";
import { HeroBuilding } from "@/components/layout/HeroBuilding";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "sales" | "field" | "space_sales" | "owner";
  status: "active" | "disabled";
  lastLogin: string;
  initials: string;
  initialsColor?: string;
}

interface ApprovalItem {
  id: string;
  name: string;
  email: string;
  roleRequested: "field" | "sales" | "space_sales";
  department: string;
  submittedOn: string;
  initials: string;
}

interface AuditLogItem {
  id: string;
  date: string;
  time: string;
  user: {
    name: string;
    role: "admin" | "sales" | "field";
    initials: string;
    initialsColor?: string;
  };
  action: "view" | "edit" | "delete" | "login" | "create" | "export";
  resource: string;
  details: string;
  ipAddress: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: "u-1", name: "John Doe", email: "john@expertcompany.com", role: "admin", status: "active", lastLogin: "Just now", initials: "JD", initialsColor: "bg-[#0B2B57] text-white" },
  { id: "u-2", name: "Rahul Sharma", email: "rahul.s@expertcompany.com", role: "field", status: "active", lastLogin: "Today, 11:20 AM", initials: "RS", initialsColor: "bg-[#EAF3FF] text-[#1769EB]" },
  { id: "u-3", name: "Priya Nair", email: "priya.n@expertcompany.com", role: "sales", status: "active", lastLogin: "Yesterday, 04:15 PM", initials: "PN", initialsColor: "bg-[#E3F7EE] text-[#0F9D63]" },
  { id: "u-4", name: "Ankit Verma", email: "ankit.v@expertcompany.com", role: "space_sales", status: "active", lastLogin: "Apr 25, 2025", initials: "AV", initialsColor: "bg-[#F0EAFD] text-[#7A4FE0]" },
  { id: "u-5", name: "Deepak Patel", email: "deepak.p@expertcompany.com", role: "field", status: "active", lastLogin: "Apr 24, 2025", initials: "DP", initialsColor: "bg-[#EAF3FF] text-[#1769EB]" },
  { id: "u-6", name: "Suresh Gupta", email: "suresh.owner@gmail.com", role: "owner", status: "active", lastLogin: "Apr 23, 2025", initials: "SG", initialsColor: "bg-[#FFF3D6] text-[#B7791F]" },
  { id: "u-7", name: "Meera Sen", email: "meera.s@expertcompany.com", role: "sales", status: "disabled", lastLogin: "Apr 18, 2025", initials: "MS", initialsColor: "bg-[#EEF2F7] text-[#6F87A5]" },
  { id: "u-8", name: "Kunal Ghosh", email: "kunal.g@expertcompany.com", role: "field", status: "active", lastLogin: "Apr 22, 2025", initials: "KG", initialsColor: "bg-[#EAF3FF] text-[#1769EB]" },
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  { id: "app-1", name: "Vikas Kapoor", email: "vikas.k@expertcompany.com", roleRequested: "field", department: "Field Operations (Noida)", submittedOn: "Today, 09:30 AM", initials: "VK" },
  { id: "app-2", name: "Tanvi Saxena", email: "tanvi.s@expertcompany.com", roleRequested: "sales", department: "Commercial Leasing", submittedOn: "Yesterday, 06:10 PM", initials: "TS" },
  { id: "app-3", name: "Ramanathan Iyer", email: "raman.i@expertcompany.com", roleRequested: "space_sales", department: "Retail Spaces", submittedOn: "Apr 24, 2025", initials: "RI" },
  { id: "app-4", name: "Simran Kaur", email: "simran.k@expertcompany.com", roleRequested: "field", department: "Site Survey (Gurgaon)", submittedOn: "Apr 23, 2025", initials: "SK" },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  { id: "aud-1", date: "Apr 26", time: "02:40 PM", user: { name: "John Doe", role: "admin", initials: "JD", initialsColor: "bg-[#0B2B57] text-white" }, action: "export", resource: "Property Portfolio", details: "Exported CSV audit log reports for Q1-2025 compliance audit", ipAddress: "192.168.1.45" },
  { id: "aud-2", date: "Apr 26", time: "01:15 PM", user: { name: "Rahul Sharma", role: "field", initials: "RS", initialsColor: "bg-[#EAF3FF] text-[#1769EB]" }, action: "create", resource: "Property #PROP-109", details: "Created draft listing with GPS coordinates (28.6139° N, 77.2090° E)", ipAddress: "14.139.60.22" },
  { id: "aud-3", date: "Apr 26", time: "11:50 AM", user: { name: "Priya Nair", role: "sales", initials: "PN", initialsColor: "bg-[#E3F7EE] text-[#0F9D63]" }, action: "edit", resource: "Commercials #PROP-1", details: "Updated rent rate from ₹20 to ₹18/sqft/mo for Sector 62 office", ipAddress: "49.36.12.89" },
  { id: "aud-4", date: "Apr 26", time: "10:05 AM", user: { name: "John Doe", role: "admin", initials: "JD", initialsColor: "bg-[#0B2B57] text-white" }, action: "login", resource: "Auth Session", details: "Authenticated via 2FA email verification", ipAddress: "192.168.1.45" },
  { id: "aud-5", date: "Apr 25", time: "04:30 PM", user: { name: "John Doe", role: "admin", initials: "JD", initialsColor: "bg-[#0B2B57] text-white" }, action: "delete", resource: "Property #PROP-99", details: "Soft-deleted expired listing for DLF Phase 1 retail unit", ipAddress: "192.168.1.45" },
  { id: "aud-6", date: "Apr 25", time: "02:15 PM", user: { name: "Priya Nair", role: "sales", initials: "PN", initialsColor: "bg-[#E3F7EE] text-[#0F9D63]" }, action: "view", resource: "Compliance #PROP-1", details: "Inspected Fire NOC and Occupancy Certificate validity", ipAddress: "49.36.12.89" },
];

// Digital clock timestamp card
function TimestampCard({ date, time }: { date: string; time: string }) {
  return (
    <div className="inline-flex flex-col items-center justify-center bg-[#0B2B57] text-white rounded-[10px] px-3 py-1.5 min-w-[76px] shadow-sm select-none">
      <span className="text-[9px] font-semibold uppercase tracking-widest text-[#DCEBFF]/70 leading-none mb-0.5">
        {date}
      </span>
      <span className="font-mono text-[14px] font-bold tracking-wider leading-none text-white">
        {time}
      </span>
    </div>
  );
}

// Action badge with icon
function ActionBadge({ action }: { action: AuditLogItem["action"] }) {
  const styles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    view:   { bg: "bg-[#EAF3FF]", text: "text-[#1769EB]", icon: Eye },
    edit:   { bg: "bg-[#EAF3FF]", text: "text-[#1769EB]", icon: Edit },
    delete: { bg: "bg-[#FDECEC]", text: "text-[#E5484D]", icon: Trash2 },
    login:  { bg: "bg-[#E3F7EE]", text: "text-[#0F9D63]", icon: LogIn },
    create: { bg: "bg-[#E1F6F6]", text: "text-[#12A3A3]", icon: Plus },
    export: { bg: "bg-[#FFF3D6]", text: "text-[#B7791F]", icon: Share2 },
  };
  const s = styles[action] || { bg: "bg-[#EEF2F7]", text: "text-[#6F87A5]", icon: Eye };
  const Icon = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide", s.bg, s.text)}>
      <Icon className="w-3 h-3" />
      {action}
    </span>
  );
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [auditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [userSearch, setUserSearch] = useState("");
  const [auditActionFilter, setAuditActionFilter] = useState("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "sales" | "field" | "space_sales" | "owner">("field");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u)
    );
    showToast("User account status updated.");
  };

  const handleApprove = (item: ApprovalItem) => {
    setApprovals((prev) => prev.filter((a) => a.id !== item.id));
    setUsers((prev) => [{
      id: `u-${Date.now()}`,
      name: item.name,
      email: item.email,
      role: item.roleRequested,
      status: "active",
      lastLogin: "Never",
      initials: item.initials,
      initialsColor: "bg-[#EAF3FF] text-[#1769EB]",
    }, ...prev]);
    showToast(`Approved ${item.name} as ${item.roleRequested}. Notification sent.`);
  };

  const handleReject = (item: ApprovalItem) => {
    setApprovals((prev) => prev.filter((a) => a.id !== item.id));
    showToast(`Rejected signup application for ${item.name}.`);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const parts = newUserName.trim().split(" ");
    const initials = ((parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "")).toUpperCase();
    setUsers([{
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "active",
      lastLogin: "Never",
      initials,
      initialsColor: "bg-[#EAF3FF] text-[#1769EB]",
    }, ...users]);
    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
    showToast("User account created and invitation dispatched.");
  };

  const handleExportAuditCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Date,Time,User,Role,Action,Resource,Details,IP Address"]
        .concat(auditLogs.map((log) =>
          `"${log.date}","${log.time}","${log.user.name}","${log.user.role}","${log.action}","${log.resource}","${log.details}","${log.ipAddress}"`
        ))
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Expert_Company_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported to CSV successfully.");
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter((log) =>
    auditActionFilter === "all" ? true : log.action === auditActionFilter
  );

  return (
    <div className="space-y-7 max-w-[1536px] mx-auto animate-fadeUp pb-16">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#0B2B57] text-white px-5 py-3 rounded-[12px] shadow-2xl text-[13px] font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-[#16B77A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header */}
      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2">
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-[#6F87A5] block mb-1">Admin</span>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-[10px] bg-[#F0EAFD] flex items-center justify-center text-[#7A4FE0]">
              <Shield className="w-5 h-5 stroke-[2]" />
            </div>
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#102F57] tracking-tight leading-tight">
              Admin Panel
            </h1>
            {/* Live pulse badge */}
            <div className="flex items-center gap-1.5 h-[38px] px-3.5 rounded-[10px] bg-white border border-[#DCE8F5] text-[12px] text-[#6F87A5] font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#16B77A] animate-pulse" />
              <span>Live · Apr 26, 2025</span>
            </div>
          </div>
          <p className="text-[15px] text-[#6F87A5] mt-1.5 leading-relaxed">
            Security governance, user role permissions, signup approvals, and DPDP-compliant audit logs.
          </p>
        </div>

        {/* Right: Building Hero Illustration */}
        <HeroBuilding />
      </div>

      {/* 2. KPI Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Properties"
          value="247"
          icon={Building2}
          delta={{ text: "+12% from last month", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Office Spaces", count: "98 props" },
            { label: "Retail Units", count: "74 props" },
            { label: "Warehouses", count: "41 props" },
            { label: "Residential", count: "34 props" },
          ]}
        />
        <KpiCard
          label="Active Field Agents"
          value="16"
          icon={UserCheck}
          delta={{ text: "+6% active agents", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Assigned Surveys", count: "34 tasks" },
            { label: "Completed Today", count: "8 surveys" },
            { label: "Pending Reviews", count: "12 drafts" },
            { label: "Avg Rating", count: "4.7 / 5" },
          ]}
        />
        <KpiCard
          label="Total Users"
          value="48"
          icon={Users}
          delta={{ text: "+8% user growth", isPositive: true }}
          sparkline={true}
          breakdown={[
            { label: "Sales Agents", count: "18 users" },
            { label: "Field Staff", count: "16 users" },
            { label: "Admins", count: "4 users" },
            { label: "Owners", count: "10 users" },
          ]}
        />
        <KpiCard
          label="Storage Usage"
          value="12.4 GB"
          icon={HardDrive}
          delta={{ text: "12% of 100 GB quota", isPositive: true }}
          sparkline={false}
          breakdown={[
            { label: "Property Images", count: "8.2 GB" },
            { label: "Survey Docs", count: "2.6 GB" },
            { label: "Audit Exports", count: "1.1 GB" },
            { label: "Remaining", count: "87.6 GB" },
          ]}
        />
      </div>

      {/* 3. User & Role Management Table */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#DCE8F5]">
          <div>
            <h2 className="text-[18px] font-bold text-[#102F57] tracking-tight">User & Role Management</h2>
            <p className="text-[13px] text-[#6F87A5] mt-0.5">
              Manage accounts, enforce role-based access, and toggle active states.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="relative w-56">
              <Search className="w-4 h-4 text-[#6F87A5] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users…"
                className="w-full h-[40px] pl-9 pr-3 text-[13px] border border-[#DCE8F5] rounded-[10px] focus:outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 text-[#102F57] placeholder:text-[#6F87A5]/70 transition-all"
              />
            </div>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="h-[40px] px-4 bg-[#0B2B57] hover:bg-[#071D3F] text-white rounded-[10px] text-[13px] font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] border-b border-[#DCE8F5]">
                <th className="py-3 px-5">Name & Email</th>
                <th className="py-3 px-5">System Role</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Last Login</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F7FAFF] transition-colors group cursor-pointer">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0", user.initialsColor || "bg-[#EAF3FF] text-[#1769EB]")}>
                        {user.initials}
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-[#102F57] block group-hover:text-[#1769EB] transition-colors leading-tight">{user.name}</span>
                        <span className="text-[12px] text-[#6F87A5] block leading-tight">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95",
                        user.status === "active"
                          ? "bg-[#E3F7EE] text-[#0F9D63] hover:bg-[#D0F0E4]"
                          : "bg-[#EEF2F7] text-[#6F87A5] hover:bg-[#E5EAEF]"
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", user.status === "active" ? "bg-[#16B77A]" : "bg-[#6F87A5]")} />
                      {user.status === "active" ? "Active" : "Disabled"}
                    </button>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-[13px] font-medium text-[#102F57]">{user.lastLogin}</span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      {/* Toggle switch */}
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        style={{ height: "22px", minWidth: "40px" }}
                        className={cn(
                          "rounded-full transition-colors relative focus:outline-none p-0.5 flex-shrink-0 inline-flex items-center",
                          user.status === "active" ? "bg-[#1769EB]" : "bg-[#DCE8F5]"
                        )}
                        aria-label="Toggle user status"
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                          user.status === "active" ? "translate-x-5" : "translate-x-0"
                        )} />
                      </button>
                      <button
                        className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] bg-white hover:bg-[#EAF3FF] hover:text-[#1769EB] text-[#6F87A5] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="More options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:px-6 border-t border-[#DCE8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[#6F87A5]">
          <span>Showing 1–{filteredUsers.length} of {users.length} users</span>
          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center hover:bg-[#F5F8FC] disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-[8px] bg-[#0B2B57] text-white font-semibold text-[13px] flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] text-[#102F57] hover:bg-[#F5F8FC] font-semibold text-[13px] flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-[8px] border border-[#DCE8F5] flex items-center justify-center hover:bg-[#F5F8FC]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Signup Approvals Queue */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#DCE8F5]">
          <div className="flex items-center gap-3">
            <h2 className="text-[18px] font-bold text-[#102F57] tracking-tight">Signup Approvals Queue</h2>
            {approvals.length > 0 && (
              <span className="h-[24px] px-3 rounded-full bg-[#FFF3D6] text-[#B7791F] font-bold text-[12px] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {approvals.length} pending
              </span>
            )}
          </div>
          <span className="text-[13px] text-[#6F87A5]">Field staff & broker requests awaiting admin verification</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] border-b border-[#DCE8F5]">
                <th className="py-3 px-5">Applicant</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Role Requested</th>
                <th className="py-3 px-5">Department / Region</th>
                <th className="py-3 px-5">Submitted On</th>
                <th className="py-3 px-5 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {approvals.length > 0 ? (
                approvals.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7FAFF] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EAF3FF] text-[#1769EB] flex items-center justify-center font-bold text-[12px] flex-shrink-0">
                          {item.initials}
                        </div>
                        <span className="font-semibold text-[#102F57] group-hover:text-[#1769EB] transition-colors">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-[#6F87A5] text-[13px]">{item.email}</td>
                    <td className="py-4 px-5">
                      <RoleBadge role={item.roleRequested} />
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[13px] font-medium text-[#102F57]">{item.department}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[13px] text-[#6F87A5]">{item.submittedOn}</span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(item)}
                          className="h-[34px] px-4 bg-[#E3F7EE] hover:bg-[#0F9D63] text-[#0F9D63] hover:text-white rounded-[10px] text-[12px] font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 border border-[#0F9D63]/20 hover:border-[#0F9D63]"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item)}
                          className="h-[34px] px-4 bg-[#FDECEC] hover:bg-[#E5484D] text-[#E5484D] hover:text-white rounded-[10px] text-[12px] font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 border border-[#E5484D]/20 hover:border-[#E5484D]"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#E3F7EE] flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-[#0F9D63]" />
                    </div>
                    <p className="font-bold text-[#102F57] text-[15px]">All caught up!</p>
                    <p className="text-[13px] text-[#6F87A5] mt-1">No pending employee signup requests.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Audit Logs & Security Trail */}
      <div className="bg-white rounded-[16px] border border-[#DCE8F5] overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#DCE8F5]">
          <div>
            <h2 className="text-[18px] font-bold text-[#102F57] tracking-tight">Audit Logs & Security Trail</h2>
            <p className="text-[13px] text-[#6F87A5] mt-0.5">
              Immutable activity records for compliance, inspections, and DPDP audits.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative border border-[#DCE8F5] rounded-[10px] px-3 pt-1.5 pb-1 bg-white hover:border-[#6F87A5]/40 transition-colors">
              <label className="text-[11px] font-semibold text-[#6F87A5] block leading-none">Action</label>
              <select
                value={auditActionFilter}
                onChange={(e) => setAuditActionFilter(e.target.value)}
                className="bg-transparent text-[13px] font-medium text-[#102F57] outline-none appearance-none pr-4 cursor-pointer mt-0.5"
              >
                <option value="all">All Actions</option>
                <option value="view">View</option>
                <option value="create">Create</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="login">Login</option>
                <option value="export">Export</option>
              </select>
            </div>
            <button
              onClick={handleExportAuditCSV}
              className="h-[40px] px-4 bg-white border border-[#DCE8F5] hover:bg-[#F5F8FC] text-[#0B2B57] rounded-[10px] text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs active:scale-95"
            >
              <Download className="w-4 h-4 text-[#1769EB] stroke-[2]" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#F3F7FC] text-[#6F87A5] font-semibold text-[12px] border-b border-[#DCE8F5]">
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">User</th>
                <th className="py-3 px-5">Action</th>
                <th className="py-3 px-5">Resource</th>
                <th className="py-3 px-5">Details</th>
                <th className="py-3 px-5 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F5]">
              {filteredAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F7FAFF] transition-colors group">
                  {/* Digital clock timestamp */}
                  <td className="py-4 px-5">
                    <TimestampCard date={log.date} time={log.time} />
                  </td>

                  {/* User with role badge */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0", log.user.initialsColor || "bg-[#EAF3FF] text-[#1769EB]")}>
                        {log.user.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-[#102F57] block leading-tight group-hover:text-[#1769EB] transition-colors">{log.user.name}</span>
                        <RoleBadge role={log.user.role} className="mt-0.5" />
                      </div>
                    </div>
                  </td>

                  {/* Action badge with icon */}
                  <td className="py-4 px-5">
                    <ActionBadge action={log.action} />
                  </td>

                  {/* Resource */}
                  <td className="py-4 px-5">
                    <span className="font-semibold text-[#102F57] text-[13px]">{log.resource}</span>
                  </td>

                  {/* Details */}
                  <td className="py-4 px-5 max-w-[280px]">
                    <span className="text-[12px] text-[#6F87A5] line-clamp-2 leading-relaxed">{log.details}</span>
                  </td>

                  {/* IP in monospace chip */}
                  <td className="py-4 px-5 text-right">
                    <span className="font-mono text-[12px] text-[#6F87A5] bg-[#F3F7FC] border border-[#DCE8F5] px-2 py-1 rounded-[6px] whitespace-nowrap">{log.ipAddress}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:px-6 border-t border-[#DCE8F5] flex items-center justify-between text-[13px] text-[#6F87A5]">
          <span>Showing {filteredAuditLogs.length} of {auditLogs.length} log entries</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Logs retained for 90 days · DPDP compliant</span>
          </div>
        </div>
      </div>

      {/* MODAL: Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-md shadow-2xl border border-[#DCE8F5] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#DCE8F5] bg-[#F3F7FC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[9px] bg-[#EAF3FF] flex items-center justify-center text-[#1769EB]">
                  <Users className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#102F57]">Add New Team Member</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#DCE8F5] flex items-center justify-center text-[#6F87A5] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4 text-[13px]">
              <div>
                <label className="block font-semibold text-[#6F87A5] text-[12px] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full h-[42px] px-3.5 border border-[#DCE8F5] rounded-[10px] text-[13px] text-[#102F57] focus:outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all placeholder:text-[#6F87A5]/60"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6F87A5] text-[12px] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="ramesh@expertcompany.com"
                  className="w-full h-[42px] px-3.5 border border-[#DCE8F5] rounded-[10px] text-[13px] text-[#102F57] focus:outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all placeholder:text-[#6F87A5]/60"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6F87A5] text-[12px] mb-1.5">Assign Role *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as "admin" | "sales" | "field" | "space_sales" | "owner")}
                  className="w-full h-[42px] px-3.5 border border-[#DCE8F5] rounded-[10px] text-[13px] text-[#102F57] bg-white focus:outline-none focus:border-[#1769EB] focus:ring-2 focus:ring-[#1769EB]/20 transition-all"
                >
                  <option value="field">Field Staff – Site inspection & GPS survey</option>
                  <option value="sales">Sales – Commercial leasing & client deals</option>
                  <option value="space_sales">Space Sales – Retail & warehouse</option>
                  <option value="owner">Owner – Property landlord view</option>
                  <option value="admin">Admin – Full administrative control</option>
                </select>
              </div>

              <div className="pt-3 flex items-center gap-3 border-t border-[#DCE8F5]">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 h-[42px] rounded-[10px] border border-[#DCE8F5] text-[13px] font-semibold text-[#102F57] hover:bg-[#F5F8FC] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-[42px] rounded-[10px] bg-[#0B2B57] hover:bg-[#071D3F] text-white text-[13px] font-semibold shadow-sm transition-all active:scale-95"
                >
                  Create & Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
