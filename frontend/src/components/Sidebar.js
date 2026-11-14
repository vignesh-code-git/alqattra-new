"use client";

import { useEffect, useRef, useState } from "react";
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
  Power,
  Check,
  Globe2,
  Building2,
  Landmark,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import MacTrashIcon from "@/components/MacTrashIcon";
import { apiService } from "@/services/api";
import { useSidebar } from "@/context/SidebarContext";
import { useTerritory } from "@/context/TerritoryContext";

// Each page carries its own colour (Apple system colours), used for its icon tile.
const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "#007AFF" },
  { name: "Utilities", href: "/utilities", icon: Boxes, color: "#30B0C7" },
  { name: "Orders", href: "/orders", icon: ShoppingCart, color: "#FF9500" },
  { name: "Invoices", href: "/invoices", icon: FileSpreadsheet, color: "#5856D6" },
  { name: "Customers", href: "/customers", icon: Users, color: "#34C759" },
  { name: "Cashier", href: "/cashier", icon: CreditCard, color: "#FF2D55" },
  { name: "Reports", href: "/reports", icon: BarChart3, color: "#AF52DE" },
  { name: "Wallet", href: "/wallet", icon: Wallet, color: "#FFB000" },
  { name: "Zones", href: "/zones", icon: MapPin, color: "#FF3B30" },
  { name: "Routes", href: "/routes", icon: RouteIcon, color: "#32ADE6" },
  { name: "Salesman", href: "/salesman", icon: UserCheck, color: "#00C7BE" },
  { name: "Masters", href: "/masters", icon: Sliders, color: "#A2845E" },
  { name: "Privileges", href: "/privileges", icon: ShieldCheck, color: "#636366" },
  // Last, like the Trash at the end of the Mac Dock. Drawn as the Mac Trash
  // can rather than a coloured tile.
  { name: "Bin", href: "/bin", mac: true, color: "#8E8E93" },
];

// Territories, each with its own icon tile colour.
const cities = [
  { id: "ALL", label: "All Cities", seg: "ALL", short: "ALL", icon: Globe2, color: "#007AFF" },
  { id: "AL AIN", label: "Al Ain", seg: "AL AIN", short: "AIN", icon: Building2, color: "#34C759" },
  { id: "ABU DHABI", label: "Abu Dhabi", seg: "ABU DHABI", short: "AD", icon: Landmark, color: "#FF9500" },
];

/** iOS app-icon style tile: colour gradient, soft glow, white glyph. */
function tile(color) {
  return {
    background: `linear-gradient(160deg, ${color}C7 0%, ${color} 100%)`,
    boxShadow: `0 4px 10px -3px ${color}8C, inset 0 1px 0 rgba(255,255,255,0.35)`,
  };
}

/* Floating label shown beside the rail while collapsed (brand, city, log out),
   in the same colourful tile style as the menu items' labels. */
function Tip({ children, color = "#007AFF" }) {
  return (
    <span
      className="absolute left-full ml-2 px-2.5 py-1.5 text-white text-[11px] font-semibold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 pointer-events-none transition-all duration-150 whitespace-nowrap z-[120]"
      style={tile(color)}
    >
      <span
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
        style={{ backgroundColor: `${color}D9` }}
      />
      <span className="relative">{children}</span>
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
  const [hovered, setHovered] = useState(null);
  // The menu scrolls, which would clip a label placed inside it, so the
  // collapsed-rail label is drawn once on the sidebar itself, level with
  // the hovered item.
  const [navTip, setNavTip] = useState(null);
  // How many items are in the Bin: the icon shows paper in it when not empty.
  const [binCount, setBinCount] = useState(0);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const items = await apiService.getBin();
      if (alive && Array.isArray(items)) setBinCount(items.length);
    };
    load();
    const t = setInterval(load, 20000);
    window.addEventListener("bin-changed", load);
    return () => {
      alive = false;
      clearInterval(t);
      window.removeEventListener("bin-changed", load);
    };
  }, [pathname]);
  const asideRef = useRef(null);
  // Mac Dock magnification (collapsed rail only): the icon under the pointer
  // swells and its neighbours grow less, easing off over DOCK_RANGE px. Rows
  // grow to make room, so distances use each row's resting position (8px top
  // padding, 40px rows, 4px gaps) to keep the effect steady.
  const [dock, setDock] = useState(null);
  const DOCK_RANGE = 100;
  const DOCK_MAX = 0.55;
  const trackDock = (e) => {
    const nav = e.currentTarget;
    const y = e.clientY - nav.getBoundingClientRect().top + nav.scrollTop;
    setDock(
      navigationItems.map((_, i) => {
        const d = Math.abs(y - (8 + i * 44 + 20));
        if (d >= DOCK_RANGE) return 1;
        return 1 + DOCK_MAX * ((Math.cos((Math.PI * d) / DOCK_RANGE) + 1) / 2);
      })
    );
  };

  // On mobile the drawer always shows the full sidebar.
  const compact = isCollapsed && !isMobileOpen;

  const activeCity = cities.find((c) => c.id === territory) || cities[0];
  const ActiveCityIcon = activeCity.icon;

  const handleLogout = () => {
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  const selectCity = (city) => {
    setTerritory(city.id);
    setShowCityPopover(false);
    addToast(`Territory switched to ${city.label}`, "info");
  };

  const enterItem = (e, item) => {
    setHovered(item.name);
    if (!compact || !asideRef.current) return;
    const nav = e.currentTarget.parentElement;
    setNavTip({
      label: item.name,
      color: item.color,
      idx: navigationItems.indexOf(item),
      navTop: nav.getBoundingClientRect().top - asideRef.current.getBoundingClientRect().top - nav.scrollTop,
    });
  };
  // The label follows its row as the Dock rows above it grow and shrink.
  const tipTop = (t) => {
    const h = (i) => 40 + ((dock?.[i] ?? 1) - 1) * 24;
    let y = t.navTop + 8;
    for (let i = 0; i < t.idx; i++) y += h(i) + 4;
    return y + h(t.idx) / 2;
  };
  const leaveItem = () => {
    setHovered(null);
    setNavTip(null);
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
        ref={asideRef}
        className={`bg-gradient-to-b from-[#F2F7FF] via-[#F6F4FF] to-[#FAF2FF] backdrop-blur-2xl border-r border-[#5E5CE6]/10 flex flex-col h-screen max-h-screen fixed left-0 top-0 z-50 select-none shadow-xl lg:shadow-none transition-[width,transform] duration-300 ease-out ${
          compact ? "w-[4.5rem]" : "w-[13.5rem]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand - click toggles the rail open/closed */}
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
                <Tip color="#007AFF">Expand menu</Tip>
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
          onScroll={() => setNavTip(null)}
          onMouseMove={compact ? trackDock : undefined}
          onMouseLeave={() => setDock(null)}
          className={`flex-1 min-h-0 overflow-y-auto no-scrollbar py-2 ${
            compact ? "px-2 space-y-1" : "px-2.5 space-y-1"
          }`}
        >
          {navigationItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const isHovered = hovered === item.name && !isActive;
            const mag = compact ? dock?.[idx] ?? 1 : 1;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  leaveItem();
                  closeMobileSidebar();
                }}
                onMouseEnter={(e) => enterItem(e, item)}
                onMouseLeave={leaveItem}
                aria-label={compact ? item.name : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`group relative isolate flex items-center text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/40 rounded-[12px] transition-[height,transform] duration-[160ms] ease-out active:scale-[0.96] ${
                  compact ? "justify-center" : "gap-2.5 px-1.5"
                } ${isActive ? "font-semibold text-[#1C1C1E]" : "font-medium text-[#3C3C43]"}`}
                // Dock: rows grow to make room for the swelling icon
                style={{ height: `${40 + (mag - 1) * 24}px` }}
              >
                {/* Selected page: a simple flat highlight in the page's own
                    colour, the way iPad sidebars mark the current item. It
                    deepens when hovered, like every other row. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 rounded-[12px] transition-[opacity,background-color] duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundColor: `${item.color}${isActive && hovered === item.name ? "33" : "1F"}` }}
                />
                {/* Selected page: a short rounded line in its colour at the left */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full ${
                      compact ? "left-0.5" : "left-0"
                    }`}
                    style={{ backgroundColor: item.color }}
                  />
                )}
                {/* Wide sidebar hover: a soft grey platter fades in behind the row.
                    (The collapsed rail magnifies like the Dock instead.) */}
                {!isActive && !compact && (
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 rounded-[12px] bg-[#767680]/[0.12] transition-all duration-200 ease-out ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[0.94]"
                    }`}
                  />
                )}
                {/* Each page has its own colour, shown as a rounded square behind
                    its icon (the way iPhone Settings does it). On the collapsed
                    rail it swells and lifts out towards the page, like the Dock. */}
                {/* Thin divider above the Bin, like the one before the Dock's Trash */}
                {item.mac && (
                  <span aria-hidden="true" className="absolute -top-[3px] left-2 right-2 h-px bg-[#3C3C43]/12" />
                )}
                <span
                  className="relative w-7 h-7 shrink-0 rounded-[8px] flex items-center justify-center transition-transform duration-[160ms] ease-out will-change-transform"
                  style={{
                    ...(item.mac ? {} : tile(item.color)),
                    transform: `translateX(${(mag - 1) * 12}px) scale(${mag})`,
                  }}
                >
                  {item.mac ? (
                    <MacTrashIcon full={binCount > 0} className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.12)]" />
                  ) : (
                    <Icon className="w-[15px] h-[15px] text-white" strokeWidth={2.3} />
                  )}
                </span>
                {!compact && <span className="truncate flex-1">{item.name}</span>}
                {!compact && item.mac && binCount > 0 && (
                  <span className="mr-1 min-w-5 h-5 px-1.5 rounded-full bg-[#8E8E93]/15 text-[#636366] text-[10.5px] font-semibold flex items-center justify-center">
                    {binCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapsed-rail label for the hovered menu item */}
        {compact && navTip && (
          <span
            className="absolute left-full ml-2 -translate-y-1/2 px-2.5 py-1.5 text-white text-[11px] font-semibold rounded-xl shadow-xl pointer-events-none whitespace-nowrap z-[120] animate-in fade-in slide-in-from-left-1 duration-150"
            style={{ top: tipTop(navTip), ...tile(navTip.color) }}
          >
            <span
              className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
              style={{ backgroundColor: `${navTip.color}D9` }}
            />
            <span className="relative">{navTip.label}</span>
          </span>
        )}

        {/* Territory + logout */}
        <div
          className={`shrink-0 border-t border-[#3C3C43]/8 ${
            compact ? "px-2 pt-2.5 pb-3 space-y-2.5" : "px-3 pt-2.5 pb-3 space-y-2.5"
          }`}
        >
          {compact ? (
            <div className="relative flex justify-center">
              <button
                type="button"
                onClick={() => setShowCityPopover((v) => !v)}
                aria-label={`Territory: ${activeCity.label}`}
                className="group relative flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-150 group-hover:scale-105"
                  style={tile(activeCity.color)}
                >
                  <ActiveCityIcon className="w-[17px] h-[17px] text-white" strokeWidth={2.2} />
                </span>
                <span className="text-[9px] font-bold tracking-tight" style={{ color: activeCity.color }}>
                  {activeCity.short}
                </span>
                {!showCityPopover && <Tip color={activeCity.color}>Territory: {activeCity.label}</Tip>}
              </button>

              {showCityPopover && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setShowCityPopover(false)} />
                  {/* iOS context menu */}
                  <div className="ios-pop absolute left-full bottom-0 ml-3 z-[120] w-56 rounded-[16px] shadow-[0_12px_40px_-4px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-bottom-left p-1.5">
                    <div className="flex items-center gap-2 px-2 pt-1 pb-2">
                      <span className="w-6 h-6 rounded-[7px] flex items-center justify-center" style={tile("#FF3B30")}>
                        <MapPin className="w-3.5 h-3.5 text-white" strokeWidth={2.4} />
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#FF3B30]">
                        Territory
                      </span>
                    </div>
                    {cities.map((city) => {
                      const CityIcon = city.icon;
                      const on = territory === city.id;
                      return (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => selectCity(city)}
                          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-[11px] text-[13px] transition cursor-pointer active:scale-[0.98]"
                          style={on ? { backgroundColor: `${city.color}1F` } : undefined}
                          onMouseEnter={(e) => { if (!on) e.currentTarget.style.backgroundColor = `${city.color}12`; }}
                          onMouseLeave={(e) => { if (!on) e.currentTarget.style.backgroundColor = ""; }}
                        >
                          <span className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0" style={tile(city.color)}>
                            <CityIcon className="w-[15px] h-[15px] text-white" strokeWidth={2.3} />
                          </span>
                          <span className={`flex-1 text-left ${on ? "font-semibold text-[#1C1C1E]" : "text-[#3C3C43]"}`}>
                            {city.label}
                          </span>
                          {on && <Check className="w-4 h-4" style={{ color: city.color }} strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2 px-0.5">
                <span className="w-6 h-6 rounded-[7px] flex items-center justify-center" style={tile(activeCity.color)}>
                  <ActiveCityIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.4} />
                </span>
                <div className="leading-tight min-w-0">
                  <div className="text-[9.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: activeCity.color }}>
                    Territory
                  </div>
                  <div className="text-[12px] font-semibold text-[#1C1C1E] truncate">{activeCity.label}</div>
                </div>
              </div>
              {/* iOS segmented control; the selected segment takes the city's colour */}
              <div className="relative flex p-[2px] rounded-[10px] bg-[#767680]/12 isolate">
                <span
                  className="absolute top-[2px] bottom-[2px] left-[2px] rounded-[8px] transition-all duration-[250ms] ease-[cubic-bezier(0.32,0.72,0,1)] -z-10"
                  style={{
                    width: `calc((100% - 4px) / ${cities.length})`,
                    transform: `translateX(${cities.findIndex((c) => c.id === territory) * 100}%)`,
                    ...tile(activeCity.color),
                  }}
                  aria-hidden="true"
                />
                {cities.map((city) => {
                  const isActive = territory === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => selectCity(city)}
                      title={city.label}
                      className={`relative flex-1 min-w-0 h-[24px] rounded-[8px] text-[8.5px] font-bold tracking-[-0.01em] transition-colors duration-150 cursor-pointer active:scale-[0.96] ${
                        isActive ? "text-white" : "text-[#3C3C43]/70 hover:text-[#1C1C1E]"
                      }`}
                    >
                      <span className="block whitespace-nowrap">{city.seg}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Log out: power button */}
          {compact ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Log out"
                className="group relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer active:scale-95 hover:scale-105 transition-transform"
                style={tile("#FF3B30")}
              >
                <Power className="w-[17px] h-[17px] text-white" strokeWidth={2.6} />
                <Tip color="#FF3B30">Log out</Tip>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="group w-full h-[38px] rounded-[12px] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/16 flex items-center gap-2.5 px-1.5 transition-all active:scale-[0.97] cursor-pointer"
            >
              <span
                className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
                style={tile("#FF3B30")}
              >
                <Power className="w-[15px] h-[15px] text-white" strokeWidth={2.6} />
              </span>
              <span className="text-[13px] font-semibold text-[#FF3B30]">Log out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
