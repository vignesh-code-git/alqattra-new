"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, routeFromApi } from "@/services/crmMappers";
import { Home, ArrowUpDown, Route, Plus } from "lucide-react";

export default function RoutesPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const [routesRaw, zonesRaw] = await Promise.all([apiService.getRoutes(), apiService.getZones()]);
    if (routesRaw == null) return null;
    const zones = listOf(zonesRaw);
    const zonesById = new Map(zones.map((z) => [z.id, z]));
    return { routes: listOf(routesRaw).map((r) => routeFromApi(r, zonesById)), zones };
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

  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    if (live.data) setRoutes(live.data.routes);
  }, [live.data]);
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

  const handleAddRoute = async (e) => {
    e.preventDefault();
    if (!routeId.trim() || !city.trim()) {
      addToast("Please enter Route ID and City", "error");
      return;
    }
    // Every route belongs to a zone; use the first zone in the chosen city.
    const wanted = city.trim().replace(/_/g, " ").toUpperCase();
    const zone = (live.data?.zones || []).find((z) => z.city === wanted);
    if (!zone) {
      addToast(`No zone exists in ${city} yet - add one on the Zones page first`, "error");
      return;
    }
    const route = await apiService.createRoute({
      code: routeId.trim(),
      name: `Route ${routeId.trim()}`,
      zone: zone.id,
    });
    if (!route) {
      addToast(`Could not save route "${routeId}" - it may already exist`, "error");
      return;
    }
    addToast(`Route "${routeId}" added to zone ${zone.name}`, "success");
    await live.refresh();
    setViewMode("list");
  };

  const handleDelete = async (row) => {
    const result = await apiService.deleteRoute(row.id);
    if (!result) {
      addToast(`Could not delete route "${row.route_id}" - check the CRM server`, "error");
      return;
    }
    addToast(`Route "${row.route_id}" deleted`, "info");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Routes" subtitle="Manage Routes" />

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Routes iOS Table Card */
          <div className="ios-surface overflow-hidden">
            {/* Header Banner */}
            <PanelHeader
              icon={Route}
              title="Fleet Routes"
              subtitle="Assigned city territories and delivery channels"
              actions={
                <button
                  type="button"
                  onClick={openAddView}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F2F2F7] active:bg-[#E5E5EA] text-[#007AFF] text-[11.5px] shadow-[0_1px_3px_rgba(0,0,0,0.15)] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Route
                </button>
              }
              onAction={() => addToast("Exported route records", "success")}
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
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ROUTE ID</span>
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
                        <span>CREATION DATE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>UPDATED AT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ACTIONS</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
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
          <div className="ios-surface overflow-hidden max-w-2xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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
