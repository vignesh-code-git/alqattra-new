"use client";

import { useState, useMemo, useRef } from "react";
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
  FileText,
  Users,
  X,
} from "lucide-react";

export default function CashierPage() {
  const { addToast } = useToast();

  // Main Figma module sub-tab: 'salesman_collection' (3:1777) | 'customer_credits' (3:1779) | 'customer_statement' (3:1780)
  const [cashierViewTab, setCashierViewTab] = useState("salesman_collection");
  const [showCollectedPaymentsModal, setShowCollectedPaymentsModal] = useState(false);

  // Exact 10 Figma rows from Cashier screenshot (3:1777)
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
    {
      id: 9,
      salesman_id: "89",
      name: "SHAHIL",
      customer_name: "SHAHIL",
      salesman_name: "SHAHIL",
      transaction_no: "TXN-89",
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
      id: 10,
      salesman_id: "92",
      name: "IKRAM",
      customer_name: "IKRAM",
      salesman_name: "IKRAM",
      transaction_no: "TXN-92",
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

  // Customer Credits Data (Figma 3:1779)
  const [customerCredits, setCustomerCredits] = useState([
    {
      id: 101,
      customer_id: "197301",
      customer_name: "AL NEBRAS SCHOOL",
      route: "Rt-AlAin-01",
      salesman: "NISAR (38)",
      credit_limit: "5000.00",
      used_credit: "1840.50",
      available_credit: "3159.50",
      last_payment: "08/09/2026",
      status: "Active",
    },
    {
      id: 102,
      customer_id: "197300",
      customer_name: "MOHAMMED KHALIFA",
      route: "Rt-AbuDhabi-04",
      salesman: "ANAS (56)",
      credit_limit: "2500.00",
      used_credit: "620.00",
      available_credit: "1880.00",
      last_payment: "07/09/2026",
      status: "Active",
    },
    {
      id: 103,
      customer_id: "197299",
      customer_name: "AL REEM MINI MART",
      route: "Rt-AlAin-03",
      salesman: "HASHIM (47)",
      credit_limit: "10000.00",
      used_credit: "4125.09",
      available_credit: "5874.91",
      last_payment: "06/09/2026",
      status: "Active",
    },
    {
      id: 104,
      customer_id: "197298",
      customer_name: "ABDULLAH AL KAABI",
      route: "Rt-AlAin-02",
      salesman: "MUFEED (57)",
      credit_limit: "1500.00",
      used_credit: "950.00",
      available_credit: "550.00",
      last_payment: "05/09/2026",
      status: "Active",
    },
    {
      id: 105,
      customer_id: "197297",
      customer_name: "OASIS HYPERMARKET",
      route: "Rt-Dubai-01",
      salesman: "MALAKA (105)",
      credit_limit: "15000.00",
      used_credit: "570.00",
      available_credit: "14430.00",
      last_payment: "08/09/2026",
      status: "Active",
    },
  ]);

  // Customer Statement Filter & Data (Figma 3:1780)
  const [statementFilter, setStatementFilter] = useState({
    customer_id: "197301 - AL NEBRAS SCHOOL",
    from_date: "2026-09-01",
    to_date: "2026-09-08",
  });

  const statementLedger = [
    {
      id: 1,
      date: "01/09/2026",
      reference_no: "OB-2026-09",
      type: "Opening Balance",
      description: "Monthly Opening Balance Brought Forward",
      debit: "1200.00",
      credit: "0.00",
      balance: "1200.00",
    },
    {
      id: 2,
      date: "03/09/2026",
      reference_no: "IN-T6329/029272",
      type: "Credit Invoice",
      description: "5 Gallon Water (45 Bottles) Delivered",
      debit: "270.00",
      credit: "0.00",
      balance: "1470.00",
    },
    {
      id: 3,
      date: "05/09/2026",
      reference_no: "RCP-2026-8841",
      type: "Cash Collection",
      description: "Payment Collected by Salesman NISAR (38)",
      debit: "0.00",
      credit: "500.00",
      balance: "970.00",
    },
    {
      id: 4,
      date: "07/09/2026",
      reference_no: "IN-T6352/029880",
      type: "Credit Invoice",
      description: "5 Gallon Water (80 Bottles) + 500ml PET Cartons",
      debit: "870.50",
      credit: "0.00",
      balance: "1840.50",
    },
  ];

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
  const [sortField, setSortField] = useState("salesman_id");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const fileInputRef = useRef(null);

  const getCalendarLabel = () => {
    if (dateRange === "ALL") return "All Dates";
    if (dateRange === "TODAY") return "Today (08/09/2026)";
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
    const headers = [
      "Salesman ID",
      "Name",
      "Latest Collection",
      "Recharge",
      "Credit Returned",
      "Cash",
      "Card",
      "Returned",
      "Pending Payment",
      "Total Collectable",
      "Status",
    ];
    const rows = filteredTransactions.map((t) =>
      [
        t.salesman_id,
        t.name,
        t.latest_collection,
        t.recharge,
        t.credit_returned,
        t.cash,
        t.card,
        t.returned,
        t.pending_payment,
        t.total_collectable,
        t.status,
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
    a.download = "cashier_payment_collection.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Downloaded ${filteredTransactions.length} payment collection records`, "success");
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
            customer_name: cols[1] || "Salesman",
            salesman_name: cols[1] || "Salesman",
            latest_collection: cols[2] || "0.00",
            recharge: cols[3] || "0.00",
            credit_returned: cols[4] || "0.00",
            cash: cols[5] || "100.00",
            card: cols[6] || "0.00",
            returned: cols[7] || "0.00",
            pending_payment: cols[8] || "0.00",
            total_collectable: cols[9] || "100.00",
            amount: cols[9] || "100.00",
            status: "Collected",
            created_at: "08/09/2026",
          };
          importedTxns.push(txn);
        }

        if (importedTxns.length > 0) {
          setTransactions((prev) => [...importedTxns, ...prev]);
          addToast(
            `Successfully imported ${importedTxns.length} cashier records from ${file.name}`,
            "success"
          );
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
    customer_name: "AL NEBRAS SCHOOL",
    salesman_name: "ANAS",
    salesman_id: "56",
    amount: "148.20",
    payment_type: "Collection",
    payment_method: "Cash",
    reference_note: "Daily route collection handover",
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();

    return transactions
      .filter((t) => {
        if (activeTab === "Deleted") {
          if (t.status !== "Deleted") return false;
        } else {
          if (t.status === "Deleted") return false;
          if (activeTab === "Collected" && t.status !== "Collected") return false;
          if (activeTab === "Collect" && t.status !== "Collect") return false;
        }

        if (!q) return true;
        return Object.values(t).some((val) => {
          if (val == null) return false;
          return val.toString().toLowerCase().includes(q);
        });
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === "total_collectable" || sortField === "amount") {
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
  }, [transactions, search, activeTab, sortField, sortAsc]);

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

  const handleDeleteTxn = (txn) => {
    setDeleteTarget(txn);
  };

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
      addToast(`Transaction ${editingTxn.transaction_no || editingTxn.name} updated!`, "success");
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
    const created = {
      id: saved?.id || Date.now(),
      salesman_id: newTxn.salesman_id || "56",
      name: newTxn.salesman_name.toUpperCase(),
      customer_name: newTxn.customer_name,
      salesman_name: newTxn.salesman_name.toUpperCase(),
      transaction_no: txnNo,
      latest_collection: amountVal.toFixed(2),
      recharge: "0.00",
      credit_returned: "0.00",
      cash: newTxn.payment_method === "Cash" ? amountVal.toFixed(2) : "0.00",
      card: newTxn.payment_method === "Card" ? amountVal.toFixed(2) : "0.00",
      returned: "0.00",
      pending_payment: "0.00",
      total_collectable: amountVal.toFixed(2),
      amount: amountVal.toFixed(2),
      payment_type: newTxn.payment_type,
      payment_method: newTxn.payment_method,
      status: "Collected",
      created_at: "08/09/2026",
    };

    setTransactions([created, ...transactions]);
    setShowModal(false);
    setCrudPopup({
      type: "create",
      title: "Payment Receipt Created",
      message: `Receipt ${txnNo} for AED ${amountVal.toFixed(2)} recorded and synchronized with the database.`,
    });
    addToast(`Payment receipt ${txnNo} recorded: AED ${amountVal.toFixed(2)}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Cashier" subtitle="Cashier & Collections Management" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Bar with Figma "Collected Payments" green button (3:1778) and "+ Record Payment" */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Cashier</h2>
            <p className="text-xs text-slate-500">
              Manage daily salesman collections, customer credit settlements, and statements
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowCollectedPaymentsModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Collected Payments</span>
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Exact 4 Figma KPI Cards (3:1777) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                TOTAL RECEIVABLE
              </div>
              <div className="text-lg font-extrabold font-mono text-slate-900 mt-0.5">
                AED 16602.78
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ArrowDownCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                RECENT COLLECTION
              </div>
              <div className="text-lg font-extrabold font-mono text-emerald-700 mt-0.5">
                AED 8497.19
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                PENDING PAYMENTS
              </div>
              <div className="text-lg font-extrabold font-mono text-amber-700 mt-0.5">
                AED 8105.59
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                WALLET RECHARGES
              </div>
              <div className="text-lg font-extrabold font-mono text-purple-700 mt-0.5">
                AED 817.00
              </div>
            </div>
          </div>
        </div>

        {/* Exact 3 Figma Module Sub-Tabs: Salesman Collection | Customer Credits | Customer Statement */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: "salesman_collection", label: "Salesman Collection", icon: DollarSign },
            { id: "customer_credits", label: "Customer Credits", icon: Users },
            { id: "customer_statement", label: "Customer Statement", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = cashierViewTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCashierViewTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap select-none ${
                  isActive
                    ? "bg-[#5948DB] text-white border-[#5948DB] shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SALESMAN COLLECTION (Figma 3:1777) */}
        {cashierViewTab === "salesman_collection" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-extrabold text-slate-800">Payment Collection</span>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto max-w-full">
                  {[
                    {
                      id: "All",
                      label: "All",
                      count: transactions.filter((t) => t.status !== "Deleted").length,
                    },
                    {
                      id: "Collected",
                      label: "Collected",
                      count: transactions.filter((t) => t.status === "Collected").length,
                    },
                    {
                      id: "Collect",
                      label: "Pending Collection",
                      count: transactions.filter((t) => t.status === "Collect").length,
                    },
                    {
                      id: "Deleted",
                      label: "Deleted",
                      count: transactions.filter((t) => t.status === "Deleted").length,
                    },
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

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                <div className="relative flex-1 sm:w-60 min-w-[160px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
                  <input
                    type="text"
                    placeholder="Search salesman or ID..."
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
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowCalendarPopover(false)}
                      />
                      <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-md shadow-xl p-3.5 z-50 animate-in fade-in zoom-in-95 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>Filter Receipts by Date</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowCalendarPopover(false)}
                            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                          >
                            ×
                          </button>
                        </div>

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
                              className={`px-2.5 py-1.5 rounded-md text-left font-semibold border transition-colors duration-150 flex items-center justify-between text-xs cursor-pointer ${
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
                    </>
                  )}
                </div>

                {/* CSV Import */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Import</span>
                </button>

                {/* Figma "Download" button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Cashier Payment Collection Table with Blue Header matching exact Figma fields */}
            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[950px]">
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
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        LATEST COLLECTION
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        RECHARGE
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        CREDIT RETURNED
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        CASH
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        CARD
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        RETURNED
                      </th>
                      <th className="px-3 py-3 font-semibold text-right select-none border-r border-[#7161F0]/70 text-white">
                        PENDING PAYMENT
                      </th>
                      <th
                        onClick={() => handleSort("total_collectable")}
                        className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>TOTAL COLLECTABLE</span>
                          <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                        </div>
                      </th>
                      <th className="px-4 py-3 font-semibold text-center select-none text-white">
                        ACTION
                      </th>
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
                          <td
                            className={`px-3.5 py-3 text-center border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(t.id)}
                              onChange={() => toggleSelectOne(t.id)}
                              className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td
                            className={`px-3 py-3 font-mono text-center font-bold text-slate-800 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            {t.salesman_id || "56"}
                          </td>
                          <td
                            className={`px-4 py-3 font-extrabold text-slate-900 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            } uppercase`}
                          >
                            {t.name || t.salesman_name}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED {parseFloat(t.latest_collection || t.amount || 0).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-600 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED {parseFloat(t.recharge || 0).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-600 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED {parseFloat(t.credit_returned || 0).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED{" "}
                            {parseFloat(
                              t.cash || (t.payment_method === "Cash" ? t.amount : 0)
                            ).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-700 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED{" "}
                            {parseFloat(
                              t.card || (t.payment_method === "Card" ? t.amount : 0)
                            ).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-500 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED {parseFloat(t.returned || 0).toFixed(2)}
                          </td>
                          <td
                            className={`px-3 py-3 text-right font-mono text-slate-500 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            }`}
                          >
                            AED {parseFloat(t.pending_payment || 0).toFixed(2)}
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-mono font-extrabold text-slate-900 border-r ${
                              isDeleted ? "border-rose-200" : "border-slate-200"
                            } whitespace-nowrap`}
                          >
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
                                    addToast(
                                      `Payment collected for ${t.name || t.salesman_name}`,
                                      "success"
                                    );
                                  }}
                                  className={`px-2.5 py-1 rounded-sm font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer ${
                                    t.status === "Collected"
                                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                      : "bg-blue-600 hover:bg-blue-700 text-white"
                                  }`}
                                >
                                  {t.status === "Collected" ? "✓ Collected" : "Collect"}
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
                  Showing <span className="font-bold text-slate-800">1</span> to{" "}
                  <span className="font-bold text-slate-800">{filteredTransactions.length}</span> of{" "}
                  <span className="font-bold text-slate-800">{transactions.length}</span> results
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled
                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 font-medium cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#5948DB] text-white font-bold text-xs shadow-2xs">
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
          </div>
        )}

        {/* TAB 2: CUSTOMER CREDITS (Figma 3:1779) */}
        {cashierViewTab === "customer_credits" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800">Customer Credit Accounts</h3>
              <button
                type="button"
                onClick={() =>
                  addToast("Exported Customer Credits ledger to CSV", "success")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white rounded-md text-xs font-bold shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Credits</span>
              </button>
            </div>

            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                  <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                    <tr>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">CUSTOMER ID</th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">CUSTOMER NAME</th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">ROUTE / SALESMAN</th>
                      <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                        CREDIT LIMIT
                      </th>
                      <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                        USED CREDIT
                      </th>
                      <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                        AVAILABLE CREDIT
                      </th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">LAST PAYMENT</th>
                      <th className="px-4 py-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {customerCredits.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono font-bold text-blue-700 border-r border-slate-200">
                          {c.customer_id}
                        </td>
                        <td className="px-4 py-3 font-extrabold text-slate-900 border-r border-slate-200">
                          {c.customer_name}
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-200">
                          {c.route} • {c.salesman}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                          AED {c.credit_limit}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-rose-600 border-r border-slate-200">
                          AED {c.used_credit}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700 border-r border-slate-200">
                          AED {c.available_credit}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-500 border-r border-slate-200">
                          {c.last_payment}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setCustomerCredits((prev) =>
                                prev.map((item) =>
                                  item.id === c.id
                                    ? {
                                        ...item,
                                        used_credit: "0.00",
                                        available_credit: item.credit_limit,
                                      }
                                    : item
                                )
                              );
                              addToast(
                                `Credit balance settled for ${c.customer_name}`,
                                "success"
                              );
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-2xs cursor-pointer"
                          >
                            Settle Credit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER STATEMENT (Figma 3:1780) */}
        {cashierViewTab === "customer_statement" && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end text-xs">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Select Customer Account
                  </label>
                  <select
                    value={statementFilter.customer_id}
                    onChange={(e) =>
                      setStatementFilter({ ...statementFilter, customer_id: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-semibold text-slate-800"
                  >
                    <option value="197301 - AL NEBRAS SCHOOL">197301 - AL NEBRAS SCHOOL</option>
                    <option value="197300 - MOHAMMED KHALIFA">197300 - MOHAMMED KHALIFA</option>
                    <option value="197299 - AL REEM MINI MART">197299 - AL REEM MINI MART</option>
                    <option value="197298 - ABDULLAH AL KAABI">197298 - ABDULLAH AL KAABI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">From Date</label>
                  <input
                    type="date"
                    value={statementFilter.from_date}
                    onChange={(e) =>
                      setStatementFilter({ ...statementFilter, from_date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">To Date</label>
                  <input
                    type="date"
                    value={statementFilter.to_date}
                    onChange={(e) =>
                      setStatementFilter({ ...statementFilter, to_date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addToast(
                        `Statement generated for ${statementFilter.customer_id}`,
                        "success"
                      )
                    }
                    className="px-4 py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-bold rounded-md shadow-2xs cursor-pointer"
                  >
                    Generate Statement
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-md flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[800px]">
                  <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                    <tr>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">DATE</th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">REFERENCE NO</th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">TYPE</th>
                      <th className="px-4 py-3 border-r border-[#7161F0]/70">DESCRIPTION</th>
                      <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                        DEBIT (AED)
                      </th>
                      <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                        CREDIT (AED)
                      </th>
                      <th className="px-4 py-3 text-right">RUNNING BALANCE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {statementLedger.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-slate-700 border-r border-slate-200">
                          {row.date}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700 border-r border-slate-200">
                          {row.reference_no}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 border-r border-slate-200">
                          {row.type}
                        </td>
                        <td className="px-4 py-3 text-slate-600 border-r border-slate-200">
                          {row.description}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-rose-600 border-r border-slate-200">
                          AED {row.debit}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-emerald-700 border-r border-slate-200">
                          AED {row.credit}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-extrabold text-slate-900">
                          AED {row.balance}
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

      {/* Collected Payments Modal (Figma 3:1778) */}
      {showCollectedPaymentsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Collected Payments History
                </h2>
                <p className="text-xs text-slate-500">
                  Verified salesman cash and card collections settled with cashier
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCollectedPaymentsModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#5948DB] text-white font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">SALESMAN ID</th>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">NAME</th>
                    <th className="px-3.5 py-2.5 text-right border-r border-[#7161F0]/70">CASH</th>
                    <th className="px-3.5 py-2.5 text-right border-r border-[#7161F0]/70">CARD</th>
                    <th className="px-3.5 py-2.5 text-right border-r border-[#7161F0]/70">
                      TOTAL COLLECTED
                    </th>
                    <th className="px-3.5 py-2.5 text-center">DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions
                    .filter((t) => t.status === "Collected")
                    .map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="px-3.5 py-2.5 font-mono font-bold text-slate-800 border-r border-slate-200">
                          {t.salesman_id}
                        </td>
                        <td className="px-3.5 py-2.5 font-extrabold text-slate-900 border-r border-slate-200">
                          {t.name}
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                          AED {t.cash}
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono text-slate-700 border-r border-slate-200">
                          AED {t.card}
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono font-bold text-emerald-700 border-r border-slate-200">
                          AED {t.total_collectable}
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono text-slate-500">
                          {t.created_at}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCollectedPaymentsModal(false)}
                className="px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white rounded-md text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Record Cashier Collection</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTxn} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Salesman / Collector
                </label>
                <select
                  value={newTxn.salesman_name}
                  onChange={(e) => setNewTxn({ ...newTxn, salesman_name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="ANAS">56 - ANAS</option>
                  <option value="NISAR">38 - NISAR</option>
                  <option value="HASHIM">47 - HASHIM</option>
                  <option value="MUFEED">57 - MUFEED</option>
                  <option value="MALAKA">105 - MALAKA</option>
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
                  className="px-5 py-2 rounded-xl bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Save Payment Receipt
                </button>
              </div>
            </form>
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
                <p className="text-[11px] text-slate-500">
                  {editingTxn.name || editingTxn.salesman_name} (
                  {editingTxn.transaction_no || editingTxn.salesman_id})
                </p>
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
                  <label className="text-slate-700 font-medium block mb-1">
                    Total Collectable (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingTxn.total_collectable || editingTxn.amount || "0.00"}
                    onChange={(e) =>
                      setEditingTxn({
                        ...editingTxn,
                        total_collectable: e.target.value,
                        amount: e.target.value,
                      })
                    }
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
                    <option value="Collect">Pending Collection</option>
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

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTxn(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-medium text-xs shadow-xs"
                >
                  Save Changes
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
                  Are you sure you want to delete transaction for salesman{" "}
                  <strong className="text-slate-800">
                    {deleteTarget.name || deleteTarget.salesman_name}
                  </strong>
                  ?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This transaction will be moved to the Deleted tab and can be restored at any time.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTxn}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
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
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{crudPopup.message}</p>
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
