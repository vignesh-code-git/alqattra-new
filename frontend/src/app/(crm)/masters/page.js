"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import confirmDelete from "@/components/confirmDelete";
import TableIO from "@/components/TableIO";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf } from "@/services/crmMappers";
import { Home, ArrowUpDown, Sliders, Plus } from "lucide-react";

/** Staff user from the API -> row shape this page renders. */
function staffFromApi(u) {
  return {
    id: u.id,
    customer_name: u.name,
    customer_id: u.email,
    registered_on: u.registered_on || "-",
    contact: u.role || "",
    phone: u.phone || "",
    last_login: u.last_login || "-",
    last_logout: u.last_logout || "-",
  };
}

export default function MastersPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const raw = await apiService.getStaffUsers();
    if (raw == null) return null;
    return listOf(raw).map(staffFromApi);
  }, []);
  const live = useLiveData(loadLive);
  const [masters, setMasters] = useState([]);
  useEffect(() => {
    if (live.data) setMasters(live.data);
  }, [live.data]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      addToast("Please fill in Full Name and Email Address", "error");
      return;
    }
    const payload = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.contactNumber.trim(),
      role: formData.designation || (editingRow ? editingRow.contact : "ADMINA"),
    };
    if (viewMode === "edit" && editingRow) {
      const saved = await apiService.updateStaffUser(editingRow.id, payload);
      if (!saved) {
        addToast("Could not save - check the CRM server", "error");
        return;
      }
      addToast(`Employee "${payload.name}" updated successfully`, "success");
    } else {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const created = await apiService.createStaffUser({ ...payload, registered_on: `${dd}/${mm}/${today.getFullYear()}` });
      if (!created) {
        addToast("Could not register - check the CRM server", "error");
        return;
      }
      addToast(`Employee "${payload.name}" registered successfully`, "success");
    }
    await live.refresh();
    setViewMode("list");
  };


  const handleDeleteMaster = async (row) => {
    const result = await apiService.deleteStaffUser(row.id);
    if (!result) {
      addToast(`Could not delete "${row.customer_name}" - check the CRM server`, "error");
      return;
    }
    addToast(`Deleted "${row.customer_name}"`, "info");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Masters" subtitle="Manage Masters" />

      <div className="p-6 flex-1 max-w-7xl w-full mx-auto">
        {viewMode === "list" ? (
          /* Main Table iOS Card */
          <div className="ios-surface overflow-hidden">
            {/* Header Banner */}
            <PanelHeader
              icon={Sliders}
              title="Master Data Records"
              subtitle="Control employee accounts and designations"
              actions={
                <button
                  type="button"
                  onClick={openAddView}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#5856D6]/10 border border-[#5856D6]/50 text-[#5856D6] text-[11.5px] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                </button>
              }
              tools={<TableIO name="master-data-records" onExport={() => addToast("Exported master records", "success")} />}
            />

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
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
                    <th className="py-3 px-6">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CUSTOMER ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>REGISTERED ON</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>CONTACT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGIN</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>LAST LOGOUT</span>
                        <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                      </div>
                    </th>
                    <th className="py-3 px-6 text-right">
                      <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
                  {paginatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#1C1C1E]">{row.customer_name}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93] font-mono text-xs">{row.customer_id}</td>
                      <td className="py-3.5 px-4 text-[#3C3C43]">{row.registered_on}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/12 text-[#0062CC] text-[11px] font-semibold">
                          {row.contact}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.last_login}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.last_logout}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openEditView(row)}
                          className="px-3 py-1 rounded-full bg-white border border-[#34C759]/50 text-[#248A3D] hover:bg-[#34C759]/10 text-[11px] font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => (await confirmDelete(`"${row.customer_name}"`)) && handleDeleteMaster(row)}
                          className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                        >
                          Delete
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
                        ? "bg-white border border-[#007AFF]/60 text-[#007AFF]"
                        : "bg-white border border-[#007AFF]/20 text-[#3C3C43] hover:bg-[#007AFF]/10"
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
          <div className="ios-surface overflow-hidden max-w-3xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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
