"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Home,
  ArrowUpDown,
  X,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";

const INITIAL_INVOICES = [
  {
    id: 1,
    invoice_no: "IN-T6329/029272",
    customer_name: "khalifa",
    customer_id: "114734",
    salesman_name: "51",
    order_date: "07/09/2026",
    truck: "T6329",
    zone: "MARKHANIA",
    status: "Delivered",
    total_amount: "5.00",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 1, unit_price: 5.0 }],
  },
  {
    id: 2,
    invoice_no: "IN-T6350/032178",
    customer_name: "SAAED RASHED",
    customer_id: "102755",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "MANAZIF",
    status: "Delivered",
    total_amount: "12.60",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 6.3 }],
  },
  {
    id: 3,
    invoice_no: "IN-T6350/032177",
    customer_name: "SABIR",
    customer_id: "114284",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "HILI INDUSTRIAL",
    status: "Delivered",
    total_amount: "10.50",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 5.25 }],
  },
  {
    id: 4,
    invoice_no: "IN-T6356/032584",
    customer_name: "Asmaa Muhammad al-Jilani 118052",
    customer_id: "18623",
    salesman_name: "38 - NISAR",
    order_date: "08/09/2026",
    truck: "T6356",
    zone: "JAHILI",
    status: "Delivered",
    total_amount: "12.60",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 6.3 }],
  },
  {
    id: 5,
    invoice_no: "IN-T6335/033994",
    customer_name: "AL NEBRAS SCHOOL",
    customer_id: "197301",
    salesman_name: "32 - NOOR",
    order_date: "08/09/2026",
    truck: "T6335",
    zone: "KHABISI",
    status: "Delivered",
    total_amount: "123.00",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 20, unit_price: 6.15 }],
  },
  {
    id: 6,
    invoice_no: "IN-T6348/033290",
    customer_name: "AL REEM MEDICAL CENTER",
    customer_id: "110452",
    salesman_name: "53 - SHAFEEQ",
    order_date: "08/09/2026",
    truck: "T6348",
    zone: "ASHAREJ",
    status: "Delivered",
    total_amount: "52.50",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 10, unit_price: 5.25 }],
  },
  {
    id: 7,
    invoice_no: "IN-T6354/031880",
    customer_name: "FATIMA KHALIFA",
    customer_id: "108934",
    salesman_name: "47 - RAHMAN",
    order_date: "08/09/2026",
    truck: "T6354",
    zone: "SAROOJ",
    status: "Delivered",
    total_amount: "21.00",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 4, unit_price: 5.25 }],
  },
  {
    id: 8,
    invoice_no: "IN-T6350/032176",
    customer_name: "SAEED KHALEEL",
    customer_id: "114843",
    salesman_name: "56 - ANAS",
    order_date: "08/09/2026",
    truck: "T6350",
    zone: "HILI INDUSTRIAL",
    status: "Delivered",
    total_amount: "10.50",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 2, unit_price: 5.25 }],
  },
  {
    id: 9,
    invoice_no: "IN-T6684/027411",
    customer_name: "OASIS HOSPITAL",
    customer_id: "100219",
    salesman_name: "48 - JASEEM",
    order_date: "08/09/2026",
    truck: "T6684",
    zone: "MARKHANIA",
    status: "Delivered",
    total_amount: "84.00",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 16, unit_price: 5.25 }],
  },
  {
    id: 10,
    invoice_no: "IN-T6357/025109",
    customer_name: "HAMAD AL ZAABI",
    customer_id: "109412",
    salesman_name: "84 - MUNEEB",
    order_date: "08/09/2026",
    truck: "T6357",
    zone: "ABU DHABI CENTRAL",
    status: "Delivered",
    total_amount: "19.80",
    items: [{ product: "5 gal water", lend_type: "Sold", quantity: 3, unit_price: 6.6 }],
  },
];

export default function InvoicesPage() {
  const { addToast } = useToast();
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [viewMode, setViewMode] = useState("list"); // "list" | "generate"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [viewModalInvoice, setViewModalInvoice] = useState(null);

  const [billingFilter, setBillingFilter] = useState({
    customer_code: "",
    truck_id: "",
    from: "",
    to: "",
  });
  const [nonBilledList, setNonBilledList] = useState([]);

  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return invoices;
    return invoices.filter(
      (inv) =>
        inv.invoice_no.toLowerCase().includes(q) ||
        inv.customer_name.toLowerCase().includes(q) ||
        inv.customer_id.toLowerCase().includes(q) ||
        inv.truck.toLowerCase().includes(q)
    );
  }, [invoices, searchQuery]);

  const handleGetAllNonBilled = () => {
    setNonBilledList([
      {
        id: 101,
        customer_name: "AL NEBRAS SCHOOL",
        customer_id: "197301",
        truck_id: "T6335",
        pending_orders: 2,
        total_amount: "123.00",
      },
      {
        id: 102,
        customer_name: "SAAED RASHED",
        customer_id: "102755",
        truck_id: "T6350",
        pending_orders: 1,
        total_amount: "12.60",
      },
    ]);
    addToast("Loaded non-billed customer orders", "info");
  };

  const handleSelectBill = (bill) => {
    const newInvoice = {
      id: Date.now(),
      invoice_no: `IN-${bill.truck_id}/034${Math.floor(100 + Math.random() * 899)}`,
      customer_name: bill.customer_name,
      customer_id: bill.customer_id,
      salesman_name: "32 - NOOR",
      order_date: "08/09/2026",
      truck: bill.truck_id,
      zone: "MARKHANIA",
      status: "Delivered",
      total_amount: bill.total_amount,
      items: [
        {
          product: "5 gal water",
          lend_type: "Sold",
          quantity: bill.pending_orders,
          unit_price: Number(bill.total_amount) / bill.pending_orders,
        },
      ],
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    addToast(`Generated invoice ${newInvoice.invoice_no}`, "success");
    setViewMode("list");
  };

  const handleDeleteInvoice = (inv) => {
    setInvoices((prev) => prev.filter((x) => x.id !== inv.id));
    addToast(`Invoice ${inv.invoice_no} deleted`, "info");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display',sans-serif]">
      <Header title="Invoice Dashboard" subtitle="Manage Invoices" />

      {/* iOS Hero Header Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-semibold text-base tracking-tight text-[#1C1C1E]">
            {viewMode === "generate" ? "Orders" : "Invoice Dashboard"}
          </span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            / {viewMode === "generate" ? "Create Order" : "Manage Invoices"} / ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <button
            type="button"
            onClick={() => setViewMode("generate")}
            className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-98"
          >
            + Generate Invoice
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold transition cursor-pointer active:scale-98"
          >
            Back to Invoices
          </button>
        )}
      </div>

      <div className="p-6 flex-1 space-y-6">
        {viewMode === "list" ? (
          <>
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">
                    TOTAL INVOICES
                  </div>
                  <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">
                    {filteredInvoices.length}
                  </div>
                  <div className="text-[11px] text-[#34C759] font-medium mt-0.5">Invoices found</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FF9500]/15 text-[#FF9500] flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">DELIVERED</div>
                  <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">
                    {filteredInvoices.length}
                  </div>
                  <div className="text-[11px] text-[#34C759] font-medium mt-0.5">Completed invoices</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#34C759]/15 text-[#34C759] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">PENDING</div>
                  <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
                  <div className="text-[11px] text-[#FF9500] font-medium mt-0.5">Awaiting settlement</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FFCC00]/20 text-[#D4A000] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#8E8E93] uppercase">REVENUE</div>
                  <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 351.50</div>
                  <div className="text-[11px] text-[#5856D6] font-medium mt-0.5">Total billed value</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#5856D6]/15 text-[#5856D6] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Invoices Management Table Card */}
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA]">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Invoices Management
                </h2>
              </div>

              <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="border border-[#3C3C43]/15 rounded-xl px-3 py-1.5 bg-[#F2F2F7] text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
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
                    placeholder="Search invoices..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-[#3C3C43]/15 rounded-full px-3.5 py-1.5 w-52 bg-[#F2F2F7] text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                      {[
                        "INVOICE NO.",
                        "CUSTOMER NAME",
                        "CUSTOMER ID",
                        "SALESMAN NAME",
                        "ORDER DATE",
                        "TRUCK",
                        "STATUS",
                        "TOTAL AMOUNT",
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
                  <tbody className="divide-y divide-[#3C3C43]/10 text-[12px] text-[#1C1C1E]">
                    {filteredInvoices.slice(0, entriesPerPage).map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">
                          {inv.invoice_no}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#1C1C1E]">
                          {inv.customer_name}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{inv.customer_id}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{inv.salesman_name}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{inv.order_date}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{inv.truck}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#34C759]/10 text-[#34C759] text-[11px] font-semibold">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">
                          AED {inv.total_amount}
                        </td>
                        <td className="py-3.5 pl-4 pr-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewModalInvoice(inv)}
                              className="px-3 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteInvoice(inv)}
                              className="px-3 py-1 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] text-[11px] font-semibold cursor-pointer active:scale-95 transition"
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

              <div className="px-6 py-4 border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div>
                  Showing 1 to {Math.min(entriesPerPage, filteredInvoices.length)} of{" "}
                  {filteredInvoices.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-full bg-[#007AFF] text-white text-xs font-semibold flex items-center justify-center shadow-xs">
                    1
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* GENERATE INVOICE SUB-VIEW (generate-invoices.png) */
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA]">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Billing Information</h2>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Customer Code
                    </label>
                    <input
                      type="text"
                      placeholder="Search customer code..."
                      value={billingFilter.customer_code}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, customer_code: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Truck ID
                    </label>
                    <input
                      type="text"
                      placeholder="Search truck..."
                      value={billingFilter.truck_id}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, truck_id: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={billingFilter.from}
                      onChange={(e) => setBillingFilter({ ...billingFilter, from: e.target.value })}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={billingFilter.to}
                      onChange={(e) => setBillingFilter({ ...billingFilter, to: e.target.value })}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleGetAllNonBilled}
                    className="px-5 py-2.5 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-98 transition"
                  >
                    GET ALL NON BILLED
                  </button>
                </div>
              </div>

              {/* Bills Table */}
              <div>
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-3">Bills</h3>
                <div className="px-4 py-3 bg-[#F2F2F7]/60 border border-[#3C3C43]/10 rounded-t-2xl flex items-center justify-between text-xs text-[#8E8E93]">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="border border-[#3C3C43]/15 rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E]">
                      <option>10</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <input
                      type="text"
                      className="border border-[#3C3C43]/15 rounded-full px-3 py-1 w-44 bg-white text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto border-x border-b border-[#3C3C43]/10 rounded-b-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[11px] font-bold text-[#007AFF] uppercase tracking-wider">
                        {[
                          "CUSTOMER NAME",
                          "CUSTOMER ID",
                          "TRUCK ID",
                          "PENDING ORDERS",
                          "TOTAL AMOUNT",
                          "VIEW DETAILS",
                          "SELECT BILL",
                        ].map((c) => (
                          <th key={c} className="py-3 px-4">
                            <div className="flex items-center justify-between">
                              <span>{c}</span>
                              <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                      {nonBilledList.map((bill) => (
                        <tr key={bill.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                          <td className="py-3 px-4 font-semibold">{bill.customer_name}</td>
                          <td className="py-3 px-4 text-[#8E8E93]">{bill.customer_id}</td>
                          <td className="py-3 px-4 text-[#8E8E93]">{bill.truck_id}</td>
                          <td className="py-3 px-4">{bill.pending_orders}</td>
                          <td className="py-3 px-4 font-bold">AED {bill.total_amount}</td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() =>
                                addToast(
                                  `${bill.pending_orders} non-billed orders for ${bill.customer_name}`,
                                  "info"
                                )
                              }
                              className="px-3 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleSelectBill(bill)}
                              className="px-3.5 py-1 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              Generate
                            </button>
                          </td>
                        </tr>
                      ))}
                      {nonBilledList.length === 0 && (
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
          </div>
        )}
      </div>

      {/* VIEW INVOICE DETAILS MODAL (view invoice.png) */}
      {viewModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1C1C1E]">
                Order Details - {viewModalInvoice.invoice_no}
              </h3>
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1C1C1E]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F2F2F7]/50 p-4 rounded-2xl">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Customer Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Name:</span> {viewModalInvoice.customer_name}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Customer Code:</span> {viewModalInvoice.customer_id}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Zone:</span> {viewModalInvoice.zone || "MARKHANIA"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Salesman:</span> {viewModalInvoice.salesman_name}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Order Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Invoice ID:</span> {viewModalInvoice.invoice_no}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Truck ID:</span> {viewModalInvoice.truck}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Date:</span> {viewModalInvoice.order_date}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Status:</span>{" "}
                    <span className="px-2.5 py-0.5 rounded-full bg-[#34C759]/15 text-[#34C759] text-[10.5px] font-semibold">
                      DELIVERED
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Order Items</div>
                <div className="border border-[#3C3C43]/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#007AFF]/10 border-y border-[#007AFF]/20 text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">
                        <th className="py-2.5 px-3">PRODUCT</th>
                        <th className="py-2.5 px-3">LEND TYPE</th>
                        <th className="py-2.5 px-3">QUANTITY</th>
                        <th className="py-2.5 px-3">UNIT PRICE</th>
                        <th className="py-2.5 px-3">TOTAL</th>
                      </tr>
                    </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10">
                    {(viewModalInvoice.items || []).map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-medium">{it.product}</td>
                        <td className="py-2.5 px-3 text-[#8E8E93]">{it.lend_type}</td>
                        <td className="py-2.5 px-3">{it.quantity}</td>
                        <td className="py-2.5 px-3">AED {Number(it.unit_price).toFixed(2)}</td>
                        <td className="py-2.5 px-3 font-semibold">
                          AED {(Number(it.quantity) * Number(it.unit_price)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="py-2.5 px-3 text-right font-semibold text-[#8E8E93]">
                        Subtotal
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#1C1C1E]">AED {viewModalInvoice.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#1C1C1E] mb-1 text-xs">Delivery Notes</div>
                <div className="text-[#8E8E93]">No special instructions</div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#3C3C43]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
                className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
