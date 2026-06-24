import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Briefcase,
  ClipboardCheck,
  IndianRupee,
  TrendingUp,
  UserPlus,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Employees", icon: Users, path: "/employees" },
  { name: "Attendance", icon: CalendarDays, path: "/attendance" },
  { name: "Recruitment", icon: Briefcase, path: "/recruitment" },
  { name: "Interviews", icon: ClipboardCheck, path: "/interviews" },
  { name: "Payroll", icon: IndianRupee, path: "/payroll" },
  { name: "Performance", icon: TrendingUp, path: "/performance" },
  { name: "Onboarding", icon: UserPlus, path: "/onboarding" },
  { name: "Settings", icon: Settings, path: "/settings" },
];