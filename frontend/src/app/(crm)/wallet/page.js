"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { Home, ArrowUpDown, X } from "lucide-react";

const INITIAL_WALLETS = [
  {
    id: 1,
    recharge_id: "mtsa6cyk",
    customer_id: "114721",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "56",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 2,
    recharge_id: "mtsa55op",
    customer_id: "114340",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "56",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 3,
    recharge_id: "mts9ywo7",
    customer_id: "107008",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "38",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 4,
    recharge_id: "mts9hs4p",
    customer_id: "102187",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "32",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 5,
    recharge_id: "mts9h73h",
    customer_id: "116412",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "47",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 6,
    recharge_id: "mts8o331",
    customer_id: "107232",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "53",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 7,
    recharge_id: "mts8m725",
    customer_id: "102000",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "40",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 8,
    recharge_id: "mts8iozr",
    customer_id: "116326",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "48",
    used_coupons: 0,
    remaining: 20,
    balance: 100,
    updated_on: "08/09/2026",
  },
  {
    id: 9,
    recharge_id: "mts7z0ld",
    customer_id: "197301",
    coupon: "FREE-10",
    quantity: 10,
    amount: 0,
    salesman: "47",
    used_coupons: 0,
    remaining: 10,
    balance: 0,
    updated_on: "08/09/2026",
  },
  {
    id: 10,
    recharge_id: "mtrf86jw",
    customer_id: "115030",
    coupon: "BOOK-20",
    quantity: 20,
    amount: 100,
    salesman: "84",
    used_coupons: 2,
    remaining: 18,
    balance: 90,
    updated_on: "07/09/2026",
  },
];

const COUPON_UUID_LIST = [
  "P-620cc76e-61c6-421c-82ab-fe2008d0fc2e",
  "P-1b7c2df1-9518-4526-b516-77bf76424a73",
  "P-80d7ca6e-d57a-4b4e-958a-c09f96e4083e",
  "P-10c9c6b4-88f2-4b64-9a4e-57e1b184a581",
  "P-719e845c-a702-4025-8306-3d625ef3d1b7",
  "P-91f2a71d-34c8-4810-9234-184a6258c901",
  "P-305b182c-4109-4712-8523-9823c718a412",
  "P-541d892a-6217-4901-8172-4192b837c523",
  "P-782e901b-7328-4012-9283-5203c948d634",
  "P-893f012c-8439-4123-0394-6314d059e745",
];

export default function WalletPage() {
  const { addToast } = useToast();
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [viewMode, setViewMode] = useState("list"); // "list" | "recharge"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Coupon Details Modal (view coupons.png & view coupons-1.png)
  const [couponModalRow, setCouponModalRow] = useState(null);

  // Wallet Recharge Form State (wallet recharge.png)
  const [rechargeForm, setRechargeForm] = useState({
    customer_name: "",
    customer_code: "",
    salesman_id: "",
    coupon_code: "BOOK-20",
    book_count: 1,
    payment_method: "Cash",
  });

  const filteredWallets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return wallets;
    return wallets.filter(
      (w) =>
        w.recharge_id.toLowerCase().includes(q) ||
        w.customer_id.toLowerCase().includes(q) ||
        w.coupon.toLowerCase().includes(q) ||
        w.salesman.toLowerCase().includes(q)
    );
  }, [wallets, searchQuery]);

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    if (!rechargeForm.customer_code.trim()) {
      addToast("Please enter or select Customer Code", "error");
      return;
    }
    const qty = Number(rechargeForm.book_count || 1) * 20;
    const amt = Number(rechargeForm.book_count || 1) * 100;
    const newEntry = {
      id: Date.now(),
      recharge_id: `mts${Math.random().toString(36).substring(2, 7)}`,
      customer_id: rechargeForm.customer_code.trim(),
      coupon: rechargeForm.coupon_code || "BOOK-20",
      quantity: qty,
      amount: amt,
      salesman: rechargeForm.salesman_id || "56",
      used_coupons: 0,
      remaining: qty,
      balance: amt,
      updated_on: "08/09/2026",
    };
    setWallets((prev) => [newEntry, ...prev]);
    addToast(`Wallet recharged (${newEntry.recharge_id}) for customer ${newEntry.customer_id}`, "success");
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Wallet" subtitle="Manage Wallet" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">Wallet</span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            - {viewMode === "recharge" ? "Recharge Wallet" : "Manage Wallet"} - ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <button
            type="button"
            onClick={() => setViewMode("recharge")}
            className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold cursor-pointer shadow-xs"
          >
            Wallet Recharge
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            Back to Wallet
          </button>
        )}
      </div>

      <div className="p-6 flex-1">
        {viewMode === "list" ? (
          /* Main Wallet Table Card (wallets.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Wallet Management</h2>
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
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {[
                      "REACHARGE ID",
                      "CUSTOMER ID",
                      "COUPON",
                      "QUANTITY",
                      "AMOUNT",
                      "SALESMAN",
                      "USED COUPONS",
                      "REMAINING",
                      "BALANCE",
                      "UPDATED ON",
                      "ACTIONS",
                    ].map((col) => (
                      <th key={col} className="py-3 px-4 first:pl-6 last:pr-6 whitespace-nowrap">
                        <div className="flex items-center justify-between gap-1">
                          <span>{col}</span>
                          <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                  {filteredWallets.slice(0, entriesPerPage).map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">
                        {row.recharge_id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{row.customer_id}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.coupon}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.quantity}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.amount}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.salesman}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.used_coupons}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.remaining}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{row.balance}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.updated_on}</td>
                      <td className="py-3.5 pl-4 pr-6 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setCouponModalRow(row)}
                          className="px-3 py-1 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-[11px] font-semibold cursor-pointer"
                        >
                          View Coupons
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>Showing 1 to 10 of 1,420 entries</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center ${
                      p === 1 ? "bg-[#5948DB] text-white font-semibold" : "text-slate-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* WALLET RECHARGE SUB-VIEW (wallet recharge.png) */
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">Create Orders</h2>
            </div>

            <form onSubmit={handleRechargeSubmit} className="p-8 space-y-4 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Customer Name
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Select Customer Name"
                    value={rechargeForm.customer_name}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, customer_name: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Customer Code
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    placeholder="Select Customer Code"
                    value={rechargeForm.customer_code}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, customer_code: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Salesman ID
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.salesman_id}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, salesman_id: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="">Select Salesman</option>
                    <option value="56">56 - ANAS</option>
                    <option value="32">32 - NOOR</option>
                    <option value="38">38 - NISAR</option>
                    <option value="47">47 - RAHMAN</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Wallet Recharge
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.coupon_code}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, coupon_code: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="BOOK-20">BOOK-20 (20 Coupons - AED 100)</option>
                    <option value="BOOK-50">BOOK-50 (50 Coupons - AED 250)</option>
                    <option value="FREE-10">FREE-10 (10 Free Coupons - AED 0)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Book Count
                </label>
                <div className="md:col-span-9">
                  <input
                    type="number"
                    min="1"
                    value={rechargeForm.book_count}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, book_count: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Amount Collectable
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    disabled
                    value={
                      rechargeForm.coupon_code === "FREE-10"
                        ? "0"
                        : String((Number(rechargeForm.book_count) || 1) * 100)
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-500 bg-[#EDF2F7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-xs font-medium text-slate-600">
                  Payment Method
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.payment_method}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, payment_method: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-700 bg-white"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold cursor-pointer"
                >
                  Update Wallet
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* COUPON DETAILS MODAL (view coupons.png & view coupons-1.png) */}
      {couponModalRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Coupon Details</h3>
              <button
                type="button"
                onClick={() => setCouponModalRow(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Top 3 Pills */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
                  <span className="text-slate-400 block text-[10px]">Customer ID</span>
                  <span className="font-bold text-slate-800">{couponModalRow.customer_id}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
                  <span className="text-slate-400 block text-[10px]">Total Amount</span>
                  <span className="font-bold text-slate-800">{couponModalRow.amount}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
                  <span className="text-slate-400 block text-[10px]">Total Coupons</span>
                  <span className="font-bold text-slate-800">{couponModalRow.quantity}</span>
                </div>
              </div>

              {/* 2 Gradient Cards: Paid Coupons & Free Coupons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-linear-to-r from-[#5948DB] to-[#7F6DF2] text-white">
                  <div className="text-xs opacity-90">Paid Coupons</div>
                  <div className="text-2xl font-bold mt-1">{couponModalRow.quantity}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Active: {couponModalRow.remaining}</div>
                </div>
                <div className="rounded-lg p-4 bg-linear-to-r from-[#EC4899] to-[#F43F5E] text-white">
                  <div className="text-xs opacity-90">Free Coupons</div>
                  <div className="text-2xl font-bold mt-1">0</div>
                  <div className="text-[11px] opacity-80 mt-0.5">Active: 0</div>
                </div>
              </div>

              {/* Coupon List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                      <th className="py-2.5 px-3">COUPON ID</th>
                      <th className="py-2.5 px-3">AMOUNT</th>
                      <th className="py-2.5 px-3">TYPE</th>
                      <th className="py-2.5 px-3">STATUS</th>
                      <th className="py-2.5 px-3">CREATED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                    {COUPON_UUID_LIST.map((uuid) => (
                      <tr key={uuid}>
                        <td className="py-2.5 px-3 font-mono text-[11px]">{uuid}</td>
                        <td className="py-2.5 px-3">5</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-[#5948DB] text-[10px] font-bold">
                            PAID
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                            ACTIVE
                          </span>
                        </td>
                        <td className="py-2.5 px-3">9/8/2026, 10:20:43 AM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCouponModalRow(null)}
                className="px-3.5 py-1.5 rounded bg-slate-500 hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => addToast("Exported coupons list", "success")}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold cursor-pointer"
              >
                Export Coupons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
