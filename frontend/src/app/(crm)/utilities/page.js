"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, storeItemFromApi, productToApi, truckFromApi, productSummaryFromTrucks } from "@/services/crmMappers";
import PanelHeader from "@/components/PanelHeader";
import BackLink from "@/components/BackLink";
import {
  Home,
  ArrowUpDown,
  Settings,
  RotateCcw,
  X,
  Search,
  Printer,
  Boxes,
  Truck,
} from "lucide-react";

export default function UtilitiesPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("store"); // "store" | "car"
  const [subView, setSubView] = useState("list"); // "list" | "update_inventory" | "add_item" | "view_item" | "add_truck" | "manage_truck"

  const loadLive = useCallback(async () => {
    const [productsRaw, trucksRaw] = await Promise.all([
      apiService.getProducts(),
      apiService.getTrucks(),
    ]);
    if (productsRaw == null) return null;
    const products = listOf(productsRaw);
    return {
      storeItems: products.map(storeItemFromApi),
      trucks: listOf(trucksRaw).map(truckFromApi),
      products,
    };
  }, []);
  const live = useLiveData(loadLive);

  // Tell the user once when the server becomes unreachable, not on every poll.
  const [offlineNotified, setOfflineNotified] = useState(false);
  useEffect(() => {
    if (live.error && !offlineNotified) {
      addToast("Cannot reach the CRM server - showing the last loaded data", "error");
      setOfflineNotified(true);
    }
    if (!live.error && offlineNotified) setOfflineNotified(false);
  }, [live.error, offlineNotified, addToast]);

  const [storeItems, setStoreItems] = useState([]);
  const [trucks, setTrucks] = useState([]);
  useEffect(() => {
    if (!live.data) return;
    setStoreItems(live.data.storeItems);
    setTrucks(live.data.trucks);
    // Keep an open truck's stock panel in step with the refreshed data.
    setSelectedTruck((prev) => (prev ? live.data.trucks.find((t) => t.id === prev.id) || prev : prev));
  }, [live.data]);

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
    const rows = productSummaryFromTrucks(trucks);
    if (!q) return rows;
    return rows.filter((p) => p.name.toLowerCase().includes(q));
  }, [summarySearch, trucks]);

  // Handlers
  const handleAddInputStock = async (e) => {
    e.preventDefault();
    if (!updateStockForm.item || !updateStockForm.quantity) {
      addToast("Please select an Item and enter Quantity", "error");
      return;
    }
    const qty = Number(updateStockForm.quantity) || 0;
    if (qty <= 0) {
      addToast("Enter a quantity greater than zero", "error");
      return;
    }
    const product = (live.data?.products || []).find((p) => p.name === updateStockForm.item);
    if (!product) {
      addToast(`"${updateStockForm.item}" is not a CRM product`, "error");
      return;
    }
    const newStock = Number(product.stock_quantity || 0) + qty;
    // Record the movement, then raise the product's stock to match.
    const record = await apiService.createInventory({
      product: product.id,
      batch_no: updateStockForm.date,
      quantity_in: qty,
      quantity_out: 0,
      balance: newStock,
      location: updateStockForm.store,
      remarks: updateStockForm.itemType,
    });
    if (!record) {
      addToast("Could not save the stock entry - check the CRM server", "error");
      return;
    }
    const updated = await apiService.updateProduct(product.id, { stock_quantity: newStock });
    if (!updated) addToast("Stock entry saved, but the product total did not update", "error");
    setInputStocks((prev) => [
      {
        id: record.id,
        date: updateStockForm.date,
        item_id: product.code,
        item_name: product.name,
        item_type: updateStockForm.itemType,
        store: updateStockForm.store,
        quantity: String(qty),
      },
      ...prev,
    ]);
    setUpdateStockForm({ ...updateStockForm, quantity: "" });
    addToast(`Added ${qty} ${product.name} - stock is now ${newStock}`, "success");
    await live.refresh();
  };

  const handleSaveNewProduct = async (e) => {
    e.preventDefault();
    if (!newItemForm.product_id.trim() || !newItemForm.item.trim()) {
      addToast("Please fill in Product ID and Product Name", "error");
      return;
    }
    const created = await apiService.createProduct(productToApi(newItemForm));
    if (!created) {
      addToast(`Could not save "${newItemForm.item}" - the Product ID may already exist`, "error");
      return;
    }
    addToast(`Product "${created.name}" saved successfully`, "success");
    await live.refresh();
    setSubView("list");
  };

  const handleDeleteStoreItem = async (row) => {
    const result = await apiService.deleteProduct(row.id);
    if (!result) {
      addToast(`Could not delete "${row.item}" - it may be used on orders`, "error");
      return;
    }
    addToast(`Item "${row.item}" deleted`, "info");
    await live.refresh();
  };

  const handleAddNewTruck = async (e) => {
    e.preventDefault();
    if (!newTruckForm.truck_id.trim()) {
      addToast("Please enter a Truck ID", "error");
      return;
    }
    const created = await apiService.createTruck({
      plate_no: newTruckForm.truck_id.trim(),
      truck_name: newTruckForm.truck_id.trim(),
      route: newTruckForm.route || "",
      status: "Active",
    });
    if (!created) {
      addToast(`Could not add truck "${newTruckForm.truck_id}" - it may already exist`, "error");
      return;
    }
    addToast(`Truck "${created.plate_no}" added successfully`, "success");
    await live.refresh();
    setSubView("list");
  };

  const handleAddTruckRecord = async (e) => {
    e.preventDefault();
    if (!manageTruckForm.product || !manageTruckForm.quantity || !selectedTruck) {
      addToast("Please select a Product and enter Quantity", "error");
      return;
    }
    const qty = Number(manageTruckForm.quantity) || 0;
    if (qty <= 0) {
      addToast("Enter a quantity greater than zero", "error");
      return;
    }
    // "Add to Truck" loads stock; return/remove actions take it back off.
    const action = String(manageTruckForm.action || "").toLowerCase();
    const type = action.includes("return")
      ? "Return"
      : action.includes("remove") || action.includes("unload")
      ? "Unload"
      : "Load";
    const result = await apiService.createStockTransaction({
      truck: selectedTruck.id,
      transaction_type: type,
      product_name: manageTruckForm.product,
      quantity: qty,
    });
    if (!result) {
      addToast("Could not save the truck record - check the CRM server", "error");
      return;
    }
    setManageTruckForm({ ...manageTruckForm, quantity: "" });
    addToast(`${type}: ${qty} ${manageTruckForm.product} on ${selectedTruck.truck_id}`, "success");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      <Header title="Utilities" subtitle="Manage Inventory" />

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
        {subView !== "list" && (
          <BackLink label="Back to List" onClick={() => setSubView("list")} />
        )}

        {/* 1. STORE INVENTORY LIST VIEW */}
        {subView === "list" && activeTab === "store" && (
          <div className="ios-surface overflow-hidden">
            <PanelHeader
                icon={Boxes}
                title="Warehouse Inventory"
                subtitle="Stock availability, damages, and replenishment"
                onAction={() => addToast("Exported inventory records", "success")}
              />

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
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
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
                          <ArrowUpDown className="w-3 h-3 sort-ico shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
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
                            className="px-3.5 py-1 rounded-full bg-[#007AFF]/12 hover:bg-[#007AFF] text-[#0062CC] hover:text-white text-[11px] font-semibold transition cursor-pointer"
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
          <div className="ios-surface overflow-hidden">
            <PanelHeader
                icon={Truck}
                title="Truck Fleet & Vehicle Stock"
                subtitle="Mobile truck stock tracking and route distribution"
                onAction={() => addToast("Exported truck stock records", "success")}
              />

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
              <table className="ios-table w-full text-left">
                <thead>
                  <tr className="ios-thead">
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
                          <ArrowUpDown className="w-3 h-3 sort-ico shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[12.5px] text-[#1C1C1E]">
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
                            className="px-3 py-1 rounded-full bg-[#007AFF]/12 hover:bg-[#007AFF] text-[#0062CC] hover:text-white text-[11px] font-semibold transition cursor-pointer"
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
            <div className="ios-surface overflow-hidden">
              <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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
            <div className="ios-surface overflow-hidden">
              <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Input Stocks</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
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
                  <tbody className="text-[12px] text-[#1C1C1E]">
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
          <div className="ios-surface overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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

            <div className="ios-surface overflow-hidden">
              <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Stock Transaction History - {selectedItem.item} ({selectedItem.product_id})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {["DATE", "STORE", "ITEM", "ITEM TYPE", "QUANTITY", "UPDATED BY"].map(
                        (col) => (
                          <th key={col} className="py-3 px-6">
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-xs text-[#1C1C1E]">
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
          <div className="ios-surface overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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
          <div className="ios-surface overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
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
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
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
                  <tbody className="text-xs text-[#1C1C1E]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[6px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] border border-[#3C3C43]/11 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
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
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
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
                  <tbody className="text-xs text-[#1C1C1E]">
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[6px]">
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
