"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { useToast } from "@/components/Toast";
import {
  UserCheck,
  Plus,
  Truck,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Coins,
  Edit2,
  Trash2,
  X,
  CreditCard,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function SalesmanPage() {
  const { addToast } = useToast();

  const [salesmen, setSalesmen] = useState([
    {
      id: 1,
      salesman_code: "SM-101",
      name: "Mohammed Rashid",
      mobile: "+971 50 123 4567",
      email: "rashid@alqattara.ae",
      city: "AL AIN",
      assigned_route: "Route AA-01 Al Jimi",
      truck: "DXB-78901 (Isuzu 4-Ton)",
      commission_rate: 5.0,
      monthly_deliveries: 4677,
      accrued_commission: 1740.0,
      status: "Active",
    },
    {
      id: 2,
      salesman_code: "SM-102",
      name: "Ahmed Al Mansoori",
      mobile: "+971 55 987 6543",
      email: "ahmed@alqattara.ae",
      city: "ABU DHABI",
      assigned_route: "Route AD-02 Al Khalidiyah",
      truck: "AA-45210 (Mitsubishi Canter)",
      commission_rate: 5.0,
      monthly_deliveries: 3820,
      accrued_commission: 1432.5,
      status: "Active",
    },
    {
      id: 3,
      salesman_code: "SM-103",
      name: "Khalid Al Ameri",
      mobile: "+971 52 445 6789",
      email: "khalid@alqattara.ae",
      city: "AL AIN",
      assigned_route: "Route AA-02 Zakher",
      truck: "AA-34190 (Mitsubishi Canter)",
      commission_rate: 5.0,
      monthly_deliveries: 2950,
      accrued_commission: 1106.25,
      status: "Active",
    },
    {
      id: 4,
      salesman_code: "SM-104",
      name: "Bilal Farooq",
      mobile: "+971 56 321 8901",
      email: "bilal@alqattara.ae",
      city: "ABU DHABI",
      assigned_route: "Route AD-01 Corniche",
      truck: "AD-88301 (Isuzu 5-Ton)",
      commission_rate: 5.0,
      monthly_deliveries: 4120,
      accrued_commission: 1545.0,
      status: "Active",
    },
    {
      id: 5,
      salesman_code: "SM-105",
      name: "Tariq Mahmood",
      mobile: "+971 50 678 1234",
      email: "tariq@alqattara.ae",
      city: "AL AIN",
      assigned_route: "Route AA-03 Hili",
      truck: "AA-99214 (Hino 300)",
      commission_rate: 5.0,
      monthly_deliveries: 2210,
      accrued_commission: 828.75,
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [selectedSm, setSelectedSm] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "AL AIN",
    assigned_route: "Route AA-04 Al Foah",
    truck: "AA-11204 (Isuzu 4-Ton)",
    commission_rate: "5.0",
  });

  const totalDeliveries = salesmen.reduce((acc, s) => acc + s.monthly_deliveries, 0);
  const totalCommission = salesmen.reduce((acc, s) => acc + s.accrued_commission, 0);

  const filterTabs = [
    { id: "all", label: "All Drivers", count: salesmen.filter((s) => s.status !== "Deleted").length },
    { id: "AL AIN", label: "Al Ain", count: salesmen.filter((s) => s.city === "AL AIN" && s.status !== "Deleted").length },
    { id: "ABU DHABI", label: "Abu Dhabi", count: salesmen.filter((s) => s.city === "ABU DHABI" && s.status !== "Deleted").length },
    { id: "Active", label: "Active", count: salesmen.filter((s) => s.status === "Active").length },
    { id: "Deleted", label: "Deleted", count: salesmen.filter((s) => s.status === "Deleted").length },
  ];

  const filteredSalesmen = salesmen.filter((s) => {
    if (activeTab === "Deleted") return s.status === "Deleted";
    if (s.status === "Deleted") return false;
    if (activeTab === "all") return true;
    if (activeTab === "Active") return s.status === "Active";
    return s.city === activeTab;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      salesman_code: `SM-10${salesmen.length + 1}`,
      monthly_deliveries: 0,
      accrued_commission: 0,
      status: "Active",
      ...formData,
      commission_rate: parseFloat(formData.commission_rate) || 5.0,
    };
    setSalesmen((prev) => [newEntry, ...prev]);
    setShowAddModal(false);
    setCrudPopup({
      type: "create",
      title: "Driver / Salesman Added",
      message: `Staff member ${formData.name} (${newEntry.salesman_code}) added to fleet roster.`,
    });
    addToast(`Added driver/salesman ${formData.name}`, "success");
  };

  const handleOpenSettle = (sm) => {
    setSelectedSm(sm);
    setShowSettleModal(true);
  };

  const handleSettleConfirm = () => {
    setSalesmen((prev) =>
      prev.map((s) => (s.id === selectedSm.id ? { ...s, accrued_commission: 0 } : s))
    );
    setShowSettleModal(false);
    setCrudPopup({
      type: "update",
      title: "Commission Settled",
      message: `Commission of AED ${selectedSm.accrued_commission.toFixed(2)} disbursed to ${selectedSm.name}.`,
    });
    addToast(`Settled commission of AED ${selectedSm.accrued_commission.toFixed(2)} to ${selectedSm.name}`, "success");
  };

  // Delete driver trigger
  const handleDelete = (sm) => {
    setDeleteTarget(sm);
  };

  // Confirm delete (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteSalesman = () => {
    if (!deleteTarget) return;
    const sm = deleteTarget;
    setSalesmen((prev) =>
      prev.map((s) => (s.id === sm.id ? { ...s, status: "Deleted" } : s))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Driver Moved to Deleted",
      message: `Driver ${sm.name} (${sm.salesman_code}) marked as Deleted. Retained in roster with prominent red border styling and can be restored at any time.`,
    });
    addToast(`Driver ${sm.name} moved to Deleted`, "info");
  };

  // Restore driver back to Active
  const handleRestoreSalesman = (sm) => {
    setSalesmen((prev) =>
      prev.map((s) => (s.id === sm.id ? { ...s, status: "Active" } : s))
    );
    setCrudPopup({
      type: "restore",
      title: "Driver Restored",
      message: `Driver ${sm.name} (${sm.salesman_code}) has been restored to Active status!`,
    });
    addToast(`Driver ${sm.name} restored to Active`, "success");
  };

  const columns = [
    {
      key: "name",
      label: "Driver / Salesman",
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 font-bold shrink-0 text-xs">
            {val.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900 text-xs">{val}</div>
            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
              <span>{row.salesman_code}</span>
              <span>•</span>
              <span>{row.mobile}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "assigned_route",
      label: "Assigned Route & Region",
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-semibold text-slate-800 text-xs">{val}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span>{row.city} Territory</span>
          </div>
        </div>
      ),
    },
    {
      key: "truck",
      label: "Assigned Vehicle",
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-mono">
          <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{val}</span>
        </div>
      ),
    },
    {
      key: "monthly_deliveries",
      label: "Monthly Deliveries",
      sortable: true,
      align: "right",
      render: (val) => (
        <div className="text-right">
          <span className="font-mono font-bold text-slate-900 text-xs">{val.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 ml-1">Bottles</span>
        </div>
      ),
    },
    {
      key: "accrued_commission",
      label: "Accrued Commission",
      sortable: true,
      align: "right",
      render: (val, row) => (
        <div className="text-right">
          <div className="font-mono font-bold text-emerald-700 text-xs">
            AED {val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-400">Rate: {row.commission_rate}%</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          {val}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Action",
      align: "right",
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenSettle(row)}
            disabled={row.accrued_commission === 0}
            className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 disabled:hover:bg-emerald-50 border border-emerald-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="Settle Commission"
          >
            <Coins className="w-3 h-3" />
            <span>Settle</span>
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-2xs cursor-pointer"
            title="Delete Driver"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Fleet Staff & Driver Roster" subtitle="Salesman Operations" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Route Salesmen
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {salesmen.length} Drivers
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              100% active roster
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Monthly Bottle Volume
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {totalDeliveries.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Bottles</span>
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              +8.5% over previous cycle
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Commission Accrued
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-emerald-700">
              AED {totalCommission.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              Ready for payroll settlement
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Top Performer
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900 truncate">
              Mohammed Rashid
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium font-mono">
              4,677 bottles delivered
            </div>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={columns}
          data={filteredSalesmen}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search salesman name, code, route, or plate..."
          searchKeys={["name", "salesman_code", "assigned_route", "truck", "mobile"]}
          onRestore={handleRestoreSalesman}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          actions={
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Salesman</span>
            </button>
          }
        />
      </main>

      {/* Add Salesman Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Add Delivery Salesman</h2>
                  <p className="text-[11px] text-slate-400">Register new staff driver with route and commission rate</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Salim Al Jaberi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50..."
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@alqattara.ae"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Operating Territory</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  >
                    <option value="AL AIN">AL AIN</option>
                    <option value="ABU DHABI">ABU DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="20"
                    required
                    value={formData.commission_rate}
                    onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Route</label>
                  <input
                    type="text"
                    required
                    value={formData.assigned_route}
                    onChange={(e) => setFormData({ ...formData, assigned_route: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Truck Vehicle</label>
                  <input
                    type="text"
                    required
                    value={formData.truck}
                    onChange={(e) => setFormData({ ...formData, truck: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
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
                  Create Salesman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settle Commission Modal */}
      {showSettleModal && selectedSm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-sm max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Settle Driver Commission</h2>
              <button
                onClick={() => setShowSettleModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 space-y-1">
                <div className="text-slate-500 text-[11px]">Salesman Name</div>
                <div className="font-bold text-slate-900 text-sm">{selectedSm.name} ({selectedSm.salesman_code})</div>
                <div className="text-[11px] text-slate-500">Route: {selectedSm.assigned_route}</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
                <div className="text-[10px] text-emerald-700 uppercase font-semibold">Total Payable Commission</div>
                <div className="text-xl font-bold font-mono text-emerald-800 mt-0.5">
                  AED {selectedSm.accrued_commission.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-700 mt-1">From {selectedSm.monthly_deliveries} delivered bottles (5% tier)</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSettleModal(false)}
                className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md font-medium text-xs border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSettleConfirm}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
              >
                Confirm Settlement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Confirm Move to Deleted</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete driver <strong className="text-slate-800">{deleteTarget.name}</strong> ({deleteTarget.salesman_code})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This driver record will be highlighted with a <strong>prominent red border</strong> in the roster and can be restored at any time.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteSalesman}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Move to Deleted</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal CRUD Action Popup Modal */}
      {crudPopup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 shadow-2xl text-center space-y-3.5 animate-in zoom-in-95">
            <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
              {crudPopup.type === "delete" ? (
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
              ) : crudPopup.type === "restore" ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Undo2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#5948DB]/10 text-[#5948DB] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{crudPopup.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {crudPopup.message}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCrudPopup(null)}
                className="w-full py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}