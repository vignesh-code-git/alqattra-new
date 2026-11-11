"use client";

import { useState, useEffect } from "react";
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
  const [currentQuery, setCurrentQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentQuery(window.location.search);
    }
  }, [pathname]);

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

      {/* iOS Compact Icon-Only Sidebar - Strictly fits 100vh viewport height without scrollbar */}
      <aside
        className={`w-[4.5rem] bg-white/95 backdrop-blur-2xl border-r border-[#3C3C43]/10 flex flex-col justify-between items-center h-screen max-h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-xs transition-transform duration-300 ease-out py-2 overflow-visible ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* TOP: Brand Logo + Territory Action Pill */}
        <div className="flex flex-col items-center gap-1.5 w-full shrink-0 relative overflow-visible">
          {/* Logo with Blue Border (no blue filled container) */}
          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            title="Al Qattara CRM"
            className="w-9 h-9 rounded-xl border-2 border-[#007AFF] bg-white flex items-center justify-center text-[#007AFF] shadow-2xs hover:bg-[#007AFF]/10 active:scale-95 transition-all group relative"
          >
            <Droplets className="w-5 h-5 text-[#007AFF]" />
            <span className="absolute left-[4.5rem] ml-2 px-2.5 py-1.5 bg-[#1C1C1E] text-white text-[11px] font-semibold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none transition-all duration-150 whitespace-nowrap z-[100] border border-white/10">
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1E] rotate-45 border-l border-b border-white/10" />
              Al Qattara CRM
            </span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={closeMobileSidebar}
            className="absolute right-1 top-1 w-6 h-6 rounded-full bg-[#E5E5EA] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Territory Action Pill */}
          <div className="relative overflow-visible">
            <button
              type="button"
              onClick={() => setShowTerritoryPopover(!showTerritoryPopover)}
              title={`Territory: ${territory} (Click to switch)`}
              className="px-2 py-0.5 rounded-lg bg-[#F2F2F7] hover:bg-[#E5E5EA] border border-[#3C3C43]/12 flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95 group relative"
            >
              <MapPin className="w-2.5 h-2.5 text-[#007AFF]" />
              <span className="text-[9px] font-bold text-[#1C1C1E] uppercase tracking-tight">
                {territoryShortName}
              </span>
              <span className="absolute left-[4.5rem] ml-2 px-2.5 py-1.5 bg-[#1C1C1E] text-white text-[11px] font-semibold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none transition-all duration-150 whitespace-nowrap z-[100] border border-white/10">
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1E] rotate-45 border-l border-b border-white/10" />
                Territory: {territory}
              </span>
            </button>

            {/* Territory Action Floating iOS Popover */}
            {showTerritoryPopover && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTerritoryPopover(false)}
                />
                <div className="absolute left-16 top-0 z-[110] w-44 bg-white/95 backdrop-blur-2xl border border-[#3C3C43]/15 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-left-2 duration-150">
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
                          addToast(`Territory switched to ${item.label}`, "info");
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
        </div>

        {/* MIDDLE: 14 Navigation Icons - Perfectly scaled to fit viewport height */}
        <nav className="flex flex-col items-center gap-0.5 my-auto w-full overflow-visible">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isExplore = item.name === "Explore";
            let isActive = false;
            if (isExplore) {
              isActive = pathname === "/dashboard" && currentQuery.includes("view=explore");
            } else if (item.href === "/dashboard") {
              isActive = pathname === "/dashboard" && !currentQuery.includes("view=explore");
            } else {
              isActive = pathname.startsWith(item.href);
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                onClick={closeMobileSidebar}
                className="group relative flex items-center justify-center w-full py-0.5 outline-none select-none overflow-visible"
              >
                {/* Active Left Indicator Notch */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-r-full bg-[#007AFF] shadow-sm shadow-[#007AFF]/60" />
                )}

                <div
                  className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90 ${
                    isActive
                      ? "bg-[#007AFF] text-white shadow-sm shadow-[#007AFF]/30"
                      : "text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#007AFF]/10"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                </div>

                {/* Visible Floating iOS Tooltip with Active Indicator */}
                <span className="absolute left-[4.5rem] ml-2 px-2.5 py-1.5 bg-[#1C1C1E] text-white text-[11px] font-semibold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none transition-all duration-150 whitespace-nowrap z-[100] flex items-center gap-1.5 border border-white/10">
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1E] rotate-45 border-l border-b border-white/10" />
                  {item.name}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM: Power Logout Icon */}
        <div className="shrink-0 w-full flex items-center justify-center pt-1 border-t border-[#3C3C43]/10 overflow-visible">
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="group relative w-8.5 h-8.5 rounded-xl bg-[#F2F2F7] hover:bg-[#FF3B30]/10 text-[#8E8E93] hover:text-[#FF3B30] flex items-center justify-center transition-all duration-150 cursor-pointer outline-none active:scale-90"
          >
            <Power className="w-4 h-4 transition-colors" />
            <span className="absolute left-[4.5rem] ml-2 px-2.5 py-1.5 bg-[#FF3B30] text-white text-[11px] font-semibold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 pointer-events-none transition-all duration-150 whitespace-nowrap z-[100] border border-white/10">
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF3B30] rotate-45 border-l border-b border-white/10" />
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
