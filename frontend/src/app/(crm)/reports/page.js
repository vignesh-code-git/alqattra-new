"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { ArrowUpDown, Download } from "lucide-react";

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
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans pb-12">
      <Header title="Reports" subtitle="Analytics & Reports" />

      {/* iOS Translucent Glass Top Hero Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 transition-all">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-semibold text-base text-[#1C1C1E] tracking-tight">Reports</span>
          <span className="text-[#8E8E93] text-xs">/</span>
          <span className="text-[#8E8E93] text-xs font-medium">
            {activeTab === "salesman"
              ? "Salesman Collection"
              : activeTab === "customer"
              ? "Customer Report"
              : activeTab === "truck"
              ? "Truck Report"
              : "Commission Report"}{" "}
            • ALL
          </span>
        </div>
      </div>

      {/* iOS Segmented Sub-tabs */}
      <div className="px-6 pt-5 pb-1 flex">
        <div className="bg-[#E5E5EA]/80 p-1 rounded-full border border-[#3C3C43]/5 inline-flex gap-1 backdrop-blur-md">
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
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === t.id
                  ? "bg-white text-[#1C1C1E] shadow-sm"
                  : "text-[#8E8E93] hover:text-[#1C1C1E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* TAB 1: SALESMAN COLLECTION REPORT (reposrts-salesman.png) */}
        {activeTab === "salesman" && (
          <>
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Salesman
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All Salesmen</option>
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="32 - NOOR">32 - NOOR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Route
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All Routes</option>
                    <option value="6350">6350</option>
                    <option value="6335">6335</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Salesman Collection Report
                </h2>
                <button
                  type="button"
                  onClick={() => addToast("Exported Salesman Report CSV", "success")}
                  className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
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
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {SALESMAN_REPORT_ROWS.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">{r.salesman}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{r.route}</td>
                        <td className="py-3.5 px-4 font-medium">{r.orders}</td>
                        <td className="py-3.5 px-4">AED {r.cash}</td>
                        <td className="py-3.5 px-4">AED {r.card}</td>
                        <td className="py-3.5 px-4">AED {r.wallet}</td>
                        <td className="py-3.5 px-4">AED {r.credit}</td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">AED {r.total}</td>
                        <td className="py-3.5 px-4 text-[#34C759] font-bold">
                          AED {r.collected}
                        </td>
                        <td className="py-3.5 pl-4 pr-6 text-[#FF3B30] font-bold">
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
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    FROM DATE
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    TO DATE
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    SALESMAN ID
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    ROUTE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Route"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    TRUCK
                  </label>
                  <input
                    type="text"
                    placeholder="Select Truck"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    ZONE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Zone"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    PRODUCTS
                  </label>
                  <input
                    type="text"
                    placeholder="Select Products"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Customer Report</h2>
                <button
                  type="button"
                  onClick={() => addToast("Exported Customer Report", "success")}
                  className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
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
                            <ArrowUpDown className="w-3 h-3 text-white/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {CUSTOMER_REPORT_ROWS.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{r.id}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#1C1C1E]">{r.name}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.recent_delivery}</td>
                        <td className="py-3.5 px-4 font-medium">{r.total_orders}</td>
                        <td className="py-3.5 px-4 font-medium">{r.order_revenue}</td>
                        <td className="py-3.5 px-4">{r.security_deposit}</td>
                        <td className="py-3.5 px-4 text-[#007AFF] font-medium">{r.wallet_recharge}</td>
                        <td className="py-3.5 pl-4 pr-6 text-[#FF3B30] font-semibold">{r.pending_payment}</td>
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
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Salesman ID
                  </label>
                  <input
                    type="text"
                    placeholder="Salesman ID"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Route
                  </label>
                  <input
                    type="text"
                    placeholder="Route"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Select Products
                  </label>
                  <input
                    type="text"
                    placeholder="All Products"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Truck Report</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
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
                            <ArrowUpDown className="w-3 h-3 text-white/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {TRUCK_REPORT_ROWS.map((r) => (
                      <tr key={r.truck_id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{r.truck_id}</td>
                        <td className="py-3.5 px-4 font-semibold">{r.salesman}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{r.route}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.date}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#007AFF]">{r.loaded}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#34C759]">{r.delivered}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#FF9500]">{r.returned}</td>
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
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Salesman
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Commission Report
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
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
                            <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {COMMISSION_REPORT_ROWS.map((r, i) => (
                      <tr key={i} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">
                          {r.salesman}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.city}</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E5E5EA] text-[#1C1C1E]">
                            {r.schemes}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{r.total_sales}</td>
                        <td className="py-3.5 px-4">{r.fixed_comm}</td>
                        <td className="py-3.5 px-4">{r.pct_comm}</td>
                        <td className="py-3.5 px-4 font-bold text-[#007AFF]">{r.total_comm}</td>
                        <td className="py-3.5 pl-4 pr-6 text-[#8E8E93]">-</td>
                      </tr>
                    ))}
                    <tr className="bg-[#F2F2F7]/70 font-bold text-[#1C1C1E]">
                      <td colSpan={3} className="py-3.5 pl-6 pr-4">
                        Total:
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">181,059.66</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4 text-[#007AFF]">0.00</td>
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
