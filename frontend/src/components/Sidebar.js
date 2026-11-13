"use client";

import { useState } from "react";
import Image from "next/image";
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
  X,
  LogOut,
  Check,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { useSidebar } from "@/context/SidebarContext";
import { useTerritory } from "@/context/TerritoryContext";

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

const cities = [
  { id: "ALL", label: "ALL", short: "ALL" },
  { id: "AL AIN", label: "AL_AIN", short: "AIN" },
  { id: "ABU DHABI", label: "ABU_DHABI", short: "AD" },
];

/* Floating label shown beside the rail while collapsed */
function Tip({ children }) {
  return (
    <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#1C1C1E]/92 backdrop-blur-xl text-white text-[11px] font-semibold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 pointer-events-none transition-all duration-150 whitespace-nowrap z-[120]">
      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1C1C1E]/92 rotate-45" />
      {children}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();
  const { isMobileOpen, closeMobileSidebar, isCollapsed, toggleCollapse } = useSidebar();
  const { territory, setTerritory } = useTerritory();
  const [showCityPopover, setShowCityPopover] = useState(false);

  // On mobile the drawer always shows the full sidebar.
  const compact = isCollapsed && !isMobileOpen;

  const activeCity = cities.find((c) => c.id === territory) || cities[0];

  const handleLogout = () => {
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  const selectCity = (city) => {
    setTerritory(city.id);
    setShowCityPopover(false);
    addToast(`City switched to ${city.label}`, "info");
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/25 backdrop-blur-md z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-white/92 backdrop-blur-2xl border-r border-[#3C3C43]/10 flex flex-col h-screen max-h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-none transition-[width,transform] duration-300 ease-out ${
          compact ? "w-[4.5rem]" : "w-[13.5rem]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand — click toggles the rail open/closed */}
        <div
          className={`shrink-0 h-[54px] flex items-center border-b border-[#3C3C43]/8 ${
            compact ? "justify-center px-2" : "justify-between px-3"
          }`}
        >
          <button
            type="button"
            onClick={toggleCollapse}
            title={compact ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!compact}
            className="group relative flex items-center min-w-0 rounded-xl hover:bg-[#007AFF]/8 active:scale-95 transition-all cursor-pointer p-1 outline-none"
          >
            {compact ? (
              <>
                <Image
                  src="/alqattara-mark.svg"
                  alt="Al Qattara"
                  width={64}
                  height={64}
                  priority
                  className="w-9 h-9"
                />
                <Tip>Expand menu</Tip>
              </>
            ) : (
              <Image
                src="/alqattara-logo.svg"
                alt="Al Qattara"
                width={240}
                height={92}
                priority
                className="h-[36px] w-auto"
              />
            )}
          </button>

          {!compact && (
            <button
              type="button"
              onClick={closeMobileSidebar}
              className="lg:hidden w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center text-[#8E8E93] shrink-0"
              aria-label="Close sidebar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 min-h-0 overflow-y-auto no-scrollbar py-1.5 ${
            compact ? "px-2 space-y-0.5" : "px-2.5 space-y-0.5"
          }`}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                title={compact ? item.name : undefined}
                className={`group relative flex items-center rounded-[10px] text-[13px] transition-all duration-150 active:scale-[0.97] outline-none ${
                  compact ? "justify-center h-[34px]" : "gap-2.5 px-2.5 h-[34px]"
                } ${
                  isActive
                    ? "bg-[#007AFF]/10 text-[#007AFF] font-semibold"
                    : "text-[#3C3C43] font-medium hover:bg-[#3C3C43]/6"
                }`}
              >
                {isActive && !compact && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#007AFF]" />
                )}
                <Icon
                  className={`w-[17px] h-[17px] shrink-0 ${
                    isActive ? "text-[#007AFF]" : "text-[#8E8E93]"
                  }`}
                />
                {!compact && <span className="truncate">{item.name}</span>}
                {compact && <Tip>{item.name}</Tip>}
              </Link>
            );
          })}
        </nav>

        {/* City switcher + logout */}
        <div
          className={`shrink-0 border-t border-[#3C3C43]/8 ${
            compact ? "px-2 pt-2 pb-2.5 space-y-2" : "px-3 pt-2.5 pb-3 space-y-2.5"
          }`}
        >
          {compact ? (
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => setShowCityPopover((v) => !v)}
                title={`City: ${activeCity.label}`}
                className="group relative w-full h-[26px] rounded-[8px] bg-[#767680]/12 hover:bg-[#767680]/20 flex items-center justify-center gap-0.5 transition-all active:scale-95 cursor-pointer"
              >
                <MapPin className="w-[11px] h-[11px] text-[#007AFF] shrink-0" />
                <span className="text-[9px] font-bold text-[#1C1C1E] tracking-tight">
                  {activeCity.short}
                </span>
                {!showCityPopover && <Tip>City: {activeCity.label}</Tip>}
              </button>

              {showCityPopover && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setShowCityPopover(false)} />
                  {/* iOS context menu */}
                  <div className="absolute left-full bottom-0 ml-2.5 z-[120] w-48 bg-white/88 backdrop-blur-2xl border border-[#3C3C43]/12 rounded-[14px] shadow-[0_12px_40px_-4px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-bottom-left">
                    <div className="px-3.5 pt-2.5 pb-1.5 text-[11px] font-semibold text-[#8E8E93]">
                      Select City
                    </div>
                    {cities.map((city, i) => (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => selectCity(city)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-[13px] transition cursor-pointer hover:bg-[#767680]/[0.1] active:bg-[#767680]/[0.18] ${
                          i > 0 ? "border-t border-[#3C3C43]/[0.08]" : ""
                        } ${
                          territory === city.id
                            ? "text-[#007AFF] font-semibold"
                            : "text-[#1C1C1E] font-normal"
                        }`}
                      >
                        <span>{city.label}</span>
                        {territory === city.id && (
                          <Check className="w-3.5 h-3.5 text-[#007AFF]" strokeWidth={3} />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              <div className="text-[11px] font-normal text-[#8E8E93] mb-1.5 px-0.5">
                Select City
              </div>
              {/* iOS segmented control: sliding selection, hairline dividers */}
              <div className="relative flex p-[2px] rounded-[9px] bg-[#767680]/12 isolate">
                <span
                  className="absolute top-[2px] bottom-[2px] left-[2px] rounded-[7px] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.04)] transition-transform duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] -z-10"
                  style={{
                    width: `calc((100% - 4px) / ${cities.length})`,
                    transform: `translateX(${
                      cities.findIndex((c) => c.id === territory) * 100
                    }%)`,
                  }}
                  aria-hidden="true"
                />
                {cities.map((city, i) => {
                  const isActive = territory === city.id;
                  const prevActive = i > 0 && cities[i - 1].id === territory;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => selectCity(city)}
                      className={`relative flex-1 min-w-0 h-[22px] rounded-[7px] text-[8.5px] font-semibold tracking-[-0.02em] transition-colors duration-150 cursor-pointer active:scale-[0.96] ${
                        isActive ? "text-[#1C1C1E]" : "text-[#3C3C43]/70 hover:text-[#1C1C1E]"
                      }`}
                    >
                      {i > 0 && (
                        <span
                          className={`absolute left-0 top-[4px] bottom-[4px] w-px bg-[#3C3C43]/18 transition-opacity duration-150 ${
                            isActive || prevActive ? "opacity-0" : "opacity-100"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span className="block whitespace-nowrap">{city.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title={compact ? "Log out" : undefined}
            className={`group relative w-full h-[32px] rounded-[10px] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/18 text-[#FF3B30] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer`}
          >
            <LogOut className="w-[14px] h-[14px] shrink-0" />
            {!compact && "Log out"}
            {compact && <Tip>Log out</Tip>}
          </button>
        </div>
      </aside>
    </>
  );
}
