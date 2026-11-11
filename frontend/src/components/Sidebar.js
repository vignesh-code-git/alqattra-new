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
      {/* Mobile Backdrop Overlay with iOS Frosted Glass */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* iOS Translucent Sidebar */}
      <aside
        className={`w-64 bg-white/85 backdrop-blur-2xl border-r border-[#3C3C43]/10 flex flex-col h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-xs transition-transform duration-300 ease-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#3C3C43]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-sm shadow-[#007AFF]/30 shrink-0">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[#1C1C1E] font-semibold text-sm tracking-tight leading-tight flex items-center gap-1.5">
                <span>القطارة</span>
                <span className="text-[#007AFF] font-bold tracking-wide text-xs">AL QATTARA</span>
              </div>
              <div className="text-[10px] text-[#8E8E93] font-medium tracking-wider uppercase">
                Water Delivery CRM
              </div>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links with iOS Pill & Highlight States */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[12.5px] font-medium transition-all duration-150 outline-none select-none group ${
                  isActive
                    ? "bg-[#007AFF] text-white font-semibold shadow-sm shadow-[#007AFF]/25"
                    : "text-[#3C3C43] hover:text-[#1C1C1E] hover:bg-[#F2F2F7]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-[#8E8E93] group-hover:text-[#1C1C1E]"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* iOS Sidebar Logout Button */}
        <div className="p-3 border-t border-[#3C3C43]/10 bg-white/40 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            title="Log out from system"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#F2F2F7] hover:bg-[#FF3B30]/10 text-[#3C3C43] hover:text-[#FF3B30] text-xs font-semibold transition-all duration-150 cursor-pointer outline-none group"
          >
            <Power className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-[#FF3B30] transition-colors" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
