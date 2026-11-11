"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Home,
  ArrowUpDown,
  Settings,
  RotateCcw,
  X,
  Search,
  Printer,
} from "lucide-react";

const INITIAL_STORE_ITEMS = [
  {
    id: 1,
    product_id: "015",
    item: "330ml PET Bottles",
    description: "0",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 2,
    product_id: "014",
    item: "500ml PET Bottles",
    description: "0",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 3,
    product_id: "013",
    item: "LIWA 500ml bottle",
    description: "new",
    current_stock: "3",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "amber",
  },
  {
    id: 4,
    product_id: "012",
    item: "MINI DISPENSER",
    description: "new",
    current_stock: "5",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "amber",
  },
  {
    id: 5,
    product_id: "011",
    item: "ALAIN SPARKLING 330ML",
    description: "Alain water",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 6,
    product_id: "010",
    item: "ALAIN STILL 330ML",
    description: "Alain water",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 7,
    product_id: "009",
    item: "ALAIN REGULAR 330ML",
    description: "Alainwater",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 8,
    product_id: "008",
    item: "Own Bottle",
    description: "bottle with customer",
    current_stock: "N/A",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "slate",
  },
  {
    id: 9,
    product_id: "007",
    item: "200 ML CUP",
    description: "30 IN BOX",
    current_stock: "151",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "emerald",
  },
  {
    id: 10,
    product_id: "006",
    item: "STEEL STAND 5 BOTTLE",
    description: "new",
    current_stock: "7",
    old_stock: "N/A",
    damaged: "N/A",
    discarded: "N/A",
    stock_color: "amber",
  },
];

const INITIAL_TRUCKS = [
  {
    id: 1,
    truck_id: "T6335",
    in_charge: "32",
    assistants: "-",
    route: "6335",
    last_updated: "08/09/2026",
    last_updated_full: "9/8/2026, 7:21:48 AM",
    stocks: [
      { item: "5 gal water", added: 192, delivered: 0, used: 0, damaged: 0, balance: 192, returned: 0 },
      { item: "empty bottle", added: 192, delivered: 0, used: 0, damaged: 0, balance: 192, returned: 0 },
    ],
  },
  {
    id: 2,
    truck_id: "100001",
    in_charge: "factory",
    assistants: "-",
    route: "100001",
    last_updated: "25/11/2025",
    last_updated_full: "11/25/2025, 8:15:00 AM",
    stocks: [
      { item: "5 gal water", added: 250, delivered: 180, used: 0, damaged: 0, balance: 70, returned: 0 },
    ],
  },
  {
    id: 3,
    truck_id: "100002",
    in_charge: "110",
    assistants: "-",
    route: "1234",
    last_updated: "25/09/2025",
    last_updated_full: "9/25/2025, 9:00:00 AM",
    stocks: [
      { item: "5 gal water", added: 160, delivered: 120, used: 0, damaged: 0, balance: 40, returned: 0 },
    ],
  },
  {
    id: 4,
    truck_id: "T3115",
    in_charge: "119",
    assistants: "140, 141",
    route: "3115",
    last_updated: "10/09/2025",
    last_updated_full: "9/10/2025, 7:45:12 AM",
    stocks: [
      { item: "5 gal water", added: 200, delivered: 150, used: 0, damaged: 0, balance: 50, returned: 0 },
    ],
  },
  {
    id: 5,
    truck_id: "T9302",
    in_charge: "136",
    assistants: "142",
    route: "9302",
    last_updated: "10/09/2025",
    last_updated_full: "9/10/2025, 8:02:10 AM",
    stocks: [
      { item: "5 gal water", added: 180, delivered: 140, used: 0, damaged: 0, balance: 40, returned: 0 },
    ],
  },
  {
    id: 6,
    truck_id: "T6358",
    in_charge: "55",
    assistants: "86, 134",
    route: "6358",
    last_updated: "12/05/2024",
    last_updated_full: "5/12/2024, 7:30:00 AM",
    stocks: [
      { item: "5 gal water", added: 210, delivered: 190, used: 0, damaged: 0, balance: 20, returned: 0 },
    ],
  },
  {
    id: 7,
    truck_id: "T6357",
    in_charge: "84",
    assistants: "132, 133",
    route: "6357",
    last_updated: "12/05/2024",
    last_updated_full: "5/12/2024, 7:35:00 AM",
    stocks: [
      { item: "5 gal water", added: 195, delivered: 175, used: 0, damaged: 0, balance: 20, returned: 0 },
    ],
  },
  {
    id: 8,
    truck_id: "T8066",
    in_charge: "57",
    assistants: "118, 97",
    route: "8066",
    last_updated: "12/05/2024",
    last_updated_full: "5/12/2024, 7:50:00 AM",
    stocks: [
      { item: "5 gal water", added: 220, delivered: 200, used: 0, damaged: 0, balance: 20, returned: 0 },
    ],
  },
  {
    id: 9,
    truck_id: "T6684",
    in_charge: "48",
    assistants: "81",
    route: "6684",
    last_updated: "21/03/2024",
    last_updated_full: "3/21/2024, 8:10:00 AM",
    stocks: [
      { item: "5 gal water", added: 180, delivered: 160, used: 0, damaged: 0, balance: 20, returned: 0 },
    ],
  },
  {
    id: 10,
    truck_id: "T6356",
    in_charge: "38",
    assistants: "49",
    route: "6356",
    last_updated: "21/01/2024",
    last_updated_full: "1/21/2024, 7:15:00 AM",
    stocks: [
      { item: "5 gal water", added: 190, delivered: 170, used: 0, damaged: 0, balance: 20, returned: 0 },
    ],
  },
];

const PRODUCT_SUMMARY_LIST = [
  { name: "5 gal water", loaded: 4390, delivered: 2281, returned: 0 },
  { name: "COOLER", loaded: 14, delivered: 504, returned: 0 },
  { name: "empty bottle", loaded: 4586, delivered: 6876, returned: 0 },
  { name: "WATER PUMP", loaded: 1, delivered: 53, returned: 0 },
  { name: "coupon", loaded: 0, delivered: 29, returned: 0 },
  { name: "used cooler", loaded: 0, delivered: 2, returned: 0 },
  { name: "STEEL STAND 8", loaded: 2, delivered: 2, returned: 0 },
  { name: "STEEL STAND 5 BOTTLE", loaded: 0, delivered: 29, returned: 0 },
  { name: "200 ML CUP", loaded: 214, delivered: 2589, returned: 0 },
];

export default function UtilitiesPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("store"); // "store" | "car"
  const [subView, setSubView] = useState("list"); // "list" | "update_inventory" | "add_item" | "view_item" | "add_truck" | "manage_truck"

  const [storeItems, setStoreItems] = useState(INITIAL_STORE_ITEMS);
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Selected item / truck for modals & sub-views
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckModalOpen, setTruckModalOpen] = useState(false);
  const [productSummaryDrawerOpen, setProductSummaryDrawerOpen] = useState(false);
  const [summarySearch, setSummarySearch] = useState("");

  // Update Inventory State (update-inventrery.png)
  const [updateStockForm, setUpdateStockForm] = useState({
    date: "2026-09-08",
    store: "Al Ain",
    item: "",
    itemType: "New",
    quantity: "",
  });
  const [inputStocks, setInputStocks] = useState([]);

  // Add New Item State (add new item.png)
  const [newItemForm, setNewItemForm] = useState({
    product_id: "",
    item: "",
    price: "",
    description: "",
    priority: "Primary",
    asset: "Yes",
  });

  // Add New Truck State (add-new truck.png)
  const [newTruckForm, setNewTruckForm] = useState({
    truck_id: "",
    city: "",
    route: "",
  });

  // Manage Truck Stock State (truck-manage.png)
  const [manageTruckForm, setManageTruckForm] = useState({
    product: "",
    store: "Al Ain",
    action: "Add to Truck",
    condition: "New",
    quantity: "",
  });

  const filteredStoreItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return storeItems;
    return storeItems.filter(
      (i) =>
        i.product_id.toLowerCase().includes(q) ||
        i.item.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
    );
  }, [storeItems, searchQuery]);

  const filteredTrucks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return trucks;
    return trucks.filter(
      (t) =>
        t.truck_id.toLowerCase().includes(q) ||
        t.in_charge.toLowerCase().includes(q) ||
        t.route.toLowerCase().includes(q)
    );
  }, [trucks, searchQuery]);

  const filteredProductSummary = useMemo(() => {
    const q = summarySearch.trim().toLowerCase();
    if (!q) return PRODUCT_SUMMARY_LIST;
    return PRODUCT_SUMMARY_LIST.filter((p) => p.name.toLowerCase().includes(q));
  }, [summarySearch]);

  // Handlers
  const handleAddInputStock = (e) => {
    e.preventDefault();
    if (!updateStockForm.item || !updateStockForm.quantity) {
      addToast("Please select an Item and enter Quantity", "error");
      return;
    }
    const found = storeItems.find((s) => s.item === updateStockForm.item);
    const entry = {
      id: Date.now(),
      date: updateStockForm.date,
      item_id: found ? found.product_id : "016",
      item_name: updateStockForm.item,
      item_type: updateStockForm.itemType,
      store: updateStockForm.store,
      quantity: updateStockForm.quantity,
    };
    setInputStocks((prev) => [entry, ...prev]);
    setUpdateStockForm({ ...updateStockForm, quantity: "" });
    addToast(`Added ${entry.quantity} of ${entry.item_name} to input stocks`, "success");
  };

  const handleSaveNewProduct = (e) => {
    e.preventDefault();
    if (!newItemForm.product_id.trim() || !newItemForm.item.trim()) {
      addToast("Please fill in Product ID and Product Name", "error");
      return;
    }
    const created = {
      id: Date.now(),
      product_id: newItemForm.product_id.trim(),
      item: newItemForm.item.trim(),
      description: newItemForm.description.trim() || "new",
      current_stock: "0",
      old_stock: "N/A",
      damaged: "N/A",
      discarded: "N/A",
      stock_color: "amber",
    };
    setStoreItems((prev) => [created, ...prev]);
    addToast(`Product "${created.item}" saved successfully`, "success");
    setSubView("list");
  };

  const handleDeleteStoreItem = (row) => {
    setStoreItems((prev) => prev.filter((i) => i.id !== row.id));
    addToast(`Item "${row.item}" deleted`, "info");
  };

  const handleAddNewTruck = (e) => {
    e.preventDefault();
    if (!newTruckForm.truck_id.trim()) {
      addToast("Please enter a Truck ID", "error");
      return;
    }
    const created = {
      id: Date.now(),
      truck_id: newTruckForm.truck_id.trim(),
      in_charge: "32",
      assistants: "-",
      route: newTruckForm.route || "6335",
      last_updated: "08/09/2026",
      last_updated_full: "9/8/2026, 10:00:00 AM",
      stocks: [
        { item: "5 gal water", added: 0, delivered: 0, used: 0, damaged: 0, balance: 0, returned: 0 },
      ],
    };
    setTrucks((prev) => [created, ...prev]);
    addToast(`Truck "${created.truck_id}" added successfully`, "success");
    setSubView("list");
  };

  const handleAddTruckRecord = (e) => {
    e.preventDefault();
    if (!manageTruckForm.product || !manageTruckForm.quantity || !selectedTruck) {
      addToast("Please select a Product and enter Quantity", "error");
      return;
    }
    const qty = Number(manageTruckForm.quantity) || 0;
    const updatedTruck = {
      ...selectedTruck,
      stocks: [
        ...selectedTruck.stocks,
        {
          item: manageTruckForm.product,
          added: qty,
          delivered: 0,
          used: 0,
          damaged: 0,
          balance: qty,
          returned: 0,
        },
      ],
    };
    setSelectedTruck(updatedTruck);
    setTrucks((prev) => prev.map((t) => (t.id === updatedTruck.id ? updatedTruck : t)));
    setManageTruckForm({ ...manageTruckForm, quantity: "" });
    addToast(`Added ${qty} ${manageTruckForm.product} to ${selectedTruck.truck_id}`, "success");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Utilities" subtitle="Manage Inventory" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-3.5 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight text-[#1C1C1E]">Utilities</span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            /{" "}
            {subView === "update_inventory"
              ? "Update Inventory"
              : subView === "add_item"
              ? "Add New Item"
              : subView === "add_truck"
              ? "Add New Truck"
              : subView === "manage_truck"
              ? "Manage Truck Stock"
              : "Manage Inventory"}
          </span>
        </div>
        {subView !== "list" && (
          <button
            type="button"
            onClick={() => setSubView("list")}
            className="px-4 py-1.5 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition cursor-pointer"
          >
            Back to List
          </button>
        )}
      </div>

      {/* iOS Segmented Sub-navigation Tabs */}
      {subView === "list" && (
        <div className="px-6 pt-5 pb-1 flex flex-wrap items-center justify-between gap-4 max-w-7xl w-full mx-auto">
          <div className="flex items-center bg-[#E5E5EA]/80 p-0.5 rounded-full border border-black/5 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab("store");
                setSearchQuery("");
              }}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "store"
                  ? "bg-white text-[#1C1C1E] shadow-sm font-semibold"
                  : "text-[#8E8E93] hover:text-[#1C1C1E]"
              }`}
            >
              Store Inventory
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("car");
                setSearchQuery("");
              }}
              className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                activeTab === "car"
                  ? "bg-white text-[#1C1C1E] shadow-sm font-semibold"
                  : "text-[#8E8E93] hover:text-[#1C1C1E]"
              }`}
            >
              Car Stock Transaction
            </button>
          </div>

          {activeTab === "store" ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSubView("update_inventory")}
                className="px-4 py-1.5 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition cursor-pointer"
              >
                Update Stock
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewItemForm({
                    product_id: "",
                    item: "",
                    price: "",
                    description: "",
                    priority: "Primary",
                    asset: "Yes",
                  });
                  setSubView("add_item");
                }}
                className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/20"
              >
                + Add New Item
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setNewTruckForm({ truck_id: "", city: "", route: "" });
                  setSubView("add_truck");
                }}
                className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#007AFF]/20"
              >
                + Add New Truck
              </button>
              <button
                type="button"
                onClick={() => setProductSummaryDrawerOpen(true)}
                className="px-4 py-1.5 rounded-full bg-[#34C759] hover:bg-[#2FB34F] text-white text-xs font-semibold transition cursor-pointer shadow-sm shadow-[#34C759]/20"
              >
                Product Summary
              </button>
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex-1 space-y-6 max-w-7xl w-full mx-auto">
        {/* 1. STORE INVENTORY LIST VIEW */}
        {subView === "list" && activeTab === "store" && (
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Warehouse Inventory</h2>
              <p className="text-[#8E8E93] text-xs mt-0.5">Stock availability, damages, and replenishment</p>
            </div>

            <div className="px-6 py-3.5 bg-[#F9F9FB] border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#3C3C43]">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
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
                  placeholder="Search item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                    {[
                      "PRODUCT ID",
                      "ITEM",
                      "DESCRIPTION",
                      "CURRENT STOCK",
                      "OLD STOCK",
                      "DAMAGED",
                      "DISCARDED",
                      "ACTIONS",
                    ].map((col) => (
                      <th key={col} className="py-3 px-4 first:pl-6 last:pr-6">
                        <div className="flex items-center justify-between gap-1">
                          <span>{col}</span>
                          <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[12.5px] text-[#1C1C1E]">
                  {filteredStoreItems.slice(0, entriesPerPage).map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-mono font-medium text-[#007AFF]">
                        {row.product_id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#1C1C1E]">{row.item}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.description}</td>
                      <td className="py-3.5 px-4 font-semibold">
                        <span
                          className={
                            row.stock_color === "emerald"
                              ? "text-[#34C759]"
                              : row.stock_color === "amber"
                              ? "text-[#FF9500]"
                              : "text-[#8E8E93] font-normal"
                          }
                        >
                          {row.current_stock}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.old_stock}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.damaged}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.discarded}</td>
                      <td className="py-3.5 pl-4 pr-6">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItem(row);
                              setSubView("view_item");
                            }}
                            className="px-3.5 py-1 rounded-full bg-[#007AFF]/10 hover:bg-[#007AFF] text-[#007AFF] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStoreItem(row)}
                            className="px-3.5 py-1 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>Showing 1 to 10 of 15 entries</div>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-full bg-[#007AFF] text-white text-xs font-semibold flex items-center justify-center">
                  1
                </button>
                <button className="w-7 h-7 rounded-full text-[#3C3C43] hover:bg-black/5 text-xs flex items-center justify-center">
                  2
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CAR STOCK TRANSACTION LIST VIEW */}
        {subView === "list" && activeTab === "car" && (
          <div className="bg-white rounded-3xl shadow-sm border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                Truck Fleet & Vehicle Stock
              </h2>
              <p className="text-[#8E8E93] text-xs mt-0.5">Mobile truck stock tracking and route distribution</p>
            </div>

            <div className="px-6 py-3.5 bg-[#F9F9FB] border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#3C3C43]">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E] focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8E8E93]">Search:</span>
                <input
                  type="text"
                  placeholder="Filter trucks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                    {[
                      "TRUCK ID",
                      "IN-CHARGE",
                      "ASSISTANTS",
                      "ROUTE",
                      "LAST UPDATED",
                      "STOCK",
                      "ACTIONS",
                    ].map((col) => (
                      <th key={col} className="py-3 px-4 first:pl-6 last:pr-6">
                        <div className="flex items-center justify-between gap-1">
                          <span>{col}</span>
                          <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[12.5px] text-[#1C1C1E]">
                  {filteredTrucks.slice(0, entriesPerPage).map((truck) => (
                    <tr key={truck.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">
                        {truck.truck_id}
                      </td>
                      <td className="py-3.5 px-4 text-[#3C3C43]">{truck.in_charge}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{truck.assistants}</td>
                      <td className="py-3.5 px-4 font-mono text-[#007AFF] font-medium">{truck.route}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{truck.last_updated}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setTruckModalOpen(true);
                            }}
                            className="px-3 py-1 rounded-full bg-[#007AFF]/10 hover:bg-[#007AFF] text-[#007AFF] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setSubView("manage_truck");
                            }}
                            className="px-3 py-1 rounded-full bg-[#34C759]/15 hover:bg-[#34C759] text-[#248A3D] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 pl-4 pr-6">
                        <div className="flex items-center gap-3 text-[#8E8E93]">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setSubView("manage_truck");
                            }}
                            title="Configure Truck"
                            className="hover:text-[#1C1C1E] cursor-pointer"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              addToast(`Stock history synced for ${truck.truck_id}`, "info")
                            }
                            title="Reset / History"
                            className="hover:text-[#1C1C1E] cursor-pointer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div>Showing 1 to 10 of 29 entries</div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${
                      p === 1 ? "bg-[#007AFF] text-white" : "text-[#3C3C43] hover:bg-black/5"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. UPDATE INVENTORY SUB-VIEW (update-inventrery.png) */}
        {subView === "update_inventory" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Update Stock</h2>
              </div>

              <form onSubmit={handleAddInputStock} className="p-8 space-y-4 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Stock Date
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="date"
                      value={updateStockForm.date}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, date: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Store
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.store}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, store: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="Al Ain">Al Ain</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Item
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.item}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, item: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="">Select Item</option>
                      {storeItems.map((it) => (
                        <option key={it.id} value={it.item}>
                          {it.item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Item Type
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.itemType}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, itemType: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="New">New</option>
                      <option value="Old">Old</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Discarded">Discarded</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Quantity
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="number"
                      placeholder="Enter Quantity"
                      value={updateStockForm.quantity}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, quantity: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Input Stocks Table Card */}
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Input Stocks</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {[
                        "DATE",
                        "ITEM ID",
                        "ITEM NAME",
                        "ITEM TYPE",
                        "STORE",
                        "QUANTITY",
                        "ACTION",
                      ].map((col) => (
                        <th key={col} className="py-3 px-6">
                          <div className="flex items-center justify-between">
                            <span>{col}</span>
                            <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10 text-[12px] text-[#1C1C1E]">
                    {inputStocks.map((st) => (
                      <tr key={st.id} className="hover:bg-[#F2F2F7]/50">
                        <td className="py-3.5 px-6">{st.date}</td>
                        <td className="py-3.5 px-6 font-mono text-[#8E8E93]">{st.item_id}</td>
                        <td className="py-3.5 px-6 font-medium">{st.item_name}</td>
                        <td className="py-3.5 px-6">{st.item_type}</td>
                        <td className="py-3.5 px-6">{st.store}</td>
                        <td className="py-3.5 px-6 font-bold">{st.quantity}</td>
                        <td className="py-3.5 px-6">
                          <button
                            type="button"
                            onClick={() =>
                              setInputStocks((prev) => prev.filter((x) => x.id !== st.id))
                            }
                            className="px-3 py-1 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-[11px] font-semibold transition active:scale-95"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    {inputStocks.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-[#8E8E93] text-xs">
                          Showing 0 to 0 of 0 entries
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. ADD NEW ITEM SUB-VIEW (add new item.png) */}
        {subView === "add_item" && (
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                Add / Update Product
              </h2>
            </div>

            <form onSubmit={handleSaveNewProduct} className="p-8 space-y-4 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Product ID
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={newItemForm.product_id}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, product_id: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Product Name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={newItemForm.item}
                    onChange={(e) => setNewItemForm({ ...newItemForm, item: e.target.value })}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Price
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product Price"
                    value={newItemForm.price}
                    onChange={(e) => setNewItemForm({ ...newItemForm, price: e.target.value })}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Description
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product Description"
                    value={newItemForm.description}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, description: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Priority
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newItemForm.priority}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, priority: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Asset
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newItemForm.asset}
                    onChange={(e) => setNewItemForm({ ...newItemForm, asset: e.target.value })}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. VIEW STORE ITEM HISTORY SUB-VIEW (view-inventrary.png) */}
        {subView === "view_item" && selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">CURRENT STOCK</div>
                <div className="text-2xl font-bold text-[#34C759] mt-1 tracking-tight">
                  {selectedItem.current_stock === "N/A" ? 0 : selectedItem.current_stock}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">OLD STOCK</div>
                <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">DAMAGED STOCK</div>
                <div className="text-2xl font-bold text-[#FF3B30] mt-1 tracking-tight">0</div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  DISCARDED STOCK
                </div>
                <div className="text-2xl font-bold text-[#FF9500] mt-1 tracking-tight">0</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Stock Transaction History - {selectedItem.item} ({selectedItem.product_id})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {["DATE", "STORE", "ITEM", "ITEM TYPE", "QUANTITY", "UPDATED BY"].map(
                        (col) => (
                          <th key={col} className="py-3 px-6">
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                    <tr className="hover:bg-[#F2F2F7]/50">
                      <td className="py-3.5 px-6">{selectedItem.last_updated || "08/09/2026"}</td>
                      <td className="py-3.5 px-6">Al Ain</td>
                      <td className="py-3.5 px-6 font-semibold">{selectedItem.item}</td>
                      <td className="py-3.5 px-6">New</td>
                      <td className="py-3.5 px-6 font-bold">
                        {selectedItem.current_stock === "N/A" ? 0 : selectedItem.current_stock}
                      </td>
                      <td className="py-3.5 px-6 text-[#8E8E93]">IRSHAD (STORE KEEPER)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. ADD NEW TRUCK SUB-VIEW (add-new truck.png) */}
        {subView === "add_truck" && (
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Add New Truck</h2>
            </div>

            <form onSubmit={handleAddNewTruck} className="p-8 space-y-5 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Truck ID
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Truck ID"
                    value={newTruckForm.truck_id}
                    onChange={(e) =>
                      setNewTruckForm({ ...newTruckForm, truck_id: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  City
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newTruckForm.city}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, city: e.target.value })}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  >
                    <option value="">Select City</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                  Assigned Routes
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newTruckForm.route}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, route: e.target.value })}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  >
                    <option value="">Select Assigned Route</option>
                    <option value="6335">6335</option>
                    <option value="6350">6350</option>
                    <option value="6354">6354</option>
                    <option value="3115">3115</option>
                    <option value="9302">9302</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setSubView("list")}
                  className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold transition cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                >
                  Add Truck
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 7. MANAGE TRUCK STOCK SUB-VIEW (truck-manage.png) */}
        {subView === "manage_truck" && selectedTruck && (
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#007AFF]/20 bg-[#007AFF]/10">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Manage Truck Stock</h2>
            </div>

            <div className="p-8 space-y-6">
              <form onSubmit={handleAddTruckRecord} className="space-y-4 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Truck ID
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="text"
                      disabled
                      value={selectedTruck.truck_id}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#8E8E93] bg-[#F2F2F7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Product
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.product}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, product: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="">Select Product</option>
                      <option value="5 gal water">5 gal water</option>
                      <option value="empty bottle">empty bottle</option>
                      <option value="200 ML CUP">200 ML CUP</option>
                      <option value="COOLER">COOLER</option>
                      <option value="WATER PUMP">WATER PUMP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Store
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.store}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, store: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="Al Ain">Al Ain</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Action
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.action}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, action: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="Add to Truck">Add to Truck</option>
                      <option value="Return to Store">Return to Store</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Condition
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.condition}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, condition: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-semibold text-[#1C1C1E]">
                    Quantity
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="number"
                      placeholder="Enter Quantity"
                      value={manageTruckForm.quantity}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, quantity: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                  >
                    Add Record
                  </button>
                </div>
              </form>

              {/* Truck Stock Table inside Manage Truck Stock */}
              <div className="overflow-x-auto border border-[#3C3C43]/10 rounded-2xl overflow-hidden mt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {[
                        "PRODUCT",
                        "ADDED",
                        "DELIVERED",
                        "USED",
                        "DAMAGED",
                        "BALANCE",
                        "RETURNED",
                      ].map((col) => (
                        <th key={col} className="py-3 px-4">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                    {selectedTruck.stocks.map((st, idx) => (
                      <tr key={idx} className="hover:bg-[#F2F2F7]/50">
                        <td className="py-3 px-4 font-semibold">{st.item}</td>
                        <td className="py-3 px-4">{st.added}</td>
                        <td className="py-3 px-4">{st.delivered}</td>
                        <td className="py-3 px-4">{st.used}</td>
                        <td className="py-3 px-4">{st.damaged}</td>
                        <td className="py-3 px-4 font-bold">{st.balance}</td>
                        <td className="py-3 px-4">{st.returned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addToast(`Closed stock session for ${selectedTruck.truck_id}`, "info");
                    setSubView("list");
                  }}
                  className="px-5 py-2 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-xs font-semibold transition cursor-pointer active:scale-95"
                >
                  Close Stock
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 8. TRUCK STOCK DETAILS MODAL (truck view.png) */}
      {truckModalOpen && selectedTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1C1C1E]">Truck Stock Details</h3>
              <button
                type="button"
                onClick={() => setTruckModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between text-xs text-[#1C1C1E] gap-4 bg-[#F2F2F7]/50 p-4 rounded-2xl">
                <div>
                  <span className="font-semibold text-[#8E8E93]">Truck ID:</span> {selectedTruck.truck_id}
                </div>
                <div>
                  <span className="font-semibold text-[#8E8E93]">In-Charge:</span> {selectedTruck.in_charge}
                </div>
                <div>
                  <span className="font-semibold text-[#8E8E93]">Last Updated:</span>{" "}
                  {selectedTruck.last_updated_full}
                </div>
              </div>

              <div className="overflow-x-auto border border-[#3C3C43]/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {[
                        "ITEM",
                        "ADDED",
                        "DELIVERED",
                        "USED",
                        "DAMAGED",
                        "BALANCE",
                        "RETURNED",
                      ].map((c) => (
                        <th key={c} className="py-2.5 px-3">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                    {selectedTruck.stocks.map((st, idx) => (
                      <tr key={idx} className="hover:bg-[#F2F2F7]/50">
                        <td className="py-3 px-3 font-medium">{st.item}</td>
                        <td className="py-3 px-3">{st.added}</td>
                        <td className="py-3 px-3">{st.delivered}</td>
                        <td className="py-3 px-3">{st.used}</td>
                        <td className="py-3 px-3">{st.damaged}</td>
                        <td className="py-3 px-3 font-bold">{st.balance}</td>
                        <td className="py-3 px-3">{st.returned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#3C3C43]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setTruckModalOpen(false)}
                className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. TOTAL PRODUCT DELIVERY SUMMARY RIGHT-HAND DRAWER (product-summary.png) */}
      {productSummaryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 border-l border-[#3C3C43]/10">
            <div className="px-6 py-5 border-b border-[#3C3C43]/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1C1C1E]">
                Total Product Delivery Summary
              </h3>
              <button
                type="button"
                onClick={() => setProductSummaryDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 border-b border-[#3C3C43]/10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={summarySearch}
                  onChange={(e) => setSummarySearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-[#F2F2F7] border border-[#3C3C43]/15 rounded-full text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {filteredProductSummary.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[#3C3C43]/10 rounded-2xl p-4 bg-white shadow-xs"
                >
                  <div className="text-xs font-semibold text-[#1C1C1E] mb-3">{item.name}</div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    <div className="bg-[#007AFF]/10 p-2 rounded-xl">
                      <div className="text-sm font-bold text-[#007AFF]">{item.loaded}</div>
                      <div className="text-[9.5px] font-semibold text-[#007AFF] uppercase mt-0.5">LOADED</div>
                    </div>
                    <div className="bg-[#34C759]/10 p-2 rounded-xl">
                      <div className="text-sm font-bold text-[#34C759]">{item.delivered}</div>
                      <div className="text-[9.5px] font-semibold text-[#34C759] uppercase mt-0.5">
                        DELIVERED
                      </div>
                    </div>
                    <div className="bg-[#FF9500]/10 p-2 rounded-xl">
                      <div className="text-sm font-bold text-[#FF9500]">{item.returned}</div>
                      <div className="text-[9.5px] font-semibold text-[#FF9500] uppercase mt-0.5">RETURNED</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
