"use client";

import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Search,
  Eye,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Truck,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Printer,
  ChevronDown,
  Calendar,
  RotateCcw,
  Download,
  Upload,
  Check,
  Edit,
  Trash2,
  AlertTriangle,
  Undo2,
  FileText,
} from "lucide-react";

export default function OrdersPage() {
  const { addToast } = useToast();

  // Exact 10 rows from Figma 3:1724 (steps/1143/media_0.png)
  const [orders, setOrders] = useState([
    {
      id: 1,
      delivery_note: "DN-T6350-16652",
      order_no: "DN-T6350-16652",
      invoice_no: "IN-T6350/032178",
      customer_name: "SAAED RASHED",
      customer_id: "102755",
      salesman_name: "56 - ANAS",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "12.60",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6350",
      product: "5 Gallon Water",
      unit_price: "6.00",
      quantity: 2,
    },
    {
      id: 2,
      delivery_note: "DN-T6350-16651",
      order_no: "DN-T6350-16651",
      invoice_no: "IN-T6350/032177",
      customer_name: "SABIR",
      customer_id: "114284",
      salesman_name: "56 - ANAS",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "10.50",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6350",
      product: "5 Gallon Water",
      unit_price: "5.00",
      quantity: 2,
    },
    {
      id: 3,
      delivery_note: "DN-T6356-15330",
      order_no: "DN-T6356-15330",
      invoice_no: "IN-T6356/032584",
      customer_name: "Asmaa Muhammad al-Jilani 118052",
      customer_id: "18623",
      salesman_name: "38 - NISAR",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6356",
      status: "Delivered",
      total_amount: "31.50",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6356",
      product: "5 Gallon Water",
      unit_price: "6.00",
      quantity: 5,
    },
    {
      id: 4,
      delivery_note: "DN-T6354-18248",
      order_no: "DN-T6354-18248",
      invoice_no: "IN-T6354/033059",
      customer_name: "Sameer Mohammad",
      customer_id: "106213",
      salesman_name: "47 - HASHIM",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6354",
      status: "Delivered",
      total_amount: "12.60",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6354",
      product: "5 Gallon Water",
      unit_price: "6.00",
      quantity: 2,
    },
    {
      id: 5,
      delivery_note: "DN-T6345-14587",
      order_no: "DN-T6345-14587",
      invoice_no: "N/A",
      customer_name: "DR. PARVEZ (KHALIFA PALACE)",
      customer_id: "112651",
      salesman_name: "57 - MUFEED",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6345",
      status: "Delivered",
      total_amount: "0.00",
      balance: "0.00",
      payment_method: "WALLET",
      payment_status: "Paid",
      route: "Route 6345",
      product: "5 Gallon Water",
      unit_price: "0.00",
      quantity: 1,
    },
    {
      id: 6,
      delivery_note: "DN-T6343-14386",
      order_no: "DN-T6343-14386",
      invoice_no: "N/A",
      customer_name: "Abdullah Mohammed Al Amri 118104",
      customer_id: "18854",
      salesman_name: "23 - ARSLAN",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6343",
      status: "Delivered",
      total_amount: "0.00",
      balance: "0.00",
      payment_method: "WALLET",
      payment_status: "Paid",
      route: "Route 6343",
      product: "5 Gallon Water",
      unit_price: "0.00",
      quantity: 2,
    },
    {
      id: 7,
      delivery_note: "DN-T6350-16650",
      order_no: "DN-T6350-16650",
      invoice_no: "IN-T6350/032176",
      customer_name: "SIRAJ MOHAMMED",
      customer_id: "105890",
      salesman_name: "56 - ANAS",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "10.50",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6350",
      product: "5 Gallon Water",
      unit_price: "5.00",
      quantity: 2,
    },
    {
      id: 8,
      delivery_note: "DN-T6343-14385",
      order_no: "DN-T6343-14385",
      invoice_no: "N/A",
      customer_name: "Mahdi Al Dhahery",
      customer_id: "115822",
      salesman_name: "23 - ARSLAN",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6343",
      status: "Delivered",
      total_amount: "0.00",
      balance: "0.00",
      payment_method: "WALLET",
      payment_status: "Paid",
      route: "Route 6343",
      product: "5 Gallon Water",
      unit_price: "0.00",
      quantity: 1,
    },
    {
      id: 9,
      delivery_note: "DN-T6343-14384",
      order_no: "DN-T6343-14384",
      invoice_no: "IN-T6343/028212",
      customer_name: "MOHAMED RAFEEQ",
      customer_id: "100509",
      salesman_name: "23 - ARSLAN",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6343",
      status: "Delivered",
      total_amount: "31.50",
      balance: "0.00",
      payment_method: "CASH",
      payment_status: "Paid",
      route: "Route 6343",
      product: "5 Gallon Water",
      unit_price: "5.00",
      quantity: 6,
    },
    {
      id: 10,
      delivery_note: "DN-T6354-18247",
      order_no: "DN-T6354-18247",
      invoice_no: "IN-T6354/033058",
      customer_name: "Hassan Abdul Kareem",
      customer_id: "114435",
      salesman_name: "47 - HASHIM",
      order_date: "2026-09-08",
      delivery_date: "08/09/2026",
      truck: "T6354",
      status: "Delivered",
      total_amount: "5.25",
      balance: "5.25",
      payment_method: "CREDIT",
      payment_status: "Unpaid",
      route: "Route 6354",
      product: "5 Gallon Water",
      unit_price: "5.00",
      quantity: 1,
    },
  ]);

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filterCustomer, setFilterCustomer] = useState("All");
  const [filterSalesRep, setFilterSalesRep] = useState("All");
  const [filterTruck, setFilterTruck] = useState("All");
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [dateRange, setDateRange] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const fileInputRef = useRef(null);

  // Modals
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  // Form state matching Figma 3:1732 (New Order)
  const [newOrder, setNewOrder] = useState({
    customer_name: "SAAED RASHED",
    customer_id: "102755",
    salesman_name: "56 - ANAS",
    truck: "T6350",
    delivery_date: "2026-09-08",
    product: "5 Gallon Water",
    quantity: 2,
    payment_method: "CASH",
    unit_price: 6.0,
    discount: 0,
    remarks: "",
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    if (!filteredOrders.length) {
      addToast("No orders to export", "error");
      return;
    }
    const headers = [
      "Delivery Note",
      "Invoice",
      "Customer",
      "Customer ID",
      "Date",
      "Truck",
      "Quantity",
      "Status",
      "Total (AED)",
      "Balance (AED)",
      "Payment",
    ];
    const rows = filteredOrders.map((o) =>
      [
        o.delivery_note,
        o.invoice_no,
        o.customer_name,
        o.customer_id,
        o.delivery_date,
        o.truck,
        o.quantity,
        o.status,
        o.total_amount,
        o.balance,
        o.payment_method,
      ]
        .map((val) => `"${(val || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredOrders.length} orders to CSV`, "success");
  };

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders
      .filter((o) => {
        if (selectedStatus === "Deleted") {
          if (o.status !== "Deleted") return false;
        } else {
          if (o.status === "Deleted") return false;
          if (selectedStatus !== "All" && o.status !== selectedStatus)
            return false;
        }

        if (filterCustomer !== "All" && o.customer_name !== filterCustomer)
          return false;
        if (filterSalesRep !== "All" && o.salesman_name !== filterSalesRep)
          return false;
        if (filterTruck !== "All" && o.truck !== filterTruck) return false;

        if (!q) return true;
        return Object.values(o).some((val) => {
          if (val == null) return false;
          return val.toString().toLowerCase().includes(q);
        });
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === "total_amount" || sortField === "id") {
          valA = parseFloat(valA || 0);
          valB = parseFloat(valB || 0);
        } else {
          valA = (valA || "").toString().toLowerCase();
          valB = (valB || "").toString().toLowerCase();
        }
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [
    orders,
    search,
    selectedStatus,
    filterCustomer,
    filterSalesRep,
    filterTruck,
    sortField,
    sortAsc,
  ]);

  const handleDeleteOrder = (order) => {
    setDeleteTarget(order);
  };

  const confirmDeleteOrder = async () => {
    if (!deleteTarget) return;
    const order = deleteTarget;
    try {
      if (order.id && typeof order.id === "number" && order.id < 100000) {
        await apiService.updateOrder(order.id, { status: "Deleted" });
      }
    } catch {
      // Optimistic update
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Deleted" } : o))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Order Moved to Deleted",
      message: `Order ${order.delivery_note} has been moved to Deleted and can be restored anytime.`,
    });
    addToast(`Order ${order.delivery_note} moved to Deleted list`, "info");
  };

  const handleRestoreOrder = async (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Delivered" } : o))
    );
    addToast(`Order ${order.delivery_note} restored to Delivered`, "success");
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === editingOrder.id ? { ...o, ...editingOrder } : o
      )
    );
    addToast(`Order ${editingOrder.delivery_note} updated!`, "success");
    setEditingOrder(null);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const sub = newOrder.quantity * newOrder.unit_price;
    const vat = sub * 0.05;
    const total = (sub + vat - (parseFloat(newOrder.discount) || 0)).toFixed(2);
    const dnNo = `DN-${newOrder.truck}-${16652 + orders.length}`;
    const invNo =
      newOrder.payment_method === "WALLET"
        ? "N/A"
        : `IN-${newOrder.truck}/032${178 + orders.length}`;
    const created = {
      id: Date.now(),
      delivery_note: dnNo,
      order_no: dnNo,
      invoice_no: invNo,
      customer_name: newOrder.customer_name,
      customer_id: newOrder.customer_id || "102755",
      salesman_name: newOrder.salesman_name,
      order_date: newOrder.delivery_date,
      delivery_date: "08/09/2026",
      truck: newOrder.truck,
      status: "Delivered",
      total_amount: total,
      balance: newOrder.payment_method === "CREDIT" ? total : "0.00",
      payment_method: newOrder.payment_method,
      payment_status:
        newOrder.payment_method === "CREDIT" ? "Unpaid" : "Paid",
      route: `Route ${newOrder.truck.replace("T", "")}`,
      product: newOrder.product,
      unit_price: newOrder.unit_price.toFixed(2),
      quantity: newOrder.quantity,
    };
    setOrders([created, ...orders]);
    setShowNewModal(false);
    addToast(`Order ${dnNo} created! Total: AED ${total}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title="Orders" subtitle="Order Management" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Action Bar matching Figma 3:1724 */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Home / <span className="text-slate-800 font-semibold">Orders</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowOrderSummaryModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Order Summary</span>
            </button>
            <button
              type="button"
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Order</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards at Top (Exact Figma 3:1724 values) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#3B82F6] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOTAL ORDERS
              </span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                241405
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F59E0B] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PENDING ORDERS
              </span>
              <div className="text-xl font-extrabold font-mono text-amber-600 mt-1">
                2
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#10B981] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOTAL REVENUE
              </span>
              <div className="text-xl font-extrabold font-mono text-emerald-600 mt-1">
                AED 5817740.39
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F43F5E] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PENDING PAYMENTS
              </span>
              <div className="text-xl font-extrabold font-mono text-rose-600 mt-1">
                8158
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Truck className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>

        {/* Filter Orders Panel (Figma 3:1724) */}
        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Filter Orders
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Customer
              </label>
              <select
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Customer</option>
                {Array.from(new Set(orders.map((o) => o.customer_name))).map(
                  (c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Sales Rep
              </label>
              <select
                value={filterSalesRep}
                onChange={(e) => setFilterSalesRep(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Sales Rep</option>
                {Array.from(
                  new Set(orders.map((o) => o.salesman_name).filter(Boolean))
                ).map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Truck
              </label>
              <select
                value={filterTruck}
                onChange={(e) => setFilterTruck(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Truck</option>
                {Array.from(
                  new Set(orders.map((o) => o.truck).filter(Boolean))
                ).map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Deleted">Deleted</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDateRange("CUSTOM");
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                To Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDateRange("CUSTOM");
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-800"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setFilterCustomer("All");
                setFilterSalesRep("All");
                setFilterTruck("All");
                setSelectedStatus("All");
                setDateRange("ALL");
                setStartDate("");
                setEndDate("");
                setSearch("");
                addToast("Order filters reset", "info");
              }}
              className="px-4 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() =>
                addToast(`Filtered ${filteredOrders.length} orders`, "success")
              }
              className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Orders Table Container matching exact Figma 3:1724 */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          {/* Dark Navy-to-Blue Gradient Banner */}
          <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
            <h3 className="text-sm font-bold tracking-wide">Recent Orders</h3>
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
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
          </div>

          {/* Table with exact 12 columns */}
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[1050px]">
              <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                <tr>
                  <th
                    onClick={() => handleSort("delivery_note")}
                    className="px-3.5 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>DELIVERY NOTE</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("invoice_no")}
                    className="px-3.5 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>INVOICE</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("customer_name")}
                    className="px-3.5 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>CUSTOMER</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 select-none border-r border-[#7161F0]/60">
                    CUSTOMER ID
                  </th>
                  <th
                    onClick={() => handleSort("delivery_date")}
                    className="px-3 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>DATE</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-2.5 py-3 text-center select-none border-r border-[#7161F0]/60">
                    TRUCK
                  </th>
                  <th className="px-2.5 py-3 text-center select-none border-r border-[#7161F0]/60">
                    QUANTITY
                  </th>
                  <th className="px-3 py-3 text-center select-none border-r border-[#7161F0]/60">
                    STATUS
                  </th>
                  <th
                    onClick={() => handleSort("total_amount")}
                    className="px-3 py-3 text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>TOTAL</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-right select-none border-r border-[#7161F0]/60">
                    BALANCE
                  </th>
                  <th className="px-3 py-3 text-center select-none border-r border-[#7161F0]/60">
                    PAYMENT
                  </th>
                  <th className="px-3.5 py-3 text-center select-none">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No orders found matching your filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.slice(0, entriesPerPage).map((o) => {
                    const isDeleted = o.status === "Deleted";
                    return (
                      <tr
                        key={o.id}
                        className={`transition-colors ${
                          isDeleted
                            ? "bg-rose-50/60 border-l-4 border-l-rose-500"
                            : "hover:bg-slate-50/90"
                        }`}
                      >
                        <td className="px-3.5 py-3 font-mono font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                          {o.delivery_note}
                        </td>
                        <td className="px-3.5 py-3 font-mono text-slate-600 border-r border-slate-200 whitespace-nowrap">
                          {o.invoice_no || "N/A"}
                        </td>
                        <td className="px-3.5 py-3 font-semibold text-slate-900 border-r border-slate-200">
                          {o.customer_name}
                        </td>
                        <td className="px-3 py-3 font-mono text-slate-600 border-r border-slate-200">
                          {o.customer_id}
                        </td>
                        <td className="px-3 py-3 font-mono text-slate-600 border-r border-slate-200 whitespace-nowrap">
                          {o.delivery_date}
                        </td>
                        <td className="px-2.5 py-3 text-center font-semibold text-slate-800 border-r border-slate-200">
                          {o.truck}
                        </td>
                        <td className="px-2.5 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                          {o.quantity}
                        </td>
                        <td className="px-3 py-3 text-center border-r border-slate-200">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                            {o.status || "DELIVERED"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right font-mono font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                          AED {parseFloat(o.total_amount).toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                          AED {parseFloat(o.balance || 0).toFixed(2)}
                        </td>
                        <td className="px-3 py-3 text-center border-r border-slate-200">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              o.payment_method === "WALLET"
                                ? "bg-blue-100 text-blue-700"
                                : o.payment_method === "CREDIT"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {o.payment_method || "CASH"}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-center whitespace-nowrap">
                          {isDeleted ? (
                            <button
                              type="button"
                              onClick={() => handleRestoreOrder(o)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] cursor-pointer"
                            >
                              Restore
                            </button>
                          ) : (
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => setViewOrder(o)}
                                className="px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingOrder({ ...o })}
                                className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteOrder(o)}
                                className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing 1 to {Math.min(entriesPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} entries (filtered from 241,405 total
              entries)
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 font-medium"
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
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
              >
                2
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
              >
                3
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Order Summary Modal (Figma 3:1728) */}
      {showOrderSummaryModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Order Summary</h2>
              <button
                type="button"
                onClick={() => setShowOrderSummaryModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-md">
                  <span className="text-[10px] font-bold text-blue-600 uppercase block">
                    Total Orders
                  </span>
                  <span className="text-base font-extrabold font-mono text-slate-900">
                    241,405
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-md">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase block">
                    Cash Sales
                  </span>
                  <span className="text-base font-extrabold font-mono text-emerald-700">
                    AED 98.70
                  </span>
                </div>
                <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-md">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase block">
                    Wallet Orders
                  </span>
                  <span className="text-base font-extrabold font-mono text-indigo-700">
                    4 Bottles
                  </span>
                </div>
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-md">
                  <span className="text-[10px] font-bold text-rose-600 uppercase block">
                    Credit Sales
                  </span>
                  <span className="text-base font-extrabold font-mono text-rose-700">
                    AED 5.25
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#5948DB] text-white font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/60">
                        PRODUCT
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        CASH QTY
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        WALLET QTY
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        CREDIT QTY
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        TOTAL QTY
                      </th>
                      <th className="px-4 py-2.5 text-right">TOTAL AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        5 gal water (015)
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        19
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        4
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        1
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        24
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">
                        AED 103.95
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        empty bottle (017)
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        0
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        0
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">
                        0
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        0
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">
                        AED 0.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Summary</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowOrderSummaryModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal (Figma 3:1732) */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Create New Order</h2>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Customer *
                  </label>
                  <select
                    value={newOrder.customer_name}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, customer_name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="SAAED RASHED">SAAED RASHED (102755)</option>
                    <option value="SABIR">SABIR (114284)</option>
                    <option value="Asmaa Muhammad al-Jilani 118052">
                      Asmaa Muhammad al-Jilani (18623)
                    </option>
                    <option value="Sameer Mohammad">
                      Sameer Mohammad (106213)
                    </option>
                    <option value="DR. PARVEZ (KHALIFA PALACE)">
                      DR. PARVEZ (112651)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Order Date *
                  </label>
                  <input
                    type="date"
                    value={newOrder.delivery_date}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, delivery_date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Sales Rep *
                  </label>
                  <select
                    value={newOrder.salesman_name}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, salesman_name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="38 - NISAR">38 - NISAR</option>
                    <option value="47 - HASHIM">47 - HASHIM</option>
                    <option value="57 - MUFEED">57 - MUFEED</option>
                    <option value="23 - ARSLAN">23 - ARSLAN</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Truck *
                  </label>
                  <select
                    value={newOrder.truck}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, truck: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="T6350">T6350</option>
                    <option value="T6356">T6356</option>
                    <option value="T6354">T6354</option>
                    <option value="T6345">T6345</option>
                    <option value="T6343">T6343</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Product *
                  </label>
                  <select
                    value={newOrder.product}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, product: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="5 Gallon Water">5 gal water (015)</option>
                    <option value="Empty Bottle">empty bottle (017)</option>
                    <option value="Cooler">COOLER (018)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newOrder.quantity}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Unit Price (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOrder.unit_price}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        unit_price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Payment Method *
                  </label>
                  <select
                    value={newOrder.payment_method}
                    onChange={(e) =>
                      setNewOrder({
                        ...newOrder,
                        payment_method: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="CASH">CASH</option>
                    <option value="WALLET">WALLET</option>
                    <option value="CREDIT">CREDIT</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    VAT (5%) & Total
                  </label>
                  <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-emerald-700">
                    AED{" "}
                    {(newOrder.quantity * newOrder.unit_price * 1.05).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-xs cursor-pointer"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Details Modal (Figma 3:1737) */}
      {viewOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                Order Details - {viewOrder.delivery_note}
              </h2>
              <button
                type="button"
                onClick={() => setViewOrder(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Delivery Note
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewOrder.delivery_note}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Invoice No
                  </span>
                  <span className="font-mono font-bold text-blue-600">
                    {viewOrder.invoice_no || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Date
                  </span>
                  <span className="font-mono font-semibold text-slate-800">
                    {viewOrder.delivery_date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Customer Name
                  </span>
                  <span className="font-bold text-slate-900">
                    {viewOrder.customer_name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Customer ID
                  </span>
                  <span className="font-mono font-semibold text-slate-700">
                    {viewOrder.customer_id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Truck / Payment
                  </span>
                  <span className="font-bold text-slate-800">
                    {viewOrder.truck} ({viewOrder.payment_method})
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#5948DB] text-white font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/60">
                        PRODUCT
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        QUANTITY
                      </th>
                      <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/60">
                        PRICE
                      </th>
                      <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/60">
                        VAT (5%)
                      </th>
                      <th className="px-4 py-2.5 text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    <tr>
                      <td className="px-4 py-2.5 text-slate-900 font-bold border-r border-slate-200">
                        {viewOrder.product || "5 Gallon Water"}
                      </td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                        {viewOrder.quantity}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED{" "}
                        {(parseFloat(viewOrder.total_amount) / 1.05).toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED{" "}
                        {(
                          parseFloat(viewOrder.total_amount) -
                          parseFloat(viewOrder.total_amount) / 1.05
                        ).toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">
                        AED {parseFloat(viewOrder.total_amount).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-md">
                <span className="font-bold text-slate-700">
                  Balance Due: AED {parseFloat(viewOrder.balance || 0).toFixed(2)}
                </span>
                <span className="font-extrabold text-emerald-700 font-mono text-sm">
                  Grand Total: AED {parseFloat(viewOrder.total_amount).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewOrder(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal (Figma 3:1738) */}
      {editingOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-sm font-bold">
                Edit Order - {editingOrder.delivery_note}
              </h3>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateOrder} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Customer
                  </label>
                  <input
                    type="text"
                    value={editingOrder.customer_name}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customer_name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Truck
                  </label>
                  <input
                    type="text"
                    value={editingOrder.truck}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        truck: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Status
                  </label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Payment Method
                  </label>
                  <select
                    value={editingOrder.payment_method}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        payment_method: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="CASH">CASH</option>
                    <option value="WALLET">WALLET</option>
                    <option value="CREDIT">CREDIT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={editingOrder.quantity}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Total (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingOrder.total_amount}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        total_amount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Balance (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingOrder.balance || "0.00"}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        balance: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Delete Order {deleteTarget.delivery_note}?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Are you sure you want to delete this order for{" "}
                  <strong>{deleteTarget.customer_name}</strong>?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteOrder}
                className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
