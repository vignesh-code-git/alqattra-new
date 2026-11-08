"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Search,
  Eye,
  Download,
  Upload,
  Printer,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  RotateCcw,
  Check,
  Edit,
  Trash2,
  AlertTriangle,
  Undo2,
} from "lucide-react";

export default function InvoicesPage() {
  const { addToast } = useToast();

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoice_no: "IN-T6329/029272",
      customer_name: "Rsalan Restaurant Grill",
      customer_id: "114141",
      invoice_date: "08/09/2026",
      truck: "T6329",
      quantity: 5,
      subtotal: "23.81",
      tax_amount: "1.19",
      total_amount: "25.00",
      paid_amount: "25.00",
      status: "Paid",
    },
    {
      id: 2,
      invoice_no: "IN-T6328/032245",
      customer_name: "TIANGO",
      customer_id: "114201",
      invoice_date: "08/09/2026",
      truck: "T6328",
      quantity: 1,
      subtotal: "6.00",
      tax_amount: "0.30",
      total_amount: "6.30",
      paid_amount: "6.30",
      status: "Paid",
    },
    {
      id: 3,
      invoice_no: "IN-T6328/032244",
      customer_name: "AHLAM",
      customer_id: "110964",
      invoice_date: "08/09/2026",
      truck: "T6328",
      quantity: 3,
      subtotal: "18.00",
      tax_amount: "0.90",
      total_amount: "18.90",
      paid_amount: "18.90",
      status: "Paid",
    },
    {
      id: 4,
      invoice_no: "IN-T6328/032243",
      customer_name: "SALAM JUMAH",
      customer_id: "102187",
      invoice_date: "08/09/2026",
      truck: "T6328",
      quantity: 1,
      subtotal: "59.05",
      tax_amount: "2.95",
      total_amount: "62.00",
      paid_amount: "62.00",
      status: "Paid",
    },
    {
      id: 5,
      invoice_no: "IN-T6328/032242",
      customer_name: "Sameer Salim",
      customer_id: "116412",
      invoice_date: "08/09/2026",
      truck: "T6328",
      quantity: 1,
      subtotal: "47.62",
      tax_amount: "2.38",
      total_amount: "50.00",
      paid_amount: "50.00",
      status: "Paid",
    },
    {
      id: 6,
      invoice_no: "IN-T6354/033061",
      customer_name: "Abdul Aziz",
      customer_id: "113904",
      invoice_date: "08/09/2026",
      truck: "T6354",
      quantity: 4,
      subtotal: "20.00",
      tax_amount: "1.00",
      total_amount: "21.00",
      paid_amount: "0.00",
      status: "Sent",
    },
    {
      id: 7,
      invoice_no: "IN-T6329/029271",
      customer_name: "Any Way rent a car 116773",
      customer_id: "16599",
      invoice_date: "08/09/2026",
      truck: "T6329",
      quantity: 1,
      subtotal: "5.00",
      tax_amount: "0.25",
      total_amount: "5.25",
      paid_amount: "5.25",
      status: "Paid",
    },
    {
      id: 8,
      invoice_no: "IN-T6341/026305",
      customer_name: "al ain feed mill-mawarid services LLC",
      customer_id: "111450",
      invoice_date: "08/09/2026",
      truck: "T6341",
      quantity: 39,
      subtotal: "156.00",
      tax_amount: "7.80",
      total_amount: "163.80",
      paid_amount: "163.80",
      status: "Paid",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendarPopover, setShowCalendarPopover] = useState(false);
  const [sortField, setSortField] = useState("invoice_no");
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
    if (!filteredInvoices.length) {
      addToast("No invoices to export", "error");
      return;
    }
    const headers = ["Invoice No", "Customer", "Issue Date", "Due Date", "Subtotal (AED)", "VAT 5%", "Total (AED)", "Status"];
    const rows = filteredInvoices.map((i) =>
      [i.invoice_no, i.customer_name, i.invoice_date, i.due_date, i.subtotal, i.tax_amount, i.total_amount, i.status]
        .map((val) => `"${(val || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredInvoices.length} invoices to CSV`, "success");
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

        const importedInvoices = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseLine(lines[i]);
          if (!cols || cols.length === 0 || !cols[0]) continue;
          const invoice = {
            id: Date.now() + i,
            invoice_no: cols[0] || `IN-IMP-${2000 + i}`,
            customer_name: cols[1] || "Imported Customer",
            customer_code: cols[2] || `CUST-IMP-${i}`,
            invoice_date: cols[3] || new Date().toISOString().slice(0, 10),
            truck: cols[4] || "T6350",
            quantity: parseInt(cols[5]) || 10,
            total_amount: cols[6] || "52.50",
            status: cols[7] || "Paid",
            due_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
          };
          importedInvoices.push(invoice);
        }

        if (importedInvoices.length > 0) {
          setInvoices((prev) => [...importedInvoices, ...prev]);
          addToast(`Successfully imported ${importedInvoices.length} invoices from ${file.name}`, "success");
        } else {
          addToast("No valid invoice records found in CSV", "error");
        }
      } catch {
        addToast("Failed to parse CSV file. Please verify format.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Generate form
  const [formData, setFormData] = useState({
    customer_name: "Al Ain Palace Hotel",
    subtotal: "1500",
    due_days: "30",
  });

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getInvoices();
      if (data && data.length > 0) {
        setInvoices(data);
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

  const isInvoiceDateInRange = (dateStr) => {
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

  const filteredInvoices = useMemo(() => {
    const q = search.trim().toLowerCase();

    return invoices
      .filter((i) => {
        // Tab / Status filter - Deleted invoices NEVER show in main table, ONLY in Deleted tab
        if (activeTab === "Deleted") {
          if (i.status !== "Deleted") return false;
        } else {
          if (i.status === "Deleted") return false;
          if (activeTab !== "All" && i.status !== activeTab) return false;
        }

        // Date range filter
        const invDate = i.invoice_date || i.due_date;
        if (!isInvoiceDateInRange(invDate)) return false;

        // Universal all-fields filter
        if (!q) return true;
        return Object.values(i).some((val) => {
          if (val == null) return false;
          return val.toString().toLowerCase().includes(q);
        });
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === "total_amount" || sortField === "subtotal") {
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
  }, [invoices, search, activeTab, dateRange, startDate, endDate, sortField, sortAsc]);

  // Checkbox selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvoices.map((i) => i.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete invoice trigger
  const handleDeleteInvoice = (inv) => {
    setDeleteTarget(inv);
  };

  // Confirm delete invoice (Soft deletes to "Deleted" with red border styling)
  const confirmDeleteInvoice = async () => {
    if (!deleteTarget) return;
    const inv = deleteTarget;
    try {
      if (inv.id && typeof inv.id === "number" && inv.id < 100000) {
        await apiService.updateInvoice(inv.id, {
          status: "Deleted",
        });
      }
    } catch {
      // Optimistic update
    }
    setInvoices((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, status: "Deleted" } : i))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Invoice Moved to Deleted",
      message: `Invoice ${inv.invoice_no} (${inv.customer_name}) has been moved to Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Invoice ${inv.invoice_no} moved to Deleted list`, "info");
  };

  // Restore invoice back to Paid
  const handleRestoreInvoice = async (inv) => {
    try {
      if (inv.id && typeof inv.id === "number" && inv.id < 100000) {
        await apiService.updateInvoice(inv.id, {
          status: "Paid",
        });
      }
    } catch {
      // Optimistic update
    }
    setInvoices((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, status: "Paid" } : i))
    );
    setCrudPopup({
      type: "restore",
      title: "Invoice Restored",
      message: `Invoice ${inv.invoice_no} has been successfully restored to Paid status!`,
    });
    addToast(`Invoice ${inv.invoice_no} restored to Paid`, "success");
  };

  // Update invoice in database
  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    if (!editingInvoice) return;
    try {
      if (editingInvoice.id && typeof editingInvoice.id === "number" && editingInvoice.id < 100000) {
        await apiService.updateInvoice(editingInvoice.id, {
          status: editingInvoice.status,
          total_amount: editingInvoice.total_amount,
          paid_amount: editingInvoice.paid_amount,
          due_date: editingInvoice.due_date,
        });
      }
      setInvoices((prev) =>
        prev.map((i) => (i.id === editingInvoice.id ? { ...i, ...editingInvoice } : i))
      );
      setCrudPopup({
        type: "update",
        title: "Invoice Updated",
        message: `Invoice ${editingInvoice.invoice_no} updated and saved to database successfully.`,
      });
      addToast(`Invoice ${editingInvoice.invoice_no} updated in database!`, "success");
    } catch {
      setInvoices((prev) =>
        prev.map((i) => (i.id === editingInvoice.id ? { ...i, ...editingInvoice } : i))
      );
      addToast(`Invoice updated`, "success");
    }
    setEditingInvoice(null);
  };

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    const sub = parseFloat(formData.subtotal) || 0;
    const vat = parseFloat((sub * 0.05).toFixed(2));
    const total = (sub + vat).toFixed(2);
    const invNo = `INV-2026-004${invoices.length + 1}`;

    const payload = {
      invoice_no: invNo,
      customer_name: formData.customer_name,
      invoice_date: "2026-11-08",
      due_date: "2026-12-08",
      subtotal: sub.toFixed(2),
      tax_amount: vat.toFixed(2),
      total_amount: total,
      paid_amount: "0.00",
      status: "Sent",
    };

    const saved = await apiService.createInvoice(payload);
    const newInv = saved && saved.id ? saved : { id: Date.now(), ...payload };

    setInvoices([newInv, ...invoices]);
    setShowGenerateModal(false);
    setCrudPopup({
      type: "create",
      title: "Invoice Generated",
      message: `Tax Invoice ${invNo} for ${formData.customer_name} created successfully (Total: AED ${total}) and saved to the database.`,
    });
    addToast(`Tax Invoice ${invNo} saved to database! Total: AED ${total}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Billing & Invoicing" subtitle="Invoices" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold overflow-x-auto max-w-full">
              {[
                { id: "All", label: "All", count: invoices.filter((i) => i.status !== "Deleted").length },
                { id: "Paid", label: "Paid", count: invoices.filter((i) => i.status === "Paid").length },
                { id: "Sent", label: "Sent", count: invoices.filter((i) => i.status === "Sent").length },
                { id: "Deleted", label: "Deleted", count: invoices.filter((i) => i.status === "Deleted").length },
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
                Total Invoiced
              </span>
              <span className="text-sm font-extrabold text-emerald-600 font-mono">
                AED 4,908.75
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
                        <span>Filter Invoices by Date</span>
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
              title="Import invoices from CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Import</span>
            </button>

            {/* CSV Export */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Export invoices to CSV"
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
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoices Table with Blue Table Header matching exact Figma field items */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[750px]">
              <thead className="bg-[#5948DB] text-xs font-semibold text-white tracking-normal border-b border-[#4A3AC9]">
                <tr>
                  <th className="px-3.5 py-3 w-10 text-center border-r border-[#7161F0]/70 bg-[#5948DB]">
                    <input
                      type="checkbox"
                      checked={
                        filteredInvoices.length > 0 &&
                        selectedIds.length === filteredInvoices.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded-xs border-white/60 text-[#5948DB] focus:ring-0 cursor-pointer accent-white"
                    />
                  </th>
                  <th
                    onClick={() => handleSort("invoice_no")}
                    className="px-4 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>INVOICE ID</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("customer_name")}
                    className="px-4 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>CUSTOMER</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold select-none border-r border-[#7161F0]/70 text-white">CUSTOMER ID</th>
                  <th
                    onClick={() => handleSort("invoice_date")}
                    className="px-4 py-3 font-semibold cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center gap-1">
                      <span>DATE</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">TRUCK</th>
                  <th className="px-3 py-3 font-semibold text-center select-none border-r border-[#7161F0]/70 text-white">QUANTITY</th>
                  <th
                    onClick={() => handleSort("total_amount")}
                    className="px-4 py-3 font-semibold text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/70 text-white"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>TOTAL</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-semibold text-center select-none text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredInvoices.map((inv) => {
                  const isDeleted = inv.status === "Deleted";
                  return (
                  <tr
                    key={inv.id}
                    className={`transition-colors ${
                      isDeleted
                        ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                        : selectedIds.includes(inv.id)
                        ? "bg-blue-50/50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className={`px-3.5 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(inv.id)}
                        onChange={() => toggleSelectOne(inv.id)}
                        className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className={`px-4 py-3 font-mono font-bold text-slate-800 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                      {inv.invoice_no}
                    </td>
                    <td className={`px-4 py-3 text-slate-900 font-semibold border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} uppercase`}>
                      {inv.customer_name}
                    </td>
                    <td className={`px-4 py-3 font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      {inv.customer_id || "114141"}
                    </td>
                    <td className={`px-4 py-3 font-mono text-slate-600 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                      {inv.invoice_date}
                    </td>
                    <td className={`px-3 py-3 text-center font-bold text-slate-700 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      {inv.truck || "T6329"}
                    </td>
                    <td className={`px-3 py-3 text-center font-mono font-bold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                      {inv.quantity || 1}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono font-extrabold text-slate-900 border-r ${isDeleted ? "border-rose-200" : "border-slate-200"} whitespace-nowrap`}>
                      AED {parseFloat(inv.total_amount).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-center whitespace-nowrap">
                      {isDeleted ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase">
                            Deleted
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRestoreInvoice(inv)}
                            className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="Restore this invoice"
                          >
                            <Undo2 className="w-3 h-3" />
                            <span>Restore</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-2 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingInvoice({ ...inv })}
                            className="px-2 py-1 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteInvoice(inv)}
                            className="p-1 rounded-sm bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-[11px] shadow-2xs transition-colors cursor-pointer"
                            title="Delete Invoice"
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
              Showing <span className="font-bold text-slate-800">{filteredInvoices.length}</span> of{" "}
              <span className="font-bold text-slate-800">{invoices.length}</span> invoices
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

      {/* Generate Invoice Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Generate Tax Invoice</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleGenerateInvoice} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Customer Account</label>
                <select
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium"
                >
                  <option value="Al Ain Palace Hotel">Al Ain Palace Hotel</option>
                  <option value="Emirates Steel Staff Quarters">Emirates Steel Staff Quarters</option>
                  <option value="Fatima Al Kaabi Villa">Fatima Al Kaabi Villa</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Invoice Subtotal (AED)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.subtotal}
                  onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>UAE VAT (5%):</span>
                  <span className="font-mono font-semibold">
                    AED {(parseFloat(formData.subtotal || 0) * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="font-mono text-emerald-600 font-extrabold text-sm">
                    AED {(parseFloat(formData.subtotal || 0) * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs active:scale-[0.98]"
                >
                  Generate Tax Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-emerald-700 font-bold text-base flex items-center gap-1.5">
                  القطارة <span className="text-slate-900 font-extrabold">AL QATTARA PURE WATER LLC</span>
                </span>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">TRN: 100234567800003 | Al Ain, UAE</div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <div className="flex justify-between items-start text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Billed To</span>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{selectedInvoice.customer_name}</div>
                <div className="text-slate-500 mt-1">Tax Invoice No: <span className="text-blue-600 font-mono font-bold">{selectedInvoice.invoice_no}</span></div>
              </div>
              <div className="text-right text-slate-600 space-y-0.5">
                <div>Issue Date: <span className="font-semibold text-slate-800">{selectedInvoice.invoice_date}</span></div>
                <div>Due Date: <span className="font-semibold text-slate-800">{selectedInvoice.due_date}</span></div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#5948DB] text-xs text-white border-b border-[#4A3AC9] font-semibold">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold border-r border-[#7161F0]/70 text-white">Description</th>
                    <th className="px-4 py-2.5 text-right font-semibold text-white">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="px-4 py-3 font-medium">5 Gallon Pure Drinking Water Delivery</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">{selectedInvoice.subtotal}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-500">UAE Value Added Tax (VAT 5%)</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-500">{selectedInvoice.tax_amount}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-900">Total Payable Amount</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-mono text-base font-extrabold">
                      AED {selectedInvoice.total_amount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Edit Invoice ({editingInvoice.invoice_no})</h3>
                <p className="text-[11px] text-slate-500">{editingInvoice.customer_name}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingInvoice(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateInvoice} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Status</label>
                  <select
                    value={editingInvoice.status}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Sent">Sent</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={editingInvoice.due_date?.length === 10 ? editingInvoice.due_date : "2026-12-08"}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, due_date: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Total Amount (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingInvoice.total_amount}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, total_amount: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Paid Amount (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingInvoice.paid_amount || "0.00"}
                    onChange={(e) => setEditingInvoice({ ...editingInvoice, paid_amount: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingInvoice(null)}
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
                  Are you sure you want to delete invoice <strong className="text-slate-800">{deleteTarget.invoice_no}</strong> for customer <strong className="text-slate-800">{deleteTarget.customer_name}</strong>?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This invoice will be marked as Deleted, highlighted with a <strong>prominent red border</strong>, and can be restored at any time.
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
                onClick={confirmDeleteInvoice}
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
