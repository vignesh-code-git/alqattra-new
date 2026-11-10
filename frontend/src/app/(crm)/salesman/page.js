"use client";
import React, { useState, useMemo } from "react";
import { Plus, Download, X, Search } from "lucide-react";

const INITIAL_SALESMEN = [
  { id: "33", name: "AAMIR SUBAIR", phone: "+971 50 412 8831", email: "aamir.subair@alqattara.ae", route: "8066", truck: "T8066", city: "AL_AIN", status: "ACTIVE" },
  { id: "32", name: "ABDULLAHNOOR", phone: "+971 50 783 1920", email: "abdullahnoor@alqattara.ae", route: "6335", truck: "T6335", city: "AL_AIN", status: "ACTIVE" },
  { id: "53", name: "ALI ABDELAL", phone: "+971 52 910 3341", email: "ali.abdelal@alqattara.ae", route: "6350", truck: "T6350", city: "AL_AIN", status: "ACTIVE" },
  { id: "109", name: "ALTHAF", phone: "+971 55 642 7719", email: "althaf@alqattara.ae", route: "6357", truck: "T6357", city: "AL_AIN", status: "ACTIVE" },
  { id: "100", name: "AMJATH", phone: "+971 56 318 4402", email: "amjath@alqattara.ae", route: "6354", truck: "T6354", city: "AL_AIN", status: "ACTIVE" },
  { id: "56", name: "ANAS", phone: "+971 50 829 6610", email: "anas@alqattara.ae", route: "6338", truck: "T6338", city: "AL_AIN", status: "ACTIVE" },
  { id: "77", name: "ANFAS", phone: "+971 54 209 5518", email: "anfas@alqattara.ae", route: "6343", truck: "T6343", city: "AL_AIN", status: "ACTIVE" },
  { id: "23", name: "ARSLAN", phone: "+971 50 391 2847", email: "arslan@alqattara.ae", route: "6339", truck: "T6339", city: "AL_AIN", status: "ACTIVE" },
  { id: "47", name: "HASHIM", phone: "+971 52 714 9083", email: "hashim@alqattara.ae", route: "6347", truck: "T6347", city: "AL_AIN", status: "ACTIVE" },
  { id: "113", name: "NISAR", phone: "+971 55 901 6234", email: "nisar@alqattara.ae", route: "6341", truck: "T6341", city: "AL_AIN", status: "ACTIVE" },
];

export default function SalesmanPage() {
  const [salesmen, setSalesmen] = useState(INITIAL_SALESMEN);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [cityFilter, setCityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [appliedFilters, setAppliedFilters] = useState({ city: "ALL", status: "ALL" });

  // Modal State (Figma 3:1881 New Salesman & 3:1882 Edit Salesman)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSalesman, setEditingSalesman] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    route: "6335",
    truck: "T6335",
    city: "AL_AIN",
    password: "",
    status: "ACTIVE",
  });

  const filteredSalesmen = useMemo(() => {
    return salesmen.filter((s) => {
      const matchCity = appliedFilters.city === "ALL" || s.city === appliedFilters.city;
      const matchStatus = appliedFilters.status === "ALL" || s.status === appliedFilters.status;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.route.toLowerCase().includes(q) ||
        s.truck.toLowerCase().includes(q);
      return matchCity && matchStatus && matchSearch;
    });
  }, [salesmen, appliedFilters, searchQuery]);

  const openNewModal = () => {
    setEditingSalesman(null);
    setForm({
      id: String(114 + salesmen.length),
      name: "",
      phone: "+971 50 ",
      email: "",
      route: "6335",
      truck: "T6335",
      city: "AL_AIN",
      password: "",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingSalesman(row);
    setForm({ ...row, password: "" });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingSalesman) {
      setSalesmen((prev) =>
        prev.map((s) => (s.id === editingSalesman.id ? { ...s, ...form } : s))
      );
    } else {
      setSalesmen((prev) => [{ ...form }, ...prev]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setSalesmen((prev) => prev.filter((s) => s.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["SALESMAN ID", "NAME", "PHONE", "EMAIL", "ROUTE", "TRUCK", "CITY", "STATUS"];
    const rows = filteredSalesmen.map((s) => [s.id, s.name, s.phone, s.email, s.route, s.truck, s.city, s.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "salesman-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-slate-400 font-medium">
          Home <span className="mx-1.5 text-slate-300">/</span>{" "}
          <span className="text-slate-700 font-semibold">Salesman</span>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A5F] hover:bg-[#e84c51] text-white text-[13px] font-semibold shadow-sm transition cursor-pointer"
        >
          <Plus size={15} /> New Salesman
        </button>
      </div>

      {/* Filter Salesman Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
        <h3 className="text-[14px] font-bold text-slate-800 mb-3.5">Filter Salesman</h3>
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

      {/* Salesman Table Card (Figma 3:1880) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white tracking-wide">Salesman List</h3>
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
                placeholder="Search salesman..."
                className="h-8 pl-8 pr-3 w-52 rounded-md border border-slate-200 text-[12.5px] focus:outline-none focus:border-[#5948DB]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5948DB] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">SALESMAN ID</th>
                <th className="py-3 px-4">NAME</th>
                <th className="py-3 px-4">PHONE</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROUTE</th>
                <th className="py-3 px-4">TRUCK</th>
                <th className="py-3 px-4">CITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
              {filteredSalesmen.slice(0, entriesPerPage).map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/90"}>
                  <td className="py-3 px-4 font-bold text-[#5948DB]">{row.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-4">{row.phone}</td>
                  <td className="py-3 px-4 text-slate-500">{row.email}</td>
                  <td className="py-3 px-4 font-medium">{row.route}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{row.truck}</td>
                  <td className="py-3 px-4">{row.city}</td>
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
              {filteredSalesmen.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-[13px]">
                    No matching salesmen found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-500">
          <span>
            Showing 1 to {Math.min(entriesPerPage, filteredSalesmen.length)} of {filteredSalesmen.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Previous</button>
            <button className="px-2.5 py-1 rounded bg-[#5948DB] text-white font-semibold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal: New Salesman (3:1881) & Edit Salesman (3:1882) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-[15px] font-bold">
                {editingSalesman ? `Edit Salesman - ${editingSalesman.name}` : "Add New Salesman"}
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
                    Salesman ID *
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
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ABDULLAHNOOR"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Assigned Route *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.route}
                    onChange={(e) => setForm({ ...form, route: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Assigned Truck *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.truck}
                    onChange={(e) => setForm({ ...form, truck: e.target.value })}
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
                  {editingSalesman ? "Update Salesman" : "Save Salesman"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
