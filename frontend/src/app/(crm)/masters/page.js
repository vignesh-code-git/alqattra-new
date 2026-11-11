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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Masters" subtitle="Manage Masters" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Masters</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "add" ? "Register Employee" : viewMode === "edit" ? "Update Employee" : "Manage Masters"} - ALL
          </span>
        </div>
        {viewMode === "list" && (
          <button
            type="button"
            onClick={openAddView}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            Add New
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Table Card (Figma masters.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            {/* Dark Navy-to-Teal Header Banner */}
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Manage and Update Master Data Records
              </h2>
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

            {/* Exact 7-Column Figma Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER ID</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CONTACT</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGIN</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGOUT</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-slate-400 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-slate-800">{row.customer_name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.customer_id}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.registered_on}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.contact}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.last_login}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.last_logout}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No matching master records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                Showing {filteredMasters.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
                {Math.min(currentPage * entriesPerPage, filteredMasters.length)} of{" "}
                {filteredMasters.length} entries
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition cursor-pointer ${
                      currentPage === page
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
          /* Add New / Edit Employee Registration Card (Figma add new.png & edit-1.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Employee Registration
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 max-w-6xl mx-auto">
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Full Name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter employee name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Password
                </label>
                <div className="md:col-span-9">
                  <input
                    type="password"
                    placeholder={
                      viewMode === "edit"
                        ? "Enter new password if changing"
                        : "Create or set a secure password"
                    }
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Email Address
                </label>
                <div className="md:col-span-9">
                  <input
                    type="email"
                    placeholder="Employee's official email ID"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Contact Number
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Contact number for the employee"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#5948DB]"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Designation
                </label>
                <div className="md:col-span-9">
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#5948DB]"
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
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  {viewMode === "edit" ? "Update" : "Register"}
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
