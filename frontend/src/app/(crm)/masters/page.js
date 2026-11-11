"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown } from "lucide-react";

const INITIAL_MASTERS = [
  {
    id: 1,
    customer_name: "sanin",
    customer_id: "it@alqattara.com",
    registered_on: "09/04/2026",
    contact: "ADMINA",
    phone: "0564116337",
    last_login: "-",
    last_logout: "-",
  },
  {
    id: 2,
    customer_name: "MAHA RASHED",
    customer_id: "maha@alqattara.com",
    registered_on: "17/12/2025",
    contact: "ADMINA",
    phone: "0501234567",
    last_login: "08/09/2026, 9:32:06 AM",
    last_logout: "03/09/2026, 12:02:06 PM",
  },
  {
    id: 3,
    customer_name: "AMIRA",
    customer_id: "amira@alqattara.com",
    registered_on: "16/10/2025",
    contact: "AAdmin",
    phone: "0529876543",
    last_login: "17/10/2025, 10:18:45 AM",
    last_logout: "-",
  },
  {
    id: 4,
    customer_name: "MOHAMMED.A",
    customer_id: "it@alqattara.com",
    registered_on: "15/07/2025",
    contact: "ADMINA",
    phone: "0554433221",
    last_login: "08/09/2026, 8:57:32 AM",
    last_logout: "27/08/2026, 5:48:43 PM",
  },
  {
    id: 5,
    customer_name: "IRSHAD",
    customer_id: "store@alqattara.com",
    registered_on: "13/07/2025",
    contact: "STORE KEEPER",
    phone: "0567788990",
    last_login: "08/09/2026, 7:44:33 AM",
    last_logout: "21/07/2026, 7:24:45 AM",
  },
  {
    id: 6,
    customer_name: "SUDEESH",
    customer_id: "chemist@alqattara.com",
    registered_on: "12/07/2025",
    contact: "STORE KEEPER",
    phone: "0543322110",
    last_login: "12/07/2025, 5:09:45 PM",
    last_logout: "-",
  },
  {
    id: 7,
    customer_name: "RABEESH",
    customer_id: "abudhabi-branch@alqattara.com",
    registered_on: "12/07/2025",
    contact: "AAdmin",
    phone: "0508877665",
    last_login: "08/09/2026, 10:34:38 AM",
    last_logout: "25/07/2026, 11:02:07 AM",
  },
  {
    id: 8,
    customer_name: "MANAGING DIRECTOR",
    customer_id: "md@alqattara.com",
    registered_on: "12/07/2025",
    contact: "AAdmin",
    phone: "0501112233",
    last_login: "08/09/2026, 9:48:35 AM",
    last_logout: "01/09/2026, 11:36:23 AM",
  },
  {
    id: 9,
    customer_name: "Rouda",
    customer_id: "rouda@alqattara.com",
    registered_on: "12/07/2025",
    contact: "AAdmin",
    phone: "0501234567",
    last_login: "07/09/2026, 10:37:56 AM",
    last_logout: "07/09/2026, 10:35:27 AM",
  },
  {
    id: 10,
    customer_name: "Cashier",
    customer_id: "sales@alqattara.com",
    registered_on: "05/07/2025",
    contact: "CASHIER",
    phone: "0559988776",
    last_login: "08/09/2026, 7:31:06 AM",
    last_logout: "19/08/2026, 8:12:27 AM",
  },
  {
    id: 11,
    customer_name: "ADMIN",
    customer_id: "admin@alqattara.com",
    registered_on: "28/02/2025",
    contact: "ADMIN",
    phone: "0500000001",
    last_login: "08/09/2026, 8:10:12 AM",
    last_logout: "07/09/2026, 6:00:00 PM",
  },
];

export default function MastersPage() {
  const { addToast } = useToast();
  const [masters, setMasters] = useState(INITIAL_MASTERS);
  const [viewMode, setViewMode] = useState("list"); // "list" | "add" | "edit"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
    contactNumber: "",
    designation: "",
  });

  const filteredMasters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return masters;
    return masters.filter(
      (m) =>
        m.customer_name.toLowerCase().includes(q) ||
        m.customer_id.toLowerCase().includes(q) ||
        m.contact.toLowerCase().includes(q) ||
        m.registered_on.toLowerCase().includes(q)
    );
  }, [masters, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMasters.length / entriesPerPage));
  const paginatedRows = filteredMasters.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openAddView = () => {
    setEditingRow(null);
    setFormData({
      fullName: "",
      password: "",
      email: "",
      contactNumber: "",
      designation: "",
    });
    setViewMode("add");
  };

  const openEditView = (row) => {
    setEditingRow(row);
    setFormData({
      fullName: row.customer_name,
      password: "",
      email: row.customer_id,
      contactNumber: row.phone || "0564116337",
      designation: row.contact || "",
    });
    setViewMode("edit");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      addToast("Please fill in Full Name and Email Address", "error");
      return;
    }

    if (viewMode === "edit" && editingRow) {
      setMasters((prev) =>
        prev.map((m) =>
          m.id === editingRow.id
            ? {
                ...m,
                customer_name: formData.fullName.trim(),
                customer_id: formData.email.trim(),
                phone: formData.contactNumber.trim(),
                contact: formData.designation || m.contact,
              }
            : m
        )
      );
      addToast(`Employee "${formData.fullName}" updated successfully`, "success");
    } else {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const newEntry = {
        id: Date.now(),
        customer_name: formData.fullName.trim(),
        customer_id: formData.email.trim(),
        registered_on: `${dd}/${mm}/${yyyy}`,
        contact: formData.designation || "ADMINA",
        phone: formData.contactNumber.trim() || "0500000000",
        last_login: "-",
        last_logout: "-",
      };
      setMasters((prev) => [newEntry, ...prev]);
      addToast(`Employee "${formData.fullName}" registered successfully`, "success");
    }
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Masters" subtitle="Manage Masters" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-3.5 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight text-[#1C1C1E]">Masters</span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            / {viewMode === "add" ? "Register Employee" : viewMode === "edit" ? "Update Employee" : "Manage Masters"}
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition shadow-sm shadow-[#007AFF]/20 cursor-pointer"
          >
            + Add New
          </button>
        )}
      </div>

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Table iOS Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            {/* Header Banner */}
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
              <div>
                <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">
                  Manage Master Data Records
                </h2>
                <p className="text-[#8E8E93] text-[11px] mt-0.5">Control employee accounts and designations</p>
              </div>
            </div>

            {/* Show Entries & Search Bar with iOS Rounded Controls */}
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
                  placeholder="Filter records..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Exact 7-Column Table with iOS Styling */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] tracking-wider uppercase">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CONTACT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGIN</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGOUT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-[#8E8E93] inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.customer_name}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] font-mono text-xs">{row.customer_id}</td>
                      <td className="py-3.5 px-4 text-[#3C3C43]">{row.registered_on}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[11px] font-semibold">
                          {row.contact}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.last_login}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.last_logout}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3 py-1 rounded-full bg-[#34C759] hover:bg-[#2FB34F] text-white text-[11px] font-semibold transition cursor-pointer shadow-xs"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#8E8E93]">
                        No matching master records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>
                Showing {filteredMasters.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
                {Math.min(currentPage * entriesPerPage, filteredMasters.length)} of{" "}
                {filteredMasters.length} entries
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                      currentPage === page
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
          /* Add New / Edit Employee Card */
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden max-w-3xl mx-auto">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA]">
              <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-tight">
                {viewMode === "edit" ? "Update Employee Record" : "Employee Registration"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Password</label>
                <input
                  type="password"
                  placeholder={
                    viewMode === "edit"
                      ? "Enter new password if changing"
                      : "Create or set a secure password"
                  }
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Email Address</label>
                <input
                  type="email"
                  placeholder="Employee's official email ID"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Contact Number</label>
                <input
                  type="text"
                  placeholder="Contact number for the employee"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3C3C43]">Designation</label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-[#1C1C1E] bg-white"
                >
                  <option value="">Select Designation</option>
                  <option value="ADMINA">ADMINA</option>
                  <option value="AAdmin">AAdmin</option>
                  <option value="STORE KEEPER">STORE KEEPER</option>
                  <option value="CASHIER">CASHIER</option>
                  <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                  <option value="customercare">customercare</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#3C3C43]/10">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/25"
                >
                  {viewMode === "edit" ? "Update Record" : "Register Employee"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
