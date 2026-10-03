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
  Info,
  Check,
  UserCheck,
  Briefcase,
  Building,
} from "lucide-react";
import { PropSyncLogo } from "@/components/ui/PropSyncLogo";
import { cn } from "@/lib/utils";

type RoleType = "Admin" | "Field Staff" | "Sales" | "Space Sales" | "Owner";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>("Admin");
  const [email, setEmail] = useState("admin@propsync.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const rolesRow1: { label: RoleType; icon: React.ElementType }[] = [
    { label: "Admin", icon: Shield },
    { label: "Field Staff", icon: UserCheck },
    { label: "Sales", icon: Briefcase },
  ];

  const rolesRow2: { label: RoleType; icon: React.ElementType }[] = [
    { label: "Space Sales", icon: Building },
    { label: "Owner", icon: Shield },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/properties");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#E9EFF8]">
      {/* Left Column: Hero Panel (~41%) */}
      <div className="relative md:w-[41%] min-h-[400px] md:min-h-screen bg-navy-900 overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16">
        {/* Background photo + navy gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 login-hero-overlay" />

        {/* Top: Logo & Tagline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <PropSyncLogo size={36} variant="white" />
            <span className="text-[26px] font-bold tracking-tight text-white font-sans">
              PropSync
            </span>
          </div>
          <p className="text-[16px] text-white/70 mt-1 font-medium tracking-wide">
            Properties · People · Progress
          </p>
        </div>

        {/* Center: Hero Heading */}
        <div className="relative z-10 my-12 md:my-0">
          <h1 className="text-[36px] sm:text-[40px] font-semibold text-white leading-[1.18] max-w-sm">
            Smarter Real Estate Management
          </h1>
          <p className="text-[20px] text-white/80 font-medium mt-3">
            Connect. Track. Grow.
          </p>
          <div className="w-10 h-[3px] bg-brand-teal rounded-full mt-4" />
        </div>

        {/* Bottom: Secure & Trusted info */}
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

      {/* Right Column: Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-[524px] bg-white rounded-login p-8 sm:p-12 shadow-login border border-line">
          {/* Brand header */}
          <div className="flex items-center gap-2.5 mb-5">
            <PropSyncLogo size={30} variant="navy" />
            <span className="text-[22px] font-bold text-navy-900 tracking-tight">
              PropSync
            </span>
          </div>

          <h2 className="text-[30px] font-bold text-ink-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-[14px] text-ink-500 mt-1 mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role chips selection */}
            <div>
              <label className="block text-[14px] font-medium text-ink-700 mb-2.5">
                Login as
              </label>
              <div className="space-y-2">
                {/* Row 1 */}
                <div className="flex flex-wrap gap-2">
                  {rolesRow1.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.label;
                    return (
                      <button
                        type="button"
                        key={r.label}
                        onClick={() => setSelectedRole(r.label)}
                        className={cn(
                          "h-[44px] px-4 rounded-full text-[13px] font-medium inline-flex items-center gap-2 transition-all border",
                          isSelected
                            ? "bg-navy-700 text-white border-navy-700 shadow-xs font-semibold"
                            : "bg-[#EEF2F8] text-navy-800 border-line hover:border-line-strong"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap gap-2">
                  {rolesRow2.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.label;
                    return (
                      <button
                        type="button"
                        key={r.label}
                        onClick={() => setSelectedRole(r.label)}
                        className={cn(
                          "h-[44px] px-4 rounded-full text-[13px] font-medium inline-flex items-center gap-2 transition-all border",
                          isSelected
                            ? "bg-navy-700 text-white border-navy-700 shadow-xs font-semibold"
                            : "bg-[#EEF2F8] text-navy-800 border-line hover:border-line-strong"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="pt-2">
              <div className="relative">
                <Mail className="w-5 h-5 text-ink-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-[58px] pl-12 pr-4 rounded-field border border-line bg-white hover:border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 text-[14px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
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
                  className="w-full h-[58px] pl-12 pr-12 rounded-field border border-line bg-white hover:border-line-strong focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 text-[14px] text-ink-900 placeholder:text-ink-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    "w-[20px] h-[20px] rounded-[5px] flex items-center justify-center transition-colors border",
                    rememberMe
                      ? "bg-brand-teal border-brand-teal text-white"
                      : "border-line bg-white"
                  )}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span className="text-[13px] text-ink-700 font-medium">
                  Remember me
                </span>
              </label>

              <a
                href="#forgot-password"
                className="text-[13px] font-medium text-brand-link hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[58px] rounded-field bg-navy-700 hover:bg-navy-800 text-white font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? "Signing in..." : "Login"}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <span className="relative bg-white px-3 text-[13px] text-ink-400">
              or
            </span>
          </div>

          {/* OAuth & OTP Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.push("/properties")}
              className="h-[52px] px-3 rounded-field border border-line hover:border-line-strong bg-white hover:bg-subtle text-ink-900 text-[13px] font-medium inline-flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/properties")}
              className="h-[52px] px-3 rounded-field border border-line hover:border-line-strong bg-white hover:bg-subtle text-ink-900 text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-ink-700" />
              <span>Login with OTP</span>
            </button>
          </div>

          {/* Pending Approval Info Banner */}
          <div className="mt-6 rounded-[10px] bg-info p-3.5 flex items-start gap-2.5 border border-brand-600/10">
            <Info className="w-4 h-4 text-brand-link flex-shrink-0 mt-0.5" />
            <div className="text-[12px] leading-relaxed">
              <span className="font-semibold text-ink-900 block">
                Account pending approval?
              </span>
              <span className="text-ink-500">
                Your account is under review by the admin. You&apos;ll be notified
                once it&apos;s approved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
