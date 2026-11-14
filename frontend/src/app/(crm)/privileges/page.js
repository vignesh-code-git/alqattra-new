"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import confirmDelete from "@/components/confirmDelete";
import TableIO from "@/components/TableIO";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf } from "@/services/crmMappers";
import { Home, ArrowUpDown, ChevronDown, X, ShieldCheck, Plus } from "lucide-react";

const ALL_MODULES = [
  "dashboard",
  "utilities",
  "orders",
  "customers",
  "reports",
  "wallet",
  "zones",
  "routes",
  "salesman",
  "masters",
  "privileges",
  "cities",
  "cashier",
  "offer_commission",
];

/** Access level from the API -> row shape this page renders. */
function accessLevelFromApi(l) {
  return {
    id: l.id,
    class_name: l.class_name,
    readonly: l.readonly || "",
    read_write: l.read_write || "",
    registered_on: l.registered_on || "-",
  };
}

export default function PrivilegesPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const raw = await apiService.getAccessLevels();
    if (raw == null) return null;
    return listOf(raw).map(accessLevelFromApi);
  }, []);
  const live = useLiveData(loadLive);
  const [privileges, setPrivileges] = useState([]);
  useEffect(() => {
    if (live.data) setPrivileges(live.data);
  }, [live.data]);
  const [viewMode, setViewMode] = useState("list"); // "list" | "add"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [className, setClassName] = useState("");
  const [readOnlyModules, setReadOnlyModules] = useState([]);
  const [writeModules, setWriteModules] = useState([]);
  const [openReadOnlyDropdown, setOpenReadOnlyDropdown] = useState(false);
  const [openWriteDropdown, setOpenWriteDropdown] = useState(false);

  const filteredPrivileges = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return privileges;
    return privileges.filter(
      (p) =>
        p.class_name.toLowerCase().includes(q) ||
        p.readonly.toLowerCase().includes(q) ||
        p.read_write.toLowerCase().includes(q) ||
        p.registered_on.toLowerCase().includes(q)
    );
  }, [privileges, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPrivileges.length / entriesPerPage));
  const paginatedRows = filteredPrivileges.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openAddView = () => {
    setClassName("");
    setReadOnlyModules([]);
    setWriteModules([]);
    setOpenReadOnlyDropdown(false);
    setOpenWriteDropdown(false);
    setViewMode("add");
  };

  const toggleModule = (list, setList, mod) => {
    if (list.includes(mod)) {
      setList(list.filter((m) => m !== mod));
    } else {
      setList([...list, mod]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!className.trim()) {
      addToast("Please enter a Previlage Class name", "error");
      return;
    }
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const created = await apiService.createAccessLevel({
      class_name: className.trim(),
      readonly: readOnlyModules.join(","),
      read_write: writeModules.join(","),
      registered_on: `${dd}/${mm}/${yyyy}`,
    });
    if (!created) {
      addToast("Could not save - check the CRM server", "error");
      return;
    }
    await live.refresh();
    addToast(`Previlage class "${className}" created successfully`, "success");
    setViewMode("list");
  };

  const handleDeletePrivilege = async (row) => {
    const result = await apiService.deleteAccessLevel(row.id);
    if (!result) {
      addToast(`Could not delete "${row.class_name}" - check the CRM server`, "error");
      return;
    }
    addToast(`Deleted access level "${row.class_name}"`, "info");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Previlages" subtitle="Manage Previlages" />

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Privileges iOS Table Card */
          <div className="ios-surface overflow-hidden">
            {/* Header Banner */}
            <PanelHeader
              icon={ShieldCheck}
              title="User Access Levels"
              subtitle="Role-based permission matrix across all modules"
              actions={
                <button
                  type="button"
                  onClick={openAddView}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#5856D6]/10 border border-[#5856D6]/50 text-[#5856D6] text-[11.5px] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              }
              tools={<TableIO name="user-access-levels" onExport={() => addToast("Exported privilege records", "success")} />}
            />

            {/* Show Entries & Search Bar */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#3C3C43]">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E] focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#8E8E93]">Search:</span>
                <input
                  type="text"
                  placeholder="Filter privileges..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Exact 4-Column Table */}
            <div className="overflow-x-auto">
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>CLASS NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>READONLY</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>READ WRITE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.class_name}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono break-all">{row.readonly || "-"}</td>
                      <td className="py-3.5 px-4 text-[#3C3C43] text-xs font-mono break-all">{row.read_write}</td>
                      <td className="py-3.5 px-6 text-[#8E8E93] whitespace-nowrap">{row.registered_on}</td>
                      <td className="py-3.5 px-4 last:pr-6">
                        <button
                          type="button"
                          onClick={async () => (await confirmDelete(`access level "${row.class_name}"`)) && handleDeletePrivilege(row)}
                          className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#8E8E93]">
                        No matching privilege records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>
                Showing {filteredPrivileges.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
                {Math.min(currentPage * entriesPerPage, filteredPrivileges.length)} of{" "}
                {filteredPrivileges.length} entries
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                      currentPage === page
                        ? "bg-white border border-[#007AFF]/60 text-[#007AFF]"
                        : "bg-white border border-[#007AFF]/20 text-[#3C3C43] hover:bg-[#007AFF]/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Previlage Class Registration Card */
          <div className="ios-surface overflow-visible max-w-3xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white rounded-t-3xl">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">
                Previlage Class Registration
              </h2>
            </div>

            <form onSubmit={handleRegister} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Previlage Class</label>
                <input
                  type="text"
                  placeholder="Class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-[#3C3C43]">ReadOnly Access</label>
                <div
                  onClick={() => {
                    setOpenReadOnlyDropdown(!openReadOnlyDropdown);
                    setOpenWriteDropdown(false);
                  }}
                  className="min-h-[40px] w-full border border-black/15 rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] flex items-center justify-between flex-wrap gap-1.5 cursor-pointer bg-white"
                >
                  {readOnlyModules.length === 0 ? (
                    <span className="text-[#8E8E93]">Select ReadOnly Access</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {readOnlyModules.map((mod) => (
                        <span
                          key={mod}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E5E5EA] text-[#1C1C1E] text-[11px] font-medium"
                        >
                          {mod}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-[#FF3B30]"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleModule(readOnlyModules, setReadOnlyModules, mod);
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-[#8E8E93] ml-auto shrink-0" />
                </div>

                {openReadOnlyDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {ALL_MODULES.map((mod) => (
                      <label
                        key={mod}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F2F2F7] text-xs text-[#1C1C1E] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={readOnlyModules.includes(mod)}
                          onChange={() => toggleModule(readOnlyModules, setReadOnlyModules, mod)}
                          className="rounded border-[#C7C7CC] text-[#007AFF]"
                        />
                        <span>{mod}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-[#3C3C43]">Write Access</label>
                <div
                  onClick={() => {
                    setOpenWriteDropdown(!openWriteDropdown);
                    setOpenReadOnlyDropdown(false);
                  }}
                  className="min-h-[40px] w-full border border-black/15 rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] flex items-center justify-between flex-wrap gap-1.5 cursor-pointer bg-white"
                >
                  {writeModules.length === 0 ? (
                    <span className="text-[#8E8E93]">Select Read/Write Access</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {writeModules.map((mod) => (
                        <span
                          key={mod}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#007AFF]/12 text-[#0062CC] text-[11px] font-semibold"
                        >
                          {mod}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-[#FF3B30]"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleModule(writeModules, setWriteModules, mod);
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-[#8E8E93] ml-auto shrink-0" />
                </div>

                {openWriteDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {ALL_MODULES.map((mod) => (
                      <label
                        key={mod}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#F2F2F7] text-xs text-[#1C1C1E] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={writeModules.includes(mod)}
                          onChange={() => toggleModule(writeModules, setWriteModules, mod)}
                          className="rounded border-[#C7C7CC] text-[#007AFF]"
                        />
                        <span>{mod}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#3C3C43]/10">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm shadow-[#007AFF]/25 transition"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
