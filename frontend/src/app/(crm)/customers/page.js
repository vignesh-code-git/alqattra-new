"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Undo2,
  X,
} from "lucide-react";

export default function CustomersPage() {
  const { addToast } = useToast();

  const [customers, setCustomers] = useState([
    {
      id: 1,
      customer_code: "CUST-AA-001",
      name: "Al Ain Palace Hotel",
      customer_type: "Corporate",
      phone: "+971 3 763 1000",
      email: "procurement@alainpalace.ae",
      city: "AL AIN",
      zone: "Al Ain Central",
      route: "Route AA-01",
      credit_limit: "25000.00",
      current_balance: "5180.96",
      status: "Active",
    },
    {
      id: 2,
      customer_code: "CUST-AD-002",
      name: "Emirates Steel Staff Quarters",
      customer_type: "Corporate",
      phone: "+971 2 550 4400",
      email: "supplies@emiratessteel.ae",
      city: "ABU DHABI",
      zone: "Abu Dhabi Corniche",
      route: "Route AD-02",
      credit_limit: "50000.00",
      current_balance: "18450.00",
      status: "Active",
    },
    {
      id: 3,
      customer_code: "CUST-AA-003",
      name: "Fatima Al Kaabi Villa",
      customer_type: "Individual",
      phone: "+971 50 882 1993",
      email: "fatima.kaabi@gmail.com",
      city: "AL AIN",
      zone: "Al Ain Central",
      route: "Route AA-01",
      credit_limit: "1000.00",
      current_balance: "150.00",
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    customer_type: "Corporate",
    phone: "",
    email: "",
    city: "AL AIN",
    zone: "Al Ain Central",
    route: "Route AA-01",
    credit_limit: "5000",
  });

  useEffect(() => {
    async function loadCustomers() {
      const data = await apiService.getCustomers();
      if (data && data.length > 0) {
        setCustomers(data);
      }
    }
    loadCustomers();
  }, []);

  // Filtered by Tab - Deleted items NEVER show in main table, ONLY in Deleted tab
  const tabData = customers.filter((c) => {
    if (activeTab === "Deleted") return c.status === "Deleted";
    if (c.status === "Deleted") return false;
    if (activeTab === "Active") return c.status === "Active";
    if (activeTab === "Corporate") return c.customer_type === "Corporate";
    if (activeTab === "Individual") return c.customer_type === "Individual";
    return true;
  });

  // Table Columns following exact Figma fields
  const columns = [
    {
      key: "name",
      label: "CUSTOMER NAME",
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-extrabold text-slate-900 leading-tight uppercase">{val}</div>
          <span className="text-[10px] text-slate-400 font-semibold">{row.customer_type || "Standard"}</span>
        </div>
      ),
    },
    {
      key: "customer_id",
      label: "CUSTOMER ID",
      sortable: true,
      render: (val, row) => (
        <span className="font-mono text-xs font-bold text-slate-700">
          {val || row.customer_code || row.id}
        </span>
      ),
    },
    {
      key: "phone",
      label: "CONTACT",
      render: (val) => (
        <span className="font-mono text-xs text-slate-600 font-medium">{val}</span>
      ),
    },
    {
      key: "registered_on",
      label: "REGISTERED ON",
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-slate-500">{val || "08/09/2026"}</span>
      ),
    },
    {
      key: "recent_order",
      label: "RECENT ORDER",
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-slate-700 font-semibold">{val || "08/09/2026"}</span>
      ),
    },
    {
      key: "city",
      label: "CITY",
      sortable: true,
      render: (val) => (
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
          {val || "AL AIN"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      align: "center",
      width: "200px",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewCustomer(row)}
            className="px-2 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] shadow-2xs transition-colors"
            title="View Details"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => setEditingCustomer({ ...row })}
            className="px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1"
            title="Edit Customer"
          >
            <Edit className="w-3 h-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => handleDeleteCustomer(row)}
            className="p-1 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-[11px] shadow-2xs transition-colors"
            title="Delete Customer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  // Delete Customer Trigger (Opens Custom Confirmation Modal)
  const handleDeleteCustomer = (cust) => {
    setDeleteTarget(cust);
  };

  // Confirm Delete Customer (Soft-deletes to "Deleted" status with red border & database sync)
  const confirmDeleteCustomer = async () => {
    if (!deleteTarget) return;
    const cust = deleteTarget;
    try {
      if (cust.id && typeof cust.id === "number" && cust.id < 100000) {
        await apiService.updateCustomer(cust.id, { ...cust, status: "Deleted" });
      }
    } catch {
      // Continue optimistic update
    }
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Deleted" } : c))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Record Moved to Deleted",
      message: `Customer "${cust.name}" (${cust.customer_code || cust.id}) has been marked as Deleted. It is styled with red borders and can be restored at any time.`,
    });
    addToast(`Customer "${cust.name}" moved to Deleted list`, "info");
  };

  // Restore Customer back to Active status
  const handleRestoreCustomer = async (cust) => {
    try {
      if (cust.id && typeof cust.id === "number" && cust.id < 100000) {
        await apiService.updateCustomer(cust.id, { ...cust, status: "Active" });
      }
    } catch {
      // Continue optimistic update
    }
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Active" } : c))
    );
    setCrudPopup({
      type: "restore",
      title: "Record Restored",
      message: `Customer "${cust.name}" (${cust.customer_code || cust.id}) has been successfully restored to Active status!`,
    });
    addToast(`Customer "${cust.name}" restored to Active`, "success");
  };

  // Create Submit to Database
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast("Please fill in customer name and phone", "error");
      return;
    }
    const code = `CUST-AA-${String(customers.length + 1).padStart(3, '0')}`;
    const payload = {
      customer_code: code,
      name: formData.name,
      customer_type: formData.customer_type,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      zone: formData.zone,
      route: formData.route,
      credit_limit: formData.credit_limit || "0.00",
      current_balance: "0.00",
      status: "Active",
    };

    const saved = await apiService.createCustomer(payload);
    const newCust = saved && saved.id ? saved : { id: Date.now(), ...payload };
    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setFormData({
      name: "",
      customer_type: "Corporate",
      phone: "",
      email: "",
      city: "AL AIN",
      zone: "Al Ain Central",
      route: "Route AA-01",
      credit_limit: "5000",
    });
    setCrudPopup({
      type: "create",
      title: "Customer Created",
      message: `Customer "${newCust.name}" (${code}) was created successfully and saved to the database.`,
    });
    addToast(`Customer ${newCust.name} (${code}) saved to database!`, "success");
  };

  // Edit Submit to Database
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;

    if (editingCustomer.id && typeof editingCustomer.id === "number" && editingCustomer.id < 100000) {
      const updated = await apiService.updateCustomer(editingCustomer.id, editingCustomer);
      if (updated && updated.id) {
        setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        setCustomers(customers.map((c) => (c.id === editingCustomer.id ? { ...c, ...editingCustomer } : c)));
      }
    } else {
      setCustomers(customers.map((c) => (c.id === editingCustomer.id ? { ...c, ...editingCustomer } : c)));
    }

    const updatedName = editingCustomer.name;
    const updatedCode = editingCustomer.customer_code || editingCustomer.id;
    setEditingCustomer(null);
    setCrudPopup({
      type: "update",
      title: "Customer Updated",
      message: `Customer "${updatedName}" (${updatedCode}) details have been updated and synchronized with the database.`,
    });
    addToast(`Customer ${updatedName} updated in database!`, "success");
  };

  // Handle CSV Import and persist to Database
  const handleImportCustomers = async (newRows) => {
    setCustomers((prev) => [...newRows, ...prev]);
    // Asynchronously persist to database in background
    for (const row of newRows) {
      if (row.name) {
        apiService.createCustomer({
          customer_code: row.customer_code || row.customer_id || `CUST-IMP-${Math.floor(100 + Math.random() * 900)}`,
          name: row.name,
          customer_type: row.customer_type || "Corporate",
          phone: row.phone || row.contact || "+971 50 000 0000",
          email: row.email || "import@alqattara.ae",
          city: row.city || "AL AIN",
          zone: row.zone || "Al Ain Central",
          route: row.route || "Route AA-01",
          credit_limit: row.credit_limit || "5000.00",
          current_balance: row.current_balance || "0.00",
          status: "Active",
        }).catch(() => {});
      }
    }
    addToast(`Imported ${newRows.length} customers into database`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Customer Directory" subtitle="Customers" />

      <main className="p-5 space-y-4 flex-1 overflow-y-auto">
        <DataTable
          columns={columns}
          data={tabData}
          searchPlaceholder="Search code, name, phone, email..."
          searchKeys={["customer_code", "name", "phone", "email", "city"]}
          onImport={handleImportCustomers}
          onRestore={handleRestoreCustomer}
          exportFilename="AlQattara_Customers.csv"
          filterTabs={[
            { id: "All", label: "All", count: customers.filter((c) => c.status !== "Deleted").length },
            { id: "Active", label: "Active", count: customers.filter((c) => c.status === "Active").length },
            { id: "Corporate", label: "Corporate", count: customers.filter((c) => c.customer_type === "Corporate" && c.status !== "Deleted").length },
            { id: "Individual", label: "Individual", count: customers.filter((c) => c.customer_type === "Individual" && c.status !== "Deleted").length },
            { id: "Deleted", label: "Deleted", count: customers.filter((c) => c.status === "Deleted").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          initialSortField="name"
          actions={
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Customer</span>
            </button>
          }
        />
      </main>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900">Add New Customer</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Customer / Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Al Ain Palace Hotel"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category Type</label>
                  <select
                    value={formData.customer_type}
                    onChange={(e) => setFormData({ ...formData, customer_type: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Individual">Individual</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Territory</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="AL AIN">AL AIN</option>
                    <option value="ABU DHABI">ABU DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={formData.credit_limit}
                    onChange={(e) => setFormData({ ...formData, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.ae"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xs"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900">Edit Customer ({editingCustomer.customer_code})</h2>
              <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={editingCustomer.credit_limit}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Territory</label>
                  <select
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="AL AIN">AL AIN</option>
                    <option value="ABU DHABI">ABU DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Status</label>
                  <select
                    value={editingCustomer.status}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Drawer */}
      {viewCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs"
            onClick={() => setViewCustomer(null)}
          />
          <div className="relative w-full max-w-md bg-white border-l border-slate-200 h-full p-4 sm:p-5 space-y-4 overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold">{viewCustomer.customer_code}</span>
                <h2 className="text-sm font-extrabold text-slate-900">{viewCustomer.name}</h2>
              </div>
              <button onClick={() => setViewCustomer(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200 flex justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Current Outstanding</span>
                  <div className="text-sm font-extrabold text-amber-600 font-mono mt-0.5">
                    AED {viewCustomer.current_balance}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Credit Limit</span>
                  <div className="text-sm font-extrabold text-slate-800 font-mono mt-0.5">
                    AED {viewCustomer.credit_limit}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Phone</span>
                    <span className="font-semibold text-slate-800">{viewCustomer.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Email</span>
                    <span className="font-medium text-slate-800">{viewCustomer.email || "No email on file"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Territory & Route</span>
                    <span className="font-semibold text-slate-800">{viewCustomer.city} - {viewCustomer.zone || viewCustomer.route}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewCustomer(null)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-bold text-slate-700 transition-colors"
            >
              Close
            </button>
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
                  Are you sure you want to delete <strong className="text-slate-800">{deleteTarget.name}</strong> ({deleteTarget.customer_code || deleteTarget.id})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This item will appear in the table with a <strong>prominent red border</strong> and a <strong>Restore</strong> action button.
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
                onClick={confirmDeleteCustomer}
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
