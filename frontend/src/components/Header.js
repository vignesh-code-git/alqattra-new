"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Bell,
  MapPin,
  X,
  Check,
  ChevronDown,
  Menu,
  CheckCheck,
  Trash2,
  Sparkles,
  User,
  Shield,
  Mail,
  Phone,
  Power,
  Droplets,
  Calendar,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  Building,
  Settings,
  CheckSquare,
  Square,
  ListTodo,
  Plus,
  ClipboardCheck,
  AlertCircle,
  Copy,
  FileText,
  Package,
  ShoppingCart,
  Wallet,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { useTerritory } from "@/context/TerritoryContext";
import { useSidebar } from "@/context/SidebarContext";
import HeaderClock from "@/components/HeaderClock";

export default function Header({
  title = "Dashboard Overview",
  subtitle = "Dashboard",
  actions = null,
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const { territory, setTerritory } = useTerritory();
  const { toggleMobileSidebar } = useSidebar();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showMobileTerritory, setShowMobileTerritory] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rouda Al Dhaheri",
    role: "Operations Administrator",
    email: "admin@alqattara.ae",
    phone: "+971 50 123 4567",
    department: "Executive Management",
    initial: "R",
  });

  const [editFormData, setEditFormData] = useState({ ...profile });

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Low Stock Alert", desc: "5-Gallon Polycarbonate stock below 200 bottles", time: "10m ago", unread: true },
    { id: 2, title: "New Corporate Order", desc: "Hilton Al Ain confirmed 120 bottles for delivery", time: "25m ago", unread: true },
    { id: 3, title: "Cashier Settlement", desc: "Day-end cash collection tally ready for review", time: "1h ago", unread: false },
    { id: 4, title: "Route Dispatched", desc: "Route AA-01 driver Mohammed Rashid dispatched", time: "2h ago", unread: false },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleTerritoryChange = (city) => {
    setTerritory(city);
    setShowMobileTerritory(false);
    addToast(`Territory switched to ${city}`, "info");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast("All notifications marked as read", "success");
  };

  const handleClearAll = () => {
    setNotifications([]);
    addToast("All notifications cleared", "info");
  };

  const handleNotificationClick = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    addToast(`Alert: ${item.title} - ${item.desc}`, "info");
  };

  const handleSimulateAlert = () => {
    const id = Date.now();
    const newAlert = {
      id,
      title: "New Instant Order #ORD-2026-" + Math.floor(1000 + Math.random() * 9000),
      desc: "Order received for 50 x 5-Gallon Bottled Water",
      time: "Just now",
      unread: true,
    };
    setNotifications((prev) => [newAlert, ...prev]);
    addToast("Simulated notification: New Order Received!", "success");
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  return (
    <>
      <header
        className="relative h-16 border-b border-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.14)] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors"
        style={{ background: "linear-gradient(180deg, rgba(0,122,255,0.11) 0%, #FFFFFF 100%)" }}
      >
        {/* Left: Mobile Sidebar Toggle + Page Title & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="relative p-1.5 rounded-xl text-[#3C3C43] hover:text-[#1C1C1E] hover:bg-white/70 lg:hidden transition-colors shrink-0"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title & Breadcrumbs */}
          <div className="relative min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#6C6C70] font-normal">
              <span className="text-[#007AFF] font-semibold">CRM</span>
              <ChevronRight className="w-3 h-3 text-[#AEAEB2]" />
              <span className="text-[#6C6C70] truncate">{subtitle}</span>
            </div>
            <h1 className="text-[15px] font-bold text-[#1C1C1E] tracking-tight leading-tight truncate">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Controls: page actions + Date & Clock + Notifications + Profile */}
        <div className="relative flex items-center gap-2 sm:gap-3">
          {actions && (
            <div className="flex items-center gap-2 mr-1 pr-1 border-r border-[#3C3C43]/12">
              {actions}
            </div>
          )}
          <HeaderClock />

          {/* Interactive Notifications Component */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              className="w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all duration-150 relative cursor-pointer outline-none hover:-translate-y-0.5"
              style={{ background: "linear-gradient(160deg, rgba(0,122,255,0.78) 0%, #007AFF 100%)", boxShadow: "0 6px 14px -4px rgba(0,122,255,0.55), inset 0 1px 0 rgba(255,255,255,0.35)" }}
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                {/* iOS Notification Centre: frosted sheet of rounded notification cards */}
                <div className="ios-pop absolute right-0 mt-3 w-[22rem] sm:w-[24rem] rounded-[24px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.06)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="px-4 pt-4 pb-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#007AFF]">
                        {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
                      </div>
                      <h3 className="text-[22px] font-bold text-[#1C1C1E] tracking-[-0.02em] leading-tight">Notifications</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllRead}
                          title="Mark all as read"
                          className="h-7 px-2.5 rounded-full bg-[#007AFF]/12 hover:bg-[#007AFF]/20 text-[#007AFF] text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Read all
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAll}
                          title="Clear all notifications"
                          aria-label="Clear all notifications"
                          className="w-7 h-7 rounded-full bg-[#767680]/12 hover:bg-[#FF3B30]/14 text-[#636366] hover:text-[#FF3B30] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={2.6} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="px-3 pb-3 space-y-2 max-h-[26rem] overflow-y-auto overscroll-contain">
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center">
                        <div
                          className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-white mb-3"
                          style={{ background: "linear-gradient(160deg, rgba(52,199,89,0.8) 0%, #34C759 100%)", boxShadow: "0 8px 18px -6px rgba(52,199,89,0.6)" }}
                        >
                          <CheckCheck className="w-6 h-6" />
                        </div>
                        <p className="text-[14px] font-semibold text-[#1C1C1E]">No Notifications</p>
                        <p className="text-[12px] text-[#8E8E93] mt-0.5">You are all caught up.</p>
                      </div>
                    ) : (
                      notifications.map((n) => {
                        const k = notifKind(n);
                        const KIcon = k.icon;
                        return (
                          <button
                            type="button"
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`w-full text-left rounded-[18px] p-3 flex items-start gap-3 transition-all duration-150 cursor-pointer active:scale-[0.985] border ${
                              n.unread
                                ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.22)] border-white"
                                : "bg-white/55 border-white/60 hover:bg-white/80"
                            }`}
                          >
                            <span
                              className="w-10 h-10 rounded-[11px] flex items-center justify-center text-white shrink-0"
                              style={{ background: `linear-gradient(160deg, ${k.color}C7 0%, ${k.color} 100%)`, boxShadow: `0 6px 14px -6px ${k.color}` }}
                            >
                              <KIcon className="w-[19px] h-[19px]" strokeWidth={2.2} />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.06em]" style={{ color: k.color }}>
                                  {k.app}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10.5px] text-[#8E8E93] shrink-0">
                                  {n.time}
                                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#007AFF]" />}
                                </span>
                              </span>
                              <span className={`block text-[13px] mt-0.5 truncate ${n.unread ? "font-semibold text-[#1C1C1E]" : "font-medium text-[#3C3C43]"}`}>
                                {n.title}
                              </span>
                              <span className="block text-[12px] text-[#6C6C70] leading-snug mt-0.5 line-clamp-2">{n.desc}</span>
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="px-3 pb-3">
                    <button
                      type="button"
                      onClick={handleSimulateAlert}
                      className="w-full h-9 rounded-[12px] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                      style={{ background: "linear-gradient(100deg, #0A84FF 0%, #5E5CE6 100%)", boxShadow: "0 8px 18px -8px rgba(94,92,230,0.7)" }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Simulate Notification
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right-Most Side: Profile Icon with Professional Dropdown Menu & Edit Option */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              className="relative p-0.5 rounded-full hover:ring-2 hover:ring-[#007AFF]/40 transition-colors duration-150 outline-none focus:outline-none select-none cursor-pointer"
              title="User Profile & Account Settings"
              aria-label="User Profile"
            >
              <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(160deg, rgba(175,82,222,0.8) 0%, #AF52DE 100%)", boxShadow: "0 6px 14px -4px rgba(175,82,222,0.55), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
                {profile.initial || profile.name.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34C759] ring-2 ring-white" />
            </button>

          </div>
        </div>
      </header>

      {/* Profile: centred iOS account sheet */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[8px] animate-in fade-in duration-200"
          onClick={() => setShowProfileDropdown(false)}
        >
          <div
            role="dialog"
            aria-label="Account"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px] rounded-[28px] shadow-[0_30px_80px_-16px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 duration-200"
            style={{ background: "linear-gradient(180deg, rgba(175,82,222,0.18) 0%, rgba(0,122,255,0.09) 150px, #F2F2F7 270px)", backgroundColor: "#F2F2F7" }}
          >
            <div className="flex items-center justify-between px-4 pt-3.5">
              <span className="text-[15px] font-semibold text-[#1C1C1E]">Account</span>
              <button
                type="button"
                onClick={() => setShowProfileDropdown(false)}
                className="text-[15px] font-semibold text-[#007AFF] hover:opacity-70 transition-opacity cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Identity */}
            <div className="flex flex-col items-center text-center px-6 pt-4 pb-5">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[30px] font-bold ring-4 ring-white"
                  style={{ background: "linear-gradient(150deg, #5E5CE6 0%, #AF52DE 100%)", boxShadow: "0 14px 30px -10px rgba(175,82,222,0.7)" }}
                >
                  {profile.initial || profile.name.charAt(0)}
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#34C759] ring-[3px] ring-white" />
              </div>
              <h3 className="mt-3 text-[20px] font-bold text-[#1C1C1E] tracking-[-0.02em]">{profile.name}</h3>
              <p className="text-[13px] text-[#6C6C70]">{profile.email}</p>
              <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#007AFF]/12 text-[#007AFF] text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {profile.role}
              </span>
            </div>

            <div className="px-4 pb-4 space-y-3.5">
              {/* Grouped list */}
              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <button
                  type="button"
                  onClick={() => {
                    setEditFormData({ ...profile });
                    setShowEditProfileModal(true);
                    setShowProfileDropdown(false);
                  }}
                  className="group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#767680]/[0.06] active:bg-[#767680]/[0.12] transition-colors cursor-pointer"
                >
                  <AccountTile color="#007AFF" icon={Edit3} />
                  <span className="flex-1 text-left text-[14px] text-[#1C1C1E]">Edit Profile</span>
                  <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#8E8E93] transition-colors" />
                </button>
                <AccountRow color="#34C759" icon={Phone} label="Phone" value={profile.phone} />
                <AccountRow color="#FF9500" icon={Building} label="Department" value={profile.department} />
                <AccountRow
                  color="#FF3B30"
                  icon={MapPin}
                  label="Territory"
                  value={territory === "ALL" ? "All Cities" : territory}
                />
              </div>

              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileDropdown(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FF3B30]/[0.06] active:bg-[#FF3B30]/[0.12] transition-colors cursor-pointer"
                >
                  <AccountTile color="#FF3B30" icon={Power} />
                  <span className="flex-1 text-left text-[14px] font-semibold text-[#FF3B30]">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-[6px] z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="ios-pop bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-[0_24px_64px_-8px_rgba(0,0,0,0.3)] w-full max-w-md p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="ios-pop-head flex items-center justify-between border-b border-[#F2F2F7] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1C1E]">Edit Operator Profile</h3>
                  <span className="text-[11px] text-[#8E8E93]">Update operator credentials & contact info</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="p-1 rounded-md text-[#8E8E93] hover:text-[#636366] hover:bg-[#F2F2F7] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setProfile({
                  ...editFormData,
                  initial: editFormData.name ? editFormData.name.charAt(0).toUpperCase() : "R",
                });
                setShowEditProfileModal(false);
                addToast("Profile details updated successfully!", "success");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-[#3C3C43] font-semibold block mb-1">Full Operator Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="e.g. Rouda Al Dhaheri"
                  className="w-full px-3 py-2 bg-[#F2F2F7] border border-[#E5E5EA] rounded-xl text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#3C3C43] font-semibold block mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="admin@alqattara.ae"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-[#E5E5EA] rounded-xl text-[#1C1C1E] font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="text-[#3C3C43] font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-[#E5E5EA] rounded-xl text-[#1C1C1E] font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#3C3C43] font-semibold block mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    placeholder="Operations Administrator"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-[#E5E5EA] rounded-xl text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="text-[#3C3C43] font-semibold block mb-1">Department</label>
                  <input
                    type="text"
                    value={editFormData.department}
                    onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                    placeholder="Executive Management"
                    className="w-full px-3 py-2 bg-[#F2F2F7] border border-[#E5E5EA] rounded-xl text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F2F2F7]">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5E5EA] hover:bg-[#F2F2F7] text-[#3C3C43] font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

/** What each notification is about: its app label, icon and colour. */
function notifKind(n) {
  const t = `${n.title} ${n.desc}`.toLowerCase();
  if (t.includes("stock")) return { app: "Inventory", icon: Package, color: "#FF9500" };
  if (t.includes("cash") || t.includes("settlement")) return { app: "Cashier", icon: Wallet, color: "#FF2D55" };
  if (t.includes("route") || t.includes("dispatch")) return { app: "Routes", icon: Truck, color: "#32ADE6" };
  if (t.includes("order")) return { app: "Orders", icon: ShoppingCart, color: "#34C759" };
  return { app: "Al Qattara", icon: Bell, color: "#007AFF" };
}

/** iOS Settings-style icon tile. */
function AccountTile({ color, icon: Icon }) {
  return (
    <span
      className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center text-white shrink-0"
      style={{ background: `linear-gradient(160deg, ${color}C7 0%, ${color} 100%)` }}
    >
      <Icon className="w-4 h-4" strokeWidth={2.3} />
    </span>
  );
}

/** One row of the account sheet's grouped list, with an inset hairline above. */
function AccountRow({ color, icon, label, value }) {
  return (
    <div className="relative flex items-center gap-3 px-3 py-2.5 before:absolute before:top-0 before:left-[54px] before:right-0 before:h-px before:bg-[#3C3C43]/[0.1]">
      <AccountTile color={color} icon={icon} />
      <span className="text-[14px] text-[#1C1C1E]">{label}</span>
      <span className="flex-1 min-w-0 text-right text-[13px] text-[#8E8E93] truncate">{value}</span>
    </div>
  );
}
