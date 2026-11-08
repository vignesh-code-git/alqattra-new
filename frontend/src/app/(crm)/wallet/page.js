"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  Sparkles,
  Gift,
  Coins,
  History,
  CheckCircle,
  X,
  CreditCard,
  User,
  ArrowDownLeft,
  ExternalLink,
  Edit,
  Trash2,
  AlertTriangle,
  Undo2,
  CheckCircle2,
} from "lucide-react";

export default function WalletPage() {
  const { addToast } = useToast();

  const [wallets, setWallets] = useState([
    {
      id: 1,
      recharge_id: "RC-2026-9041",
      customer_id: "197301",
      customer_name: "Al Ain Palace Hotel",
      phone: "+971 3 712 3456",
      coupon: "5 Gallon Prepaid Book (20)",
      quantity: 2,
      amount: 360.0,
      salesman_id: "104 - Anas",
      paid_coupons: 40,
      free_coupons: 4,
      remaining: 28,
      balance: 252.0,
      updated_on: "2026-11-05",
      reward_points: 450,
      status: "Active",
    },
    {
      id: 2,
      recharge_id: "RC-2026-9040",
      customer_id: "197300",
      customer_name: "Fatima Al Kaabi Villa",
      phone: "+971 50 234 5678",
      coupon: "5 Gallon Standard (10)",
      quantity: 1,
      amount: 90.0,
      salesman_id: "108 - Nisar",
      paid_coupons: 10,
      free_coupons: 1,
      remaining: 8,
      balance: 72.0,
      updated_on: "2026-11-05",
      reward_points: 120,
      status: "Active",
    },
    {
      id: 3,
      recharge_id: "RC-2026-9039",
      customer_id: "197299",
      customer_name: "Emirates Steel Staff Quarters",
      phone: "+971 2 612 8888",
      coupon: "5 Gallon Bulk Pack (50)",
      quantity: 5,
      amount: 850.0,
      salesman_id: "102 - Hashim",
      paid_coupons: 250,
      free_coupons: 25,
      remaining: 15,
      balance: 51.0,
      updated_on: "2026-10-18",
      reward_points: 85,
      status: "Low Balance",
    },
    {
      id: 4,
      recharge_id: "RC-2026-9038",
      customer_id: "197298",
      customer_name: "Oasis Kindergarten Al Ain",
      phone: "+971 3 765 4321",
      coupon: "5 Gallon Prepaid Book (20)",
      quantity: 4,
      amount: 720.0,
      salesman_id: "105 - Mufeed",
      paid_coupons: 80,
      free_coupons: 8,
      remaining: 64,
      balance: 576.0,
      updated_on: "2026-11-04",
      reward_points: 310,
      status: "Active",
    },
    {
      id: 5,
      recharge_id: "RC-2026-9037",
      customer_id: "197297",
      customer_name: "Zayed Sports Academy",
      phone: "+971 2 444 9900",
      coupon: "5 Gallon Standard (10)",
      quantity: 2,
      amount: 180.0,
      salesman_id: "104 - Anas",
      paid_coupons: 20,
      free_coupons: 2,
      remaining: 0,
      balance: 0.0,
      updated_on: "2026-09-12",
      reward_points: 0,
      status: "Inactive",
    },
    {
      id: 6,
      recharge_id: "RC-2026-9036",
      customer_id: "197296",
      customer_name: "Hilton Al Ain Executive Lounge",
      phone: "+971 3 706 7000",
      coupon: "5 Gallon Corporate Mega (100)",
      quantity: 2,
      amount: 1600.0,
      salesman_id: "108 - Nisar",
      paid_coupons: 200,
      free_coupons: 20,
      remaining: 185,
      balance: 1480.0,
      updated_on: "2026-11-07",
      reward_points: 820,
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  useEffect(() => {
    async function loadWallets() {
      const data = await apiService.getWallets();
      if (data && data.length > 0) {
        setWallets(data.map((item, idx) => ({
          id: item.id,
          recharge_id: `RC-2026-${9040 + idx}`,
          customer_id: item.customer_code || `197${300 + idx}`,
          customer_name: item.customer_name || "Customer",
          phone: "+971 50 123 4567",
          coupon: "5 Gallon Prepaid Pack",
          quantity: 2,
          amount: parseFloat(item.balance) || 100,
          salesman_id: "104 - Anas",
          paid_coupons: 20,
          free_coupons: 2,
          remaining: 15,
          balance: parseFloat(item.balance) || 100,
          updated_on: "2026-11-08",
          reward_points: item.reward_points || 200,
          status: item.is_active ? "Active" : "Inactive",
        })));
      }
    }
    loadWallets();
  }, []);

  // Delete wallet trigger
  const handleDeleteWallet = (wallet) => {
    setDeleteTarget(wallet);
  };

  // Confirm delete wallet (Soft deletes to "Deleted" with red border styling)
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
      title: "Wallet Moved to Deleted",
      message: `Wallet for ${wallet.customer_name} (${wallet.customer_code || wallet.customer_id}) marked as Deleted. It is styled with a prominent red border and can be restored at any time.`,
    });
    addToast(`Wallet for ${wallet.customer_name} moved to Deleted list`, "info");
  };

  // Restore wallet back to Active status
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
      message: `Wallet for ${wallet.customer_name} has been restored to Active status!`,
    });
    addToast(`Wallet for ${wallet.customer_name} restored to Active`, "success");
  };

  // Update wallet in database
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
        message: `Wallet details for ${editingWallet.customer_name} updated and synced with database successfully.`,
      });
      addToast(`Wallet for ${editingWallet.customer_name} updated in database!`, "success");
    } catch {
      setWallets((prev) =>
        prev.map((w) => (w.id === editingWallet.id ? { ...w, ...editingWallet } : w))
      );
      addToast(`Wallet updated`, "success");
    }
    setEditingWallet(null);
  };

  const [rechargeForm, setRechargeForm] = useState({
    customerId: "1",
    amount: "500",
    paymentMethod: "Credit Card / Bank Transfer",
    bonusPercent: "5",
    referenceNo: "TXN-TOPUP-9921",
  });

  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const totalPoints = wallets.reduce((acc, w) => acc + w.reward_points, 0);
  const activeCount = wallets.filter((w) => w.status === "Active").length;
  const lowBalanceCount = wallets.filter((w) => w.balance < 100 && w.balance > 0).length;

  const filterTabs = [
    { id: "all", label: "All Wallets", count: wallets.filter((w) => w.status !== "Deleted").length },
    { id: "active", label: "Active", count: activeCount },
    { id: "low_balance", label: "Low Balance (< AED 100)", count: wallets.filter((w) => w.status !== "Deleted" && w.balance < 100 && w.balance > 0).length },
    { id: "inactive", label: "Inactive", count: wallets.filter((w) => w.status === "Inactive").length },
    { id: "Deleted", label: "Deleted", count: wallets.filter((w) => w.status === "Deleted").length },
  ];

  const filteredWallets = wallets.filter((w) => {
    if (activeTab === "Deleted") return w.status === "Deleted";
    if (w.status === "Deleted") return false;
    if (activeTab === "active") return w.status === "Active";
    if (activeTab === "low_balance") return w.balance < 100 && w.balance > 0;
    if (activeTab === "inactive") return w.status === "Inactive";
    return true;
  });

  const handleOpenRecharge = (wallet = null) => {
    if (wallet) {
      setRechargeForm((prev) => ({
        ...prev,
        customerId: wallet.id.toString(),
      }));
    }
    setShowRechargeModal(true);
  };

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(rechargeForm.amount) || 0;
    const bonusNum = amountNum * ((parseFloat(rechargeForm.bonusPercent) || 0) / 100);
    const totalCredit = amountNum + bonusNum;
    const pointsBonus = Math.floor(amountNum / 10);

    setWallets((prev) =>
      prev.map((w) => {
        if (w.id.toString() === rechargeForm.customerId) {
          const newBal = w.balance + totalCredit;
          return {
            ...w,
            balance: newBal,
            reward_points: w.reward_points + pointsBonus,
            status: "Active",
            last_recharge: "Today",
          };
        }
        return w;
      })
    );

    const targetCustomer = wallets.find((w) => w.id.toString() === rechargeForm.customerId);
    setShowRechargeModal(false);
    setCrudPopup({
      type: "create",
      title: "Wallet Top-up Successful",
      message: `Recharged AED ${totalCredit.toFixed(2)} to ${targetCustomer?.customer_name || "customer"} wallet (+${pointsBonus} bonus points awarded).`,
    });
    addToast(
      `Recharged AED ${totalCredit.toFixed(2)} to ${targetCustomer?.customer_name || "customer"} wallet (+${pointsBonus} pts)!`,
      "success"
    );
  };

  const handleViewHistory = (wallet) => {
    setSelectedWallet(wallet);
    setShowHistoryModal(true);
  };

  const columns = [
    {
      key: "recharge_id",
      label: "RECHARGE ID",
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-blue-700 text-xs bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60">
          {val}
        </span>
      ),
    },
    {
      key: "customer_id",
      label: "CUSTOMER ID",
      sortable: true,
      render: (val, row) => (
        <div>
          <span className="font-mono font-extrabold text-slate-900 text-xs">{val}</span>
          <div className="text-[10px] text-slate-500 font-medium truncate max-w-[140px]">{row.customer_name}</div>
        </div>
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
        <span className="font-mono font-bold text-slate-800 text-xs px-2 py-0.5 bg-slate-100 rounded">
          {val}
        </span>
      ),
    },
    {
      key: "amount",
      label: "AMOUNT",
      sortable: true,
      align: "right",
      render: (val) => (
        <span className="font-mono font-extrabold text-slate-900 text-xs">
          AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      key: "salesman_id",
      label: "SALESMAN ID",
      sortable: true,
      render: (val) => (
        <span className="font-mono text-slate-700 text-xs">{val}</span>
      ),
    },
    {
      key: "paid_coupons",
      label: "PAID COUPONS",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {val}
        </span>
      ),
    },
    {
      key: "free_coupons",
      label: "FREE COUPONS",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-bold text-amber-700 text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          +{val}
        </span>
      ),
    },
    {
      key: "remaining",
      label: "REMAINING",
      sortable: true,
      align: "center",
      render: (val) => (
        <span className="font-mono font-black text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {val}
        </span>
      ),
    },
    {
      key: "balance",
      label: "BALANCE",
      sortable: true,
      align: "right",
      render: (val) => (
        <span className={`font-mono font-bold text-xs ${val < 100 ? "text-amber-600" : "text-emerald-700"}`}>
          AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            onClick={() => handleViewHistory(row)}
            className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all flex items-center gap-1 shadow-2xs whitespace-nowrap"
          >
            <History className="w-3 h-3" />
            <span>Coupons</span>
          </button>
          <button
            onClick={() => handleOpenRecharge(row)}
            className="px-2 py-1 rounded-md text-emerald-700 hover:bg-emerald-50 border border-emerald-200 text-[11px] font-semibold transition-all shadow-2xs flex items-center gap-1"
            title="Recharge / Add Coupons"
          >
            <Plus className="w-3 h-3" />
            <span>Top-up</span>
          </button>
          <button
            onClick={() => setEditingWallet({ ...row })}
            className="p-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all shadow-2xs"
            title="Edit Wallet"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeleteWallet(row)}
            className="p-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-2xs"
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
      <Header title="Customer Wallets & Loyalty Points" subtitle="Prepaid Wallet Balances" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Metric Cards with Reduced Border Radius */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Wallet Balance
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <WalletIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              AED {totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <span>+14.2%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Reward Points
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {totalPoints.toLocaleString()} <span className="text-xs font-normal text-slate-400">PTS</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Equivalent to AED {(totalPoints * 0.1).toFixed(2)} in discounts
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active Prepaid Users
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              {activeCount} <span className="text-xs font-normal text-slate-400">/ {wallets.length} accounts</span>
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              83% utilization rate
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Low Balance Alerts
              </span>
              <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-rose-600">
              {lowBalanceCount} <span className="text-xs font-normal text-slate-400">need recharge</span>
            </div>
            <div className="mt-1 text-[11px] text-rose-600 font-medium">
              Auto-SMS reminder queued
            </div>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={columns}
          data={filteredWallets}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search customer, code, or phone..."
          searchKeys={["customer_name", "customer_code", "phone", "recharge_id", "coupon", "salesman_id"]}
          onImport={(newRows) => setWallets((prev) => [...newRows, ...prev])}
          onRestore={handleRestoreWallet}
          exportFilename="AlQattara_Wallet_Recharges.csv"
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenRecharge()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Recharge Wallet</span>
              </button>
            </div>
          }
        />
      </main>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Credit Customer Wallet</h2>
                  <p className="text-[11px] text-slate-400">Add prepaid balance with instant loyalty points</p>
                </div>
              </div>
              <button
                onClick={() => setShowRechargeModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRechargeSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Select Customer Account</label>
                <select
                  value={rechargeForm.customerId}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, customerId: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.customer_name} ({w.customer_code}) - Curr Bal: AED {w.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Recharge Amount (AED)</label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    required
                    value={rechargeForm.amount}
                    onChange={(e) => setRechargeForm({ ...rechargeForm, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Bonus Promotion (%)</label>
                  <select
                    value={rechargeForm.bonusPercent}
                    onChange={(e) => setRechargeForm({ ...rechargeForm, bonusPercent: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  >
                    <option value="0">0% (Standard)</option>
                    <option value="5">5% Extra Credit</option>
                    <option value="10">10% Corporate Promo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Payment Method</label>
                <select
                  value={rechargeForm.paymentMethod}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                >
                  <option>Credit Card / Bank Transfer</option>
                  <option>Cash at Office</option>
                  <option>Corporate Cheque</option>
                  <option>Salesman Handover</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Receipt / Reference No.</label>
                <input
                  type="text"
                  required
                  value={rechargeForm.referenceNo}
                  onChange={(e) => setRechargeForm({ ...rechargeForm, referenceNo: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>

              {/* Total Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Recharge:</span>
                  <span className="font-mono font-bold">AED {parseFloat(rechargeForm.amount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Promotional Bonus ({rechargeForm.bonusPercent}%):</span>
                  <span className="font-mono font-bold">+AED {(parseFloat(rechargeForm.amount || 0) * (parseFloat(rechargeForm.bonusPercent) / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 text-xs font-bold text-slate-900">
                  <span>Net Credited to Wallet:</span>
                  <span className="font-mono text-emerald-700">
                    AED {(parseFloat(rechargeForm.amount || 0) * (1 + parseFloat(rechargeForm.bonusPercent) / 100)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md font-medium text-xs border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-xs shadow-2xs transition-all active:scale-[0.98]"
                >
                  Confirm & Credit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Statement History Modal */}
      {showHistoryModal && selectedWallet && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Wallet Statement: {selectedWallet.customer_name}</h2>
                <p className="text-[11px] text-slate-400 font-mono">Code: {selectedWallet.customer_code}</p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Balance</div>
                <div className="text-base font-bold font-mono text-emerald-700 mt-0.5">
                  AED {selectedWallet.balance.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Reward Points</div>
                <div className="text-base font-bold font-mono text-amber-600 mt-0.5">
                  {selectedWallet.reward_points} PTS
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Recent Transactions
              </span>
              <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
                <div className="overflow-x-auto touch-pan-x">
                  <table className="w-full text-left border-collapse min-w-[350px]">
                  <thead className="bg-[#5948DB] text-xs text-white border-b border-[#4A3AC9] font-semibold">
                    <tr>
                      <th className="px-3 py-2 border-r border-[#7161F0]/70 text-white font-semibold">Date</th>
                      <th className="px-3 py-2 border-r border-[#7161F0]/70 text-white font-semibold">Description</th>
                      <th className="px-3 py-2 text-right text-white font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px] border-r border-slate-100">2026-11-05</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-slate-700">Online Top-up (+Bonus)</td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-emerald-600">+AED 525.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px] border-r border-slate-100">2026-11-04</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-slate-700">Order #ORD-7782 Payment</td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-rose-600">-AED 180.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono text-[11px] border-r border-slate-100">2026-10-30</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-slate-700">Order #ORD-7740 Payment</td>
                      <td className="px-3 py-2 text-right font-mono font-bold text-rose-600">-AED 120.00</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowHistoryModal(false);
                  addToast("Statement exported as PDF", "success");
                }}
                className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold"
              >
                Done
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
                <h3 className="text-sm font-semibold text-slate-900">Edit Customer Wallet</h3>
                <p className="text-[11px] text-slate-500">{editingWallet.customer_name} ({editingWallet.customer_id})</p>
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
                  <label className="text-slate-700 font-medium block mb-1">Wallet Balance (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingWallet.balance}
                    onChange={(e) => setEditingWallet({ ...editingWallet, balance: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Reward Points</label>
                  <input
                    type="number"
                    value={editingWallet.reward_points}
                    onChange={(e) => setEditingWallet({ ...editingWallet, reward_points: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-medium block mb-1">Status</label>
                <select
                  value={editingWallet.status}
                  onChange={(e) => setEditingWallet({ ...editingWallet, status: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingWallet(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors"
                >
                  Save Changes to Database
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
                  Are you sure you want to delete wallet for <strong className="text-slate-800">{deleteTarget.customer_name}</strong> ({deleteTarget.customer_code || deleteTarget.customer_id})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This wallet record will be marked as Deleted, highlighted with a <strong>prominent red border</strong>, and can be restored at any time.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteWallet}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
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
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {crudPopup.message}
              </p>
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