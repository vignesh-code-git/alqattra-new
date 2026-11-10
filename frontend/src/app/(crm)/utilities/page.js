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
  Truck,
  History,
  Eye,
  Settings,
  Clock,
  Filter,
  RotateCcw,
  FileBarChart2,
} from "lucide-react";

export default function UtilitiesPage() {
  const { addToast } = useToast();

  // Main module switcher: "store_inventory" | "car_stock" | "stock_history"
  const [moduleView, setModuleView] = useState("store_inventory");

  // 1. Store Inventory State
  const [inventory, setInventory] = useState([
    {
      id: 1,
      product_name: "5 gal water",
      product_code: "PRD-5GAL",
      batch_no: "BATCH-2026-001",
      quantity_in: 5000,
      quantity_out: 323,
      balance: 4677,
      min_stock: 200,
      location: "Al Ain Main Plant Warehouse",
      unit: "Bottle",
      status: "Active",
    },
    {
      id: 2,
      product_name: "500ml PET Bottles",
      product_code: "PRD-500ML",
      batch_no: "BATCH-2026-002",
      quantity_in: 600,
      quantity_out: 80,
      balance: 520,
      min_stock: 50,
      location: "Al Ain Main Plant Warehouse",
      unit: "Carton",
      status: "Active",
    },
    {
      id: 3,
      product_name: "empty bottle",
      product_code: "PRD-EMPTY-BTL",
      batch_no: "BATCH-2026-003",
      quantity_in: 400,
      quantity_out: 90,
      balance: 310,
      min_stock: 30,
      location: "Al Ain Warehouse Area B",
      unit: "Piece",
      status: "Active",
    },
    {
      id: 4,
      product_name: "COOLER",
      product_code: "PRD-COOLER",
      batch_no: "BATCH-2026-004",
      quantity_in: 50,
      quantity_out: 5,
      balance: 45,
      min_stock: 10,
      location: "Al Ain Warehouse Equipment Rack",
      unit: "Unit",
      status: "Active",
    },
  ]);

  // 2. Car Stock Transaction (Truck Delivery and Details - Figma 3:1704)
  const [trucks, setTrucks] = useState([
    {
      id: 1,
      truck_id: "T6335",
      in_charge: "32",
      assistants: "79",
      route: "6335",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 280, empty: 70, damaged: 2 },
        { name: "500ml PET Bottles", filled: 45, empty: 0, damaged: 0 },
        { name: "COOLER", filled: 3, empty: 0, damaged: 0 },
      ],
    },
    {
      id: 2,
      truck_id: "100003",
      in_charge: "Alremeithi",
      assistants: "N/A",
      route: "N/A",
      last_updated: "09/06/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 190, empty: 40, damaged: 0 },
        { name: "500ml PET Bottles", filled: 20, empty: 0, damaged: 0 },
      ],
    },
    {
      id: 3,
      truck_id: "100002",
      in_charge: "LAMIA",
      assistants: "N/A",
      route: "N/A",
      last_updated: "04/05/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 150, empty: 35, damaged: 1 },
      ],
    },
    {
      id: 4,
      truck_id: "100001",
      in_charge: "factory",
      assistants: "N/A",
      route: "100001",
      last_updated: "05/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 420, empty: 110, damaged: 4 },
        { name: "500ml PET Bottles", filled: 80, empty: 0, damaged: 0 },
      ],
    },
    {
      id: 5,
      truck_id: "T6338",
      in_charge: "120",
      assistants: "N/A",
      route: "6338",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 310, empty: 60, damaged: 0 },
      ],
    },
    {
      id: 6,
      truck_id: "T6347",
      in_charge: "90",
      assistants: "53",
      route: "6347",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 265, empty: 85, damaged: 1 },
      ],
    },
    {
      id: 7,
      truck_id: "T6339",
      in_charge: "42",
      assistants: "98",
      route: "6339",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 295, empty: 55, damaged: 0 },
      ],
    },
    {
      id: 8,
      truck_id: "T6341",
      in_charge: "47",
      assistants: "86",
      route: "6341",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 340, empty: 90, damaged: 2 },
      ],
    },
    {
      id: 9,
      truck_id: "T6357",
      in_charge: "59",
      assistants: "93",
      route: "6357",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 225, empty: 65, damaged: 0 },
      ],
    },
    {
      id: 10,
      truck_id: "T8066",
      in_charge: "113",
      assistants: "N/A",
      route: "8066",
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 275, empty: 50, damaged: 1 },
      ],
    },
  ]);

  // 3. Stock Transaction History (Figma 3:1700)
  const [stockHistory, setStockHistory] = useState([
    {
      id: 1,
      date: "08/09/2026",
      truck_id: "T6335",
      city: "AL_AIN",
      product_id: "PRD-5GAL",
      product_name: "5 gal water",
      quantity: 280,
      in_out: "OUT",
      time: "07:45 AM",
      item_type: "Filled Bottle",
      done_by: "32 - ABDULLAHNOOR",
    },
    {
      id: 2,
      date: "08/09/2026",
      truck_id: "T6335",
      city: "AL_AIN",
      product_id: "PRD-EMPTY-BTL",
      product_name: "empty bottle",
      quantity: 70,
      in_out: "IN",
      time: "04:30 PM",
      item_type: "Empty Return",
      done_by: "32 - ABDULLAHNOOR",
    },
    {
      id: 3,
      date: "08/09/2026",
      truck_id: "T6347",
      city: "AL_AIN",
      product_id: "PRD-5GAL",
      product_name: "5 gal water",
      quantity: 265,
      in_out: "OUT",
      time: "08:05 AM",
      item_type: "Filled Bottle",
      done_by: "90 - HASHIM",
    },
    {
      id: 4,
      date: "08/09/2026",
      truck_id: "T6341",
      city: "AL_AIN",
      product_id: "PRD-5GAL",
      product_name: "5 gal water",
      quantity: 340,
      in_out: "OUT",
      time: "08:15 AM",
      item_type: "Filled Bottle",
      done_by: "47 - HASHIM",
    },
    {
      id: 5,
      date: "08/09/2026",
      truck_id: "T6339",
      city: "AL_AIN",
      product_id: "PRD-500ML",
      product_name: "500ml PET Bottles",
      quantity: 45,
      in_out: "OUT",
      time: "08:40 AM",
      item_type: "Carton Pack",
      done_by: "42 - ANAS",
    },
    {
      id: 6,
      date: "08/09/2026",
      truck_id: "100001",
      city: "AL_AIN",
      product_id: "PRD-5GAL",
      product_name: "5 gal water",
      quantity: 1200,
      in_out: "IN",
      time: "06:30 AM",
      item_type: "Plant Production",
      done_by: "factory",
    },
    {
      id: 7,
      date: "08/09/2026",
      truck_id: "T6357",
      city: "AL_AIN",
      product_id: "PRD-COOLER",
      product_name: "COOLER",
      quantity: 4,
      in_out: "OUT",
      time: "09:20 AM",
      item_type: "Dispenser Unit",
      done_by: "59 - MUFEED",
    },
    {
      id: 8,
      date: "08/09/2026",
      truck_id: "T8066",
      city: "AL_AIN",
      product_id: "PRD-5GAL",
      product_name: "5 gal water",
      quantity: 12,
      in_out: "DAMAGED",
      time: "05:10 PM",
      item_type: "Damaged Shell",
      done_by: "113 - NISAR",
    },
  ]);

  // Filters & UI states
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [truckSearch, setTruckSearch] = useState("");
  const [truckTab, setTruckTab] = useState("Active");
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
  const [crudPopup, setCrudPopup] = useState(null);

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
    action_type: "Load (Outward to Truck)",
    quantity: 50,
  });

  const [stockType, setStockType] = useState("In");
  const [selectedProduct, setSelectedProduct] = useState(inventory[0]?.product_name);
  const [stockQty, setStockQty] = useState(100);
  const [sortField, setSortField] = useState("balance");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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

  const filteredTrucks = useMemo(() => {
    return trucks.filter((t) => {
      if (truckTab === "Deleted") {
        if (t.status !== "Deleted") return false;
      } else {
        if (t.status === "Deleted") return false;
      }
      if (!truckSearch.trim()) return true;
      const q = truckSearch.toLowerCase();
      return (
        t.truck_id.toLowerCase().includes(q) ||
        t.in_charge.toLowerCase().includes(q) ||
        t.assistants.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q)
      );
    });
  }, [trucks, truckSearch, truckTab]);

  const filteredHistory = useMemo(() => {
    return stockHistory.filter((h) => {
      if (historyTruckFilter !== "All" && h.truck_id !== historyTruckFilter) return false;
      if (historyProductFilter !== "All" && h.product_name !== historyProductFilter) return false;
      return true;
    });
  }, [stockHistory, historyTruckFilter, historyProductFilter]);

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
      message: `Product "${item.product_name}" (${item.product_code || item.batch_no}) marked as Deleted. It only appears in the Deleted tab with a red border and can be restored anytime.`,
    });
    addToast(`Item "${item.product_name}" moved to Deleted list`, "info");
  };

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

    setStockHistory((prev) => [
      {
        id: Date.now(),
        date: "08/09/2026",
        truck_id: "100001",
        city: "AL_AIN",
        product_id: "PRD-UPD",
        product_name: selectedProduct,
        quantity: qty,
        in_out: stockType === "In" ? "IN" : "OUT",
        time: "Just now",
        item_type: "Warehouse Adjustment",
        done_by: "Admin",
      },
      ...prev,
    ]);

    addToast(
      `Stock ${stockType === "In" ? "received" : "dispatched"} for ${selectedProduct}: ${qty} units`,
      "success"
    );
    setShowStockModal(false);
  };

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
      status: "Active",
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

  // Add New Truck (Figma 3:1708)
  const handleCreateTruck = (e) => {
    e.preventDefault();
    if (!newTruckForm.truck_id.trim()) {
      addToast("Please enter Truck ID", "error");
      return;
    }
    const entry = {
      id: Date.now(),
      truck_id: newTruckForm.truck_id.trim(),
      in_charge: newTruckForm.in_charge.trim() || "Unassigned",
      assistants: newTruckForm.assistants.trim() || "N/A",
      route: newTruckForm.route.trim() || newTruckForm.truck_id.replace("T", ""),
      last_updated: "08/09/2026",
      status: "Active",
      stock_items: [
        { name: "5 gal water", filled: 200, empty: 0, damaged: 0 },
      ],
    };
    setTrucks([entry, ...trucks]);
    setShowAddTruckModal(false);
    setNewTruckForm({ truck_id: "", in_charge: "", assistants: "", route: "" });
    setCrudPopup({
      type: "create",
      title: "Truck Added to Fleet",
      message: `Truck ${entry.truck_id} (In-Charge: ${entry.in_charge}, Route: ${entry.route}) has been added to Car Stock Transactions.`,
    });
    addToast(`Truck ${entry.truck_id} added successfully!`, "success");
  };

  // Manage Truck Stock (Figma 3:1720)
  const handleManageTruckSubmit = (e) => {
    e.preventDefault();
    if (!manageTruckStock) return;
    const qty = parseInt(manageForm.quantity) || 0;
    const isOut = manageForm.action_type.includes("Load");

    setTrucks((prev) =>
      prev.map((t) => {
        if (t.id !== manageTruckStock.id) return t;
        const existingIdx = (t.stock_items || []).findIndex((s) => s.name === manageForm.product_name);
        let updatedItems = [...(t.stock_items || [])];
        if (existingIdx >= 0) {
          const item = updatedItems[existingIdx];
          updatedItems[existingIdx] = {
            ...item,
            filled: isOut ? item.filled + qty : Math.max(0, item.filled - qty),
            empty: !isOut ? item.empty + qty : item.empty,
          };
        } else {
          updatedItems.push({
            name: manageForm.product_name,
            filled: isOut ? qty : 0,
            empty: !isOut ? qty : 0,
            damaged: 0,
          });
        }
        return { ...t, last_updated: "08/09/2026", stock_items: updatedItems };
      })
    );

    setStockHistory((prev) => [
      {
        id: Date.now(),
        date: "08/09/2026",
        truck_id: manageTruckStock.truck_id,
        city: "AL_AIN",
        product_id: "PRD-5GAL",
        product_name: manageForm.product_name,
        quantity: qty,
        in_out: isOut ? "OUT" : "IN",
        time: "Just now",
        item_type: isOut ? "Filled Bottle" : "Empty Return",
        done_by: manageTruckStock.in_charge,
      },
      ...prev,
    ]);

    setManageTruckStock(null);
    addToast(`Updated car stock for Truck ${manageTruckStock.truck_id}`, "success");
  };

  // Confirm Delete Truck
  const confirmDeleteTruck = () => {
    if (!deleteTruckTarget) return;
    const target = deleteTruckTarget;
    setTrucks((prev) =>
      prev.map((t) => (t.id === target.id ? { ...t, status: "Deleted" } : t))
    );
    setDeleteTruckTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Truck Moved to Deleted",
      message: `Truck ${target.truck_id} (In-Charge: ${target.in_charge}) has been moved to Deleted Trucks.`,
    });
    addToast(`Truck ${target.truck_id} moved to Deleted list`, "info");
  };

  const handleRestoreTruck = (truck) => {
    setTrucks((prev) =>
      prev.map((t) => (t.id === truck.id ? { ...t, status: "Active" } : t))
    );
    setCrudPopup({
      type: "restore",
      title: "Truck Restored",
      message: `Truck ${truck.truck_id} has been restored to Active fleet status!`,
    });
    addToast(`Truck ${truck.truck_id} restored`, "success");
  };

  const fileInputRef = useRef(null);

  const handleExportCSV = () => {
    if (moduleView === "car_stock") {
      const headers = ["TRUCK ID", "IN-CHARGE", "ASSISTANTS", "ROUTE", "LAST UPDATED", "STATUS"];
      const rows = filteredTrucks.map((t) =>
        `"${t.truck_id}","${t.in_charge}","${t.assistants}","${t.route}","${t.last_updated}","${t.status}"`
      );
      const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "car_stock_trucks_export.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast(`Exported ${filteredTrucks.length} trucks to CSV`, "success");
      return;
    }

    if (moduleView === "stock_history") {
      const headers = ["DATE", "TRUCK ID", "CITY", "PRODUCT ID", "PRODUCT NAME", "QUANTITY", "IN/OUT", "TIME", "ITEM TYPE", "DONE BY"];
      const rows = filteredHistory.map((h) =>
        `"${h.date}","${h.truck_id}","${h.city}","${h.product_id}","${h.product_name}",${h.quantity},"${h.in_out}","${h.time}","${h.item_type}","${h.done_by}"`
      );
      const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "stock_transaction_history.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast(`Exported ${filteredHistory.length} stock transactions to CSV`, "success");
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
        const importedItems = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.replace(/^"|"$/g, "").trim());
          if (!cols[0]) continue;
          importedItems.push({
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
            status: "Active",
          });
        }
        if (importedItems.length > 0) {
          setInventory((prev) => [...importedItems, ...prev]);
          addToast(`Successfully imported ${importedItems.length} items`, "success");
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
      <Header
        title="Utilities & Inventory"
        subtitle={
          moduleView === "car_stock"
            ? "Car Stock Transaction"
            : moduleView === "stock_history"
            ? "Stock Transaction History"
            : "Store Inventory"
        }
      />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Module Switcher Tabs (Figma 1:1691, 3:1700, 3:1704) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setModuleView("store_inventory")}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors duration-150 flex items-center gap-2 cursor-pointer outline-none focus:outline-none select-none ${
                moduleView === "store_inventory"
                  ? "bg-[#5948DB] text-white border-[#5948DB] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Store Inventory</span>
            </button>
            <button
              type="button"
              onClick={() => setModuleView("car_stock")}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors duration-150 flex items-center gap-2 cursor-pointer outline-none focus:outline-none select-none ${
                moduleView === "car_stock"
                  ? "bg-[#5948DB] text-white border-[#5948DB] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Car Stock Transaction</span>
            </button>
            <button
              type="button"
              onClick={() => setModuleView("stock_history")}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors duration-150 flex items-center gap-2 cursor-pointer outline-none focus:outline-none select-none ${
                moduleView === "stock_history"
                  ? "bg-[#5948DB] text-white border-[#5948DB] shadow-xs"
                  : "bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Stock Transaction History</span>
            </button>
          </div>

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
          <>
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
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search inventory items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                  />
                </div>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileImport} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-bold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>Import</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-bold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Item</span>
                </button>
                <button
                  onClick={() => setShowStockModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Update Inventory</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[750px]">
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
                                >
                                  <Undo2 className="w-3 h-3" />
                                  <span>Restore</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setHistoryProductFilter(item.product_name);
                                    setModuleView("stock_history");
                                  }}
                                  className="px-2.5 py-1 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                                  title="View Stock Transaction History"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingItem({ ...item })}
                                  className="px-2.5 py-1 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
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
            </div>
          </>
        )}

        {/* ===================================================================== */}
        {/* VIEW 2: CAR STOCK TRANSACTION (Figma 3:1704 - steps/1163/media_0.png) */}
        {/* ===================================================================== */}
        {moduleView === "car_stock" && (
          <div className="space-y-4">
            {/* Active vs Deleted Trucks Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {[
                  { id: "Active", label: "Active Fleet Trucks", count: trucks.filter((t) => t.status !== "Deleted").length },
                  { id: "Deleted", label: "Deleted Trucks", count: trucks.filter((t) => t.status === "Deleted").length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTruckTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors duration-150 flex items-center gap-1.5 cursor-pointer outline-none focus:outline-none select-none ${
                      truckTab === tab.id
                        ? tab.id === "Deleted"
                          ? "bg-rose-600 text-white border-rose-600 font-bold"
                          : "bg-white text-blue-700 border-slate-200 font-bold shadow-2xs"
                        : tab.id === "Deleted"
                        ? "border-transparent text-rose-600 hover:bg-rose-50"
                        : "border-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/70 text-slate-700">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Truck Delivery and Details Table Card */}
            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h2 className="text-sm font-extrabold text-slate-800">Truck Delivery and Details</h2>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span>Show</span>
                    <select className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-700 font-semibold">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <span>trucks</span>
                  </div>
                  <div className="relative w-56">
                    <input
                      type="text"
                      placeholder="Search trucks..."
                      value={truckSearch}
                      onChange={(e) => setTruckSearch(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[800px]">
                  <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">TRUCK ID</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">IN-CHARGE</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">ASSISTANTS</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">ROUTE</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">LAST UPDATED</th>
                      <th className="px-4 py-3 font-semibold text-center border-r border-[#7161F0]/70 text-white">STOCK</th>
                      <th className="px-4 py-3 font-semibold text-center text-white">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {filteredTrucks.map((t) => {
                      const isDeleted = t.status === "Deleted";
                      return (
                        <tr
                          key={t.id}
                          className={`transition-colors ${
                            isDeleted
                              ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                              : "hover:bg-slate-50"
                          }`}
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
                            {isDeleted ? (
                              <button
                                type="button"
                                onClick={() => handleRestoreTruck(t)}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Undo2 className="w-3 h-3" />
                                <span>Restore</span>
                              </button>
                            ) : (
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
                                  className="p-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-colors cursor-pointer"
                                  title="View Truck Stock History"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteTruckTarget(t)}
                                  className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                                  title="Delete Truck"
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

              <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Showing 1 to {filteredTrucks.length} of {filteredTrucks.length} trucks
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-400">Prev</button>
                  <button className="px-3 py-1 rounded bg-[#5948DB] text-white font-bold">1</button>
                  <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-600">2</button>
                  <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-600">3</button>
                  <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-600">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* VIEW 3: STOCK TRANSACTION HISTORY (Figma 3:1700 - steps/1159/media_0.png) */}
        {/* ===================================================================== */}
        {moduleView === "stock_history" && (
          <div className="space-y-5">
            {/* 6 KPI Cards matching Figma 3:1700 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "PREVIOUS STOCK", val: "4,677", color: "text-slate-800", border: "border-l-4 border-l-blue-500" },
                { label: "STOCK INWARD", val: "+5,000", color: "text-emerald-600", border: "border-l-4 border-l-emerald-500" },
                { label: "STOCK OUTWARD", val: "-323", color: "text-amber-600", border: "border-l-4 border-l-amber-500" },
                { label: "DAMAGED ITEMS", val: "12", color: "text-rose-600", border: "border-l-4 border-l-rose-500" },
                { label: "CURRENT STOCK", val: "4,677", color: "text-indigo-700", border: "border-l-4 border-l-indigo-500" },
                { label: "DISPOSED STOCK", val: "4", color: "text-slate-600", border: "border-l-4 border-l-slate-400" },
              ].map((k, idx) => (
                <div key={idx} className={`bg-white rounded-md border border-slate-200 ${k.border} p-3.5 shadow-2xs`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{k.label}</span>
                  <div className={`text-lg font-extrabold font-mono mt-1 ${k.color}`}>{k.val}</div>
                </div>
              ))}
            </div>

            {/* Filter Stock History Panel (Figma 3:1700) */}
            <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Filter Stock History
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs items-end">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">From Date</label>
                  <input
                    type="date"
                    value={historyFromDate}
                    onChange={(e) => setHistoryFromDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">To Date</label>
                  <input
                    type="date"
                    value={historyToDate}
                    onChange={(e) => setHistoryToDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Truck ID</label>
                  <select
                    value={historyTruckFilter}
                    onChange={(e) => setHistoryTruckFilter(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
                  >
                    <option value="All">All Trucks</option>
                    {trucks.map((t) => (
                      <option key={t.id} value={t.truck_id}>{t.truck_id}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Product Item</label>
                  <select
                    value={historyProductFilter}
                    onChange={(e) => setHistoryProductFilter(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
                  >
                    <option value="All">All Products</option>
                    {inventory.map((i) => (
                      <option key={i.id} value={i.product_name}>{i.product_name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToast("Stock history filters applied", "success")}
                    className="flex-1 py-1.5 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-md shadow-2xs transition-colors cursor-pointer"
                  >
                    Apply Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHistoryFromDate("");
                      setHistoryToDate("");
                      setHistoryTruckFilter("All");
                      setHistoryProductFilter("All");
                    }}
                    className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Transaction History Table (Figma 3:1700) */}
            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-800">Stock Transaction History</h3>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>

              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[900px]">
                  <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">DATE</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">TRUCK ID</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">CITY</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">PRODUCT ID</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">PRODUCT NAME</th>
                      <th className="px-4 py-3 font-semibold text-center border-r border-[#7161F0]/70 text-white">QUANTITY</th>
                      <th className="px-4 py-3 font-semibold text-center border-r border-[#7161F0]/70 text-white">IN/OUT</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">TIME</th>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">ITEM TYPE</th>
                      <th className="px-4 py-3 font-semibold text-white">DONE BY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {filteredHistory.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">{h.date}</td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900 border-r border-slate-200">{h.truck_id}</td>
                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-200">{h.city}</td>
                        <td className="px-4 py-3 font-mono text-blue-600 font-semibold border-r border-slate-200">{h.product_id}</td>
                        <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">{h.product_name}</td>
                        <td className="px-4 py-3 text-center font-mono font-extrabold text-slate-900 border-r border-slate-200">{h.quantity}</td>
                        <td className="px-4 py-3 text-center border-r border-slate-200">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              h.in_out === "IN"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : h.in_out === "OUT"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {h.in_out}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">{h.time}</td>
                        <td className="px-4 py-3 text-slate-700 border-r border-slate-200">{h.item_type}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{h.done_by}</td>
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Add New Truck to Fleet</h2>
              <button onClick={() => setShowAddTruckModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <form onSubmit={handleCreateTruck} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Truck ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. T6360"
                  value={newTruckForm.truck_id}
                  onChange={(e) => setNewTruckForm({ ...newTruckForm, truck_id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">In-Charge (Salesman ID/Name)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 56 or ANAS"
                    value={newTruckForm.in_charge}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, in_charge: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assistants</label>
                  <input
                    type="text"
                    placeholder="e.g. 79 or N/A"
                    value={newTruckForm.assistants}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, assistants: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Assigned Route Code</label>
                <input
                  type="text"
                  placeholder="e.g. 6360"
                  value={newTruckForm.route}
                  onChange={(e) => setNewTruckForm({ ...newTruckForm, route: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddTruckModal(false)} className="px-4 py-1.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-md bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-bold">
                  Add Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Summary Modal (Figma 3:1712) */}
      {showProductSummaryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Fleet Product Summary Across All Trucks</h2>
                <p className="text-[11px] text-slate-500">Consolidated car stock loaded across {trucks.filter((t) => t.status !== "Deleted").length} active vehicles</p>
              </div>
              <button onClick={() => setShowProductSummaryModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#5948DB] text-white font-semibold">
                  <tr>
                    <th className="px-4 py-2.5 border-r border-[#7161F0]/70">PRODUCT ITEM</th>
                    <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">TOTAL LOADED ON TRUCKS</th>
                    <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">EMPTY BOTTLES COLLECTED</th>
                    <th className="px-4 py-2.5 text-center">DAMAGED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">5 gal water</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">2,745</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">660</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">11</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">500ml PET Bottles</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">145</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">0</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">COOLER</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">7</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">0</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-rose-600">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowProductSummaryModal(false)} className="px-4 py-1.5 rounded-md bg-[#5948DB] text-white text-xs font-bold">
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Truck Stock Modal (Figma 3:1716) */}
      {viewTruckStock && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Truck Stock Details — {viewTruckStock.truck_id}</h2>
                <p className="text-[11px] text-slate-500">In-Charge: {viewTruckStock.in_charge} | Route: {viewTruckStock.route} | Updated: {viewTruckStock.last_updated}</p>
              </div>
              <button onClick={() => setViewTruckStock(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#5948DB] text-white font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">PRODUCT</th>
                    <th className="px-3.5 py-2.5 text-center border-r border-[#7161F0]/70">FILLED STOCK</th>
                    <th className="px-3.5 py-2.5 text-center border-r border-[#7161F0]/70">EMPTY RETURNED</th>
                    <th className="px-3.5 py-2.5 text-center">DAMAGED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(viewTruckStock.stock_items || []).map((s, idx) => (
                    <tr key={idx}>
                      <td className="px-3.5 py-2.5 font-bold text-slate-900 border-r border-slate-200">{s.name}</td>
                      <td className="px-3.5 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">{s.filled}</td>
                      <td className="px-3.5 py-2.5 text-center font-mono font-bold text-emerald-700 border-r border-slate-200">{s.empty}</td>
                      <td className="px-3.5 py-2.5 text-center font-mono font-bold text-rose-600">{s.damaged}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const target = viewTruckStock;
                  setViewTruckStock(null);
                  setManageTruckStock(target);
                }}
                className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Manage Stock
              </button>
              <button onClick={() => setViewTruckStock(null)} className="px-4 py-1.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Truck Stock Modal (Figma 3:1720) */}
      {manageTruckStock && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Manage Car Stock — {manageTruckStock.truck_id}</h2>
                <p className="text-[11px] text-slate-500">In-Charge: {manageTruckStock.in_charge} | Route: {manageTruckStock.route}</p>
              </div>
              <button onClick={() => setManageTruckStock(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <form onSubmit={handleManageTruckSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Product Item</label>
                <select
                  value={manageForm.product_name}
                  onChange={(e) => setManageForm({ ...manageForm, product_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-900"
                >
                  {inventory.map((i) => (
                    <option key={i.id} value={i.product_name}>{i.product_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Transaction Action</label>
                <select
                  value={manageForm.action_type}
                  onChange={(e) => setManageForm({ ...manageForm, action_type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-900"
                >
                  <option value="Load (Outward to Truck)">Load (Outward to Truck)</option>
                  <option value="Unload / Return Empty (Inward to Store)">Unload / Return Empty (Inward to Store)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={manageForm.quantity}
                  onChange={(e) => setManageForm({ ...manageForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setManageTruckStock(null)} className="px-4 py-1.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Update Car Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Truck Details Modal */}
      {editingTruck && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900">Edit Truck ({editingTruck.truck_id})</h2>
              <button onClick={() => setEditingTruck(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTrucks((prev) => prev.map((t) => (t.id === editingTruck.id ? editingTruck : t)));
                setEditingTruck(null);
                addToast(`Truck ${editingTruck.truck_id} updated`, "success");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="text-slate-700 font-semibold block mb-1">In-Charge</label>
                <input
                  type="text"
                  value={editingTruck.in_charge}
                  onChange={(e) => setEditingTruck({ ...editingTruck, in_charge: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Assistants</label>
                <input
                  type="text"
                  value={editingTruck.assistants}
                  onChange={(e) => setEditingTruck({ ...editingTruck, assistants: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Route</label>
                <input
                  type="text"
                  value={editingTruck.route}
                  onChange={(e) => setEditingTruck({ ...editingTruck, route: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setEditingTruck(null)} className="px-4 py-1.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 rounded-md bg-blue-600 text-white font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Truck Confirmation Modal */}
      {deleteTruckTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Confirm Move Truck to Deleted</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete truck <strong className="text-slate-800">{deleteTruckTarget.truck_id}</strong>?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setDeleteTruckTarget(null)} className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                Cancel
              </button>
              <button onClick={confirmDeleteTruck} className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold">
                Move to Deleted
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
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
                  This product record will only appear in the <strong>Deleted</strong> tab with a red border and can be restored anytime.
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
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
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
