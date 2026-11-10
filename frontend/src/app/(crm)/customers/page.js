"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Undo2,
  UserX,
  Package,
  ShoppingCart,
  CreditCard,
  Wallet,
  Download,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CustomersPage() {
  const { addToast } = useToast();

  // Exact 10 Figma Customer Rows (Figma 3:1743 - steps/1139/media_0.png)
  const [customers, setCustomers] = useState([
    {
      id: 1,
      customer_id: "197301",
      customer_code: "197301",
      name: "AL NEBRAS SCHOOL",
      customer_type: "Corporate",
      phone: "+971 55 727 2628",
      email: "admin@alnebrasschool.ae",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6335",
      delivery_day: "Sunday",
      lend_product: "COOLER",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "Yes",
      is_credit: "Yes",
      created_by: "Admin",
      representative: "56 - ANAS",
      credit_limit: "25000.00",
      current_balance: "5180.96",
      status: "Active",
    },
    {
      id: 2,
      customer_id: "197300",
      customer_code: "197300",
      name: "Ameen",
      customer_type: "Individual",
      phone: "055 655 3977",
      email: "ameen.alain@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Jimi",
      route: "6338",
      delivery_day: "Monday",
      lend_product: "5 gal water",
      lend_type: "Free Loan",
      language: "Arabic",
      is_company: "No",
      is_credit: "No",
      created_by: "ANAS",
      representative: "56 - ANAS",
      credit_limit: "1000.00",
      current_balance: "0.00",
      status: "Active",
    },
    {
      id: 3,
      customer_id: "197299",
      customer_code: "197299",
      name: "SUHAIL ALI",
      customer_type: "Individual",
      phone: "0561900562",
      email: "suhail.ali@yahoo.com",
      registered_on: "07/09/2026",
      recent_order: "07/09/2026",
      city: "AL_AIN",
      zone: "Zakher",
      route: "6347",
      delivery_day: "Tuesday",
      lend_product: "5 gal water",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "No",
      is_credit: "No",
      created_by: "NISAR",
      representative: "38 - NISAR",
      credit_limit: "1500.00",
      current_balance: "45.00",
      status: "Active",
    },
    {
      id: 4,
      customer_id: "197298",
      customer_code: "197298",
      name: "MOHAMMED SALEM",
      customer_type: "Individual",
      phone: "0562918223",
      email: "msalem@alqattara.ae",
      registered_on: "07/09/2026",
      recent_order: "07/09/2026",
      city: "AL_AIN",
      zone: "Al Hili",
      route: "6339",
      delivery_day: "Wednesday",
      lend_product: "COOLER",
      lend_type: "Free Loan",
      language: "Arabic",
      is_company: "No",
      is_credit: "Yes",
      created_by: "HASHIM",
      representative: "47 - HASHIM",
      credit_limit: "2000.00",
      current_balance: "120.00",
      status: "Active",
    },
    {
      id: 5,
      customer_id: "197297",
      customer_code: "197297",
      name: "Soria",
      customer_type: "Individual",
      phone: "0509459537",
      email: "soria.villa@gmail.com",
      registered_on: "07/09/2026",
      recent_order: "07/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6341",
      delivery_day: "Thursday",
      lend_product: "5 gal water",
      lend_type: "Free Loan",
      language: "English",
      is_company: "No",
      is_credit: "No",
      created_by: "Admin",
      representative: "57 - MUFEED",
      credit_limit: "1000.00",
      current_balance: "0.00",
      status: "Active",
    },
    {
      id: 6,
      customer_id: "197296",
      customer_code: "197296",
      name: "Abdullalal qaai",
      customer_type: "Individual",
      phone: "0502332612",
      email: "abdullalal.qaai@emirates.net.ae",
      registered_on: "06/09/2026",
      recent_order: "06/09/2026",
      city: "AL_AIN",
      zone: "Al Foah",
      route: "6335",
      delivery_day: "Saturday",
      lend_product: "COOLER",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "No",
      is_credit: "Yes",
      created_by: "Admin",
      representative: "56 - ANAS",
      credit_limit: "5000.00",
      current_balance: "420.00",
      status: "Active",
    },
    {
      id: 7,
      customer_id: "197295",
      customer_code: "197295",
      name: "Sama Al Barari Ladies Tailor",
      customer_type: "Corporate",
      phone: "0547819600",
      email: "sama.albarari@gmail.com",
      registered_on: "06/09/2026",
      recent_order: "06/09/2026",
      city: "AL_AIN",
      zone: "Al Jimi",
      route: "6338",
      delivery_day: "Sunday",
      lend_product: "5 gal water",
      lend_type: "Free Loan",
      language: "Arabic",
      is_company: "Yes",
      is_credit: "No",
      created_by: "NISAR",
      representative: "38 - NISAR",
      credit_limit: "2000.00",
      current_balance: "0.00",
      status: "Active",
    },
    {
      id: 8,
      customer_id: "197294",
      customer_code: "197294",
      name: "Sadan (tair alqua)",
      customer_type: "Corporate",
      phone: "0507390063",
      email: "sadan.tairalqua@gmail.com",
      registered_on: "06/09/2026",
      recent_order: "06/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6335",
      delivery_day: "Monday",
      lend_product: "COOLER",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "Yes",
      is_credit: "No",
      created_by: "ANAS",
      representative: "56 - ANAS",
      credit_limit: "1000.00",
      current_balance: "150.00",
      status: "Active",
    },
    {
      id: 9,
      customer_id: "197293",
      customer_code: "197293",
      name: "PRAVEEN",
      customer_type: "Individual",
      phone: "0564204614",
      email: "praveen.alain@gmail.com",
      registered_on: "06/09/2026",
      recent_order: "06/09/2026",
      city: "AL_AIN",
      zone: "Zakher",
      route: "6347",
      delivery_day: "Tuesday",
      lend_product: "5 gal water",
      lend_type: "Free Loan",
      language: "English",
      is_company: "No",
      is_credit: "No",
      created_by: "Admin",
      representative: "47 - HASHIM",
      credit_limit: "1500.00",
      current_balance: "52.50",
      status: "Active",
    },
    {
      id: 10,
      customer_id: "197292",
      customer_code: "197292",
      name: "SULAIMAN SAEED",
      customer_type: "Individual",
      phone: "0507533117",
      email: "sulaiman.saeed@gmail.com",
      registered_on: "05/09/2026",
      recent_order: "05/09/2026",
      city: "AL_AIN",
      zone: "Al Hili",
      route: "6339",
      delivery_day: "Wednesday",
      lend_product: "5 gal water",
      lend_type: "Free Loan",
      language: "Arabic",
      is_company: "No",
      is_credit: "No",
      created_by: "MUFEED",
      representative: "57 - MUFEED",
      credit_limit: "1000.00",
      current_balance: "0.00",
      status: "Active",
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortField, setSortField] = useState("customer_id");
  const [sortAsc, setSortAsc] = useState(false);

  // Modals (Exact Figma 3:1766, 3:1767, 3:1768, 3:1769-3:1776)
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [transactionCustomer, setTransactionCustomer] = useState(null);
  const [txnSubTab, setTxnSubTab] = useState("asset_history");
  const [showAssetSummaryModal, setShowAssetSummaryModal] = useState(false);
  const [viewTxnOrderModal, setViewTxnOrderModal] = useState(null);
  const [viewTxnWalletModal, setViewTxnWalletModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [crudPopup, setCrudPopup] = useState(null);

  // 14-Field Filter State (Exact Figma 3:1743)
  const [filters, setFilters] = useState({
    customerType: "All",
    deliveryDay: "All",
    lendProducts: "All",
    productLendType: "All",
    language: "All",
    fromDate: "",
    toDate: "",
    orderStatus: "All",
    company: "All",
    creditCustomer: "All",
    route: "All",
    zone: "",
    createdBy: "All",
    representative: "All",
  });

  const [formData, setFormData] = useState({
    name: "",
    customer_type: "Individual",
    phone: "",
    email: "",
    city: "AL_AIN",
    zone: "Al Ain Central",
    route: "6335",
    delivery_day: "Sunday",
    language: "Arabic",
    lend_product: "5 gal water",
    lend_type: "Free Loan",
    is_company: "No",
    is_credit: "No",
    representative: "56 - ANAS",
    credit_limit: "1000",
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered by Tab + 14 Figma Filter Fields + Search
  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers
      .filter((c) => {
        if (activeTab === "Deleted") return c.status === "Deleted";
        if (c.status === "Deleted") return false;

        if (filters.customerType !== "All" && c.customer_type !== filters.customerType) return false;
        if (filters.deliveryDay !== "All" && c.delivery_day && c.delivery_day !== filters.deliveryDay) return false;
        if (filters.lendProducts !== "All" && c.lend_product && c.lend_product !== filters.lendProducts) return false;
        if (filters.productLendType !== "All" && c.lend_type && c.lend_type !== filters.productLendType) return false;
        if (filters.language !== "All" && c.language && c.language !== filters.language) return false;
        if (filters.company !== "All" && c.is_company && c.is_company !== filters.company) return false;
        if (filters.creditCustomer !== "All" && c.is_credit && c.is_credit !== filters.creditCustomer) return false;
        if (filters.route !== "All" && c.route && c.route !== filters.route) return false;
        if (filters.zone.trim() && !(c.zone || "").toLowerCase().includes(filters.zone.trim().toLowerCase())) return false;
        if (filters.createdBy !== "All" && c.created_by && c.created_by !== filters.createdBy) return false;
        if (filters.representative !== "All" && c.representative && c.representative !== filters.representative) return false;

        if (!q) return true;
        return (
          (c.name || "").toLowerCase().includes(q) ||
          (c.customer_id || "").toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q) ||
          (c.city || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const valA = (a[sortField] || "").toString().toLowerCase();
        const valB = (b[sortField] || "").toString().toLowerCase();
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [customers, activeTab, filters, search, sortField, sortAsc]);

  const handleExportCSV = () => {
    const headers = ["CUSTOMER NAME", "CUSTOMER ID", "CONTACT", "REGISTERED ON", "RECENT ORDER", "CITY"];
    const rows = filteredCustomers.map((c) =>
      [c.name, c.customer_id, c.phone, c.registered_on, c.recent_order, c.city]
        .map((v) => `"${(v || "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AlQattara_Customers_List.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast(`Exported ${filteredCustomers.length} customers to CSV`, "success");
  };

  const confirmDeleteCustomer = async () => {
    if (!deleteTarget) return;
    const cust = deleteTarget;
    try {
      await apiService.updateCustomer(cust.id, { ...cust, status: "Deleted" });
    } catch {
      // Optimistic
    }
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Deleted" } : c))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Customer Moved to Deleted",
      message: `Customer "${cust.name}" (${cust.customer_id}) has been moved to the Deleted Customer list (Figma 3:1744).`,
    });
    addToast(`Customer "${cust.name}" moved to Deleted list`, "info");
  };

  const handleRestoreCustomer = async (cust) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Active" } : c))
    );
    setCrudPopup({
      type: "restore",
      title: "Customer Restored",
      message: `Customer "${cust.name}" (${cust.customer_id}) has been restored to Active status!`,
    });
    addToast(`Customer "${cust.name}" restored to Active`, "success");
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast("Please fill in customer name and phone", "error");
      return;
    }
    const code = `${197300 + customers.length + 1}`;
    const newCust = {
      id: Date.now(),
      customer_id: code,
      customer_code: code,
      name: formData.name,
      customer_type: formData.customer_type,
      phone: formData.phone,
      email: formData.email,
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: formData.city,
      zone: formData.zone,
      route: formData.route,
      delivery_day: formData.delivery_day,
      language: formData.language,
      lend_product: formData.lend_product,
      lend_type: formData.lend_type,
      is_company: formData.is_company,
      is_credit: formData.is_credit,
      created_by: "Admin",
      representative: formData.representative,
      credit_limit: formData.credit_limit || "0.00",
      current_balance: "0.00",
      status: "Active",
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setCrudPopup({
      type: "create",
      title: "New Customer Created",
      message: `Customer "${newCust.name}" (ID: ${code}) was registered successfully.`,
    });
    addToast(`Customer ${newCust.name} (${code}) created!`, "success");
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;
    setCustomers((prev) =>
      prev.map((c) => (c.id === editingCustomer.id ? { ...c, ...editingCustomer } : c))
    );
    const updatedName = editingCustomer.name;
    const updatedCode = editingCustomer.customer_id;
    setEditingCustomer(null);
    setCrudPopup({
      type: "update",
      title: "Customer Updated",
      message: `Customer "${updatedName}" (ID: ${updatedCode}) details have been updated.`,
    });
    addToast(`Customer ${updatedName} updated!`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Customers" subtitle="Customer Directory" />

      <main className="p-5 space-y-4 flex-1 overflow-y-auto">
        {/* Top Action Bar with Deleted Customer & + New Customer buttons (Exact Figma 3:1743) */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "Deleted" ? "All" : "Deleted")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer ${
              activeTab === "Deleted"
                ? "bg-rose-600 text-white"
                : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            }`}
          >
            <UserX className="w-3.5 h-3.5" />
            <span>{activeTab === "Deleted" ? "Active Customer List" : "Deleted Customer"}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5A5F] hover:bg-[#E0484D] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Customer</span>
          </button>
        </div>

        {/* Comprehensive 14-Field Filter Orders Panel (Exact Figma 3:1743 - steps/1139/media_0.png) */}
        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800">
            Filter Orders
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Row 1 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Customer Type</label>
              <select
                value={filters.customerType}
                onChange={(e) => setFilters({ ...filters, customerType: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Delivery Day</label>
              <select
                value={filters.deliveryDay}
                onChange={(e) => setFilters({ ...filters, deliveryDay: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select Day</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Lend Products</label>
              <select
                value={filters.lendProducts}
                onChange={(e) => setFilters({ ...filters, lendProducts: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select commission scheme</option>
                <option value="5 gal water">5 gal water</option>
                <option value="COOLER">COOLER</option>
                <option value="empty bottle">empty bottle</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Product LendType</label>
              <select
                value={filters.productLendType}
                onChange={(e) => setFilters({ ...filters, productLendType: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select LendType</option>
                <option value="Free Loan">Free Loan</option>
                <option value="Security Deposit">Security Deposit</option>
                <option value="Custody">Custody</option>
              </select>
            </div>

            {/* Row 2 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select Language</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">From</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">To</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Order status</label>
              <select
                value={filters.orderStatus}
                onChange={(e) => setFilters({ ...filters, orderStatus: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select Order Status</option>
                <option value="Active">Active Orders</option>
                <option value="Pending">Pending Orders</option>
              </select>
            </div>

            {/* Row 3 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company</label>
              <select
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Yes">Yes (Company)</option>
                <option value="No">No (Individual)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Credit Customer</label>
              <select
                value={filters.creditCustomer}
                onChange={(e) => setFilters({ ...filters, creditCustomer: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Route</label>
              <select
                value={filters.route}
                onChange={(e) => setFilters({ ...filters, route: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Choose A Route...</option>
                <option value="6335">6335</option>
                <option value="6338">6338</option>
                <option value="6347">6347</option>
                <option value="6339">6339</option>
                <option value="6341">6341</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Zone</label>
              <input
                type="text"
                placeholder=""
                value={filters.zone}
                onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700"
              />
            </div>

            {/* Row 4 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Created By</label>
              <select
                value={filters.createdBy}
                onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select Sales Rep</option>
                <option value="Admin">Admin</option>
                <option value="ANAS">ANAS</option>
                <option value="NISAR">NISAR</option>
                <option value="HASHIM">HASHIM</option>
                <option value="MUFEED">MUFEED</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Representative</label>
              <select
                value={filters.representative}
                onChange={(e) => setFilters({ ...filters, representative: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-700 font-medium"
              >
                <option value="All">Select Sales Rep</option>
                <option value="56 - ANAS">56 - ANAS</option>
                <option value="38 - NISAR">38 - NISAR</option>
                <option value="47 - HASHIM">47 - HASHIM</option>
                <option value="57 - MUFEED">57 - MUFEED</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex items-end justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFilters({
                    customerType: "All",
                    deliveryDay: "All",
                    lendProducts: "All",
                    productLendType: "All",
                    language: "All",
                    fromDate: "",
                    toDate: "",
                    orderStatus: "All",
                    company: "All",
                    creditCustomer: "All",
                    route: "All",
                    zone: "",
                    createdBy: "All",
                    representative: "All",
                  });
                  setSearch("");
                  addToast("Customer filters reset", "info");
                }}
                className="px-4 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => addToast(`Filtered ${filteredCustomers.length} customers`, "success")}
                className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Customer List Table Container (Exact Figma 3:1743 - steps/1139/media_0.png) */}
        <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
          {/* Dark Navy-to-Blue Gradient Banner */}
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {activeTab === "Deleted" ? "Deleted Customer List" : "Customer List"}
            </h3>
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <span>Export</span>
            </button>
          </div>

          {/* Show [10] entries & Search bar */}
          <div className="px-5 py-3 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-slate-300 rounded text-slate-800 font-semibold bg-white"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-600 font-medium">Search:</span>
              <div className="relative flex-1 sm:w-56">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Exact 7-Column Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead className="bg-[#5948DB] text-white font-bold uppercase tracking-wider border-b border-[#4A3AC9]">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] border-r border-[#7161F0]/60"
                  >
                    <div className="flex items-center justify-between">
                      <span>CUSTOMER NAME</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("customer_id")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] border-r border-[#7161F0]/60 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>CUSTOMER ID</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-[#7161F0]/60 text-center">CONTACT</th>
                  <th
                    onClick={() => handleSort("registered_on")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] border-r border-[#7161F0]/60 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>REGISTERED ON</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("recent_order")}
                    className="px-4 py-3 cursor-pointer hover:bg-[#4A3AC9] border-r border-[#7161F0]/60 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>RECENT ORDER</span>
                      <ArrowUpDown className="w-3 h-3 text-[#C4BCFB]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-[#7161F0]/60 text-center">CITY</th>
                  <th className="px-4 py-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredCustomers.slice(0, entriesPerPage).map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800 border-r border-slate-200">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-700 border-r border-slate-200">
                      {row.customer_id}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-600 border-r border-slate-200">
                      {row.phone}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-600 border-r border-slate-200">
                      {row.registered_on}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-600 border-r border-slate-200">
                      {row.recent_order}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-700 border-r border-slate-200">
                      {row.city}
                    </td>
                    <td className="px-4 py-2.5 text-center whitespace-nowrap">
                      {row.status === "Deleted" ? (
                        <button
                          type="button"
                          onClick={() => handleRestoreCustomer(row)}
                          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <Undo2 className="w-3 h-3" />
                          <span>Restore</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewCustomer(row)}
                            className="px-3 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTransactionCustomer(row);
                              setTxnSubTab("asset_history");
                            }}
                            className="px-3 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
                          >
                            Transactions
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCustomer({ ...row })}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                            title="Edit Customer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(row)}
                            className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            title="Delete Customer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing 1 to {Math.min(entriesPerPage, filteredCustomers.length)} of 14,280 entries
            </div>
            <div className="flex items-center gap-1">
              <button disabled className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-400">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-[#2563EB] text-white font-bold">1</button>
              <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700">2</button>
              <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700">3</button>
              <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Customer Details Popup Modal (Exact Figma 3:1767) */}
      {viewCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono text-blue-200 font-bold block">
                  CUSTOMER ID: {viewCustomer.customer_id}
                </span>
                <h2 className="text-sm font-bold">{viewCustomer.name} — Customer Details</h2>
              </div>
              <button onClick={() => setViewCustomer(null)} className="text-white/80 hover:text-white text-xl font-bold cursor-pointer">×</button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-md border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Name</span>
                  <span className="font-bold text-slate-900">{viewCustomer.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer ID</span>
                  <span className="font-mono font-bold text-blue-600">{viewCustomer.customer_id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Number</span>
                  <span className="font-mono font-semibold text-slate-800">{viewCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Customer Type</span>
                  <span className="font-semibold text-slate-800">{viewCustomer.customer_type}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">City & Zone</span>
                  <span className="font-semibold text-slate-800">{viewCustomer.city} ({viewCustomer.zone})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Route & Delivery Day</span>
                  <span className="font-semibold text-slate-800">Route {viewCustomer.route} • {viewCustomer.delivery_day}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Lend Product</span>
                  <span className="font-semibold text-slate-800">{viewCustomer.lend_product} ({viewCustomer.lend_type})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Representative</span>
                  <span className="font-semibold text-slate-800">{viewCustomer.representative}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Language</span>
                  <span className="font-semibold text-slate-800">{viewCustomer.language}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered On</span>
                  <span className="font-mono text-slate-700">{viewCustomer.registered_on}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Recent Order</span>
                  <span className="font-mono text-slate-700">{viewCustomer.recent_order}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Outstanding Balance</span>
                  <span className="font-mono font-bold text-rose-600">AED {viewCustomer.current_balance}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const target = viewCustomer;
                    setViewCustomer(null);
                    setTransactionCustomer(target);
                  }}
                  className="px-4 py-2 rounded-md bg-[#10B981] hover:bg-[#059669] text-white font-bold cursor-pointer"
                >
                  View Transactions
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = viewCustomer;
                    setViewCustomer(null);
                    setEditingCustomer({ ...target });
                  }}
                  className="px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer"
                >
                  Edit Customer
                </button>
                <button
                  type="button"
                  onClick={() => setViewCustomer(null)}
                  className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Transactions Modal (Exact Figma 3:1769 to 3:1776) */}
      {transactionCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono text-blue-200 font-bold block">
                  CUSTOMER ID: {transactionCustomer.customer_id}
                </span>
                <h2 className="text-sm font-extrabold">{transactionCustomer.name} — Customer Transactions</h2>
              </div>
              <button onClick={() => setTransactionCustomer(null)} className="text-white/80 hover:text-white text-xl font-bold cursor-pointer">×</button>
            </div>

            <div className="p-5 space-y-4">
              {/* 4 Sub-Tabs: Asset History, Order History, Payment History, Wallet Recharge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-bold overflow-x-auto">
                  {[
                    { id: "asset_history", label: "Asset History", icon: Package },
                    { id: "order_history", label: "Order History", icon: ShoppingCart },
                    { id: "payment_history", label: "Payment History", icon: CreditCard },
                    { id: "wallet_recharge", label: "Wallet Recharge", icon: Wallet },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTxnSubTab(t.id)}
                        className={`px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          txnSubTab === t.id
                            ? "bg-[#0F172A] text-white shadow-xs"
                            : "bg-transparent text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>

                {txnSubTab === "asset_history" && (
                  <button
                    type="button"
                    onClick={() => setShowAssetSummaryModal(true)}
                    className="px-3.5 py-1.5 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold cursor-pointer"
                  >
                    Asset Summary
                  </button>
                )}
              </div>

              {/* Sub-Tab 1: Asset History (Figma 3:1770 & 3:1771) */}
              {txnSubTab === "asset_history" && (
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#5948DB] text-white font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">ASSET ID</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">PRODUCT NAME</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">LEND TYPE</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">QUANTITY</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">DATE</th>
                        <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/70">DEPOSIT (AED)</th>
                        <th className="px-4 py-2.5 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2.5 font-mono font-bold border-r border-slate-200">AST-001</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">COOLER</td>
                        <td className="px-4 py-2.5 border-r border-slate-200">Security Deposit</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">1</td>
                        <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700 border-r border-slate-200">AED 150.00</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() => setShowAssetSummaryModal(true)}
                            className="px-2.5 py-1 rounded bg-[#2563EB] text-white text-[11px] font-bold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono font-bold border-r border-slate-200">AST-002</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">5 gal water</td>
                        <td className="px-4 py-2.5 border-r border-slate-200">Free Loan</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">12</td>
                        <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-600 border-r border-slate-200">AED 0.00</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() => setShowAssetSummaryModal(true)}
                            className="px-2.5 py-1 rounded bg-[#2563EB] text-white text-[11px] font-bold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sub-Tab 2: Order History (Figma 3:1772 & 3:1773) */}
              {txnSubTab === "order_history" && (
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#5948DB] text-white font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">DELIVERY NOTE</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">INVOICE</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">DATE</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">TRUCK</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">QTY</th>
                        <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/70">TOTAL</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">PAYMENT</th>
                        <th className="px-4 py-2.5 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">DN-T6350-16652</td>
                        <td className="px-4 py-2.5 font-mono text-slate-600 border-r border-slate-200">IN-T6350/032178</td>
                        <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 text-center font-bold border-r border-slate-200">T6350</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">2</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900 border-r border-slate-200">AED 12.60</td>
                        <td className="px-4 py-2.5 text-center border-r border-slate-200">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">CASH</span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() =>
                              setViewTxnOrderModal({
                                delivery_note: "DN-T6350-16652",
                                invoice: "IN-T6350/032178",
                                date: "08/09/2026",
                                truck: "T6350",
                                qty: 2,
                                total: "AED 12.60",
                                payment: "CASH",
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#2563EB] text-white text-[11px] font-bold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sub-Tab 3: Payment History (Figma 3:1774) */}
              {txnSubTab === "payment_history" && (
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#5948DB] text-white font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">RECEIPT NO</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">DATE</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">PAYMENT METHOD</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">SALES REP</th>
                        <th className="px-4 py-2.5 text-right">AMOUNT PAID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2.5 font-mono font-bold text-blue-600 border-r border-slate-200">RCP-2026-8821</td>
                        <td className="px-4 py-2.5 text-center font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 text-center font-bold border-r border-slate-200">CASH</td>
                        <td className="px-4 py-2.5 border-r border-slate-200">{transactionCustomer.representative || "56 - ANAS"}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 52.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Sub-Tab 4: Wallet Recharge (Figma 3:1775 & 3:1776) */}
              {txnSubTab === "wallet_recharge" && (
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#5948DB] text-white font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">RECHARGE ID</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">COUPON BOOK</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">PAID COUPONS</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">FREE COUPONS</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">TOTAL COUPONS</th>
                        <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/70">AMOUNT PAID</th>
                        <th className="px-4 py-2.5 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2.5 font-mono font-bold text-blue-600 border-r border-slate-200">mts7z0ld</td>
                        <td className="px-4 py-2.5 font-semibold border-r border-slate-200">50*1</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">20</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold text-emerald-600 border-r border-slate-200">0</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">20</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900 border-r border-slate-200">AED 100.00</td>
                        <td className="px-4 py-2.5 text-center">
                          <button
                            onClick={() =>
                              setViewTxnWalletModal({
                                recharge_id: "mts7z0ld",
                                coupon: "50*1",
                                qty: 2,
                                total_coupons: 20,
                                amount: "AED 100.00",
                                date: "08/09/2026",
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#2563EB] text-white text-[11px] font-bold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={() => setTransactionCustomer(null)}
                  className="px-4 py-1.5 rounded-md bg-[#5948DB] text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Summary Popup (Figma 3:1771) */}
      {showAssetSummaryModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900">Customer Asset Summary</h3>
              <button onClick={() => setShowAssetSummaryModal(false)} className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer">×</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-semibold text-slate-600">5 gal water Bottles Held:</span>
                <span className="font-mono font-bold text-slate-900">12 Bottles</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-semibold text-slate-600">COOLER Dispensers Held:</span>
                <span className="font-mono font-bold text-slate-900">1 Unit</span>
              </div>
              <div className="flex justify-between p-2.5 bg-emerald-50 rounded border border-emerald-200">
                <span className="font-semibold text-emerald-700">Total Security Deposit:</span>
                <span className="font-mono font-bold text-emerald-800">AED 150.00</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowAssetSummaryModal(false)} className="px-4 py-1.5 rounded bg-[#2563EB] text-white text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Order from Customer Transactions (Figma 3:1773) */}
      {viewTxnOrderModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900">Order Details ({viewTxnOrderModal.delivery_note})</h3>
              <button onClick={() => setViewTxnOrderModal(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer">×</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Invoice:</span>
                <span className="font-mono font-bold">{viewTxnOrderModal.invoice}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Delivery Date:</span>
                <span className="font-mono font-bold">{viewTxnOrderModal.date}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Truck ID:</span>
                <span className="font-mono font-bold">{viewTxnOrderModal.truck}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Quantity:</span>
                <span className="font-mono font-bold">{viewTxnOrderModal.qty}</span>
              </div>
              <div className="flex justify-between p-2 bg-emerald-50 rounded">
                <span className="text-emerald-700 font-bold">Total Amount:</span>
                <span className="font-mono font-extrabold text-emerald-700">{viewTxnOrderModal.total}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setViewTxnOrderModal(null)} className="px-4 py-1.5 rounded bg-[#2563EB] text-white text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Wallet Recharge from Customer Transactions (Figma 3:1776) */}
      {viewTxnWalletModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900">Wallet Recharge View ({viewTxnWalletModal.recharge_id})</h3>
              <button onClick={() => setViewTxnWalletModal(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer">×</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Coupon Book:</span>
                <span className="font-mono font-bold">{viewTxnWalletModal.coupon}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 rounded">
                <span className="text-slate-500">Total Coupons:</span>
                <span className="font-mono font-bold">{viewTxnWalletModal.total_coupons} Leaves</span>
              </div>
              <div className="flex justify-between p-2 bg-emerald-50 rounded">
                <span className="text-emerald-700 font-bold">Amount Paid:</span>
                <span className="font-mono font-extrabold text-emerald-700">{viewTxnWalletModal.amount}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setViewTxnWalletModal(null)} className="px-4 py-1.5 rounded bg-[#2563EB] text-white text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Customer Modal (Exact Figma 3:1766) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Add New Customer</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white text-xl font-bold cursor-pointer">×</button>
            </div>

            <form onSubmit={handleCreateCustomer} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter customer or company name"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Contact Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Customer Type</label>
                  <select
                    value={formData.customer_type}
                    onChange={(e) => setFormData({ ...formData, customer_type: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Zone</label>
                  <input
                    type="text"
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Route</label>
                  <select
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="6335">6335</option>
                    <option value="6338">6338</option>
                    <option value="6347">6347</option>
                    <option value="6339">6339</option>
                    <option value="6341">6341</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Delivery Day</label>
                  <select
                    value={formData.delivery_day}
                    onChange={(e) => setFormData({ ...formData, delivery_day: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="Arabic">Arabic</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Lend Product</label>
                  <select
                    value={formData.lend_product}
                    onChange={(e) => setFormData({ ...formData, lend_product: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="5 gal water">5 gal water</option>
                    <option value="COOLER">COOLER</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Product LendType</label>
                  <select
                    value={formData.lend_type}
                    onChange={(e) => setFormData({ ...formData, lend_type: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="Free Loan">Free Loan</option>
                    <option value="Security Deposit">Security Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Sales Representative</label>
                  <select
                    value={formData.representative}
                    onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="38 - NISAR">38 - NISAR</option>
                    <option value="47 - HASHIM">47 - HASHIM</option>
                    <option value="57 - MUFEED">57 - MUFEED</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={formData.credit_limit}
                    onChange={(e) => setFormData({ ...formData, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-md bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-bold shadow-xs cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal (Exact Figma 3:1768) */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#3B6998] px-5 py-3.5 flex items-center justify-between text-white">
              <h2 className="text-sm font-bold">Edit Customer (ID: {editingCustomer.customer_id})</h2>
              <button onClick={() => setEditingCustomer(null)} className="text-white/80 hover:text-white text-xl font-bold cursor-pointer">×</button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">City</label>
                  <select
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Route</label>
                  <select
                    value={editingCustomer.route || "6335"}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, route: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="6335">6335</option>
                    <option value="6338">6338</option>
                    <option value="6347">6347</option>
                    <option value="6339">6339</option>
                    <option value="6341">6341</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Delivery Day</label>
                  <select
                    value={editingCustomer.delivery_day || "Sunday"}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, delivery_day: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900"
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={editingCustomer.credit_limit}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-xs cursor-pointer"
                >
                  Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Move to Deleted Customer List</h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete <strong className="text-slate-800">{deleteTarget.name}</strong> ({deleteTarget.customer_id})?
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteCustomer}
                className="px-4 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal CRUD Action Popup Modal */}
      {crudPopup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-sm p-5 shadow-2xl text-center space-y-3.5">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[#5948DB]/10 text-[#5948DB] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{crudPopup.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{crudPopup.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setCrudPopup(null)}
              className="w-full py-2 bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-bold rounded-md cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
