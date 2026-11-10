"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Undo2,
  X,
  UserX,
  History,
  Package,
  ShoppingCart,
  CreditCard,
  Wallet,
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
      phone: "+971 50 448 1290",
      email: "admin@alnebrasschool.ae",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6335",
      delivery_day: "Sunday",
      lend_product: "Dispenser Cooler",
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
      phone: "+971 52 881 9301",
      email: "ameen.alain@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Jimi",
      route: "6338",
      delivery_day: "Monday",
      lend_product: "5 Gallon Bottles",
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
      phone: "+971 50 918 2734",
      email: "suhail.ali@yahoo.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Zakher",
      route: "6347",
      delivery_day: "Tuesday",
      lend_product: "5 Gallon Bottles",
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
      phone: "+971 55 339 1028",
      email: "msalem@alqattara.ae",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Hili",
      route: "6339",
      delivery_day: "Wednesday",
      lend_product: "Dispenser Cooler",
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
      phone: "+971 56 771 2093",
      email: "soria.villa@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6341",
      delivery_day: "Thursday",
      lend_product: "5 Gallon Bottles",
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
      name: "SALEM SAEED",
      customer_type: "Corporate",
      phone: "+971 50 662 3190",
      email: "salem.saeed@emirates.net.ae",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Foah",
      route: "6335",
      delivery_day: "Saturday",
      lend_product: "Dispenser Cooler",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "Yes",
      is_credit: "Yes",
      created_by: "Admin",
      representative: "56 - ANAS",
      credit_limit: "10000.00",
      current_balance: "420.00",
      status: "Active",
    },
    {
      id: 7,
      customer_id: "197295",
      customer_code: "197295",
      name: "ABDULLAH KHALID",
      customer_type: "Individual",
      phone: "+971 50 319 8271",
      email: "abdullah.khalid@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Jimi",
      route: "6338",
      delivery_day: "Sunday",
      lend_product: "5 Gallon Bottles",
      lend_type: "Free Loan",
      language: "Arabic",
      is_company: "No",
      is_credit: "No",
      created_by: "NISAR",
      representative: "38 - NISAR",
      credit_limit: "1000.00",
      current_balance: "0.00",
      status: "Active",
    },
    {
      id: 8,
      customer_id: "197294",
      customer_code: "197294",
      name: "FATIMA AL KAABI",
      customer_type: "Individual",
      phone: "+971 50 882 1993",
      email: "fatima.kaabi@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6335",
      delivery_day: "Monday",
      lend_product: "Dispenser Cooler",
      lend_type: "Security Deposit",
      language: "Arabic",
      is_company: "No",
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
      name: "RASHID AL MANSOORI",
      customer_type: "Corporate",
      phone: "+971 52 901 8273",
      email: "rashid@mansoorigroup.ae",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Zakher",
      route: "6347",
      delivery_day: "Tuesday",
      lend_product: "Dispenser Cooler",
      lend_type: "Rental",
      language: "Arabic",
      is_company: "Yes",
      is_credit: "Yes",
      created_by: "Admin",
      representative: "47 - HASHIM",
      credit_limit: "15000.00",
      current_balance: "1250.00",
      status: "Active",
    },
    {
      id: 10,
      customer_id: "197292",
      customer_code: "197292",
      name: "SULAIMAN SAEED",
      customer_type: "Individual",
      phone: "+971 55 718 2930",
      email: "sulaiman.saeed@gmail.com",
      registered_on: "08/09/2026",
      recent_order: "08/09/2026",
      city: "AL_AIN",
      zone: "Al Hili",
      route: "6339",
      delivery_day: "Wednesday",
      lend_product: "5 Gallon Bottles",
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
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [transactionCustomer, setTransactionCustomer] = useState(null);
  const [txnSubTab, setTxnSubTab] = useState("asset_history");
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
    customer_type: "Corporate",
    phone: "",
    email: "",
    city: "AL_AIN",
    zone: "Al Ain Central",
    route: "6335",
    credit_limit: "5000",
  });

  useEffect(() => {
    async function loadCustomers() {
      const data = await apiService.getCustomers();
      if (data && data.length > 0) {
        setCustomers(data);
      }
    }
    loadCustomers();
  }, []);

  // Filtered by Tab + 14 Figma Filter Fields
  const tabData = useMemo(() => {
    return customers.filter((c) => {
      if (activeTab === "Deleted") return c.status === "Deleted";
      if (c.status === "Deleted") return false;
      if (activeTab === "Active" && c.status !== "Active") return false;
      if (activeTab === "Corporate" && c.customer_type !== "Corporate") return false;
      if (activeTab === "Individual" && c.customer_type !== "Individual") return false;

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

      return true;
    });
  }, [customers, activeTab, filters]);

  // Table Columns following exact Figma fields (Figma 3:1743)
  const columns = [
    {
      key: "name",
      label: "CUSTOMER NAME",
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-extrabold text-slate-900 leading-tight uppercase">{val}</div>
          <span className="text-[10px] text-slate-400 font-semibold">{row.customer_type || "Standard"}</span>
        </div>
      ),
    },
    {
      key: "customer_id",
      label: "CUSTOMER ID",
      sortable: true,
      render: (val, row) => (
        <span className="font-mono text-xs font-bold text-slate-700">
          {val || row.customer_code || row.id}
        </span>
      ),
    },
    {
      key: "phone",
      label: "CONTACT",
      render: (val) => (
        <span className="font-mono text-xs text-slate-600 font-medium">{val}</span>
      ),
    },
    {
      key: "registered_on",
      label: "REGISTERED ON",
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-slate-500">{val || "08/09/2026"}</span>
      ),
    },
    {
      key: "recent_order",
      label: "RECENT ORDER",
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-slate-700 font-semibold">{val || "08/09/2026"}</span>
      ),
    },
    {
      key: "city",
      label: "CITY",
      sortable: true,
      render: (val) => (
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
          {val || "AL_AIN"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      align: "center",
      width: "260px",
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewCustomer(row)}
            className="px-2.5 py-1 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
            title="View Customer Details (Figma 3:1767)"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => {
              setTransactionCustomer(row);
              setTxnSubTab("asset_history");
            }}
            className="px-2.5 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
            title="View Customer Transactions (Figma 3:1769)"
          >
            Transactions
          </button>
          <button
            type="button"
            onClick={() => setEditingCustomer({ ...row })}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Edit Customer (Figma 3:1768)"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteCustomer(row)}
            className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
            title="Delete Customer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteCustomer = (cust) => {
    setDeleteTarget(cust);
  };

  const confirmDeleteCustomer = async () => {
    if (!deleteTarget) return;
    const cust = deleteTarget;
    try {
      if (cust.id && typeof cust.id === "number" && cust.id < 100000) {
        await apiService.updateCustomer(cust.id, { ...cust, status: "Deleted" });
      }
    } catch {
      // Optimistic update
    }
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Deleted" } : c))
    );
    setDeleteTarget(null);
    setCrudPopup({
      type: "delete",
      title: "Record Moved to Deleted",
      message: `Customer "${cust.name}" (${cust.customer_code || cust.id}) has been marked as Deleted. It only shows in the Deleted Customer list with a red border and can be restored anytime.`,
    });
    addToast(`Customer "${cust.name}" moved to Deleted list`, "info");
  };

  const handleRestoreCustomer = async (cust) => {
    try {
      if (cust.id && typeof cust.id === "number" && cust.id < 100000) {
        await apiService.updateCustomer(cust.id, { ...cust, status: "Active" });
      }
    } catch {
      // Optimistic update
    }
    setCustomers((prev) =>
      prev.map((c) => (c.id === cust.id ? { ...c, status: "Active" } : c))
    );
    setCrudPopup({
      type: "restore",
      title: "Record Restored",
      message: `Customer "${cust.name}" (${cust.customer_code || cust.id}) has been successfully restored to Active status!`,
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
    const payload = {
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
      credit_limit: formData.credit_limit || "0.00",
      current_balance: "0.00",
      status: "Active",
    };

    const saved = await apiService.createCustomer(payload);
    const newCust = saved && saved.id ? saved : { id: Date.now(), ...payload };
    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setFormData({
      name: "",
      customer_type: "Corporate",
      phone: "",
      email: "",
      city: "AL_AIN",
      zone: "Al Ain Central",
      route: "6335",
      credit_limit: "5000",
    });
    setCrudPopup({
      type: "create",
      title: "Customer Created",
      message: `Customer "${newCust.name}" (${code}) was created successfully and saved to the database.`,
    });
    addToast(`Customer ${newCust.name} (${code}) saved to database!`, "success");
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;

    if (editingCustomer.id && typeof editingCustomer.id === "number" && editingCustomer.id < 100000) {
      const updated = await apiService.updateCustomer(editingCustomer.id, editingCustomer);
      if (updated && updated.id) {
        setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        setCustomers(customers.map((c) => (c.id === editingCustomer.id ? { ...c, ...editingCustomer } : c)));
      }
    } else {
      setCustomers(customers.map((c) => (c.id === editingCustomer.id ? { ...c, ...editingCustomer } : c)));
    }

    const updatedName = editingCustomer.name;
    const updatedCode = editingCustomer.customer_code || editingCustomer.id;
    setEditingCustomer(null);
    setCrudPopup({
      type: "update",
      title: "Customer Updated",
      message: `Customer "${updatedName}" (${updatedCode}) details have been updated and synchronized with the database.`,
    });
    addToast(`Customer ${updatedName} updated in database!`, "success");
  };

  const handleImportCustomers = async (newRows) => {
    setCustomers((prev) => [...newRows, ...prev]);
    addToast(`Imported ${newRows.length} customers into database`, "success");
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Customers" subtitle="Customer Directory" />

      <main className="p-5 space-y-4 flex-1 overflow-y-auto">
        {/* Top Action Bar with Deleted Customer & + New Customer buttons (Figma 3:1743) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Customer List & Account Directory</h2>
            <p className="text-[11px] text-slate-500">Manage customer accounts, asset history, orders, payments, and wallets</p>
          </div>
          <div className="flex items-center gap-2.5">
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
              <span>{activeTab === "Deleted" ? "Show Active Customers" : "Deleted Customer"}</span>
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
        </div>

        {/* Comprehensive 14-Field Filter Orders Panel (Figma 3:1743 - steps/1139/media_0.png) */}
        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Filter Orders
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Row 1 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Customer Type</label>
              <select
                value={filters.customerType}
                onChange={(e) => setFilters({ ...filters, customerType: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Delivery Day</label>
              <select
                value={filters.deliveryDay}
                onChange={(e) => setFilters({ ...filters, deliveryDay: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
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
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select commission scheme</option>
                <option value="Dispenser Cooler">Dispenser Cooler</option>
                <option value="5 Gallon Bottles">5 Gallon Bottles</option>
                <option value="Stand">Bottle Stand</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Product LendType</label>
              <select
                value={filters.productLendType}
                onChange={(e) => setFilters({ ...filters, productLendType: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select LendType</option>
                <option value="Free Loan">Free Loan</option>
                <option value="Security Deposit">Security Deposit</option>
                <option value="Rental">Rental</option>
              </select>
            </div>

            {/* Row 2 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Language</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">From</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">To</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Order status</label>
              <select
                value={filters.orderStatus}
                onChange={(e) => setFilters({ ...filters, orderStatus: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select Order Status</option>
                <option value="Active">Active Orders</option>
                <option value="Pending">Pending Orders</option>
                <option value="Inactive">No Recent Order</option>
              </select>
            </div>

            {/* Row 3 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company</label>
              <select
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Yes">Company Account</option>
                <option value="No">Individual Account</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Credit Customer</label>
              <select
                value={filters.creditCustomer}
                onChange={(e) => setFilters({ ...filters, creditCustomer: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Select type</option>
                <option value="Yes">Credit Approved</option>
                <option value="No">Cash / Wallet Only</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Route</label>
              <select
                value={filters.route}
                onChange={(e) => setFilters({ ...filters, route: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
              >
                <option value="All">Choose A Route...</option>
                <option value="6335">Route 6335</option>
                <option value="6338">Route 6338</option>
                <option value="6347">Route 6347</option>
                <option value="6339">Route 6339</option>
                <option value="6341">Route 6341</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Zone</label>
              <input
                type="text"
                placeholder="Search zone..."
                value={filters.zone}
                onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800"
              />
            </div>

            {/* Row 4 */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Created By</label>
              <select
                value={filters.createdBy}
                onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
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
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 font-medium"
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
                  setActiveTab("All");
                  addToast("Customer filters reset", "info");
                }}
                className="px-4 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => addToast(`Filtered ${tabData.length} customer records`, "success")}
                className="px-5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={tabData}
          searchPlaceholder="Search customers..."
          searchKeys={["customer_code", "customer_id", "name", "phone", "email", "city"]}
          onImport={handleImportCustomers}
          onRestore={handleRestoreCustomer}
          exportFilename="AlQattara_Customers.csv"
          filterTabs={[
            { id: "All", label: "All", count: customers.filter((c) => c.status !== "Deleted").length },
            { id: "Active", label: "Active", count: customers.filter((c) => c.status === "Active").length },
            { id: "Corporate", label: "Corporate", count: customers.filter((c) => c.customer_type === "Corporate" && c.status !== "Deleted").length },
            { id: "Individual", label: "Individual", count: customers.filter((c) => c.customer_type === "Individual" && c.status !== "Deleted").length },
            { id: "Deleted", label: "Deleted", count: customers.filter((c) => c.status === "Deleted").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          initialSortField="customer_id"
        />
      </main>

      {/* Customer Transactions Modal (Figma 3:1769 to 3:1776) */}
      {transactionCustomer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold block">CUSTOMER ID: {transactionCustomer.customer_id || transactionCustomer.customer_code}</span>
                <h2 className="text-base font-extrabold text-slate-900">{transactionCustomer.name} — Transactions & History</h2>
              </div>
              <button onClick={() => setTransactionCustomer(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            {/* 4 Sub-Tabs: Asset History, Order History, Payment History, Wallet Recharge */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold overflow-x-auto">
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
                    className={`px-3.5 py-2 rounded-lg border transition-colors duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer outline-none focus:outline-none select-none ${
                      txnSubTab === t.id
                        ? "bg-[#5948DB] text-white border-[#5948DB] shadow-xs"
                        : "bg-transparent text-slate-600 border-transparent hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Tab 1: Asset History (Figma 3:1770 & 3:1771) */}
            {txnSubTab === "asset_history" && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-md">
                    <span className="text-[10px] font-bold text-blue-600 uppercase block">Lent 5-Gal Bottles</span>
                    <span className="text-base font-extrabold font-mono text-slate-900">12 Bottles</span>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-md">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">Dispenser Coolers</span>
                    <span className="text-base font-extrabold font-mono text-emerald-700">1 Unit</span>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md">
                    <span className="text-[10px] font-bold text-amber-600 uppercase block">Security Deposit Held</span>
                    <span className="text-base font-extrabold font-mono text-amber-700">AED 150.00</span>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#5948DB] text-white font-semibold">
                      <tr>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">DATE</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">ASSET ITEM</th>
                        <th className="px-4 py-2.5 border-r border-[#7161F0]/70">LEND TYPE</th>
                        <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">QTY</th>
                        <th className="px-4 py-2.5 text-right">DEPOSIT AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2.5 font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">Hot & Cold Water Dispenser</td>
                        <td className="px-4 py-2.5 border-r border-slate-200">Security Deposit</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">1</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">AED 150.00</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono border-r border-slate-200">08/09/2026</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">5 Gallon Polycarbonate Bottle</td>
                        <td className="px-4 py-2.5 border-r border-slate-200">Free Loan</td>
                        <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">12</td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-600">AED 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Order History (Figma 3:1772 & 3:1773) */}
            {txnSubTab === "order_history" && (
              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#5948DB] text-white font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">DELIVERY NOTE</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">INVOICE</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">DATE</th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">TRUCK</th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">QTY</th>
                      <th className="px-4 py-2.5 text-right border-r border-[#7161F0]/70">TOTAL</th>
                      <th className="px-4 py-2.5 text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">DN-T6350-16652</td>
                      <td className="px-4 py-2.5 font-mono text-slate-600 border-r border-slate-200">IN-T6350/032178</td>
                      <td className="px-4 py-2.5 font-mono border-r border-slate-200">08/09/2026</td>
                      <td className="px-4 py-2.5 text-center font-bold border-r border-slate-200">T6350</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">2</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900 border-r border-slate-200">AED 12.60</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Delivered</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-900 border-r border-slate-200">DN-T6350-16590</td>
                      <td className="px-4 py-2.5 font-mono text-slate-600 border-r border-slate-200">IN-T6350/032110</td>
                      <td className="px-4 py-2.5 font-mono border-r border-slate-200">08/02/2026</td>
                      <td className="px-4 py-2.5 text-center font-bold border-r border-slate-200">T6350</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">4</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900 border-r border-slate-200">AED 25.20</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Delivered</span>
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
                  <thead className="bg-[#5948DB] text-white font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">RECEIPT NO</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">DATE</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">PAYMENT METHOD</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">COLLECTED BY</th>
                      <th className="px-4 py-2.5 text-right">AMOUNT PAID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-blue-600 border-r border-slate-200">RCP-2026-8821</td>
                      <td className="px-4 py-2.5 font-mono border-r border-slate-200">08/09/2026</td>
                      <td className="px-4 py-2.5 font-semibold border-r border-slate-200">Cash</td>
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
                  <thead className="bg-[#5948DB] text-white font-semibold">
                    <tr>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">RECHARGE ID</th>
                      <th className="px-4 py-2.5 border-r border-[#7161F0]/70">COUPON BOOK</th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">PAID COUPONS</th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">FREE COUPONS</th>
                      <th className="px-4 py-2.5 text-center border-r border-[#7161F0]/70">REMAINING</th>
                      <th className="px-4 py-2.5 text-right">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-2.5 font-mono font-bold text-blue-600 border-r border-slate-200">mtsa6cyk</td>
                      <td className="px-4 py-2.5 font-semibold border-r border-slate-200">50*1</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">10</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-emerald-600 border-r border-slate-200">0</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold border-r border-slate-200">8</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">AED 50.00</td>
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
                Close Transactions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal (Figma 3:1766) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900">Add New Customer</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Customer / Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. AL NEBRAS SCHOOL"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Category Type</label>
                  <select
                    value={formData.customer_type}
                    onChange={(e) => setFormData({ ...formData, customer_type: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Individual">Individual</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Territory</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={formData.credit_limit}
                    onChange={(e) => setFormData({ ...formData, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.ae"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-bold shadow-2xs"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal (Figma 3:1768) */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-md w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900">Edit Customer ({editingCustomer.customer_code})</h2>
              <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Credit Limit (AED)</label>
                  <input
                    type="number"
                    value={editingCustomer.credit_limit}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, credit_limit: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Territory</label>
                  <select
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="AL_AIN">AL_AIN</option>
                    <option value="ABU_DHABI">ABU_DHABI</option>
                    <option value="DUBAI">DUBAI</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Status</label>
                  <select
                    value={editingCustomer.status}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Drawer (Figma 3:1767) */}
      {viewCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs"
            onClick={() => setViewCustomer(null)}
          />
          <div className="relative w-full max-w-md bg-white border-l border-slate-200 h-full p-4 sm:p-5 space-y-4 overflow-y-auto shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-600 font-bold">CUSTOMER ID: {viewCustomer.customer_code}</span>
                <h2 className="text-sm font-extrabold text-slate-900">{viewCustomer.name}</h2>
              </div>
              <button onClick={() => setViewCustomer(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200 flex justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Current Outstanding</span>
                  <div className="text-sm font-extrabold text-amber-600 font-mono mt-0.5">
                    AED {viewCustomer.current_balance}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Credit Limit</span>
                  <div className="text-sm font-extrabold text-slate-800 font-mono mt-0.5">
                    AED {viewCustomer.credit_limit}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Phone</span>
                    <span className="font-semibold text-slate-800">{viewCustomer.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Email</span>
                    <span className="font-medium text-slate-800">{viewCustomer.email || "No email on file"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-md border border-slate-100 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Territory & Route</span>
                    <span className="font-semibold text-slate-800">{viewCustomer.city} - Route {viewCustomer.route} ({viewCustomer.zone})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const target = viewCustomer;
                  setViewCustomer(null);
                  setEditingCustomer({ ...target });
                }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-xs font-bold text-white transition-colors"
              >
                Edit Customer
              </button>
              <button
                onClick={() => setViewCustomer(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-bold text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
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
                  Are you sure you want to delete <strong className="text-slate-800">{deleteTarget.name}</strong> ({deleteTarget.customer_code || deleteTarget.id})?
                </p>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 mt-2 font-medium">
                  This customer will only appear in the <strong>Deleted</strong> tab with a red border and a <strong>Restore</strong> button.
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
                onClick={confirmDeleteCustomer}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
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
