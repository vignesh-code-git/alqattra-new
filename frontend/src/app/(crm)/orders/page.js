"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  XCircle,
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
} from "lucide-react";

export default function OrdersPage() {
  const { addToast } = useToast();

  const [orders, setOrders] = useState([
    {
      id: 1,
      delivery_note: "DN-T6350-16652",
      order_no: "DN-T6350-16652",
      invoice_no: "IN-T6350/032178",
      customer_name: "SAAED RASHED",
      customer_id: "102755",
      salesman_name: "Mohammed Rashid",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "12.60",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-01",
      product: "5 Gallon Water Bottle",
      quantity: 2,
    },
    {
      id: 2,
      delivery_note: "DN-T6350-16651",
      order_no: "DN-T6350-16651",
      invoice_no: "IN-T6350/032177",
      customer_name: "SABIR",
      customer_id: "114284",
      salesman_name: "Ahmed Al Mansoori",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "10.50",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AD-02",
      product: "5 Gallon Water Bottle",
      quantity: 2,
    },
    {
      id: 3,
      delivery_note: "DN-T6356-15330",
      order_no: "DN-T6356-15330",
      invoice_no: "IN-T6356/032584",
      customer_name: "Asmaa Muhammad al-Jilani 118052",
      customer_id: "18623",
      salesman_name: "Mohammed Rashid",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6356",
      status: "Delivered",
      total_amount: "31.50",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-01",
      product: "5 Gallon Drinking Water",
      quantity: 5,
    },
    {
      id: 4,
      delivery_note: "DN-T6354-18248",
      order_no: "DN-T6354-18248",
      invoice_no: "IN-T6354/033059",
      customer_name: "Sameer Mohammad",
      customer_id: "106213",
      salesman_name: "Khalid Sultan",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6354",
      status: "Delivered",
      total_amount: "12.60",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-03",
      product: "5 Gallon Drinking Water",
      quantity: 2,
    },
    {
      id: 5,
      delivery_note: "DN-T6345-14587",
      order_no: "DN-T6345-14587",
      invoice_no: "N/A",
      customer_name: "DR. PARVEZ (KHALIFA PALACE)",
      customer_id: "112651",
      salesman_name: "Saeed Al Dhaheri",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6345",
      status: "Delivered",
      total_amount: "0.00",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-02",
      product: "Dispenser Service",
      quantity: 1,
    },
    {
      id: 6,
      delivery_note: "DN-T6345-14586",
      order_no: "DN-T6345-14586",
      invoice_no: "IN-T6345/030843",
      customer_name: "DR. PARVEZ (KHALIFA PALACE)",
      customer_id: "112651",
      salesman_name: "Saeed Al Dhaheri",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6345",
      status: "Delivered",
      total_amount: "10.00",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-02",
      product: "5 Gallon Water Bottle",
      quantity: 2,
    },
    {
      id: 7,
      delivery_note: "DN-T6350-16650",
      order_no: "DN-T6350-16650",
      invoice_no: "IN-T6350/032176",
      customer_name: "SIRAJ MOHAMMED",
      customer_id: "105890",
      salesman_name: "Mohammed Rashid",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6350",
      status: "Delivered",
      total_amount: "10.50",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-01",
      product: "5 Gallon Water Bottle",
      quantity: 2,
    },
    {
      id: 8,
      delivery_note: "DN-T6343-14385",
      order_no: "DN-T6343-14385",
      invoice_no: "IN-T6343/028213",
      customer_name: "SHAIKHA AL SHAMSI",
      customer_id: "116220",
      salesman_name: "Tariq Aziz",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6343",
      status: "Delivered",
      total_amount: "31.50",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-04",
      product: "5 Gallon Water Bottle",
      quantity: 6,
    },
    {
      id: 9,
      delivery_note: "DN-T6343-14384",
      order_no: "DN-T6343-14384",
      invoice_no: "IN-T6343/028212",
      customer_name: "MOHAMED RAFEEQ",
      customer_id: "100509",
      salesman_name: "Tariq Aziz",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6343",
      status: "Delivered",
      total_amount: "31.50",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-04",
      product: "5 Gallon Water Bottle",
      quantity: 6,
    },
    {
      id: 10,
      delivery_note: "DN-T6354-18247",
      order_no: "DN-T6354-18247",
      invoice_no: "IN-T6354/033058",
      customer_name: "Hassan Abdul Kareem",
      customer_id: "114435",
      salesman_name: "Khalid Sultan",
      order_date: "2026-11-08",
      delivery_date: "08/09/2026",
      truck: "T6354",
      status: "Delivered",
      total_amount: "5.25",
      balance: "0.00",
      payment_method: "Paid",
      payment_status: "Paid",
      route: "Route AA-03",
      product: "5 Gallon Water Bottle",
      quantity: 1,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filterCustomer, setFilterCustomer] = useState("All");
  const [filterSalesRep, setFilterSalesRep] = useState("All");
  const [filterTruck, setFilterTruck] = useState("All");
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [dateRange, setDateRange] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendarPopover, setShowCalendarPopover] = useState(false);
  const [sortField, setSortField] = useState("order_no");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const fileInputRef = useRef(null);

  const getCalendarLabel = () => {
    if (dateRange === "ALL") return "All Dates";
    if (dateRange === "TODAY") return "Today (Nov 08)";
    if (dateRange === "YESTERDAY") return "Yesterday";
    if (dateRange === "7DAYS") return "Last 7 Days";
    if (dateRange === "THIS_MONTH") return "This Month";
    if (dateRange === "LAST_MONTH") return "Last Month";
    if (dateRange === "CUSTOM") {
      if (startDate && endDate) return `${startDate} → ${endDate}`;
      if (startDate) return `From ${startDate}`;
      return "Custom Range";
    }
    return "Date Range";
  };

  const handleExportCSV = () => {
    if (!filteredOrders.length) {
      addToast("No orders to export", "error");
      return;
    }
    const headers = ["Order No", "Customer", "Driver/Salesman", "Route", "Delivery Date", "Total (AED)", "Payment", "Status"];
    const rows = filteredOrders.map((o) =>
      [o.order_no, o.customer_name, o.salesman_name, o.route, o.delivery_date, o.total_amount, o.payment_method, o.status]
        .map((val) => `"${(val || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
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

        const headers = parseLine(lines[0]).map((h) => h.toLowerCase());
        const importedOrders = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseLine(lines[i]);
          if (!cols || cols.length === 0 || !cols[0]) continue;
          const order = {
            id: Date.now() + i,
            delivery_note: cols[0] || `DN-IMP-${1000 + i}`,
            invoice_no: cols[1] || `IN-IMP-${1000 + i}`,
            customer_name: cols[2] || "Imported Customer",
            customer_code: cols[3] || `CUST-IMP-${i}`,
            delivery_date: cols[4] || new Date().toISOString().slice(0, 10),
            truck: cols[5] || "T6350",
            quantity: parseInt(cols[6]) || 1,
            status: cols[7] || "Confirmed",
            total_amount: cols[8] || "5.25",
            balance: cols[9] || "0.00",
            payment_method: cols[10] || "Cash",
            route: "Route AA-01",
            product: "5 Gallon Water Bottle",
          };
          importedOrders.push(order);
        }

        if (importedOrders.length > 0) {
          setOrders((prev) => [...importedOrders, ...prev]);
          addToast(`Successfully imported ${importedOrders.length} orders from ${file.name}`, "success");
        } else {
          addToast("No valid order records found in CSV", "error");
        }
      } catch {
        addToast("Failed to parse CSV file. Please verify format.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Modals
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  // Form state
  const [newOrder, setNewOrder] = useState({
    customer_name: "Al Ain Palace Hotel",
    salesman_name: "Mohammed Rashid",
    delivery_date: "2026-11-09",
    product: "5 Gallon Drinking Water",
    quantity: 50,
    payment_method: "Credit",
    unit_price: 7.50,
  });

  useEffect(() => {
    async function loadOrders() {
      const data = await apiService.getOrders();
      if (data && data.length > 0) {
        setOrders(data);
      }
    }
    loadOrders();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const isOrderDateInRange = (dateStr) => {
    if (!dateStr || dateRange === "ALL") return true;
    try {
      const rowYMD = dateStr.slice(0, 10);
      const todayStr = "2026-11-08";
      if (dateRange === "TODAY") return rowYMD === todayStr;
      if (dateRange === "YESTERDAY") return rowYMD === "2026-11-07";
      if (dateRange === "7DAYS") return rowYMD >= "2026-11-01" && rowYMD <= todayStr;
      if (dateRange === "THIS_MONTH") return rowYMD.startsWith("2026-11");
      if (dateRange === "LAST_MONTH") return rowYMD.startsWith("2026-10");
      if (dateRange === "CUSTOM") {
        if (startDate && rowYMD < startDate) return false;
        if (endDate && rowYMD > endDate) return false;
        return true;
      }
    } catch {
      return true;
    }
    return true;
  };

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders
      .filter((o) => {
        // Status filter - Deleted orders NEVER appear in main view, ONLY in Deleted tab
        if (selectedStatus === "Deleted") {
          if (o.status !== "Deleted") return false;
        } else {
          if (o.status === "Deleted") return false;
          if (selectedStatus !== "All" && o.status !== selectedStatus) return false;
        }

        // Customer, Sales Rep, and Truck filters
        if (filterCustomer !== "All" && o.customer_name !== filterCustomer) return false;
        if (filterSalesRep !== "All" && o.salesman_name !== filterSalesRep) return false;
        if (filterTruck !== "All" && o.truck !== filterTruck) return false;

        // Date filter
        const orderDate = o.delivery_date || o.order_date;
        if (!isOrderDateInRange(orderDate)) return false;

        // Universal all-fields search filter
        if (!q) return true;
        return Object.values(o).some((val) => {
          if (val == null) return false;
          return val.toString().toLowerCase().includes(q);
        });
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === "total_amount") {
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
  }, [orders, search, selectedStatus, filterCustomer, filterSalesRep, filterTruck, dateRange, startDate, endDate, sortField, sortAsc]);

  // Checkbox selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Status changer directly on row
  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    addToast(`Order status updated to "${newStatus}"`, "success");
  };

  // Delete order trigger
  const handleDeleteOrder = (order) => {
    setDeleteTarget(order);
  };

  // Confirm delete order (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteOrder = async () => {
    if (!deleteTarget) return;
    const order = deleteTarget;
    try {
      if (order.id && typeof order.id === "number" && order.id < 100000) {
        await apiService.updateOrder(order.id, {
          status: "Deleted",
        });
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
      message: `Order ${order.delivery_note || order.order_no} has been moved to Deleted. It is highlighted with a prominent red border in the table and can be restored at any time.`,
    });
    addToast(`Order ${order.order_no || order.delivery_note} moved to Deleted list`, "info");
  };

  // Restore order back to Delivered
  const handleRestoreOrder = async (order) => {
    try {
      if (order.id && typeof order.id === "number" && order.id < 100000) {
        await apiService.updateOrder(order.id, {
          status: "Delivered",
        });
      }
    } catch {
      // Optimistic update
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Delivered" } : o))
    );
    setCrudPopup({
      type: "restore",
      title: "Order Restored",
      message: `Order ${order.delivery_note || order.order_no} has been successfully restored to Delivered status!`,
    });
    addToast(`Order ${order.order_no || order.delivery_note} restored to Delivered`, "success");
  };

  // Update order in database
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    try {
      if (editingOrder.id && typeof editingOrder.id === "number" && editingOrder.id < 100000) {
        await apiService.updateOrder(editingOrder.id, {
          status: editingOrder.status,
          total_amount: editingOrder.total_amount,
          payment_method: editingOrder.payment_method,
          payment_status: editingOrder.payment_status || "Paid",
          delivery_date: editingOrder.delivery_date,
        });
      }
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? { ...o, ...editingOrder } : o))
      );
      setCrudPopup({
        type: "update",
        title: "Order Updated",
        message: `Order ${editingOrder.order_no || editingOrder.delivery_note} has been successfully updated and synced with the database.`,
      });
      addToast(`Order ${editingOrder.order_no || editingOrder.delivery_note} updated in database!`, "success");
    } catch {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? { ...o, ...editingOrder } : o))
      );
      addToast(`Order updated`, "success");
    }
    setEditingOrder(null);
  };

  // Create order in database
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const total = (newOrder.quantity * newOrder.unit_price).toFixed(2);
    const orderNo = `ORD-2026-100${orders.length + 1}`;
    const payload = {
      order_no: orderNo,
      customer_name: newOrder.customer_name,
      salesman_name: newOrder.salesman_name,
      order_date: "2026-11-08",
      delivery_date: newOrder.delivery_date,
      status: "Confirmed",
      total_amount: total,
      payment_method: newOrder.payment_method,
      payment_status: "Unpaid",
      route: "Route AA-01",
      city: "AL AIN",
    };
    const saved = await apiService.createOrder(payload);
    const created = saved && saved.id ? { ...saved, product: newOrder.product, quantity: newOrder.quantity } : {
      id: Date.now(),
      product: newOrder.product,
      quantity: newOrder.quantity,
      ...payload
    };
    setOrders([created, ...orders]);
    setShowNewModal(false);
    setCrudPopup({
      type: "create",
      title: "Order Created",
      message: `Order ${orderNo} for ${newOrder.customer_name} created successfully (Total: AED ${total}) and saved to the database.`,
    });
    addToast(`Order ${orderNo} created and saved to database! Total: AED ${total}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Orders & Deliveries" subtitle="Orders" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* 4 KPI Cards at Top (Exact Figma 3:1724 values) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#3B82F6] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL ORDERS</span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">241405</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F59E0B] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PENDING ORDERS</span>
              <div className="text-xl font-extrabold font-mono text-amber-600 mt-1">2</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#10B981] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL REVENUE</span>
              <div className="text-xl font-extrabold font-mono text-emerald-600 mt-1">AED 5817740.39</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F43F5E] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PENDING PAYMENTS</span>
              <div className="text-xl font-extrabold font-mono text-rose-600 mt-1">8158</div>
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
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Customer</label>
              <select
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Customer</option>
                {Array.from(new Set(orders.map((o) => o.customer_name))).map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Sales Rep</label>
              <select
                value={filterSalesRep}
                onChange={(e) => setFilterSalesRep(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Sales Rep</option>
                {Array.from(new Set(orders.map((o) => o.salesman_name).filter(Boolean))).map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Truck</label>
              <select
                value={filterTruck}
                onChange={(e) => setFilterTruck(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Truck</option>
                {Array.from(new Set(orders.map((o) => o.truck).filter(Boolean))).map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Deleted">Deleted</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">From Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDateRange("CUSTOM");
                }}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">To Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDateRange("CUSTOM");
                }}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
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
              className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => addToast(`Filtered ${filteredOrders.length} orders`, "success")}
              className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Status Pills with Modern Count Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto max-w-full">
            {[
              { id: "All", label: "All", count: orders.filter((o) => o.status !== "Deleted").length },
              { id: "Pending", label: "Pending", count: orders.filter((o) => o.status === "Pending").length },
              { id: "Confirmed", label: "Confirmed", count: orders.filter((o) => o.status === "Confirmed").length },
              { id: "Out For Delivery", label: "Out For Delivery", count: orders.filter((o) => o.status === "Out For Delivery").length },
              { id: "Delivered", label: "Delivered", count: orders.filter((o) => o.status === "Delivered").length },
              { id: "Deleted", label: "Deleted", count: orders.filter((o) => o.status === "Deleted").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-xl border transition-colors duration-150 outline-none focus:outline-none flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none ${
                  selectedStatus === tab.id
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
                    selectedStatus === tab.id
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

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <div className="relative flex-1 sm:w-64 min-w-[170px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search across all fields..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            {/* Interactive Calendar Popover Filter */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendarPopover(!showCalendarPopover)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold transition-colors duration-150 shadow-2xs cursor-pointer whitespace-nowrap outline-none focus:outline-none select-none ${
                  dateRange !== "ALL"
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{getCalendarLabel()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              {showCalendarPopover && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCalendarPopover(false)} />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-md shadow-xl p-3.5 z-50 animate-in fade-in zoom-in-95 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>Filter Orders by Date</span>
                      </div>
                      <button type="button" onClick={() => setShowCalendarPopover(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">×</button>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quick Presets</span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { id: "ALL", label: "All Dates" },
                          { id: "TODAY", label: "Today" },
                          { id: "YESTERDAY", label: "Yesterday" },
                          { id: "7DAYS", label: "Last 7 Days" },
                          { id: "THIS_MONTH", label: "This Month" },
                          { id: "LAST_MONTH", label: "Last Month" },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setDateRange(p.id);
                              setShowCalendarPopover(false);
                            }}
                            className={`px-2.5 py-1.5 rounded-md text-left font-semibold border transition-colors duration-150 flex items-center justify-between text-xs cursor-pointer outline-none focus:outline-none select-none ${
                              dateRange === p.id
                                ? "bg-blue-600 border-blue-600 text-white font-bold"
                                : "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                            }`}
                          >
                            <span>{p.label}</span>
                            {dateRange === p.id && <Check className="w-3 h-3 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Custom Date Range</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">From:</label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                              setDateRange("CUSTOM");
                            }}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">To:</label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                              setDateRange("CUSTOM");
                            }}
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setDateRange("ALL");
                          setStartDate("");
                          setEndDate("");
                          setShowCalendarPopover(false);
                        }}
                        className="text-slate-500 hover:text-slate-700 font-bold"
                      >
                        Clear Date
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCalendarPopover(false)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-2xs"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CSV Import */}
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileImport} className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Import orders from CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Import</span>
            </button>

            {/* CSV Export */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Export orders to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {(search || dateRange !== "ALL" || selectedStatus !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDateRange("ALL");
                  setStartDate("");
                  setEndDate("");
                  setSelectedStatus("All");
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3 text-rose-600" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={() => setShowOrderSummaryModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-md text-xs font-bold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Order Summary</span>
            </button>

            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Order</span>
            </button>
          </div>
        </div>

        {/* Orders Table with Blue Table Header matching exact Figma field items */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[950px]">
              <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                <tr>
                  <th className="px-3.5 py-3 w-10 text-center border-r border-[#7161F0]/70 bg-[#5948DB]">
                    <input
                      type="checkbox"
                      checked={
                        filteredOrders.length > 0 &&
                        selectedIds.length === filteredOrders.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded-xs border-white/60 text-[#5948DB] focus:ring-0 cursor-pointer accent-white"
                    />
                  </th>
                  <th
                    onClick={() => handleSort("delivery_note")}
                    className="px-3 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>DELIVERY NOTE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("invoice_no")}
                    className="px-3 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>INVOICE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("customer_name")}
                    className="px-3.5 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>CUSTOMER</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 font-semibold select-none border-r border-[#7161F0]/70 text-white">CUSTOMER ID</th>
                  <th
                    onClick={() => handleSort("delivery_date")}
                    className="px-3 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>DATE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-2.5 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">TRUCK</th>
                  <th className="px-2.5 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">QUANTITY</th>
                  <th className="px-3 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">STATUS</th>
                  <th
                    onClick={() => handleSort("total_amount")}
                    className="px-3 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>TOTAL</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">BALANCE</th>
                  <th className="px-3 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">PAYMENT</th>
                  <th className="px-4 py-3 font-semibold text-center select-none text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-slate-700">No orders found</span>
                        <p className="text-[11px] text-slate-400">Try adjusting your search or status filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const isDeleted = o.status === "Deleted";
                    return (
                    <tr
                      key={o.id}
                      className={`transition-colors ${
                        isDeleted
                          ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                          : selectedIds.includes(o.id)
                          ? "bg-blue-50/50"
                          : "hover:bg-blue-50/30"
                      }`}
                    >
                      <td className={`px-3.5 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(o.id)}
                          onChange={() => toggleSelectOne(o.id)}
                          className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className={`px-3 py-3 font-mono font-bold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                        {o.delivery_note || o.order_no}
                      </td>
                      <td className={`px-3 py-3 font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                        {o.invoice_no || "N/A"}
                      </td>
                      <td className={`px-3.5 py-3 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <div className="font-bold text-slate-900 leading-tight uppercase">{o.customer_name}</div>
                        <div className="text-[10px] text-slate-400">{o.product}</div>
                      </td>
                      <td className={`px-3 py-3 font-mono text-slate-700 font-semibold border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        {o.customer_id || "102755"}
                      </td>
                      <td className={`px-3 py-3 font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                        {o.delivery_date}
                      </td>
                      <td className={`px-2.5 py-3 text-center font-bold text-slate-800 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        {o.truck || "T6350"}
                      </td>
                      <td className={`px-2.5 py-3 text-center font-bold font-mono text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        {o.quantity}
                      </td>
                      <td className={`px-3 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase ${
                          isDeleted
                            ? "bg-rose-100 text-rose-700 border border-rose-300"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {o.status || "Delivered"}
                        </span>
                      </td>
                      <td className={`px-3 py-3 text-right font-mono font-bold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                        AED {parseFloat(o.total_amount).toFixed(2)}
                      </td>
                      <td className={`px-3 py-3 text-right font-mono font-medium text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                        AED {o.balance || "0.00"}
                      </td>
                      <td className={`px-3 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                        <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                          o.payment_method === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {o.payment_method || "Paid"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {isDeleted ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase">
                              Deleted
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRestoreOrder(o)}
                              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                              title="Restore order"
                            >
                              <Undo2 className="w-3 h-3" />
                              <span>Restore</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewOrder(o)}
                              className="px-2 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingOrder({ ...o })}
                              className="px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(o)}
                              className="p-1 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
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
          <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredOrders.length}</span> of{" "}
              <span className="font-bold text-slate-800">{orders.length}</span> orders
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

      {/* Order Summary Modal (Figma 3:1728) */}
      {showOrderSummaryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Order Summary Breakdown</h2>
                <p className="text-[11px] text-slate-500">Consolidated summary of orders, quantities, and payment collections</p>
              </div>
              <button onClick={() => setShowOrderSummaryModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-md">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">Total Orders</span>
                <span className="text-base font-extrabold font-mono text-slate-900">241,405</span>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-md">
                <span className="text-[10px] font-bold text-emerald-600 uppercase block">Total Revenue</span>
                <span className="text-base font-extrabold font-mono text-emerald-700">AED 5,817,740.39</span>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md">
                <span className="text-[10px] font-bold text-amber-600 uppercase block">Pending Orders</span>
                <span className="text-base font-extrabold font-mono text-amber-700">2</span>
              </div>
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-md">
                <span className="text-[10px] font-bold text-rose-600 uppercase block">Pending Payments</span>
                <span className="text-base font-extrabold font-mono text-rose-700">8,158</span>
              </div>
            </div>
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#5948DB] text-white font-semibold">
                  <tr>
                    <th className="px-4 py-2.5 border-r border-[#7161F0]/70">TRUCK ID</th>
                    <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">DELIVERY NOTES</th>
                    <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">BOTTLES DELIVERED</th>
                    <th className="px-4 py-2.5 text-right">TOTAL AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  <tr>
                    <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">T6350</td>
                    <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">3</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">6</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 33.60</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">T6356</td>
                    <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">1</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">5</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 31.50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">T6354</td>
                    <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">2</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">3</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 17.85</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">T6343</td>
                    <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">2</td>
                    <td className="px-4 py-2.5 text-center font-mono font-bold text-blue-700 border-r border-slate-200">12</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 63.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowOrderSummaryModal(false)} className="px-4 py-1.5 rounded-md bg-[#5948DB] text-white text-xs font-bold">
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Create New Delivery Order</h2>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Customer *</label>
                <select
                  value={newOrder.customer_name}
                  onChange={(e) => setNewOrder({ ...newOrder, customer_name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="Al Ain Palace Hotel">Al Ain Palace Hotel</option>
                  <option value="Emirates Steel Staff Quarters">Emirates Steel Staff Quarters</option>
                  <option value="Fatima Al Kaabi Villa">Fatima Al Kaabi Villa</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Salesman / Route</label>
                  <select
                    value={newOrder.salesman_name}
                    onChange={(e) => setNewOrder({ ...newOrder, salesman_name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Mohammed Rashid">Mohammed Rashid (Route AA-01)</option>
                    <option value="Ahmed Al Mansoori">Ahmed Al Mansoori (Route AD-02)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Delivery Date</label>
                  <input
                    type="date"
                    value={newOrder.delivery_date}
                    onChange={(e) => setNewOrder({ ...newOrder, delivery_date: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-slate-700 font-semibold block mb-1">Product</label>
                  <select
                    value={newOrder.product}
                    onChange={(e) => {
                      const prod = e.target.value;
                      let price = 7.50;
                      if (prod.includes("500ml")) price = 16.00;
                      if (prod.includes("Empty")) price = 25.00;
                      if (prod.includes("Cooler")) price = 380.00;
                      setNewOrder({ ...newOrder, product: prod, unit_price: price });
                    }}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="5 Gallon Drinking Water">5 Gallon Drinking Water (AED 7.50)</option>
                    <option value="500ml PET Bottles (Pack of 24)">500ml PET Bottles (AED 16.00)</option>
                    <option value="Empty 5 Gallon Bottle">Empty 5 Gallon Bottle (AED 25.00)</option>
                    <option value="Water Dispenser Cooler">Water Dispenser Cooler (AED 380.00)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Payment Method</label>
                <select
                  value={newOrder.payment_method}
                  onChange={(e) => setNewOrder({ ...newOrder, payment_method: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="Credit">Credit</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Wallet">Wallet</option>
                </select>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                <span className="text-slate-600 font-semibold">Total Order Amount:</span>
                <span className="text-emerald-600 font-mono font-extrabold text-base">
                  AED {(newOrder.quantity * newOrder.unit_price).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Summary Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold block">{viewOrder.order_no}</span>
                <h2 className="text-base font-bold text-slate-900">Delivery Order Summary</h2>
              </div>
              <button onClick={() => setViewOrder(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer</span>
                  <span className="font-bold text-slate-900 text-sm">{viewOrder.customer_name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Delivery Date</span>
                  <span className="font-semibold text-slate-800">{viewOrder.delivery_date}</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#5948DB] text-xs text-white border-b border-[#4A3AC9] font-semibold">
                    <tr>
                      <th className="px-4 py-2 border-r border-[#7161F0]/70 text-white font-semibold">Item</th>
                      <th className="px-4 py-2 text-center border-r border-[#7161F0]/70 text-white font-semibold">Qty</th>
                      <th className="px-4 py-2 text-right text-white font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="px-4 py-2.5 text-slate-800">{viewOrder.product}</td>
                      <td className="px-4 py-2.5 text-center font-bold text-slate-900">{viewOrder.quantity}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-600">AED {viewOrder.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Edit Order ({editingOrder.order_no || editingOrder.delivery_note})</h3>
                <p className="text-[11px] text-slate-500">{editingOrder.customer_name}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateOrder} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Payment Method</label>
                  <select
                    value={editingOrder.payment_method}
                    onChange={(e) => setEditingOrder({ ...editingOrder, payment_method: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Credit">Credit</option>
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Total Amount (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingOrder.total_amount}
                    onChange={(e) => setEditingOrder({ ...editingOrder, total_amount: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Delivery Date</label>
                  <input
                    type="date"
                    value={editingOrder.delivery_date?.length === 10 ? editingOrder.delivery_date : "2026-11-08"}
                    onChange={(e) => setEditingOrder({ ...editingOrder, delivery_date: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
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
                  Are you sure you want to delete order <strong className="text-slate-800">{deleteTarget.delivery_note || deleteTarget.order_no}</strong> for customer <strong className="text-slate-800">{deleteTarget.customer_name}</strong>?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This order will be retained and highlighted with a <strong>prominent red border</strong> with a <strong>Restore</strong> action button.
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
                onClick={confirmDeleteOrder}
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
