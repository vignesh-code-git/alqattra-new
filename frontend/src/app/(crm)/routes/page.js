"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown } from "lucide-react";

const INITIAL_ROUTES = [
  {
    id: 1,
    route_id: "2494",
    city: "ABU_DHABI",
    creation_date: "06/09/2026",
    updated_at: "9/6/2026",
  },
  {
    id: 2,
    route_id: "100001",
    city: "AL_AIN",
    creation_date: "25/11/2025",
    updated_at: "11/25/2025",
  },
  {
    id: 3,
    route_id: "1234",
    city: "AL_AIN",
    creation_date: "25/09/2025",
    updated_at: "9/25/2025",
  },
  {
    id: 4,
    route_id: "9302",
    city: "ABU_DHABI",
    creation_date: "10/09/2025",
    updated_at: "9/10/2025",
  },
  {
    id: 5,
    route_id: "3115",
    city: "ABU_DHABI",
    creation_date: "10/09/2025",
    updated_at: "9/10/2025",
  },
  {
    id: 6,
    route_id: "8066",
    city: "ABU_DHABI",
    creation_date: "12/05/2024",
    updated_at: "5/12/2024",
  },
  {
    id: 7,
    route_id: "6684",
    city: "AL_AIN",
    creation_date: "21/03/2024",
    updated_at: "3/21/2024",
  },
  {
    id: 8,
    route_id: "6358",
    city: "ABU_DHABI",
    creation_date: "12/05/2024",
    updated_at: "5/12/2024",
  },
  {
    id: 9,
    route_id: "6357",
    city: "ABU_DHABI",
    creation_date: "12/05/2024",
    updated_at: "5/12/2024",
  },
  {
    id: 10,
    route_id: "6356",
    city: "AL_AIN",
    creation_date: "21/01/2024",
    updated_at: "1/21/2024",
  },
];

export default function RoutesPage() {
  const { addToast } = useToast();
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [viewMode, setViewMode] = useState("list"); // "list" | "add"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [routeId, setRouteId] = useState("");
  const [city, setCity] = useState("");

  const filteredRoutes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return routes;
    return routes.filter(
      (r) =>
        r.route_id.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.creation_date.toLowerCase().includes(q)
    );
  }, [routes, searchQuery]);

  const paginatedRows = filteredRoutes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openAddView = () => {
    setRouteId("");
    setCity("");
    setViewMode("add");
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    if (!routeId.trim() || !city.trim()) {
      addToast("Please enter Route ID and City", "error");
      return;
    }
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const newEntry = {
      id: Date.now(),
      route_id: routeId.trim(),
      city: city.trim(),
      creation_date: `${dd}/${mm}/${yyyy}`,
      updated_at: `${today.getMonth() + 1}/${today.getDate()}/${yyyy}`,
    };
    setRoutes((prev) => [newEntry, ...prev]);
    addToast(`Route "${routeId}" added successfully`, "success");
    setViewMode("list");
  };

  const handleDelete = (row) => {
    setRoutes((prev) => prev.filter((r) => r.id !== row.id));
    addToast(`Route "${row.route_id}" deleted`, "info");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Routes" subtitle="Manage Routes" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-3.5 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight text-[#1C1C1E]">Routes</span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            / {viewMode === "add" ? "New Route" : "Manage Routes"}
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/20"
          >
            + New Route
          </button>
        )}
      </div>

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Routes iOS Table Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            {/* Header Banner */}
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA]">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">Manage Fleet Routes</h2>
              <p className="text-[#8E8E93] text-[11px] mt-0.5">Assigned city territories and delivery channels</p>
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
                  placeholder="Filter routes..."
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
                  <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] tracking-wider uppercase">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ROUTE ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CITY</span>
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
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.route_id}</td>
                      <td className="py-3.5 px-4 font-medium text-[#007AFF]">{row.city}</td>
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
                        No matching route records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>
                Showing {filteredRoutes.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredRoutes.length)} of 30 entries
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((page) => (
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
          /* Add New Route iOS Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden max-w-2xl mx-auto">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA]">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">Add New Route</h2>
            </div>

            <form onSubmit={handleAddRoute} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Route ID</label>
                <input
                  type="text"
                  placeholder="Enter Route ID"
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
                >
                  <option value="">Select City</option>
                  <option value="AL_AIN">AL_AIN</option>
                  <option value="ABU_DHABI">ABU_DHABI</option>
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
                  Add Route
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
