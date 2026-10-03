"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  UserCheck,
  Building2,
  HardDrive,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Check,
  X,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Eye,
  Edit,
  Trash2,
  LogIn,
  Share2,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { cn } from "@/lib/utils";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "sales" | "field" | "space_sales" | "owner";
  status: "active" | "disabled";
  lastLogin: string;
  initials: string;
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
  time: string;
  user: {
    name: string;
    role: "admin" | "sales" | "field";
    initials: string;
  };
  action: "view" | "edit" | "delete" | "login" | "create" | "export";
  resource: string;
  details: string;
  ipAddress: string;
}

const INITIAL_USERS: UserItem[] = [
  { id: "u-1", name: "John Doe", email: "john@propsync.com", role: "admin", status: "active", lastLogin: "Just now", initials: "JD" },
  { id: "u-2", name: "Rahul Sharma", email: "rahul.s@propsync.com", role: "field", status: "active", lastLogin: "Today, 11:20 AM", initials: "RS" },
  { id: "u-3", name: "Priya Nair", email: "priya.n@propsync.com", role: "sales", status: "active", lastLogin: "Yesterday, 04:15 PM", initials: "PN" },
  { id: "u-4", name: "Ankit Verma", email: "ankit.v@propsync.com", role: "space_sales", status: "active", lastLogin: "Apr 25, 2025", initials: "AV" },
  { id: "u-5", name: "Deepak Patel", email: "deepak.p@propsync.com", role: "field", status: "active", lastLogin: "Apr 24, 2025", initials: "DP" },
  { id: "u-6", name: "Suresh Gupta", email: "suresh.owner@gmail.com", role: "owner", status: "active", lastLogin: "Apr 23, 2025", initials: "SG" },
  { id: "u-7", name: "Meera Sen", email: "meera.s@propsync.com", role: "sales", status: "disabled", lastLogin: "Apr 18, 2025", initials: "MS" },
  { id: "u-8", name: "Kunal Ghosh", email: "kunal.g@propsync.com", role: "field", status: "active", lastLogin: "Apr 22, 2025", initials: "KG" },
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  { id: "app-1", name: "Vikas Kapoor", email: "vikas.k@propsync.com", roleRequested: "field", department: "Field Operations (Noida)", submittedOn: "Today, 09:30 AM", initials: "VK" },
  { id: "app-2", name: "Tanvi Saxena", email: "tanvi.s@propsync.com", roleRequested: "sales", department: "Commercial Leasing", submittedOn: "Yesterday, 06:10 PM", initials: "TS" },
  { id: "app-3", name: "Ramanathan Iyer", email: "raman.i@propsync.com", roleRequested: "space_sales", department: "Retail Spaces", submittedOn: "Apr 24, 2025", initials: "RI" },
  { id: "app-4", name: "Simran Kaur", email: "simran.k@propsync.com", roleRequested: "field", department: "Site Survey (Gurgaon)", submittedOn: "Apr 23, 2025", initials: "SK" },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "aud-1",
    time: "Apr 26, 2025 • 02:40 PM",
    user: { name: "John Doe", role: "admin", initials: "JD" },
    action: "export",
    resource: "Property Portfolio",
    details: "Exported CSV audit log reports for Q1-2025 compliance audit",
    ipAddress: "192.168.1.45",
  },
  {
    id: "aud-2",
    time: "Apr 26, 2025 • 01:15 PM",
    user: { name: "Rahul Sharma", role: "field", initials: "RS" },
    action: "create",
    resource: "Property #PROP-109",
    details: "Created draft listing with GPS coordinates (28.6139° N, 77.2090° E)",
    ipAddress: "14.139.60.22",
  },
  {
    id: "aud-3",
    time: "Apr 26, 2025 • 11:50 AM",
    user: { name: "Priya Nair", role: "sales", initials: "PN" },
    action: "edit",
    resource: "Commercials #PROP-1",
    details: "Updated rent rate from ₹20 to ₹18/sqft/mo for Sector 62 office",
    ipAddress: "49.36.12.89",
  },
  {
    id: "aud-4",
    time: "Apr 26, 2025 • 10:05 AM",
    user: { name: "John Doe", role: "admin", initials: "JD" },
    action: "login",
    resource: "Auth Session",
    details: "Authenticated via 2FA email verification",
    ipAddress: "192.168.1.45",
  },
  {
    id: "aud-5",
    time: "Apr 25, 2025 • 04:30 PM",
    user: { name: "John Doe", role: "admin", initials: "JD" },
    action: "delete",
    resource: "Property #PROP-99",
    details: "Soft-deleted expired listing for DLF Phase 1 retail unit",
    ipAddress: "192.168.1.45",
  },
  {
    id: "aud-6",
    time: "Apr 25, 2025 • 02:15 PM",
    user: { name: "Priya Nair", role: "sales", initials: "PN" },
    action: "view",
    resource: "Compliance #PROP-1",
    details: "Inspected Fire NOC and Occupancy Certificate validity",
    ipAddress: "49.36.12.89",
  },
];

export default function AdminPage() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const [userSearch, setUserSearch] = useState("");
  const [auditActionFilter, setAuditActionFilter] = useState("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New user form state
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "sales" | "field" | "space_sales" | "owner">("field");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle user status
  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "disabled" : "active" }
          : u
      )
    );
    showToast("User account status updated.");
  };

  // Handle Approvals
  const handleApprove = (item: ApprovalItem) => {
    setApprovals((prev) => prev.filter((a) => a.id !== item.id));
    setUsers((prev) => [
      {
        id: `u-${Date.now()}`,
        name: item.name,
        email: item.email,
        role: item.roleRequested,
        status: "active",
        lastLogin: "Never",
        initials: item.initials,
      },
      ...prev,
    ]);
    showToast(`Approved ${item.name} as ${item.roleRequested}. Notification sent.`);
  };

  const handleReject = (item: ApprovalItem) => {
    setApprovals((prev) => prev.filter((a) => a.id !== item.id));
    showToast(`Rejected signup application for ${item.name}.`);
  };

  // Add user modal submit
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const parts = newUserName.trim().split(" ");
    const initials = (parts[0]?.[0] || "") + (parts[1]?.[0] || parts[0]?.[1] || "");

    setUsers([
      {
        id: `u-${Date.now()}`,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        status: "active",
        lastLogin: "Never",
        initials: initials.toUpperCase(),
      },
      ...users,
    ]);

    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
    showToast("User account created and invitation dispatched.");
  };

  // Export audit logs CSV
  const handleExportAuditCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Time,User,Role,Action,Resource,Details,IP Address"]
        .concat(
          auditLogs.map(
            (log) =>
              `"${log.time}","${log.user.name}","${log.user.role}","${log.action}","${log.resource}","${log.details}","${log.ipAddress}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PropSync_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported to CSV successfully.");
  };

  // Filtered users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Filtered audit logs
  const filteredAuditLogs = auditLogs.filter((log) => {
    if (auditActionFilter === "all") return true;
    return log.action === auditActionFilter;
  });

  return (
    <div className="space-y-7 max-w-7xl mx-auto pb-16">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-field shadow-login text-[13px] font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-brand-teal" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header (M5 Mockup: Shield icon + Admin Panel 26/700 + Last updated) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5 stroke-[2]" />
            </div>
            <h1 className="text-[26px] font-bold text-ink-900 tracking-tight leading-tight">
              Admin Panel
            </h1>
          </div>
          <p className="text-[14px] text-ink-500 mt-1">
            Security governance, user role permissions, signup approvals, and DPDP-compliant audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-ink-500 bg-white px-3 py-1.5 rounded-full border border-line shadow-xs self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#1E9E6A] animate-pulse" />
          <span>Last updated Apr 26, 2025 • 02:45 PM</span>
        </div>
      </div>

      {/* 2. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={Building2}
          label="Total Properties"
          value={247}
          delta={{ text: "+12% from last month", isPositive: true }}
        />
        <StatCard
          icon={UserCheck}
          label="Active Field Agents"
          value={16}
          delta={{ text: "+6% active agents", isPositive: true }}
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value={48}
          delta={{ text: "+8% user growth", isPositive: true }}
        />
        <StatCard
          icon={HardDrive}
          label="Storage Usage"
          value="12.4 GB"
          progress={{ percentage: 12.4, sublabel: "12% of 100 GB cloud quota used" }}
        />
      </div>

      {/* 3. User & Role Management Table (M5 Mockup) */}
      <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-line">
          <div>
            <h2 className="text-[18px] font-bold text-ink-900 tracking-tight">
              User & Role Management
            </h2>
            <p className="text-[13px] text-ink-500">
              Manage accounts, enforce role-based access privileges, and toggle active states.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full h-[34px] pl-8 pr-3 text-[12px] border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
              />
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="h-[34px] px-3.5 bg-navy-700 hover:bg-navy-800 text-white rounded-field text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-subtle border-y border-line text-ink-600 font-semibold text-[12px]">
                <th className="py-2.5 px-4 w-10">
                  <input type="checkbox" className="rounded text-brand-600" />
                </th>
                <th className="py-2.5 px-4">Name & Email</th>
                <th className="py-2.5 px-4">System Role</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Last Login</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-subtle/50 transition-colors">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded text-brand-600" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                        {user.initials}
                      </div>
                      <div>
                        <span className="font-semibold text-ink-900 block leading-tight">
                          {user.name}
                        </span>
                        <span className="text-[12px] text-ink-500 block leading-tight">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors cursor-pointer",
                        user.status === "active"
                          ? "bg-[#E3F6EE] text-[#1E9E6A] hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          user.status === "active" ? "bg-[#1E9E6A]" : "bg-gray-400"
                        )}
                      />
                      <span>{user.status === "active" ? "Active" : "Disabled"}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-ink-600 text-[12px]">{user.lastLogin}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={cn(
                          "w-9 h-5 rounded-full transition-colors relative focus:outline-none p-0.5",
                          user.status === "active" ? "bg-brand-600" : "bg-gray-300"
                        )}
                        aria-label="Toggle user status"
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                            user.status === "active" ? "translate-x-4" : "translate-x-0"
                          )}
                        />
                      </button>
                      <button
                        className="p-1 text-ink-400 hover:text-ink-700 rounded hover:bg-subtle"
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

        <div className="flex items-center justify-between pt-2 text-[12px] text-ink-500">
          <span>Showing 1–{filteredUsers.length} of {users.length} users</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded border border-line bg-white flex items-center justify-center text-ink-400 disabled:opacity-40">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 h-7 rounded bg-navy-900 text-white font-semibold flex items-center justify-center text-[11px]">
              1
            </span>
            <button className="w-7 h-7 rounded border border-line bg-white flex items-center justify-center text-ink-700">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Signup Approvals Queue (M5 Mockup: Dynamic pending chip, Approve / Reject) */}
      <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[18px] font-bold text-ink-900 tracking-tight">
              Signup Approvals Queue
            </h2>
            <span className="bg-[#FFF0D9] text-[#E8870E] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              {approvals.length} pending
            </span>
          </div>

          <span className="text-[12px] font-medium text-ink-400">
            Field staff & broker requests awaiting admin verification
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-subtle border-y border-line text-ink-600 font-semibold text-[12px]">
                <th className="py-2.5 px-4">Applicant</th>
                <th className="py-2.5 px-4">Email</th>
                <th className="py-2.5 px-4">Role Requested</th>
                <th className="py-2.5 px-4">Department / Region</th>
                <th className="py-2.5 px-4">Submitted On</th>
                <th className="py-2.5 px-4 text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {approvals.length > 0 ? (
                approvals.map((item) => (
                  <tr key={item.id} className="hover:bg-subtle/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-info text-brand-600 flex items-center justify-center font-bold text-[11px]">
                          {item.initials}
                        </div>
                        <span className="font-semibold text-ink-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ink-600">{item.email}</td>
                    <td className="py-3 px-4">
                      <RoleBadge role={item.roleRequested} />
                    </td>
                    <td className="py-3 px-4 text-ink-700 text-[12px] font-medium">
                      {item.department}
                    </td>
                    <td className="py-3 px-4 text-ink-500 text-[12px]">{item.submittedOn}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleApprove(item)}
                          className="h-[28px] px-2.5 bg-[#1E9E6A] hover:bg-emerald-700 text-white rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(item)}
                          className="h-[28px] px-2.5 bg-[#FDECEC] border border-red-200 text-[#E5484D] hover:bg-red-100 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-ink-400">
                    <Check className="w-8 h-8 text-[#1E9E6A] mx-auto mb-1" />
                    <p className="font-medium text-ink-700 text-[14px]">All caught up!</p>
                    <p className="text-[12px]">No pending employee signup requests.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Audit Logs Table (M5 Mockup: Filter, Action badges, Details, Export CSV) */}
      <div className="bg-white rounded-card border border-line p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-line">
          <div>
            <h2 className="text-[18px] font-bold text-ink-900 tracking-tight">
              Audit Logs & Security Trail
            </h2>
            <p className="text-[13px] text-ink-500">
              Immutable activity records for compliance, inspections, and DPDP audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={auditActionFilter}
              onChange={(e) => setAuditActionFilter(e.target.value)}
              className="h-[34px] px-2.5 rounded-[8px] border border-line bg-white text-[12px] text-ink-800 cursor-pointer focus:outline-none focus:border-brand-600"
            >
              <option value="all">All Actions</option>
              <option value="view">View</option>
              <option value="create">Create</option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="export">Export</option>
            </select>

            <button
              onClick={handleExportAuditCSV}
              className="h-[34px] px-3.5 bg-white border border-line-strong hover:bg-subtle text-ink-900 rounded-field text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-brand-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-subtle border-y border-line text-ink-600 font-semibold text-[12px]">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">User</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Resource</th>
                <th className="py-2.5 px-4">Details</th>
                <th className="py-2.5 px-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredAuditLogs.map((log) => {
                const actionBadgeStyles: Record<string, string> = {
                  view: "bg-[#E3EEFC] text-[#2563C9]",
                  edit: "bg-[#E3EEFC] text-[#2563C9]",
                  delete: "bg-[#FDECEC] text-[#E5484D]",
                  login: "bg-[#E3F6EE] text-[#1E9E6A]",
                  create: "bg-[#DFF3F3] text-[#1B8F94]",
                  export: "bg-[#FFF0D9] text-[#E8870E]",
                };

                return (
                  <tr key={log.id} className="hover:bg-subtle/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[12px] text-ink-600 whitespace-nowrap">
                      {log.time}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-[10px]">
                          {log.user.initials}
                        </div>
                        <span className="font-semibold text-ink-900">{log.user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase",
                          actionBadgeStyles[log.action] || "bg-gray-100 text-gray-700"
                        )}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-ink-800 text-[12px]">
                      {log.resource}
                    </td>
                    <td className="py-3 px-4 text-ink-600 text-[12px] max-w-sm truncate">
                      {log.details}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[12px] text-ink-500">
                      {log.ipAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-[17px] font-bold text-ink-900">Add New Team Member</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-[13px]">
              <div>
                <label className="block font-medium text-ink-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="ramesh@propsync.com"
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 mb-1">Assign Role *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full h-[38px] px-3 border border-line rounded-[8px] bg-white focus:outline-none focus:border-brand-600"
                >
                  <option value="field">Field Staff (Site inspection & GPS survey)</option>
                  <option value="sales">Sales (Commercial leasing & client deals)</option>
                  <option value="space_sales">Space Sales (Retail & warehouse)</option>
                  <option value="owner">Owner (Property Landlord view)</option>
                  <option value="admin">Admin (Full administrative control)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 border border-line rounded-field text-ink-700 hover:bg-subtle"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-field font-semibold"
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
