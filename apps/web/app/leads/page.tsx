import { Users } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-[26px] font-bold text-ink-900 tracking-tight">Leads</h1>
        <p className="text-[14px] text-ink-500 mt-1">Manage tenant leads, inquiries, and commercial requirements.</p>
      </div>
      <div className="bg-white rounded-card border border-line p-12 text-center text-ink-500">
        <Users className="w-12 h-12 text-brand-600 mx-auto mb-3" />
        <p className="text-[15px] font-medium text-ink-700">Leads Pipeline</p>
        <p className="text-[13px] text-ink-400 mt-1">Leads management module will be active in upcoming phases.</p>
      </div>
    </div>
  );
}
