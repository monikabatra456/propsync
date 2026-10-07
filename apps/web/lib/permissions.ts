export type UserRole = "admin" | "sales" | "space_sales" | "field" | "owner";

export interface RolePermissions {
  canAccessDashboard: boolean;
  canAccessProperties: boolean;
  canAccessLeads: boolean;
  canAccessReports: boolean;
  canAccessAdmin: boolean;
  canAddProperty: boolean;
  canEditProperty: boolean;
  canDeleteProperty: boolean;
  canExportPPT: boolean;
  canScheduleFollowup: boolean;
  canViewOtherOwnersProperties: boolean;
  canAccessCalendar: boolean;
  canAccessFieldSurvey: boolean;
  canAccessOwnerPortal: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canAccessDashboard: true,
    canAccessProperties: true,
    canAccessLeads: true,
    canAccessReports: true,
    canAccessAdmin: true,
    canAddProperty: true,
    canEditProperty: true,
    canDeleteProperty: true,
    canExportPPT: true,
    canScheduleFollowup: true,
    canViewOtherOwnersProperties: true,
    canAccessCalendar: true,
    canAccessFieldSurvey: true,
    canAccessOwnerPortal: true,
  },
  sales: {
    canAccessDashboard: true,
    canAccessProperties: true,
    canAccessLeads: true,
    canAccessReports: true,
    canAccessAdmin: false,
    canAddProperty: true,
    canEditProperty: true,
    canDeleteProperty: false,
    canExportPPT: true,
    canScheduleFollowup: true,
    canViewOtherOwnersProperties: true,
    canAccessCalendar: true,
    canAccessFieldSurvey: false,
    canAccessOwnerPortal: false,
  },
  space_sales: {
    canAccessDashboard: true,
    canAccessProperties: true,
    canAccessLeads: true,
    canAccessReports: true,
    canAccessAdmin: false,
    canAddProperty: true,
    canEditProperty: true,
    canDeleteProperty: false,
    canExportPPT: true,
    canScheduleFollowup: true,
    canViewOtherOwnersProperties: true,
    canAccessCalendar: true,
    canAccessFieldSurvey: false,
    canAccessOwnerPortal: false,
  },
  field: {
    canAccessDashboard: true,
    canAccessProperties: true,
    canAccessLeads: false,
    canAccessReports: false,
    canAccessAdmin: false,
    canAddProperty: true,
    canEditProperty: true,
    canDeleteProperty: false,
    canExportPPT: false,
    canScheduleFollowup: false,
    canViewOtherOwnersProperties: true,
    canAccessCalendar: false,
    canAccessFieldSurvey: true,
    canAccessOwnerPortal: false,
  },
  owner: {
    canAccessDashboard: true,
    canAccessProperties: true,
    canAccessLeads: false,
    canAccessReports: false,
    canAccessAdmin: false,
    canAddProperty: false,
    canEditProperty: false,
    canDeleteProperty: false,
    canExportPPT: false,
    canScheduleFollowup: false,
    canViewOtherOwnersProperties: false,
    canAccessCalendar: false,
    canAccessFieldSurvey: false,
    canAccessOwnerPortal: true,
  },
};

export function getCurrentUserRole(): UserRole {
  if (typeof window === "undefined") return "admin";
  const stored = localStorage.getItem("expertcompany_current_role");
  if (!stored) return "admin";
  const clean = stored.toLowerCase().replace(/\s+/g, "_") as UserRole;
  if (ROLE_PERMISSIONS[clean]) return clean;
  return "admin";
}

export function setCurrentUserRole(role: UserRole) {
  if (typeof window !== "undefined") {
    localStorage.setItem("expertcompany_current_role", role);
  }
}

export const DEMO_USERS: Record<UserRole, { name: string; email: string; initials: string; title: string }> = {
  admin: { name: "John Doe", email: "admin@expertcompany.com", initials: "JD", title: "System Administrator" },
  sales: { name: "Priya Nair", email: "priya.n@expertcompany.com", initials: "PN", title: "Commercial Leasing Executive" },
  space_sales: { name: "Arjun Kapoor", email: "arjun.k@expertcompany.com", initials: "AK", title: "Space Sales Manager" },
  field: { name: "Rahul Sharma", email: "rahul.s@expertcompany.com", initials: "RS", title: "Field Survey Specialist" },
  owner: { name: "Suresh Gupta", email: "suresh.g@gmail.com", initials: "SG", title: "Property Landlord" },
};
