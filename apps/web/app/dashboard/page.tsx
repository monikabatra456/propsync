import { StatCard } from "@/components/ui/StatCard";
import { Building2, TrendingUp, Users, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-[26px] font-bold text-ink-900 tracking-tight">Dashboard</h1>
        <p className="text-[14px] text-ink-500 mt-1">Portfolio overview, leasing pipeline, and key performance indicators.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard label="Total Properties" value={24} icon={Building2} delta={{ text: "3 new this week", isPositive: true }} />
        <StatCard label="Active Leads" value={38} icon={Users} delta={{ text: "+15% this month", isPositive: true }} />
        <StatCard label="Deals Closed" value={12} icon={CheckCircle} delta={{ text: "4 this month", isPositive: true }} />
        <StatCard label="Revenue Potential" value="₹ 4.8L" icon={TrendingUp} delta={{ text: "+8% vs target", isPositive: true }} />
      </div>
    </div>
  );
}
