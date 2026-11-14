"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import FilterPopup from "@/components/FilterPopup";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import StatCard, { hexFromTone } from "@/components/StatCard";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import { listOf, buildContext, invoiceFromApi, nonBilledFromApi, invoiceForOrder } from "@/services/crmMappers";
import BackLink from "@/components/BackLink";
import confirmDelete from "@/components/confirmDelete";
import TableIO from "@/components/TableIO";
import PanelHeader from "@/components/PanelHeader";
import {
  Home,
  ArrowUpDown,
  X,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter,
  RotateCcw,
  Plus,
  Download,
  Hourglass,
  Wallet,
  Receipt,
} from "lucide-react";
import IosDateInput from "@/components/IosDateInput";

export default function InvoicesPage() {
  const { addToast } = useToast();
  const loadLive = useCallback(async () => {
    const [invoicesRaw, ordersRaw, customersRaw, salesmenRaw] = await Promise.all([
      apiService.getInvoices(),
      apiService.getOrders(),
      apiService.getCustomers(),
      apiService.getSalesmen(),
    ]);
    if (invoicesRaw == null) return null;
    const apiInvoices = listOf(invoicesRaw);
    const apiOrders = listOf(ordersRaw);
    const context = {
      ...buildContext({ customers: listOf(customersRaw), salesmen: listOf(salesmenRaw) }),
      orderById: new Map(apiOrders.map((o) => [o.id, o])),
    };
    return {
      invoices: apiInvoices.map((inv) => invoiceFromApi(inv, context)),
      nonBilled: nonBilledFromApi(apiOrders, apiInvoices, context),
      count: apiInvoices.length,
    };
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

  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    if (live.data) setInvoices(live.data.invoices);
  }, [live.data]);
  const [viewMode, setViewMode] = useState("list"); // "list" | "generate"
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [viewModalInvoice, setViewModalInvoice] = useState(null);

  const invoiceQuantity = (inv) =>
    (inv.items || []).reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);

  const [invoiceFilters, setInvoiceFilters] = useState({
    customer: "",
    salesman: "",
    truck: "",
    fromDate: "",
    toDate: "",
  });

  const [billingFilter, setBillingFilter] = useState({
    customer_code: "",
    truck_id: "",
    from: "",
    to: "",
  });
  const [nonBilledList, setNonBilledList] = useState([]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const match =
          inv.invoice_no.toLowerCase().includes(q) ||
          inv.customer_name.toLowerCase().includes(q) ||
          inv.customer_id.toLowerCase().includes(q) ||
          inv.salesman_name.toLowerCase().includes(q) ||
          inv.truck.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Customer
      if (invoiceFilters.customer) {
        const c = invoiceFilters.customer.toLowerCase();
        if (
          !inv.customer_name.toLowerCase().includes(c) &&
          !inv.customer_id.toLowerCase().includes(c)
        ) {
          return false;
        }
      }

      // Sales Rep
      if (invoiceFilters.salesman) {
        if (!inv.salesman_name.toLowerCase().includes(invoiceFilters.salesman.toLowerCase())) {
          return false;
        }
      }

      // Truck
      if (invoiceFilters.truck) {
        if (!inv.truck.toLowerCase().includes(invoiceFilters.truck.toLowerCase())) {
          return false;
        }
      }

      // Date range (inv.order_date format: DD/MM/YYYY)
      if (invoiceFilters.fromDate || invoiceFilters.toDate) {
        const parts = inv.order_date.split("/").map(Number);
        if (parts.length === 3) {
          const invDate = new Date(parts[2], parts[1] - 1, parts[0]);
          if (invoiceFilters.fromDate) {
            const fDate = new Date(invoiceFilters.fromDate);
            if (invDate < fDate) return false;
          }
          if (invoiceFilters.toDate) {
            const tDate = new Date(invoiceFilters.toDate);
            if (invDate > tDate) return false;
          }
        }
      }

      return true;
    });
  }, [invoices, searchQuery, invoiceFilters]);

  const invoiceStats = useMemo(() => {
    const pendingRows = filteredInvoices.filter((inv) => inv.status !== "Delivered");
    return {
      total: filteredInvoices.length,
      amount: filteredInvoices.reduce((sum, inv) => sum + (Number(inv.total_amount) || 0), 0),
      pending: pendingRows.length,
      pendingAmount: pendingRows.reduce((sum, inv) => sum + (Number(inv.total_amount) || 0), 0),
    };
  }, [filteredInvoices]);

  const handleGetAllNonBilled = () => {
    // Orders that have no invoice yet, grouped per customer.
    const code = billingFilter.customer_code.trim().toLowerCase();
    const truck = billingFilter.truck_id.trim().toLowerCase();
    const list = (live.data?.nonBilled || []).filter(
      (b) =>
        (!code || b.customer_id.toLowerCase().includes(code) || b.customer_name.toLowerCase().includes(code)) &&
        (!truck || b.truck_id.toLowerCase().includes(truck))
    );
    setNonBilledList(list);
    addToast(
      list.length ? `Found ${list.length} customer(s) with non-billed orders` : "Every order is already billed",
      "info"
    );
  };

  const handleSelectBill = async (bill) => {
    // One invoice per order, numbered after the existing ones.
    let sequence = (live.data?.count || 0) + 1;
    let created = 0;
    for (const order of bill.orders) {
      const result = await apiService.createInvoice(invoiceForOrder(order, sequence));
      if (result) {
        created += 1;
        sequence += 1;
      }
    }
    if (!created) {
      addToast("Could not generate the invoice - check the CRM server", "error");
      return;
    }
    addToast(
      `Generated ${created} invoice${created === 1 ? "" : "s"} for ${bill.customer_name}`,
      created === bill.orders.length ? "success" : "info"
    );
    setNonBilledList((prev) => prev.filter((b) => b.id !== bill.id));
    await live.refresh();
    setViewMode("list");
  };

  const handleDeleteInvoice = async (inv) => {
    const result = await apiService.deleteInvoice(inv.id);
    if (!result) {
      addToast(`Could not delete invoice ${inv.invoice_no} - check the CRM server`, "error");
      return;
    }
    addToast(`Invoice ${inv.invoice_no} deleted`, "info");
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display',sans-serif]">
      <Header title="Invoice Dashboard" subtitle="Manage Invoices" />

      {/* iOS Hero Header Bar */}
      <div className="p-6 flex-1 space-y-6">
        {viewMode !== "list" && (
          <BackLink label="Back to Invoices" onClick={() => setViewMode("list")} />
        )}

        {viewMode === "list" ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InvoiceStat
                label="TOTAL INVOICE"
                value={invoiceStats.total.toLocaleString()}
                icon={Receipt}
                tone="bg-[#FF6B4A]"
              />
              <InvoiceStat
                label="INVOICE AMOUNT"
                value={invoiceStats.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                icon={Wallet}
                tone="bg-[#34C759]"
              />
              <InvoiceStat
                label="PENDING INVOICE"
                value={invoiceStats.pending.toLocaleString()}
                icon={Hourglass}
                tone="bg-[#FF9500]"
              />
              <InvoiceStat
                label="TOTAL PENDING"
                value={invoiceStats.pendingAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                icon={DollarSign}
                tone="bg-[#5856D6]"
              />
            </div>

            {/* Filter Invoices iOS Card (invoices.png) */}
            <FilterPopup title="Filter Orders" className="p-5">
              <h3 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#007AFF]" />
                Filter Orders
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Customer
                  </label>
                  <input
                    type="text"
                    value={invoiceFilters.customer}
                    onChange={(e) =>
                      setInvoiceFilters({ ...invoiceFilters, customer: e.target.value })
                    }
                    placeholder="Customer Name / ID"
                    className="w-full px-2.5 py-1.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] rounded-xl border border-[#3C3C43]/15 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Sales Rep
                  </label>
                  <select
                    value={invoiceFilters.salesman}
                    onChange={(e) =>
                      setInvoiceFilters({ ...invoiceFilters, salesman: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] rounded-xl border border-[#3C3C43]/15 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                  >
                    <option value="">All Sales Reps</option>
                    <option value="56">56 - ANAS</option>
                    <option value="38">38 - NISAR</option>
                    <option value="32">32 - NOOR</option>
                    <option value="53">53 - SHAFEEQ</option>
                    <option value="47">47 - RAHMAN</option>
                    <option value="48">48 - JASEEM</option>
                    <option value="84">84 - MUNEEB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Truck
                  </label>
                  <select
                    value={invoiceFilters.truck}
                    onChange={(e) =>
                      setInvoiceFilters({ ...invoiceFilters, truck: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] rounded-xl border border-[#3C3C43]/15 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                  >
                    <option value="">All Trucks</option>
                    <option value="T6350">T6350</option>
                    <option value="T6356">T6356</option>
                    <option value="T6335">T6335</option>
                    <option value="T6348">T6348</option>
                    <option value="T6354">T6354</option>
                    <option value="T6684">T6684</option>
                    <option value="T6357">T6357</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    From Date
                  </label>
                  <IosDateInput
                    value={invoiceFilters.fromDate}
                    onChange={(e) =>
                      setInvoiceFilters({ ...invoiceFilters, fromDate: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] rounded-xl border border-[#3C3C43]/15 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    To Date
                  </label>
                  <IosDateInput
                    value={invoiceFilters.toDate}
                    onChange={(e) =>
                      setInvoiceFilters({ ...invoiceFilters, toDate: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] rounded-xl border border-[#3C3C43]/15 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    addToast(`Filters applied: ${filteredInvoices.length} invoices found`, "success")
                  }
                  className="px-5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition inline-flex items-center gap-1.5"
                >
                  <Filter className="w-3 h-3" />
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceFilters({
                      customer: "",
                      salesman: "",
                      truck: "",
                      fromDate: "",
                      toDate: "",
                    });
                    addToast("Filters reset", "info");
                  }}
                  className="text-[#007AFF] hover:text-[#0062cc] text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>
            </FilterPopup>

            {/* Invoices Management Table Card */}
            <div className="ios-surface overflow-hidden">
              <PanelHeader
                icon={FileSpreadsheet}
                title="Recent Invoice"
                subtitle="Issued invoices, VAT and billing records"
               
                actions={
                  <button
                  type="button"
                  onClick={() => setViewMode("generate")}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FF2D55]/10 border border-[#FF2D55]/50 text-[#D6204A] text-[11.5px] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Generate Invoice
                </button>
                }
                tools={<TableIO name="recent-invoice" onExport={() => addToast("Exported invoice records", "success")} />}
              />

              <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8E8E93]">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="border border-[#3C3C43]/15 rounded-xl px-3 py-1.5 bg-[#F2F2F7] text-[#1C1C1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
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
                    placeholder="Search invoices..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-[#3C3C43]/15 rounded-full px-3.5 py-1.5 w-52 bg-[#F2F2F7] text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {[
                        "INVOICE ID",
                        "CUSTOMER",
                        "CUSTOMER ID",
                        "DATE",
                        "TRUCK",
                        "QUANTITY",
                        "TOTAL",
                        "ACTIONS",
                      ].map((col) => (
                        <th key={col} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{col}</span>
                            <ArrowUpDown className="w-3 h-3 sort-ico shrink-0" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[12px] text-[#1C1C1E]">
                    {filteredInvoices.slice(0, entriesPerPage).map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">
                          {inv.invoice_no}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#1C1C1E]">
                          {inv.customer_name}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93] font-mono">{inv.customer_id}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93] whitespace-nowrap">
                          {inv.order_date}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#007AFF] font-medium">
                          {inv.truck}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#1C1C1E]">
                          {invoiceQuantity(inv)}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1C1E] font-mono whitespace-nowrap">
                          AED {inv.total_amount}
                        </td>
                        <td className="py-3.5 pl-4 pr-6">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewModalInvoice(inv)}
                              className="px-3 py-1 rounded-full bg-white border border-[#007AFF]/50 text-[#0062CC] hover:bg-[#007AFF]/10 text-[11px] font-semibold cursor-pointer active:scale-95 transition"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={async () => (await confirmDelete(`invoice ${inv.invoice_no}`)) && handleDeleteInvoice(inv)}
                              className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold cursor-pointer active:scale-95 transition"
                            >
                              Delete
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
                  Showing 1 to {Math.min(entriesPerPage, filteredInvoices.length)} of{" "}
                  {filteredInvoices.length} entries
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-full bg-white border border-[#007AFF]/60 text-[#007AFF] text-xs font-semibold flex items-center justify-center shadow-xs">
                    1
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* GENERATE INVOICE SUB-VIEW (generate-invoices.png) */
          <div className="ios-surface overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-[#3C3C43]/11 bg-white">
              <h2 className="text-[#1C1C1E] font-semibold text-base tracking-tight">Billing Information</h2>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Customer Code
                    </label>
                    <input
                      type="text"
                      placeholder="Search customer code..."
                      value={billingFilter.customer_code}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, customer_code: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      Truck ID
                    </label>
                    <input
                      type="text"
                      placeholder="Search truck..."
                      value={billingFilter.truck_id}
                      onChange={(e) =>
                        setBillingFilter({ ...billingFilter, truck_id: e.target.value })
                      }
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      From
                    </label>
                    <IosDateInput
                      value={billingFilter.from}
                      onChange={(e) => setBillingFilter({ ...billingFilter, from: e.target.value })}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                      To
                    </label>
                    <IosDateInput
                      value={billingFilter.to}
                      onChange={(e) => setBillingFilter({ ...billingFilter, to: e.target.value })}
                      className="w-full border border-[#3C3C43]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] bg-[#F2F2F7] focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleGetAllNonBilled}
                    className="px-5 py-2.5 rounded-full bg-white border border-[#34C759]/60 text-[#34C759] hover:bg-[#34C759]/10 text-xs font-semibold cursor-pointer shadow-sm active:scale-98 transition"
                  >
                    GET ALL NON BILLED
                  </button>
                </div>
              </div>

              {/* Bills Table */}
              <div>
                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-3">Bills</h3>
                <div className="px-4 py-3 bg-[#F2F2F7]/60 border border-[#3C3C43]/10 rounded-t-2xl flex items-center justify-between text-xs text-[#8E8E93]">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="border border-[#3C3C43]/15 rounded-xl px-2.5 py-1 bg-white text-[#1C1C1E]">
                      <option>10</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <input
                      type="text"
                      className="border border-[#3C3C43]/15 rounded-full px-3 py-1 w-44 bg-white text-[#1C1C1E] text-xs focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto border-x border-b border-[#3C3C43]/10 rounded-b-2xl">
                  <table className="ios-table w-full text-left border-collapse">
                    <thead>
                      <tr className="ios-thead">
                        {[
                          "CUSTOMER NAME",
                          "CUSTOMER ID",
                          "TRUCK ID",
                          "PENDING ORDERS",
                          "TOTAL AMOUNT",
                          "VIEW DETAILS",
                          "SELECT BILL",
                        ].map((c) => (
                          <th key={c} className="py-3 px-4">
                            <div className="flex items-center justify-between">
                              <span>{c}</span>
                              <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-xs text-[#1C1C1E]">
                      {nonBilledList.map((bill) => (
                        <tr key={bill.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                          <td className="py-3 px-4 font-semibold">{bill.customer_name}</td>
                          <td className="py-3 px-4 text-[#8E8E93]">{bill.customer_id}</td>
                          <td className="py-3 px-4 text-[#8E8E93]">{bill.truck_id}</td>
                          <td className="py-3 px-4">{bill.pending_orders}</td>
                          <td className="py-3 px-4 font-bold">AED {bill.total_amount}</td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() =>
                                addToast(
                                  `${bill.pending_orders} non-billed orders for ${bill.customer_name}`,
                                  "info"
                                )
                              }
                              className="px-3 py-1 rounded-full bg-white border border-[#007AFF]/50 text-[#0062CC] hover:bg-[#007AFF]/10 text-[11px] font-semibold cursor-pointer active:scale-95 transition"
                            >
                              View
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleSelectBill(bill)}
                              className="px-3.5 py-1 rounded-full bg-white border border-[#34C759]/50 text-[#248A3D] hover:bg-[#34C759]/10 text-[11px] font-semibold cursor-pointer active:scale-95 transition"
                            >
                              Generate
                            </button>
                          </td>
                        </tr>
                      ))}
                      {nonBilledList.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-[#8E8E93] text-xs">
                            Showing 0 to 0 of 0 entries
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VIEW INVOICE DETAILS MODAL (view invoice.png) */}
      {viewModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[6px] p-4 animate-in fade-in duration-200">
          <div className="ios-pop bg-white rounded-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_64px_-12px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden">
            <div className="ios-pop-head px-6 py-4 border-b border-[#3C3C43]/10 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1C1C1E]">
                Order Details - {viewModalInvoice.invoice_no}
              </h3>
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1C1C1E]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F2F2F7]/50 p-4 rounded-2xl">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Customer Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Name:</span> {viewModalInvoice.customer_name}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Customer Code:</span> {viewModalInvoice.customer_id}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Zone:</span> {viewModalInvoice.zone || "MARKHANIA"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Salesman:</span> {viewModalInvoice.salesman_name}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Order Information</div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Invoice ID:</span> {viewModalInvoice.invoice_no}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Truck ID:</span> {viewModalInvoice.truck}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Date:</span> {viewModalInvoice.order_date}
                  </div>
                  <div>
                    <span className="font-semibold text-[#8E8E93]">Status:</span>{" "}
                    <span className="px-2.5 py-0.5 rounded-full bg-[#34C759]/15 text-[#34C759] text-[10.5px] font-semibold">
                      DELIVERED
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-[#1C1C1E] mb-2 text-xs">Order Items</div>
                <div className=" rounded-2xl overflow-hidden">
                  <table className="ios-table w-full text-left border-collapse">
                    <thead>
                      <tr className="ios-thead">
                        <th className="py-2.5 px-3">PRODUCT</th>
                        <th className="py-2.5 px-3">LEND TYPE</th>
                        <th className="py-2.5 px-3">QUANTITY</th>
                        <th className="py-2.5 px-3">UNIT PRICE</th>
                        <th className="py-2.5 px-3">TOTAL</th>
                      </tr>
                    </thead>
                  <tbody className="">
                    {(viewModalInvoice.items || []).map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-medium">{it.product}</td>
                        <td className="py-2.5 px-3 text-[#8E8E93]">{it.lend_type}</td>
                        <td className="py-2.5 px-3">{it.quantity}</td>
                        <td className="py-2.5 px-3">AED {Number(it.unit_price).toFixed(2)}</td>
                        <td className="py-2.5 px-3 font-semibold">
                          AED {(Number(it.quantity) * Number(it.unit_price)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="py-2.5 px-3 text-right font-semibold text-[#8E8E93]">
                        Subtotal
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#1C1C1E]">AED {viewModalInvoice.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#1C1C1E] mb-1 text-xs">Delivery Notes</div>
                <div className="text-[#8E8E93]">No special instructions</div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F2F2F7]/50 border-t border-[#3C3C43]/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setViewModalInvoice(null)}
                className="px-4 py-2 rounded-full bg-[#8E8E93]/20 hover:bg-[#8E8E93]/30 text-[#1C1C1E] text-xs font-semibold cursor-pointer active:scale-95 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InvoiceStat({ label, value, icon: Icon, tone }) {
  return <StatCard label={label} value={value} icon={Icon} color={hexFromTone(tone)} />;
}
