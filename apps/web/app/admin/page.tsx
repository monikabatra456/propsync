import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-brand-600" />
          <h1 className="text-[26px] font-bold text-ink-900 tracking-tight">Admin Panel</h1>
        </div>
        <p className="text-[14px] text-ink-500 mt-1">Manage users, approvals, system settings, and monitor activity.</p>
      </div>
      <div className="bg-white rounded-card border border-line p-12 text-center text-ink-500">
        <Shield className="w-12 h-12 text-brand-600 mx-auto mb-3" />
        <p className="text-[15px] font-medium text-ink-700">Admin Control Center</p>
        <p className="text-[13px] text-ink-400 mt-1">Full Admin panel matching M5 will be implemented in Phase 11.</p>
      </div>
    </div>
  );
}
