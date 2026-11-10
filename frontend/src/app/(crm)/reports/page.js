"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Download,
  Printer,
  Calendar,
  TrendingUp,
  Coins,
  Truck,
  Users,
  FileSpreadsheet,
  Filter,
  RotateCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";

export default function ReportsPage() {
  const { addToast } = useToast();
  // Exact 4 Figma sub-tabs: salesman (3:1781) | customer (3:1782) | truck (3:1783) | commission (3:1784)
  const [activeTab, setActiveTab] = useState("salesman");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 1. Exact 10 Figma Rows for Salesman Report (3:1781)
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
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
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
      order_collection: "148.20",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "148.20",
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
      order_collection: "0",
      wallet_recharge: "0",
      credit_collection: "0",
      total_collection: "0",
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
      city: "ABU DHABI",
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
      customer_name: "MOHAMMED KHALIFA",
      city: "ABU DHABI",
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
      customer_name: "AL REEM MINI MART",
      city: "AL AIN",
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
      customer_name: "ABDULLAH AL KAABI",
      city: "AL AIN",
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
      customer_name: "OASIS HYPERMARKET",
      city: "DUBAI",
      route: "Rt-Dubai-01",
      salesman: "MALAKA (105)",
      bottles_delivered: 1200,
      empty_returned: 1190,
      wallet_balance: "1800.00",
      credit_due: "0.00",
      total_revenue: "6000.00",
    },
  ];

  // 3. Truck Report Data (Figma 3:1783)
  const truckData = [
    {
      id: "T6335",
      in_charge: "NISAR (38)",
      route: "ABU DHABI",
      morning_load: 350,
      delivered: 280,
      empty_returned: 275,
      damaged: 2,
      closing_stock: 68,
    },
    {
      id: "T6338",
      in_charge: "ANAS (56)",
      route: "ABU DHABI",
      morning_load: 400,
      delivered: 375,
      empty_returned: 370,
      damaged: 0,
      closing_stock: 25,
    },
    {
      id: "T6347",
      in_charge: "HASHIM (47)",
      route: "AL AIN",
      morning_load: 320,
      delivered: 290,
      empty_returned: 285,
      damaged: 1,
      closing_stock: 29,
    },
    {
      id: "T6339",
      in_charge: "MUFEED (57)",
      route: "AL AIN",
      morning_load: 300,
      delivered: 265,
      empty_returned: 260,
      damaged: 0,
      closing_stock: 35,
    },
    {
      id: "T6341",
      in_charge: "MALAKA (105)",
      route: "DUBAI",
      morning_load: 450,
      delivered: 410,
      empty_returned: 405,
      damaged: 1,
      closing_stock: 39,
    },
  ];

  // 4. Commission Report Data (Figma 3:1784)
  const commissionData = [
    {
      id: "56",
      salesman_name: "ANAS",
      truck_id: "T6338",
      bottles_sold: 3750,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1312.50",
      target_bonus: "250.00",
      total_payout: "1562.50",
    },
    {
      id: "38",
      salesman_name: "NISAR",
      truck_id: "T6335",
      bottles_sold: 3420,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1197.00",
      target_bonus: "200.00",
      total_payout: "1397.00",
    },
    {
      id: "47",
      salesman_name: "HASHIM",
      truck_id: "T6347",
      bottles_sold: 2980,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1043.00",
      target_bonus: "150.00",
      total_payout: "1193.00",
    },
    {
      id: "57",
      salesman_name: "MUFEED",
      truck_id: "T6339",
      bottles_sold: 2840,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "994.00",
      target_bonus: "100.00",
      total_payout: "1094.00",
    },
    {
      id: "105",
      salesman_name: "MALAKA",
      truck_id: "T6341",
      bottles_sold: 4100,
      commission_rate: "AED 0.35 / Bottle",
      base_commission: "1435.00",
      target_bonus: "300.00",
      total_payout: "1735.00",
    },
  ];

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === "salesman") {
      csvContent +=
        "ID,SALESMAN NAME,SECURITY DEPOSIT,ORDER COLLECTION,WALLET RECHARGE,CREDIT COLLECTION,TOTAL COLLECTION\n";
      salesmanData.forEach((r) => {
        csvContent += `${r.id},"${r.salesman_name}",${r.security_deposit},${r.order_collection},${r.wallet_recharge},${r.credit_collection},${r.total_collection}\n`;
      });
    } else if (activeTab === "customer") {
      csvContent +=
        "ID,CUSTOMER NAME,CITY,ROUTE,SALESMAN,BOTTLES DELIVERED,EMPTY RETURNED,WALLET BALANCE,CREDIT DUE,TOTAL REVENUE\n";
      customerData.forEach((r) => {
        csvContent += `${r.id},"${r.customer_name}","${r.city}","${r.route}","${r.salesman}",${r.bottles_delivered},${r.empty_returned},${r.wallet_balance},${r.credit_due},${r.total_revenue}\n`;
      });
    } else if (activeTab === "truck") {
      csvContent +=
        "TRUCK ID,IN-CHARGE,ROUTE,MORNING LOAD,DELIVERED,EMPTY RETURNED,DAMAGED,CLOSING STOCK\n";
      truckData.forEach((r) => {
        csvContent += `"${r.id}","${r.in_charge}","${r.route}",${r.morning_load},${r.delivered},${r.empty_returned},${r.damaged},${r.closing_stock}\n`;
      });
    } else {
      csvContent +=
        "ID,SALESMAN NAME,TRUCK ID,BOTTLES SOLD,COMMISSION RATE,BASE COMMISSION,TARGET BONUS,TOTAL PAYOUT\n";
      commissionData.forEach((r) => {
        csvContent += `${r.id},"${r.salesman_name}","${r.truck_id}",${r.bottles_sold},"${r.commission_rate}",${r.base_commission},${r.target_bonus},${r.total_payout}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AlQattara_${activeTab}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
    <div className="flex-1 flex flex-col">
      <Header title="Reports" subtitle="Operational & Collection Reports" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Reports</h2>
          <p className="text-xs text-slate-500">
            Filter and export Salesman Collection, Customer, Truck, and Commission reports
          </p>
        </div>

        {/* Exact Figma "Filter By" Panel (3:1781 - steps/1167/media_0.png) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
            <Filter className="w-3.5 h-3.5 text-[#5948DB]" />
            <span>Filter By</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-end text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
            <div>
              <label className="text-slate-600 font-semibold block mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  addToast(
                    `Applied date filter ${fromDate || "Start"} to ${toDate || "Today"}`,
                    "success"
                  )
                }
                className="px-5 py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-bold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                  setSearch("");
                  addToast("Report filters reset", "info");
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-all cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Exact 4 Figma Report Sub-Tabs: Salesman Collection | Customer Report | Truck Report | Commission Report */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: "salesman", label: "Salesman Collection", icon: Coins },
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

        {/* Report Section Header + Search + Export Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-sm font-extrabold text-slate-800">
            {activeTab === "salesman"
              ? "Salesman Report"
              : activeTab === "customer"
              ? "Customer Report"
              : activeTab === "truck"
              ? "Truck Report"
              : "Commission Report"}
          </h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search report..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5948DB]"
              />
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-bold shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white rounded-md text-xs font-bold shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SALESMAN COLLECTION REPORT TABLE (Figma 3:1781) */}
        {activeTab === "salesman" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">ID</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">SALESMAN NAME</th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      SECURITY DEPOSIT
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      ORDER COLLECTION
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      WALLET RECHARGE
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      CREDIT COLLECTION
                    </th>
                    <th className="px-4 py-3 text-right">TOTAL COLLECTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {filteredSalesman.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 border-r border-slate-200">
                        {row.salesman_name}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED {row.security_deposit}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED {row.order_collection}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED {row.wallet_recharge}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        AED {row.credit_collection}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-700">
                        AED {row.total_collection}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <span className="font-bold text-slate-800">1</span> to{" "}
                <span className="font-bold text-slate-800">{filteredSalesman.length}</span> of{" "}
                <span className="font-bold text-slate-800">33</span> results
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
        )}

        {/* TAB 2: CUSTOMER REPORT TABLE (Figma 3:1782) */}
        {activeTab === "customer" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">CUSTOMER ID</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">CUSTOMER NAME</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">CITY / ROUTE</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">SALESMAN</th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      BOTTLES DELIVERED
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      EMPTY RETURNED
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      WALLET BALANCE
                    </th>
                    <th className="px-4 py-3 text-right">TOTAL REVENUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {customerData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 border-r border-slate-200">
                        {row.customer_name}
                      </td>
                      <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                        {row.city} • {row.route}
                      </td>
                      <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                        {row.salesman}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 border-r border-slate-200">
                        {row.bottles_delivered}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        {row.empty_returned}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-700 border-r border-slate-200">
                        AED {row.wallet_balance}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-slate-900">
                        AED {row.total_revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TRUCK REPORT TABLE (Figma 3:1783) */}
        {activeTab === "truck" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">TRUCK ID</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">IN-CHARGE</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">ROUTE / CITY</th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      MORNING LOAD
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      DELIVERED
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      EMPTY RETURNED
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">DAMAGED</th>
                    <th className="px-4 py-3 text-right">CLOSING STOCK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {truckData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 border-r border-slate-200">
                        {row.in_charge}
                      </td>
                      <td className="px-4 py-3 text-slate-700 border-r border-slate-200">
                        {row.route}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-800 border-r border-slate-200">
                        {row.morning_load}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-blue-700 border-r border-slate-200">
                        {row.delivered}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 border-r border-slate-200">
                        {row.empty_returned}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-rose-600 border-r border-slate-200">
                        {row.damaged}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-700">
                        {row.closing_stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COMMISSION REPORT TABLE (Figma 3:1784) */}
        {activeTab === "commission" && (
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                <thead className="bg-[#5948DB] text-xs font-semibold text-white border-b border-[#4A3AC9]">
                  <tr>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">ID</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">SALESMAN NAME</th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">TRUCK ID</th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      BOTTLES SOLD
                    </th>
                    <th className="px-4 py-3 border-r border-[#7161F0]/70">COMMISSION RATE</th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      BASE COMMISSION
                    </th>
                    <th className="px-4 py-3 text-right border-r border-[#7161F0]/70">
                      TARGET BONUS
                    </th>
                    <th className="px-4 py-3 text-right">TOTAL PAYOUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {commissionData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                        {row.id}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 border-r border-slate-200">
                        {row.salesman_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-blue-700 border-r border-slate-200">
                        {row.truck_id}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 border-r border-slate-200">
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
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-700">
                        AED {row.total_payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
