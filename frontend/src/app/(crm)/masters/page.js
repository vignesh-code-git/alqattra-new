"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { useToast } from "@/components/Toast";
import {
  Sliders,
  Plus,
  CheckCircle,
  Edit2,
  Trash2,
  X,
  Layers,
  Tag,
  Settings,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function MastersPage() {
  const { addToast } = useToast();

  const [masters, setMasters] = useState([
    {
      id: 1,
      category: "Bottle Types",
      code: "MST-BTL-01",
      name: "5 Gallon Standard Polycarbonate",
      value_param: "Deposit: AED 25.00 / Tare: 750g",
      active: true,
    },
    {
      id: 2,
      category: "Bottle Types",
      code: "MST-BTL-02",
      name: "4 Gallon Disposable PET",
      value_param: "Single Use Non-Returnable",
      active: true,
    },
    {
      id: 3,
      category: "Bottle Types",
      code: "MST-BTL-03",
      name: "330ml Bottled Water Carton (24x)",
      value_param: "Carton Box Packaging",
      active: true,
    },
    {
      id: 4,
      category: "Payment Terms",
      code: "MST-PAY-01",
      name: "Cash On Delivery (COD)",
      value_param: "Immediate Settlement",
      active: true,
    },
    {
      id: 5,
      category: "Payment Terms",
      code: "MST-PAY-02",
      name: "Credit 30 Days",
      value_param: "Net 30 Days Post Invoicing",
      active: true,
    },
    {
      id: 6,
      category: "Payment Terms",
      code: "MST-PAY-03",
      name: "Prepaid Wallet Deduction",
      value_param: "Auto Debit at Delivery",
      active: true,
    },
    {
      id: 7,
      category: "Customer Types",
      code: "MST-CUST-01",
      name: "Corporate Office & Commercial",
      value_param: "Tax Invoice Required with TRN",
      active: true,
    },
    {
      id: 8,
      category: "Customer Types",
      code: "MST-CUST-02",
      name: "Residential Villa & Apartment",
      value_param: "Simplified Tax Receipt",
      active: true,
    },
    {
      id: 9,
      category: "Expense Categories",
      code: "MST-EXP-01",
      name: "Vehicle Diesel & Fuel Card",
      value_param: "Logistics GL #5021",
      active: true,
    },
    {
      id: 10,
      category: "Expense Categories",
      code: "MST-EXP-02",
      name: "Ozone Filtration & Chemical Maintenance",
      value_param: "Plant Operations GL #4010",
      active: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const [formData, setFormData] = useState({
    category: "Bottle Types",
    code: "MST-BTL-04",
    name: "",
    value_param: "",
  });

  const categories = ["Bottle Types", "Payment Terms", "Customer Types", "Expense Categories"];

  const filterTabs = [
    { id: "all", label: "All Master Codes", count: masters.filter((m) => m.status !== "Deleted").length },
    ...categories.map((c) => ({
      id: c,
      label: c,
      count: masters.filter((m) => m.category === c && m.status !== "Deleted").length,
    })),
    { id: "Deleted", label: "Deleted", count: masters.filter((m) => m.status === "Deleted").length },
  ];

  const filteredMasters = masters.filter((m) => {
    if (activeTab === "Deleted") return m.status === "Deleted";
    if (m.status === "Deleted") return false;
    if (activeTab === "all") return true;
    return m.category === activeTab;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      category: activeTab === "all" ? "Bottle Types" : activeTab,
      code: `MST-NEW-0${masters.length + 1}`,
      name: "",
      value_param: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      code: item.code,
      name: item.name,
      value_param: item.value_param,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMasters((prev) =>
        prev.map((m) => (m.id === editingItem.id ? { ...m, ...formData } : m))
      );
      setCrudPopup({
        type: "update",
        title: "Master Code Updated",
        message: `Master item "${formData.name}" (${formData.code}) updated successfully.`,
      });
      addToast(`Updated master item ${formData.name}`, "success");
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        status: "Active",
        active: true,
      };
      setMasters((prev) => [newItem, ...prev]);
      setCrudPopup({
        type: "create",
        title: "Master Code Created",
        message: `New master item "${formData.name}" (${formData.code}) created successfully.`,
      });
      addToast(`Created master code ${formData.code}`, "success");
    }
    setShowModal(false);
  };

  // Delete trigger
  const handleDelete = (item) => {
    setDeleteTarget(item);
  };

  // Confirm delete (Soft deletes with red border styling)
  const confirmDeleteMaster = () => {
    if (!deleteTarget) return;
    const item = deleteTarget;
    setMasters((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, status: "Deleted" } : m))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Master Item Moved to Deleted",
      message: `Master code ${item.code} (${item.name}) marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Deleted master code ${item.code}`, "info");
  };

  // Restore master back to Active
  const handleRestoreMaster = (item) => {
    setMasters((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, status: "Active" } : m))
    );
    setCrudPopup({
      type: "restore",
      title: "Master Item Restored",
      message: `Master code ${item.code} (${item.name}) has been restored to Active status!`,
    });
    addToast(`Master code ${item.code} restored`, "success");
  };

  const columns = [
    {
      key: "code",
      label: "Master Code",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-blue-600 text-xs px-2 py-0.5 rounded-xs bg-blue-50 border border-blue-200">
          {val}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (val) => (
        <span className="inline-flex items-center gap-1 text-slate-800 font-semibold text-xs">
          <Tag className="w-3 h-3 text-slate-400" />
          {val}
        </span>
      ),
    },
    {
      key: "name",
      label: "Name / Description",
      sortable: true,
      render: (val) => (
        <span className="font-bold text-slate-900 text-xs">{val}</span>
      ),
    },
    {
      key: "value_param",
      label: "Parameters & Default Value",
      sortable: true,
      render: (val) => (
        <span className="text-slate-600 text-xs font-mono">{val}</span>
      ),
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          Active
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Edit Item"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
            title="Delete Item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Master Configuration & System Lookups" subtitle="Master Records" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Master Records
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {masters.length} Items
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              4 distinct system domains
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Bottle Specifications
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              3 Sizes Active
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              Polycarbonate, PET, Bottled
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Billing & Terms
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              3 Payment Terms
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              COD, Net 30, Prepaid Wallet
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                System Integrity
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Settings className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              100% Synced
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium">
              All codes mapped to ERP database
            </div>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={columns}
          data={filteredMasters}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search master item code, name, category, or param..."
          searchKeys={["code", "category", "name", "value_param"]}
          onRestore={handleRestoreMaster}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          actions={
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Master Item</span>
            </button>
          }
        />
      </main>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    {editingItem ? "Edit Master Record" : "Add Master Item"}
                  </h2>
                  <p className="text-[11px] text-slate-400">Define code, category, and operating parameters</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Gallon Standard Polycarbonate"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Parameters / Accounting Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deposit: AED 25.00 / Tare: 750g"
                  value={formData.value_param}
                  onChange={(e) => setFormData({ ...formData, value_param: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md font-medium text-xs border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
                >
                  {editingItem ? "Save Changes" : "Create Master Item"}
                </button>
              </div>
            </form>
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
                  Are you sure you want to delete master code <strong className="text-slate-800">{deleteTarget.code}</strong> ({deleteTarget.name})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This master record will be retained and highlighted with a <strong>prominent red border</strong> with a <strong>Restore</strong> action button.
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
                onClick={confirmDeleteMaster}
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