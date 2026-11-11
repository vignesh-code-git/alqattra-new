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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Routes" subtitle="Manage Routes" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Routes</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "add" ? "New Route" : "Manage Routes"} - ALL
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            + New Route
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Routes Table Card (Figma routes.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Dark Navy-to-Teal Header Banner */}
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Manage Routes</h2>
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
                        <span>ROUTE ID</span>
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
                      <td className="py-3.5 px-6 font-medium text-slate-800">{row.route_id}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.city}</td>
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
                        No matching route records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                Showing {filteredRoutes.length === 0 ? 0 : 1} to{" "}
                {Math.min(entriesPerPage, filteredRoutes.length)} of 30 entries
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
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
          /* Add New Route Card (Figma new routes.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Add New Route</h2>
            </div>

            <form onSubmit={handleAddRoute} className="p-8 space-y-5 max-w-6xl mx-auto">
              {/* Route ID */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Route ID
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Route ID"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="">Select City</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Add Route
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
