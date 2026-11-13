"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, salesmanFromApi, salesmanToApi } from "@/services/crmMappers";
import { Home, ArrowUpDown, UserCheck, Plus } from "lucide-react";

export default function SalesmanPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const raw = await apiService.getSalesmen();
    if (raw == null) return null;
    return listOf(raw).map(salesmanFromApi);
  }, []);
  const live = useLiveData(loadLive);

  // Tell the user once when the server becomes unreachable, not on every poll.
  const [offlineNotified, setOfflineNotified] = useState(false);
  useEffect(() => {
    if (live.error && !offlineNotified) {
      addToast("Cannot reach the CRM server - showing the last loaded data", "error");
      setOfflineNotified(true);
    }
    if (!live.error && offlineNotified) setOfflineNotified(false);
  }, [live.error, offlineNotified, addToast]);

  const [salesmen, setSalesmen] = useState([]);
  useEffect(() => {
    if (live.data) setSalesmen(live.data);
  }, [live.data]);
  const [viewMode, setViewMode] = useState("list"); // "list" | "add" | "edit"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);

  const [formData, setFormData] = useState({
    salesman_id: "",
    salesman_name: "",
    password: "",
    city: "",
    access: "Salesman",
    commission_schemes: "",
  });

  const filteredSalesmen = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return salesmen;
    return salesmen.filter(
      (s) =>
        s.salesman_name.toLowerCase().includes(q) ||
        s.salesman_id.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.access.toLowerCase().includes(q) ||
        s.registered_on.toLowerCase().includes(q)
    );
  }, [salesmen, searchQuery]);

  const paginatedRows = filteredSalesmen.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openAddView = () => {
    setEditingRow(null);
    setFormData({
      salesman_id: "",
      salesman_name: "",
      password: "",
      city: "",
      access: "Salesman",
      commission_schemes: "",
    });
    setViewMode("add");
  };

  const openEditView = (row) => {
    setEditingRow(row);
    setFormData({
      salesman_id: row.salesman_id,
      salesman_name: row.salesman_name,
      password: "",
      city: row.city,
      access: row.access || "Salesman",
      commission_schemes: row.commission_schemes || "",
    });
    setViewMode("edit");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.salesman_id.trim() || !formData.salesman_name.trim()) {
      addToast("Please enter Salesperson ID and Name", "error");
      return;
    }
    const editing = viewMode === "edit" && editingRow;
    const result = editing
      ? await apiService.updateSalesman(editingRow.id, salesmanToApi(formData))
      : await apiService.createSalesman(salesmanToApi(formData, { isNew: true }));
    if (!result) {
      addToast(
        `Could not save "${formData.salesman_name}" - the ID may already be in use`,
        "error"
      );
      return;
    }
    addToast(
      `Salesperson "${formData.salesman_name}" ${editing ? "updated" : "registered"} successfully`,
      "success"
    );
    await live.refresh();
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Salesman" subtitle="Manage Salesman" />

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Salesman iOS Table Card */
          <div className="ios-surface overflow-hidden">
            {/* Header Banner */}
            <PanelHeader
              icon={UserCheck}
              title="Salesman List"
              subtitle="Sales representative credentials and commission schemes"
              actions={
                <button
                  type="button"
                  onClick={openAddView}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F2F2F7] active:bg-[#E5E5EA] text-[#007AFF] text-[11.5px] shadow-[0_1px_3px_rgba(0,0,0,0.15)] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Salesman
                </button>
              }
              onAction={() => addToast("Exported salesman records", "success")}
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
                  placeholder="Search salesman..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Exact 7-Column Table */}
            <div className="overflow-x-auto">
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CITY</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>COMMISSION SCHEMES</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ACCESS</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.salesman_name}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] font-mono">{row.salesman_id}</td>
                      <td className="py-3.5 px-4 text-[#3C3C43]">{row.city}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.commission_schemes || "-"}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/12 text-[#0062CC] text-[11px] font-semibold">
                          {row.access}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.registered_on}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3.5 py-1 rounded-full bg-[#34C759]/15 hover:bg-[#34C759] text-[#248A3D] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#8E8E93]">
                        No matching salesman records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>
                Showing {filteredSalesmen.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredSalesmen.length)} of 56 entries
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                      page === 1
                        ? "bg-[#007AFF] text-white shadow-xs"
                        : "text-[#3C3C43] hover:bg-black/5"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* New Salesman / Edit Salesman iOS Card */
          <div className="ios-surface overflow-hidden max-w-3xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">
                {viewMode === "edit" ? "Update Salesperson Profile" : "Salesperson Registration"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Salesperson ID</label>
                <input
                  type="text"
                  disabled={viewMode === "edit"}
                  placeholder="Unique identifier for the salesperson"
                  value={formData.salesman_id}
                  onChange={(e) => setFormData({ ...formData, salesman_id: e.target.value })}
                  className={`w-full px-3.5 py-2 text-xs text-[#1C1C1E] ${
                    viewMode === "edit" ? "bg-[#F2F2F7] text-[#8E8E93] cursor-not-allowed" : "bg-white"
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Salesperson Name</label>
                <input
                  type="text"
                  placeholder="Full name of the salesperson"
                  value={formData.salesman_name}
                  onChange={(e) => setFormData({ ...formData, salesman_name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Password</label>
                <input
                  type="password"
                  placeholder={
                    viewMode === "edit"
                      ? "Leave blank to keep current password"
                      : "Secure password for login"
                  }
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
                >
                  <option value="">Select a city</option>
                  <option value="AL_AIN">AL_AIN</option>
                  <option value="ABU_DHABI">ABU_DHABI</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Access</label>
                <select
                  value={formData.access}
                  onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
                >
                  <option value="Salesman">Salesman</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Commission Schemes</label>
                <select
                  value={formData.commission_schemes}
                  onChange={(e) =>
                    setFormData({ ...formData, commission_schemes: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
                >
                  <option value="">Select commission scheme</option>
                  <option value="5gal">5gal</option>
                  <option value="Standard">Standard</option>
                  <option value="Corporate">Corporate</option>
                </select>
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
                  {viewMode === "edit" ? "Update Salesman" : "Register Salesman"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
