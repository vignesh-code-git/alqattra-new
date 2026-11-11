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
  Bug,
  CheckSquare,
  Square,
  ListTodo,
  Plus,
  ClipboardCheck,
  AlertCircle,
  Copy,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { useTerritory } from "@/context/TerritoryContext";
import { useSidebar } from "@/context/SidebarContext";

export default function Header({
  title = "Dashboard Overview",
  subtitle = "Dashboard",
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const { territory, setTerritory } = useTerritory();
  const { toggleMobileSidebar } = useSidebar();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showMobileTerritory, setShowMobileTerritory] = useState(false);

  // Developer Bug Tracker & QA Checklist
  const [showBugReportModal, setShowBugReportModal] = useState(false);
  const [bugFilter, setBugFilter] = useState("all"); // "all", "open", "resolved"
  const [showAddBugForm, setShowAddBugForm] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rouda Al Dhaheri",
    role: "Operations Administrator",
    email: "admin@alqattara.ae",
    phone: "+971 50 123 4567",
    department: "Executive Management",
    initial: "R",
  });

  const [editFormData, setEditFormData] = useState({ ...profile });

  // Developer Bug Tracker & QA Checklist
  const [bugs, setBugs] = useState([
    {
      id: "BUG-101",
      title: "Notification icon click error (setShowProfileModal)",
      module: "Header",
      severity: "High",
      resolved: true,
      reported_at: "Today, 19:40",
      description: "Resolved undefined function call on notification popover trigger.",
    },
    {
      id: "BUG-102",
      title: "Sidebar active items border twitch on click",
      module: "Sidebar",
      severity: "Medium",
      resolved: true,
      reported_at: "Today, 19:30",
      description: "Stabilized 1px base border and replaced transition-all with transition-colors.",
    },
    {
      id: "BUG-103",
      title: "Table filter tabs border twitch on state change",
      module: "DataTable",
      severity: "Medium",
      resolved: true,
      reported_at: "Today, 19:32",
      description: "Added constant 1px border across all table filter tabs and buttons.",
    },
    {
      id: "BUG-104",
      title: "Re-add sidebar logout button with power icon",
      module: "Sidebar",
      severity: "Low",
      resolved: true,
      reported_at: "Today, 19:48",
      description: "Restored sidebar bottom sign-out button with clean border and hover state.",
    },
    {
      id: "BUG-105",
      title: "Add offline caching for driver mobile collections",
      module: "Cashier",
      severity: "Low",
      resolved: false,
      reported_at: "Today, 18:15",
      description: "Support offline collection sync for drivers with poor desert cell coverage.",
    },
  ]);

  const [newBug, setNewBug] = useState({
    title: "",
    module: "Orders",
    severity: "Medium",
    description: "",
  });

  // Load persisted QA bugs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("alqattara_qa_bugs_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBugs(parsed);
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const saveBugsToStorage = (updated) => {
    setBugs(updated);
    try {
      localStorage.setItem("alqattara_qa_bugs_v2", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const toggleBugResolved = (bugId) => {
    const updated = bugs.map((b) =>
      b.id === bugId ? { ...b, resolved: !b.resolved } : b
    );
    saveBugsToStorage(updated);
    const target = updated.find((b) => b.id === bugId);
    if (target?.resolved) {
      addToast(`Marked "${target.title}" as Resolved`, "success");
    } else {
      addToast(`Re-opened "${target?.title}" for developer review`, "info");
    }
  };

  const handleCreateBug = (e) => {
    e.preventDefault();
    if (!newBug.title.trim()) {
      addToast("Please enter an issue title", "error");
      return;
    }
    const bugId = `BUG-${Math.floor(100 + Math.random() * 900)}`;
    const created = {
      id: bugId,
      title: newBug.title.trim(),
      module: newBug.module,
      severity: newBug.severity,
      resolved: false,
      reported_at: "Just now",
      description: newBug.description.trim() || "No detailed notes provided.",
    };
    const updated = [created, ...bugs];
    saveBugsToStorage(updated);
    setNewBug({
      title: "",
      module: "Orders",
      severity: "Medium",
      description: "",
    });
    setShowAddBugForm(false);
    addToast(`Added ${bugId}: ${created.title}`, "success");
  };

  const handleDeleteBug = (bugId) => {
    const updated = bugs.filter((b) => b.id !== bugId);
    saveBugsToStorage(updated);
    addToast("Issue removed from tracker", "info");
  };

  const generateBugsNotesFormat = () => {
    const openCount = bugs.filter((b) => !b.resolved).length;
    const resolvedCount = bugs.filter((b) => b.resolved).length;
    const header = [
      "📝 AL QATTARA CRM - DEVELOPER BUG & QA NOTES",
      `Date: 08 Nov 2026 | Total: ${bugs.length} (${resolvedCount} Resolved, ${openCount} Open)`,
      "--------------------------------------------------",
    ];
    const items = bugs.map(
      (b) =>
        `[${b.resolved ? "✓" : " "}] (${b.id}) [${b.severity.toUpperCase()} - ${b.module}] ${b.title}\n    Notes: ${b.description}`
    );
    const footer = [
      "--------------------------------------------------",
      `Status: ${resolvedCount}/${bugs.length} resolved`,
      "Generated from Al Qattara CRM Developer Review Notes",
    ];
    return [...header, ...items, ...footer].join("\n\n");
  };

  const handleCopyNotes = () => {
    const text = generateBugsNotesFormat();
    navigator.clipboard.writeText(text);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2200);
    addToast("Copied bug review notes to clipboard!", "success");
  };

  const openBugsCount = bugs.filter((b) => !b.resolved).length;
  const filteredBugs = bugs.filter((b) => {
    if (bugFilter === "open") return !b.resolved;
    if (bugFilter === "resolved") return b.resolved;
    return true;
  });

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
      <header className="h-16 bg-white/85 backdrop-blur-xl border-b border-[#3C3C43]/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
        {/* Left: Brand Heading moved from Sidebar + Page Title & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors shrink-0"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Sidebar Top Heading moved to Header */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-sm shadow-[#007AFF]/30 shrink-0">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[#1C1C1E] font-bold text-sm tracking-tight leading-tight flex items-center gap-1.5">
                <span>القطارة</span>
                <span className="text-[#007AFF] font-bold tracking-wide text-xs">AL QATTARA</span>
              </div>
              <div className="text-[9.5px] text-[#8E8E93] font-semibold tracking-wider uppercase">
                Water Delivery CRM
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-[#3C3C43]/15 mx-1" />

          {/* Page Title & Breadcrumbs */}
          <div className="min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#8E8E93] font-normal">
              <span className="text-[#007AFF] font-medium">CRM</span>
              <ChevronRight className="w-3 h-3 text-[#8E8E93]" />
              <span className="text-[#3C3C43] truncate">{subtitle}</span>
            </div>
            <h1 className="text-sm font-bold text-[#1C1C1E] tracking-tight leading-tight truncate">
              {title}
            </h1>
          </div>
        </div>

        {/* Center: iOS Segmented Control for Territory */}
        <div className="hidden md:flex items-center bg-[#E5E5EA]/80 p-0.5 rounded-full border border-black/5 shadow-2xs">
          <div className="flex items-center gap-1 pl-2.5 pr-1.5 text-[10px] font-semibold text-[#8E8E93] uppercase tracking-wider">
            <MapPin className="w-3 h-3 text-[#007AFF]" />
            <span>Region</span>
          </div>
          {["ALL", "AL AIN", "ABU DHABI"].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleTerritoryChange(city)}
              className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                territory === city
                  ? "bg-white text-[#1C1C1E] shadow-sm font-semibold"
                  : "text-[#8E8E93] hover:text-[#1C1C1E]"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Mobile Territory Dropdown Selector */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setShowMobileTerritory(!showMobileTerritory)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white border border-[#3C3C43]/15 text-[#007AFF] rounded-full text-[11px] font-semibold shadow-2xs"
          >
            <MapPin className="w-3 h-3 text-[#007AFF]" />
            <span>{territory}</span>
            <ChevronDown className="w-3 h-3 text-[#007AFF]" />
          </button>

          {showMobileTerritory && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMobileTerritory(false)} />
              <div className="absolute right-0 mt-1.5 w-36 bg-white/90 backdrop-blur-xl border border-[#3C3C43]/10 rounded-2xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 text-xs">
                {["ALL", "AL AIN", "ABU DHABI"].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleTerritoryChange(city)}
                    className={`w-full px-3 py-1.5 text-left font-medium flex items-center justify-between ${
                      territory === city ? "bg-[#007AFF]/10 text-[#007AFF] font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{city}</span>
                    {territory === city && <Check className="w-3.5 h-3.5 text-[#007AFF]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Controls: Developer Bug Tracker + Notifications + Profile Icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Developer Bug Tracker & QA Review Report Button */}
          <button
            type="button"
            onClick={() => {
              setShowBugReportModal(true);
              setShowNotifications(false);
              setShowProfileDropdown(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF9500]/10 hover:bg-[#FF9500]/20 border border-[#FF9500]/25 text-[#D77800] text-xs font-semibold transition-all duration-150 outline-none cursor-pointer"
            title="Developer Bug Tracker & Checklist"
          >
            <Bug className="w-3.5 h-3.5 text-[#FF9500] shrink-0" />
            <span className="hidden sm:inline">Report</span>
            {openBugsCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold font-mono">
                {openBugsCount}
              </span>
            ) : (
              <span className="px-1.5 py-0.2 rounded-full bg-[#34C759]/20 text-[#248A3D] text-[9px] font-bold font-mono">
                All Clear
              </span>
            )}
          </button>

          {/* Interactive Notifications Component */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
                setShowBugReportModal(false);
              }}
              className="w-9 h-9 rounded-full bg-[#E5E5EA]/70 hover:bg-[#E5E5EA] text-[#1C1C1E] flex items-center justify-center transition-all duration-150 relative cursor-pointer outline-none"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-[#3C3C43]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/90 backdrop-blur-2xl border border-[#3C3C43]/10 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 text-xs overflow-hidden">
                  {/* Notifications Header */}
                  <div className="px-4 py-3 border-b border-[#3C3C43]/10 bg-white/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1C1C1E]">Notifications</span>
                      {unreadCount > 0 ? (
                        <span className="text-[10px] font-semibold text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded-full">
                          {unreadCount} New
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-[#8E8E93] bg-[#E5E5EA] px-2 py-0.5 rounded-full">
                          All Read
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllRead}
                          className="text-[11px] text-[#007AFF] hover:underline flex items-center gap-1 font-semibold transition-colors"
                          title="Mark all as read"
                        >
                          <CheckCheck className="w-3 h-3" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAll}
                          className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                          title="Clear all notifications"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400">
                        <Bell className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                        <p className="font-medium text-xs">No notifications</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">You are all caught up!</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3 transition-colors cursor-pointer flex items-start gap-2.5 ${
                            n.unread ? "bg-blue-50/40 hover:bg-blue-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="pt-0.5">
                            <span
                              className={`w-2 h-2 rounded-full block ${
                                n.unread ? "bg-[#5948DB] ring-2 ring-blue-200" : "bg-slate-300"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <span
                                className={`text-xs truncate ${
                                  n.unread ? "font-semibold text-slate-900" : "font-normal text-slate-700"
                                }`}
                              >
                                {n.title}
                              </span>
                              <span className="text-[10px] text-slate-400 shrink-0 font-mono">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                              {n.desc}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer with Simulate Live Alert button */}
                  <div className="p-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSimulateAlert}
                      className="text-[11px] text-[#5948DB] hover:text-[#4A3AC9] font-medium flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-[#5948DB]" />
                      <span>Simulate Notification</span>
                    </button>
                    <span className="text-[10px] text-slate-400">Click alert to read</span>
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
                setShowBugReportModal(false);
              }}
              className="relative p-0.5 rounded-full hover:ring-2 hover:ring-[#5948DB]/40 transition-colors duration-150 outline-none focus:outline-none select-none cursor-pointer"
              title="User Profile & Account Settings"
              aria-label="User Profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5948DB] to-[#3B82F6] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {profile.initial || profile.name.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 space-y-3.5 text-xs">
                  {/* Operator Identity Banner */}
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-tr from-[#5948DB]/10 to-blue-50/60 rounded-xl border border-[#5948DB]/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5948DB] to-[#3B82F6] flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0">
                      {profile.initial || profile.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{profile.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Online</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5948DB] font-semibold flex items-center gap-1 mt-0.5">
                        <Shield className="w-3 h-3" />
                        <span className="truncate">{profile.role}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                        {profile.email}
                      </div>
                    </div>
                  </div>

                  {/* Quick Edit Profile Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditFormData({ ...profile });
                      setShowEditProfileModal(true);
                      setShowProfileDropdown(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#5948DB]/10 text-slate-700 hover:text-[#5948DB] font-semibold transition-all border border-slate-200/80 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[#5948DB] group-hover:border-[#5948DB]/30 shadow-2xs">
                        <Edit3 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-semibold">Edit Operator Profile</span>
                        <span className="block text-[10px] text-slate-400 font-normal">Change name, email, phone & details</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#5948DB] transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* Profile Details Snapshot */}
                  <div className="space-y-1.5 text-[11px] bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>Contact:</span>
                      </span>
                      <span className="font-mono text-slate-800 font-medium">{profile.phone}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>Department:</span>
                      </span>
                      <span className="text-slate-800 font-medium">{profile.department}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Active Territory:</span>
                      </span>
                      <span className="text-[#5948DB] font-semibold">{territory === "ALL" ? "All Territories (HQ)" : territory}</span>
                    </div>
                  </div>

                  {/* Bottom Log Out Option */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold transition-all border border-rose-200 shadow-2xs cursor-pointer"
                    >
                      <Power className="w-3.5 h-3.5 text-rose-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#5948DB]/10 text-[#5948DB] flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Edit Operator Profile</h3>
                  <span className="text-[11px] text-slate-400">Update operator credentials & contact info</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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
                <label className="text-slate-700 font-semibold block mb-1">Full Operator Name *</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="e.g. Rouda Al Dhaheri"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="admin@alqattara.ae"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-medium focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    placeholder="Operations Administrator"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Department</label>
                  <input
                    type="text"
                    value={editFormData.department}
                    onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                    placeholder="Executive Management"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Developer Bug Tracker & QA Checklist Modal */}
      {showBugReportModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 text-xs">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 bg-amber-50/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Bug className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Developer Bug Tracker & QA Review</span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      Live Checklist
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Interactive tick/untick checklist for website updates & developer tasks.
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#5948DB] text-slate-700 hover:text-[#5948DB] text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
                  title="Copy notes in formatted checklist text"
                >
                  {copiedNotes ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Notes Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Notes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBugReportModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-lg leading-none"
                  aria-label="Close bug tracker"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Quick Metrics & Progress Bar */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex flex-col gap-2 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-medium">
                    Total Tracked: <strong className="text-slate-900 font-mono">{bugs.length}</strong>
                  </span>
                  <span className="text-rose-600 font-medium">
                    Open / Unticked: <strong className="font-mono">{openBugsCount}</strong>
                  </span>
                  <span className="text-emerald-600 font-medium">
                    Resolved / Ticked: <strong className="font-mono">{bugs.length - openBugsCount}</strong>
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#5948DB]">
                  {Math.round(((bugs.length - openBugsCount) / (bugs.length || 1)) * 100)}% Resolved
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5948DB] transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.round(((bugs.length - openBugsCount) / (bugs.length || 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Filter Tabs & Add Bug Toggle */}
            <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                {[
                  { id: "all", label: "All Items", count: bugs.length },
                  { id: "open", label: "Open / Unticked", count: openBugsCount },
                  { id: "resolved", label: "Resolved / Ticked", count: bugs.length - openBugsCount },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setBugFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none ${
                      bugFilter === tab.id
                        ? "bg-white text-[#5948DB] border-slate-200 shadow-2xs"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1 text-[10px] text-slate-400">({tab.count})</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAddBugForm(!showAddBugForm)}
                className="px-3 py-1 bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-semibold rounded-lg shadow-2xs transition-all active:scale-[0.98] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddBugForm ? "Close Form" : "Report Issue"}</span>
              </button>
            </div>

            {/* Add Bug Form (Collapsible) */}
            {showAddBugForm && (
              <form onSubmit={handleCreateBug} className="p-4 bg-slate-50/90 border-b border-slate-200/90 space-y-3 shrink-0 animate-in fade-in duration-150">
                <div className="font-semibold text-slate-800 text-xs">Report New Bug / Change Request</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="text-slate-600 block text-[11px] mb-1 font-medium">Issue Title *</label>
                    <input
                      type="text"
                      required
                      value={newBug.title}
                      onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                      placeholder="e.g. Table universal filter border twitch..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5948DB]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block text-[11px] mb-1 font-medium">Module</label>
                    <select
                      value={newBug.module}
                      onChange={(e) => setNewBug({ ...newBug, module: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5948DB]"
                    >
                      {["Header", "Sidebar", "DataTable", "Orders", "Cashier", "Customers", "Inventory", "Drivers", "Settings"].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-slate-600 block text-[11px] mb-1 font-medium">Severity</label>
                    <select
                      value={newBug.severity}
                      onChange={(e) => setNewBug({ ...newBug, severity: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5948DB]"
                    >
                      <option value="Low">Low - Cosmetic / Polish</option>
                      <option value="Medium">Medium - Feature Update</option>
                      <option value="High">High - Priority Bug</option>
                      <option value="Critical">Critical - Blocker</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-600 block text-[11px] mb-1 font-medium">Description / Review Notes</label>
                    <input
                      type="text"
                      value={newBug.description}
                      onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
                      placeholder="Brief notes for the developer..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-[#5948DB]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddBugForm(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-semibold rounded-lg shadow-2xs transition-all active:scale-[0.98]"
                  >
                    Add to Checklist
                  </button>
                </div>
              </form>
            )}

            {/* Bug Checklist Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 sm:p-3">
              {filteredBugs.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Bug className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-700 text-xs">No issues found in this view</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {bugFilter === "open"
                      ? "All reported issues have been ticked off and resolved!"
                      : bugFilter === "resolved"
                      ? "No resolved issues yet."
                      : "No bugs reported yet."}
                  </p>
                </div>
              ) : (
                filteredBugs.map((bug) => (
                  <div
                    key={bug.id}
                    className={`py-2 px-2.5 rounded-lg flex items-start justify-between gap-3 transition-colors ${
                      bug.resolved ? "bg-slate-50/60" : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Tick / Untick Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleBugResolved(bug.id)}
                      className="mt-0.5 shrink-0 transition-transform active:scale-90 cursor-pointer outline-none focus:outline-none"
                      title={bug.resolved ? "Click to untick / mark open" : "Click to tick / mark resolved"}
                    >
                      {bug.resolved ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 hover:text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 hover:text-[#5948DB]" />
                      )}
                    </button>

                    {/* Bug Details */}
                    <div
                      onClick={() => toggleBugResolved(bug.id)}
                      className="flex-1 min-w-0 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{bug.id}</span>
                        <span
                          className={`font-semibold text-xs ${
                            bug.resolved ? "line-through text-slate-400" : "text-slate-800"
                          }`}
                        >
                          {bug.title}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {bug.module}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                            bug.severity === "Critical" || bug.severity === "High"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : bug.severity === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {bug.severity}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{bug.reported_at}</span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 line-clamp-2 ${
                          bug.resolved ? "text-slate-400 line-through" : "text-slate-500"
                        }`}
                      >
                        {bug.description}
                      </p>
                    </div>

                    {/* Delete Bug Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteBug(bug.id)}
                      className="p-1 rounded text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                      title="Delete bug item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Note Format Preview Box */}
            <div className="p-3 bg-slate-50/90 border-t border-slate-200/90 shrink-0 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <span>📋 Notes Format Preview</span>
                  <span className="text-slate-400 font-normal">(Formatted for developers)</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyNotes}
                  className="text-[11px] text-[#5948DB] hover:text-[#4A3AC9] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedNotes ? "Copied!" : "Copy Format"}</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-2.5 font-mono text-[11px] text-slate-700 max-h-24 overflow-y-auto leading-relaxed select-all">
                {bugs.map((b) => (
                  <div key={b.id} className="truncate">
                    <span className={b.resolved ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                      [{b.resolved ? "✓" : " "}]
                    </span>{" "}
                    ({b.id}) [{b.severity.toUpperCase()} - {b.module}] {b.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
              <span className="text-[11px] text-slate-500 font-medium">
                {bugs.length - openBugsCount} of {bugs.length} resolved • Review and tick before publishing updates
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyNotes}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedNotes ? "Notes Copied!" : "Copy Notes"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBugReportModal(false)}
                  className="px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-semibold rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
