"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  ShieldCheck,
  Plus,
  Users,
  Check,
  Lock,
  KeyRound,
  Shield,
  Edit2,
  Trash2,
  X,
  FileCheck,
} from "lucide-react";

export default function PrivilegesPage() {
  const { addToast } = useToast();

  const [roles, setRoles] = useState([
    {
      id: 1,
      role: "Operations Super Admin",
      users_count: 2,
      description: "Full unconstrained control over system lookups, financials, and logistics.",
      permissions: [
        "Full System Access",
        "Master Records Configuration",
        "Cashier Day End Closures",
        "All Emirates Access",
        "User & Privilege Management",
        "Database Backup & Export",
      ],
      level: "Tier 1 - Root",
    },
    {
      id: 2,
      role: "Cashier & Commercial Accountant",
      users_count: 4,
      description: "Dedicated to billing, customer credit limits, and cashier drawer balances.",
      permissions: [
        "Record Collections",
        "Generate Tax Invoices (5% VAT)",
        "Adjust Credit Limits",
        "Process Wallet Recharges",
        "View Financial Reports",
      ],
      level: "Tier 2 - Finance",
    },
    {
      id: 3,
      role: "Logistics & Route Supervisor",
      users_count: 5,
      description: "Oversees truck loading, route assignment, and driver daily stock reconcile.",
      permissions: [
        "Truck Stock Load / Unload",
        "Route Dispatch & Assignment",
        "Customer Account Registration",
        "Daily Bottle Quota Tracking",
      ],
      level: "Tier 3 - Operations",
    },
    {
      id: 4,
      role: "Mobile Driver & Salesman",
      users_count: 27,
      description: "Field staff delivering bottles to villas, hotels, and retail stores.",
      permissions: [
        "Route Delivery Execution",
        "Mobile POS Cash Collection",
        "Empty Bottle Recovery Scan",
        "Vehicle Stock Tally View",
      ],
      level: "Tier 4 - Field Agent",
    },
  ]);

  // Matrix Modules & Permissions
  const [matrix, setMatrix] = useState([
    { module: "Dashboard & Live KPIs", admin: true, finance: true, supervisor: true, driver: false },
    { module: "Customer Master & CRM", admin: true, finance: true, supervisor: true, driver: false },
    { module: "Customer Credit & Wallet", admin: true, finance: true, supervisor: false, driver: false },
    { module: "Order Dispatch & Booking", admin: true, finance: true, supervisor: true, driver: true },
    { module: "Utility Stock & Inventory", admin: true, finance: false, supervisor: true, driver: false },
    { module: "Tax Invoices & Billing", admin: true, finance: true, supervisor: false, driver: false },
    { module: "Cashier Drawer Settlement", admin: true, finance: true, supervisor: false, driver: false },
    { module: "Logistics Zones & Routes", admin: true, finance: false, supervisor: true, driver: false },
    { module: "Driver Commission & Payroll", admin: true, finance: true, supervisor: false, driver: false },
    { module: "Master Configurations", admin: true, finance: false, supervisor: false, driver: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRole, setNewRole] = useState({
    role: "",
    description: "",
    level: "Tier 3 - Custom",
    permissions: "Order Booking, Customer View",
  });

  const toggleMatrixCell = (rowIndex, roleKey) => {
    setMatrix((prev) =>
      prev.map((row, idx) => {
        if (idx === rowIndex) {
          const updated = { ...row, [roleKey]: !row[roleKey] };
          addToast(`Updated permission for ${row.module} (${roleKey.toUpperCase()})`, "info");
          return updated;
        }
        return row;
      })
    );
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    const roleEntry = {
      id: Date.now(),
      role: newRole.role,
      users_count: 1,
      description: newRole.description,
      permissions: newRole.permissions.split(",").map((s) => s.trim()),
      level: newRole.level,
    };
    setRoles((prev) => [...prev, roleEntry]);
    setShowAddModal(false);
    addToast(`Added new security role: ${newRole.role}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Role Privileges & Access Security" subtitle="Security & Permissions" />

      <main className="p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Configured Roles
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {roles.length} Roles
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              Granular RBAC model active
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Authorized Staff
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              38 Active Users
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              All with authenticated login
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Security Policy
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              Enforced 2FA
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              Mandatory for Cashier & Admin
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Audit Trail
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              100% Logged
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium">
              Real-time audit telemetry
            </div>
          </div>
        </div>

        {/* Roles Cards Grid with Reduced Border Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">System Role Profiles</h2>
              <p className="text-xs text-slate-500">Security scopes assigned to organization members</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role Privilege</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-md border border-slate-200 p-4.5 shadow-2xs hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 font-bold shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{r.role}</h3>
                      <div className="text-[10px] font-mono text-blue-600 font-semibold">{r.level}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {r.users_count} Staff
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">{r.description}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Granted Permissions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {r.permissions.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 rounded-sm bg-slate-50 border border-slate-200 text-slate-700 font-medium text-[10px] flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-emerald-600 font-bold" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Matrix with Column Lines */}
        <div className="space-y-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Module Access Matrix</h2>
            <p className="text-xs text-slate-500">
              Interactive permission grid with vertical column separation lines. Click checkboxes to toggle.
            </p>
          </div>

          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto touch-pan-x">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">System Functional Module</th>
                    <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-center w-36 text-white">Super Admin</th>
                    <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-center w-36 text-white">Cashier & Finance</th>
                    <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-center w-36 text-white">Route Supervisor</th>
                    <th className="px-4 py-3 font-semibold text-center w-36 text-white">Field Driver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matrix.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800 border-r border-slate-200">
                        {m.module}
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 text-center bg-slate-50/40">
                        <input
                          type="checkbox"
                          checked={m.admin}
                          onChange={() => toggleMatrixCell(idx, "admin")}
                          className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 text-center">
                        <input
                          type="checkbox"
                          checked={m.finance}
                          onChange={() => toggleMatrixCell(idx, "finance")}
                          className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-slate-200 text-center bg-slate-50/40">
                        <input
                          type="checkbox"
                          checked={m.supervisor}
                          onChange={() => toggleMatrixCell(idx, "supervisor")}
                          className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={m.driver}
                          onChange={() => toggleMatrixCell(idx, "driver")}
                          className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Define Security Role</h2>
                  <p className="text-[11px] text-slate-400">Create access tier and permission tags</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRole} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inventory Storekeeper"
                  value={newRole.role}
                  onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Hierarchy Level</label>
                <select
                  value={newRole.level}
                  onChange={(e) => setNewRole({ ...newRole, level: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                >
                  <option value="Tier 2 - Department Manager">Tier 2 - Department Manager</option>
                  <option value="Tier 3 - Store Operations">Tier 3 - Store Operations</option>
                  <option value="Tier 4 - Support Staff">Tier 4 - Support Staff</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Scope Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief description of duties and privileges..."
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Permissions (comma separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stock In/Out, Inventory Audit, Supplier POs"
                  value={newRole.permissions}
                  onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md font-medium text-xs border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}