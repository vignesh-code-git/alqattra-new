"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { useToast } from "@/components/Toast";
import {
  Route as RouteIcon,
  Plus,
  Truck,
  UserCheck,
  MapPin,
  CheckCircle,
  AlertCircle,
  Edit2,
  UserPlus,
  Trash2,
  X,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function RoutesPage() {
  const { addToast } = useToast();

  const [routes, setRoutes] = useState([
    {
      id: 1,
      code: "RT-AA-01",
      name: "Route AA-01 Al Jimi Central",
      zone_name: "Al Ain Central & Town",
      city: "AL AIN",
      salesman_name: "Mohammed Rashid",
      vehicle: "DXB-78901 (Isuzu 4-Ton)",
      daily_capacity: 350,
      delivered_today: 280,
      status: "Active",
    },
    {
      id: 2,
      code: "RT-AA-02",
      name: "Route AA-02 Zakher Residential",
      zone_name: "Al Jimi & Zakher Residential",
      city: "AL AIN",
      salesman_name: "Khalid Al Ameri",
      vehicle: "AA-34190 (Mitsubishi Canter)",
      daily_capacity: 320,
      delivered_today: 195,
      status: "Active",
    },
    {
      id: 3,
      code: "RT-AA-03",
      name: "Route AA-03 Hili Commercial",
      zone_name: "Al Hili & Foah North",
      city: "AL AIN",
      salesman_name: "Tariq Mahmood",
      vehicle: "AA-99214 (Hino 300)",
      daily_capacity: 300,
      delivered_today: 240,
      status: "Active",
    },
    {
      id: 4,
      code: "RT-AD-01",
      name: "Route AD-01 Corniche Hotels",
      zone_name: "Abu Dhabi Corniche & Downtown",
      city: "ABU DHABI",
      salesman_name: "Ahmed Al Mansoori",
      vehicle: "AA-45210 (Mitsubishi Canter)",
      daily_capacity: 400,
      delivered_today: 380,
      status: "Active",
    },
    {
      id: 5,
      code: "RT-AD-02",
      name: "Route AD-02 Musaffah Commercial",
      zone_name: "Musaffah Industrial & ICAD",
      city: "ABU DHABI",
      salesman_name: "Bilal Farooq",
      vehicle: "AD-88301 (Isuzu 5-Ton)",
      daily_capacity: 450,
      delivered_today: 410,
      status: "Active",
    },
    {
      id: 6,
      code: "RT-DXB-01",
      name: "Route DXB-01 Business Bay Corporate",
      zone_name: "Dubai Downtown & Business Bay",
      city: "DUBAI",
      salesman_name: "Pending Assignment",
      vehicle: "DXB-11204 (Hino 500)",
      daily_capacity: 450,
      delivered_today: 0,
      status: "Unassigned",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const [formData, setFormData] = useState({
    code: "RT-AA-04",
    name: "",
    zone_name: "Al Ain Central & Town",
    city: "AL AIN",
    salesman_name: "Mohammed Rashid",
    vehicle: "DXB-78901 (Isuzu 4-Ton)",
    daily_capacity: "350",
  });

  const activeRoutesCount = routes.filter((r) => r.status === "Active").length;
  const unassignedCount = routes.filter((r) => r.status === "Unassigned").length;
  const totalDeliveredToday = routes.reduce((acc, r) => acc + r.delivered_today, 0);

  const filterTabs = [
    { id: "all", label: "All Routes", count: routes.filter((r) => r.status !== "Deleted").length },
    { id: "AL AIN", label: "Al Ain", count: routes.filter((r) => r.city === "AL AIN" && r.status !== "Deleted").length },
    { id: "ABU DHABI", label: "Abu Dhabi", count: routes.filter((r) => r.city === "ABU DHABI" && r.status !== "Deleted").length },
    { id: "DUBAI", label: "Dubai", count: routes.filter((r) => r.city === "DUBAI" && r.status !== "Deleted").length },
    { id: "Unassigned", label: "Unassigned", count: unassignedCount },
    { id: "Deleted", label: "Deleted", count: routes.filter((r) => r.status === "Deleted").length },
  ];

  const filteredRoutes = routes.filter((r) => {
    if (activeTab === "Deleted") return r.status === "Deleted";
    if (r.status === "Deleted") return false;
    if (activeTab === "all") return true;
    if (activeTab === "Unassigned") return r.status === "Unassigned";
    return r.city === activeTab;
  });

  const handleOpenAdd = () => {
    setEditingRoute(null);
    setFormData({
      code: `RT-AA-0${routes.length + 1}`,
      name: "",
      zone_name: "Al Ain Central & Town",
      city: "AL AIN",
      salesman_name: "Mohammed Rashid",
      vehicle: "DXB-78901 (Isuzu 4-Ton)",
      daily_capacity: "350",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (route) => {
    setEditingRoute(route);
    setFormData({
      code: route.code,
      name: route.name,
      zone_name: route.zone_name,
      city: route.city,
      salesman_name: route.salesman_name,
      vehicle: route.vehicle,
      daily_capacity: route.daily_capacity.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoute) {
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === editingRoute.id
            ? {
                ...r,
                ...formData,
                daily_capacity: parseInt(formData.daily_capacity) || 0,
                status: formData.salesman_name.includes("Pending") ? "Unassigned" : "Active",
              }
            : r
        )
      );
      setCrudPopup({
        type: "update",
        title: "Route Updated",
        message: `Route ${formData.code} (${formData.name}) details updated and synchronized.`,
      });
      addToast(`Updated route ${formData.code} details`, "success");
    } else {
      const newEntry = {
        id: Date.now(),
        ...formData,
        daily_capacity: parseInt(formData.daily_capacity) || 0,
        delivered_today: 0,
        status: formData.salesman_name.includes("Pending") ? "Unassigned" : "Active",
      };
      setRoutes((prev) => [newEntry, ...prev]);
      setCrudPopup({
        type: "create",
        title: "Route Created",
        message: `New delivery route ${formData.code} (${formData.name}) created successfully.`,
      });
      addToast(`Added new route ${formData.code}`, "success");
    }
    setShowModal(false);
  };

  // Delete route trigger
  const handleDelete = (route) => {
    setDeleteTarget(route);
  };

  // Confirm delete (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteRoute = () => {
    if (!deleteTarget) return;
    const route = deleteTarget;
    setRoutes((prev) =>
      prev.map((r) => (r.id === route.id ? { ...r, status: "Deleted" } : r))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Route Moved to Deleted",
      message: `Route ${route.code} (${route.name}) marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Deleted route ${route.code}`, "info");
  };

  // Restore route back to Active
  const handleRestoreRoute = (route) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === route.id ? { ...r, status: "Active" } : r))
    );
    setCrudPopup({
      type: "restore",
      title: "Route Restored",
      message: `Route ${route.code} (${route.name}) has been restored to Active status!`,
    });
    addToast(`Route ${route.code} restored`, "success");
  };

  const columns = [
    {
      key: "code",
      label: "Route Code",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-blue-600 text-xs px-2 py-0.5 rounded-xs bg-blue-50 border border-blue-200">
          {val}
        </span>
      ),
    },
    {
      key: "name",
      label: "Route / Zone",
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900 text-xs">{val}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{row.zone_name}</span>
            <span>•</span>
            <span className="font-medium text-slate-600">{row.city}</span>
          </div>
        </div>
      ),
    },
    {
      key: "salesman_name",
      label: "Assigned Salesman",
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
            val.includes("Pending")
              ? "bg-amber-100 text-amber-800 border border-amber-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}>
            {val.charAt(0)}
          </div>
          <span className={`text-xs font-medium ${val.includes("Pending") ? "text-amber-700 font-bold" : "text-slate-800"}`}>
            {val}
          </span>
        </div>
      ),
    },
    {
      key: "vehicle",
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
      key: "delivered_today",
      label: "Today's Progress",
      sortable: true,
      align: "right",
      render: (val, row) => {
        const pct = Math.min(100, Math.round((val / row.daily_capacity) * 100));
        return (
          <div className="text-right">
            <div className="font-mono font-bold text-xs text-slate-900">
              {val} / {row.daily_capacity} <span className="text-[10px] font-normal text-slate-400">Bottles</span>
            </div>
            <div className="w-24 ml-auto bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-200">
              <div
                className={`h-full rounded-full ${
                  pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-blue-500" : "bg-amber-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      align: "center",
      render: (val) => {
        const isActive = val === "Active";
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {isActive ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
            {val}
          </span>
        );
      },
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
            title="Edit Route Assignment"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
            title="Delete Route"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Delivery Routes & Dispatch Allocation" subtitle="Daily Logistics" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Configured Routes
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <RouteIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {routes.length} Routes
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              Across Al Ain, Abu Dhabi & Dubai
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active En Route
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {activeRoutesCount} Trucks
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              Live GPS dispatching active
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Bottles Delivered Today
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {totalDeliveredToday.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Bottles</span>
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              78% daily target reached
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Unassigned Routes
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-amber-600">
              {unassignedCount} Routes
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium">
              Needs driver assignment
            </div>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={columns}
          data={filteredRoutes}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search route code, driver, vehicle, or zone..."
          searchKeys={["code", "name", "zone_name", "salesman_name", "vehicle"]}
          onRestore={handleRestoreRoute}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          actions={
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Route</span>
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
                  <RouteIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    {editingRoute ? "Edit Route Assignment" : "Create New Route"}
                  </h2>
                  <p className="text-[11px] text-slate-400">Assign vehicle, territory, and delivery quota</p>
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
                  <label className="text-slate-700 font-semibold block mb-1">Route Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Territory / Emirate</label>
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
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Route Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Route AA-04 Al Foah Residential"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Zone Area</label>
                <input
                  type="text"
                  required
                  value={formData.zone_name}
                  onChange={(e) => setFormData({ ...formData, zone_name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Salesman / Driver</label>
                  <input
                    type="text"
                    required
                    value={formData.salesman_name}
                    onChange={(e) => setFormData({ ...formData, salesman_name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Vehicle</label>
                  <input
                    type="text"
                    required
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Daily Capacity (Bottles)</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  required
                  value={formData.daily_capacity}
                  onChange={(e) => setFormData({ ...formData, daily_capacity: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
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
                  {editingRoute ? "Save Route" : "Create Route"}
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
                  Are you sure you want to delete route <strong className="text-slate-800">{deleteTarget.code}</strong> ({deleteTarget.name})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This route will be highlighted with a <strong>prominent red border</strong> in the table and can be restored at any time.
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
                onClick={confirmDeleteRoute}
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