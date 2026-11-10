"use client";
import React, { useState, useMemo } from "react";
import { Plus, Download, X, Search } from "lucide-react";

const INITIAL_ROUTES = [
  { id: "6335", name: "ROUTE 6335 - AL QATTARA", zone: "Z-01 AL QATTARA SECTOR A", city: "AL_AIN", truck: "T6335", salesman: "32 - ABDULLAHNOOR", status: "ACTIVE" },
  { id: "6338", name: "ROUTE 6338 - AL JIMI", zone: "Z-01 AL QATTARA SECTOR A", city: "AL_AIN", truck: "T6338", salesman: "56 - ANAS", status: "ACTIVE" },
  { id: "6347", name: "ROUTE 6347 - AL JIMI NORTH", zone: "Z-02 AL JIMI CENTRAL", city: "AL_AIN", truck: "T6347", salesman: "47 - HASHIM", status: "ACTIVE" },
  { id: "6339", name: "ROUTE 6339 - ZAKHER", zone: "Z-02 AL JIMI CENTRAL", city: "AL_AIN", truck: "T6339", salesman: "23 - ARSLAN", status: "ACTIVE" },
  { id: "6341", name: "ROUTE 6341 - FALAJ HAZZAA", zone: "Z-03 ZAKHER SOUTH", city: "AL_AIN", truck: "T6341", salesman: "113 - NISAR", status: "ACTIVE" },
  { id: "6357", name: "ROUTE 6357 - AL MUWAIJI", zone: "Z-03 ZAKHER SOUTH", city: "AL_AIN", truck: "T6357", salesman: "109 - ALTHAF", status: "ACTIVE" },
  { id: "8066", name: "ROUTE 8066 - AL TOWAYYA", zone: "Z-04 FALAJ HAZZAA", city: "AL_AIN", truck: "T8066", salesman: "33 - AAMIR SUBAIR", status: "ACTIVE" },
  { id: "6350", name: "ROUTE 6350 - AL MARKHANIYA", zone: "Z-04 FALAJ HAZZAA", city: "AL_AIN", truck: "T6350", salesman: "53 - ALI ABDELAL", status: "ACTIVE" },
  { id: "6354", name: "ROUTE 6354 - SANAIYA", zone: "Z-05 AL MUWAIJI WEST", city: "AL_AIN", truck: "T6354", salesman: "100 - AMJATH", status: "ACTIVE" },
  { id: "6343", name: "ROUTE 6343 - AL HILI", zone: "Z-05 AL MUWAIJI WEST", city: "AL_AIN", truck: "T6343", salesman: "77 - ANFAS", status: "ACTIVE" },
];

export default function RoutesPage() {
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [zoneFilter, setZoneFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [appliedFilters, setAppliedFilters] = useState({ zone: "ALL", status: "ALL" });

  // Modal State (Figma 3:1792 - new routes)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    zone: "Z-01 AL QATTARA SECTOR A",
    city: "AL_AIN",
    truck: "",
    salesman: "",
    status: "ACTIVE",
  });

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const matchZone = appliedFilters.zone === "ALL" || r.zone === appliedFilters.zone;
      const matchStatus = appliedFilters.status === "ALL" || r.status === appliedFilters.status;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.zone.toLowerCase().includes(q) ||
        r.truck.toLowerCase().includes(q) ||
        r.salesman.toLowerCase().includes(q);
      return matchZone && matchStatus && matchSearch;
    });
  }, [routes, appliedFilters, searchQuery]);

  const openNewModal = () => {
    setEditingRoute(null);
    setForm({
      id: "",
      name: "",
      zone: "Z-01 AL QATTARA SECTOR A",
      city: "AL_AIN",
      truck: "T6335",
      salesman: "32 - ABDULLAHNOOR",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingRoute(row);
    setForm({ ...row });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim()) return;
    if (editingRoute) {
      setRoutes((prev) => prev.map((r) => (r.id === editingRoute.id ? { ...form } : r)));
    } else {
      setRoutes((prev) => [{ ...form }, ...prev]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["ROUTE ID", "ROUTE NAME", "ZONE", "CITY", "TRUCK ID", "SALESMAN", "STATUS"];
    const rows = filteredRoutes.map((r) => [r.id, r.name, r.zone, r.city, r.truck, r.salesman, r.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "routes-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-slate-400 font-medium">
          Home <span className="mx-1.5 text-slate-300">/</span>{" "}
          <span className="text-slate-700 font-semibold">Routes</span>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A5F] hover:bg-[#e84c51] text-white text-[13px] font-semibold shadow-sm transition cursor-pointer"
        >
          <Plus size={15} /> New Route
        </button>
      </div>

      {/* Filter Routes Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
        <h3 className="text-[14px] font-bold text-slate-800 mb-3.5">Filter Routes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Zone
            </label>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[12.5px] text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
            >
              <option value="ALL">All Zones</option>
              <option value="Z-01 AL QATTARA SECTOR A">Z-01 AL QATTARA SECTOR A</option>
              <option value="Z-02 AL JIMI CENTRAL">Z-02 AL JIMI CENTRAL</option>
              <option value="Z-03 ZAKHER SOUTH">Z-03 ZAKHER SOUTH</option>
              <option value="Z-04 FALAJ HAZZAA">Z-04 FALAJ HAZZAA</option>
              <option value="Z-05 AL MUWAIJI WEST">Z-05 AL MUWAIJI WEST</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[12.5px] text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAppliedFilters({ zone: zoneFilter, status: statusFilter })}
              className="h-9 px-5 rounded-lg bg-[#5948DB] hover:bg-[#4938c7] text-white text-[12.5px] font-semibold transition cursor-pointer"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setZoneFilter("ALL");
                setStatusFilter("ALL");
                setAppliedFilters({ zone: "ALL", status: "ALL" });
                setSearchQuery("");
              }}
              className="h-9 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-[12.5px] font-semibold transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Routes Table Card (Figma 3:1791) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white tracking-wide">Routes</h3>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12px] font-semibold transition cursor-pointer"
          >
            <Download size={14} /> Export
          </button>
        </div>

        <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-slate-600">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="h-8 px-2 rounded-md border border-slate-200 text-[12.5px] bg-white focus:outline-none focus:border-[#5948DB]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Search:</span>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search routes..."
                className="h-8 pl-8 pr-3 w-52 rounded-md border border-slate-200 text-[12.5px] focus:outline-none focus:border-[#5948DB]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5948DB] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">ROUTE ID</th>
                <th className="py-3 px-4">ROUTE NAME</th>
                <th className="py-3 px-4">ZONE</th>
                <th className="py-3 px-4">CITY</th>
                <th className="py-3 px-4">TRUCK ID</th>
                <th className="py-3 px-4">SALESMAN</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
              {filteredRoutes.slice(0, entriesPerPage).map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/90"}>
                  <td className="py-3 px-4 font-bold text-[#5948DB]">{row.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-4">{row.zone}</td>
                  <td className="py-3 px-4">{row.city}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{row.truck}</td>
                  <td className="py-3 px-4">{row.salesman}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                        row.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => openEditModal(row)}
                        className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-semibold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="px-2.5 py-1 rounded bg-[#FF5A5F] hover:bg-[#e0484d] text-white text-[11px] font-semibold transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-[13px]">
                    No matching routes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-500">
          <span>
            Showing 1 to {Math.min(entriesPerPage, filteredRoutes.length)} of {filteredRoutes.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Previous</button>
            <button className="px-2.5 py-1 rounded bg-[#5948DB] text-white font-semibold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal: New Route / Edit Route (Figma 3:1792) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-[15px] font-bold">
                {editingRoute ? `Edit Route - ${editingRoute.id}` : "Add New Route"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Route ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6335"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Route Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ROUTE 6335 - AL QATTARA"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Zone *
                  </label>
                  <select
                    value={form.zone}
                    onChange={(e) => setForm({ ...form, zone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="Z-01 AL QATTARA SECTOR A">Z-01 AL QATTARA SECTOR A</option>
                    <option value="Z-02 AL JIMI CENTRAL">Z-02 AL JIMI CENTRAL</option>
                    <option value="Z-03 ZAKHER SOUTH">Z-03 ZAKHER SOUTH</option>
                    <option value="Z-04 FALAJ HAZZAA">Z-04 FALAJ HAZZAA</option>
                    <option value="Z-05 AL MUWAIJI WEST">Z-05 AL MUWAIJI WEST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    City *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Truck ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. T6335"
                    value={form.truck}
                    onChange={(e) => setForm({ ...form, truck: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Salesman *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 32 - ABDULLAHNOOR"
                    value={form.salesman}
                    onChange={(e) => setForm({ ...form, salesman: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[12.5px] font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#5948DB] hover:bg-[#4938c7] text-white text-[12.5px] font-semibold shadow-xs cursor-pointer"
                >
                  {editingRoute ? "Update Route" : "Save Route"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
