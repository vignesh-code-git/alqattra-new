"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown, Download } from "lucide-react";

const SALESMAN_REPORT_ROWS = [
  {
    id: 1,
    salesman: "56 - ANAS",
    route: "6350",
    orders: 42,
    cash: "420.00",
    card: "84.00",
    wallet: "105.00",
    credit: "47.40",
    total: "656.40",
    collected: "551.40",
    pending: "105.00",
  },
  {
    id: 2,
    salesman: "38 - NISAR",
    route: "6356",
    orders: 38,
    cash: "395.35",
    card: "80.00",
    wallet: "60.00",
    credit: "0.00",
    total: "535.35",
    collected: "475.35",
    pending: "60.00",
  },
  {
    id: 3,
    salesman: "32 - NOOR",
    route: "6335",
    orders: 55,
    cash: "890.00",
    card: "340.00",
    wallet: "150.00",
    credit: "120.00",
    total: "1500.00",
    collected: "1230.00",
    pending: "270.00",
  },
  {
    id: 4,
    salesman: "47 - RAHMAN",
    route: "6354",
    orders: 49,
    cash: "710.50",
    card: "180.00",
    wallet: "95.00",
    credit: "45.00",
    total: "1030.50",
    collected: "890.50",
    pending: "140.00",
  },
  {
    id: 5,
    salesman: "53 - SHAFEEQ",
    route: "6348",
    orders: 34,
    cash: "540.00",
    card: "100.00",
    wallet: "80.00",
    credit: "0.00",
    total: "720.00",
    collected: "640.00",
    pending: "80.00",
  },
];

const CUSTOMER_REPORT_ROWS = [
  {
    id: "16171",
    name: "Falafel Bairooth Restaurant 116507",
    recent_delivery: "08/09/2026",
    total_orders: 18,
    order_revenue: "AED 450.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 25.00",
  },
  {
    id: "16172",
    name: "Al Raha Grocery 116508",
    recent_delivery: "08/09/2026",
    total_orders: 24,
    order_revenue: "AED 612.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16175",
    name: "Abdullah Al Kaabi 116511",
    recent_delivery: "07/09/2026",
    total_orders: 12,
    order_revenue: "AED 126.00",
    security_deposit: "AED 60.00",
    wallet_recharge: "AED 100.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16180",
    name: "Al Jazeera Workshop 116516",
    recent_delivery: "07/09/2026",
    total_orders: 31,
    order_revenue: "AED 775.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 75.00",
  },
  {
    id: "16183",
    name: "Mohammed Saeed 116519",
    recent_delivery: "06/09/2026",
    total_orders: 9,
    order_revenue: "AED 94.50",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 50.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16185",
    name: "Noor Al Ain Salon 116521",
    recent_delivery: "06/09/2026",
    total_orders: 15,
    order_revenue: "AED 157.50",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16189",
    name: "Rashid Al Ketbi 116526",
    recent_delivery: "05/09/2026",
    total_orders: 20,
    order_revenue: "AED 210.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 100.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16192",
    name: "Al Baraka Bakery 116529",
    recent_delivery: "05/09/2026",
    total_orders: 40,
    order_revenue: "AED 1050.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 120.00",
  },
  {
    id: "16195",
    name: "Sultan Al Shamsi 116532",
    recent_delivery: "04/09/2026",
    total_orders: 11,
    order_revenue: "AED 115.50",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 0.00",
  },
  {
    id: "16199",
    name: "Haroon Mahmood 116536",
    recent_delivery: "04/09/2026",
    total_orders: 14,
    order_revenue: "AED 147.00",
    security_deposit: "AED 0.00",
    wallet_recharge: "AED 0.00",
    pending_payment: "AED 0.00",
  },
];

const TRUCK_REPORT_ROWS = [
  {
    truck_id: "T6329",
    salesman: "40",
    route: "6329",
    date: "08/09/2026",
    loaded: 210,
    delivered: 185,
    returned: 25,
    messages: 185,
  },
  {
    truck_id: "T6684",
    salesman: "48",
    route: "6684",
    date: "08/09/2026",
    loaded: 195,
    delivered: 170,
    returned: 25,
    messages: 170,
  },
  {
    truck_id: "T6335",
    salesman: "32",
    route: "6335",
    date: "08/09/2026",
    loaded: 192,
    delivered: 192,
    returned: 0,
    messages: 192,
  },
  {
    truck_id: "T6357",
    salesman: "84",
    route: "6357",
    date: "08/09/2026",
    loaded: 180,
    delivered: 165,
    returned: 15,
    messages: 165,
  },
  {
    truck_id: "T6347",
    salesman: "47",
    route: "6347",
    date: "08/09/2026",
    loaded: 220,
    delivered: 205,
    returned: 15,
    messages: 205,
  },
  {
    truck_id: "100001",
    salesman: "factory",
    route: "100001",
    date: "08/09/2026",
    loaded: 300,
    delivered: 280,
    returned: 20,
    messages: 280,
  },
  {
    truck_id: "100002",
    salesman: "110",
    route: "1234",
    date: "08/09/2026",
    loaded: 160,
    delivered: 150,
    returned: 10,
    messages: 150,
  },
  {
    truck_id: "T6358",
    salesman: "55",
    route: "6358",
    date: "08/09/2026",
    loaded: 205,
    delivered: 190,
    returned: 15,
    messages: 190,
  },
  {
    truck_id: "T6348",
    salesman: "53",
    route: "6348",
    date: "08/09/2026",
    loaded: 175,
    delivered: 160,
    returned: 15,
    messages: 160,
  },
  {
    truck_id: "T6346",
    salesman: "56",
    route: "6346",
    date: "08/09/2026",
    loaded: 190,
    delivered: 180,
    returned: 10,
    messages: 180,
  },
];

const COMMISSION_REPORT_ROWS = [
  {
    salesman: "AMJATH",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "0",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "SHIBIL",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "0",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "MALAKA",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "8445.31",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "SAGAR",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "6517.77",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "RAYAN",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "6437.22",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "SAMUEL",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "6218.05",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "HABTAMU",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "10270.51",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "ARSLAN",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "8319.15",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "NURANOWAR",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "0",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
  {
    salesman: "SHAHIL",
    city: "AL_AIN",
    schemes: "5gal",
    total_sales: "0",
    fixed_comm: "0",
    pct_comm: "0",
    total_comm: "0",
  },
];

export default function ReportsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("salesman"); // "salesman" | "customer" | "truck" | "commission"

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Reports" subtitle="Analytics & Reports" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Reports</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            -{" "}
            {activeTab === "salesman"
              ? "Salesman Collection"
              : activeTab === "customer"
              ? "Customer Report"
              : activeTab === "truck"
              ? "Truck Report"
              : "Commission Report"}{" "}
            - ALL
          </span>
        </div>
      </div>

      {/* 4 Report Sub-tabs */}
      <div className="px-6 pt-5 pb-1 flex flex-wrap items-center gap-2">
        {[
          { id: "salesman", label: "Salesman Collection" },
          { id: "customer", label: "Customer Report" },
          { id: "truck", label: "Truck Report" },
          { id: "commission", label: "Commission Report" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
              activeTab === t.id
                ? "bg-white text-slate-800 shadow-xs border border-slate-200"
                : "bg-slate-200/70 text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* TAB 1: SALESMAN COLLECTION REPORT (reposrts-salesman.png) */}
        {activeTab === "salesman" && (
          <>
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Salesman
                  </label>
                  <select className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white">
                    <option value="">All Salesmen</option>
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="32 - NOOR">32 - NOOR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Route
                  </label>
                  <select className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white">
                    <option value="">All Routes</option>
                    <option value="6350">6350</option>
                    <option value="6335">6335</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-4 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-bold text-base tracking-wide">
                  Salesman Collection Report
                </h2>
                <button
                  type="button"
                  onClick={() => addToast("Exported Salesman Report CSV", "success")}
                  className="px-3.5 py-1.5 rounded bg-[#48BB78] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      {[
                        "SALESMAN",
                        "ROUTE",
                        "TOTAL ORDERS",
                        "CASH SALES",
                        "CARD SALES",
                        "WALLET SALES",
                        "CREDIT SALES",
                        "TOTAL REVENUE",
                        "COLLECTED",
                        "PENDING",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    {SALESMAN_REPORT_ROWS.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 pl-6 pr-4 font-medium">{r.salesman}</td>
                        <td className="py-3.5 px-4">{r.route}</td>
                        <td className="py-3.5 px-4">{r.orders}</td>
                        <td className="py-3.5 px-4">AED {r.cash}</td>
                        <td className="py-3.5 px-4">AED {r.card}</td>
                        <td className="py-3.5 px-4">AED {r.wallet}</td>
                        <td className="py-3.5 px-4">AED {r.credit}</td>
                        <td className="py-3.5 px-4 font-semibold">AED {r.total}</td>
                        <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                          AED {r.collected}
                        </td>
                        <td className="py-3.5 pl-4 pr-6 text-rose-600 font-semibold">
                          AED {r.pending}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: CUSTOMER REPORT (customer report.png) */}
        {activeTab === "customer" && (
          <>
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    FROM DATE
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    TO DATE
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    SALESMAN ID
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    ROUTE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Route"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    TRUCK
                  </label>
                  <input
                    type="text"
                    placeholder="Select Truck"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    ZONE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Zone"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    PRODUCTS
                  </label>
                  <input
                    type="text"
                    placeholder="Select Products"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold">
                  Apply
                </button>
                <button className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold">
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-bold text-base tracking-wide">Customer Report</h2>
                <button
                  type="button"
                  onClick={() => addToast("Exported Customer Report", "success")}
                  className="px-3.5 py-1.5 rounded bg-[#48BB78] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      {[
                        "ID",
                        "NAME",
                        "RECENT DELIVERY",
                        "TOTAL ORDERS",
                        "ORDER REVENUE",
                        "SECURITY DEPOSIT",
                        "WALLET RECHARGE",
                        "PENDING PAYMENT",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    {CUSTOMER_REPORT_ROWS.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 pl-6 pr-4 font-medium">{r.id}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{r.name}</td>
                        <td className="py-3.5 px-4">{r.recent_delivery}</td>
                        <td className="py-3.5 px-4">{r.total_orders}</td>
                        <td className="py-3.5 px-4">{r.order_revenue}</td>
                        <td className="py-3.5 px-4">{r.security_deposit}</td>
                        <td className="py-3.5 px-4">{r.wallet_recharge}</td>
                        <td className="py-3.5 pl-4 pr-6">{r.pending_payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 3: TRUCK REPORT (truck reposrt.png) */}
        {activeTab === "truck" && (
          <>
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Salesman ID
                  </label>
                  <input
                    type="text"
                    placeholder="Salesman ID"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Route
                  </label>
                  <input
                    type="text"
                    placeholder="Route"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Select Products to Report On
                  </label>
                  <input
                    type="text"
                    placeholder="All Products"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold">
                  Apply
                </button>
                <button className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold">
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">Truck Report</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      {[
                        "TRUCK ID",
                        "SALESMAN",
                        "ROUTE",
                        "DATE",
                        "TOTAL LOADED",
                        "TOTAL DELIVERED",
                        "TOTAL RETURNED",
                        "MESSAGES SENT",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    {TRUCK_REPORT_ROWS.map((r) => (
                      <tr key={r.truck_id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 pl-6 pr-4 font-medium">{r.truck_id}</td>
                        <td className="py-3.5 px-4">{r.salesman}</td>
                        <td className="py-3.5 px-4">{r.route}</td>
                        <td className="py-3.5 px-4">{r.date}</td>
                        <td className="py-3.5 px-4">{r.loaded}</td>
                        <td className="py-3.5 px-4">{r.delivered}</td>
                        <td className="py-3.5 px-4">{r.returned}</td>
                        <td className="py-3.5 pl-4 pr-6">{r.messages}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: COMMISSION REPORT (commission repo.png) */}
        {activeTab === "commission" && (
          <>
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input type="date" className="w-full border border-slate-200 rounded px-2.5 py-1.5" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Salesman
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold">
                  Apply
                </button>
                <button className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold">
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                <h2 className="text-white font-bold text-base tracking-wide">
                  Commission Report
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      {[
                        "SALESMAN",
                        "CITY",
                        "COMMISSION SCHEMES",
                        "TOTAL SALES",
                        "FIXED COMMISSION",
                        "PERCENTAGE COMMISSION",
                        "TOTAL COMMISSION",
                        "DETAILS",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    {COMMISSION_REPORT_ROWS.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">
                          {r.salesman}
                        </td>
                        <td className="py-3.5 px-4">{r.city}</td>
                        <td className="py-3.5 px-4">{r.schemes}</td>
                        <td className="py-3.5 px-4">{r.total_sales}</td>
                        <td className="py-3.5 px-4">{r.fixed_comm}</td>
                        <td className="py-3.5 px-4">{r.pct_comm}</td>
                        <td className="py-3.5 px-4">{r.total_comm}</td>
                        <td className="py-3.5 pl-4 pr-6 text-slate-400">-</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold text-slate-800">
                      <td colSpan={3} className="py-3.5 pl-6 pr-4">
                        Total:
                      </td>
                      <td className="py-3.5 px-4">181059.66</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 pl-4 pr-6" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
