"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown } from "lucide-react";

const INITIAL_SALESMEN = [
  {
    id: 1,
    salesman_name: "NOOR",
    salesman_id: "32",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "02/05/2026",
  },
  {
    id: 2,
    salesman_name: "Alremeithi",
    salesman_id: "Alremeithi",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "09/04/2026",
  },
  {
    id: 3,
    salesman_name: "LAMIA",
    salesman_id: "LAMIA",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "09/04/2026",
  },
  {
    id: 4,
    salesman_name: "Factory",
    salesman_id: "factory",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "25/11/2025",
  },
  {
    id: 5,
    salesman_name: "ISAHAQ",
    salesman_id: "57",
    city: "ABU_DHABI",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "06/11/2025",
  },
  {
    id: 6,
    salesman_name: "KRISHNADAS",
    salesman_id: "119",
    city: "ABU_DHABI",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "04/10/2025",
  },
  {
    id: 7,
    salesman_name: "KULDEEP",
    salesman_id: "132",
    city: "ABU_DHABI",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "01/10/2025",
  },
  {
    id: 8,
    salesman_name: "HARIS",
    salesman_id: "136",
    city: "ABU_DHABI",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "01/10/2025",
  },
  {
    id: 9,
    salesman_name: "ALTHAF",
    salesman_id: "109",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "16/09/2025",
  },
  {
    id: 10,
    salesman_name: "SAFWAN",
    salesman_id: "99",
    city: "AL_AIN",
    commission_schemes: "",
    access: "Salesman",
    registered_on: "10/09/2025",
  },
];

export default function SalesmanPage() {
  const { addToast } = useToast();
  const [salesmen, setSalesmen] = useState(INITIAL_SALESMEN);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.salesman_id.trim() || !formData.salesman_name.trim()) {
      addToast("Please enter Salesperson ID and Name", "error");
      return;
    }

    if (viewMode === "edit" && editingRow) {
      setSalesmen((prev) =>
        prev.map((s) =>
          s.id === editingRow.id
            ? {
                ...s,
                salesman_name: formData.salesman_name.trim(),
                city: formData.city || s.city,
                access: formData.access || "Salesman",
                commission_schemes: formData.commission_schemes,
              }
            : s
        )
      );
      addToast(`Salesperson "${formData.salesman_name}" updated successfully`, "success");
    } else {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const newEntry = {
        id: Date.now(),
        salesman_id: formData.salesman_id.trim(),
        salesman_name: formData.salesman_name.trim(),
        city: formData.city || "AL_AIN",
        access: formData.access || "Salesman",
        commission_schemes: formData.commission_schemes || "",
        registered_on: `${dd}/${mm}/${yyyy}`,
      };
      setSalesmen((prev) => [newEntry, ...prev]);
      addToast(`Salesperson "${formData.salesman_name}" registered successfully`, "success");
    }
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Salesman" subtitle="Manage Salesman" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-3.5 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight text-[#1C1C1E]">Salesman</span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            / {viewMode === "add" ? "Register Salesman" : viewMode === "edit" ? "Update Salesman" : "Manage Salesman"}
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/20"
          >
            + New Salesman
          </button>
        )}
      </div>

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Salesman iOS Table Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            {/* Header Banner */}
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">
                Manage and Update Master Data Records
              </h2>
              <p className="text-[#8E8E93] text-[11px] mt-0.5">Sales representative credentials and commission schemes</p>
            </div>

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
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#007AFF] text-white text-[11px] font-semibold tracking-wider uppercase">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN ID</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CITY</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>COMMISSION SCHEMES</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ACCESS</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-white/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-white/70 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.salesman_name}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] font-mono">{row.salesman_id}</td>
                      <td className="py-3.5 px-4 text-[#3C3C43]">{row.city}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.commission_schemes || "-"}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-semibold">
                          {row.access}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.registered_on}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3.5 py-1 rounded-full bg-[#34C759] hover:bg-[#2FB34F] text-white text-[11px] font-semibold transition cursor-pointer shadow-xs"
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
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden max-w-3xl mx-auto">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
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
