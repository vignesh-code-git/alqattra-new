"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { useToast } from "@/components/Toast";
import {
  MapPin,
  Plus,
  Building2,
  Route as RouteIcon,
  CheckCircle,
  Truck,
  Edit2,
  Trash2,
  X,
  Layers,
  Map,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function ZonesPage() {
  const { addToast } = useToast();

  const [zones, setZones] = useState([
    {
      id: 1,
      code: "ZN-AA-01",
      name: "Al Ain Central & Town",
      city: "AL AIN",
      routes_count: 4,
      salesmen_count: 4,
      daily_capacity: 1400,
      status: "Active",
    },
    {
      id: 2,
      code: "ZN-AA-02",
      name: "Al Jimi & Zakher Residential",
      city: "AL AIN",
      routes_count: 3,
      salesmen_count: 3,
      daily_capacity: 1050,
      status: "Active",
    },
    {
      id: 3,
      code: "ZN-AA-03",
      name: "Al Hili & Foah North",
      city: "AL AIN",
      routes_count: 2,
      salesmen_count: 2,
      daily_capacity: 700,
      status: "Active",
    },
    {
      id: 4,
      code: "ZN-AD-01",
      name: "Abu Dhabi Corniche & Downtown",
      city: "ABU DHABI",
      routes_count: 5,
      salesmen_count: 5,
      daily_capacity: 1750,
      status: "Active",
    },
    {
      id: 5,
      code: "ZN-AD-02",
      name: "Musaffah Industrial & ICAD",
      city: "ABU DHABI",
      routes_count: 6,
      salesmen_count: 6,
      daily_capacity: 2400,
      status: "Active",
    },
    {
      id: 6,
      code: "ZN-AD-03",
      name: "Khalifa City & Al Raha",
      city: "ABU DHABI",
      routes_count: 3,
      salesmen_count: 3,
      daily_capacity: 1100,
      status: "Active",
    },
    {
      id: 7,
      code: "ZN-DXB-01",
      name: "Dubai Downtown & Business Bay",
      city: "DUBAI",
      routes_count: 4,
      salesmen_count: 3,
      daily_capacity: 1600,
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const [formData, setFormData] = useState({
    code: "ZN-AA-04",
    name: "",
    city: "AL AIN",
    daily_capacity: "800",
  });

  const totalRoutes = zones.reduce((acc, z) => acc + z.routes_count, 0);
  const totalCapacity = zones.reduce((acc, z) => acc + z.daily_capacity, 0);

  const filterTabs = [
    { id: "all", label: "All Territories", count: zones.filter((z) => z.status !== "Deleted").length },
    { id: "AL AIN", label: "Al Ain", count: zones.filter((z) => z.city === "AL AIN" && z.status !== "Deleted").length },
    { id: "ABU DHABI", label: "Abu Dhabi", count: zones.filter((z) => z.city === "ABU DHABI" && z.status !== "Deleted").length },
    { id: "DUBAI", label: "Dubai", count: zones.filter((z) => z.city === "DUBAI" && z.status !== "Deleted").length },
    { id: "Deleted", label: "Deleted", count: zones.filter((z) => z.status === "Deleted").length },
  ];

  const filteredZones = zones.filter((z) => {
    if (activeTab === "Deleted") return z.status === "Deleted";
    if (z.status === "Deleted") return false;
    if (activeTab === "all") return true;
    return z.city === activeTab;
  });

  const handleOpenAdd = () => {
    setEditingZone(null);
    setFormData({
      code: `ZN-${activeTab === "all" ? "AA" : activeTab === "ABU DHABI" ? "AD" : activeTab === "DUBAI" ? "DXB" : "AA"}-0${zones.length + 1}`,
      name: "",
      city: activeTab === "all" ? "AL AIN" : activeTab,
      daily_capacity: "800",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (zone) => {
    setEditingZone(zone);
    setFormData({
      code: zone.code,
      name: zone.name,
      city: zone.city,
      daily_capacity: zone.daily_capacity.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingZone) {
      setZones((prev) =>
        prev.map((z) =>
          z.id === editingZone.id
            ? { ...z, ...formData, daily_capacity: parseInt(formData.daily_capacity) || 0 }
            : z
        )
      );
      setCrudPopup({
        type: "update",
        title: "Zone Updated",
        message: `Territory zone ${formData.name} (${formData.code}) updated and synchronized.`,
      });
      addToast(`Updated zone ${formData.name} successfully`, "success");
    } else {
      const newEntry = {
        id: Date.now(),
        ...formData,
        routes_count: 0,
        salesmen_count: 0,
        daily_capacity: parseInt(formData.daily_capacity) || 0,
        status: "Active",
      };
      setZones((prev) => [newEntry, ...prev]);
      setCrudPopup({
        type: "create",
        title: "Zone Created",
        message: `New territory zone ${formData.name} (${formData.code}) created successfully.`,
      });
      addToast(`Added new zone ${formData.name}`, "success");
    }
    setShowModal(false);
  };

  // Delete zone trigger
  const handleDelete = (zone) => {
    setDeleteTarget(zone);
  };

  // Confirm delete (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteZone = () => {
    if (!deleteTarget) return;
    const zone = deleteTarget;
    setZones((prev) =>
      prev.map((z) => (z.id === zone.id ? { ...z, status: "Deleted" } : z))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Zone Moved to Deleted",
      message: `Zone ${zone.code} (${zone.name}) marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Removed zone ${zone.code}`, "info");
  };

  // Restore zone back to Active
  const handleRestoreZone = (zone) => {
    setZones((prev) =>
      prev.map((z) => (z.id === zone.id ? { ...z, status: "Active" } : z))
    );
    setCrudPopup({
      type: "restore",
      title: "Zone Restored",
      message: `Zone ${zone.code} (${zone.name}) has been restored to Active status!`,
    });
    addToast(`Zone ${zone.code} restored`, "success");
  };

  const columns = [
    {
      key: "code",
      label: "Zone Code",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-blue-600 text-xs px-2 py-0.5 rounded-xs bg-blue-50 border border-blue-200">
          {val}
        </span>
      ),
    },
    {
      key: "name",
      label: "Zone / Territory Name",
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900 text-xs">{val}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span>{row.city} Emirate</span>
          </div>
        </div>
      ),
    },
    {
      key: "city",
      label: "Region / City",
      sortable: true,
      render: (val) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <MapPin className="w-3 h-3 text-blue-600" />
          {val}
        </span>
      ),
    },
    {
      key: "routes_count",
      label: "Assigned Routes",
      sortable: true,
      align: "center",
      render: (val) => (
        <div className="flex items-center justify-center gap-1.5 font-bold font-mono text-slate-800 text-xs">
          <RouteIcon className="w-3.5 h-3.5 text-blue-600" />
          <span>{val} Routes</span>
        </div>
      ),
    },
    {
      key: "daily_capacity",
      label: "Daily Bottle Quota",
      sortable: true,
      align: "right",
      render: (val) => (
        <div className="text-right">
          <span className="font-mono font-bold text-slate-900 text-xs">
            {val.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 ml-1">Bottles/day</span>
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
      label: "Actions",
      align: "right",
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Edit Zone"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
            title="Delete Zone"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Delivery Zones & Territory Coverage" subtitle="Logistics Master" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Delivery Zones
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {zones.length} Zones
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              Covering 3 UAE Emirates
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active Truck Routes
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <RouteIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {totalRoutes} Routes
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              100% active dispatch status
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Daily Capacity (5-Gal)
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {totalCapacity.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Bottles</span>
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              Avg. 1,428 bottles/zone
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Fleet Allocation
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              27 Trucks Active
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium">
              0 idle vehicles
            </div>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={columns}
          data={filteredZones}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search zone name, code, or city..."
          searchKeys={["code", "name", "city"]}
          onRestore={handleRestoreZone}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          actions={
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Zone</span>
            </button>
          }
        />
      </main>

      {/* Create / Edit Zone Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    {editingZone ? "Edit Delivery Zone" : "Create Delivery Zone"}
                  </h2>
                  <p className="text-[11px] text-slate-400">Configure logistics boundary and dispatch capacity</p>
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
                  <label className="text-slate-700 font-semibold block mb-1">Zone Code</label>
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
                <label className="text-slate-700 font-semibold block mb-1">Zone Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al Jimi & Zakher Residential"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Estimated Daily Quota (Bottles)</label>
                <input
                  type="number"
                  min="100"
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
                  {editingZone ? "Save Changes" : "Create Zone"}
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
                  Are you sure you want to delete zone <strong className="text-slate-800">{deleteTarget.code}</strong> ({deleteTarget.name})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This zone will be highlighted with a <strong>prominent red border</strong> in the table and can be restored at any time.
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
                onClick={confirmDeleteZone}
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