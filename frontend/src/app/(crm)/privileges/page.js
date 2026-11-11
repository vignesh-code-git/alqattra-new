"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown, ChevronDown, X } from "lucide-react";

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

const INITIAL_PRIVILEGES = [
  {
    id: 1,
    class_name: "ADMINA",
    readonly: "",
    read_write:
      "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities,cashier,offer_commission",
    registered_on: "27/10/2025",
  },
  {
    id: 2,
    class_name: "customercare",
    readonly: "dashboard,orders,customers,reports,wallet,zones,routes,salesman",
    read_write: "orders,customers,reports,salesman,cities",
    registered_on: "20/09/2025",
  },
  {
    id: 3,
    class_name: "test",
    readonly: "",
    read_write: "masters,privileges,cashier",
    registered_on: "14/09/2025",
  },
  {
    id: 4,
    class_name: "CASHIER",
    readonly: "dashboard",
    read_write: "orders,customers,reports,salesman,cities,cashier",
    registered_on: "13/09/2025",
  },
  {
    id: 5,
    class_name: "ADMINISTRATOR",
    readonly: "utilities,orders,customers,reports,wallet,zones,routes,salesman,cashier",
    read_write: "cities",
    registered_on: "15/07/2025",
  },
  {
    id: 6,
    class_name: "STORE KEEPER",
    readonly: "utilities",
    read_write: "utilities,cities",
    registered_on: "15/07/2025",
  },
  {
    id: 7,
    class_name: "AAdmin",
    readonly: "",
    read_write:
      "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities,cashier",
    registered_on: "15/07/2025",
  },
  {
    id: 8,
    class_name: "ADMIN",
    readonly: "",
    read_write:
      "dashboard,utilities,orders,customers,reports,wallet,zones,routes,salesman,masters,privileges,cities",
    registered_on: "28/02/2025",
  },
];

export default function PrivilegesPage() {
  const { addToast } = useToast();
  const [privileges, setPrivileges] = useState(INITIAL_PRIVILEGES);
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

  const handleRegister = (e) => {
    e.preventDefault();
    if (!className.trim()) {
      addToast("Please enter a Previlage Class name", "error");
      return;
    }
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const newItem = {
      id: Date.now(),
      class_name: className.trim(),
      readonly: readOnlyModules.join(","),
      read_write: writeModules.join(","),
      registered_on: `${dd}/${mm}/${yyyy}`,
    };
    setPrivileges((prev) => [newItem, ...prev]);
    addToast(`Previlage class "${className}" created successfully`, "success");
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Previlages" subtitle="Manage Previlages" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Previlages</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "add" ? "Create Previlages" : "Manage Previlages"} - ALL
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            Add New
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Privileges Table Card (Figma privillages.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Dark Navy-to-Teal Header Banner */}
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Control and Customize User Access Levels
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

            {/* Exact 4-Column Figma Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>CLASS NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>READONLY</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>READ WRITE</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-slate-800">{row.class_name}</td>
                      <td className="py-3.5 px-4 text-slate-600 break-all">{row.readonly}</td>
                      <td className="py-3.5 px-4 text-slate-600 break-all">{row.read_write}</td>
                      <td className="py-3.5 px-6 text-slate-600 whitespace-nowrap">{row.registered_on}</td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No matching privilege records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                Showing {filteredPrivileges.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
                {Math.min(currentPage * entriesPerPage, filteredPrivileges.length)} of{" "}
                {filteredPrivileges.length} entries
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition cursor-pointer ${
                      currentPage === page
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
          /* Previlage Class Registration Card (Figma add new-1.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-visible">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4 rounded-t-lg">
              <h2 className="text-white font-bold text-base tracking-wide">
                Previlage Class Registration
              </h2>
            </div>

            <form onSubmit={handleRegister} className="p-8 space-y-5 max-w-6xl mx-auto">
              {/* Previlage Class */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Previlage Class
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Class name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* ReadOnly Access */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600 pt-2">
                  ReadOnly Access
                </label>
                <div className="md:col-span-9 relative">
                  <div
                    onClick={() => {
                      setOpenReadOnlyDropdown(!openReadOnlyDropdown);
                      setOpenWriteDropdown(false);
                    }}
                    className="min-h-[36px] w-full border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-700 flex items-center justify-between flex-wrap gap-1.5 cursor-pointer bg-white"
                  >
                    {readOnlyModules.length === 0 ? (
                      <span className="text-slate-400">Select ReadOnly Access</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {readOnlyModules.map((mod) => (
                          <span
                            key={mod}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            {mod}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-rose-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(readOnlyModules, setReadOnlyModules, mod);
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />
                  </div>

                  {openReadOnlyDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded shadow-lg z-20 max-h-48 overflow-y-auto p-2 grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {ALL_MODULES.map((mod) => (
                        <label
                          key={mod}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50 text-xs text-slate-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={readOnlyModules.includes(mod)}
                            onChange={() => toggleModule(readOnlyModules, setReadOnlyModules, mod)}
                            className="rounded border-slate-300 text-[#5948DB]"
                          />
                          <span>{mod}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Write Access */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600 pt-2">
                  Write Access
                </label>
                <div className="md:col-span-9 relative">
                  <div
                    onClick={() => {
                      setOpenWriteDropdown(!openWriteDropdown);
                      setOpenReadOnlyDropdown(false);
                    }}
                    className="min-h-[36px] w-full border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-700 flex items-center justify-between flex-wrap gap-1.5 cursor-pointer bg-white"
                  >
                    {writeModules.length === 0 ? (
                      <span className="text-slate-400">Select Read/Write Access</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {writeModules.map((mod) => (
                          <span
                            key={mod}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            {mod}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-rose-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleModule(writeModules, setWriteModules, mod);
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />
                  </div>

                  {openWriteDropdown && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded shadow-lg z-20 max-h-48 overflow-y-auto p-2 grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {ALL_MODULES.map((mod) => (
                        <label
                          key={mod}
                          className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50 text-xs text-slate-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={writeModules.includes(mod)}
                            onChange={() => toggleModule(writeModules, setWriteModules, mod)}
                            className="rounded border-slate-300 text-[#5948DB]"
                          />
                          <span>{mod}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Register
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
