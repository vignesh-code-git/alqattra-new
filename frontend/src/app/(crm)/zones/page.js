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
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Zones" subtitle="Manage Zones" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-3.5 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight text-[#1C1C1E]">Zones</span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            / {viewMode === "add" ? "New Zone" : "Manage Zones"}
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/20"
          >
            + New Zone
          </button>
        )}
      </div>

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Zones iOS Table Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1C1C1E] to-[#2C2C2E] px-6 py-4">
              <h2 className="text-white font-bold text-[15px] tracking-tight">Manage Delivery Zones</h2>
              <p className="text-white/60 text-[11px] mt-0.5">Route mapping and geographic distribution</p>
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
                  placeholder="Filter zones..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Exact 5-Column Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F2F2F7] border-b border-[#3C3C43]/10 text-[11px] font-semibold text-[#8E8E93] tracking-wider uppercase">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ZONE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ROUTE ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CREATION DATE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>UPDATED AT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ACTIONS</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.zone}</td>
                      <td className="py-3.5 px-4 font-mono text-[#007AFF] font-medium">{row.route_id}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono">{row.creation_date}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono">{row.updated_at}</td>
                      <td className="py-3.5 px-6">
                        <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#8E8E93]">
                        No matching zone records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>
                Showing {filteredZones.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredZones.length)} of 201 entries
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((page) => (
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
                <span className="px-1 text-[#8E8E93]">...</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full text-xs flex items-center justify-center text-[#3C3C43] hover:bg-black/5"
                >
                  21
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Add New Zone iOS Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-[#1C1C1E] to-[#2C2C2E] px-6 py-4">
              <h2 className="text-white font-bold text-[15px] tracking-tight">Add New Zone</h2>
            </div>

            <form onSubmit={handleAddZone} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Zone Name</label>
                <input
                  type="text"
                  placeholder="Enter Zone Name"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Route ID</label>
                <select
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
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
                  Add Zone
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
