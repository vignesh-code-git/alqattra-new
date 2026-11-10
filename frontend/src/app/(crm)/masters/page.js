"use client";
import React, { useState, useMemo } from "react";
import { Plus, Download, X, Search } from "lucide-react";

const INITIAL_MASTERS = [
  { id: "M-101", category: "Products", name: "5 Gallon Water Bottle", value: "AED 6.00 (Refill) / AED 25.00 (New)", created: "2024-01-05", status: "ACTIVE" },
  { id: "M-102", category: "Products", name: "200ml Cup Box (40 pcs)", value: "AED 10.50", created: "2024-01-05", status: "ACTIVE" },
  { id: "M-103", category: "Products", name: "500ml Bottle Carton (24 pcs)", value: "AED 12.00", created: "2024-01-08", status: "ACTIVE" },
  { id: "M-104", category: "Products", name: "Hot & Cold Water Dispenser", value: "AED 350.00", created: "2024-01-12", status: "ACTIVE" },
  { id: "M-105", category: "Coupons", name: "BOOK-25 (25 Bottles)", value: "AED 135.00", created: "2024-01-15", status: "ACTIVE" },
  { id: "M-106", category: "Coupons", name: "BOOK-50 (50 Bottles)", value: "AED 260.00", created: "2024-01-15", status: "ACTIVE" },
  { id: "M-107", category: "Coupons", name: "BOOK-100 (100 Bottles)", value: "AED 500.00", created: "2024-01-15", status: "ACTIVE" },
  { id: "M-108", category: "Cities", name: "AL_AIN", value: "Al Ain Region - UAE", created: "2024-01-01", status: "ACTIVE" },
  { id: "M-109", category: "Cities", name: "ABU_DHABI", value: "Abu Dhabi Region - UAE", created: "2024-01-01", status: "ACTIVE" },
  { id: "M-110", category: "Payment Modes", name: "CASH / WALLET / CREDIT", value: "Standard Settlement Modes", created: "2024-01-01", status: "ACTIVE" },
];

const CATEGORIES = ["ALL", "Products", "Coupons", "Cities", "Payment Modes"];

export default function MastersPage() {
  const [masters, setMasters] = useState(INITIAL_MASTERS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal State (Figma 3:1884 Add New & 3:1885 Edit)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaster, setEditingMaster] = useState(null);
  const [form, setForm] = useState({
    id: "",
    category: "Products",
    name: "",
    value: "",
    status: "ACTIVE",
  });

  const filteredMasters = useMemo(() => {
    return masters.filter((m) => {
      const matchCat = activeCategory === "ALL" || m.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        m.id.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.value.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [masters, activeCategory, searchQuery]);

  const openNewModal = () => {
    setEditingMaster(null);
    setForm({
      id: `M-${101 + masters.length}`,
      category: activeCategory === "ALL" ? "Products" : activeCategory,
      name: "",
      value: "",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingMaster(row);
    setForm({ ...row });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingMaster) {
      setMasters((prev) => prev.map((m) => (m.id === editingMaster.id ? { ...m, ...form } : m)));
    } else {
      setMasters((prev) => [
        { ...form, created: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setMasters((prev) => prev.filter((m) => m.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["ID", "CATEGORY", "NAME / CODE", "VALUE / DESCRIPTION", "CREATED ON", "STATUS"];
    const rows = filteredMasters.map((m) => [m.id, m.category, m.name, m.value, m.created, m.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "masters-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-slate-400 font-medium">
          Home <span className="mx-1.5 text-slate-300">/</span>{" "}
          <span className="text-slate-700 font-semibold">Masters</span>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A5F] hover:bg-[#e84c51] text-white text-[13px] font-semibold shadow-sm transition cursor-pointer"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

      {/* Category Sub-tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-[12.5px] font-semibold transition cursor-pointer ${
              activeCategory === cat
                ? "bg-[#5948DB] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat === "ALL" ? "All Masters" : cat}
          </button>
        ))}
      </div>

      {/* Masters Table Card (Figma 3:1883) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white tracking-wide">Master List</h3>
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
                placeholder="Search masters..."
                className="h-8 pl-8 pr-3 w-52 rounded-md border border-slate-200 text-[12.5px] focus:outline-none focus:border-[#5948DB]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5948DB] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">NAME / CODE</th>
                <th className="py-3 px-4">VALUE / DESCRIPTION</th>
                <th className="py-3 px-4">CREATED ON</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
              {filteredMasters.slice(0, entriesPerPage).map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/90"}>
                  <td className="py-3 px-4 font-bold text-[#5948DB]">{row.id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-[#5948DB] text-[11px] font-semibold">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-4 text-slate-600">{row.value}</td>
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
              {filteredMasters.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-[13px]">
                    No matching master records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-500">
          <span>
            Showing 1 to {Math.min(entriesPerPage, filteredMasters.length)} of {filteredMasters.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Previous</button>
            <button className="px-2.5 py-1 rounded bg-[#5948DB] text-white font-semibold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal: Add New (3:1884) & Edit (3:1885) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-[15px] font-bold">
                {editingMaster ? `Edit Master - ${editingMaster.id}` : "Add New Master"}
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
                    Master ID *
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
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="Products">Products</option>
                    <option value="Coupons">Coupons</option>
                    <option value="Cities">Cities</option>
                    <option value="Payment Modes">Payment Modes</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Name / Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Gallon Water Bottle"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Value / Description *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AED 6.00 (Refill)"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
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
                  {editingMaster ? "Update Master" : "Save Master"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
