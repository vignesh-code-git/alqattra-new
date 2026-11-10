"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Download,
  Printer,
  Coins,
  Truck,
  Users,
  Award,
  ArrowUpDown,
} from "lucide-react";

export default function ReportsPage() {
  const { addToast } = useToast();
  // Exact 4 Figma sub-tabs: salesman (3:1781) | customer (3:1782) | truck (3:1783) | commission (3:1784)
  const [activeTab, setActiveTab] = useState("salesman");
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 1. Exact 10 Figma Rows for Salesman Report (3:1781 - steps/1167/media_0.png)
  const salesmanData = [
    {
      id: "33",
      salesman_name: "AAMIR SUBAIR",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "32",
      salesman_name: "ABDULLAHNOOR",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "53",
      salesman_name: "ALI ABDELAL",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "109",
      salesman_name: "ALTHAF",
      security_deposit: "0",
      order_collection: "88.2",
      wallet_recharge: "52.5",
      credit_collection: "0",
      total_collection: "140.7",
    },
    {
      id: "100",
      salesman_name: "AMJATH",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "56",
      salesman_name: "ANAS",
      security_deposit: "0",
      order_collection: "145.95",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "145.95",
    },
    {
      id: "77",
      salesman_name: "ANFAS",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "23",
      salesman_name: "ARSLAN",
      security_deposit: "0",
      order_collection: "359.35",
      wallet_recharge: "105",
      credit_collection: "21",
      total_collection: "485.35",
    },
    {
      id: "Alremeithi",
      salesman_name: "Alremeithi",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
    {
      id: "86",
      salesman_name: "ESSAM",
      security_deposit: "0",
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
    },
  ];

  // 2. Customer Report Data (Figma 3:1782)
  const customerData = [
    {
      id: "197301",
      customer_name: "AL NEBRAS SCHOOL",
      city: "ABU_DHABI",
      route: "Rt-AbuDhabi-01",
      salesman: "NISAR (38)",
      bottles_delivered: 450,
      empty_returned: 440,
      wallet_balance: "1250.00",
      credit_due: "0.00",
      total_revenue: "2250.00",
    },
    {
      id: "197300",
      customer_name: "Ameen",
      city: "ABU_DHABI",
      route: "Rt-AbuDhabi-02",
      salesman: "ANAS (56)",
      bottles_delivered: 120,
      empty_returned: 118,
      wallet_balance: "340.00",
      credit_due: "148.20",
      total_revenue: "630.00",
    },
    {
      id: "197299",
      customer_name: "SUHAIL ALI",
      city: "AL_AIN",
      route: "Rt-AlAin-01",
      salesman: "HASHIM (47)",
      bottles_delivered: 820,
      empty_returned: 800,
      wallet_balance: "0.00",
      credit_due: "620.00",
      total_revenue: "4100.00",
    },
    {
      id: "197298",
      customer_name: "MOHAMMED SALEM",
      city: "AL_AIN",
      route: "Rt-AlAin-03",
      salesman: "MUFEED (57)",
      bottles_delivered: 95,
      empty_returned: 95,
      wallet_balance: "210.00",
      credit_due: "0.00",
      total_revenue: "498.75",
    },
    {
      id: "197297",
      customer_name: "Soria",
      city: "AL_AIN",
      route: "Rt-AlAin-04",
      salesman: "ARSLAN (23)",
      bottles_delivered: 310,
      empty_returned: 305,
      wallet_balance: "50.00",
      credit_due: "0.00",
      total_revenue: "1627.50",
    },
  ];

  // 3. Truck Report Data (Figma 3:1783)
  const truckData = [
    {
      id: "T6335",
      in_charge: "32 - ABDULLAHNOOR",
      route: "6335",
      morning_load: 155,
      delivered: 155,
      empty_returned: 155,
      damaged: 0,
      closing_stock: 0,
    },
    {
      id: "T6338",
      in_charge: "120 - ANAS",
      route: "6338",
      morning_load: 310,
      delivered: 295,
      empty_returned: 290,
      damaged: 0,
      closing_stock: 15,
    },
    {
      id: "T6347",
      in_charge: "90 - HASHIM",
      route: "6347",
      morning_load: 265,
      delivered: 250,
      empty_returned: 248,
      damaged: 0,
      closing_stock: 15,
    },
    {
      id: "T6341",
      in_charge: "47 - HASHIM",
      route: "6341",
      morning_load: 100,
      delivered: 100,
      empty_returned: 100,
      damaged: 0,
      closing_stock: 0,
    },
    {
      id: "T8066",
      in_charge: "113 - NISAR",
      route: "8066",
      morning_load: 147,
      delivered: 147,
      empty_returned: 147,
      damaged: 0,
      closing_stock: 0,
    },
  ];

  // 4. Commission Report Data (Figma 3:1784)
  const commissionData = [
    {
      id: "23",
      salesman_name: "ARSLAN",
      truck_id: "T6343",
      bottles_sold: 3750,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1312.50",
      target_bonus: "250.00",
      total_payout: "1562.50",
    },
    {
      id: "56",
      salesman_name: "ANAS",
      truck_id: "T6350",
      bottles_sold: 3420,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1197.00",
      target_bonus: "200.00",
      total_payout: "1397.00",
    },
    {
      id: "109",
      salesman_name: "ALTHAF",
      truck_id: "T6347",
      bottles_sold: 2980,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1043.00",
      target_bonus: "150.00",
      total_payout: "1193.00",
    },
    {
      id: "47",
      salesman_name: "HASHIM",
      truck_id: "T6354",
      bottles_sold: 2840,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "994.00",
      target_bonus: "100.00",
      total_payout: "1094.00",
    },
  ];

  const handleExportCSV = () => {
    addToast(`Exported ${activeTab} report to CSV successfully!`, "success");
  };

  const filteredSalesman = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return salesmanData;
    return salesmanData.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.salesman_name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title="Reports" subtitle="Operational & Collection Reports" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Exact Figma "Filter By" Panel (3:1781 - steps/1167/media_0.png) */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Filter By
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-800"
              />
            </div>
            <div>
              <label className="text-slate-600 font-semibold block mb-1">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-800"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setFromDate("");
                setToDate("");
                setSearch("");
                addToast("Report filters reset", "info");
              }}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-md transition-all cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => addToast("Applied report date filter", "success")}
              className="px-5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-md shadow-2xs transition-all cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Exact 4 Figma Report Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: "salesman", label: "Salesman Report", icon: Coins },
            { id: "customer", label: "Customer Report", icon: Users },
            { id: "truck", label: "Truck Report", icon: Truck },
            { id: "commission", label: "Commission Report", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold border transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
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

        {/* Report Table Container matching exact Figma 3:1781 */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          {/* Dark Navy-to-Blue Gradient Banner */}
          <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
            <h3 className="text-sm font-bold tracking-wide">
              {activeTab === "salesman"
                ? "Salesman Report"
                : activeTab === "customer"
                ? "Customer Report"
                : activeTab === "truck"
                ? "Truck Report"
                : "Commission Report"}
            </h3>
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
                placeholder="Search report..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
          </div>

          {activeTab === "salesman" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>ID</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      <div className="flex items-center justify-between">
                        <span>SALESMAN NAME</span>
                        <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      SECURITY DEPOSIT
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      ORDER COLLECTION
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      WALLET RECHARGE
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      CREDIT COLLECTION
                    </th>
                    <th className="px-4 py-3 text-center">TOTAL COLLECTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredSalesman.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/90">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 border-r border-slate-200">
                        {row.salesman_name}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        AED {row.security_deposit}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        AED {row.order_collection}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        AED {row.wallet_recharge}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        AED {row.credit_collection}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-900">
                        AED {row.total_collection}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "customer" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      CUSTOMER ID
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      CUSTOMER NAME
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      CITY / ROUTE
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      SALESMAN
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      BOTTLES DELIVERED
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      EMPTY RETURNED
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/60">
                      WALLET BALANCE
                    </th>
                    <th className="px-4 py-3 text-right">TOTAL REVENUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {customerData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/90">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                        {row.customer_name}
                      </td>
                      <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                        {row.city} • {row.route}
                      </td>
                      <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                        {row.salesman}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                        {row.bottles_delivered}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        {row.empty_returned}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-700 border-r border-slate-200">
                        AED {row.wallet_balance}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                        AED {row.total_revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "truck" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      TRUCK ID
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      IN-CHARGE
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      ROUTE
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      MORNING LOAD
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      DELIVERED
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      EMPTY RETURNED
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      DAMAGED
                    </th>
                    <th className="px-4 py-3 text-center">CLOSING STOCK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {truckData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/90">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                        {row.in_charge}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700 border-r border-slate-200">
                        {row.route}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-800 border-r border-slate-200">
                        {row.morning_load}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-blue-700 border-r border-slate-200">
                        {row.delivered}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                        {row.empty_returned}
                      </td>
                      <td className="px-4 py-3 text-center font-mono text-rose-600 border-r border-slate-200">
                        {row.damaged}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-emerald-700">
                        {row.closing_stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "commission" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      ID
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      SALESMAN NAME
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      TRUCK ID
                    </th>
                    <th className="px-4 py-3 text-center border-r border-[#7161F0]/60">
                      BOTTLES SOLD
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/60">
                      COMMISSION RATE
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/60">
                      BASE COMMISSION
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/60">
                      TARGET BONUS
                    </th>
                    <th className="px-4 py-3 text-right">TOTAL PAYOUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {commissionData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/90">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 border-r border-slate-200">
                        {row.salesman_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700 border-r border-slate-200">
                        {row.truck_id}
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                        {row.bottles_sold}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 border-r border-slate-200">
                        {row.commission_rate}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800 border-r border-slate-200">
                        AED {row.base_commission}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-700 border-r border-slate-200">
                        AED {row.target_bonus}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                        AED {row.total_payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div>Showing 1 to 10 of 33 results</div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500"
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
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700"
              >
                2
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700"
              >
                3
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700"
              >
                4
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
