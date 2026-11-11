"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import {
  Home,
  ArrowUpDown,
  Download,
  X,
  Search,
  Package,
  ShoppingCart,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock,
} from "lucide-react";

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: "AL NEBRAS SCHOOL",
    customer_id: "197301",
    contact: "+971 55 727 2628",
    alt_contact: "N/A",
    registered_on: "08/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "SCHOOL AREA",
    route: "6347",
    address: "Falaj hazza",
    apartment: "-",
    location: "24.1806642, 55.7369889",
    delivery_day: "Sunday",
    language: "EN",
    created_by: "47",
    representative: "N/A",
    is_company: false,
    is_credit: false,
    is_verified: false,
    wallet_balance: 0,
    coupon_available: 10,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 2,
    name: "Ameen",
    customer_id: "197300",
    contact: "055 655 3977",
    alt_contact: "N/A",
    registered_on: "08/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "KHABISI",
    route: "6335",
    address: "Al Jimi",
    apartment: "Villa 12",
    location: "24.2075, 55.7447",
    delivery_day: "Monday",
    language: "AR",
    created_by: "56",
    representative: "56 - ANAS",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 0,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 3,
    name: "SUHAIL ALI",
    customer_id: "197299",
    contact: "0561900562",
    alt_contact: "N/A",
    registered_on: "08/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "MANAZIF",
    route: "6350",
    address: "Manazif St",
    apartment: "14",
    location: "24.2150, 55.7520",
    delivery_day: "Saturday",
    language: "AR",
    created_by: "56",
    representative: "56 - ANAS",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 20,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 4,
    name: "KHALID AL BLOOSHI",
    customer_id: "197298",
    contact: "0504412390",
    alt_contact: "N/A",
    registered_on: "08/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "SAROOJ",
    route: "6354",
    address: "Sarooj Area",
    apartment: "8",
    location: "24.1980, 55.7600",
    delivery_day: "Tuesday",
    language: "AR",
    created_by: "47",
    representative: "47 - RAHMAN",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 5,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 5,
    name: "NOORA AL KAABI",
    customer_id: "197297",
    contact: "0528891023",
    alt_contact: "N/A",
    registered_on: "08/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "JAHILI",
    route: "6354",
    address: "Al Jahili",
    apartment: "22",
    location: "24.2100, 55.7500",
    delivery_day: "Wednesday",
    language: "AR",
    created_by: "47",
    representative: "47 - RAHMAN",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 0,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 6,
    name: "ROYAL PALACE HOTEL",
    customer_id: "197296",
    contact: "037665544",
    alt_contact: "N/A",
    registered_on: "07/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "ASHAREJ",
    route: "6352",
    address: "Asharej Main Rd",
    apartment: "-",
    location: "24.1900, 55.7300",
    delivery_day: "Thursday",
    language: "EN",
    created_by: "32",
    representative: "32 - NOOR",
    is_company: true,
    is_credit: true,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 0,
    pending_payment: "120.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 7,
    name: "SALEM RASHID",
    customer_id: "197295",
    contact: "0509988112",
    alt_contact: "N/A",
    registered_on: "07/09/2026",
    recent_order: "08/09/2026",
    city: "ABU_DHABI",
    zone: "MARKHANIA",
    route: "6352",
    address: "Markhania",
    apartment: "5",
    location: "24.4539, 54.3773",
    delivery_day: "Sunday",
    language: "AR",
    created_by: "57",
    representative: "57 - ISAHAQ",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 15,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 8,
    name: "MARIAM AL DHAHERI",
    customer_id: "197294",
    contact: "0553322119",
    alt_contact: "N/A",
    registered_on: "07/09/2026",
    recent_order: "08/09/2026",
    city: "AL_AIN",
    zone: "MUTHARID",
    route: "6328",
    address: "Mutharid",
    apartment: "19",
    location: "24.2050, 55.7480",
    delivery_day: "Monday",
    language: "AR",
    created_by: "32",
    representative: "32 - NOOR",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 0,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 9,
    name: "ABDULLAH HASSAN",
    customer_id: "197293",
    contact: "0564455667",
    alt_contact: "N/A",
    registered_on: "06/09/2026",
    recent_order: "07/09/2026",
    city: "ABU_DHABI",
    zone: "KHABISI",
    route: "3115",
    address: "Abu Dhabi Sector 4",
    apartment: "3",
    location: "24.4600, 54.3700",
    delivery_day: "Saturday",
    language: "AR",
    created_by: "119",
    representative: "119 - KRISHNADAS",
    is_company: false,
    is_credit: false,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 10,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
  {
    id: 10,
    name: "ZAYED MEDICAL CLINIC",
    customer_id: "197292",
    contact: "026554433",
    alt_contact: "N/A",
    registered_on: "06/09/2026",
    recent_order: "07/09/2026",
    city: "ABU_DHABI",
    zone: "ASHAREJ",
    route: "9302",
    address: "Corniche Road",
    apartment: "Bldg 9",
    location: "24.4700, 54.3600",
    delivery_day: "Tuesday",
    language: "EN",
    created_by: "136",
    representative: "136 - HARIS",
    is_company: true,
    is_credit: true,
    is_verified: true,
    wallet_balance: 0,
    coupon_available: 0,
    pending_payment: "0.00",
    pricing: [{ product: "5 gal water", price: "5" }],
  },
];

const INITIAL_DELETED_CUSTOMERS = [
  {
    id: 101,
    name: "Ahmed Baloshi",
    customer_id: "197285",
    contact: "+971 50 499 4449",
    registered_on: "02/09/2026",
    recent_delivery: "02/09/2026",
    wallet_balance: "0",
    city: "AL_AIN",
    address: "Al Jimi",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 102,
    name: "FIYMING",
    customer_id: "112606",
    contact: "0566078671",
    registered_on: "12/07/2025",
    recent_delivery: "29/11/2025",
    wallet_balance: "0",
    city: "AL_AIN",
    address: "falaj hazza",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 103,
    name: "Ali juma",
    customer_id: "197258",
    contact: "0506635325",
    registered_on: "26/08/2026",
    recent_delivery: "26/08/2026",
    wallet_balance: "0",
    city: "AL_AIN",
    address: "Muwaiji",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 104,
    name: "Yasir Khan 117570",
    customer_id: "17864",
    contact: "0555966824",
    registered_on: "12/05/2024",
    recent_delivery: "15/06/2026",
    wallet_balance: "0",
    city: "ABU_DHABI",
    address: "Mussafah",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 105,
    name: "Monudeen",
    customer_id: "296398",
    contact: "0525915022",
    registered_on: "18/11/2025",
    recent_delivery: "01/08/2026",
    wallet_balance: "0",
    city: "ABU_DHABI",
    address: "Baniyas",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 106,
    name: "Chantilly lace fashion LLC",
    customer_id: "296032",
    contact: "0506165352",
    registered_on: "25/08/2025",
    recent_delivery: "12/04/2026",
    wallet_balance: "0",
    city: "ABU_DHABI",
    address: "Khalidiya",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 107,
    name: "Waleedh Ibrahim 117825",
    customer_id: "18200",
    contact: "0508214780",
    registered_on: "12/05/2024",
    recent_delivery: "19/05/2026",
    wallet_balance: "0",
    city: "ABU_DHABI",
    address: "Shabiya",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 108,
    name: "Muhammad saleem",
    customer_id: "296275",
    contact: "0557941328",
    registered_on: "14/10/2025",
    recent_delivery: "22/07/2026",
    wallet_balance: "0",
    city: "ABU_DHABI",
    address: "Muroor",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 109,
    name: "ARJ WATER TECHNOLOGY L.L.C.",
    customer_id: "110969",
    contact: "0501239874",
    registered_on: "12/07/2025",
    recent_delivery: "10/03/2026",
    wallet_balance: "0",
    city: "AL_AIN",
    address: "Sanaiya",
    status: "Inactive",
    caption: "No Bottle",
  },
  {
    id: 110,
    name: "Mohammed Afdal",
    customer_id: "197191",
    contact: "0568831920",
    registered_on: "10/08/2026",
    recent_delivery: "18/08/2026",
    wallet_balance: "0",
    city: "AL_AIN",
    address: "Zakhir",
    status: "Inactive",
    caption: "No Bottle",
  },
];

const RECHARGE_COUPON_CODES = [
  "F-bb84f862-f2eb-4bf3-8826-ab2435fc55c3",
  "F-26337b09-7176-46a2-af83-c6776cb9ae00",
  "F-f2dc0526-efbe-414b-a18a-509fc7fc0193",
  "F-b012a101-754c-43fd-a224-c298f6185a08",
  "F-0852586c-38ea-4496-8c5f-cf473ee35c9c",
  "F-00414502-7944-4cd9-b1b4-ef013621a976",
  "F-12d1a002-7901-43ad-b2bf-88a684523836",
  "F-6182c4e1-8176-4120-90b5-091f925f4552",
  "F-79565e10-2045-419c-9970-7404073f28c4",
  "F-b91042c7-5791-49e8-8d24-685535998902",
];

export default function CustomersPage() {
  const { addToast } = useToast();
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [deletedCustomers, setDeletedCustomers] = useState(INITIAL_DELETED_CUSTOMERS);

  // "list" | "deleted" | "new" | "edit" | "transactions"
  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Selected customer for Details Modal / Edit / Transactions
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Transactions 4-tab state
  const [txTab, setTxTab] = useState("asset"); // "asset" | "order" | "payment" | "wallet"
  const [assetSummaryDrawerOpen, setAssetSummaryDrawerOpen] = useState(false);
  const [returnAssetModal, setReturnAssetModal] = useState(null);
  const [txOrderModalOpen, setTxOrderModalOpen] = useState(false);
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);

  // New / Edit Customer Form State
  const [customerForm, setCustomerForm] = useState({
    name: "",
    contact: "",
    alt_contact: "",
    customer_id: "",
    language: "EN",
    created_by: "Rouda",
    is_company: false,
    is_credit: false,
    is_verified: false,
    zone: "SCHOOL AREA",
    route: "6347",
    address: "",
    apartment: "",
    location: "",
    city: "AL_AIN",
    delivery_day: "Tuesday",
    representative: "",
    pricing: [{ product: "5 gal water", price: "5" }],
  });

  const filteredCustomers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.customer_id.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
    );
  }, [customers, searchQuery]);

  const filteredDeleted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return deletedCustomers;
    return deletedCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.customer_id.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q)
    );
  }, [deletedCustomers, searchQuery]);

  const openNewCustomerView = () => {
    setCustomerForm({
      name: "",
      contact: "",
      alt_contact: "",
      customer_id: String(197302 + customers.length),
      language: "EN",
      created_by: "Rouda",
      is_company: false,
      is_credit: false,
      is_verified: false,
      zone: "",
      route: "",
      address: "",
      apartment: "",
      location: "",
      city: "",
      delivery_day: "",
      representative: "",
      pricing: [{ product: "5 gal water", price: "" }],
    });
    setViewMode("new");
  };

  const openEditCustomerView = (cust) => {
    setDetailsModalOpen(false);
    setSelectedCustomer(cust);
    setCustomerForm({
      name: cust.name,
      contact: cust.contact,
      alt_contact: cust.alt_contact === "N/A" ? "" : cust.alt_contact,
      customer_id: cust.customer_id,
      language: cust.language || "EN",
      created_by: cust.created_by || "47",
      is_company: Boolean(cust.is_company),
      is_credit: Boolean(cust.is_credit),
      is_verified: Boolean(cust.is_verified),
      zone: cust.zone || "SCHOOL AREA",
      route: cust.route || "6347",
      address: cust.address || "Falaj hazza",
      apartment: cust.apartment || "",
      location: cust.location || "24.1806642, 55.7369889",
      city: cust.city || "AL_AIN",
      delivery_day: cust.delivery_day || "Tuesday",
      representative: cust.representative === "N/A" ? "" : cust.representative,
      pricing: cust.pricing?.length ? [...cust.pricing] : [{ product: "5 gal water", price: "5" }],
    });
    setViewMode("edit");
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!customerForm.name.trim() || !customerForm.contact.trim()) {
      addToast("Please fill in Full Name and Mobile Number", "error");
      return;
    }
    if (viewMode === "edit" && selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? {
                ...c,
                ...customerForm,
                alt_contact: customerForm.alt_contact || "N/A",
                representative: customerForm.representative || "N/A",
              }
            : c
        )
      );
      addToast(`Customer "${customerForm.name}" updated successfully`, "success");
    } else {
      const created = {
        id: Date.now(),
        ...customerForm,
        alt_contact: customerForm.alt_contact || "N/A",
        registered_on: "08/09/2026",
        recent_order: "08/09/2026",
        city: customerForm.city || "AL_AIN",
        delivery_day: customerForm.delivery_day || "Sunday",
        wallet_balance: 0,
        coupon_available: 0,
        pending_payment: "0.00",
      };
      setCustomers((prev) => [created, ...prev]);
      addToast(`Customer "${created.name}" created successfully`, "success");
    }
    setViewMode("list");
  };

  const handleDeleteCustomer = (cust) => {
    setDetailsModalOpen(false);
    setCustomers((prev) => prev.filter((c) => c.id !== cust.id));
    setDeletedCustomers((prev) => [
      {
        id: cust.id,
        name: cust.name,
        customer_id: cust.customer_id,
        contact: cust.contact,
        registered_on: cust.registered_on,
        recent_delivery: cust.recent_order,
        wallet_balance: String(cust.wallet_balance || 0),
        city: cust.city,
        address: cust.address || "Al Ain",
        status: "Inactive",
        caption: "No Bottle",
      },
      ...prev,
    ]);
    addToast(`Customer "${cust.name}" moved to Deleted Customers`, "info");
  };

  const handleRestoreCustomer = (delCust) => {
    setDeletedCustomers((prev) => prev.filter((c) => c.id !== delCust.id));
    setCustomers((prev) => [
      {
        id: delCust.id,
        name: delCust.name,
        customer_id: delCust.customer_id,
        contact: delCust.contact,
        alt_contact: "N/A",
        registered_on: delCust.registered_on,
        recent_order: delCust.recent_delivery,
        city: delCust.city,
        zone: "KHABISI",
        route: "6335",
        address: delCust.address,
        apartment: "-",
        location: "24.2075, 55.7447",
        delivery_day: "Sunday",
        language: "EN",
        created_by: "47",
        representative: "N/A",
        is_company: false,
        is_credit: false,
        is_verified: false,
        wallet_balance: 0,
        coupon_available: 0,
        pending_payment: "0.00",
        pricing: [{ product: "5 gal water", price: "5" }],
      },
      ...prev,
    ]);
    addToast(`Restored customer "${delCust.name}"`, "success");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display',sans-serif]">
      <Header title="Customer Dashboard" subtitle="Manage Customers" />

      {/* iOS Top Hero Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-[#3C3C43]/10 px-6 py-4 flex items-center justify-between sticky top-16 z-20">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-semibold text-base tracking-tight text-[#1C1C1E]">
            {viewMode === "list"
              ? "Customer Dashboard"
              : viewMode === "transactions"
              ? "Transaction History"
              : "Customers"}
          </span>
          <Home className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span className="text-[#8E8E93] text-xs">
            /{" "}
            {viewMode === "new"
              ? "New Customer"
              : viewMode === "edit"
              ? "Edit Customer"
              : viewMode === "transactions"
              ? "Customer Transactions"
              : "Manage Customers"}{" "}
            / ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setViewMode("deleted")}
              className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold transition cursor-pointer active:scale-95"
            >
              Deleted Customer
            </button>
            <button
              type="button"
              onClick={openNewCustomerView}
              className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
            >
              + New Customer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold transition cursor-pointer active:scale-95"
          >
            Back to Customers
          </button>
        )}
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* 1. MAIN CUSTOMERS LIST (customers.png) */}
        {viewMode === "list" && (
          <>
            {/* Filter Customers iOS Card */}
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 p-5">
              <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">
                Filter Customers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10.5px] font-semibold text-[#8E8E93] uppercase mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3 py-2 bg-[#F2F2F7] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-[#8E8E93] uppercase mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3 py-2 bg-[#F2F2F7] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Customer
                  </label>
                  <input
                    type="text"
                    placeholder="Search name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-[#3C3C43]/15 rounded-xl px-3 py-2 bg-[#F2F2F7] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-[#8E8E93] uppercase mb-1">
                    City
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 rounded-xl px-3 py-2 bg-[#F2F2F7] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]">
                    <option value="">All Cities</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10.5px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Zone
                  </label>
                  <select className="w-full border border-[#3C3C43]/15 rounded-xl px-3 py-2 bg-[#F2F2F7] text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]">
                    <option value="">All Zones</option>
                    <option value="SCHOOL AREA">SCHOOL AREA</option>
                    <option value="KHABISI">KHABISI</option>
                    <option value="MANAZIF">MANAZIF</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 mt-4">
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Customer filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Customer Management Table Card */}
            <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                    Customer Management
                  </h2>
                  <p className="text-[#8E8E93] text-xs mt-0.5">
                    Live customer directory, deliveries and transactions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addToast("Exported customer records", "success")}
                  className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-[0_2px_8px_rgba(0,122,255,0.25)] active:scale-95 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>

              <div className="px-6 py-4 bg-[#F2F2F7]/50 border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="border border-[#3C3C43]/15 rounded-xl px-3 py-1.5 bg-white text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
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
                    placeholder="Search customers..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-[#3C3C43]/15 rounded-full px-3.5 py-1.5 w-52 bg-white text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                      {[
                        "CUSTOMER NAME",
                        "CUSTOMER ID",
                        "CONTACT",
                        "REGISTERED ON",
                        "RECENT ORDER",
                        "CITY",
                        "DELIVERY DAY",
                        "ACTIONS",
                      ].map((col) => (
                        <th key={col} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{col}</span>
                            <ArrowUpDown className="w-3 h-3 text-white/70 shrink-0" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3C3C43]/10 text-[12px] text-[#1C1C1E]">
                    {filteredCustomers.slice(0, entriesPerPage).map((cust) => (
                      <tr key={cust.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">{cust.name}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93] font-mono">{cust.customer_id}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{cust.contact}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{cust.registered_on}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{cust.recent_order}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{cust.city}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{cust.delivery_day}</td>
                        <td className="py-3.5 pl-4 pr-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setDetailsModalOpen(true);
                              }}
                              className="px-3 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setTxTab("asset");
                                setViewMode("transactions");
                              }}
                              className="px-3 py-1 rounded-full bg-[#34C759]/15 hover:bg-[#34C759] text-[#248A3D] hover:text-white text-[11px] font-semibold cursor-pointer active:scale-95 transition"
                            >
                              Transactions
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div>
                  Showing 1 to {Math.min(entriesPerPage, filteredCustomers.length)} of 12,845
                  entries
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${
                        p === 1 ? "bg-[#007AFF] text-white shadow-xs" : "text-[#8E8E93] hover:bg-[#F2F2F7]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 2. DELETED CUSTOMERS SUB-VIEW (delt-customers.png) */}
        {viewMode === "deleted" && (
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md flex items-center justify-between">
              <div>
                <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                  Deleted Customer Details
                </h2>
                <p className="text-[#8E8E93] text-xs mt-0.5">
                  Archived accounts and historical delivery records
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select className="border border-[#3C3C43]/15 rounded-xl px-3 py-1.5 bg-white text-[#1C1C1E]">
                  <option>10</option>
                </select>
                <span>entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search deleted..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-[#3C3C43]/15 rounded-full px-3.5 py-1.5 w-52 bg-white text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                    {[
                      "CUSTOMER NAME",
                      "CUSTOMER ID",
                      "CONTACT",
                      "REGISTERED ON",
                      "RECENT DELIVERY",
                      "WALLET BALANCE",
                      "CITY",
                      "ADDRESS",
                      "STATUS",
                      "CAPTION",
                      "ACTION",
                    ].map((col) => (
                      <th key={col} className="py-3 px-3.5 first:pl-6 last:pr-6 whitespace-nowrap">
                        <div className="flex items-center justify-between gap-1">
                          <span>{col}</span>
                          <ArrowUpDown className="w-3 h-3 text-[#8E8E93] shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3C3C43]/10 text-[11.5px] text-[#1C1C1E]">
                  {filteredDeleted.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F2F2F7]/50">
                      <td className="py-3.5 pl-6 pr-3.5 font-semibold text-[#1C1C1E]">{row.name}</td>
                      <td className="py-3.5 px-3.5 font-mono text-[#8E8E93]">{row.customer_id}</td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.contact}</td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.registered_on}</td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.recent_delivery}</td>
                      <td className="py-3.5 px-3.5 font-bold text-[#1C1C1E]">{row.wallet_balance}</td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.city}</td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.address}</td>
                      <td className="py-3.5 px-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF3B30]/10 text-[#FF3B30] text-[10.5px] font-semibold">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-[#8E8E93]">{row.caption}</td>
                      <td className="py-3.5 pl-3.5 pr-6">
                        <button
                          type="button"
                          onClick={() => handleRestoreCustomer(row)}
                          className="px-3.5 py-1 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                        >
                          Restore
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-[#3C3C43]/10 flex items-center justify-between text-xs text-[#8E8E93]">
              <div>Showing 1 to 10 of 278 entries</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${
                      p === 1 ? "bg-[#007AFF] text-white shadow-xs" : "text-[#8E8E93] hover:bg-[#F2F2F7]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. NEW CUSTOMER & EDIT CUSTOMER SUB-VIEWS (new customer.png & edit customer.png) */}
        {(viewMode === "new" || viewMode === "edit") && (
          <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                {viewMode === "edit"
                  ? `Edit Customer - ${selectedCustomer?.name || ""}`
                  : "Add New Customer"}
              </h2>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-8 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Full Name <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Customer Full Name"
                      value={customerForm.name}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, name: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Mobile Number <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="9715XXXXXXXX"
                      value={customerForm.contact}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, contact: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Alternate Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="9715XXXXXXXX (Optional)"
                      value={customerForm.alt_contact}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, alt_contact: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Customer ID (UID) <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={viewMode === "edit"}
                      value={customerForm.customer_id}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, customer_id: e.target.value })
                      }
                      className={`w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] ${
                        viewMode === "edit" ? "bg-[#F2F2F7] text-[#8E8E93]" : "bg-[#F2F2F7]"
                      } focus:outline-none focus:ring-2 focus:ring-[#007AFF]`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Preferred Language
                    </label>
                    <select
                      value={customerForm.language}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, language: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="EN">EN</option>
                      <option value="AR">AR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Created By
                    </label>
                    <input
                      type="text"
                      disabled
                      value={customerForm.created_by}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#8E8E93] bg-[#F2F2F7]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4 text-xs text-[#1C1C1E]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_company}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_company: e.target.checked })
                      }
                      className="rounded text-[#007AFF] focus:ring-[#007AFF]"
                    />
                    <span className="font-medium">Is Company</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_credit}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_credit: e.target.checked })
                      }
                      className="rounded text-[#007AFF] focus:ring-[#007AFF]"
                    />
                    <span className="font-medium">Credit Customer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_verified}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_verified: e.target.checked })
                      }
                      className="rounded text-[#007AFF] focus:ring-[#007AFF]"
                    />
                    <span className="font-medium">Verified Customer</span>
                  </label>
                </div>
              </div>

              {/* Address Details */}
              <div className="border-t border-[#3C3C43]/10 pt-6">
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Zone <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerForm.zone}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, zone: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Route <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerForm.route}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, route: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Address <span className="text-[#FF3B30]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full Street Address"
                      value={customerForm.address}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, address: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Apartment/House No
                    </label>
                    <input
                      type="text"
                      placeholder="Building/Villa/Flat Number"
                      value={customerForm.apartment}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, apartment: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Latitude, Longitude"
                      value={customerForm.location}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, location: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      City <span className="text-[#FF3B30]">*</span>
                    </label>
                    <select
                      value={customerForm.city}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, city: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="">Select City</option>
                      <option value="AL_AIN">AL_AIN</option>
                      <option value="ABU_DHABI">ABU_DHABI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Delivery Day
                    </label>
                    <select
                      value={customerForm.delivery_day}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, delivery_day: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="">Select Day</option>
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Saturday",
                      ].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Representative
                    </label>
                    <select
                      value={customerForm.representative}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, representative: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    >
                      <option value="">Select Representative</option>
                      <option value="32 - NOOR">32 - NOOR</option>
                      <option value="56 - ANAS">56 - ANAS</option>
                      <option value="47 - RAHMAN">47 - RAHMAN</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Pricing */}
              <div className="border-t border-[#3C3C43]/10 pt-6">
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">Product Pricing</h3>
                {customerForm.pricing.map((p, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-end gap-4 mb-3">
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                        Product
                      </label>
                      <input
                        type="text"
                        value={p.product}
                        onChange={(e) => {
                          const updated = [...customerForm.pricing];
                          updated[idx].product = e.target.value;
                          setCustomerForm({ ...customerForm, pricing: updated });
                        }}
                        className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Price in AED"
                        value={p.price}
                        onChange={(e) => {
                          const updated = [...customerForm.pricing];
                          updated[idx].price = e.target.value;
                          setCustomerForm({ ...customerForm, pricing: updated });
                        }}
                        className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCustomerForm({
                            ...customerForm,
                            pricing: customerForm.pricing.filter((_, i) => i !== idx),
                          })
                        }
                        className="px-4 py-2 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-xs font-semibold cursor-pointer active:scale-95 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCustomerForm({
                      ...customerForm,
                      pricing: [...customerForm.pricing, { product: "", price: "" }],
                    })
                  }
                  className="px-4 py-2 rounded-full bg-[#007AFF]/10 hover:bg-[#007AFF] text-[#007AFF] hover:text-white text-xs font-semibold cursor-pointer active:scale-95 transition"
                >
                  + Add Product Price
                </button>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#3C3C43]/10">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
                >
                  Cancel
                </button>
                {viewMode === "edit" && (
                  <button
                    type="button"
                    onClick={() => openEditCustomerView(selectedCustomer)}
                    className="px-4 py-2 rounded-full bg-[#FF9500]/15 hover:bg-[#FF9500] text-[#D48000] hover:text-white text-xs font-semibold cursor-pointer active:scale-95 transition"
                  >
                    Reset Changes
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
                >
                  {viewMode === "edit" ? "Update Customer" : "Add New Customer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. CUSTOMER TRANSACTIONS 4-TAB VIEW (transactions.png, order history.png, paymet history.png, wallet recharge-1.png) */}
        {viewMode === "transactions" && selectedCustomer && (
          <div className="space-y-6">
            {/* 4 Tabs + Asset Summary Right Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-[#E5E5EA]/80 p-1 rounded-full">
                {[
                  { id: "asset", label: "Asset History" },
                  { id: "order", label: "Order History" },
                  { id: "payment", label: "Payments History" },
                  { id: "wallet", label: "Wallet Recharge" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTxTab(t.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      txTab === t.id
                        ? "bg-white text-[#1C1C1E] shadow-sm"
                        : "text-[#8E8E93] hover:text-[#1C1C1E]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {txTab === "asset" && (
                <button
                  type="button"
                  onClick={() => setAssetSummaryDrawerOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#34C759] hover:bg-[#2fb350] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
                >
                  Asset Summary
                </button>
              )}
            </div>

            {/* TAB 1: ASSET HISTORY (transactions.png) */}
            {txTab === "asset" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        TOTAL ASSETS
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">3</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#FF9500]/15 text-[#FF9500] flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        TOTAL SECURITY DEPOSIT
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">60</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#FFCC00]/20 text-[#D4A000] flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        RETURNED ASSETS
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#34C759]/15 text-[#34C759] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        RETURNED PAYMENT
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#5856D6]/15 text-[#5856D6] flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
                    <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                      Asset History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                          {[
                            "CREATED AT",
                            "ASSET TYPE",
                            "NO. OF ASSETS",
                            "SECURITY DEPOSIT",
                            "LEND TYPE",
                            "TRUCK ID",
                            "SALESMAN ID",
                            "ACTIONS",
                          ].map((c) => (
                            <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                        <tr className="hover:bg-[#F2F2F7]/50">
                          <td className="py-3.5 pl-6 pr-4">{selectedCustomer.registered_on || "08/09/2026"}</td>
                          <td className="py-3.5 px-4 font-semibold">WATER PUMP</td>
                          <td className="py-3.5 px-4">2</td>
                          <td className="py-3.5 px-4">0</td>
                          <td className="py-3.5 px-4">Custody</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">T6347</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">47</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() =>
                                setReturnAssetModal({
                                  asset_type: "WATER PUMP",
                                  lent_qty: 2,
                                  deposit: 0,
                                })
                              }
                              className="px-3.5 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-[#F2F2F7]/50">
                          <td className="py-3.5 pl-6 pr-4">{selectedCustomer.registered_on || "08/09/2026"}</td>
                          <td className="py-3.5 px-4 font-semibold">COOLER</td>
                          <td className="py-3.5 px-4">1</td>
                          <td className="py-3.5 px-4 font-bold">AED 60</td>
                          <td className="py-3.5 px-4">Deposit</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">T6347</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">47</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() =>
                                setReturnAssetModal({
                                  asset_type: "COOLER",
                                  lent_qty: 1,
                                  deposit: 60,
                                })
                              }
                              className="px-3.5 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: ORDER HISTORY (order history.png) */}
            {txTab === "order" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        TOTAL ORDERS
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">1</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#007AFF]/15 text-[#007AFF] flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        TOTAL VALUE
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 123.00</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#FFCC00]/20 text-[#D4A000] flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        TOTAL PAID
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 123.00</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#34C759]/15 text-[#34C759] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                        PENDING PAYMENTS
                      </div>
                      <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 0.00</div>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-[#FF9500]/15 text-[#FF9500] flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
                    <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                      Order History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                          {[
                            "CREATED AT",
                            "TRUCK ID",
                            "SALESMAN ID",
                            "STATUS",
                            "ORDER VALUE",
                            "PAYMENT RECEIVED",
                            "BALANCE PAYMENT",
                            "ACTIONS",
                          ].map((c) => (
                            <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                        <tr className="hover:bg-[#F2F2F7]/50">
                          <td className="py-3.5 pl-6 pr-4">{selectedCustomer.registered_on || "08/09/2026"}</td>
                          <td className="py-3.5 px-4 font-mono text-[#8E8E93]">T6347</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">47</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#34C759]/15 text-[#34C759] text-[10.5px] font-semibold">
                              DELIVERED
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold">AED 123.00</td>
                          <td className="py-3.5 px-4 text-[#34C759] font-semibold">AED 123.00</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">AED 0.00</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() => setTxOrderModalOpen(true)}
                              className="px-3.5 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* TAB 3: PAYMENTS HISTORY (paymet history.png) */}
            {txTab === "payment" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      TOTAL PAYMENTS
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 123.00</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      WALLET RECHARGE
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 0.00</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      CASH PAYMENT
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 0.00</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      CARD PAYMENT
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">AED 123.00</div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
                    <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                      Payment History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                          {[
                            "ORDER ID",
                            "DATE",
                            "SALESMAN",
                            "MODE OF PAYMENT",
                            "PAYMENT RECEIVED",
                            "BALANCE PAYMENT",
                          ].map((c) => (
                            <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                        <tr className="hover:bg-[#F2F2F7]/50">
                          <td className="py-3.5 pl-6 pr-4 font-mono font-semibold">DN-T6347-09911</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">08/09/2026</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">47</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-[10.5px] font-semibold">
                              Card
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#34C759]">AED 123.00</td>
                          <td className="py-3.5 pl-4 pr-6 text-[#8E8E93]">AED 0.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* TAB 4: WALLET RECHARGE (wallet recharge-1.png) */}
            {txTab === "wallet" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      RECHARGED COUPONS
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">10</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      COUPON VALUE
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      REDEEMED COUPONS
                    </div>
                    <div className="text-2xl font-bold text-[#1C1C1E] mt-1 tracking-tight">0</div>
                  </div>
                  <div className="bg-white rounded-3xl p-5 border border-[#3C3C43]/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      BALANCE COUPONS
                    </div>
                    <div className="text-2xl font-bold text-[#34C759] mt-1 tracking-tight">10</div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#3C3C43]/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#3C3C43]/10 bg-white/90 backdrop-blur-md">
                    <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">
                      Wallet Recharge of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                          {[
                            "UPDATED AT",
                            "RECHARGE CODE",
                            "SALESMAN ID",
                            "ROUTE",
                            "PRODUCTS",
                            "COUPON AVAILABLE",
                            "AMOUNT PAID",
                            "BALANCE COUPON",
                            "ACTIONS",
                          ].map((c) => (
                            <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#3C3C43]/10 text-xs text-[#1C1C1E]">
                        <tr className="hover:bg-[#F2F2F7]/50">
                          <td className="py-3.5 pl-6 pr-4 text-[#8E8E93]">08/09/2026</td>
                          <td className="py-3.5 px-4 font-mono font-semibold">mts7z0ld</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">47</td>
                          <td className="py-3.5 px-4 text-[#8E8E93]">6347</td>
                          <td className="py-3.5 px-4 font-mono">013</td>
                          <td className="py-3.5 px-4 font-bold">10</td>
                          <td className="py-3.5 px-4">0</td>
                          <td className="py-3.5 px-4 font-bold text-[#34C759]">10</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() => setRechargeModalOpen(true)}
                              className="px-3.5 py-1 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-[11px] font-semibold cursor-pointer shadow-xs active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* CUSTOMER DETAILS MODAL (detail.png) */}
      {detailsModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#3C3C43]/10 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1C1C1E]">Customer Details</h3>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1C1C1E] max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F2F2F7]/50 p-4 rounded-2xl">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] border-b border-[#3C3C43]/10 pb-1 mb-2 text-xs">
                    Basic Information
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Full Name:</span> {selectedCustomer.name}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Customer ID:</span> {selectedCustomer.customer_id}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Registered On:</span>{" "}
                    {selectedCustomer.registered_on}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Created By:</span>{" "}
                    {selectedCustomer.created_by || "47"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Representative:</span>{" "}
                    {selectedCustomer.representative || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Preferred Language:</span>{" "}
                    {selectedCustomer.language || "EN"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Verified:</span>{" "}
                    <span className="px-2 py-0.5 rounded-full bg-[#8E8E93]/20 text-[#1C1C1E] text-[10px] font-semibold">
                      {selectedCustomer.is_verified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Credit Customer:</span>{" "}
                    <span className="px-2 py-0.5 rounded-full bg-[#8E8E93]/20 text-[#1C1C1E] text-[10px] font-semibold">
                      {selectedCustomer.is_credit ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] border-b border-[#3C3C43]/10 pb-1 mb-2 text-xs">
                    Contact Information
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Mobile Number:</span> {selectedCustomer.contact}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Alternate Number:</span>{" "}
                    {selectedCustomer.alt_contact || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Recent Delivery:</span>{" "}
                    {selectedCustomer.recent_order}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F2F2F7]/50 p-4 rounded-2xl">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] border-b border-[#3C3C43]/10 pb-1 mb-2 text-xs">
                    Address Information
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Zone:</span> {selectedCustomer.zone || "SCHOOL AREA"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Route:</span> {selectedCustomer.route || "6347"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">City:</span> {selectedCustomer.city}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Address:</span>{" "}
                    {selectedCustomer.address || "Falaj hazza"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Apartment:</span>{" "}
                    {selectedCustomer.apartment || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Delivery Day:</span> {selectedCustomer.delivery_day}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Location:</span>{" "}
                    {selectedCustomer.location || "24.1806642, 55.7369889"}
                  </div>
                  <div className="pt-1">
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        selectedCustomer.location || "24.1806642,55.7369889"
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#007AFF] hover:underline font-semibold"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] border-b border-[#3C3C43]/10 pb-1 mb-2 text-xs">
                    Financial Information
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Wallet Balance:</span>{" "}
                    {selectedCustomer.wallet_balance || 0}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Coupon Available:</span>{" "}
                    {selectedCustomer.coupon_available || 10}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Pending Payment:</span> AED{" "}
                    {selectedCustomer.pending_payment || "0.00"}
                  </div>
                  <div className="pt-2 font-semibold text-[#1C1C1E]">Custom Pricing</div>
                  <ul className="list-disc list-inside text-[#8E8E93]">
                    {(selectedCustomer.pricing || [{ product: "5 gal water", price: "5" }]).map(
                      (pr, i) => (
                        <li key={i}>
                          {pr.product}: AED {pr.price}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#3C3C43]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCustomer(selectedCustomer)}
                className="px-4 py-2 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30] text-[#FF3B30] hover:text-white text-xs font-semibold cursor-pointer active:scale-95 transition"
              >
                Delete Customer
              </button>
              <button
                type="button"
                onClick={() => openEditCustomerView(selectedCustomer)}
                className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
              >
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RETURN ASSET MODAL (asset hist-view.png) */}
      {returnAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-[15px] font-semibold text-[#1C1C1E]">Return Asset</h3>
              <button
                type="button"
                onClick={() => setReturnAssetModal(null)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#1C1C1E]">
              <div className="bg-[#F2F2F7]/70 p-4 rounded-2xl border border-[#3C3C43]/10 space-y-1.5">
                <div>
                  <span className="font-semibold text-[#8E8E93]">Asset Type:</span>{" "}
                  <span className="font-medium text-[#1C1C1E]">{returnAssetModal.asset_type}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#8E8E93]">Lent Quantity:</span>{" "}
                  <span className="font-medium text-[#1C1C1E]">{returnAssetModal.lent_qty}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#8E8E93]">Security Deposit:</span>{" "}
                  <span className="font-medium text-[#1C1C1E]">{returnAssetModal.deposit}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#8E8E93]">Already Returned:</span>{" "}
                  <span className="font-medium text-[#1C1C1E]">0</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Return Quantity (Max: {returnAssetModal.lent_qty})
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  max={returnAssetModal.lent_qty}
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">
                  Return Deposit Amount (Max: {returnAssetModal.deposit})
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter return notes..."
                  className="w-full border border-[#3C3C43]/15 bg-white rounded-xl p-3 text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#E5E5EA] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setReturnAssetModal(null)}
                className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  addToast("Asset return processed successfully", "success");
                  setReturnAssetModal(null);
                }}
                className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
              >
                Process Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER ORDER DETAILS MODAL (view order.png) */}
      {txOrderModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-[15px] font-semibold text-[#1C1C1E]">
                Order Details - DN-T6347-09911
              </h3>
              <button
                type="button"
                onClick={() => setTxOrderModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#1C1C1E]">
              <div className="grid grid-cols-2 gap-4 bg-[#F2F2F7]/50 p-4 rounded-2xl border border-[#3C3C43]/10">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] mb-1">Customer Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Name:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">{selectedCustomer.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Customer Code:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">{selectedCustomer.customer_id}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Zone:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">SCHOOL AREA</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Salesman:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">47</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] mb-1">Order Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Order ID:</span>{" "}
                    <span className="font-mono text-xs font-semibold text-[#1C1C1E]">DN-T6347-09911</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Truck ID:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">T6347</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Date:</span>{" "}
                    <span className="font-medium text-[#1C1C1E]">08/09/2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="font-semibold text-[#8E8E93]">Status:</span>{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20">
                      DELIVERED
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#3C3C43]/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-3.5">PRODUCT</th>
                      <th className="py-2.5 px-3.5">LEND TYPE</th>
                      <th className="py-2.5 px-3.5">QUANTITY</th>
                      <th className="py-2.5 px-3.5">UNIT PRICE</th>
                      <th className="py-2.5 px-3.5">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA]">
                    <tr className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-2.5 px-3.5 font-medium text-[#1C1C1E]">COOLER</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">Deposit</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">1</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">AED 60.00</td>
                      <td className="py-2.5 px-3.5 font-semibold text-[#1C1C1E]">AED 60.00</td>
                    </tr>
                    <tr className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-2.5 px-3.5 font-medium text-[#1C1C1E]">5 gal water</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">Sold</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">12</td>
                      <td className="py-2.5 px-3.5 text-[#3C3C43]">AED 5.25</td>
                      <td className="py-2.5 px-3.5 font-semibold text-[#1C1C1E]">AED 63.00</td>
                    </tr>
                    <tr className="bg-[#F2F2F7]/40">
                      <td colSpan={4} className="py-2.5 px-3.5 text-right font-bold text-[#1C1C1E]">
                        Subtotal
                      </td>
                      <td className="py-2.5 px-3.5 font-bold text-[#007AFF]">AED 123.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#E5E5EA] flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setTxOrderModalOpen(false)}
                className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(0,122,255,0.25)] transition-all cursor-pointer"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECHARGE DETAILS COUPONS MODAL (wallet charge view.png) */}
      {rechargeModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#3C3C43]/10">
            <div className="px-6 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-[15px] font-semibold text-[#1C1C1E]">
                Recharge Details - {selectedCustomer.customer_id}
              </h3>
              <button
                type="button"
                onClick={() => setRechargeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="rounded-2xl border border-[#3C3C43]/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#007AFF] text-white text-[11px] font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3.5">COUPON CODE</th>
                      <th className="py-3 px-3.5">PRODUCT</th>
                      <th className="py-3 px-3.5">TYPE</th>
                      <th className="py-3 px-3.5">VALUE</th>
                      <th className="py-3 px-3.5">STATUS</th>
                      <th className="py-3 px-3.5">CREATED DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {RECHARGE_COUPON_CODES.map((code) => (
                      <tr key={code} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-2.5 px-3.5 font-mono text-[11px] font-semibold text-[#1C1C1E]">{code}</td>
                        <td className="py-2.5 px-3.5 text-[#3C3C43]">013</td>
                        <td className="py-2.5 px-3.5 text-[#3C3C43]">FREE</td>
                        <td className="py-2.5 px-3.5 text-[#3C3C43]">AED 0</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#34C759]/10 text-[#34C759] border border-[#34C759]/20">
                            ACTIVE
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-[#8E8E93]">9/8/2026</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#E5E5EA] flex justify-end">
              <button
                type="button"
                onClick={() => setRechargeModalOpen(false)}
                className="px-5 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSET SUMMARY RIGHT-HAND SLIDE-OVER DRAWER (asset summary.png) */}
      {assetSummaryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 rounded-l-3xl border-l border-[#3C3C43]/10">
            <div className="px-5 py-4 border-b border-[#E5E5EA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <h3 className="text-sm font-semibold text-[#1C1C1E]">Product Delivery Details</h3>
              <button
                type="button"
                onClick={() => setAssetSummaryDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-[#E5E5EA]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="w-full pl-8 pr-3 py-2 border border-[#3C3C43]/15 bg-[#F2F2F7]/50 rounded-full text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] transition-all"
                />
              </div>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto">
              {[
                { name: "COOLER", given: 1, returned: 0, retained: 1 },
                { name: "WATER PUMP", given: 2, returned: 0, retained: 2 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[#3C3C43]/10 rounded-2xl p-4 bg-[#F2F2F7]/40 shadow-xs"
                >
                  <div className="text-xs font-semibold text-[#1C1C1E] mb-2">{item.name}</div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    <div className="bg-white p-2 rounded-xl border border-[#3C3C43]/5">
                      <div className="text-sm font-bold text-[#007AFF]">{item.given}</div>
                      <div className="text-[9px] font-semibold text-[#8E8E93] uppercase tracking-wider">GIVEN</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#3C3C43]/5">
                      <div className="text-sm font-bold text-[#34C759]">{item.returned}</div>
                      <div className="text-[9px] font-semibold text-[#8E8E93] uppercase tracking-wider">RETURNED</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#3C3C43]/5">
                      <div className="text-sm font-bold text-[#FF9500]">{item.retained}</div>
                      <div className="text-[9px] font-semibold text-[#8E8E93] uppercase tracking-wider">RETAINED</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
