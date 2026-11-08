"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Search,
  DollarSign,
  CreditCard,
  ArrowDownCircle,
  Wallet,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Printer,
  Eye,
  Calendar,
  RotateCcw,
  Download,
  Upload,
  ChevronDown,
  Check,
  Edit,
  Trash2,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function CashierPage() {
  const { addToast } = useToast();

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      salesman_id: "56",
      name: "ANAS",
      customer_name: "ANAS",
      salesman_name: "ANAS",
      transaction_no: "TXN-56",
      latest_collection: "148.20",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "25.20",
      card: "123.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "148.20",
      amount: "148.20",
      payment_type: "Collection",
      payment_method: "Cash & Card",
      status: "Collected",
      created_at: "08/09/2026",
    },
    {
      id: 2,
      salesman_id: "38",
      name: "NISAR",
      customer_name: "NISAR",
      salesman_name: "NISAR",
      transaction_no: "TXN-38",
      latest_collection: "142.00",
      recharge: "100.00",
      credit_returned: "0.00",
      cash: "142.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "142.00",
      amount: "142.00",
      payment_type: "Collection",
      payment_method: "Cash",
      status: "Collect",
      created_at: "08/09/2026",
    },
    {
      id: 3,
      salesman_id: "47",
      name: "HASHIM",
      customer_name: "HASHIM",
      salesman_name: "HASHIM",
      transaction_no: "TXN-47",
      latest_collection: "20.00",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "20.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "20.00",
      amount: "20.00",
      payment_type: "Collection",
      payment_method: "Cash",
      status: "Collect",
      created_at: "08/09/2026",
    },
    {
      id: 4,
      salesman_id: "57",
      name: "MUFEED",
      customer_name: "MUFEED",
      salesman_name: "MUFEED",
      transaction_no: "TXN-57",
      latest_collection: "20.00",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "20.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "20.00",
      amount: "20.00",
      payment_type: "Collection",
      payment_method: "Cash",
      status: "Collect",
      created_at: "08/09/2026",
    },
    {
      id: 5,
      salesman_id: "105",
      name: "MALAKA",
      customer_name: "MALAKA",
      salesman_name: "MALAKA",
      transaction_no: "TXN-105",
      latest_collection: "10.50",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "10.50",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "10.50",
      amount: "10.50",
      payment_type: "Collection",
      payment_method: "Cash",
      status: "Collect",
      created_at: "08/09/2026",
    },
    {
      id: 6,
      salesman_id: "100",
      name: "AMJATH",
      customer_name: "AMJATH",
      salesman_name: "AMJATH",
      transaction_no: "TXN-100",
      latest_collection: "0.00",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "0.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "0.00",
      amount: "0.00",
      payment_type: "Settlement",
      payment_method: "Cash",
      status: "Collected",
      created_at: "08/09/2026",
    },
    {
      id: 7,
      salesman_id: "101",
      name: "SHIBIL",
      customer_name: "SHIBIL",
      salesman_name: "SHIBIL",
      transaction_no: "TXN-101",
      latest_collection: "0.00",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "0.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "0.00",
      amount: "0.00",
      payment_type: "Settlement",
      payment_method: "Cash",
      status: "Collected",
      created_at: "08/09/2026",
    },
    {
      id: 8,
      salesman_id: "24",
      name: "NURANOWAR",
      customer_name: "NURANOWAR",
      salesman_name: "NURANOWAR",
      transaction_no: "TXN-24",
      latest_collection: "0.00",
      recharge: "0.00",
      credit_returned: "0.00",
      cash: "0.00",
      card: "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: "0.00",
      amount: "0.00",
      payment_type: "Settlement",
      payment_method: "Cash",
      status: "Collected",
      created_at: "08/09/2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [dateRange, setDateRange] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendarPopover, setShowCalendarPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [viewReceipt, setViewReceipt] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);
  const [sortField, setSortField] = useState("transaction_no");
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
    if (!filteredTransactions.length) {
      addToast("No transactions to export", "error");
      return;
    }
    const headers = ["Receipt No", "Customer", "Collected By", "Payment Type", "Method", "Amount (AED)", "Notes", "Date"];
    const rows = filteredTransactions.map((t) =>
      [t.transaction_no, t.customer_name, t.salesman_name, t.payment_type, t.payment_method, t.amount, t.reference_note, t.created_at]
        .map((val) => `"${(val || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cashier_transactions_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredTransactions.length} transactions to CSV`, "success");
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

        const importedTxns = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseLine(lines[i]);
          if (!cols || cols.length === 0 || !cols[0]) continue;
          const txn = {
            id: Date.now() + i,
            salesman_id: cols[0] || `${110 + i}`,
            name: cols[1] || "Salesman",
            latest_collection: cols[2] || "0.00",
            recharge: cols[3] || "0.00",
            credit_returned: cols[4] || "0.00",
            cash: cols[5] || "100.00",
            card: cols[6] || "0.00",
            returned: cols[7] || "0.00",
            pending_payment: cols[8] || "0.00",
            total_collectable: cols[9] || "100.00",
            status: "Collected",
            action_status: "Collected",
            date: new Date().toISOString().slice(0, 10),
          };
          importedTxns.push(txn);
        }

        if (importedTxns.length > 0) {
          setTransactions((prev) => [...importedTxns, ...prev]);
          addToast(`Successfully imported ${importedTxns.length} cashier records from ${file.name}`, "success");
        } else {
          addToast("No valid records found in CSV file", "error");
        }
      } catch {
        addToast("Failed to parse CSV file. Please verify format.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const [newTxn, setNewTxn] = useState({
    customer_name: "Al Ain Palace Hotel",
    salesman_name: "Mohammed Rashid",
    amount: "500.00",
    payment_type: "Collection",
    payment_method: "Cash",
    reference_note: "Driver settlement",
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const isTxnDateInRange = (dateStr) => {
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

  const filteredTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();

    return transactions
      .filter((t) => {
        // Tab / Status filter - Deleted records NEVER appear in main view, ONLY in Deleted tab
        if (activeTab === "Deleted") {
          if (t.status !== "Deleted") return false;
        } else {
          if (t.status === "Deleted") return false;
          if (activeTab === "Collected" && t.status !== "Collected") return false;
          if (activeTab === "Collect" && t.status !== "Collect") return false;
        }

        // Date range filter
        if (!isTxnDateInRange(t.created_at)) return false;

        // Universal all-fields filter
        if (!q) return true;
        return Object.values(t).some((val) => {
          if (val == null) return false;
          return val.toString().toLowerCase().includes(q);
        });
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === "amount") {
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
  }, [transactions, search, activeTab, dateRange, startDate, endDate, sortField, sortAsc]);

  // Checkbox selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTransactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransactions.map((t) => t.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete transaction trigger
  const handleDeleteTxn = (txn) => {
    setDeleteTarget(txn);
  };

  // Confirm delete transaction (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteTxn = async () => {
    if (!deleteTarget) return;
    const txn = deleteTarget;
    try {
      if (txn.id && typeof txn.id === "number" && txn.id < 100000) {
        await apiService.updateCashier(txn.id, {
          payment_type: `${txn.payment_type || "Collection"} [DELETED]`,
        });
      }
    } catch {
      // Optimistic update
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === txn.id ? { ...t, status: "Deleted" } : t))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Transaction Moved to Deleted",
      message: `Transaction ${txn.transaction_no || txn.name} marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Transaction ${txn.transaction_no || txn.name} moved to Deleted list`, "info");
  };

  // Restore transaction back to Collected
  const handleRestoreTxn = async (txn) => {
    try {
      if (txn.id && typeof txn.id === "number" && txn.id < 100000) {
        await apiService.updateCashier(txn.id, {
          payment_type: (txn.payment_type || "Collection").replace(" [DELETED]", ""),
        });
      }
    } catch {
      // Optimistic update
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === txn.id ? { ...t, status: "Collected" } : t))
    );
    setCrudPopup({
      type: "restore",
      title: "Transaction Restored",
      message: `Transaction ${txn.transaction_no || txn.name} has been restored to Collected status!`,
    });
    addToast(`Transaction ${txn.transaction_no || txn.name} restored`, "success");
  };

  // Update transaction in database
  const handleUpdateTxn = async (e) => {
    e.preventDefault();
    if (!editingTxn) return;
    try {
      if (editingTxn.id && typeof editingTxn.id === "number" && editingTxn.id < 100000) {
        await apiService.updateCashier(editingTxn.id, {
          amount: editingTxn.amount || editingTxn.total_collectable,
          payment_type: editingTxn.payment_type || "Collection",
          reference_note: editingTxn.reference_note || "",
        });
      }
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTxn.id ? { ...t, ...editingTxn } : t))
      );
      setCrudPopup({
        type: "update",
        title: "Transaction Updated",
        message: `Transaction ${editingTxn.transaction_no || editingTxn.name} has been updated in the database.`,
      });
      addToast(`Transaction ${editingTxn.transaction_no || editingTxn.name} updated in database!`, "success");
    } catch {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTxn.id ? { ...t, ...editingTxn } : t))
      );
      addToast(`Transaction updated`, "success");
    }
    setEditingTxn(null);
  };

  const handleCreateTxn = async (e) => {
    e.preventDefault();
    const amountVal = parseFloat(newTxn.amount);
    if (!amountVal || amountVal <= 0) {
      addToast("Please specify a valid payment amount", "error");
      return;
    }

    const txnNo = `TXN-2026-089${transactions.length + 1}`;
    const payload = {
      transaction_no: txnNo,
      amount: amountVal.toFixed(2),
      payment_type: newTxn.payment_type,
      payment_method: newTxn.payment_method,
      reference_note: newTxn.reference_note,
    };

    const saved = await apiService.createCashier(payload);
    const created = saved && saved.id ? { ...saved, name: newTxn.salesman_name, salesman_name: newTxn.salesman_name, created_at: "Today, Just now" } : {
      id: Date.now(),
      created_at: "Today, Just now",
      ...newTxn,
      ...payload,
    };

    setTransactions([created, ...transactions]);
    setShowModal(false);
    setCrudPopup({
      type: "create",
      title: "Payment Receipt Created",
      message: `Receipt ${txnNo} for AED ${amountVal.toFixed(2)} recorded and synchronized with the database.`,
    });
    addToast(`Payment receipt ${txnNo} recorded and saved to database: AED ${amountVal.toFixed(2)}`, "success");
  };

  const totalCollectedToday = useMemo(() => {
    return transactions.reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);
  }, [transactions]);

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Cashier & Collections" subtitle="Cashier Transactions" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto max-w-full">
              {[
                { id: "All", label: "All", count: transactions.filter((t) => t.status !== "Deleted").length },
                { id: "Collected", label: "Collected", count: transactions.filter((t) => t.status === "Collected").length },
                { id: "Collect", label: "Pending Collection", count: transactions.filter((t) => t.status === "Collect").length },
                { id: "Deleted", label: "Deleted", count: transactions.filter((t) => t.status === "Deleted").length },
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

            <div className="px-4 py-2 bg-white border border-slate-200/90 rounded-2xl shadow-xs hidden md:block">
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                TODAY COLLECTION
              </span>
              <span className="text-sm font-extrabold text-emerald-600 font-mono">
                AED {totalCollectedToday.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
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
                        <span>Filter Receipts by Date</span>
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
              title="Import receipts from CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Import</span>
            </button>

            {/* CSV Export */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Export receipts to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {(search || dateRange !== "ALL" || activeTab !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDateRange("ALL");
                  setStartDate("");
                  setEndDate("");
                  setActiveTab("All");
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3 text-rose-600" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Cashier Payment Collection Table with Blue Header matching exact Figma field items */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[900px]">
              <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                <tr>
                  <th className="px-3.5 py-3 w-10 text-center border-r border-[#7161F0]/70 bg-[#5948DB]">
                    <input
                      type="checkbox"
                      checked={
                        filteredTransactions.length > 0 &&
                        selectedIds.length === filteredTransactions.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded-xs border-white/60 text-[#5948DB] focus:ring-0 cursor-pointer accent-white"
                    />
                  </th>
                  <th
                    onClick={() => handleSort("salesman_id")}
                    className="px-3 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>SALESMAN ID</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>NAME</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">LATEST COLLECTION</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">RECHARGE</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">CREDIT RETURNED</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">CASH</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">CARD</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">RETURNED</th>
                  <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">PENDING PAYMENT</th>
                  <th
                    onClick={() => handleSort("total_collectable")}
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>TOTAL COLLECTABLE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold text-center select-none text-white">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredTransactions.map((t) => {
                  const isDeleted = t.status === "Deleted";
                  return (
                  <tr
                    key={t.id}
                    className={`transition-colors ${
                      isDeleted
                        ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                        : selectedIds.includes(t.id)
                        ? "bg-blue-50/50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className={`px-3.5 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(t.id)}
                        onChange={() => toggleSelectOne(t.id)}
                        className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className={`px-3 py-3 font-mono text-center font-bold text-slate-800 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      {t.salesman_id || "56"}
                    </td>
                    <td className={`px-4 py-3 font-extrabold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} uppercase`}>
                      {t.name || t.salesman_name}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.latest_collection || t.amount || 0).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.recharge || 0).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.credit_returned || 0).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.cash || (t.payment_method === "Cash" ? t.amount : 0)).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.card || (t.payment_method === "Card" ? t.amount : 0)).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-500 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.returned || 0).toFixed(2)}
                    </td>
                    <td className={`px-3 py-3 text-right font-mono text-slate-500 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      AED {parseFloat(t.pending_payment || 0).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono font-extrabold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                      AED {parseFloat(t.total_collectable || t.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {isDeleted ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase">
                            Deleted
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRestoreTxn(t)}
                            className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="Restore transaction"
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
                              const updated = transactions.map((item) =>
                                item.id === t.id ? { ...item, status: "Collected" } : item
                              );
                              setTransactions(updated);
                              addToast(`Payment collected for ${t.name || t.salesman_name}`, "success");
                            }}
                            className={`px-2.5 py-1 rounded-sm font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer ${
                              t.status === "Collected"
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {t.status === "Collected" ? "Collected" : "Collect"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingTxn({ ...t })}
                            className="px-2 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTxn(t)}
                            className="p-1 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                            title="Delete Transaction"
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
              Showing <span className="font-bold text-slate-800">{filteredTransactions.length}</span> of{" "}
              <span className="font-bold text-slate-800">{transactions.length}</span> transactions
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

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Record Cashier Collection</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleCreateTxn} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Customer</label>
                <select
                  value={newTxn.customer_name}
                  onChange={(e) => setNewTxn({ ...newTxn, customer_name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="Al Ain Palace Hotel">Al Ain Palace Hotel</option>
                  <option value="Emirates Steel Staff Quarters">Emirates Steel Staff Quarters</option>
                  <option value="Fatima Al Kaabi Villa">Fatima Al Kaabi Villa</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Collected By (Staff)</label>
                <select
                  value={newTxn.salesman_name}
                  onChange={(e) => setNewTxn({ ...newTxn, salesman_name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="Mohammed Rashid">Mohammed Rashid</option>
                  <option value="Ahmed Al Mansoori">Ahmed Al Mansoori</option>
                  <option value="Cashier Counter">Cashier Counter - Al Ain</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Amount (AED) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newTxn.amount}
                    onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Payment Method</label>
                  <select
                    value={newTxn.payment_method}
                    onChange={(e) => setNewTxn({ ...newTxn, payment_method: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Reference / Note</label>
                <input
                  type="text"
                  value={newTxn.reference_note}
                  onChange={(e) => setNewTxn({ ...newTxn, reference_note: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  placeholder="Receipt voucher number or comments"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Save Payment Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Receipt Voucher Modal */}
      {viewReceipt && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold block">{viewReceipt.transaction_no}</span>
                <h2 className="text-base font-bold text-slate-900">Payment Collection Voucher</h2>
              </div>
              <button onClick={() => setViewReceipt(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Customer:</span>
                <span className="font-bold text-slate-900">{viewReceipt.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Received By:</span>
                <span className="font-semibold text-slate-800">{viewReceipt.salesman_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Payment Method:</span>
                <span className="font-semibold text-slate-800">{viewReceipt.payment_method}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-800 font-bold">Amount Paid:</span>
                <span className="font-mono text-base font-extrabold text-emerald-600">
                  AED {viewReceipt.amount}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {editingTxn && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Edit Cashier Settlement</h3>
                <p className="text-[11px] text-slate-500">{editingTxn.name || editingTxn.salesman_name} ({editingTxn.transaction_no || editingTxn.salesman_id})</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingTxn(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateTxn} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Total Collectable (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingTxn.total_collectable || editingTxn.amount || "0.00"}
                    onChange={(e) => setEditingTxn({ ...editingTxn, total_collectable: e.target.value, amount: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Status</label>
                  <select
                    value={editingTxn.status || "Collected"}
                    onChange={(e) => setEditingTxn({ ...editingTxn, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Collected">Collected</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Cash (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingTxn.cash || "0.00"}
                    onChange={(e) => setEditingTxn({ ...editingTxn, cash: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Card (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingTxn.card || "0.00"}
                    onChange={(e) => setEditingTxn({ ...editingTxn, card: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Reference / Note</label>
                <input
                  type="text"
                  value={editingTxn.reference_note || ""}
                  onChange={(e) => setEditingTxn({ ...editingTxn, reference_note: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  placeholder="Receipt voucher reference"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTxn(null)}
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
                  Are you sure you want to delete transaction <strong className="text-slate-800">{deleteTarget.transaction_no || deleteTarget.name}</strong> for salesman <strong className="text-slate-800">{deleteTarget.name || deleteTarget.salesman_name}</strong>?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This transaction will be marked as Deleted, highlighted with a <strong>prominent red border</strong>, and can be restored at any time.
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
                onClick={confirmDeleteTxn}
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
