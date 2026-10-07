"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  Check,
  UserCheck,
  Briefcase,
  Building,
  KeyRound,
  Info,
} from "lucide-react";
import { ExpertCompanyLogo } from "@/components/ui/ExpertCompanyLogo";
import { cn } from "@/lib/utils";
import { DEMO_USERS, UserRole, setCurrentUserRole } from "@/lib/permissions";

type RoleType = UserRole;

interface RoleDef {
  id: RoleType;
  label: string;
  icon: React.ElementType;
  description: string;
  email: string;
  features: string[];
}

const ROLES: RoleDef[] = [
  {
    id: "admin",
    label: "Admin",
    icon: Shield,
    description: "Full system access",
    email: DEMO_USERS.admin.email,
    features: ["All properties", "User management", "Reports", "Leads", "Admin panel"],
  },
  {
    id: "sales",
    label: "Sales",
    icon: Briefcase,
    description: "Leads & leasing",
    email: DEMO_USERS.sales.email,
    features: ["View & add properties", "Leads pipeline", "Calendar", "PPT export"],
  },
  {
    id: "field",
    label: "Field Staff",
    icon: UserCheck,
    description: "On-site surveys",
    email: DEMO_USERS.field.email,
    features: ["Add properties", "GPS capture", "Photo upload", "Survey tasks"],
  },
  {
    id: "space_sales",
    label: "Space Sales",
    icon: Building,
    description: "Commercial space deals",
    email: DEMO_USERS.space_sales.email,
    features: ["Properties", "Leads", "Calendar", "Reports"],
  },
  {
    id: "owner",
    label: "Owner",
    icon: KeyRound,
    description: "Landlord portal",
    email: DEMO_USERS.owner.email,
    features: ["My properties only", "Rent tracking", "Compliance docs"],
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>("admin");
  const [email, setEmail] = useState(DEMO_USERS.admin.email);
  const [password, setPassword] = useState("Demo@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentUserRole(selectedRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("expertcompany_current_email", email);
    }
    setTimeout(() => {
      setIsLoading(false);
      // Route to role-specific landing page
      if (selectedRole === "field") router.push("/field");
      else if (selectedRole === "owner") router.push("/owner");
      else router.push("/dashboard");
    }, 500);
  };

  const selectedRoleDef = ROLES.find((r) => r.id === selectedRole)!;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E9EFF8]">
      {/* Left Column: Hero Panel */}
      <div className="relative md:w-[41%] min-h-[400px] md:min-h-screen bg-navy-900 overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80')` }}
        />
        <div className="absolute inset-0 login-hero-overlay" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <ExpertCompanyLogo size={36} variant="white" />
            <span className="text-[26px] font-bold tracking-tight text-white font-sans">Expert Company</span>
          </div>
          <p className="text-[16px] text-white/70 mt-1 font-medium tracking-wide">Properties · People · Progress</p>
        </div>

        <div className="relative z-10 my-12 md:my-0">
          <h1 className="text-[36px] sm:text-[40px] font-semibold text-white leading-[1.18] max-w-sm">
            Smarter Real Estate Management
          </h1>
          <p className="text-[20px] text-white/80 font-medium mt-3">Connect. Track. Grow.</p>
          <div className="w-10 h-[3px] bg-brand-teal rounded-full mt-4" />

          {/* Role preview */}
          <div className="mt-8 bg-white/10 rounded-[12px] p-4 border border-white/10 backdrop-blur-xs">
            <p className="text-[11px] text-white/60 font-bold uppercase tracking-wider mb-2">
              Signing in as: {selectedRoleDef.label}
            </p>
            <div className="space-y-1.5">
              {selectedRoleDef.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-white/80">
                  <div className="w-4 h-4 rounded-full bg-brand-teal/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand-teal stroke-[3]" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-start gap-3">
          <Shield className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[15px] font-semibold text-white">Secure & Trusted</p>
            <p className="text-[13px] text-white/70 mt-0.5 max-w-xs">
              Your data is protected with industry standard security.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-[524px] bg-white rounded-login p-8 sm:p-10 shadow-login border border-line">
          <div className="flex items-center gap-2.5 mb-5">
            <ExpertCompanyLogo size={30} variant="navy" />
            <span className="text-[22px] font-bold text-navy-900 tracking-tight">Expert Company</span>
          </div>

          <h2 className="text-[28px] font-bold text-ink-900 tracking-tight">Welcome Back</h2>
          <p className="text-[14px] text-ink-500 mt-1 mb-6">Sign in to your Expert Company account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-[13px] font-semibold text-ink-700 mb-2.5 uppercase tracking-wide">
                Login Role
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      title={`${r.label} – ${r.description}`}
                      className={cn(
                        "flex flex-col items-center py-2.5 px-1 rounded-[8px] text-[11px] font-semibold transition-all border gap-1.5",
                        isSelected
                          ? "bg-navy-900 text-white border-navy-900 shadow-xs"
                          : "bg-[#EEF2F8] text-navy-700 border-line hover:border-navy-400"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isSelected ? "text-brand-teal" : "text-navy-600")} />
                      <span className="text-center leading-tight">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo credentials banner */}
            <div className="bg-info border border-brand-600/10 rounded-[8px] p-3 text-[12px]">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-900">Demo credentials for {selectedRoleDef.label}:</span>
                  <span className="text-ink-500 block mt-0.5">
                    Email: <code className="font-mono text-brand-600">{selectedRoleDef.email}</code>
                    &nbsp;· Password: <code className="font-mono text-brand-600">Demo@1234</code>
                  </span>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <Mail className="w-5 h-5 text-ink-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-[54px] pl-12 pr-4 rounded-field border border-line bg-white hover:border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 text-[14px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Lock className="w-5 h-5 text-ink-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-[54px] pl-12 pr-12 rounded-field border border-line bg-white hover:border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 text-[14px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    "w-[20px] h-[20px] rounded-[5px] flex items-center justify-center transition-colors border",
                    rememberMe ? "bg-brand-teal border-brand-teal text-white" : "border-line bg-white"
                  )}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span className="text-[13px] text-ink-700 font-medium">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[13px] font-medium text-brand-link hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[54px] rounded-field bg-navy-700 hover:bg-navy-800 text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-70"
            >
              <span>{isLoading ? "Signing in..." : `Sign in as ${selectedRoleDef.label}`}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <span className="relative bg-white px-3 text-[13px] text-ink-400">or</span>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setCurrentUserRole(selectedRole);
                router.push(selectedRole === "field" ? "/field" : selectedRole === "owner" ? "/owner" : "/dashboard");
              }}
              className="h-[48px] px-3 rounded-field border border-line hover:border-line-strong bg-white hover:bg-subtle text-ink-900 text-[13px] font-medium inline-flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentUserRole(selectedRole);
                router.push(selectedRole === "field" ? "/field" : selectedRole === "owner" ? "/owner" : "/dashboard");
              }}
              className="h-[48px] px-3 rounded-field border border-line hover:border-line-strong bg-white hover:bg-subtle text-ink-900 text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-ink-700" />
              <span>Phone OTP</span>
            </button>
          </div>

          <p className="text-center text-[13px] text-ink-500 mt-5">
            New to Expert Company?{" "}
            <Link href="/signup" className="text-brand-link font-medium hover:underline">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
