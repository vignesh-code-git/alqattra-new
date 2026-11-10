"use client";
import React, { useState, useMemo } from "react";
import { Plus, Download, X, Search } from "lucide-react";

const INITIAL_ZONES = [
  { id: "Z-01", name: "AL QATTARA SECTOR A", city: "AL_AIN", routes: "6335, 6338", created: "2024-01-10", status: "ACTIVE" },
  { id: "Z-02", name: "AL JIMI CENTRAL", city: "AL_AIN", routes: "6347, 6339", created: "2024-01-12", status: "ACTIVE" },
  { id: "Z-03", name: "ZAKHER SOUTH", city: "AL_AIN", routes: "6341, 6357", created: "2024-01-18", status: "ACTIVE" },
  { id: "Z-04", name: "FALAJ HAZZAA", city: "AL_AIN", routes: "8066, 6350", created: "2024-02-01", status: "ACTIVE" },
  { id: "Z-05", name: "AL MUWAIJI WEST", city: "AL_AIN", routes: "6354, 6343", created: "2024-02-14", status: "ACTIVE" },
  { id: "Z-06", name: "AL TOWAYYA NORTH", city: "AL_AIN", routes: "6337, 6340", created: "2024-03-02", status: "ACTIVE" },
  { id: "Z-07", name: "AL MARKHANIYA", city: "AL_AIN", routes: "6345, 6349", created: "2024-03-15", status: "ACTIVE" },
  { id: "Z-08", name: "SANAIYA INDUSTRIAL", city: "AL_AIN", routes: "6352, 6355", created: "2024-04-04", status: "ACTIVE" },
  { id: "Z-09", name: "AL HILI DISTRICT", city: "AL_AIN", routes: "6358, 6360", created: "2024-04-19", status: "ACTIVE" },
  { id: "Z-10", name: "AL BATEEN SECTOR", city: "AL_AIN", routes: "6362", created: "2024-05-08", status: "INACTIVE" },
];

export default function ZonesPage() {
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [cityFilter, setCityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [appliedFilters, setAppliedFilters] = useState({ city: "ALL", status: "ALL" });

  // Modal State (Figma 3:1790 - new zones / edit zones)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    city: "AL_AIN",
    routes: "",
    status: "ACTIVE",
  });

  const filteredZones = useMemo(() => {
    return zones.filter((z) => {
      const matchCity = appliedFilters.city === "ALL" || z.city === appliedFilters.city;
      const matchStatus = appliedFilters.status === "ALL" || z.status === appliedFilters.status;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        z.id.toLowerCase().includes(q) ||
        z.name.toLowerCase().includes(q) ||
        z.city.toLowerCase().includes(q) ||
        z.routes.toLowerCase().includes(q);
      return matchCity && matchStatus && matchSearch;
    });
  }, [zones, appliedFilters, searchQuery]);

  const openNewModal = () => {
    setEditingZone(null);
    setForm({
      id: `Z-${String(zones.length + 1).padStart(2, "0")}`,
      name: "",
      city: "AL_AIN",
      routes: "",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingZone(row);
    setForm({
      id: row.id,
      name: row.name,
      city: row.city,
      routes: row.routes,
      status: row.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingZone) {
      setZones((prev) =>
        prev.map((z) => (z.id === editingZone.id ? { ...z, ...form } : z))
      );
    } else {
      setZones((prev) => [
        {
          ...form,
          created: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["ZONE ID", "ZONE NAME", "CITY", "ROUTES", "CREATED ON", "STATUS"];
    const rows = filteredZones.map((r) => [r.id, r.name, r.city, r.routes, r.created, r.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zones-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-slate-400 font-medium">
          Home <span className="mx-1.5 text-slate-300">/</span>{" "}
          <span className="text-slate-700 font-semibold">Zones</span>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A5F] hover:bg-[#e84c51] text-white text-[13px] font-semibold shadow-sm transition cursor-pointer"
        >
          <Plus size={15} /> New Zone
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
        <h3 className="text-[14px] font-bold text-slate-800 mb-3.5">Filter Zones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              City
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[12.5px] text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
            >
              <option value="ALL">All Cities</option>
              <option value="AL_AIN">AL_AIN</option>
              <option value="ABU_DHABI">ABU_DHABI</option>
              <option value="DUBAI">DUBAI</option>
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
              onClick={() => setAppliedFilters({ city: cityFilter, status: statusFilter })}
              className="h-9 px-5 rounded-lg bg-[#5948DB] hover:bg-[#4938c7] text-white text-[12.5px] font-semibold transition cursor-pointer"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setCityFilter("ALL");
                setStatusFilter("ALL");
                setAppliedFilters({ city: "ALL", status: "ALL" });
                setSearchQuery("");
              }}
              className="h-9 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-[12.5px] font-semibold transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Zones Table Card (Figma 3:1789) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Dark Navy-to-Blue Gradient Banner */}
        <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white tracking-wide">Zones</h3>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[12px] font-semibold transition cursor-pointer"
          >
            <Download size={14} /> Export
          </button>
        </div>

        {/* Show entries & Search bar */}
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
                placeholder="Search zones..."
                className="h-8 pl-8 pr-3 w-52 rounded-md border border-slate-200 text-[12.5px] focus:outline-none focus:border-[#5948DB]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5948DB] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">ZONE ID</th>
                <th className="py-3 px-4">ZONE NAME</th>
                <th className="py-3 px-4">CITY</th>
                <th className="py-3 px-4">ROUTES</th>
                <th className="py-3 px-4">CREATED ON</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
              {filteredZones.slice(0, entriesPerPage).map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/90"}>
                  <td className="py-3 px-4 font-bold text-[#5948DB]">{row.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-4">{row.city}</td>
                  <td className="py-3 px-4 font-medium text-slate-600">{row.routes}</td>
                  <td className="py-3 px-4 text-slate-500">{row.created}</td>
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
              {filteredZones.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-[13px]">
                    No matching zones found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-500">
          <span>
            Showing 1 to {Math.min(entriesPerPage, filteredZones.length)} of {filteredZones.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Previous</button>
            <button className="px-2.5 py-1 rounded bg-[#5948DB] text-white font-semibold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal: New Zone / Edit Zone (Figma 3:1790) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-[15px] font-bold">
                {editingZone ? `Edit Zone - ${editingZone.id}` : "Add New Zone"}
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
                    Zone ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
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
                <div className="sm:col-span-2">
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Zone Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AL QATTARA SECTOR A"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Assigned Routes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6335, 6338"
                    value={form.routes}
                    onChange={(e) => setForm({ ...form, routes: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
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
                  {editingZone ? "Update Zone" : "Save Zone"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
