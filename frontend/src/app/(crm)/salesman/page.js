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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Salesman" subtitle="Manage Salesman" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Salesman</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            -{" "}
            {viewMode === "add"
              ? "Register Salesman"
              : viewMode === "edit"
              ? "Update Salesman"
              : "Manage Salesman"}{" "}
            - ALL
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            + New Salesman
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Salesman Table Card (Figma salesman.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Dark Navy-to-Teal Header Banner */}
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Manage and Update Master Data Records
              </h2>
            </div>

            {/* Show Entries & Search Bar */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700 focus:outline-none focus:border-[#5948DB]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 rounded px-2.5 py-1 w-44 focus:outline-none focus:border-[#5948DB]"
                />
              </div>
            </div>

            {/* Exact 7-Column Figma Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN ID</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CITY</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>COMMISSION SCHEMES</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ACCESS</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-slate-400 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-slate-800">{row.salesman_name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.salesman_id}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.city}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.commission_schemes}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.access}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.registered_on}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No matching salesman records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                Showing {filteredSalesmen.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredSalesmen.length)} of 56 entries
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition cursor-pointer ${
                      page === 1
                        ? "bg-[#5948DB] text-white font-semibold"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* New Salesman / Edit Salesman Card (Figma new salesman.png & edit.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                {viewMode === "edit" ? "Update Salesperson" : "Salesperson Registration"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 max-w-6xl mx-auto">
              {/* Salesperson ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Salesperson ID
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    disabled={viewMode === "edit"}
                    placeholder="Unique identifier for the salesperson"
                    value={formData.salesman_id}
                    onChange={(e) => setFormData({ ...formData, salesman_id: e.target.value })}
                    className={`w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB] ${
                      viewMode === "edit" ? "bg-[#EDF2F7] text-slate-500 cursor-not-allowed" : "bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* Salesperson Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Salesperson Name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Full name of the salesperson"
                    value={formData.salesman_name}
                    onChange={(e) => setFormData({ ...formData, salesman_name: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Password
                </label>
                <div className="md:col-span-9">
                  <input
                    type="password"
                    placeholder={
                      viewMode === "edit"
                        ? "Leave blank to keep current password"
                        : "Secure password for login"
                    }
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* City */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  City
                </label>
                <div className="md:col-span-9">
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="">Select a city</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
              </div>

              {/* Access */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Access
                </label>
                <div className="md:col-span-9">
                  <select
                    value={formData.access}
                    onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="Salesman">Salesman</option>
                    <option value="Assistant">Assistant</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
              </div>

              {/* Commission Schemes */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Commission Schemes
                </label>
                <div className="md:col-span-9">
                  <select
                    value={formData.commission_schemes}
                    onChange={(e) =>
                      setFormData({ ...formData, commission_schemes: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="">Select commission schem</option>
                    <option value="5gal">5gal</option>
                    <option value="Standard">Standard</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  {viewMode === "edit" ? "Update" : "Register"}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-1.5 rounded bg-[#E53E6A] hover:bg-[#d12c57] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
