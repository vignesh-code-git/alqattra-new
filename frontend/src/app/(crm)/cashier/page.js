"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Home,
  ArrowUpDown,
  DollarSign,
  CheckCircle2,
  Clock,
  Users,
  ShoppingCart,
  CreditCard,
  X,
  Search,
} from "lucide-react";

const INITIAL_SALESMAN_COLLECTIONS = [
  {
    id: 1,
    salesman_id: "109",
    salesman_name: "ALTHAF",
    route_id: "6329",
    total_orders: 145,
    total_amount: "4520.00",
    received_amount: "2500.00",
    pending_amount: "2020.00",
    last_updated: "08/09/2026",
  },
  {
    id: 2,
    salesman_id: "110",
    salesman_name: "SHIBIL",
    route_id: "1234",
    total_orders: 210,
    total_amount: "6840.50",
    received_amount: "4000.00",
    pending_amount: "2840.50",
    last_updated: "08/09/2026",
  },
  {
    id: 3,
    salesman_id: "111",
    salesman_name: "AMJATH",
    route_id: "6335",
    total_orders: 188,
    total_amount: "5410.00",
    received_amount: "3200.00",
    pending_amount: "2210.00",
    last_updated: "08/09/2026",
  },
  {
    id: 4,
    salesman_id: "112",
    salesman_name: "MALAKA",
    route_id: "6350",
    total_orders: 265,
    total_amount: "8445.31",
    received_amount: "5000.00",
    pending_amount: "3445.31",
    last_updated: "08/09/2026",
  },
  {
    id: 5,
    salesman_id: "113",
    salesman_name: "SAGAR",
    route_id: "6352",
    total_orders: 194,
    total_amount: "6517.77",
    received_amount: "3500.00",
    pending_amount: "3017.77",
    last_updated: "08/09/2026",
  },
  {
    id: 6,
    salesman_id: "114",
    salesman_name: "RAYAN",
    route_id: "6354",
    total_orders: 176,
    total_amount: "6437.22",
    received_amount: "3000.00",
    pending_amount: "3437.22",
    last_updated: "08/09/2026",
  },
  {
    id: 7,
    salesman_id: "115",
    salesman_name: "SAMUEL",
    route_id: "6356",
    total_orders: 160,
    total_amount: "6218.05",
    received_amount: "2450.00",
    pending_amount: "3768.05",
    last_updated: "08/09/2026",
  },
  {
    id: 8,
    salesman_id: "116",
    salesman_name: "HABTAMU",
    route_id: "6357",
    total_orders: 112,
    total_amount: "2890.00",
    received_amount: "1000.00",
    pending_amount: "1890.00",
    last_updated: "07/09/2026",
  },
  {
    id: 9,
    salesman_id: "117",
    salesman_name: "ARSLAN",
    route_id: "6358",
    total_orders: 98,
    total_amount: "2499.84",
    received_amount: "500.00",
    pending_amount: "1999.84",
    last_updated: "07/09/2026",
  },
  {
    id: 10,
    salesman_id: "118",
    salesman_name: "NURANOWAR",
    route_id: "8066",
    total_orders: 85,
    total_amount: "2300.00",
    received_amount: "500.00",
    pending_amount: "1800.00",
    last_updated: "07/09/2026",
  },
];

const INITIAL_COLLECTED_PAYMENTS = [
  {
    id: 1,
    date: "08/09/2026",
    salesman_id: "38",
    amount: "AED 475.35",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 2,
    date: "08/09/2026",
    salesman_id: "56",
    amount: "AED 551.40",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 3,
    date: "08/09/2026",
    salesman_id: "32",
    amount: "AED 1230.00",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 4,
    date: "08/09/2026",
    salesman_id: "47",
    amount: "AED 890.50",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 5,
    date: "07/09/2026",
    salesman_id: "53",
    amount: "AED 640.00",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 6,
    date: "07/09/2026",
    salesman_id: "40",
    amount: "AED 410.25",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 7,
    date: "07/09/2026",
    salesman_id: "48",
    amount: "AED 1120.00",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 8,
    date: "07/09/2026",
    salesman_id: "84",
    amount: "AED 780.00",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 9,
    date: "06/09/2026",
    salesman_id: "57",
    amount: "AED 950.00",
    method: "Cash",
    from: "Salesman",
    note: "-",
  },
  {
    id: 10,
    date: "06/09/2026",
    salesman_id: "119",
    amount: "AED 10.00",
    method: "Card",
    from: "Customer",
    note: "-",
  },
];

const INITIAL_CUSTOMER_CREDITS = [
  {
    id: 1,
    customer_id: "18146",
    name: "Hamoud Al Amry",
    mobile: "0504471122",
    total_due: "140.00",
    last_pending: "25/05/2026",
    pending_orders: 4,
  },
  {
    id: 2,
    customer_id: "112347",
    name: "Naser Jumah",
    mobile: "0506632211",
    total_due: "85.00",
    last_pending: "12/06/2026",
    pending_orders: 2,
  },
  {
    id: 3,
    customer_id: "113164",
    name: "HAlAM",
    mobile: "0553319900",
    total_due: "210.00",
    last_pending: "18/07/2026",
    pending_orders: 6,
  },
  {
    id: 4,
    customer_id: "112467",
    name: "Cure Plus Medical Centre",
    mobile: "037551122",
    total_due: "1450.00",
    last_pending: "01/08/2026",
    pending_orders: 15,
  },
  {
    id: 5,
    customer_id: "114890",
    name: "Saeed Al Darmaki",
    mobile: "0509981234",
    total_due: "65.00",
    last_pending: "14/08/2026",
    pending_orders: 2,
  },
  {
    id: 6,
    customer_id: "115201",
    name: "Al Jimi Pharmacy",
    mobile: "037623344",
    total_due: "520.00",
    last_pending: "20/08/2026",
    pending_orders: 8,
  },
  {
    id: 7,
    customer_id: "116044",
    name: "Rashid Al Nuaimi",
    mobile: "0521145566",
    total_due: "95.00",
    last_pending: "22/08/2026",
    pending_orders: 3,
  },
  {
    id: 8,
    customer_id: "116892",
    name: "Golden Star Restaurant",
    mobile: "037649988",
    total_due: "890.00",
    last_pending: "28/08/2026",
    pending_orders: 11,
  },
  {
    id: 9,
    customer_id: "117310",
    name: "Fatima Al Shamsi",
    mobile: "0507765432",
    total_due: "45.00",
    last_pending: "02/09/2026",
    pending_orders: 1,
  },
  {
    id: 10,
    customer_id: "118005",
    name: "Dar Al Shifa Clinic",
    mobile: "026334455",
    total_due: "1120.00",
    last_pending: "05/09/2026",
    pending_orders: 12,
  },
];

export default function CashierPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("salesman"); // "salesman" | "credits" | "statement"
  const [showCollectedView, setShowCollectedView] = useState(false);

  const [salesmanRows, setSalesmanRows] = useState(INITIAL_SALESMAN_COLLECTIONS);
  const [collectedPayments, setCollectedPayments] = useState(INITIAL_COLLECTED_PAYMENTS);
  const [customerCredits, setCustomerCredits] = useState(INITIAL_CUSTOMER_CREDITS);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Collect Modal State
  const [collectModal, setCollectModal] = useState(null);
  const [collectAmount, setCollectAmount] = useState("");
  const [collectMethod, setCollectMethod] = useState("Cash");
  const [collectNote, setCollectNote] = useState("");

  const filteredSalesmen = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return salesmanRows;
    return salesmanRows.filter(
      (s) =>
        s.salesman_name.toLowerCase().includes(q) ||
        s.salesman_id.toLowerCase().includes(q) ||
        s.route_id.toLowerCase().includes(q)
    );
  }, [salesmanRows, searchQuery]);

  const filteredCredits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return customerCredits;
    return customerCredits.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.customer_id.toLowerCase().includes(q) ||
        c.mobile.toLowerCase().includes(q)
    );
  }, [customerCredits, searchQuery]);

  const handleConfirmCollect = (e) => {
    e.preventDefault();
    if (!collectModal || !collectAmount) return;
    const amt = Number(collectAmount) || 0;

    if (collectModal.type === "salesman") {
      setSalesmanRows((prev) =>
        prev.map((s) =>
          s.id === collectModal.row.id
            ? {
                ...s,
                received_amount: (Number(s.received_amount) + amt).toFixed(2),
                pending_amount: Math.max(0, Number(s.pending_amount) - amt).toFixed(2),
              }
            : s
        )
      );
      setCollectedPayments((prev) => [
        {
          id: Date.now(),
          date: "08/09/2026",
          salesman_id: collectModal.row.salesman_id,
          amount: `AED ${amt.toFixed(2)}`,
          method: collectMethod,
          from: "Salesman",
          note: collectNote || "-",
        },
        ...prev,
      ]);
      addToast(
        `Collected AED ${amt.toFixed(2)} from Salesman ${collectModal.row.salesman_name}`,
        "success"
      );
    } else {
      setCustomerCredits((prev) =>
        prev.map((c) =>
          c.id === collectModal.row.id
            ? {
                ...c,
                total_due: Math.max(0, Number(c.total_due) - amt).toFixed(2),
              }
            : c
        )
      );
      addToast(`Collected AED ${amt.toFixed(2)} from ${collectModal.row.name}`, "success");
    }
    setCollectModal(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans pb-12">
      <Header title="Cashier" subtitle="Salesman Collection" />

      {/* iOS Translucent Glass Top Hero Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 transition-all">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-semibold text-base text-[#1C1C1E] tracking-tight">Cashier</span>
          <span className="text-[#8E8E93] text-xs">/</span>
          <span className="text-[#8E8E93] text-xs font-medium">
            {showCollectedView
              ? "Collected Payments"
              : activeTab === "salesman"
              ? "Salesman Collection"
              : activeTab === "credits"
              ? "Customer Credits"
              : "Customer Statement"}{" "}
            • ALL
          </span>
        </div>

        {showCollectedView ? (
          <button
            type="button"
            onClick={() => setShowCollectedView(false)}
            className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-all cursor-pointer"
          >
            Back to Cashier
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowCollectedView(true)}
            className="px-4 py-2 rounded-full bg-[#FF9500] hover:bg-[#E08500] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(255,149,0,0.25)] transition-all cursor-pointer"
          >
            Collected Payments
          </button>
        )}
      </div>

      {/* iOS Segmented Tabs */}
      {!showCollectedView && (
        <div className="px-6 pt-5 pb-1 flex">
          <div className="bg-[#E5E5EA]/80 p-1 rounded-full border border-[#3C3C43]/5 inline-flex gap-1 backdrop-blur-md">
            {[
              { id: "salesman", label: "Salesman Collection" },
              { id: "credits", label: "Customer Credits" },
              { id: "statement", label: "Customer Statement" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery("");
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-[#1C1C1E] shadow-sm"
                    : "text-[#8E8E93] hover:text-[#1C1C1E]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 flex-1 space-y-6">
        {/* COLLECTED PAYMENTS SUB-VIEW (collected payments.png) */}
        {showCollectedView ? (
          <>
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Filter Payments
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
                    Salesman
                  </label>
                  <input
                    type="text"
                    placeholder="Salesman ID"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Payment Method
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All Methods</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Collection From
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All</option>
                    <option value="Salesman">Salesman</option>
                    <option value="Customer">Customer</option>
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
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    TOTAL COLLECTED
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#1C1C1E] mt-1">AED 572,970.07</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    CASH PAYMENTS
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#1C1C1E] mt-1">AED 572,960.07</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    CARD PAYMENTS
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#1C1C1E] mt-1">AED 10.00</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#5856D6]/10 text-[#5856D6] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Payment Collection Details
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
                      {[
                        "DATE",
                        "SALESMAN ID",
                        "AMOUNT",
                        "PAYMENT METHOD",
                        "COLLECTION FROM",
                        "NOTE",
                      ].map((c) => (
                        <th key={c} className="py-3 px-6">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {collectedPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 px-6 font-medium">{p.date}</td>
                        <td className="py-3.5 px-6">{p.salesman_id}</td>
                        <td className="py-3.5 px-6 font-semibold text-[#34C759]">{p.amount}</td>
                        <td className="py-3.5 px-6">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E5E5EA] text-[#1C1C1E]">
                            {p.method}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-[#8E8E93]">{p.from}</td>
                        <td className="py-3.5 px-6 text-[#8E8E93]">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeTab === "salesman" ? (
          /* TAB 1: SALESMAN COLLECTION (cashier.png) */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">TOTAL AMOUNT</div>
                  <div className="text-2xl font-bold tracking-tight text-[#1C1C1E] mt-1">AED 52,078.69</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    RECEIVED AMOUNT
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#1C1C1E] mt-1">AED 25,650.00</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    PENDING AMOUNT
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#FF9500] mt-1">AED 26,428.69</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Pending Payments</h2>
              </div>

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
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search salesman..."
                      className="border border-[#3C3C43]/15 bg-white rounded-full pl-3 pr-3 py-1.5 w-48 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
                      {[
                        "SALESMAN ID",
                        "SALESMAN NAME",
                        "ROUTE ID",
                        "TOTAL ORDERS",
                        "TOTAL AMOUNT",
                        "RECEIVED AMOUNT",
                        "PENDING AMOUNT",
                        "LAST UPDATED",
                        "ACTION",
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
                    {filteredSalesmen.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{row.salesman_id}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#1C1C1E]">
                          {row.salesman_name}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs">{row.route_id}</td>
                        <td className="py-3.5 px-4">{row.total_orders}</td>
                        <td className="py-3.5 px-4 font-medium">AED {row.total_amount}</td>
                        <td className="py-3.5 px-4 text-[#34C759] font-semibold">
                          AED {row.received_amount}
                        </td>
                        <td className="py-3.5 px-4 text-[#FF3B30] font-semibold">
                          AED {row.pending_amount}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{row.last_updated}</td>
                        <td className="py-3.5 pl-4 pr-6">
                          <button
                            type="button"
                            onClick={() => {
                              setCollectModal({ type: "salesman", row });
                              setCollectAmount(row.pending_amount);
                              setCollectMethod("Cash");
                              setCollectNote("");
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-[11px] font-semibold shadow-[0_2px_6px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                          >
                            Collect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : activeTab === "credits" ? (
          /* TAB 2: CUSTOMER CREDITS (customer credits.png) */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">TOTAL DUE</div>
                  <div className="text-2xl font-bold tracking-tight text-[#FF3B30] mt-1">AED 737,496.90</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    PENDING ORDERS
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#FF9500] mt-1">7962</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    CUSTOMER COUNT
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-[#007AFF] mt-1">878 / 579</div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-[#E5E5EA] flex items-center justify-between">
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Customer Credits</h2>
              </div>

              <div className="px-6 py-3.5 bg-[#F2F2F7]/50 border-b border-[#E5E5EA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select className="border border-[#3C3C43]/15 rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E] focus:outline-none">
                    <option>10</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Search:</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search credit..."
                    className="border border-[#3C3C43]/15 bg-white rounded-full px-3.5 py-1.5 w-48 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F2F2F7] border-y border-[#3C3C43]/15 text-[11px] font-semibold text-[#636366] uppercase tracking-wider">
                      {[
                        "CUSTOMER ID",
                        "NAME",
                        "MOBILE",
                        "TOTAL DUE",
                        "LAST PENDING",
                        "PENDING ORDERS",
                        "ACTION",
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
                    {filteredCredits.map((c) => (
                      <tr key={c.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{c.customer_id}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#1C1C1E]">{c.name}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{c.mobile}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#FF3B30]">
                          AED {c.total_due}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{c.last_pending}</td>
                        <td className="py-3.5 px-4 font-medium">{c.pending_orders}</td>
                        <td className="py-3.5 pl-4 pr-6">
                          <button
                            type="button"
                            onClick={() => {
                              setCollectModal({ type: "customer", row: c });
                              setCollectAmount(c.total_due);
                              setCollectMethod("Cash");
                              setCollectNote("");
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-[11px] font-semibold shadow-[0_2px_6px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                          >
                            Collect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* TAB 3: CUSTOMER STATEMENT (custm -statement.png) */
          <>
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                Statement Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Customer ID"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Sales Man I.D
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Salesman ID"
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                  />
                </div>
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
                    Pending Payment
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="">All</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                    Include Assets
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
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
                  onClick={() => addToast("Customer Statement PDF downloaded", "success")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
                >
                  Download Report
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="bg-linear-to-r from-[#007AFF] to-[#5856D6] px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-semibold text-base tracking-tight">
                  Customer Statement
                </h2>
              </div>
              <div className="p-12 text-center text-xs text-[#8E8E93]">
                Select a Customer ID above and click Download Report to generate statement.
              </div>
            </div>
          </>
        )}
      </div>

      {/* COLLECT PAYMENT MODAL */}
      {collectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-[15px] font-semibold text-[#1C1C1E]">
                Collect Payment -{" "}
                {collectModal.type === "salesman"
                  ? collectModal.row.salesman_name
                  : collectModal.row.name}
              </h3>
              <button
                type="button"
                onClick={() => setCollectModal(null)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleConfirmCollect} className="p-6 space-y-4 text-xs text-[#1C1C1E]">
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Amount (AED)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={collectAmount}
                  onChange={(e) => setCollectAmount(e.target.value)}
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Payment Method
                </label>
                <select
                  value={collectMethod}
                  onChange={(e) => setCollectMethod(e.target.value)}
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Note
                </label>
                <input
                  type="text"
                  placeholder="Optional reference note"
                  value={collectNote}
                  onChange={(e) => setCollectNote(e.target.value)}
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setCollectModal(null)}
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34C759] hover:bg-[#2EB04F] text-white font-semibold shadow-[0_2px_8px_rgba(52,199,89,0.25)] transition-all cursor-pointer"
                >
                  Confirm Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
