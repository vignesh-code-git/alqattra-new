"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  FileSpreadsheet,
  Users,
  CreditCard,
  BarChart3,
  Wallet,
  MapPin,
  Route as RouteIcon,
  UserCheck,
  Sliders,
  ShieldCheck,
  Droplets,
  X,
  Power,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { useSidebar } from "@/context/SidebarContext";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Utilities", href: "/utilities", icon: Boxes },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Invoices", href: "/invoices", icon: FileSpreadsheet },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Cashier", href: "/cashier", icon: CreditCard },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Zones", href: "/zones", icon: MapPin },
  { name: "Routes", href: "/routes", icon: RouteIcon },
  { name: "Salesman", href: "/salesman", icon: UserCheck },
  { name: "Masters", href: "/masters", icon: Sliders },
  { name: "Privileges", href: "/privileges", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();
  const { isMobileOpen, closeMobileSidebar } = useSidebar();

  const handleLogout = () => {
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-40 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Responsive Original Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-xs transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header with Bluish Water Drop Icon and Typography */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5948DB] to-[#3B82F6] flex items-center justify-center text-white shadow-sm shadow-[#5948DB]/30 shrink-0">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-slate-900 font-semibold text-sm tracking-tight leading-tight flex items-center gap-1.5">
                <span>القطارة</span>
                <span className="text-[#5948DB] font-bold tracking-wide text-xs">AL QATTARA</span>
              </div>
              <div className="text-[10px] text-slate-400 font-normal tracking-wider uppercase">
                Pure Drinking Water CRM
              </div>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links: Vertical list layout with #5948DB styling */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors duration-150 outline-none focus:outline-none select-none group ${
                  isActive
                    ? "bg-[#5948DB]/10 text-[#5948DB] font-semibold shadow-2xs border-[#5948DB]/20"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors shrink-0 ${
                    isActive ? "text-[#5948DB]" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Professional Sidebar Logout Button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            title="Log out from system"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-slate-200/90 hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-colors duration-150 shadow-2xs cursor-pointer outline-none focus:outline-none select-none group"
          >
            <Power className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
