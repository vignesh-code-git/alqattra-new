"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, walletRowsFromApi } from "@/services/crmMappers";
import BackLink from "@/components/BackLink";
import PanelHeader from "@/components/PanelHeader";
import { ArrowUpDown, X, Wallet } from "lucide-react";

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
  const loadLive = useCallback(async () => {
    const [walletsRaw, customersRaw] = await Promise.all([
      apiService.getWallets(),
      apiService.getCustomers(),
    ]);
    if (walletsRaw == null) return null;
    const apiWallets = listOf(walletsRaw);
    return { rows: walletRowsFromApi(apiWallets), wallets: apiWallets, customers: listOf(customersRaw) };
  }, []);
  const live = useLiveData(loadLive);

  // Tell the user once when the server becomes unreachable, not on every poll.
  const [offlineNotified, setOfflineNotified] = useState(false);
  useEffect(() => {
    if (live.error && !offlineNotified) {
      addToast("Cannot reach the CRM server - showing the last loaded data", "error");
      setOfflineNotified(true);
    }
    if (!live.error && offlineNotified) setOfflineNotified(false);
  }, [live.error, offlineNotified, addToast]);

  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    if (live.data) setWallets(live.data.rows);
  }, [live.data]);
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

  const handleRechargeSubmit = async (e) => {
    e.preventDefault();
    if (!rechargeForm.customer_code.trim()) {
      addToast("Please enter or select Customer Code", "error");
      return;
    }
    const code = rechargeForm.customer_code.trim().toLowerCase();
    const customer = (live.data?.customers || []).find(
      (c) => c.customer_code.toLowerCase() === code
    );
    if (!customer) {
      addToast(`No CRM customer has the code "${rechargeForm.customer_code}"`, "error");
      return;
    }
    // A customer's first recharge opens their wallet.
    let wallet = (live.data?.wallets || []).find((w) => w.customer === customer.id);
    if (!wallet) {
      wallet = await apiService.createWallet({ customer: customer.id });
      if (!wallet) {
        addToast("Could not open a wallet for this customer - check the CRM server", "error");
        return;
      }
    }
    // Coupon books are 20 coupons for AED 100.
    const books = Number(rechargeForm.book_count || 1);
    const recharge = await apiService.createWalletRecharge({
      wallet: wallet.id,
      amount: (books * 100).toFixed(2),
      bonus: "0.00",
      payment_method: rechargeForm.payment_method || "Cash",
      transaction_ref: `${rechargeForm.coupon_code || "BOOK-20"} x${books}`,
    });
    if (!recharge) {
      addToast("Could not save the recharge - check the CRM server", "error");
      return;
    }
    addToast(`Wallet recharged AED ${(books * 100).toFixed(2)} for ${customer.name}`, "success");
    await live.refresh();
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans pb-12">
      <Header title="Wallet" subtitle="Manage Wallet" />

      {/* iOS Translucent Glass Top Hero Bar */}
      <div className="p-6 flex-1">
        {viewMode !== "list" && (
          <BackLink label="Back to Wallet" onClick={() => setViewMode("list")} />
        )}

        {viewMode === "list" ? (
          /* Main Wallet Table Card (wallets.png) */
          <div className="ios-surface overflow-hidden">
            <PanelHeader
              icon={Wallet}
              title="Wallet Management"
              subtitle="Customer wallets, coupons and recharges"
              onAction={() => addToast("Exported wallet records", "success")}
              actions={
                <button
                  type="button"
                  onClick={() => setViewMode("recharge")}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F2F2F7] active:bg-[#E5E5EA] text-[#007AFF] text-[11.5px] shadow-[0_1px_3px_rgba(0,0,0,0.15)] font-semibold transition cursor-pointer active:scale-95"
                >
                  Wallet Recharge
                </button>
              }
            />

            <div className="px-6 py-3.5 bg-[#F2F2F7]/50 border-b border-[#E5E5EA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-[#3C3C43]/15 rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E] focus:outline-none"
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
                  placeholder="Search wallet..."
                  className="border border-[#3C3C43]/15 bg-white rounded-full px-3.5 py-1.5 w-48 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="ios-table w-full text-left border-collapse">
                <thead>
                  <tr className="ios-thead">
                    {[
                      "RECHARGE ID",
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
                      <th key={col} className="py-3.5 px-4 first:pl-6 last:pr-6 whitespace-nowrap">
                        <div className="flex items-center justify-between gap-1">
                          <span>{col}</span>
                          <ArrowUpDown className="w-3 h-3 sort-ico shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                  {filteredWallets.slice(0, entriesPerPage).map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-semibold text-[#007AFF]">
                        {row.recharge_id}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">{row.customer_id}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E5E5EA] text-[#1C1C1E]">
                          {row.coupon}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{row.quantity}</td>
                      <td className="py-3.5 px-4">AED {row.amount}</td>
                      <td className="py-3.5 px-4">{row.salesman}</td>
                      <td className="py-3.5 px-4">{row.used_coupons}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#34C759]">{row.remaining}</td>
                      <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">AED {row.balance}</td>
                      <td className="py-3.5 px-4 text-[#8E8E93]">{row.updated_on}</td>
                      <td className="py-3.5 pl-4 pr-6 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setCouponModalRow(row)}
                          className="px-3.5 py-1.5 rounded-full bg-[#007AFF]/12 hover:bg-[#007AFF] text-[#0062CC] hover:text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          View Coupons
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-[#E5E5EA] bg-[#F2F2F7]/40 flex items-center justify-between text-xs text-[#8E8E93]">
              <div>Showing 1 to 10 of 1,420 entries</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`w-7 h-7 rounded-full text-[11px] font-medium flex items-center justify-center transition-all cursor-pointer ${
                      p === 1
                        ? "bg-[#007AFF] text-white shadow-xs font-semibold"
                        : "text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-[#E5E5EA]"
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
          <div className="ios-surface overflow-hidden max-w-4xl mx-auto">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                Create Wallet Recharge Order
              </h2>
            </div>

            <form onSubmit={handleRechargeSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
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
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
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
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  Salesman ID
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.salesman_id}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, salesman_id: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
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
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  Wallet Recharge
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.coupon_code}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, coupon_code: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  >
                    <option value="BOOK-20">BOOK-20 (20 Coupons - AED 100)</option>
                    <option value="BOOK-50">BOOK-50 (50 Coupons - AED 250)</option>
                    <option value="FREE-10">FREE-10 (10 Free Coupons - AED 0)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
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
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  Amount Collectable
                </label>
                <div className="md:col-span-9">
                  <input
                    type="text"
                    disabled
                    value={
                      rechargeForm.coupon_code === "FREE-10"
                        ? "AED 0"
                        : `AED ${(Number(rechargeForm.book_count) || 1) * 100}`
                    }
                    className="w-full border border-[#3C3C43]/10 rounded-xl px-3.5 py-2 text-xs text-[#8E8E93] bg-[#F2F2F7] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                <label className="md:col-span-3 md:text-right text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="md:col-span-9">
                  <select
                    value={rechargeForm.payment_method}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, payment_method: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#34C759] hover:bg-[#2EB04F] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(52,199,89,0.25)] transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[6px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] border border-[#3C3C43]/11 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-[15px] font-semibold text-[#1C1C1E]">Coupon Details</h3>
              <button
                type="button"
                onClick={() => setCouponModalRow(null)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Top 3 Pills */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-[#F2F2F7]/70 border border-[#3C3C43]/10 rounded-2xl p-3">
                  <span className="text-[#8E8E93] block text-[10px] font-semibold uppercase tracking-wider">
                    Customer ID
                  </span>
                  <span className="font-bold text-[#1C1C1E] mt-0.5 block">{couponModalRow.customer_id}</span>
                </div>
                <div className="bg-[#F2F2F7]/70 border border-[#3C3C43]/10 rounded-2xl p-3">
                  <span className="text-[#8E8E93] block text-[10px] font-semibold uppercase tracking-wider">
                    Total Amount
                  </span>
                  <span className="font-bold text-[#007AFF] mt-0.5 block">AED {couponModalRow.amount}</span>
                </div>
                <div className="bg-[#F2F2F7]/70 border border-[#3C3C43]/10 rounded-2xl p-3">
                  <span className="text-[#8E8E93] block text-[10px] font-semibold uppercase tracking-wider">
                    Total Coupons
                  </span>
                  <span className="font-bold text-[#34C759] mt-0.5 block">{couponModalRow.quantity}</span>
                </div>
              </div>

              {/* 2 Gradient Cards: Paid Coupons & Free Coupons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white shadow-[0_4px_14px_rgba(0,122,255,0.25)]">
                  <div className="text-xs font-medium opacity-90">Paid Coupons</div>
                  <div className="text-3xl font-bold tracking-tight mt-1">{couponModalRow.quantity}</div>
                  <div className="text-[11px] opacity-80 mt-1">Active: {couponModalRow.remaining}</div>
                </div>
                <div className="rounded-2xl p-5 bg-gradient-to-r from-[#FF2D55] to-[#FF375F] text-white shadow-[0_4px_14px_rgba(255,45,85,0.25)]">
                  <div className="text-xs font-medium opacity-90">Free Coupons</div>
                  <div className="text-3xl font-bold tracking-tight mt-1">0</div>
                  <div className="text-[11px] opacity-80 mt-1">Active: 0</div>
                </div>
              </div>

              {/* Coupon List Table */}
              <div className="rounded-2xl border border-[#3C3C43]/10 overflow-hidden">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      <th className="py-2.5 px-3.5">COUPON ID</th>
                      <th className="py-2.5 px-3.5">AMOUNT</th>
                      <th className="py-2.5 px-3.5">TYPE</th>
                      <th className="py-2.5 px-3.5">STATUS</th>
                      <th className="py-2.5 px-3.5">CREATED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {COUPON_UUID_LIST.map((uuid) => (
                      <tr key={uuid} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-2.5 px-3.5 font-mono text-[11px] text-[#1C1C1E]">{uuid}</td>
                        <td className="py-2.5 px-3.5 font-semibold text-[#1C1C1E]">5</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">
                            PAID
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20">
                            ACTIVE
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-[#8E8E93]">9/8/2026, 10:20:43 AM</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#E5E5EA] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCouponModalRow(null)}
                className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => addToast("Exported coupons list", "success")}
                className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
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
