"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Plus,
  X,
  Edit,
  Trash2,
  ArrowUpDown,
  Download,
} from "lucide-react";

export default function WalletPage() {
  const { addToast } = useToast();

  // Exact 10 Figma Rows from Wallet screenshot (3:1785 - steps/1155/media_0.png)
  const [wallets, setWallets] = useState([
    {
      id: 1,
      recharge_id: "mtsa6cyk",
      customer_id: "114721",
      coupon: "50*1",
      quantity: 1,
      amount: "50",
      salesman_id: "39",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: "50.00",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 2,
      recharge_id: "mtsa55op",
      customer_id: "114340",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "32",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: "52.50",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 3,
      recharge_id: "mts5ywo7",
      customer_id: "107008",
      coupon: "63*1",
      quantity: 1,
      amount: "63",
      salesman_id: "38",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: "56.70",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 4,
      recharge_id: "mts9hs4p",
      customer_id: "197291",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "109",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: "47.25",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 5,
      recharge_id: "mts9h73h",
      customer_id: "109753",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "23",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: "52.50",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 6,
      recharge_id: "mts8o331",
      customer_id: "117912",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "90",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 6,
      balance: "31.50",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 7,
      recharge_id: "mts8m725",
      customer_id: "115822",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "23",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: "47.25",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 8,
      recharge_id: "mts8iozr",
      customer_id: "18854",
      coupon: "63*1",
      quantity: 1,
      amount: "63",
      salesman_id: "23",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 8,
      balance: "50.40",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 9,
      recharge_id: "mts7z0ld",
      customer_id: "112651",
      coupon: "52.5*1",
      quantity: 1,
      amount: "52.5",
      salesman_id: "43",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: "47.25",
      updated_on: "08/09/2026",
      status: "Active",
    },
    {
      id: 10,
      recharge_id: "mtrf96jw",
      customer_id: "115900",
      coupon: "old coupon",
      quantity: 1,
      amount: "0",
      salesman_id: "42",
      paid_coupons: 30,
      free_coupons: 0,
      remaining: 28,
      balance: "0.00",
      updated_on: "08/09/2026",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [showCouponsModal, setShowCouponsModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [rechargeForm, setRechargeForm] = useState({
    customer_id: "114721",
    coupon: "52.5*1",
    quantity: "1",
    amount: "52.5",
    salesman_id: "38",
    paid_coupons: "10",
    free_coupons: "0",
  });

  const filteredWallets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return wallets.filter((w) => {
      if (w.status === "Deleted") return false;
      if (!q) return true;
      return Object.values(w).some((v) =>
        String(v).toLowerCase().includes(q)
      );
    });
  }, [wallets, search]);

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(rechargeForm.amount) || 0;
    const paidNum = parseInt(rechargeForm.paid_coupons) || 10;
    const freeNum = parseInt(rechargeForm.free_coupons) || 0;
    const newId = `mts${Math.random().toString(36).substring(2, 7)}`;

    const newEntry = {
      id: Date.now(),
      recharge_id: newId,
      customer_id: rechargeForm.customer_id,
      coupon: rechargeForm.coupon,
      quantity: parseInt(rechargeForm.quantity) || 1,
      amount: String(amountNum),
      salesman_id: rechargeForm.salesman_id,
      paid_coupons: paidNum,
      free_coupons: freeNum,
      remaining: paidNum + freeNum,
      balance: amountNum.toFixed(2),
      updated_on: "08/09/2026",
      status: "Active",
    };

    setWallets((prev) => [newEntry, ...prev]);
    setShowRechargeModal(false);
    addToast(`Wallet recharge ${newId} created successfully!`, "success");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header title="Wallet" subtitle="Wallet Status Check & Coupon Books" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Action Bar matching Figma 3:1785 */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Home / <span className="text-slate-800 font-semibold">Wallets</span>
          </div>
          <button
            type="button"
            onClick={() => setShowRechargeModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#e5484d] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Wallet Recharge</span>
          </button>
        </div>

        {/* Wallet Status Check Table Container matching exact Figma 3:1785 */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between text-white">
            <h3 className="text-sm font-bold tracking-wide">
              Wallet Status Check
            </h3>
            <button
              type="button"
              onClick={() => addToast("Exported wallets to CSV", "success")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-800 font-semibold"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span>Search:</span>
              <input
                type="text"
                placeholder="Search wallets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-56 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[1000px]">
              <thead className="bg-[#5948DB] text-[11px] font-bold text-white uppercase tracking-wider border-b border-[#4A3AC9]">
                <tr>
                  <th className="px-3.5 py-3 border-r border-[#7161F0]/60">
                    <div className="flex items-center justify-between gap-1">
                      <span>RECHARGE ID</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3.5 py-3 border-r border-[#7161F0]/60">
                    <div className="flex items-center justify-between gap-1">
                      <span>CUSTOMER ID</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-3.5 py-3 border-r border-[#7161F0]/60">
                    COUPON
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    QUANTITY
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    AMOUNT
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    SALESMAN ID
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    PAID COUPONS
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    FREE COUPONS
                  </th>
                  <th className="px-3 py-3 text-center border-r border-[#7161F0]/60">
                    REMAINING
                  </th>
                  <th className="px-3.5 py-3 text-center border-r border-[#7161F0]/60">
                    BALANCE
                  </th>
                  <th className="px-3.5 py-3 border-r border-[#7161F0]/60">
                    UPDATED ON
                  </th>
                  <th className="px-4 py-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredWallets.slice(0, entriesPerPage).map((w) => (
                  <tr
                    key={w.id}
                    className="hover:bg-slate-50/90 transition-colors"
                  >
                    <td className="px-3.5 py-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                      {w.recharge_id}
                    </td>
                    <td className="px-3.5 py-3 font-mono text-slate-700 border-r border-slate-200">
                      {w.customer_id}
                    </td>
                    <td className="px-3.5 py-3 text-slate-800 border-r border-slate-200">
                      {w.coupon}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-800 border-r border-slate-200">
                      {w.quantity}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-800 border-r border-slate-200">
                      AED {w.amount}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                      {w.salesman_id}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-800 border-r border-slate-200">
                      {w.paid_coupons}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                      {w.free_coupons}
                    </td>
                    <td className="px-3 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                      {w.remaining}
                    </td>
                    <td className="px-3.5 py-3 text-center font-mono font-bold text-slate-900 border-r border-slate-200">
                      AED {w.balance}
                    </td>
                    <td className="px-3.5 py-3 font-mono text-slate-600 border-r border-slate-200">
                      {w.updated_on}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedWallet(w);
                          setShowCouponsModal(true);
                        }}
                        className="px-3 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                      >
                        View Coupons
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing 1 to 10 of 18,452 entries
            </div>
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
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Figma "Wallet Recharge" Modal (3:1786) */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Wallet Recharge</h2>
              <button
                type="button"
                onClick={() => setShowRechargeModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleRechargeSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Customer ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={rechargeForm.customer_id}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        customer_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Salesman ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={rechargeForm.salesman_id}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        salesman_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Coupon Package
                  </label>
                  <select
                    value={rechargeForm.coupon}
                    onChange={(e) => {
                      const pkg = e.target.value;
                      const amt =
                        pkg === "50*1"
                          ? "50"
                          : pkg === "52.5*1"
                          ? "52.5"
                          : "63";
                      setRechargeForm({
                        ...rechargeForm,
                        coupon: pkg,
                        amount: amt,
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-semibold text-slate-900"
                  >
                    <option value="50*1">50*1 (AED 50)</option>
                    <option value="52.5*1">52.5*1 (AED 52.5)</option>
                    <option value="63*1">63*1 (AED 63)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={rechargeForm.quantity}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        quantity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Amount (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={rechargeForm.amount}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Paid Coupons
                  </label>
                  <input
                    type="number"
                    required
                    value={rechargeForm.paid_coupons}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        paid_coupons: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Free Coupons
                  </label>
                  <input
                    type="number"
                    required
                    value={rechargeForm.free_coupons}
                    onChange={(e) =>
                      setRechargeForm({
                        ...rechargeForm,
                        free_coupons: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded font-bold text-xs cursor-pointer"
                >
                  Recharge Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Figma "View Coupons" Modal (3:1787 & 3:1788) */}
      {showCouponsModal && selectedWallet && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#5948DB] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">
                View Coupons — Recharge #{selectedWallet.recharge_id}
              </h2>
              <button
                type="button"
                onClick={() => setShowCouponsModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-4 gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Customer ID
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {selectedWallet.customer_id}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Coupon Book
                  </span>
                  <span className="font-bold text-slate-900">
                    {selectedWallet.coupon}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Remaining Leaves
                  </span>
                  <span className="font-mono font-bold text-blue-700">
                    {selectedWallet.remaining} / {selectedWallet.paid_coupons}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Balance
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    AED {selectedWallet.balance}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#5948DB] text-white font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="px-3.5 py-2.5 border-r border-[#7161F0]/60">
                        COUPON ID
                      </th>
                      <th className="px-3.5 py-2.5 border-r border-[#7161F0]/60">
                        RECHARGE ID
                      </th>
                      <th className="px-3.5 py-2.5 border-r border-[#7161F0]/60">
                        COUPON TYPE
                      </th>
                      <th className="px-3.5 py-2.5 border-r border-[#7161F0]/60">
                        USED DATE
                      </th>
                      <th className="px-3.5 py-2.5 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {Array.from({
                      length: Math.min(selectedWallet.paid_coupons || 10, 10),
                    }).map((_, idx) => {
                      const usedCount =
                        (selectedWallet.paid_coupons || 10) -
                        (selectedWallet.remaining || 10);
                      const isUsed = idx < usedCount;
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-3.5 py-2 font-mono font-bold text-slate-800 border-r border-slate-200">
                            {selectedWallet.recharge_id}_{idx + 1}
                          </td>
                          <td className="px-3.5 py-2 font-mono text-slate-600 border-r border-slate-200">
                            {selectedWallet.recharge_id}
                          </td>
                          <td className="px-3.5 py-2 text-slate-800 border-r border-slate-200">
                            PAID
                          </td>
                          <td className="px-3.5 py-2 font-mono text-slate-600 border-r border-slate-200">
                            {isUsed ? "08/09/2026" : "N/A"}
                          </td>
                          <td className="px-3.5 py-2 text-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                isUsed
                                  ? "bg-rose-100 text-rose-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {isUsed ? "USED" : "UNUSED"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCouponsModal(false)}
                  className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
