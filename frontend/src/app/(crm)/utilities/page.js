"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Plus,
  RefreshCw,
  Boxes,
  ArrowUpDown,
  AlertTriangle,
  Download,
  Edit,
  Trash2,
  Undo2,
  Truck,
  History,
  Eye,
  Settings,
  Clock,
  FileBarChart2,
} from "lucide-react";

export default function UtilitiesPage() {
  const { addToast } = useToast();

  // Main module switcher: "store_inventory" (1:1691) | "car_stock" (3:1704) | "stock_history" (3:1700)
  const [moduleView, setModuleView] = useState("store_inventory");

  // 1. Store Inventory State (Figma 1:1691)
  const [inventory, setInventory] = useState([
    {
      id: 1,
      product_id: "015",
      product_name: "5 gal water",
      category: "Water Bottle",
      price: "5.00",
      previous_stock: 0,
      current_stock: 0,
      damaged_stock: 0,
      last_updated: "08/09/2026",
      status: "Active",
    },
    {
      id: 2,
      product_id: "017",
      product_name: "empty bottle",
      category: "Empty Bottle",
      price: "25.00",
      previous_stock: 0,
      current_stock: 0,
      damaged_stock: 0,
      last_updated: "08/09/2026",
      status: "Active",
    },
    {
      id: 3,
      product_id: "018",
      product_name: "COOLER",
      category: "Dispenser",
      price: "350.00",
      previous_stock: 0,
      current_stock: 0,
      damaged_stock: 0,
      last_updated: "08/09/2026",
      status: "Active",
    },
    {
      id: 4,
      product_id: "016",
      product_name: "500ml PET Bottles",
      category: "Carton Pack",
      price: "15.00",
      previous_stock: 0,
      current_stock: 0,
      damaged_stock: 0,
      last_updated: "08/09/2026",
      status: "Active",
    },
  ]);

  // 2. Car Stock Transaction (Exact 10 rows from Figma 3:1704 - steps/1163/media_0.png)
  const [trucks, setTrucks] = useState([
    {
      id: 1,
      truck_id: "T6335",
      in_charge: "32",
      assistants: "",
      route: "6335",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 155, empty: 155, damaged: 0 },
        { product_id: "017", name: "empty bottle", filled: 0, empty: 155, damaged: 0 },
      ],
    },
    {
      id: 2,
      truck_id: "100003",
      in_charge: "Alremeithi",
      assistants: "",
      route: "100001",
      last_updated: "09/06/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 190, empty: 40, damaged: 0 },
      ],
    },
    {
      id: 3,
      truck_id: "100002",
      in_charge: "LAMIA",
      assistants: "",
      route: "100001",
      last_updated: "04/05/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 150, empty: 35, damaged: 0 },
      ],
    },
    {
      id: 4,
      truck_id: "100001",
      in_charge: "factory",
      assistants: "",
      route: "100001",
      last_updated: "05/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 420, empty: 110, damaged: 0 },
      ],
    },
    {
      id: 5,
      truck_id: "T6338",
      in_charge: "120",
      assistants: "79",
      route: "6338",
      last_updated: "07/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 310, empty: 60, damaged: 0 },
      ],
    },
    {
      id: 6,
      truck_id: "T6347",
      in_charge: "90",
      assistants: "53",
      route: "6347",
      last_updated: "02/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 265, empty: 85, damaged: 0 },
      ],
    },
    {
      id: 7,
      truck_id: "T6339",
      in_charge: "42",
      assistants: "",
      route: "6339",
      last_updated: "29/08/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 295, empty: 55, damaged: 0 },
      ],
    },
    {
      id: 8,
      truck_id: "T6341",
      in_charge: "47",
      assistants: "98",
      route: "6341",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 100, empty: 100, damaged: 0 },
      ],
    },
    {
      id: 9,
      truck_id: "T6357",
      in_charge: "59",
      assistants: "86",
      route: "6357",
      last_updated: "07/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 225, empty: 65, damaged: 0 },
      ],
    },
    {
      id: 10,
      truck_id: "T8066",
      in_charge: "113",
      assistants: "93",
      route: "8066",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { product_id: "015", name: "5 gal water", filled: 147, empty: 147, damaged: 0 },
      ],
    },
  ]);

  // 3. Stock Transaction History (Exact 10 rows from Figma 3:1700 - steps/1159/media_0.png)
  const [stockHistory, setStockHistory] = useState([
    {
      id: 1,
      date: "08/09/2026",
      truck_id: "T6335",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 155,
      in_out: "OUT",
      time: "9:30:22 PM",
      item_type: "NORMAL",
      done_by: "32",
    },
    {
      id: 2,
      date: "08/09/2026",
      truck_id: "T6335",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 155,
      in_out: "IN",
      time: "9:30:22 PM",
      item_type: "NORMAL",
      done_by: "32",
    },
    {
      id: 3,
      date: "08/09/2026",
      truck_id: "T6355",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 23,
      in_out: "OUT",
      time: "9:28:18 PM",
      item_type: "NORMAL",
      done_by: "56",
    },
    {
      id: 4,
      date: "08/09/2026",
      truck_id: "T6355",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 23,
      in_out: "IN",
      time: "9:28:18 PM",
      item_type: "NORMAL",
      done_by: "56",
    },
    {
      id: 5,
      date: "08/09/2026",
      truck_id: "T8066",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 147,
      in_out: "OUT",
      time: "7:51:43 PM",
      item_type: "NORMAL",
      done_by: "113",
    },
    {
      id: 6,
      date: "08/09/2026",
      truck_id: "T8066",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 147,
      in_out: "IN",
      time: "7:51:43 PM",
      item_type: "NORMAL",
      done_by: "113",
    },
    {
      id: 7,
      date: "08/09/2026",
      truck_id: "T6348",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 10,
      in_out: "OUT",
      time: "6:17:04 PM",
      item_type: "NORMAL",
      done_by: "92",
    },
    {
      id: 8,
      date: "08/09/2026",
      truck_id: "T6348",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 10,
      in_out: "IN",
      time: "6:17:04 PM",
      item_type: "NORMAL",
      done_by: "92",
    },
    {
      id: 9,
      date: "08/09/2026",
      truck_id: "T6341",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 100,
      in_out: "OUT",
      time: "5:57:40 PM",
      item_type: "NORMAL",
      done_by: "47",
    },
    {
      id: 10,
      date: "08/09/2026",
      truck_id: "T6341",
      city: "AL_AIN",
      product_id: "015",
      product_name: "5 gal water",
      quantity: 100,
      in_out: "IN",
      time: "5:57:40 PM",
      item_type: "NORMAL",
      done_by: "47",
    },
  ]);

  // Filters & UI states
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [truckSearch, setTruckSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [historyFromDate, setHistoryFromDate] = useState("");
  const [historyToDate, setHistoryToDate] = useState("");
  const [historyTruckFilter, setHistoryTruckFilter] = useState("All");
  const [historyProductFilter, setHistoryProductFilter] = useState("All");

  // Modals
  const [showStockModal, setShowStockModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteTruckTarget, setDeleteTruckTarget] = useState(null);

  // Car Stock Modals (Figma 3:1708, 3:1712, 3:1716, 3:1720)
  const [showAddTruckModal, setShowAddTruckModal] = useState(false);
  const [showProductSummaryModal, setShowProductSummaryModal] = useState(false);
  const [viewTruckStock, setViewTruckStock] = useState(null);
  const [manageTruckStock, setManageTruckStock] = useState(null);
  const [editingTruck, setEditingTruck] = useState(null);

  const [newTruckForm, setNewTruckForm] = useState({
    truck_id: "",
    in_charge: "",
    assistants: "",
    route: "",
  });

  const [manageForm, setManageForm] = useState({
    product_name: "5 gal water",
    action_type: "OUT",
    item_type: "NORMAL",
    quantity: 50,
  });

  const [stockType, setStockType] = useState("IN");
  const [selectedProduct, setSelectedProduct] = useState("5 gal water");
  const [stockQty, setStockQty] = useState(100);

  const [newProduct, setNewProduct] = useState({
    product_id: "",
    name: "",
    category: "Water Bottle",
    price: "5.00",
    initial_stock: 0,
  });

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      if (item.status === "Deleted") return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.product_name.toLowerCase().includes(q) ||
        item.product_id.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [inventory, search]);

  const filteredTrucks = useMemo(() => {
    return trucks.filter((t) => {
      if (t.status === "Deleted") return false;
      if (!truckSearch.trim()) return true;
      const q = truckSearch.toLowerCase();
      return (
        t.truck_id.toLowerCase().includes(q) ||
        t.in_charge.toLowerCase().includes(q) ||
        t.assistants.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q)
      );
    });
  }, [trucks, truckSearch]);

  const filteredHistory = useMemo(() => {
    return stockHistory.filter((h) => {
      if (historyTruckFilter !== "All" && h.truck_id !== historyTruckFilter)
        return false;
      if (
        historyProductFilter !== "All" &&
        h.product_name !== historyProductFilter
      )
        return false;
      if (!historySearch.trim()) return true;
      const q = historySearch.toLowerCase();
      return Object.values(h).some((v) =>
        String(v).toLowerCase().includes(q)
      );
    });
  }, [
    stockHistory,
    historyTruckFilter,
    historyProductFilter,
    historySearch,
  ]);

  const handleStockUpdate = (e) => {
    e.preventDefault();
    const qty = parseInt(stockQty) || 0;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.product_name === selectedProduct) {
          return {
            ...item,
            previous_stock: item.current_stock,
            current_stock:
              stockType === "IN"
                ? item.current_stock + qty
                : Math.max(0, item.current_stock - qty),
            last_updated: "08/09/2026",
          };
        }
        return item;
      })
    );
    setStockHistory((prev) => [
      {
        id: Date.now(),
        date: "08/09/2026",
        truck_id: "100001",
        city: "AL_AIN",
        product_id: "015",
        product_name: selectedProduct,
        quantity: qty,
        in_out: stockType,
        time: "9:35:00 PM",
        item_type: "NORMAL",
        done_by: "Admin",
      },
      ...prev,
    ]);
    addToast(`Inventory updated for ${selectedProduct}`, "success");
    setShowStockModal(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      product_id: newProduct.product_id || `0${19 + inventory.length}`,
      product_name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price || 5).toFixed(2),
      previous_stock: 0,
      current_stock: parseInt(newProduct.initial_stock) || 0,
      damaged_stock: 0,
      last_updated: "08/09/2026",
      status: "Active",
    };
    setInventory([...inventory, created]);
    setShowAddProductModal(false);
    addToast(`Product ${created.product_name} added!`, "success");
  };

  const handleCreateTruck = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      truck_id: newTruckForm.truck_id.trim() || "T6360",
      in_charge: newTruckForm.in_charge.trim() || "32",
      assistants: newTruckForm.assistants.trim() || "",
      route:
        newTruckForm.route.trim() ||
        newTruckForm.truck_id.replace("T", "") ||
        "6360",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        {
          product_id: "015",
          name: "5 gal water",
          filled: 100,
          empty: 0,
          damaged: 0,
        },
      ],
    };
    setTrucks([entry, ...trucks]);
    setShowAddTruckModal(false);
    setNewTruckForm({ truck_id: "", in_charge: "", assistants: "", route: "" });
    addToast(`Truck ${entry.truck_id} added!`, "success");
  };

  const handleManageTruckSubmit = (e) => {
    e.preventDefault();
    if (!manageTruckStock) return;
    const qty = parseInt(manageForm.quantity) || 0;
    const isOut = manageForm.action_type === "OUT";

    setTrucks((prev) =>
      prev.map((t) => {
        if (t.id !== manageTruckStock.id) return t;
        const updatedItems = (t.stock_items || []).map((s) =>
          s.name === manageForm.product_name
            ? {
                ...s,
                filled: isOut ? s.filled + qty : Math.max(0, s.filled - qty),
              }
            : s
        );
        return { ...t, last_updated: "08/09/2026", stock_items: updatedItems };
      })
    );

    setStockHistory((prev) => [
      {
        id: Date.now(),
        date: "08/09/2026",
        truck_id: manageTruckStock.truck_id,
        city: "AL_AIN",
        product_id: "015",
        product_name: manageForm.product_name,
        quantity: qty,
        in_out: manageForm.action_type,
        time: "9:40:10 PM",
        item_type: manageForm.item_type,
        done_by: manageTruckStock.in_charge,
      },
      ...prev,
    ]);

    setManageTruckStock(null);
    addToast(
      `Car stock updated for Truck ${manageTruckStock.truck_id}`,
      "success"
    );
  };

  const handleExportCSV = () => {
    addToast("Exported table data to CSV", "success");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title="Utilities"
        subtitle={
          moduleView === "car_stock"
            ? "Car Stock Transaction"
            : moduleView === "stock_history"
            ? "Stock Transaction History"
            : "Store Inventory"
        }
      />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Module Switcher Tabs + Action Buttons matching Figma 1:1691, 3:1700, 3:1704 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg shadow-2xs">
            <button
              type="button"
              onClick={() => setModuleView("store_inventory")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                moduleView === "store_inventory"
                  ? "bg-[#5948DB] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Store Inventory</span>
            </button>
            <button
              type="button"
              onClick={() => setModuleView("car_stock")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                moduleView === "car_stock"
                  ? "bg-[#5948DB] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Car Stock Transaction</span>
            </button>
            <button
              type="button"
              onClick={() => setModuleView("stock_history")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                moduleView === "stock_history"
                  ? "bg-[#5948DB] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>View Inventory History</span>
            </button>
          </div>

          {moduleView === "store_inventory" && (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowStockModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Update Inventory</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Item</span>
              </button>
            </div>
          )}

          {moduleView === "car_stock" && (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddTruckModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Truck</span>
              </button>
              <button
                type="button"
                onClick={() => setShowProductSummaryModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <FileBarChart2 className="w-3.5 h-3.5" />
                <span>Product Summary</span>
              </button>
            </div>
          )}
        </div>

        {/* ===================================================================== */}
        {/* VIEW 1: STORE INVENTORY (Figma 1:1691) */}
        {/* ===================================================================== */}
        {moduleView === "store_inventory" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            {/* Dark Navy-to-Blue Gradient Banner */}
            <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
              <h3 className="text-sm font-bold tracking-wide">
                Store Inventory
              </h3>
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>

            {/* Show [10] entries & Search bar */}
            <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-800 font-semibold focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-slate-600 font-medium">Search:</span>
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
                />
              </div>
            </div>

            <div className="overflow-x-auto touch-pan-x">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      PRODUCT ID
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      PRODUCT NAME
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      CATEGORY
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/60">
                      PRICE (AED)
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      PREVIOUS STOCK
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      CURRENT STOCK
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      DAMAGED STOCK
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      LAST UPDATED
                    </th>
                    <th className="px-4 py-3 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredInventory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/90 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {item.product_id}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3 text-slate-600 border-r border-slate-200">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 border-r border-slate-200">
                        AED {item.price}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        {item.previous_stock}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">
                        {item.current_stock}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-rose-600 border-r border-slate-200">
                        {item.damaged_stock}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                        {item.last_updated}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setHistoryProductFilter(item.product_name);
                              setModuleView("stock_history");
                            }}
                            className="px-3 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingItem({ ...item })}
                            className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div>
                Showing 1 to {filteredInventory.length} of{" "}
                {filteredInventory.length} entries
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#5948DB] text-white font-bold"
                >
                  1
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: CAR STOCK TRANSACTION (Figma 3:1704 - steps/1163/media_0.png) */}
        {/* ===================================================================== */}
        {moduleView === "car_stock" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            {/* Dark Navy-to-Blue Gradient Banner */}
            <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold tracking-wide">
                Truck Delivery and Details
              </h2>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-200">
                  <span>Show</span>
                  <select className="px-2 py-1 border border-slate-400/40 rounded bg-white text-slate-800 font-semibold">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  <span>trucks</span>
                </div>
                <input
                  type="text"
                  placeholder="Search trucks..."
                  value={truckSearch}
                  onChange={(e) => setTruckSearch(e.target.value)}
                  className="w-48 px-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto touch-pan-x">
              <table className="w-full text-left text-xs border-collapse min-w-[800px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>TRUCK ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>IN-CHARGE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      ASSISTANTS
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>ROUTE</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>LAST UPDATED</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      STOCK
                    </th>
                    <th className="px-4 py-3 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredTrucks.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/90 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {t.truck_id}
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-semibold border-r border-slate-200">
                        {t.in_charge}
                      </td>
                      <td className="px-4 py-3 text-slate-600 border-r border-slate-200">
                        {t.assistants}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700 border-r border-slate-200">
                        {t.route}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                        {t.last_updated}
                      </td>
                      <td className="px-4 py-3 text-center border-r border-slate-200">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setViewTruckStock(t)}
                            className="px-3 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => setManageTruckStock(t)}
                            className="px-3 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingTruck({ ...t })}
                            className="p-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 transition-colors cursor-pointer"
                            title="Edit Truck Settings"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHistoryTruckFilter(t.truck_id);
                              setModuleView("stock_history");
                            }}
                            className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            title="View Truck Stock History"
                          >
                            <Clock className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div>
                Showing 1 to {filteredTrucks.length} of 35 trucks
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-500"
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#5948DB] text-white font-bold"
                >
                  1
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700"
                >
                  2
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700"
                >
                  3
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700"
                >
                  4
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 3: STOCK TRANSACTION HISTORY (Figma 3:1700 - steps/1159/media_0.png) */}
        {/* ===================================================================== */}
        {moduleView === "stock_history" && (
          <div className="space-y-5">
            {/* 6 KPI Cards matching exact Figma 3:1700 values */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  label: "PREVIOUS STOCK",
                  val: "0",
                  color: "text-slate-800",
                  border: "border-l-4 border-l-blue-500",
                },
                {
                  label: "STOCK INWARD",
                  val: "243393",
                  color: "text-emerald-600",
                  border: "border-l-4 border-l-emerald-500",
                },
                {
                  label: "STOCK OUTWARD",
                  val: "243393",
                  color: "text-amber-600",
                  border: "border-l-4 border-l-amber-500",
                },
                {
                  label: "DAMAGED ITEMS",
                  val: "0",
                  color: "text-rose-600",
                  border: "border-l-4 border-l-rose-500",
                },
                {
                  label: "CURRENT STOCK",
                  val: "0",
                  color: "text-indigo-700",
                  border: "border-l-4 border-l-indigo-500",
                },
                {
                  label: "DISPOSED STOCK",
                  val: "0",
                  color: "text-slate-600",
                  border: "border-l-4 border-l-slate-400",
                },
              ].map((k, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-md border border-slate-200 ${k.border} p-3.5 shadow-2xs`}
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {k.label}
                  </span>
                  <div
                    className={`text-lg font-extrabold font-mono mt-1 ${k.color}`}
                  >
                    {k.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Stock History Panel (Figma 3:1700) */}
            <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Filter Stock History
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={historyFromDate}
                    onChange={(e) => setHistoryFromDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={historyToDate}
                    onChange={(e) => setHistoryToDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Truck ID
                  </label>
                  <select
                    value={historyTruckFilter}
                    onChange={(e) => setHistoryTruckFilter(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
                  >
                    <option value="All">Select Truck</option>
                    {trucks.map((t) => (
                      <option key={t.id} value={t.truck_id}>
                        {t.truck_id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Product
                  </label>
                  <select
                    value={historyProductFilter}
                    onChange={(e) => setHistoryProductFilter(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
                  >
                    <option value="All">5 gal water</option>
                    {inventory.map((i) => (
                      <option key={i.id} value={i.product_name}>
                        {i.product_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setHistoryFromDate("");
                    setHistoryToDate("");
                    setHistoryTruckFilter("All");
                    setHistoryProductFilter("All");
                    setHistorySearch("");
                  }}
                  className="py-1.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-md text-xs transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() =>
                    addToast("Stock history filters applied", "success")
                  }
                  className="py-1.5 px-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-md text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Stock Transaction History Table (Figma 3:1700) */}
            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
                <h3 className="text-sm font-bold tracking-wide">
                  Stock Transaction History
                </h3>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>

              <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span>Show</span>
                  <select className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-800 font-semibold">
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
                    placeholder="Search history..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[900px]">
                  <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                    <tr>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        DATE
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        TRUCK ID
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        CITY
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        PRODUCT ID
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        PRODUCT NAME
                      </th>
                      <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                        QUANTITY
                      </th>
                      <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                        IN/OUT
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        TIME
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/60">
                        ITEM TYPE
                      </th>
                      <th className="px-4 py-3">DONE BY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {filteredHistory.map((h) => (
                      <tr
                        key={h.id}
                        className="hover:bg-slate-50/90 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                          {h.date}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900 border-r border-slate-200">
                          {h.truck_id}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-200">
                          {h.city}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700 border-r border-slate-200">
                          {h.product_id}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                          {h.product_name}
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-extrabold text-slate-900 border-r border-slate-200">
                          {h.quantity}
                        </td>
                        <td className="px-4 py-3 text-center border-r border-slate-200">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              h.in_out === "IN"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {h.in_out}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                          {h.time}
                        </td>
                        <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                          {h.item_type}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {h.done_by}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add New Truck Modal (Figma 3:1708) */}
      {showAddTruckModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Add New Truck</h2>
              <button
                type="button"
                onClick={() => setShowAddTruckModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateTruck} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Truck ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. T6360"
                  value={newTruckForm.truck_id}
                  onChange={(e) =>
                    setNewTruckForm({ ...newTruckForm, truck_id: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  In-Charge (Salesman ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 32"
                  value={newTruckForm.in_charge}
                  onChange={(e) =>
                    setNewTruckForm({
                      ...newTruckForm,
                      in_charge: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Assistants
                </label>
                <input
                  type="text"
                  placeholder="e.g. 79"
                  value={newTruckForm.assistants}
                  onChange={(e) =>
                    setNewTruckForm({
                      ...newTruckForm,
                      assistants: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Route *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6360"
                  value={newTruckForm.route}
                  onChange={(e) =>
                    setNewTruckForm({ ...newTruckForm, route: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTruckModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer"
                >
                  Save Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Summary Modal (Figma 3:1712) */}
      {showProductSummaryModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Product Summary</h2>
              <button
                type="button"
                onClick={() => setShowProductSummaryModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#5948DB] text-white font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/60">
                        PRODUCT ID
                      </th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/60">
                        PRODUCT NAME
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        NORMAL STOCK
                      </th>
                      <th className="px-4 py-2.5 text-center">DAMAGED STOCK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-800 border-r border-slate-200">
                        015
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        5 gal water
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        2,257
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-800 border-r border-slate-200">
                        017
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        empty bottle
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        852
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-800 border-r border-slate-200">
                        018
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        COOLER
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        0
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">
                        0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowProductSummaryModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Truck Stock Modal (Figma 3:1716) */}
      {viewTruckStock && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                Truck Stock Details — {viewTruckStock.truck_id}
              </h2>
              <button
                type="button"
                onClick={() => setViewTruckStock(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#5948DB] text-white font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="px-3.5 py-2.5 border-r border-[#7161F0]/60">
                        PRODUCT
                      </th>
                      <th className="px-3.5 py-2.5 text-center border-r border-[#7161F0]/60">
                        NORMAL STOCK
                      </th>
                      <th className="px-3.5 py-2.5 text-center">
                        DAMAGED STOCK
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(viewTruckStock.stock_items || []).map((s, idx) => (
                      <tr key={idx}>
                        <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                          {s.name}
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                          {s.filled}
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-rose-600">
                          {s.damaged}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setViewTruckStock(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Truck Stock Modal (Figma 3:1720) */}
      {manageTruckStock && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                Manage Car Stock — {manageTruckStock.truck_id}
              </h2>
              <button
                type="button"
                onClick={() => setManageTruckStock(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={handleManageTruckSubmit}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Product
                </label>
                <select
                  value={manageForm.product_name}
                  onChange={(e) =>
                    setManageForm({
                      ...manageForm,
                      product_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-medium text-slate-900"
                >
                  {inventory.map((i) => (
                    <option key={i.id} value={i.product_name}>
                      {i.product_name} ({i.product_id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    IN / OUT
                  </label>
                  <select
                    value={manageForm.action_type}
                    onChange={(e) =>
                      setManageForm({
                        ...manageForm,
                        action_type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-medium text-slate-900"
                  >
                    <option value="OUT">OUT (Load to Truck)</option>
                    <option value="IN">IN (Return to Store)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Item Type
                  </label>
                  <select
                    value={manageForm.item_type}
                    onChange={(e) =>
                      setManageForm({
                        ...manageForm,
                        item_type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-medium text-slate-900"
                  >
                    <option value="NORMAL">NORMAL</option>
                    <option value="DAMAGED">DAMAGED</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={manageForm.quantity}
                  onChange={(e) =>
                    setManageForm({ ...manageForm, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setManageTruckStock(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Inventory Modal (Figma 3:1692) */}
      {showStockModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Update Inventory</h2>
              <button
                type="button"
                onClick={() => setShowStockModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleStockUpdate} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                >
                  {inventory.map((item) => (
                    <option key={item.id} value={item.product_name}>
                      {item.product_name} ({item.product_id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Action Type
                </label>
                <select
                  value={stockType}
                  onChange={(e) => setStockType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                >
                  <option value="IN">IN (Add Stock)</option>
                  <option value="OUT">OUT (Remove Stock)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold cursor-pointer"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Item Modal (Figma 3:1696) */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Add New Item</h2>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Product ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 019"
                    value={newProduct.product_id}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        product_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 200ml Cup Water Carton"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Truck Details Modal */}
      {editingTruck && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                Edit Truck ({editingTruck.truck_id})
              </h2>
              <button
                type="button"
                onClick={() => setEditingTruck(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTrucks((prev) =>
                  prev.map((t) =>
                    t.id === editingTruck.id ? editingTruck : t
                  )
                );
                setEditingTruck(null);
                addToast(`Truck ${editingTruck.truck_id} updated`, "success");
              }}
              className="p-5 space-y-3 text-xs"
            >
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  In-Charge
                </label>
                <input
                  type="text"
                  value={editingTruck.in_charge}
                  onChange={(e) =>
                    setEditingTruck({
                      ...editingTruck,
                      in_charge: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Assistants
                </label>
                <input
                  type="text"
                  value={editingTruck.assistants}
                  onChange={(e) =>
                    setEditingTruck({
                      ...editingTruck,
                      assistants: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Route
                </label>
                <input
                  type="text"
                  value={editingTruck.route}
                  onChange={(e) =>
                    setEditingTruck({ ...editingTruck, route: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTruck(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#2563EB] text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
