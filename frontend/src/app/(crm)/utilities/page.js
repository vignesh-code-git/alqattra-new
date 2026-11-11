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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Utilities" subtitle="Manage Inventory" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Utilities</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            -{" "}
            {subView === "update_inventory"
              ? "Update Inventory"
              : subView === "add_item"
              ? "Add New Item"
              : subView === "add_truck"
              ? "Add New Truck"
              : subView === "manage_truck"
              ? "Manage Truck Stock"
              : "Manage Inventory"}{" "}
            - ALL
          </span>
        </div>
        {subView !== "list" && (
          <button
            type="button"
            onClick={() => setSubView("list")}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
          >
            Back to List
          </button>
        )}
      </div>

      {/* Sub-navigation bar when in main list view */}
      {subView === "list" && (
        <div className="px-6 pt-5 pb-1 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("store");
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
                activeTab === "store"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/80"
                  : "bg-slate-200/70 text-slate-500 hover:text-slate-800"
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
              className={`px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
                activeTab === "car"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/80"
                  : "bg-slate-200/70 text-slate-500 hover:text-slate-800"
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
                className="px-3.5 py-1.5 rounded bg-[#1E3A5F] hover:bg-[#152c4a] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Update Inventory
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
                className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
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
                className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                + Add New Truck
              </button>
              <button
                type="button"
                onClick={() => setProductSummaryDrawerOpen(true)}
                className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                Product Summary
              </button>
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex-1 space-y-6">
        {/* 1. STORE INVENTORY LIST VIEW (utilities-store inventery.png) */}
        {subView === "list" && activeTab === "store" && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Inventory Management</h2>
            </div>

            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700 focus:outline-none"
                >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-slate-300 rounded px-2.5 py-1 w-44 focus:outline-none focus:border-[#5948DB]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
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
                          <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {filteredStoreItems.slice(0, entriesPerPage).map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">
                        {row.product_id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{row.item}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.description}</td>
                      <td className="py-3.5 px-4 font-semibold">
                        <span
                          className={
                            row.stock_color === "emerald"
                              ? "text-[#48BB78]"
                              : row.stock_color === "amber"
                              ? "text-[#ECC94B]"
                              : "text-slate-600 font-normal"
                          }
                        >
                          {row.current_stock}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{row.old_stock}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.damaged}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.discarded}</td>
                      <td className="py-3.5 pl-4 pr-6">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItem(row);
                              setSubView("view_item");
                            }}
                            className="px-3 py-1 rounded bg-[#38A3C7] hover:bg-[#2d89a8] text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStoreItem(row)}
                            className="px-3 py-1 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-[11px] font-semibold transition cursor-pointer"
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

            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>Showing 1 to 10 of 15 entries</div>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-full bg-[#5948DB] text-white text-[11px] font-semibold flex items-center justify-center">
                  1
                </button>
                <button className="w-6 h-6 rounded-full text-slate-500 hover:bg-slate-100 text-[11px] flex items-center justify-center">
                  2
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CAR STOCK TRANSACTION LIST VIEW (car stock transactions.png) */}
        {subView === "list" && activeTab === "car" && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Truck Delivery and Details
              </h2>
            </div>

            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700 focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-slate-300 rounded px-2.5 py-1 w-44 focus:outline-none focus:border-[#5948DB]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
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
                          <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {filteredTrucks.slice(0, entriesPerPage).map((truck) => (
                    <tr key={truck.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">
                        {truck.truck_id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{truck.in_charge}</td>
                      <td className="py-3.5 px-4 text-slate-600">{truck.assistants}</td>
                      <td className="py-3.5 px-4 text-slate-600">{truck.route}</td>
                      <td className="py-3.5 px-4 text-slate-600">{truck.last_updated}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setTruckModalOpen(true);
                            }}
                            className="px-3 py-1 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setSubView("manage_truck");
                            }}
                            className="px-3 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 pl-4 pr-6">
                        <div className="flex items-center gap-3 text-slate-500">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTruck(truck);
                              setSubView("manage_truck");
                            }}
                            title="Configure Truck"
                            className="hover:text-slate-800 cursor-pointer"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              addToast(`Stock history synced for ${truck.truck_id}`, "info")
                            }
                            title="Reset / History"
                            className="hover:text-slate-800 cursor-pointer"
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

            <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div>Showing 1 to 10 of 29 entries</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center ${
                      p === 1 ? "bg-[#5948DB] text-white font-semibold" : "text-slate-500"
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
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">Update Stock</h2>
              </div>

              <form onSubmit={handleAddInputStock} className="p-8 space-y-4 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Stock Date
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="date"
                      value={updateStockForm.date}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, date: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Store
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.store}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, store: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="Al Ain">Al Ain</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Item
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.item}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, item: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
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
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Item Type
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={updateStockForm.itemType}
                      onChange={(e) =>
                        setUpdateStockForm({ ...updateStockForm, itemType: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Old">Old</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Discarded">Discarded</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
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
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Input Stocks Table Card */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">Input Stocks</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
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
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                    {inputStocks.map((st) => (
                      <tr key={st.id}>
                        <td className="py-3 px-6">{st.date}</td>
                        <td className="py-3 px-6">{st.item_id}</td>
                        <td className="py-3 px-6">{st.item_name}</td>
                        <td className="py-3 px-6">{st.item_type}</td>
                        <td className="py-3 px-6">{st.store}</td>
                        <td className="py-3 px-6 font-semibold">{st.quantity}</td>
                        <td className="py-3 px-6">
                          <button
                            type="button"
                            onClick={() =>
                              setInputStocks((prev) => prev.filter((x) => x.id !== st.id))
                            }
                            className="px-2.5 py-1 rounded bg-[#E05D38] text-white text-[11px] font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    {inputStocks.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-slate-400 text-xs">
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
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Add / Update Product
              </h2>
            </div>

            <form onSubmit={handleSaveNewProduct} className="p-8 space-y-4 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
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
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Product Name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={newItemForm.item}
                    onChange={(e) => setNewItemForm({ ...newItemForm, item: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Price
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter Product Description"
                    value={newItemForm.price}
                    onChange={(e) => setNewItemForm({ ...newItemForm, price: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
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
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Priority
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newItemForm.priority}
                    onChange={(e) =>
                      setNewItemForm({ ...newItemForm, priority: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Asset
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newItemForm.asset}
                    onChange={(e) => setNewItemForm({ ...newItemForm, asset: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
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
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">CURRENT STOCK</div>
                <div className="text-2xl font-bold text-[#48BB78] mt-1">
                  {selectedItem.current_stock === "N/A" ? 0 : selectedItem.current_stock}
                </div>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">OLD STOCK</div>
                <div className="text-2xl font-bold text-slate-700 mt-1">0</div>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">DAMAGED STOCK</div>
                <div className="text-2xl font-bold text-rose-500 mt-1">0</div>
              </div>
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase">
                  DISCARDED STOCK
                </div>
                <div className="text-2xl font-bold text-amber-500 mt-1">0</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">
                  Stock Transaction History - {selectedItem.item} ({selectedItem.product_id})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                      {["DATE", "STORE", "ITEM", "ITEM TYPE", "QUANTITY", "UPDATED BY"].map(
                        (col) => (
                          <th key={col} className="py-3 px-6">
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-xs text-slate-700">
                    <tr>
                      <td className="py-3.5 px-6">08/09/2026</td>
                      <td className="py-3.5 px-6">Al Ain</td>
                      <td className="py-3.5 px-6 font-medium">{selectedItem.item}</td>
                      <td className="py-3.5 px-6">New</td>
                      <td className="py-3.5 px-6 font-semibold">
                        {selectedItem.current_stock === "N/A" ? 0 : selectedItem.current_stock}
                      </td>
                      <td className="py-3.5 px-6">IRSHAD (STORE KEEPER)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. ADD NEW TRUCK SUB-VIEW (add-new truck.png) */}
        {subView === "add_truck" && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Add New Truck</h2>
            </div>

            <form onSubmit={handleAddNewTruck} className="p-8 space-y-5 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
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
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  City
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newTruckForm.city}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, city: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="">Select City</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Assigned Routes
                </label>
                <div className="md:col-span-9">
                  <select
                    value={newTruckForm.route}
                    onChange={(e) => setNewTruckForm({ ...newTruckForm, route: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
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

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Add Truck
                </button>
                <button
                  type="button"
                  onClick={() => setSubView("list")}
                  className="px-4 py-1.5 rounded bg-[#E53E6A] hover:bg-[#d12c57] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 7. MANAGE TRUCK STOCK SUB-VIEW (truck-manage.png) */}
        {subView === "manage_truck" && selectedTruck && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Manage Truck Stock</h2>
            </div>

            <div className="p-8 space-y-6">
              <form onSubmit={handleAddTruckRecord} className="space-y-4 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Truck ID
                  </label>
                  <div className="md:col-span-9">
                    <input
                      type="text"
                      disabled
                      value={selectedTruck.truck_id}
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-500 bg-[#EDF2F7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Product
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.product}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, product: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
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
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Store
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.store}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, store: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="Al Ain">Al Ain</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Action
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.action}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, action: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="Add to Truck">Add to Truck</option>
                      <option value="Return to Store">Return to Store</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                    Condition
                  </label>
                  <div className="md:col-span-9">
                    <select
                      value={manageTruckForm.condition}
                      onChange={(e) =>
                        setManageTruckForm({ ...manageTruckForm, condition: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
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
                      className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Add Record
                  </button>
                </div>
              </form>

              {/* Truck Stock Table inside Manage Truck Stock */}
              <div className="overflow-x-auto border-t border-slate-200 pt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
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
                  <tbody className="divide-y divide-slate-200/70 text-xs text-slate-700">
                    {selectedTruck.stocks.map((st, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-medium">{st.item}</td>
                        <td className="py-3 px-4">{st.added}</td>
                        <td className="py-3 px-4">{st.delivered}</td>
                        <td className="py-3 px-4">{st.used}</td>
                        <td className="py-3 px-4">{st.damaged}</td>
                        <td className="py-3 px-4">{st.balance}</td>
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
                  className="px-4 py-1.5 rounded bg-[#E53E6A] hover:bg-[#d12c57] text-white text-xs font-semibold transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Truck Stock Details</h3>
              <button
                type="button"
                onClick={() => setTruckModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 gap-4">
                <div>
                  <span className="font-bold">Truck ID:</span> {selectedTruck.truck_id}
                </div>
                <div>
                  <span className="font-bold">In-Charge:</span> {selectedTruck.in_charge}
                </div>
                <div>
                  <span className="font-bold">Last Updated:</span>{" "}
                  {selectedTruck.last_updated_full}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                  <tbody className="divide-y divide-slate-200/70 text-xs text-slate-700">
                    {selectedTruck.stocks.map((st, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3">{st.item}</td>
                        <td className="py-3 px-3">{st.added}</td>
                        <td className="py-3 px-3">{st.delivered}</td>
                        <td className="py-3 px-3">{st.used}</td>
                        <td className="py-3 px-3">{st.damaged}</td>
                        <td className="py-3 px-3">{st.balance}</td>
                        <td className="py-3 px-3">{st.returned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setTruckModalOpen(false)}
                className="px-3.5 py-1.5 rounded border border-slate-300 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700">
                Total Product Delivery Summary
              </h3>
              <button
                type="button"
                onClick={() => setProductSummaryDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={summarySearch}
                  onChange={(e) => setSummarySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#5948DB]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredProductSummary.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs"
                >
                  <div className="text-xs font-semibold text-slate-600 mb-2">{item.name}</div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    <div>
                      <div className="text-sm font-bold text-[#5948DB]">{item.loaded}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">LOADED</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#48BB78]">{item.delivered}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">
                        DELIVERED
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#E05D38]">{item.returned}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">RETURNED</div>
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
