"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Home,
  ArrowUpDown,
  Search,
  X,
  Download,
  ShoppingCart,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";

const INITIAL_ORDERS = [
  {
    id: 1,
    delivery_note: "DN-T6350-16652",
    invoice_no: "IN-T6350/032178",
    customer_name: "SAAED RASHED",
    customer_id: "102755",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "MANAZIF",
    status: "Delivered",
    total_amount: "12.60",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 6.0, coupon_qty: 0 },
    ],
  },
  {
    id: 2,
    delivery_note: "DN-T6350-16651",
    invoice_no: "IN-T6350/032177",
    customer_name: "SABIR",
    customer_id: "114284",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "HILI INDUSTRIAL",
    status: "Delivered",
    total_amount: "10.50",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 5.0, coupon_qty: 0 },
    ],
  },
  {
    id: 3,
    delivery_note: "DN-T6356-15330",
    invoice_no: "IN-T6356/032584",
    customer_name: "Asmaa Muhammad al-Jilani 118052",
    customer_id: "18623",
    salesman_name: "38 - NISAR",
    order_date: "08/09/2026",
    truck: "T6356",
    zone: "JAHILI",
    status: "Delivered",
    total_amount: "12.60",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 6.0, coupon_qty: 0 },
    ],
  },
  {
    id: 4,
    delivery_note: "DN-T6335-20400",
    invoice_no: "IN-T6335/033994",
    customer_name: "AL NEBRAS SCHOOL",
    customer_id: "197301",
    salesman_name: "32 - NOOR",
    order_date: "08/09/2026",
    truck: "T6335",
    zone: "KHABISI",
    status: "Delivered",
    total_amount: "123.00",
    balance: "0.00",
    payment_method: "Card",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 20, unit_price: 6.0, coupon_qty: 0 },
    ],
  },
  {
    id: 5,
    delivery_note: "DN-T6348-16736",
    invoice_no: "IN-T6348/033290",
    customer_name: "AL REEM MEDICAL CENTER",
    customer_id: "110452",
    salesman_name: "53 - SHAFEEQ",
    order_date: "08/09/2026",
    truck: "T6348",
    zone: "ASHAREJ",
    status: "Delivered",
    total_amount: "52.50",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 10, unit_price: 5.0, coupon_qty: 0 },
    ],
  },
  {
    id: 6,
    delivery_note: "DN-T6354-19912",
    invoice_no: "IN-T6354/031880",
    customer_name: "FATIMA KHALIFA",
    customer_id: "108934",
    salesman_name: "47 - RAHMAN",
    order_date: "08/09/2026",
    truck: "T6354",
    zone: "SAROOJ",
    status: "Delivered",
    total_amount: "21.00",
    balance: "0.00",
    payment_method: "Wallet",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 4, unit_price: 5.0, coupon_qty: 4 },
    ],
  },
  {
    id: 7,
    delivery_note: "DN-T6329-18204",
    invoice_no: "IN-T6329/029272",
    customer_name: "khalifa",
    customer_id: "114734",
    salesman_name: "40 - BASHEER",
    order_date: "08/09/2026",
    truck: "T6329",
    zone: "MUTHARID",
    status: "Delivered",
    total_amount: "5.25",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 1, unit_price: 5.0, coupon_qty: 0 },
    ],
  },
  {
    id: 8,
    delivery_note: "DN-T6350-16650",
    invoice_no: "IN-T6350/032176",
    customer_name: "SAEED KHALEEL",
    customer_id: "114843",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "HILI INDUSTRIAL",
    status: "Delivered",
    total_amount: "10.50",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 5.0, coupon_qty: 0 },
    ],
  },
  {
    id: 9,
    delivery_note: "DN-T6684-14110",
    invoice_no: "IN-T6684/027411",
    customer_name: "OASIS HOSPITAL",
    customer_id: "100219",
    salesman_name: "48 - JASEEM",
    order_date: "08/09/2026",
    truck: "T6684",
    zone: "MARKHANIA",
    status: "Delivered",
    total_amount: "84.00",
    balance: "0.00",
    payment_method: "Card",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 16, unit_price: 5.0, coupon_qty: 0 },
    ],
  },
  {
    id: 10,
    delivery_note: "DN-T6357-11890",
    invoice_no: "IN-T6357/025109",
    customer_name: "HAMAD AL ZAABI",
    customer_id: "109412",
    salesman_name: "84 - MUNEEB",
    order_date: "08/09/2026",
    truck: "T6357",
    zone: "ABU DHABI CENTRAL",
    status: "Delivered",
    total_amount: "19.80",
    balance: "0.00",
    payment_method: "Cash",
    payment_status: "PAID",
    items: [
      { product: "5 gal water", lend_type: "Sold", quantity: 3, unit_price: 6.3, coupon_qty: 0 },
    ],
  },
];

const ORDER_SUMMARY_PRODUCTS = [
  { name: "ALAIN STILL 330ML", ordered: 116, delivered: 116, pending: 0 },
  { name: "200 ML BOTTLE", ordered: 5, delivered: 5, pending: 0 },
  { name: "200 ML CUP", ordered: 81411, delivered: 81411, pending: 0 },
  { name: "200 ML CUP", ordered: 100, delivered: 100, pending: 0 },
  { name: "200 ml cup", ordered: 11, delivered: 11, pending: 0 },
  { name: "330ml PET Bottles", ordered: 140, delivered: 140, pending: 0 },
  { name: "5 gal water", ordered: 1228823, delivered: 1228823, pending: 0 },
  { name: "500ml PET Bottles", ordered: 470, delivered: 470, pending: 0 },
  { name: "ALAIN REGULAR 330ML", ordered: 410, delivered: 410, pending: 0 },
];

export default function OrdersPage() {
  const { addToast } = useToast();
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [viewMode, setViewMode] = useState("list"); // "list" | "new" | "edit"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter state
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    customer: "",
    salesman: "",
    route: "",
    zone: "",
    truck: "",
    status: "",
    paymentMethod: "",
    paymentStatus: "",
    product: "",
  });

  // Order Summary Drawer (order summary.png)
  const [summaryDrawerOpen, setSummaryDrawerOpen] = useState(false);
  const [summarySearch, setSummarySearch] = useState("");

  // View Order Modal (view orders.png)
  const [viewModalOrder, setViewModalOrder] = useState(null);

  // New Order Form State (new orders.png)
  const [newOrderForm, setNewOrderForm] = useState({
    customer_name: "",
    customer_code: "",
    truck_id: "",
    delivery_zone: "",
    notes: "",
    items: [{ id: 1, product: "", quantity: 1, type: "Sold", unit_price: "" }],
  });

  // Edit Order Form State (edit orders.png)
  const [editingOrder, setEditingOrder] = useState(null);
  const [editTab, setEditTab] = useState("products");

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((o) => {
      if (
        q &&
        !o.delivery_note.toLowerCase().includes(q) &&
        !o.invoice_no.toLowerCase().includes(q) &&
        !o.customer_name.toLowerCase().includes(q) &&
        !o.customer_id.toLowerCase().includes(q) &&
        !o.salesman_name.toLowerCase().includes(q) &&
        !o.truck.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (
        filters.customer &&
        !o.customer_name.toLowerCase().includes(filters.customer.toLowerCase()) &&
        !o.customer_id.toLowerCase().includes(filters.customer.toLowerCase())
      ) {
        return false;
      }
      if (filters.truck && o.truck !== filters.truck) return false;
      if (filters.status && o.status.toLowerCase() !== filters.status.toLowerCase()) return false;
      return true;
    });
  }, [orders, searchQuery, filters]);

  const filteredSummaryProducts = useMemo(() => {
    const q = summarySearch.trim().toLowerCase();
    if (!q) return ORDER_SUMMARY_PRODUCTS;
    return ORDER_SUMMARY_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [summarySearch]);

  const openNewOrderView = () => {
    setNewOrderForm({
      customer_name: "",
      customer_code: "",
      truck_id: "",
      delivery_zone: "",
      notes: "",
      items: [{ id: Date.now(), product: "", quantity: 1, type: "Sold", unit_price: "" }],
    });
    setViewMode("new");
  };

  const openEditOrderView = (order) => {
    setEditingOrder({
      ...order,
      items: order.items?.length
        ? order.items.map((it, idx) => ({ ...it, id: idx + 1 }))
        : [{ id: 1, product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 5.25, coupon_qty: 0 }],
    });
    setEditTab("products");
    setViewMode("edit");
  };

  const handleCreateOrder = (sendSms = false) => {
    if (!newOrderForm.customer_name.trim()) {
      addToast("Please select or enter Customer Name", "error");
      return;
    }
    const total = newOrderForm.items.reduce(
      (acc, it) => acc + (Number(it.quantity) || 1) * (Number(it.unit_price) || 5.25),
      0
    );
    const created = {
      id: Date.now(),
      delivery_note: `DN-${newOrderForm.truck_id || "T6350"}-${Math.floor(16653 + Math.random() * 900)}`,
      invoice_no: `IN-${newOrderForm.truck_id || "T6350"}/032${Math.floor(179 + Math.random() * 700)}`,
      customer_name: newOrderForm.customer_name.trim(),
      customer_id: newOrderForm.customer_code.trim() || "114843",
      salesman_name: "56 - ANAS",
      order_date: "08/09/2026",
      truck: newOrderForm.truck_id || "T6350",
      zone: newOrderForm.delivery_zone || "HILI INDUSTRIAL",
      status: "Delivered",
      total_amount: total.toFixed(2),
      balance: "0.00",
      payment_method: "Cash",
      payment_status: "PAID",
      items: newOrderForm.items.map((it) => ({
        product: it.product || "5 gal water",
        lend_type: it.type || "Sold",
        quantity: Number(it.quantity) || 1,
        unit_price: Number(it.unit_price) || 5.25,
        coupon_qty: 0,
      })),
    };
    setOrders((prev) => [created, ...prev]);
    addToast(
      sendSms
        ? `Order ${created.delivery_note} created and SMS sent!`
        : `Order ${created.delivery_note} created successfully`,
      "success"
    );
    setViewMode("list");
  };

  const handleUpdateOrder = () => {
    if (!editingOrder) return;
    const subtotal = editingOrder.items.reduce(
      (sum, it) => sum + Number(it.quantity || 0) * Number(it.unit_price || 0),
      0
    );
    const updated = {
      ...editingOrder,
      total_amount: subtotal.toFixed(2),
    };
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    addToast(`Order ${updated.delivery_note} updated successfully`, "success");
    setViewMode("list");
  };

  const handleDeleteOrder = (order) => {
    setOrders((prev) => prev.filter((o) => o.id !== order.id));
    addToast(`Order ${order.delivery_note} deleted`, "info");
    if (viewMode === "edit") setViewMode("list");
  };

  const handleExportCSV = () => {
    const headers = [
      "DELIVERY NOTE",
      "INVOICE NO.",
      "CUSTOMER NAME",
      "CUSTOMER ID",
      "SALESMAN NAME",
      "ORDER DATE",
      "TRUCK",
      "STATUS",
      "TOTAL AMOUNT",
      "BALANCE",
    ];
    const rows = filteredOrders.map((o) => [
      o.delivery_note,
      o.invoice_no,
      o.customer_name,
      o.customer_id,
      o.salesman_name,
      o.order_date,
      o.truck,
      o.status,
      o.total_amount,
      o.balance,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Order Dashboard" subtitle="Manage Orders" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">
            {viewMode === "list" ? "Order Dashboard" : "Orders"}
          </span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            -{" "}
            {viewMode === "new"
              ? "Create Order"
              : viewMode === "edit"
              ? "Update Order"
              : "Manage Orders"}{" "}
            - ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openNewOrderView}
              className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              + New Order
            </button>
            <button
              type="button"
              onClick={() => setSummaryDrawerOpen(true)}
              className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              Order Summary
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
          >
            Back to Orders
          </button>
        )}
      </div>

      <div className="p-6 flex-1 space-y-6">
        {viewMode === "list" && (
          <>
            {/* Filter Orders Card */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Filter Orders
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={filters.from}
                    onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={filters.to}
                    onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Customer
                  </label>
                  <input
                    type="text"
                    placeholder="Customer Name / ID"
                    value={filters.customer}
                    onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Salesman
                  </label>
                  <select
                    value={filters.salesman}
                    onChange={(e) => setFilters({ ...filters, salesman: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Salesmen</option>
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="32 - NOOR">32 - NOOR</option>
                    <option value="38 - NISAR">38 - NISAR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Route
                  </label>
                  <select
                    value={filters.route}
                    onChange={(e) => setFilters({ ...filters, route: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Routes</option>
                    <option value="6350">6350</option>
                    <option value="6335">6335</option>
                    <option value="6354">6354</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Zone
                  </label>
                  <select
                    value={filters.zone}
                    onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Zones</option>
                    <option value="MANAZIF">MANAZIF</option>
                    <option value="HILI INDUSTRIAL">HILI INDUSTRIAL</option>
                    <option value="KHABISI">KHABISI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Truck
                  </label>
                  <select
                    value={filters.truck}
                    onChange={(e) => setFilters({ ...filters, truck: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Trucks</option>
                    <option value="T6350">T6350</option>
                    <option value="T6335">T6335</option>
                    <option value="T6356">T6356</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Payment Method
                  </label>
                  <select
                    value={filters.paymentMethod}
                    onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Methods</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Payment Status
                  </label>
                  <select
                    value={filters.paymentStatus}
                    onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
                  >
                    <option value="">All Payment Status</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => addToast("Filters applied", "info")}
                  className="px-4 py-1.5 rounded bg-[#5948DB] hover:bg-[#4938c7] text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      from: "",
                      to: "",
                      customer: "",
                      salesman: "",
                      route: "",
                      zone: "",
                      truck: "",
                      status: "",
                      paymentMethod: "",
                      paymentStatus: "",
                      product: "",
                    })
                  }
                  className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">
                    TOTAL ORDERS
                  </div>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    {filteredOrders.length}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-0.5">Orders found</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E05D38] text-white flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">DELIVERED</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    {filteredOrders.length}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-0.5">Completed orders</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#48BB78] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">PENDING</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                  <div className="text-[11px] text-amber-500 mt-0.5">Awaiting delivery</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ECC94B] text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">REVENUE</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">AED 351.75</div>
                  <div className="text-[11px] text-indigo-500 mt-0.5">Total order value</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#5948DB] text-white flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Orders Management Table Card */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-bold text-base tracking-wide">Orders Management</h2>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>

              <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="border border-slate-300 rounded px-2 py-1 bg-white text-slate-700"
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
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {[
                        "DELIVERY NOTE",
                        "INVOICE NO.",
                        "CUSTOMER NAME",
                        "CUSTOMER ID",
                        "SALESMAN NAME",
                        "ORDER DATE",
                        "TRUCK",
                        "STATUS",
                        "TOTAL AMOUNT",
                        "BALANCE",
                        "ACTIONS",
                      ].map((col) => (
                        <th key={col} className="py-3 px-3.5 first:pl-6 last:pr-6 whitespace-nowrap">
                          <div className="flex items-center justify-between gap-1">
                            <span>{col}</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-[11.5px] text-slate-700">
                    {filteredOrders.slice(0, entriesPerPage).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 pl-6 pr-3.5 font-medium text-slate-800 whitespace-nowrap">
                          {row.delivery_note}
                        </td>
                        <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                          {row.invoice_no}
                        </td>
                        <td className="py-3.5 px-3.5 font-medium text-slate-800">
                          {row.customer_name}
                        </td>
                        <td className="py-3.5 px-3.5 text-slate-600">{row.customer_id}</td>
                        <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                          {row.salesman_name}
                        </td>
                        <td className="py-3.5 px-3.5 text-slate-600 whitespace-nowrap">
                          {row.order_date}
                        </td>
                        <td className="py-3.5 px-3.5 text-slate-600">{row.truck}</td>
                        <td className="py-3.5 px-3.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10.5px] font-semibold">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 font-semibold text-slate-800">
                          {row.total_amount}
                        </td>
                        <td className="py-3.5 px-3.5 text-slate-600">{row.balance}</td>
                        <td className="py-3.5 pl-3.5 pr-6 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewModalOrder(row)}
                              className="px-2.5 py-1 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-[10.5px] font-semibold cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditOrderView(row)}
                              className="px-2.5 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[10.5px] font-semibold cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(row)}
                              className="px-2.5 py-1 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-[10.5px] font-semibold cursor-pointer"
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
                <div>
                  Showing 1 to {Math.min(entriesPerPage, filteredOrders.length)} of{" "}
                  {filteredOrders.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded-full bg-[#5948DB] text-white text-[11px] font-semibold flex items-center justify-center">
                    1
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* NEW ORDER SUB-VIEW (new orders.png) */}
        {viewMode === "new" && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Order Information</h2>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Select or type Customer Name"
                      value={newOrderForm.customer_name}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, customer_name: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer Code
                    </label>
                    <input
                      type="text"
                      placeholder="Customer Code"
                      value={newOrderForm.customer_code}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, customer_code: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Truck ID
                    </label>
                    <select
                      value={newOrderForm.truck_id}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, truck_id: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="">Select Truck</option>
                      <option value="T6350">T6350</option>
                      <option value="T6335">T6335</option>
                      <option value="T6354">T6354</option>
                      <option value="T6329">T6329</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Delivery Zone
                    </label>
                    <select
                      value={newOrderForm.delivery_zone}
                      onChange={(e) =>
                        setNewOrderForm({ ...newOrderForm, delivery_zone: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="">Select Zone</option>
                      <option value="MANAZIF">MANAZIF</option>
                      <option value="HILI INDUSTRIAL">HILI INDUSTRIAL</option>
                      <option value="KHABISI">KHABISI</option>
                      <option value="SAROOJ">SAROOJ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-3">Order Items</h3>
                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                        <th className="py-2.5 px-4">PRODUCT</th>
                        <th className="py-2.5 px-4">QUANTITY</th>
                        <th className="py-2.5 px-4">TYPE</th>
                        <th className="py-2.5 px-4">UNIT PRICE</th>
                        <th className="py-2.5 px-4 w-16 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {newOrderForm.items.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="py-2.5 px-4">
                            <select
                              value={item.product}
                              onChange={(e) => {
                                const updated = [...newOrderForm.items];
                                updated[idx].product = e.target.value;
                                setNewOrderForm({ ...newOrderForm, items: updated });
                              }}
                              className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs bg-white"
                            >
                              <option value="">Select Product</option>
                              <option value="5 gal water">5 gal water</option>
                              <option value="200 ML CUP">200 ML CUP</option>
                              <option value="330ml PET Bottles">330ml PET Bottles</option>
                              <option value="500ml PET Bottles">500ml PET Bottles</option>
                              <option value="COOLER">COOLER</option>
                            </select>
                          </td>
                          <td className="py-2.5 px-4">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const updated = [...newOrderForm.items];
                                updated[idx].quantity = e.target.value;
                                setNewOrderForm({ ...newOrderForm, items: updated });
                              }}
                              className="w-28 border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                            />
                          </td>
                          <td className="py-2.5 px-4">
                            <select
                              value={item.type}
                              onChange={(e) => {
                                const updated = [...newOrderForm.items];
                                updated[idx].type = e.target.value;
                                setNewOrderForm({ ...newOrderForm, items: updated });
                              }}
                              className="w-32 border border-slate-200 rounded px-2.5 py-1.5 text-xs bg-white"
                            >
                              <option value="Sold">Sold</option>
                              <option value="Custody">Custody</option>
                              <option value="Deposit">Deposit</option>
                            </select>
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center border border-slate-200 rounded overflow-hidden w-40">
                              <span className="bg-slate-100 px-2.5 py-1.5 text-[11px] text-slate-500 border-r border-slate-200">
                                AED
                              </span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.unit_price}
                                onChange={(e) => {
                                  const updated = [...newOrderForm.items];
                                  updated[idx].unit_price = e.target.value;
                                  setNewOrderForm({ ...newOrderForm, items: updated });
                                }}
                                className="w-full px-2.5 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                if (newOrderForm.items.length === 1) return;
                                setNewOrderForm({
                                  ...newOrderForm,
                                  items: newOrderForm.items.filter((x) => x.id !== item.id),
                                });
                              }}
                              className="w-6 h-6 rounded bg-[#E53E6A] text-white inline-flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setNewOrderForm({
                      ...newOrderForm,
                      items: [
                        ...newOrderForm.items,
                        { id: Date.now(), product: "", quantity: 1, type: "Sold", unit_price: "" },
                      ],
                    })
                  }
                  className="mt-3 px-3.5 py-1.5 rounded bg-black hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  + Add Product
                </button>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-2">Additional Information</h3>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Delivery Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter any special delivery instructions or notes here..."
                  value={newOrderForm.notes}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                  className="w-full border border-slate-200 rounded p-3 text-xs text-slate-700"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCreateOrder(false)}
                  className="px-4 py-2 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  CREATE ORDER
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateOrder(true)}
                  className="px-4 py-2 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  CREATE ORDER AND SEND SMS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT ORDER SUB-VIEW (edit orders.png) */}
        {viewMode === "edit" && editingOrder && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Update Order #{editingOrder.delivery_note}
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={editingOrder.customer_name}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, customer_name: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-[#EDF2F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer Code
                    </label>
                    <input
                      type="text"
                      value={editingOrder.customer_id}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, customer_id: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-[#EDF2F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Truck ID
                    </label>
                    <input
                      type="text"
                      value={editingOrder.truck}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, truck: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Delivery Zone
                    </label>
                    <input
                      type="text"
                      value={editingOrder.zone || "HILI INDUSTRIAL"}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, zone: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Order Status
                    </label>
                    <select
                      value={editingOrder.status.toUpperCase()}
                      onChange={(e) =>
                        setEditingOrder({ ...editingOrder, status: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-[#EDF2F7]"
                    >
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabs: Products | Payments */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setEditTab("products")}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                      editTab === "products"
                        ? "bg-white border border-slate-200 text-slate-800 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Products
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTab("payments")}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                      editTab === "payments"
                        ? "bg-white border border-slate-200 text-slate-800 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Payments
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingOrder({
                      ...editingOrder,
                      items: [
                        ...editingOrder.items,
                        {
                          id: Date.now(),
                          product: "5 gal water",
                          lend_type: "Sold",
                          quantity: 1,
                          unit_price: 5.25,
                          coupon_qty: 0,
                        },
                      ],
                    })
                  }
                  className="mb-3 px-3.5 py-1.5 rounded bg-black text-white text-xs font-semibold cursor-pointer"
                >
                  + Add Product
                </button>

                <div className="overflow-x-auto border border-slate-200 rounded">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                        <th className="py-2.5 px-4">PRODUCT NAME</th>
                        <th className="py-2.5 px-4">QUANTITY</th>
                        <th className="py-2.5 px-4">LEND/RETURN</th>
                        <th className="py-2.5 px-4">UNIT PRICE</th>
                        <th className="py-2.5 px-4">COUPON QTY</th>
                        <th className="py-2.5 px-4">TOTAL</th>
                        <th className="py-2.5 px-4">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {editingOrder.items.map((it, idx) => (
                        <tr key={it.id || idx}>
                          <td className="py-2.5 px-4">{it.product}</td>
                          <td className="py-2.5 px-4">
                            <input
                              type="number"
                              value={it.quantity}
                              onChange={(e) => {
                                const updated = [...editingOrder.items];
                                updated[idx].quantity = Number(e.target.value);
                                setEditingOrder({ ...editingOrder, items: updated });
                              }}
                              className="w-20 border border-slate-200 rounded px-2 py-1 text-xs"
                            />
                          </td>
                          <td className="py-2.5 px-4">{it.lend_type}</td>
                          <td className="py-2.5 px-4">{Number(it.unit_price).toFixed(2)}</td>
                          <td className="py-2.5 px-4">{it.coupon_qty || 0}</td>
                          <td className="py-2.5 px-4 font-semibold">
                            {(Number(it.quantity) * Number(it.unit_price)).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-4">
                            <button
                              type="button"
                              onClick={() =>
                                setEditingOrder({
                                  ...editingOrder,
                                  items: editingOrder.items.filter((_, i) => i !== idx),
                                })
                              }
                              className="px-2.5 py-1 rounded bg-[#E05D38] text-white text-[11px] font-semibold"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 rounded p-4 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="font-bold text-slate-700 mb-2">Order Summary</div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>
                    {editingOrder.items
                      .reduce((s, i) => s + Number(i.quantity) * Number(i.unit_price), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Amount Paid:</span>
                  <span>0.00</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-200">
                  <span>Total Balance:</span>
                  <span>0.00</span>
                </div>
              </div>

              {/* Bottom 3 Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDeleteOrder(editingOrder)}
                  className="px-4 py-2 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-bold uppercase cursor-pointer"
                >
                  DELETE ORDER
                </button>
                <button
                  type="button"
                  onClick={handleUpdateOrder}
                  className="px-4 py-2 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-bold uppercase cursor-pointer"
                >
                  UPDATE ORDER
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToast(`Order ${editingOrder.delivery_note} marked as delivered`, "success");
                    setViewMode("list");
                  }}
                  className="px-4 py-2 rounded bg-[#4A5568] hover:bg-[#2D3748] text-white text-xs font-semibold cursor-pointer"
                >
                  Mark Delivery
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VIEW ORDER DETAILS MODAL (view orders.png) */}
      {viewModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Order Details - {viewModalOrder.delivery_note}
              </h3>
              <button
                type="button"
                onClick={() => setViewModalOrder(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 mb-2">Customer Information</div>
                  <div>
                    <span className="font-bold">Name:</span> {viewModalOrder.customer_name}
                  </div>
                  <div>
                    <span className="font-bold">Customer Code:</span> {viewModalOrder.customer_id}
                  </div>
                  <div>
                    <span className="font-bold">Zone:</span> {viewModalOrder.zone || "MANAZIF"}
                  </div>
                  <div>
                    <span className="font-bold">Salesman:</span> {viewModalOrder.salesman_name}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 mb-2">Order Information</div>
                  <div>
                    <span className="font-bold">Order ID:</span> {viewModalOrder.delivery_note}
                  </div>
                  <div>
                    <span className="font-bold">Truck ID:</span> {viewModalOrder.truck}
                  </div>
                  <div>
                    <span className="font-bold">Date:</span> {viewModalOrder.order_date}
                  </div>
                  <div>
                    <span className="font-bold">Status:</span>{" "}
                    <span className="px-2 py-0.5 rounded bg-[#48BB78] text-white text-[10px] font-bold uppercase">
                      DELIVERED
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-2">Order Items</div>
                <table className="w-full text-left border-collapse border-t border-slate-200">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      <th className="py-2 px-3">PRODUCT</th>
                      <th className="py-2 px-3">LEND TYPE</th>
                      <th className="py-2 px-3">QUANTITY</th>
                      <th className="py-2 px-3">UNIT PRICE</th>
                      <th className="py-2 px-3">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(viewModalOrder.items || []).map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3">{it.product}</td>
                        <td className="py-2 px-3">{it.lend_type}</td>
                        <td className="py-2 px-3">{it.quantity}</td>
                        <td className="py-2 px-3">AED {Number(it.unit_price).toFixed(2)}</td>
                        <td className="py-2 px-3">
                          AED {(Number(it.quantity) * Number(it.unit_price)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="py-2 px-3 text-right font-bold">
                        Subtotal
                      </td>
                      <td className="py-2 px-3 font-bold">AED {viewModalOrder.total_amount}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="py-2 px-3 text-right font-bold">
                        Amount Paid
                      </td>
                      <td className="py-2 px-3">AED {viewModalOrder.total_amount}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="py-2 px-3 text-right font-bold">
                        Balance
                      </td>
                      <td className="py-2 px-3">AED {viewModalOrder.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Delivery Notes</div>
                <div className="text-slate-500">No special instructions</div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Payment Information</div>
                <div className="space-y-1">
                  <div>
                    <span className="font-bold">Status:</span>{" "}
                    <span className="px-2 py-0.5 rounded bg-[#48BB78] text-white text-[10px] font-bold uppercase">
                      PAID
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Method:</span> {viewModalOrder.payment_method}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewModalOrder(null)}
                className="px-3.5 py-1.5 rounded bg-slate-500 hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold cursor-pointer"
              >
                Print Invoice
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold cursor-pointer"
              >
                Print Item Receipt
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold cursor-pointer"
              >
                Print Delivery Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER SUMMARY RIGHT-HAND SLIDE-OVER DRAWER (order summary.png) */}
      {summaryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700">Product Delivery Details</h3>
              <button
                type="button"
                onClick={() => setSummaryDrawerOpen(false)}
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
              {filteredSummaryProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs"
                >
                  <div className="text-xs font-semibold text-slate-600 mb-2">{item.name}</div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    <div>
                      <div className="text-sm font-bold text-[#5948DB]">{item.ordered}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">ORDERED</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#48BB78]">{item.delivered}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">
                        DELIVERED
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#E05D38]">{item.pending}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">PENDING</div>
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
