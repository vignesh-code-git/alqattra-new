"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Wallet as WalletIcon,
  Plus,
  Sparkles,
  Coins,
  CheckCircle,
  X,
  CreditCard,
  Edit,
  Trash2,
  AlertTriangle,
  Undo2,
  CheckCircle2,
  Eye,
  Ticket,
} from "lucide-react";

export default function WalletPage() {
  const { addToast } = useToast();

  // Exact 10 Figma Rows from Wallet screenshot (3:1785 - steps/1155/media_0.png)
  const [wallets, setWallets] = useState([
    {
      id: 1,
      recharge_id: "mtsa6cyk",
      customer_id: "114721",
      customer_name: "AL NEBRAS SCHOOL",
      coupon: "50*1",
      quantity: 1,
      amount: 50,
      salesman_id: "39",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: 50.0,
      updated_on: "08/09/2026",
      reward_points: 100,
      status: "Active",
    },
    {
      id: 2,
      recharge_id: "mtsa55op",
      customer_id: "114340",
      customer_name: "MOHAMMED KHALIFA",
      coupon: "52.5*1",
      quantity: 1,
      amount: 52.5,
      salesman_id: "32",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: 52.5,
      updated_on: "08/09/2026",
      reward_points: 105,
      status: "Active",
    },
    {
      id: 3,
      recharge_id: "mts5ywo7",
      customer_id: "107008",
      customer_name: "AL REEM MINI MART",
      coupon: "63*1",
      quantity: 1,
      amount: 63,
      salesman_id: "38",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: 56.7,
      updated_on: "08/09/2026",
      reward_points: 120,
      status: "Active",
    },
    {
      id: 4,
      recharge_id: "mts5w74e",
      customer_id: "101911",
      customer_name: "ABDULLAH AL KAABI",
      coupon: "52.5*1",
      quantity: 1,
      amount: 52.5,
      salesman_id: "38",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: 47.25,
      updated_on: "08/09/2026",
      reward_points: 95,
      status: "Active",
    },
    {
      id: 5,
      recharge_id: "mts1i8bw",
      customer_id: "114339",
      customer_name: "FATIMA AL MANSOORI",
      coupon: "52.5*1",
      quantity: 1,
      amount: 52.5,
      salesman_id: "32",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 9,
      balance: 47.25,
      updated_on: "08/09/2026",
      reward_points: 95,
      status: "Active",
    },
    {
      id: 6,
      recharge_id: "mtro0l5c",
      customer_id: "115900",
      customer_name: "ZAYED SPORTS ACADEMY",
      coupon: "old coupon",
      quantity: 1,
      amount: 0,
      salesman_id: "42",
      paid_coupons: 30,
      free_coupons: 0,
      remaining: 28,
      balance: 0.0,
      updated_on: "08/09/2026",
      reward_points: 0,
      status: "Active",
    },
    {
      id: 7,
      recharge_id: "mtrn2x8p",
      customer_id: "115812",
      customer_name: "OASIS HYPERMARKET",
      coupon: "50*1",
      quantity: 1,
      amount: 50,
      salesman_id: "56",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 8,
      balance: 40.0,
      updated_on: "08/09/2026",
      reward_points: 80,
      status: "Active",
    },
    {
      id: 8,
      recharge_id: "mtrk9v1m",
      customer_id: "112490",
      customer_name: "HILTON AL AIN LOUNGE",
      coupon: "63*1",
      quantity: 1,
      amount: 63,
      salesman_id: "47",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: 63.0,
      updated_on: "08/09/2026",
      reward_points: 126,
      status: "Active",
    },
    {
      id: 9,
      recharge_id: "mtrh4z3q",
      customer_id: "108321",
      customer_name: "SAEED AL DHAHERI",
      coupon: "52.5*1",
      quantity: 1,
      amount: 52.5,
      salesman_id: "57",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 7,
      balance: 36.75,
      updated_on: "08/09/2026",
      reward_points: 70,
      status: "Active",
    },
    {
      id: 10,
      recharge_id: "mtrf96jw",
      customer_id: "104119",
      customer_name: "SULAIMAN SAEED",
      coupon: "50*1",
      quantity: 1,
      amount: 50,
      salesman_id: "105",
      paid_coupons: 10,
      free_coupons: 0,
      remaining: 10,
      balance: 50.0,
      updated_on: "08/09/2026",
      reward_points: 100,
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [showCouponsModal, setShowCouponsModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  const handleDeleteWallet = (wallet) => {
    setDeleteTarget(wallet);
  };

  const confirmDeleteWallet = async () => {
    if (!deleteTarget) return;
    const wallet = deleteTarget;
    try {
      if (wallet.id && typeof wallet.id === "number" && wallet.id < 100000) {
        await apiService.updateWallet(wallet.id, {
          is_active: false,
        });
      }
    } catch {
      // Optimistic update
    }
    setWallets((prev) =>
      prev.map((w) => (w.id === wallet.id ? { ...w, status: "Deleted" } : w))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Wallet Recharge Moved to Deleted",
      message: `Wallet recharge ${wallet.recharge_id} (Customer ${wallet.customer_id}) marked as Deleted and can be restored anytime.`,
    });
    addToast(`Wallet recharge ${wallet.recharge_id} moved to Deleted list`, "info");
  };

  const handleRestoreWallet = async (wallet) => {
    try {
      if (wallet.id && typeof wallet.id === "number" && wallet.id < 100000) {
        await apiService.updateWallet(wallet.id, {
          is_active: true,
        });
      }
    } catch {
      // Optimistic update
    }
    setWallets((prev) =>
      prev.map((w) => (w.id === wallet.id ? { ...w, status: "Active" } : w))
    );
    setCrudPopup({
      type: "restore",
      title: "Wallet Restored",
      message: `Wallet recharge ${wallet.recharge_id} has been restored to Active status!`,
    });
    addToast(`Wallet recharge ${wallet.recharge_id} restored`, "success");
  };

  const handleUpdateWallet = async (e) => {
    e.preventDefault();
    if (!editingWallet) return;
    try {
      if (editingWallet.id && typeof editingWallet.id === "number" && editingWallet.id < 100000) {
        await apiService.updateWallet(editingWallet.id, {
          balance: editingWallet.balance,
          reward_points: editingWallet.reward_points,
          is_active: editingWallet.status === "Active",
        });
      }
      setWallets((prev) =>
        prev.map((w) => (w.id === editingWallet.id ? { ...w, ...editingWallet } : w))
      );
      setCrudPopup({
        type: "update",
        title: "Wallet Updated",
        message: `Wallet recharge ${editingWallet.recharge_id} updated successfully.`,
      });
      addToast(`Wallet ${editingWallet.recharge_id} updated!`, "success");
    } catch {
      setWallets((prev) =>
        prev.map((w) => (w.id === editingWallet.id ? { ...w, ...editingWallet } : w))
      );
      addToast(`Wallet updated`, "success");
    }
    setEditingWallet(null);
  };

  // Figma Wallet Recharge Form (3:1786)
  const [rechargeForm, setRechargeForm] = useState({
    customer_id: "114721",
    coupon: "52.5*1",
    quantity: "1",
    amount: "52.5",
    salesman_id: "38",
    paid_coupons: "10",
    free_coupons: "0",
  });

  const filterTabs = [
    {
      id: "all",
      label: "All Recharges",
      count: wallets.filter((w) => w.status !== "Deleted").length,
    },
    {
      id: "Deleted",
      label: "Deleted",
      count: wallets.filter((w) => w.status === "Deleted").length,
    },
  ];

  const filteredWallets = wallets.filter((w) => {
    if (activeTab === "Deleted") return w.status === "Deleted";
    return w.status !== "Deleted";
  });

  const handleOpenRecharge = (wallet = null) => {
    if (wallet) {
      setRechargeForm({
        customer_id: wallet.customer_id,
        coupon: wallet.coupon || "52.5*1",
        quantity: String(wallet.quantity || 1),
        amount: String(wallet.amount || 52.5),
        salesman_id: wallet.salesman_id || "38",
        paid_coupons: String(wallet.paid_coupons || 10),
        free_coupons: String(wallet.free_coupons || 0),
      });
    }
    setShowRechargeModal(true);
  };

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
      customer_name: "Customer Account",
      coupon: rechargeForm.coupon,
      quantity: parseInt(rechargeForm.quantity) || 1,
      amount: amountNum,
      salesman_id: rechargeForm.salesman_id,
      paid_coupons: paidNum,
      free_coupons: freeNum,
      remaining: paidNum + freeNum,
      balance: amountNum,
      updated_on: "08/09/2026",
      reward_points: 100,
      status: "Active",
    };

    setWallets((prev) => [newEntry, ...prev]);
    setShowRechargeModal(false);
    setCrudPopup({
      type: "create",
      title: "Wallet Recharge Created",
      message: `Recharge ${newId} for Customer ${rechargeForm.customer_id} (AED ${amountNum.toFixed(2)}) added to Wallet Status Check.`,
    });
    addToast(`Wallet recharge ${newId} created successfully!`, "success");
  };

  const handleViewCoupons = (wallet) => {
    setSelectedWallet(wallet);
    setShowCouponsModal(true);
  };

  // Exact 12 Figma Columns for "Wallet Status Check" (3:1785 - steps/1155/media_0.png)
  const columns = [
    {
      key: "recharge_id",
      label: "RECHARGE ID",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-slate-800 text-xs">{val}</span>
      ),
    },
    {
      key: "customer_id",
      label: "CUSTOMER ID",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-slate-900 text-xs">{val}</span>
      ),
    },
    {
      key: "coupon",
      label: "COUPON",
      sortable: true,
      render: (val) => (
        <span className="font-semibold text-slate-800 text-xs">{val}</span>
      ),
    },
    {
      key: "quantity",
      label: "QUANTITY",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-slate-800 text-xs">{val}</span>
      ),
    },
    {
      key: "amount",
      label: "AMOUNT",
      sortable: true,
      align: "right",
      render: (val) => (
        <span className="font-mono font-bold text-slate-900 text-xs">
          AED {val}
        </span>
      ),
    },
    {
      key: "salesman_id",
      label: "SALESMAN ID",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-slate-700 text-xs">{val}</span>
      ),
    },
    {
      key: "paid_coupons",
      label: "PAID COUPONS",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-slate-800 text-xs">{val}</span>
      ),
    },
    {
      key: "free_coupons",
      label: "FREE COUPONS",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-slate-700 text-xs">{val}</span>
      ),
    },
    {
      key: "remaining",
      label: "REMAINING",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-extrabold text-slate-900 text-xs">{val}</span>
      ),
    },
    {
      key: "balance",
      label: "BALANCE",
      sortable: true,
      align: "right",
      render: (val) => (
        <span className="font-mono font-bold text-emerald-700 text-xs">
          AED {Number(val).toFixed(2)}
        </span>
      ),
    },
    {
      key: "updated_on",
      label: "UPDATED ON",
      sortable: true,
      render: (val) => (
        <span className="text-slate-600 font-mono text-[11px]">{val}</span>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => handleViewCoupons(row)}
            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all flex items-center gap-1 shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <Eye className="w-3 h-3" />
            <span>View Coupons</span>
          </button>
          <button
            type="button"
            onClick={() => setEditingWallet({ ...row })}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
            title="Edit Wallet"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteWallet(row)}
            className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all cursor-pointer"
            title="Delete Wallet"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Wallet" subtitle="Wallet Status Check & Coupon Books" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Top Header matching Figma (3:1785) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Wallet Status Check
            </h2>
            <p className="text-xs text-slate-500">
              Monitor prepaid coupon books, remaining leaves, and customer wallet balances
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenRecharge()}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#e5484d] text-white rounded-md text-xs font-bold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Wallet Recharge</span>
          </button>
        </div>

        {/* DataTable with Exact 12 Columns & 10 Figma Rows */}
        <DataTable
          columns={columns}
          data={filteredWallets}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search recharge ID, customer ID, coupon, or salesman..."
          searchKeys={["recharge_id", "customer_id", "coupon", "salesman_id"]}
          onImport={(newRows) => setWallets((prev) => [...newRows, ...prev])}
          onRestore={handleRestoreWallet}
          exportFilename="AlQattara_Wallet_Status_Check.csv"
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </main>

      {/* Figma "Wallet Recharge" Modal (3:1786) */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-[#FF5A5F]">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Wallet Recharge</h2>
                  <p className="text-[11px] text-slate-400">
                    Issue new prepaid coupon book to customer wallet
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRechargeModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRechargeSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Customer ID *</label>
                  <input
                    type="text"
                    required
                    value={rechargeForm.customer_id}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, customer_id: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Salesman ID *</label>
                  <input
                    type="text"
                    required
                    value={rechargeForm.salesman_id}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, salesman_id: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Coupon Package</label>
                  <select
                    value={rechargeForm.coupon}
                    onChange={(e) => {
                      const pkg = e.target.value;
                      const amt = pkg === "50*1" ? "50" : pkg === "52.5*1" ? "52.5" : "63";
                      setRechargeForm({ ...rechargeForm, coupon: pkg, amount: amt });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-semibold text-slate-900"
                  >
                    <option value="50*1">50*1 (AED 50)</option>
                    <option value="52.5*1">52.5*1 (AED 52.5)</option>
                    <option value="63*1">63*1 (AED 63)</option>
                    <option value="old coupon">old coupon (AED 0)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={rechargeForm.quantity}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Amount (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={rechargeForm.amount}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, amount: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Paid Coupons</label>
                  <input
                    type="number"
                    required
                    value={rechargeForm.paid_coupons}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, paid_coupons: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Free Coupons</label>
                  <input
                    type="number"
                    required
                    value={rechargeForm.free_coupons}
                    onChange={(e) =>
                      setRechargeForm({ ...rechargeForm, free_coupons: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="px-4 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md font-semibold text-xs border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#FF5A5F] hover:bg-[#e5484d] text-white rounded-md font-bold text-xs shadow-2xs transition-all cursor-pointer"
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Coupon Book Details — Recharge #{selectedWallet.recharge_id}
                </h2>
                <p className="text-xs text-slate-500">
                  Customer ID: <span className="font-mono font-bold">{selectedWallet.customer_id}</span> • Package:{" "}
                  <span className="font-bold">{selectedWallet.coupon}</span> • Remaining:{" "}
                  <span className="font-bold text-emerald-700">
                    {selectedWallet.remaining} / {selectedWallet.paid_coupons}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCouponsModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#5948DB] text-white font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">COUPON LEAF #</th>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">SERIAL CODE</th>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">VALUE</th>
                    <th className="px-3.5 py-2.5 border-r border-[#7161F0]/70">REDEEMED DATE</th>
                    <th className="px-3.5 py-2.5 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {Array.from({ length: Math.min(selectedWallet.paid_coupons || 10, 10) }).map(
                    (_, idx) => {
                      const usedCount =
                        (selectedWallet.paid_coupons || 10) - (selectedWallet.remaining || 10);
                      const isUsed = idx < usedCount;
                      const unitVal = (
                        (selectedWallet.amount || 50) / (selectedWallet.paid_coupons || 10)
                      ).toFixed(2);
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-3.5 py-2 font-mono font-bold text-slate-700 border-r border-slate-200">
                            Leaf #{idx + 1}
                          </td>
                          <td className="px-3.5 py-2 font-mono text-blue-700 border-r border-slate-200">
                            {selectedWallet.recharge_id.toUpperCase()}-0{idx + 1}
                          </td>
                          <td className="px-3.5 py-2 font-mono text-slate-800 border-r border-slate-200">
                            AED {unitVal}
                          </td>
                          <td className="px-3.5 py-2 font-mono text-slate-500 border-r border-slate-200">
                            {isUsed ? "08/09/2026" : "—"}
                          </td>
                          <td className="px-3.5 py-2 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isUsed
                                  ? "bg-slate-100 text-slate-600 border-slate-300"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {isUsed ? "Redeemed" : "Available"}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCouponsModal(false)}
                className="px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white rounded-md text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Wallet Modal */}
      {editingWallet && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Edit Wallet Recharge</h3>
                <p className="text-[11px] text-slate-500">
                  Recharge #{editingWallet.recharge_id} (Customer {editingWallet.customer_id})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingWallet(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateWallet} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Remaining Coupons</label>
                  <input
                    type="number"
                    value={editingWallet.remaining}
                    onChange={(e) =>
                      setEditingWallet({
                        ...editingWallet,
                        remaining: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">
                    Wallet Balance (AED)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingWallet.balance}
                    onChange={(e) =>
                      setEditingWallet({
                        ...editingWallet,
                        balance: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingWallet(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-medium text-xs shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Confirm Move to Deleted</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete wallet recharge{" "}
                  <strong className="text-slate-800">{deleteTarget.recharge_id}</strong> (Customer{" "}
                  <strong className="text-slate-800">{deleteTarget.customer_id}</strong>)?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteWallet}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Move to Deleted</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal CRUD Action Popup Modal */}
      {crudPopup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 shadow-2xl text-center space-y-3.5 animate-in zoom-in-95">
            <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
              {crudPopup.type === "delete" ? (
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Trash2 className="w-6 h-6" />
                </div>
              ) : crudPopup.type === "restore" ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Undo2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#5948DB]/10 text-[#5948DB] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{crudPopup.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{crudPopup.message}</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCrudPopup(null)}
                className="w-full py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
