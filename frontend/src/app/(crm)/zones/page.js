"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown } from "lucide-react";

const INITIAL_ZONES = [
  {
    id: 1,
    zone: "INDUSTRIAL AREA 2 LULU",
    route_id: "6354",
    creation_date: "2026-07-28T13:45:59.484Z",
    updated_at: "2026-07-28T13:45:59.484Z",
  },
  {
    id: 2,
    zone: "Muwaiji-Shaikh Salama",
    route_id: "6335",
    creation_date: "2026-05-14T12:16:07.464Z",
    updated_at: "2026-05-14T12:16:07.464Z",
  },
  {
    id: 3,
    zone: "KHABISI",
    route_id: "6335",
    creation_date: "2025-07-14T08:31:06.303Z",
    updated_at: "2025-07-14T08:31:06.303Z",
  },
  {
    id: 4,
    zone: "ASHAREJ",
    route_id: "6352",
    creation_date: "2025-07-14T08:16:54.063Z",
    updated_at: "2025-07-14T08:16:54.063Z",
  },
  {
    id: 5,
    zone: "MARKHANIA",
    route_id: "6352",
    creation_date: "2025-07-14T08:14:18.899Z",
    updated_at: "2025-07-14T08:14:18.899Z",
  },
  {
    id: 6,
    zone: "MANAZIF",
    route_id: "6350",
    creation_date: "2025-07-14T08:12:35.529Z",
    updated_at: "2025-07-14T08:12:35.529Z",
  },
  {
    id: 7,
    zone: "MUTHARID",
    route_id: "6328",
    creation_date: "2025-07-14T08:08:11.612Z",
    updated_at: "2025-07-14T08:08:11.612Z",
  },
  {
    id: 8,
    zone: "JAHILI",
    route_id: "6354",
    creation_date: "2025-07-14T06:34:26.318Z",
    updated_at: "2025-07-14T06:34:26.318Z",
  },
  {
    id: 9,
    zone: "SAROOJ",
    route_id: "6354",
    creation_date: "2025-07-14T06:33:02.405Z",
    updated_at: "2025-07-14T06:33:02.405Z",
  },
  {
    id: 10,
    zone: "SAROOJ NEW",
    route_id: "6354",
    creation_date: "2025-07-14T06:32:25.280Z",
    updated_at: "2025-07-14T06:32:25.280Z",
  },
];

export default function ZonesPage() {
  const { addToast } = useToast();
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [viewMode, setViewMode] = useState("list"); // "list" | "add"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [zoneName, setZoneName] = useState("");
  const [routeId, setRouteId] = useState("");

  const filteredZones = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return zones;
    return zones.filter(
      (z) =>
        z.zone.toLowerCase().includes(q) ||
        z.route_id.toLowerCase().includes(q) ||
        z.creation_date.toLowerCase().includes(q)
    );
  }, [zones, searchQuery]);

  const paginatedRows = filteredZones.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openAddView = () => {
    setZoneName("");
    setRouteId("");
    setViewMode("add");
  };

  const handleAddZone = (e) => {
    e.preventDefault();
    if (!zoneName.trim() || !routeId.trim()) {
      addToast("Please enter Zone and Route ID", "error");
      return;
    }
    const nowIso = new Date().toISOString();
    const newEntry = {
      id: Date.now(),
      zone: zoneName.trim(),
      route_id: routeId.trim(),
      creation_date: nowIso,
      updated_at: nowIso,
    };
    setZones((prev) => [newEntry, ...prev]);
    addToast(`Zone "${zoneName}" added successfully`, "success");
    setViewMode("list");
  };

  const handleDelete = (row) => {
    setZones((prev) => prev.filter((z) => z.id !== row.id));
    addToast(`Zone "${row.zone}" deleted`, "info");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Zones" subtitle="Manage Zones" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Zones</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "add" ? "New Zone" : "Manage Zones"} - ALL
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            + New Zone
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Zones Table Card (Figma zones.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Dark Navy-to-Teal Header Banner */}
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Manage Zones</h2>
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

            {/* Exact 5-Column Figma Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ZONE</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ROUTE ID</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CREATION DATE</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>UPDATED AT</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ACTIONS</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-slate-800">{row.zone}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.route_id}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.creation_date}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.updated_at}</td>
                      <td className="py-3.5 px-6">
                        <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          className="px-3 py-1 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No matching zone records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                Showing {filteredZones.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredZones.length)} of 201 entries
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((page) => (
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
                <span className="px-1 text-slate-400">...</span>
                <button
                  type="button"
                  className="w-6 h-6 rounded-full text-[11px] flex items-center justify-center text-slate-500 hover:bg-slate-100"
                >
                  21
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Add New Zone Card (Figma new zones.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Add New Zone</h2>
            </div>

            <form onSubmit={handleAddZone} className="p-8 space-y-5 max-w-6xl mx-auto">
              {/* Zone */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Zone
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Zone"
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Route ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Route ID
                </label>
                <div className="md:col-span-9">
                  <select
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="">Select Route ID</option>
                    <option value="6354">6354</option>
                    <option value="6335">6335</option>
                    <option value="6352">6352</option>
                    <option value="6350">6350</option>
                    <option value="6328">6328</option>
                    <option value="2494">2494</option>
                    <option value="100001">100001</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Add Zone
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
