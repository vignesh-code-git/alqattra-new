"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import confirmDelete from "@/components/confirmDelete";
import TableIO from "@/components/TableIO";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, zoneFromApi, makeCode } from "@/services/crmMappers";
import { Home, ArrowUpDown, MapPin, Plus, ArrowLeft } from "lucide-react";

export default function ZonesPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const [zonesRaw, routesRaw] = await Promise.all([apiService.getZones(), apiService.getRoutes()]);
    if (zonesRaw == null) return null;
    const routes = listOf(routesRaw);
    return { zones: listOf(zonesRaw).map((z) => zoneFromApi(z, routes)), routes };
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

  const [zones, setZones] = useState([]);
  useEffect(() => {
    if (live.data) setZones(live.data.zones);
  }, [live.data]);
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

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (!zoneName.trim() || !routeId.trim()) {
      addToast("Please enter Zone and Route ID", "error");
      return;
    }
    const zone = await apiService.createZone({
      code: makeCode("ZN", zoneName),
      name: zoneName.trim(),
      city: "AL AIN",
    });
    if (!zone) {
      addToast(`Could not save zone "${zoneName}" - check the CRM server`, "error");
      return;
    }
    // Attach the route: create it, or report if that code is already taken.
    const code = routeId.trim();
    const existing = (live.data?.routes || []).find((r) => r.code === code);
    if (existing) {
      addToast(`Zone added. Route ${code} already belongs to ${existing.zone_name || "another zone"}`, "info");
    } else {
      const route = await apiService.createRoute({ code, name: `Route ${code}`, zone: zone.id });
      if (!route) addToast(`Zone added, but route ${code} could not be created`, "error");
      else addToast(`Zone "${zoneName}" added with route ${code}`, "success");
    }
    await live.refresh();
    setViewMode("list");
  };

  const handleDelete = async (row) => {
    // Deleting a zone also deletes its routes on the server, so refuse instead.
    if (row.route_id) {
      addToast(`Zone "${row.zone}" still has route ${row.route_id} - delete or move it first`, "error");
      return;
    }
    const result = await apiService.deleteZone(row.id);
    if (!result) {
      addToast(`Could not delete zone "${row.zone}" - check the CRM server`, "error");
      return;
    }
    addToast(`Zone "${row.zone}" deleted`, "info");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Zones" subtitle="Manage Zones" />

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Zones iOS Table Card */
          <div className="ios-surface overflow-hidden">
            {/* Header Banner */}
            <PanelHeader
              icon={MapPin}
              title="Delivery Zones"
              subtitle="Route mapping and geographic distribution"
             
              actions={
                <button
                  type="button"
                  onClick={openAddView}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#5856D6]/10 border border-[#5856D6]/50 text-[#5856D6] text-[11.5px] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Zone
                </button>
              }
              tools={<TableIO name="delivery-zones" onExport={() => addToast("Exported zone records", "success")} />}
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
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>ZONE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>ROUTE ID</span>
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
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.zone}</td>
                      <td className="py-3.5 px-4 font-mono text-[#007AFF] font-medium">{row.route_id}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono">{row.creation_date}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono">{row.updated_at}</td>
                      <td className="py-3.5 px-6">
                        <button
                          type="button"
                          onClick={async () => (await confirmDelete(`zone "${row.zone}"`)) && handleDelete(row)}
                          className="px-3.5 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer"
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
                        ? "bg-white border border-[#007AFF]/60 text-[#007AFF]"
                        : "bg-white border border-[#007AFF]/20 text-[#3C3C43] hover:bg-[#007AFF]/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1 text-[#8E8E93]">...</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full text-xs flex items-center justify-center bg-white border border-[#007AFF]/20 text-[#3C3C43] hover:bg-[#007AFF]/10"
                >
                  21
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Add New Zone iOS Card */
          <div className="ios-surface overflow-hidden max-w-2xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">Add New Zone</h2>
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
