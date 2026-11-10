"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function InvoicesPage() {
  const { addToast } = useToast();

  // Exact 10 rows from Figma 3:1740 (steps/1147/media_0.png)
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
    {
      id: 9,
      invoice_no: "IN-T6329/029270",
      customer_name: "Zahid Rafeeq Mir",
      customer_id: "115729",
      invoice_date: "08/09/2026",
      truck: "T6329",
      quantity: 6,
      subtotal: "30.00",
      tax_amount: "1.50",
      total_amount: "31.50",
      paid_amount: "31.50",
      status: "Paid",
    },
    {
      id: 10,
      invoice_no: "IN-T6352/029879",
      customer_name: "ADDC TAQA -A-20438/B",
      customer_id: "16652",
      invoice_date: "08/09/2026",
      truck: "T6352",
      quantity: 13,
      subtotal: "44.82",
      tax_amount: "2.24",
      total_amount: "47.06",
      paid_amount: "47.06",
      status: "Paid",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("All");
  const [filterSalesRep, setFilterSalesRep] = useState("All");
  const [filterTruck, setFilterTruck] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);

  // Generate Invoice form matching Figma 3:1741
  const [formData, setFormData] = useState({
    customer_name: "Rsalan Restaurant Grill",
    customer_id: "114141",
    truck: "T6329",
    quantity: 5,
    unit_price: "5.00",
    invoice_date: "2026-09-08",
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
    if (!filteredInvoices.length) {
      addToast("No invoices to export", "error");
      return;
    }
    const headers = [
      "Invoice ID",
      "Customer",
      "Customer ID",
      "Date",
      "Truck",
      "Quantity",
      "Total (AED)",
    ];
    const rows = filteredInvoices.map((i) =>
      [
        i.invoice_no,
        i.customer_name,
        i.customer_id,
        i.invoice_date,
        i.truck,
        i.quantity,
        i.total_amount,
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
    a.download = "invoices_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredInvoices.length} invoices to CSV`, "success");
  };

  const filteredInvoices = useMemo(() => {
    const q = search.trim().toLowerCase();

    return invoices
      .filter((i) => {
        if (i.status === "Deleted") return false;
        if (filterCustomer !== "All" && i.customer_name !== filterCustomer)
          return false;
        if (filterTruck !== "All" && i.truck !== filterTruck) return false;

        if (!q) return true;
        return Object.values(i).some((val) => {
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
  }, [invoices, search, filterCustomer, filterTruck, sortField, sortAsc]);

  const confirmDeleteInvoice = () => {
    if (!deleteTarget) return;
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === deleteTarget.id ? { ...i, status: "Deleted" } : i
      )
    );
    addToast(`Invoice ${deleteTarget.invoice_no} deleted`, "info");
    setDeleteTarget(null);
  };

  const handleUpdateInvoice = (e) => {
    e.preventDefault();
    if (!editingInvoice) return;
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === editingInvoice.id ? { ...i, ...editingInvoice } : i
      )
    );
    addToast(`Invoice ${editingInvoice.invoice_no} updated!`, "success");
    setEditingInvoice(null);
  };

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    const sub =
      (parseFloat(formData.quantity) || 1) *
      (parseFloat(formData.unit_price) || 5);
    const vat = parseFloat((sub * 0.05).toFixed(2));
    const total = (sub + vat).toFixed(2);
    const invNo = `IN-${formData.truck}/029${273 + invoices.length}`;

    const newInv = {
      id: Date.now(),
      invoice_no: invNo,
      customer_name: formData.customer_name,
      customer_id: formData.customer_id || "114141",
      invoice_date: "08/09/2026",
      truck: formData.truck,
      quantity: parseInt(formData.quantity) || 1,
      subtotal: sub.toFixed(2),
      tax_amount: vat.toFixed(2),
      total_amount: total,
      paid_amount: total,
      status: "Paid",
    };

    setInvoices([newInv, ...invoices]);
    setShowGenerateModal(false);
    addToast(`Tax Invoice ${invNo} generated! Total: AED ${total}`, "success");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title="Invoices" subtitle="Billing & Invoicing" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Action Bar matching Figma 3:1740 */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Home / <span className="text-slate-800 font-semibold">Invoices</span>
          </div>
          <button
            type="button"
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Invoice</span>
          </button>
        </div>

        {/* 4 KPI Cards at Top (Exact Figma 3:1740 values) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#3B82F6] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOTAL INVOICE
              </span>
              <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                188594
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#10B981] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                INVOICE AMOUNT
              </span>
              <div className="text-xl font-extrabold font-mono text-emerald-600 mt-1">
                6357997.57
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F59E0B] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PENDING INVOICE
              </span>
              <div className="text-xl font-extrabold font-mono text-amber-600 mt-1">
                62435
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 border-l-4 border-l-[#F43F5E] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOTAL PENDING
              </span>
              <div className="text-xl font-extrabold font-mono text-rose-600 mt-1">
                332272.83
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>

        {/* Filter Orders / Invoices Panel (Figma 3:1740) */}
        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Filter Orders
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
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
                {Array.from(
                  new Set(invoices.map((i) => i.customer_name))
                ).map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
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
                <option value="56 - ANAS">56 - ANAS</option>
                <option value="38 - NISAR">38 - NISAR</option>
                <option value="47 - HASHIM">47 - HASHIM</option>
                <option value="57 - MUFEED">57 - MUFEED</option>
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
                  new Set(invoices.map((i) => i.truck).filter(Boolean))
                ).map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                onChange={(e) => setEndDate(e.target.value)}
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
                setStartDate("");
                setEndDate("");
                setSearch("");
                addToast("Invoice filters reset", "info");
              }}
              className="px-4 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() =>
                addToast(
                  `Filtered ${filteredInvoices.length} invoices`,
                  "success"
                )
              }
              className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Invoices Table Container matching exact Figma 3:1740 */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          {/* Dark Navy-to-Blue Gradient Banner */}
          <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
            <h3 className="text-sm font-bold tracking-wide">Recent Invoice</h3>
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
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
          </div>

          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                <tr>
                  <th
                    onClick={() => handleSort("invoice_no")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>INVOICE ID</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("customer_name")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>CUSTOMER</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 select-none border-r border-[#7161F0]/60">
                    CUSTOMER ID
                  </th>
                  <th
                    onClick={() => handleSort("invoice_date")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>DATE</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center select-none border-r border-[#7161F0]/60">
                    TRUCK
                  </th>
                  <th className="px-3 py-3 text-center select-none border-r border-[#7161F0]/60">
                    QUANTITY
                  </th>
                  <th
                    onClick={() => handleSort("total_amount")}
                    className="px-4 py-3 text-right cursor-pointer hover:bg-[#4A3AC9] transition-colors select-none border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>TOTAL</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center select-none">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredInvoices.slice(0, entriesPerPage).map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-slate-50/90 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                      {inv.invoice_no}
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-semibold border-r border-slate-200">
                      {inv.customer_name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                      {inv.customer_id}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200 whitespace-nowrap">
                      {inv.invoice_date}
                    </td>
                    <td className="px-3 py-3 text-center font-bold text-slate-800 border-r border-slate-200">
                      {inv.truck}
                    </td>
                    <td className="px-3 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                      {inv.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-extrabold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                      AED {parseFloat(inv.total_amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-3 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingInvoice({ ...inv })}
                          className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(inv)}
                          className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing 1 to {Math.min(entriesPerPage, filteredInvoices.length)}{" "}
              of {filteredInvoices.length} entries (filtered from 188,594 total
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

      {/* Generate Invoice Modal (Figma 3:1741) */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Generate Invoice</h2>
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleGenerateInvoice}
              className="p-5 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Customer *
                  </label>
                  <select
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Rsalan Restaurant Grill">
                      Rsalan Restaurant Grill (114141)
                    </option>
                    <option value="TIANGO">TIANGO (114201)</option>
                    <option value="AHLAM">AHLAM (110964)</option>
                    <option value="SALAM JUMAH">SALAM JUMAH (102187)</option>
                    <option value="Sameer Salim">Sameer Salim (116412)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Truck *
                  </label>
                  <select
                    value={formData.truck}
                    onChange={(e) =>
                      setFormData({ ...formData, truck: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="T6329">T6329</option>
                    <option value="T6328">T6328</option>
                    <option value="T6354">T6354</option>
                    <option value="T6341">T6341</option>
                    <option value="T6352">T6352</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
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
                    required
                    value={formData.unit_price}
                    onChange={(e) =>
                      setFormData({ ...formData, unit_price: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold">
                    AED{" "}
                    {(
                      (parseFloat(formData.quantity) || 1) *
                      (parseFloat(formData.unit_price) || 0)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>UAE VAT (5%):</span>
                  <span className="font-mono font-semibold">
                    AED{" "}
                    {(
                      (parseFloat(formData.quantity) || 1) *
                      (parseFloat(formData.unit_price) || 0) *
                      0.05
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="font-mono text-emerald-600 font-extrabold text-sm">
                    AED{" "}
                    {(
                      (parseFloat(formData.quantity) || 1) *
                      (parseFloat(formData.unit_price) || 0) *
                      1.05
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-xs cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Tax Invoice Modal (Figma 3:1742) */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                Invoice Details - {selectedInvoice.invoice_no}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <span className="text-emerald-700 font-bold text-sm block">
                    القطارة AL QATTARA PURE WATER LLC
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    TRN: 100234567800003 | Al Ain, Abu Dhabi, UAE
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-700 font-bold text-[10px] uppercase">
                    TAX INVOICE
                  </span>
                  <div className="font-mono font-bold text-slate-800 mt-1">
                    {selectedInvoice.invoice_no}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-md border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Customer
                  </span>
                  <span className="text-slate-900 font-bold">
                    {selectedInvoice.customer_name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Customer ID
                  </span>
                  <span className="font-mono font-bold text-slate-700">
                    {selectedInvoice.customer_id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Date
                  </span>
                  <span className="font-mono font-semibold text-slate-800">
                    {selectedInvoice.invoice_date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Truck
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedInvoice.truck}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#5948DB] text-[11px] text-white font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/60">
                        DESCRIPTION
                      </th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/60">
                        QTY
                      </th>
                      <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/60">
                        SUBTOTAL
                      </th>
                      <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/60">
                        VAT (5%)
                      </th>
                      <th className="px-4 py-2.5 text-right">TOTAL (AED)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                        5 Gallon Pure Drinking Water (015)
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold border-r border-slate-200">
                        {selectedInvoice.quantity}
                      </td>
                      <td className="px-4 py-3 text-right font-mono border-r border-slate-200">
                        AED {selectedInvoice.subtotal}
                      </td>
                      <td className="px-4 py-3 text-right font-mono border-r border-slate-200">
                        AED {selectedInvoice.tax_amount}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-700">
                        AED {selectedInvoice.total_amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h3 className="text-sm font-bold">
                Edit Invoice ({editingInvoice.invoice_no})
              </h3>
              <button
                type="button"
                onClick={() => setEditingInvoice(null)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleUpdateInvoice}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={editingInvoice.customer_name}
                  onChange={(e) =>
                    setEditingInvoice({
                      ...editingInvoice,
                      customer_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Truck
                  </label>
                  <input
                    type="text"
                    value={editingInvoice.truck}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        truck: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={editingInvoice.quantity}
                    onChange={(e) =>
                      setEditingInvoice({
                        ...editingInvoice,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Total Amount (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingInvoice.total_amount}
                  onChange={(e) =>
                    setEditingInvoice({
                      ...editingInvoice,
                      total_amount: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingInvoice(null)}
                  className="px-4 py-1.5 rounded bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs cursor-pointer"
                >
                  Save Changes
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
            <h3 className="text-sm font-bold text-slate-900">
              Delete Invoice {deleteTarget.invoice_no}?
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete this invoice for{" "}
              <strong>{deleteTarget.customer_name}</strong>?
            </p>
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
                onClick={confirmDeleteInvoice}
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
