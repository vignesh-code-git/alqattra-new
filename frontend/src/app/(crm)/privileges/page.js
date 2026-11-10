"use client";
import React, { useState, useMemo } from "react";
import { Plus, Download, X, Search } from "lucide-react";

const ALL_MODULES = [
  "Dashboard",
  "Utilities",
  "Orders",
  "Invoices",
  "Customers",
  "Reports",
  "Wallet",
  "Cashier",
  "Zones",
  "Routes",
  "Salesman",
  "Masters",
  "Privileges",
];

const INITIAL_USERS = [
  { id: "U-01", username: "admin", email: "admin@alqattara.ae", role: "Super Admin", modules: [...ALL_MODULES], status: "ACTIVE" },
  { id: "U-02", username: "operations_mgr", email: "ops@alqattara.ae", role: "Manager", modules: ["Dashboard", "Utilities", "Orders", "Invoices", "Customers", "Reports", "Zones", "Routes", "Salesman"], status: "ACTIVE" },
  { id: "U-03", username: "cashier_alain", email: "cashier@alqattara.ae", role: "Cashier", modules: ["Dashboard", "Orders", "Invoices", "Wallet", "Cashier", "Reports"], status: "ACTIVE" },
  { id: "U-04", username: "store_supervisor", email: "store@alqattara.ae", role: "Supervisor", modules: ["Dashboard", "Utilities", "Orders", "Routes", "Salesman"], status: "ACTIVE" },
  { id: "U-05", username: "accounts_exec", email: "accounts@alqattara.ae", role: "Accountant", modules: ["Dashboard", "Invoices", "Reports", "Wallet", "Cashier"], status: "ACTIVE" },
  { id: "U-06", username: "dispatch_desk", email: "dispatch@alqattara.ae", role: "Dispatcher", modules: ["Dashboard", "Orders", "Customers", "Zones", "Routes", "Salesman"], status: "ACTIVE" },
];

export default function PrivilegesPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal State (Figma 3:1887 Add New Privilege)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    id: "",
    username: "",
    email: "",
    role: "Manager",
    password: "",
    modules: ["Dashboard", "Orders", "Customers"],
    status: "ACTIVE",
  });

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter(
      (u) =>
        !q ||
        u.id.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const openNewModal = () => {
    setEditingUser(null);
    setForm({
      id: `U-0${users.length + 1}`,
      username: "",
      email: "",
      role: "Manager",
      password: "",
      modules: ["Dashboard", "Orders", "Customers"],
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingUser(row);
    setForm({ ...row, password: "" });
    setModalOpen(true);
  };

  const toggleModuleInForm = (mod) => {
    setForm((prev) => {
      const exists = prev.modules.includes(mod);
      return {
        ...prev,
        modules: exists ? prev.modules.filter((m) => m !== mod) : [...prev.modules, mod],
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.username.trim()) return;
    if (editingUser) {
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u)));
    } else {
      setUsers((prev) => [{ ...form }, ...prev]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["USER ID", "USERNAME", "EMAIL", "ROLE", "MODULES ACCESS", "STATUS"];
    const rows = filteredUsers.map((u) => [u.id, u.username, u.email, u.role, u.modules.join(" | "), u.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "privileges-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[13px] text-slate-400 font-medium">
          Home <span className="mx-1.5 text-slate-300">/</span>{" "}
          <span className="text-slate-700 font-semibold">Privileges</span>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5A5F] hover:bg-[#e84c51] text-white text-[13px] font-semibold shadow-sm transition cursor-pointer"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

      {/* Privileges Table Card (Figma 3:1886) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white tracking-wide">User Privileges & Roles</h3>
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
                placeholder="Search privileges..."
                className="h-8 pl-8 pr-3 w-52 rounded-md border border-slate-200 text-[12.5px] focus:outline-none focus:border-[#5948DB]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#5948DB] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">USER ID</th>
                <th className="py-3 px-4">USERNAME</th>
                <th className="py-3 px-4">EMAIL</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">MODULES ACCESS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-700">
              {filteredUsers.slice(0, entriesPerPage).map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/90"}>
                  <td className="py-3 px-4 font-bold text-[#5948DB]">{row.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.username}</td>
                  <td className="py-3 px-4 text-slate-500">{row.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-[#5948DB] text-[11px] font-semibold">
                      {row.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {row.modules.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10.5px] font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
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
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-500">
          <span>
            Showing 1 to {Math.min(entriesPerPage, filteredUsers.length)} of {filteredUsers.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Previous</button>
            <button className="px-2.5 py-1 rounded bg-[#5948DB] text-white font-semibold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal: Add New / Edit Privilege (Figma 3:1887) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-[15px] font-bold">
                {editingUser ? `Edit User Privileges - ${editingUser.username}` : "Add New User Privilege"}
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
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-600 mb-1">
                    Role *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#5948DB]"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Dispatcher">Dispatcher</option>
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

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11.5px] font-semibold text-slate-600">
                    Module Access Permissions
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        modules: prev.modules.length === ALL_MODULES.length ? [] : [...ALL_MODULES],
                      }))
                    }
                    className="text-[11px] font-semibold text-[#5948DB] hover:underline cursor-pointer"
                  >
                    {form.modules.length === ALL_MODULES.length ? "Clear All" : "Select All"}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  {ALL_MODULES.map((mod) => (
                    <label
                      key={mod}
                      className="flex items-center gap-2 text-[12px] text-slate-700 font-medium cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.modules.includes(mod)}
                        onChange={() => toggleModuleInForm(mod)}
                        className="rounded border-slate-300 text-[#5948DB] focus:ring-[#5948DB]"
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
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
                  {editingUser ? "Update Privilege" : "Save Privilege"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
