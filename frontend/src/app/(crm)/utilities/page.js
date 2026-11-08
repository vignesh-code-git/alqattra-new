"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Search,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  Boxes,
  ArrowUpDown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  PackagePlus,
  Upload,
  Download,
  Edit,
  Trash2,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function UtilitiesPage() {
  const { addToast } = useToast();

  const [inventory, setInventory] = useState([
    {
      id: 1,
      product_name: "5 Gallon Drinking Water",
      product_code: "PRD-5GAL",
      batch_no: "BATCH-2026-001",
      quantity_in: 5000,
      quantity_out: 323,
      balance: 4677,
      min_stock: 200,
      location: "Al Ain Main Plant Warehouse",
      unit: "Bottle",
    },
    {
      id: 2,
      product_name: "500ml PET Bottles (Pack of 24)",
      product_code: "PRD-500ML",
      batch_no: "BATCH-2026-002",
      quantity_in: 600,
      quantity_out: 80,
      balance: 520,
      min_stock: 50,
      location: "Al Ain Main Plant Warehouse",
      unit: "Carton",
    },
    {
      id: 3,
      product_name: "Empty 5 Gallon Polycarbonate Bottle",
      product_code: "PRD-EMPTY-BTL",
      batch_no: "BATCH-2026-003",
      quantity_in: 400,
      quantity_out: 90,
      balance: 310,
      min_stock: 30,
      location: "Al Ain Warehouse Area B",
      unit: "Piece",
    },
    {
      id: 4,
      product_name: "Hot & Cold Water Dispenser Cooler",
      product_code: "PRD-COOLER",
      batch_no: "BATCH-2026-004",
      quantity_in: 50,
      quantity_out: 5,
      balance: 45,
      min_stock: 10,
      location: "Al Ain Warehouse Equipment Rack",
      unit: "Unit",
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showStockModal, setShowStockModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);
  const [stockType, setStockType] = useState("In");
  const [selectedProduct, setSelectedProduct] = useState(inventory[0]?.product_name);
  const [stockQty, setStockQty] = useState(100);
  const [sortField, setSortField] = useState("balance");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    category: "Bottled Water (PET)",
    unit: "Bottle",
    min_stock: 50,
    initial_stock: 100,
    location: "Al Ain Main Warehouse",
  });

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getInventory();
      if (data && data.length > 0) {
        setInventory(data);
      }
    }
    loadData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredInventory = useMemo(() => {
    return inventory
      .filter((item) => {
        // Tab / Status filter - Deleted items NEVER show in main table, ONLY in Deleted tab
        if (activeTab === "Deleted") {
          if (item.status !== "Deleted") return false;
        } else {
          if (item.status === "Deleted") return false;
          if (activeTab === "Low Stock" && item.balance > (item.min_stock || 50)) return false;
        }

        if (!search) return true;
        const q = search.toLowerCase();
        return (
          (item.product_name && item.product_name.toLowerCase().includes(q)) ||
          (item.product_code && item.product_code.toLowerCase().includes(q)) ||
          (item.batch_no && item.batch_no.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === "number") {
          valA = valA || 0;
          valB = valB || 0;
        } else {
          valA = (valA || "").toString().toLowerCase();
          valB = (valB || "").toString().toLowerCase();
        }
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [inventory, search, activeTab, sortField, sortAsc]);

  // Checkbox selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInventory.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInventory.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete inventory item trigger
  const handleDeleteItem = (item) => {
    setDeleteTarget(item);
  };

  // Confirm delete inventory item (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteItem = async () => {
    if (!deleteTarget) return;
    const item = deleteTarget;
    try {
      if (item.id && typeof item.id === "number" && item.id < 100000) {
        await apiService.updateInventory(item.id, {
          location: `${item.location} [DELETED]`,
        });
      }
    } catch {
      // Optimistic update
    }
    setInventory((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "Deleted" } : i))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Item Moved to Deleted",
      message: `Product "${item.product_name}" (${item.product_code || item.batch_no}) marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Item "${item.product_name}" moved to Deleted list`, "info");
  };

  // Restore inventory item back to Active status
  const handleRestoreItem = async (item) => {
    try {
      if (item.id && typeof item.id === "number" && item.id < 100000) {
        await apiService.updateInventory(item.id, {
          location: item.location.replace(" [DELETED]", ""),
        });
      }
    } catch {
      // Optimistic update
    }
    setInventory((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "Active" } : i))
    );
    setCrudPopup({
      type: "restore",
      title: "Item Restored",
      message: `Product "${item.product_name}" has been restored to Active status!`,
    });
    addToast(`Item "${item.product_name}" restored to Active`, "success");
  };

  // Update inventory item in database
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      if (editingItem.id && typeof editingItem.id === "number" && editingItem.id < 100000) {
        await apiService.updateInventory(editingItem.id, {
          quantity_in: parseInt(editingItem.quantity_in) || 0,
          quantity_out: parseInt(editingItem.quantity_out) || 0,
          location: editingItem.location,
        });
      }
      const updatedBalance = (parseInt(editingItem.quantity_in) || 0) - (parseInt(editingItem.quantity_out) || 0);
      setInventory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...editingItem, balance: updatedBalance } : i))
      );
      setCrudPopup({
        type: "update",
        title: "Inventory Updated",
        message: `Inventory record for "${editingItem.product_name}" updated and saved to database successfully.`,
      });
      addToast(`Inventory for "${editingItem.product_name}" updated in database!`, "success");
    } catch {
      setInventory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...editingItem } : i))
      );
      addToast(`Item updated`, "success");
    }
    setEditingItem(null);
  };

  // Stock update action
  const handleStockUpdate = (e) => {
    e.preventDefault();
    const qty = parseInt(stockQty) || 0;
    if (qty <= 0) {
      addToast("Please enter a valid stock quantity", "error");
      return;
    }

    setInventory(
      inventory.map((item) => {
        if (item.product_name === selectedProduct) {
          const newBalance = stockType === "In" ? item.balance + qty : item.balance - qty;
          return {
            ...item,
            quantity_in: stockType === "In" ? item.quantity_in + qty : item.quantity_in,
            quantity_out: stockType === "Out" ? item.quantity_out + qty : item.quantity_out,
            balance: newBalance,
          };
        }
        return item;
      })
    );

    addToast(
      `Stock ${stockType === "In" ? "received" : "dispatched"} for ${selectedProduct}: ${qty} units`,
      "success"
    );
    setShowStockModal(false);
  };

  // Add new product item action
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.code) {
      addToast("Please provide product name and code", "error");
      return;
    }

    const created = {
      id: Date.now(),
      product_name: newProduct.name,
      product_code: newProduct.code,
      batch_no: `BATCH-2026-00${inventory.length + 1}`,
      quantity_in: parseInt(newProduct.initial_stock) || 0,
      quantity_out: 0,
      balance: parseInt(newProduct.initial_stock) || 0,
      min_stock: parseInt(newProduct.min_stock) || 20,
      location: newProduct.location,
      unit: newProduct.unit,
    };

    setInventory([...inventory, created]);
    setShowAddProductModal(false);
    setCrudPopup({
      type: "create",
      title: "Product Added to Warehouse",
      message: `Product "${created.product_name}" (${created.product_code}) added with initial stock of ${created.balance} ${created.unit}s.`,
    });
    addToast(`New product item ${created.product_name} added to warehouse!`, "success");
    setNewProduct({
      name: "",
      code: "",
      category: "Bottled Water (PET)",
      unit: "Bottle",
      min_stock: 50,
      initial_stock: 100,
      location: "Al Ain Main Warehouse",
    });
  };

  const fileInputRef = useRef(null);

  const handleExportCSV = () => {
    if (!filteredInventory.length) {
      addToast("No inventory items to export", "error");
      return;
    }
    const headers = ["PRODUCT ITEM", "CODE", "BATCH NO", "UNIT", "RECEIVED", "DISPATCHED", "AVAILABLE BALANCE", "LOCATION"];
    const rows = filteredInventory.map((i) =>
      `"${i.product_name}","${i.product_code}","${i.batch_no}","${i.unit}",${i.quantity_in},${i.quantity_out},${i.balance},"${i.location}"`
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_stock_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredInventory.length} inventory items to CSV`, "success");
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (!text) return;
        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          addToast("CSV must contain a header and at least 1 record", "error");
          return;
        }

        const parseLine = (line) => {
          const res = [];
          let cur = "";
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"' || ch === "'") {
              inQuotes = !inQuotes;
            } else if (ch === "," && !inQuotes) {
              res.push(cur.trim());
              cur = "";
            } else {
              cur += ch;
            }
          }
          res.push(cur.trim());
          return res;
        };

        const importedItems = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseLine(lines[i]);
          if (!cols || cols.length === 0 || !cols[0]) continue;
          const item = {
            id: Date.now() + i,
            product_name: cols[0] || "Imported Product",
            product_code: cols[1] || `PRD-IMP-${i}`,
            batch_no: cols[2] || `BATCH-2026-${100 + i}`,
            unit: cols[3] || "Bottle",
            quantity_in: parseInt(cols[4]) || 100,
            quantity_out: parseInt(cols[5]) || 0,
            balance: parseInt(cols[6]) || 100,
            min_stock: 20,
            location: cols[7] || "Al Ain Main Plant Warehouse",
          };
          importedItems.push(item);
        }

        if (importedItems.length > 0) {
          setInventory((prev) => [...importedItems, ...prev]);
          addToast(`Successfully imported ${importedItems.length} items from ${file.name}`, "success");
        } else {
          addToast("No valid inventory items found in CSV", "error");
        }
      } catch {
        addToast("Failed to parse CSV file", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Utilities & Inventory" subtitle="Store Inventory" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto max-w-full">
              {[
                { id: "All", label: "All Items", count: inventory.filter((i) => i.status !== "Deleted").length },
                { id: "Low Stock", label: "Low Stock", count: inventory.filter((i) => i.status !== "Deleted" && i.balance <= (i.min_stock || 50)).length },
                { id: "Deleted", label: "Deleted", count: inventory.filter((i) => i.status === "Deleted").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl border transition-colors duration-150 outline-none focus:outline-none flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none ${
                    activeTab === tab.id
                      ? tab.id === "Deleted"
                        ? "bg-rose-600 text-white border-rose-600 shadow-xs font-bold"
                        : "bg-white text-blue-700 border-slate-200 shadow-xs font-bold"
                      : tab.id === "Deleted"
                      ? "border-transparent text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeTab === tab.id
                        ? tab.id === "Deleted"
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-800"
                        : tab.id === "Deleted"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-200/70 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <span className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs hidden md:inline-block">
              Al Ain Main Plant Warehouse
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search inventory items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
              />
            </div>
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileImport} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-2xs whitespace-nowrap"
              title="Import inventory from CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Import</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-2xs whitespace-nowrap"
              title="Export inventory to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export</span>
            </button>
            {(search || activeTab !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveTab("All");
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100"
                title="Reset filters"
              >
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={() => setShowAddProductModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-2xs whitespace-nowrap"
            >
              <PackagePlus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
            <button
              onClick={() => setShowStockModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Update Stock</span>
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                <tr>
                  <th className="px-4 py-3 w-10 text-center border-r border-[#7161F0]/70 bg-[#5948DB]">
                    <input
                      type="checkbox"
                      checked={
                        filteredInventory.length > 0 &&
                        selectedIds.length === filteredInventory.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded-xs border-white/60 text-[#5948DB] accent-white focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th
                    onClick={() => handleSort("product_name")}
                    className="px-4 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>PRODUCT ITEM</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold select-none border-r border-[#7161F0]/70 text-white">BATCH NO</th>
                  <th className="px-4 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">UNIT</th>
                  <th
                    onClick={() => handleSort("quantity_in")}
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>RECEIVED</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("quantity_out")}
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>DISPATCHED</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("balance")}
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>AVAILABLE BALANCE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-semibold select-none border-r border-[#7161F0]/70 text-white">STORAGE LOCATION</th>
                  <th className="px-4 py-3 font-semibold select-none text-white text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredInventory.map((item) => {
                  const isLowStock = item.balance <= (item.min_stock || 50);
                  const isDeleted = item.status === "Deleted";

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isDeleted
                          ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                          : selectedIds.includes(item.id)
                          ? "bg-blue-50/50"
                          : "hover:bg-blue-50/30"
                      }`}
                    >
                      <td className={`px-4 py-3.5 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleSelectOne(item.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className={`px-4 py-3.5 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <div className="text-slate-900 font-bold text-xs">{item.product_name}</div>
                        <div className="text-[10px] text-blue-600 font-mono font-bold mt-0.5">{item.product_code}</div>
                      </td>
                      <td className={`px-4 py-3.5 font-mono text-slate-500 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>{item.batch_no}</td>
                      <td className={`px-4 py-3.5 text-center text-slate-700 font-medium border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>{item.unit}</td>
                      <td className={`px-4 py-3.5 text-right text-emerald-600 font-mono font-bold border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        +{item.quantity_in.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3.5 text-right text-rose-600 font-mono font-bold border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        -{item.quantity_out.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3.5 text-right border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <div className="flex items-center justify-end gap-1.5">
                          {isLowStock && !isDeleted && (
                            <span className="p-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200" title="Low stock alert">
                              <AlertTriangle className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span className="text-slate-900 font-mono font-extrabold text-sm">
                            {item.balance.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className={`px-5 py-3.5 text-slate-500 text-[11px] border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>{item.location}</td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        {isDeleted ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase">
                              Deleted
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRestoreItem(item)}
                              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                              title="Restore item"
                            >
                              <Undo2 className="w-3 h-3" />
                              <span>Restore</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingItem({ ...item })}
                              className="px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item)}
                              className="p-1 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredInventory.length}</span> of{" "}
              <span className="font-bold text-slate-800">{inventory.length}</span> items
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 font-medium cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-2xs">
                1
              </button>
              <button
                disabled
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 font-medium cursor-not-allowed flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Stock Movement Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Record Stock Movement</h2>
              <button onClick={() => setShowStockModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleStockUpdate} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Movement Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStockType("In")}
                    className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                      stockType === "In"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-600"
                    }`}
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Stock In (Receive)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStockType("Out")}
                    className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                      stockType === "Out"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-600"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Stock Out (Dispatch)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Select Item</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  {inventory.map((item) => (
                    <option key={item.id} value={item.product_name}>
                      {item.product_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Save Stock Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add New Warehouse Product</h2>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 330ml Mini Water Bottle (Pack of 24)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Product Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="PRD-330ML"
                    value={newProduct.code}
                    onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Unit of Measure</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Bottle">Bottle</option>
                    <option value="Carton">Carton</option>
                    <option value="Piece">Piece</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Initial Stock In</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.initial_stock}
                    onChange={(e) => setNewProduct({ ...newProduct, initial_stock: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Min. Alert Level</label>
                  <input
                    type="number"
                    min="1"
                    value={newProduct.min_stock}
                    onChange={(e) => setNewProduct({ ...newProduct, min_stock: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Inventory Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Edit Inventory Item</h3>
                <p className="text-[11px] text-slate-500">{editingItem.product_name} ({editingItem.product_code})</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateItem} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Total Received (In)</label>
                  <input
                    type="number"
                    min="0"
                    value={editingItem.quantity_in}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity_in: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Total Dispatched (Out)</label>
                  <input
                    type="number"
                    min="0"
                    value={editingItem.quantity_out}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity_out: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Storage Location</label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors"
                >
                  Save Changes to Database
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
                  Are you sure you want to delete <strong className="text-slate-800">{deleteTarget.product_name}</strong> ({deleteTarget.product_code || deleteTarget.batch_no})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This product record will be highlighted with a <strong>prominent red border</strong> in the table and can be restored at any time.
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
                onClick={confirmDeleteItem}
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
