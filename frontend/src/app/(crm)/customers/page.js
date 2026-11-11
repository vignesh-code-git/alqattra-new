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
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header title="Customer Dashboard" subtitle="Manage Customers" />

      {/* Figma Black Top Banner */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="font-bold text-base tracking-tight">
            {viewMode === "list"
              ? "Customer Dashboard"
              : viewMode === "transactions"
              ? "Transaction History"
              : "Customers"}
          </span>
          <Home className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-300 text-xs">
            -{" "}
            {viewMode === "new"
              ? "New Customer"
              : viewMode === "edit"
              ? "Edit Customer"
              : viewMode === "transactions"
              ? "Customer Transactions"
              : "Manage Customers"}{" "}
            - ALL
          </span>
        </div>

        {viewMode === "list" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("deleted")}
              className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              Deleted Customer
            </button>
            <button
              type="button"
              onClick={openNewCustomerView}
              className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              + New Customer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
          >
            Back to Customers
          </button>
        )}
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* 1. MAIN CUSTOMERS LIST (customers.png) */}
        {viewMode === "list" && (
          <>
            {/* Filter Customers Card */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 p-5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Filter Customers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Customer
                  </label>
                  <input
                    type="text"
                    placeholder="Search name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    City
                  </label>
                  <select className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white">
                    <option value="">All Cities</option>
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Zone
                  </label>
                  <select className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white">
                    <option value="">All Zones</option>
                    <option value="SCHOOL AREA">SCHOOL AREA</option>
                    <option value="KHABISI">KHABISI</option>
                    <option value="MANAZIF">MANAZIF</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => addToast("Customer filters applied", "info")}
                  className="px-4 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-1.5 rounded border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Customer Management Table Card */}
            <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4 flex items-center justify-between">
                <h2 className="text-white font-bold text-base tracking-wide">
                  Customer Management
                </h2>
                <button
                  type="button"
                  onClick={() => addToast("Exported customer records", "success")}
                  className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
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
                    <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
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
                            <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-[12px] text-slate-700">
                    {filteredCustomers.slice(0, entriesPerPage).map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-medium text-slate-800">{cust.name}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.customer_id}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.contact}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.registered_on}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.recent_order}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.city}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.delivery_day}</td>
                        <td className="py-3.5 pl-4 pr-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setDetailsModalOpen(true);
                              }}
                              className="px-3 py-1 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-[11px] font-semibold cursor-pointer"
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
                              className="px-3 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[11px] font-semibold cursor-pointer"
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

              <div className="px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                <div>
                  Showing 1 to {Math.min(entriesPerPage, filteredCustomers.length)} of 12,845
                  entries
                </div>
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
          </>
        )}

        {/* 2. DELETED CUSTOMERS SUB-VIEW (delt-customers.png) */}
        {viewMode === "deleted" && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                Deleted Customer Details
              </h2>
            </div>

            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select className="border border-slate-300 rounded px-2 py-1 bg-white">
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
                  className="border border-slate-300 rounded px-2.5 py-1 w-44"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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
                          <ArrowUpDown className="w-3 h-3 text-slate-400 shrink-0" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-[11.5px] text-slate-700">
                  {filteredDeleted.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 pl-6 pr-3.5 font-medium text-slate-800">{row.name}</td>
                      <td className="py-3.5 px-3.5">{row.customer_id}</td>
                      <td className="py-3.5 px-3.5">{row.contact}</td>
                      <td className="py-3.5 px-3.5">{row.registered_on}</td>
                      <td className="py-3.5 px-3.5">{row.recent_delivery}</td>
                      <td className="py-3.5 px-3.5">{row.wallet_balance}</td>
                      <td className="py-3.5 px-3.5">{row.city}</td>
                      <td className="py-3.5 px-3.5">{row.address}</td>
                      <td className="py-3.5 px-3.5">{row.status}</td>
                      <td className="py-3.5 px-3.5">{row.caption}</td>
                      <td className="py-3.5 pl-3.5 pr-6">
                        <button
                          type="button"
                          onClick={() => handleRestoreCustomer(row)}
                          className="px-3 py-1 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-[11px] font-semibold cursor-pointer"
                        >
                          Restore
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>Showing 1 to 10 of 278 entries</div>
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
        )}

        {/* 3. NEW CUSTOMER & EDIT CUSTOMER SUB-VIEWS (new customer.png & edit customer.png) */}
        {(viewMode === "new" || viewMode === "edit") && (
          <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
              <h2 className="text-white font-bold text-base tracking-wide">
                {viewMode === "edit"
                  ? `Edit Customer - ${selectedCustomer?.name || ""}`
                  : "Add New Customer"}
              </h2>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-8 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-600 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Customer Full Name"
                      value={customerForm.name}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, name: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="9715XXXXXXXX"
                      value={customerForm.contact}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, contact: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Alternate Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="9715XXXXXXXX (Optional)"
                      value={customerForm.alt_contact}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, alt_contact: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Customer ID (UID) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={viewMode === "edit"}
                      value={customerForm.customer_id}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, customer_id: e.target.value })
                      }
                      className={`w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 ${
                        viewMode === "edit" ? "bg-[#EDF2F7]" : ""
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Preferred Language
                    </label>
                    <select
                      value={customerForm.language}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, language: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="EN">EN</option>
                      <option value="AR">AR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Created By
                    </label>
                    <input
                      type="text"
                      disabled
                      value={customerForm.created_by}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-500 bg-[#EDF2F7]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_company}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_company: e.target.checked })
                      }
                    />
                    <span>Is Company</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_credit}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_credit: e.target.checked })
                      }
                    />
                    <span>Credit Customer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customerForm.is_verified}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, is_verified: e.target.checked })
                      }
                    />
                    <span>Verified Customer</span>
                  </label>
                </div>
              </div>

              {/* Address Details */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xs font-bold text-slate-600 mb-4">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Zone <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerForm.zone}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, zone: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Route <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerForm.route}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, route: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full Street Address"
                      value={customerForm.address}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, address: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Apartment/House No
                    </label>
                    <input
                      type="text"
                      placeholder="Building/Villa/Flat Number"
                      value={customerForm.apartment}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, apartment: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Latitude, Longitude"
                      value={customerForm.location}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, location: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={customerForm.city}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, city: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
                    >
                      <option value="">Select City</option>
                      <option value="AL_AIN">AL_AIN</option>
                      <option value="ABU_DHABI">ABU_DHABI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Delivery Day
                    </label>
                    <select
                      value={customerForm.delivery_day}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, delivery_day: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
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
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Representative
                    </label>
                    <select
                      value={customerForm.representative}
                      onChange={(e) =>
                        setCustomerForm({ ...customerForm, representative: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 bg-white"
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
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xs font-bold text-slate-600 mb-4">Product Pricing</h3>
                {customerForm.pricing.map((p, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-end gap-4 mb-3">
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
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
                        className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
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
                        className="w-full border border-slate-200 rounded px-3 py-2 text-xs text-slate-700"
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
                        className="px-3.5 py-2 rounded bg-[#E53E6A] text-white text-xs font-semibold cursor-pointer"
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
                  className="px-3.5 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold cursor-pointer"
                >
                  Add Product Price
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#5948DB] hover:bg-[#4938c7] text-white text-xs font-semibold cursor-pointer"
                >
                  {viewMode === "edit" ? "Update Customer" : "Add New Customer"}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 rounded bg-slate-500 hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                {viewMode === "edit" && (
                  <button
                    type="button"
                    onClick={() => openEditCustomerView(selectedCustomer)}
                    className="px-4 py-2 rounded bg-[#ECC94B] text-white text-xs font-semibold cursor-pointer"
                  >
                    Reset Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* 4. CUSTOMER TRANSACTIONS 4-TAB VIEW (transactions.png, order history.png, paymet history.png, wallet recharge-1.png) */}
        {viewMode === "transactions" && selectedCustomer && (
          <div className="space-y-6">
            {/* 4 Tabs + Asset Summary Right Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
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
                    className={`px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
                      txTab === t.id
                        ? "bg-white text-slate-800 shadow-xs border border-slate-200"
                        : "bg-slate-200/70 text-slate-500 hover:text-slate-800"
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
                  className="px-3.5 py-1.5 rounded bg-[#48BB78] hover:bg-[#38a169] text-white text-xs font-semibold cursor-pointer"
                >
                  Asset Summary
                </button>
              )}
            </div>

            {/* TAB 1: ASSET HISTORY (transactions.png) */}
            {txTab === "asset" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        TOTAL ASSETS
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">3</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E05D38] text-white flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        TOTAL SECURITY DEPOSIT
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">60</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#ECC94B] text-white flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        RETURNED ASSETS
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#48BB78] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        RETURNED PAYMENT
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#5948DB] text-white flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
                  <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                    <h2 className="text-white font-bold text-base tracking-wide">
                      Asset History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                      <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                        <tr>
                          <td className="py-3.5 pl-6 pr-4">08/09/2026</td>
                          <td className="py-3.5 px-4">WATER PUMP</td>
                          <td className="py-3.5 px-4">2</td>
                          <td className="py-3.5 px-4">0</td>
                          <td className="py-3.5 px-4">Custody</td>
                          <td className="py-3.5 px-4">T6347</td>
                          <td className="py-3.5 px-4">47</td>
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
                              className="px-3 py-1 rounded bg-[#4A90E2] text-white text-[11px] font-semibold cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 pl-6 pr-4">08/09/2026</td>
                          <td className="py-3.5 px-4">COOLER</td>
                          <td className="py-3.5 px-4">1</td>
                          <td className="py-3.5 px-4">60</td>
                          <td className="py-3.5 px-4">Deposit</td>
                          <td className="py-3.5 px-4">T6347</td>
                          <td className="py-3.5 px-4">47</td>
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
                              className="px-3 py-1 rounded bg-[#4A90E2] text-white text-[11px] font-semibold cursor-pointer"
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
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        TOTAL ORDERS
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">1</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E05D38] text-white flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        TOTAL VALUE
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">AED 123.00</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#ECC94B] text-white flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        TOTAL PAID
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">AED 123.00</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#48BB78] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        PENDING PAYMENTS
                      </div>
                      <div className="text-xl font-bold text-slate-800 mt-1">AED 0.00</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#5948DB] text-white flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
                  <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                    <h2 className="text-white font-bold text-base tracking-wide">
                      Order History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                      <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                        <tr>
                          <td className="py-3.5 pl-6 pr-4">08/09/2026</td>
                          <td className="py-3.5 px-4">T6347</td>
                          <td className="py-3.5 px-4">47</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-[#48BB78] text-white text-[10px] font-bold">
                              DELIVERED
                            </span>
                          </td>
                          <td className="py-3.5 px-4">AED 123.00</td>
                          <td className="py-3.5 px-4">AED 123.00</td>
                          <td className="py-3.5 px-4">AED 0.00</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() => setTxOrderModalOpen(true)}
                              className="px-3 py-1 rounded bg-[#4A90E2] text-white text-[11px] font-semibold cursor-pointer"
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
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      TOTAL PAYMENTS
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">AED 123.00</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      WALLET RECHARGE
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">AED 0.00</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      CASH PAYMENT
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">AED 0.00</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      CARD PAYMENT
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">AED 123.00</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
                  <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                    <h2 className="text-white font-bold text-base tracking-wide">
                      Payment History of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                      <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                        <tr>
                          <td className="py-3.5 pl-6 pr-4">DN-T6347-09911</td>
                          <td className="py-3.5 px-4">08/09/2026</td>
                          <td className="py-3.5 px-4">47</td>
                          <td className="py-3.5 px-4">Card</td>
                          <td className="py-3.5 px-4">AED 123.00</td>
                          <td className="py-3.5 pl-4 pr-6">AED 0.00</td>
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
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      RECHARGED COUPONS
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">10</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      COUPON VALUE
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      REDEAMED COUPONS
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">0</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      BALANCE COUPONS
                    </div>
                    <div className="text-xl font-bold text-slate-800 mt-1">10</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-xs border border-slate-200/80 overflow-hidden">
                  <div className="bg-linear-to-r from-[#091526] via-[#1B3B5A] to-[#6395B8] px-6 py-4">
                    <h2 className="text-white font-bold text-base tracking-wide">
                      Wallet Recharge of {selectedCustomer.customer_id}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
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
                      <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                        <tr>
                          <td className="py-3.5 pl-6 pr-4">08/09/2026</td>
                          <td className="py-3.5 px-4">mts7z0ld</td>
                          <td className="py-3.5 px-4">47</td>
                          <td className="py-3.5 px-4">6347</td>
                          <td className="py-3.5 px-4">013</td>
                          <td className="py-3.5 px-4">10</td>
                          <td className="py-3.5 px-4">0</td>
                          <td className="py-3.5 px-4">10</td>
                          <td className="py-3.5 pl-4 pr-6">
                            <button
                              type="button"
                              onClick={() => setRechargeModalOpen(true)}
                              className="px-3 py-1 rounded bg-[#4A90E2] text-white text-[11px] font-semibold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Customer Details</h3>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-2">
                    Basic Information
                  </div>
                  <div>
                    <span className="font-bold">Full Name:</span> {selectedCustomer.name}
                  </div>
                  <div>
                    <span className="font-bold">Customer ID:</span> {selectedCustomer.customer_id}
                  </div>
                  <div>
                    <span className="font-bold">Registered On:</span>{" "}
                    {selectedCustomer.registered_on}
                  </div>
                  <div>
                    <span className="font-bold">Created By:</span>{" "}
                    {selectedCustomer.created_by || "47"}
                  </div>
                  <div>
                    <span className="font-bold">Representative:</span>{" "}
                    {selectedCustomer.representative || "N/A"}
                  </div>
                  <div>
                    <span className="font-bold">Preferred Language:</span>{" "}
                    {selectedCustomer.language || "EN"}
                  </div>
                  <div>
                    <span className="font-bold">Verified:</span>{" "}
                    <span className="px-2 py-0.5 rounded bg-slate-400 text-white text-[10px]">
                      {selectedCustomer.is_verified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Credit Customer:</span>{" "}
                    <span className="px-2 py-0.5 rounded bg-slate-400 text-white text-[10px]">
                      {selectedCustomer.is_credit ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-2">
                    Contact Information
                  </div>
                  <div>
                    <span className="font-bold">Mobile Number:</span> {selectedCustomer.contact}
                  </div>
                  <div>
                    <span className="font-bold">Alternate Number:</span>{" "}
                    {selectedCustomer.alt_contact || "N/A"}
                  </div>
                  <div>
                    <span className="font-bold">Recent Delivery:</span>{" "}
                    {selectedCustomer.recent_order}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-2">
                    Address Information
                  </div>
                  <div>
                    <span className="font-bold">Zone:</span> {selectedCustomer.zone || "SCHOOL AREA"}
                  </div>
                  <div>
                    <span className="font-bold">Route:</span> {selectedCustomer.route || "6347"}
                  </div>
                  <div>
                    <span className="font-bold">City:</span> {selectedCustomer.city}
                  </div>
                  <div>
                    <span className="font-bold">Address:</span>{" "}
                    {selectedCustomer.address || "Falaj hazza"}
                  </div>
                  <div>
                    <span className="font-bold">Apartment:</span>{" "}
                    {selectedCustomer.apartment || "-"}
                  </div>
                  <div>
                    <span className="font-bold">Delivery Day:</span> {selectedCustomer.delivery_day}
                  </div>
                  <div>
                    <span className="font-bold">Location:</span>{" "}
                    {selectedCustomer.location || "24.1806642, 55.7369889"}
                  </div>
                  <div>
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        selectedCustomer.location || "24.1806642,55.7369889"
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4A90E2] hover:underline font-medium"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-2">
                    Financial Information
                  </div>
                  <div>
                    <span className="font-bold">Wallet Balance:</span>{" "}
                    {selectedCustomer.wallet_balance || 0}
                  </div>
                  <div>
                    <span className="font-bold">Coupon Available:</span>{" "}
                    {selectedCustomer.coupon_available || 10}
                  </div>
                  <div>
                    <span className="font-bold">Pending Payment:</span> AED{" "}
                    {selectedCustomer.pending_payment || "0.00"}
                  </div>
                  <div className="pt-2 font-bold text-slate-800">Custom Pricing</div>
                  <ul className="list-disc list-inside text-slate-600">
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

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditCustomerView(selectedCustomer)}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] hover:bg-[#357ABD] text-white text-xs font-semibold cursor-pointer"
              >
                Edit Customer
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCustomer(selectedCustomer)}
                className="px-3.5 py-1.5 rounded bg-[#E05D38] hover:bg-[#c94f2d] text-white text-xs font-semibold cursor-pointer"
              >
                Delete Customer
              </button>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="px-3.5 py-1.5 rounded bg-[#4A5568] hover:bg-[#2D3748] text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RETURN ASSET MODAL (asset hist-view.png) */}
      {returnAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Return Asset</h3>
              <button
                type="button"
                onClick={() => setReturnAssetModal(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                <div>
                  <span className="font-bold">Asset Type:</span> {returnAssetModal.asset_type}
                </div>
                <div>
                  <span className="font-bold">Lent Quantity:</span> {returnAssetModal.lent_qty}
                </div>
                <div>
                  <span className="font-bold">Security Deposit:</span> {returnAssetModal.deposit}
                </div>
                <div>
                  <span className="font-bold">Already Returned:</span> 0
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Return Quantity (Max: {returnAssetModal.lent_qty})
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  max={returnAssetModal.lent_qty}
                  className="w-full border border-slate-200 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Return Deposit Amount (Max: {returnAssetModal.deposit})
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border border-slate-200 rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter return notes..."
                  className="w-full border border-slate-200 rounded p-2"
                />
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReturnAssetModal(null)}
                className="px-3.5 py-1.5 rounded bg-slate-500 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  addToast("Asset return processed successfully", "success");
                  setReturnAssetModal(null);
                }}
                className="px-3.5 py-1.5 rounded bg-[#5948DB] text-white text-xs font-semibold cursor-pointer"
              >
                Process Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER ORDER DETAILS MODAL (view order.png) */}
      {txOrderModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Order Details - DN-T6347-09911
              </h3>
              <button
                type="button"
                onClick={() => setTxOrderModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-slate-800 mb-1">Customer Information</div>
                  <div>
                    <span className="font-bold">Name:</span> {selectedCustomer.name}
                  </div>
                  <div>
                    <span className="font-bold">Customer Code:</span>{" "}
                    {selectedCustomer.customer_id}
                  </div>
                  <div>
                    <span className="font-bold">Zone:</span> SCHOOL AREA
                  </div>
                  <div>
                    <span className="font-bold">Salesman:</span> 47
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-800 mb-1">Order Information</div>
                  <div>
                    <span className="font-bold">Order ID:</span> DN-T6347-09911
                  </div>
                  <div>
                    <span className="font-bold">Truck ID:</span> T6347
                  </div>
                  <div>
                    <span className="font-bold">Date:</span> 08/09/2026
                  </div>
                  <div>
                    <span className="font-bold">Status:</span>{" "}
                    <span className="px-2 py-0.5 rounded bg-[#48BB78] text-white text-[10px] font-bold">
                      DELIVERED
                    </span>
                  </div>
                </div>
              </div>

              <table className="w-full text-left border-collapse border-t border-slate-200">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2 px-3">PRODUCT</th>
                    <th className="py-2 px-3">LEND TYPE</th>
                    <th className="py-2 px-3">QUANTITY</th>
                    <th className="py-2 px-3">UNIT PRICE</th>
                    <th className="py-2 px-3">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2 px-3">COOLER</td>
                    <td className="py-2 px-3">Deposit</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3">AED 60.00</td>
                    <td className="py-2 px-3">AED 60.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">5 gal water</td>
                    <td className="py-2 px-3">Sold</td>
                    <td className="py-2 px-3">12</td>
                    <td className="py-2 px-3">AED 5.25</td>
                    <td className="py-2 px-3">AED 63.00</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="py-2 px-3 text-right font-bold">
                      Subtotal
                    </td>
                    <td className="py-2 px-3 font-bold">AED 123.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTxOrderModalOpen(false)}
                className="px-3.5 py-1.5 rounded bg-slate-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded bg-[#4A90E2] text-white text-xs font-semibold cursor-pointer"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECHARGE DETAILS COUPONS MODAL (wallet charge view.png) */}
      {rechargeModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Recharge Details - {selectedCustomer.customer_id}
              </h3>
              <button
                type="button"
                onClick={() => setRechargeModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-3">COUPON CODE</th>
                    <th className="py-2.5 px-3">PRODUCT</th>
                    <th className="py-2.5 px-3">TYPE</th>
                    <th className="py-2.5 px-3">VALUE</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">CREATED DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                  {RECHARGE_COUPON_CODES.map((code) => (
                    <tr key={code}>
                      <td className="py-2.5 px-3 font-mono text-[11px]">{code}</td>
                      <td className="py-2.5 px-3">013</td>
                      <td className="py-2.5 px-3">FREE</td>
                      <td className="py-2.5 px-3">AED 0</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-2.5 px-3">9/8/2026</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setRechargeModalOpen(false)}
                className="px-4 py-1.5 rounded bg-slate-500 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSET SUMMARY RIGHT-HAND SLIDE-OVER DRAWER (asset summary.png) */}
      {assetSummaryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700">Product Delivery Details</h3>
              <button
                type="button"
                onClick={() => setAssetSummaryDrawerOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Product..."
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs"
                />
              </div>
            </div>

            <div className="p-4 space-y-3">
              {[
                { name: "COOLER", given: 1, returned: 0, retained: 1 },
                { name: "WATER PUMP", given: 2, returned: 0, retained: 2 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs"
                >
                  <div className="text-xs font-semibold text-slate-600 mb-2">{item.name}</div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    <div>
                      <div className="text-sm font-bold text-[#5948DB]">{item.given}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">GIVEN</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#48BB78]">{item.returned}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">RETURNED</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#E05D38]">{item.retained}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">RETAINED</div>
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
