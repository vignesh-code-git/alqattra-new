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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Invoice Dashboard" subtitle="Manage Invoices" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">
            {viewMode === "generate" ? "Orders" : "Invoice Dashboard"}
          </span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "generate" ? "Create Order" : "Manage Invoices"} - ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <button
            type="button"
            onClick={() => setViewMode("generate")}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            + Generate Invoice
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
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
              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">
                    TOTAL INVOICES
                  </div>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    {filteredInvoices.length}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-0.5">Invoices found</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E05D38] text-white flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">DELIVERED</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    {filteredInvoices.length}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-0.5">Completed invoices</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#48BB78] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">PENDING</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                  <div className="text-[11px] text-amber-500 mt-0.5">Awaiting settlement</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ECC94B] text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase">REVENUE</div>
                  <div className="text-xl font-bold text-slate-800 mt-1">AED 351.50</div>
                  <div className="text-[11px] text-indigo-500 mt-0.5">Total billed value</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#5948DB] text-white flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Invoices Management Table Card (invoices.png) */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">
                  Invoices Management
                </h2>
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
                            <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                    {filteredInvoices.slice(0, entriesPerPage).map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">
                          {inv.invoice_no}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {inv.customer_name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.customer_id}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.salesman_name}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.order_date}</td>
                        <td className="py-3.5 px-4 text-slate-600">{inv.truck}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10.5px] font-semibold">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          AED {inv.total_amount}
                        </td>
                        <td className="py-3.5 pl-4 pr-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewModalInvoice(inv)}
                              className="px-3 py-1 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-[11px] font-semibold cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteInvoice(inv)}
                              className="px-3 py-1 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-[11px] font-semibold cursor-pointer"
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
                  Showing 1 to {Math.min(entriesPerPage, filteredInvoices.length)} of{" "}
                  {filteredInvoices.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded-full bg-[#5948DB] text-white text-[11px] font-semibold flex items-center justify-center">
                    1
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* GENERATE INVOICE SUB-VIEW (generate-invoices.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Billing Information</h2>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer Code
                    </label>
                    <input
                      type="text"
                      placeholder="Search customer code..."
                      value={billingFilter.customer_code}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, customer_code: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Truck ID
                    </label>
                    <input
                      type="text"
                      placeholder="Search truck..."
                      value={billingFilter.truck_id}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, truck_id: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      From
                    </label>
                    <input
                      type="date"
                      value={billingFilter.from}
                      onChange={(e) => setBillingFilter({ ...billingFilter, from: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      To
                    </label>
                    <input
                      type="date"
                      value={billingFilter.to}
                      onChange={(e) => setBillingFilter({ ...billingFilter, to: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleGetAllNonBilled}
                    className="px-4 py-2 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    GET ALL NON BILLED
                  </button>
                </div>
              </div>

              {/* Bills Table */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-3">Bills</h3>
                <div className="px-4 py-3 border border-slate-200 rounded-t flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="border border-slate-300 rounded px-2 py-1 bg-white">
                      <option>10</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <input
                      type="text"
                      className="border border-slate-300 rounded px-2 py-1 w-40"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto border-x border-b border-slate-200 rounded-b">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                              <ArrowUpDown className="w-3 h-3 text-slate-400" />
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                      {nonBilledList.map((bill) => (
                        <tr key={bill.id}>
                          <td className="py-3 px-4 font-medium">{bill.customer_name}</td>
                          <td className="py-3 px-4">{bill.customer_id}</td>
                          <td className="py-3 px-4">{bill.truck_id}</td>
                          <td className="py-3 px-4">{bill.pending_orders}</td>
                          <td className="py-3 px-4 font-semibold">AED {bill.total_amount}</td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() =>
                                addToast(
                                  `${bill.pending_orders} non-billed orders for ${bill.customer_name}`,
                                  "info"
                                )
                              }
                              className="px-2.5 py-1 rounded bg-[#4A90E2] text-white text-[11px] font-semibold"
                            >
                              View
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleSelectBill(bill)}
                              className="px-2.5 py-1 rounded bg-[#48BB78] text-white text-[11px] font-semibold cursor-pointer"
                            >
                              Generate
                            </button>
                          </td>
                        </tr>
                      ))}
                      {nonBilledList.length === 0 && (
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
          </div>
        )}
      </div>

      {/* VIEW INVOICE DETAILS MODAL (view invoice.png) */}
      {viewModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Order Details - {viewModalInvoice.invoice_no}
              </h3>
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
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
                    <span className="font-bold">Name:</span> {viewModalInvoice.customer_name}
                  </div>
                  <div>
                    <span className="font-bold">Customer Code:</span> {viewModalInvoice.customer_id}
                  </div>
                  <div>
                    <span className="font-bold">Zone:</span> {viewModalInvoice.zone || "MARKHANIA"}
                  </div>
                  <div>
                    <span className="font-bold">Salesman:</span> {viewModalInvoice.salesman_name}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 mb-2">Order Information</div>
                  <div>
                    <span className="font-bold">Invoice ID:</span> {viewModalInvoice.invoice_no}
                  </div>
                  <div>
                    <span className="font-bold">Truck ID:</span> {viewModalInvoice.truck}
                  </div>
                  <div>
                    <span className="font-bold">Date:</span> {viewModalInvoice.order_date}
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
                    {(viewModalInvoice.items || []).map((it, idx) => (
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
                      <td className="py-2 px-3 font-bold">AED {viewModalInvoice.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Delivery Notes</div>
                <div className="text-slate-500">No special instructions</div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
