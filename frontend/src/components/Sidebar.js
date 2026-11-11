"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
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
  Check,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { useSidebar } from "@/context/SidebarContext";
import { useTerritory } from "@/context/TerritoryContext";

const navigationItems = [
  { name: "Explore", href: "/dashboard?view=explore", icon: Compass },
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
  const { territory, setTerritory } = useTerritory();
  const [showTerritoryPopover, setShowTerritoryPopover] = useState(false);

  const handleLogout = () => {
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  const territoryShortName =
    territory === "AL AIN" ? "AIN" : territory === "ABU DHABI" ? "AD" : "ALL";

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

      {/* iOS Compact Icon-Only Sidebar */}
      <aside
        className={`w-20 bg-white/90 backdrop-blur-2xl border-r border-[#3C3C43]/10 flex flex-col items-center h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-xs transition-transform duration-300 ease-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Logo Header (Top Heading moved to Top Header bar) */}
        <div className="h-16 flex items-center justify-center border-b border-[#3C3C43]/10 shrink-0 w-full relative">
          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            title="Al Qattara Water Delivery CRM"
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-md shadow-[#007AFF]/30 active:scale-95 transition-transform"
          >
            <Droplets className="w-5 h-5 text-white" />
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="absolute right-2 top-2 w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Territory Widget */}
        <div className="pt-3 pb-2 px-2 w-full flex flex-col items-center relative border-b border-[#3C3C43]/10">
          <button
            type="button"
            onClick={() => setShowTerritoryPopover(!showTerritoryPopover)}
            title={`Active Territory: ${territory} (Click to switch)`}
            className="w-12 h-12 rounded-2xl bg-[#F2F2F7] hover:bg-[#E5E5EA] border border-[#3C3C43]/10 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer group shadow-2xs active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-[#007AFF] group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold text-[#1C1C1E] uppercase tracking-tight">
              {territoryShortName}
            </span>
          </button>

          {/* Territory Action Floating iOS Popover */}
          {showTerritoryPopover && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowTerritoryPopover(false)}
              />
              <div className="absolute left-20 top-2 z-50 w-44 bg-white/95 backdrop-blur-2xl border border-[#3C3C43]/15 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-left-2 duration-150">
                <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#007AFF]" />
                  <span>Action Territory</span>
                </div>
                <div className="space-y-1 mt-1">
                  {[
                    { id: "ALL", label: "All Regions" },
                    { id: "AL AIN", label: "Al Ain" },
                    { id: "ABU DHABI", label: "Abu Dhabi" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTerritory(item.id);
                        setShowTerritoryPopover(false);
                        addToast(`Action Territory switched to ${item.label}`, "info");
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        territory === item.id
                          ? "bg-[#007AFF] text-white shadow-xs"
                          : "text-[#1C1C1E] hover:bg-[#F2F2F7]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {territory === item.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation Links - Icons Only with Floating Tooltips */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col items-center gap-1.5 w-full scrollbar-none">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isExplore = item.name === "Explore";
            const isActive = isExplore
              ? pathname === "/dashboard" && typeof window !== "undefined" && window.location.search.includes("view=explore")
              : pathname.startsWith(item.href.split("?")[0]) && item.name !== "Explore";

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className="group relative flex items-center justify-center outline-none select-none"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-150 active:scale-95 ${
                    isActive
                      ? "bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/25"
                      : "text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-[#F2F2F7]"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                </div>

                {/* Floating iOS Label Tooltip */}
                <span className="absolute left-14 px-3 py-1.5 bg-[#1C1C1E] text-white text-[11px] font-semibold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap shadow-xl z-50 translate-x-1 group-hover:translate-x-0">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* iOS Sidebar Logout Button */}
        <div className="py-3 px-2 border-t border-[#3C3C43]/10 w-full flex items-center justify-center shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="group relative w-11 h-11 rounded-2xl bg-[#F2F2F7] hover:bg-[#FF3B30]/10 text-[#8E8E93] hover:text-[#FF3B30] flex items-center justify-center transition-all duration-150 cursor-pointer outline-none active:scale-95"
          >
            <Power className="w-4 h-4 transition-colors" />
            <span className="absolute left-14 px-3 py-1.5 bg-[#FF3B30] text-white text-[11px] font-semibold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 whitespace-nowrap shadow-xl z-50 translate-x-1 group-hover:translate-x-0">
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
