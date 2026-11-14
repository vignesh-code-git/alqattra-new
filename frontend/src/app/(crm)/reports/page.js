"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import FilterPopup from "@/components/FilterPopup";
import Header from "@/components/Header";
import { useToast } from "@/components/Toast";
import confirmDelete from "@/components/confirmDelete";
import TableIO from "@/components/TableIO";
import PanelHeader from "@/components/PanelHeader";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";
import {
  listOf,
  salesmanReportFromApi,
  customerReportFromApi,
  truckReportFromApi,
  commissionReportFromApi,
} from "@/services/crmMappers";
import { ArrowUpDown, Download, BarChart3, Users, Truck, Percent } from "lucide-react";
import IosDateInput from "@/components/IosDateInput";

export default function ReportsPage() {
  const { addToast } = useToast();

  // Reports are worked out from the live records on every load.
  const loadLive = useCallback(async () => {
    const [salesmenRaw, ordersRaw, cashierRaw, customersRaw, walletsRaw, trucksRaw] = await Promise.all([
      apiService.getSalesmen(),
      apiService.getOrders(),
      apiService.getCashierTransactions(),
      apiService.getCustomers(),
      apiService.getWallets(),
      apiService.getTrucks(),
    ]);
    if (salesmenRaw == null) return null;
    const salesmen = listOf(salesmenRaw);
    const orders = listOf(ordersRaw);
    return {
      salesman: salesmanReportFromApi({ salesmen, orders, cashier: listOf(cashierRaw) }),
      customer: customerReportFromApi({ customers: listOf(customersRaw), orders, wallets: listOf(walletsRaw) }),
      truck: truckReportFromApi(listOf(trucksRaw)),
      commission: commissionReportFromApi(salesmen),
    };
  }, []);
  const live = useLiveData(loadLive);
  const reportRows = live.data || { salesman: [], customer: [], truck: [], commission: [] };
  const [activeTab, setActiveTab] = useState("salesman"); // "salesman" | "customer" | "truck" | "commission"

  // Tab 1: Salesman Filters
  const [salesmanFilters, setSalesmanFilters] = useState({
    from: "",
    to: "",
    salesman: "",
    route: "",
  });

  // Tab 2: Customer Filters
  const [customerFilters, setCustomerFilters] = useState({
    from: "",
    to: "",
    salesmanId: "",
    route: "",
    truck: "",
    zone: "",
    product: "",
  });

  // Tab 3: Truck Filters
  const [truckFilters, setTruckFilters] = useState({
    from: "",
    to: "",
    salesmanId: "",
    route: "",
    product: "",
  });

  // Tab 4: Commission Filters
  const [commissionFilters, setCommissionFilters] = useState({
    from: "",
    to: "",
    salesman: "",
  });

  const filteredSalesmanReport = useMemo(() => {
    return reportRows.salesman.filter((r) => {
      if (
        salesmanFilters.salesman &&
        !r.salesman.toLowerCase().includes(salesmanFilters.salesman.toLowerCase())
      ) {
        return false;
      }
      if (
        salesmanFilters.route &&
        !r.route.toLowerCase().includes(salesmanFilters.route.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [salesmanFilters, reportRows]);

  const filteredCustomerReport = useMemo(() => {
    return reportRows.customer.filter((r) => {
      if (
        customerFilters.salesmanId &&
        !r.id.toLowerCase().includes(customerFilters.salesmanId.toLowerCase()) &&
        !r.name.toLowerCase().includes(customerFilters.salesmanId.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [customerFilters, reportRows]);

  const filteredTruckReport = useMemo(() => {
    return reportRows.truck.filter((r) => {
      if (
        truckFilters.salesmanId &&
        !r.salesman.toLowerCase().includes(truckFilters.salesmanId.toLowerCase())
      ) {
        return false;
      }
      if (
        truckFilters.route &&
        !r.route.toLowerCase().includes(truckFilters.route.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [truckFilters, reportRows]);

  const filteredCommissionReport = useMemo(() => {
    return reportRows.commission.filter((r) => {
      if (
        commissionFilters.salesman &&
        !r.salesman.toLowerCase().includes(commissionFilters.salesman.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [commissionFilters, reportRows]);

  const runDelete = async (calls, done, fail) => {
    const results = await Promise.all(calls);
    if (results.some((x) => !x)) {
      addToast(fail, "error");
    } else {
      addToast(done, "info");
    }
    await live.refresh();
  };
  const deleteSalesmanRow = (r) =>
    runDelete([apiService.deleteSalesman(r.salesman_pk)], `Salesman ${r.salesman} deleted`, `Could not delete ${r.salesman} - check the CRM server`);
  const deleteCustomerRow = (r) =>
    runDelete([apiService.softDeleteCustomer(r.customer_pk)], `${r.name} moved to Deleted Customers`, `Could not delete ${r.name} - check the CRM server`);
  const deleteTruckRow = (r) =>
    runDelete(r.tx_ids.map((id) => apiService.deleteStockTransaction(id)), `Stock movements for ${r.truck_id} on ${r.date} deleted`, `Could not delete every stock movement for ${r.truck_id}`);
  const deleteCommissionRow = (r) =>
    runDelete([apiService.deleteCommission(r.id)], `Commission record for ${r.salesman} deleted`, `Could not delete the commission record for ${r.salesman}`);

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-sans pb-12">
      <Header title="Reports" subtitle="Analytics & Reports" />

      {/* iOS Translucent Glass Top Hero Bar */}
      {/* iOS Segmented Sub-tabs */}
      <div className="px-6 pt-5 pb-1 flex">
        <div className="bg-[#E5E5EA]/80 p-1 rounded-full border border-[#3C3C43]/5 inline-flex gap-1 backdrop-blur-md">
          {[
            { id: "salesman", label: "Salesman Collection" },
            { id: "customer", label: "Customer Report" },
            { id: "truck", label: "Truck Report" },
            { id: "commission", label: "Commission Report" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === t.id
                  ? "bg-white text-[#1C1C1E] shadow-sm"
                  : "text-[#8E8E93] hover:text-[#1C1C1E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-1 space-y-6">
        {/* TAB 1: SALESMAN COLLECTION REPORT (reposrts-salesman.png) */}
        {activeTab === "salesman" && (
          <>
            <FilterPopup title="Filter Parameters" className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    From
                  </label>
                  <IosDateInput
                    value={salesmanFilters.from}
                    onChange={(e) =>
                      setSalesmanFilters({ ...salesmanFilters, from: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    To
                  </label>
                  <IosDateInput
                    value={salesmanFilters.to}
                    onChange={(e) =>
                      setSalesmanFilters({ ...salesmanFilters, to: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Salesman
                  </label>
                  <select
                    value={salesmanFilters.salesman}
                    onChange={(e) =>
                      setSalesmanFilters({ ...salesmanFilters, salesman: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  >
                    <option value="">All Salesmen</option>
                    <option value="56 - ANAS">56 - ANAS</option>
                    <option value="38 - NISAR">38 - NISAR</option>
                    <option value="32 - NOOR">32 - NOOR</option>
                    <option value="47 - RAHMAN">47 - RAHMAN</option>
                    <option value="53 - SHAFEEQ">53 - SHAFEEQ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Route
                  </label>
                  <select
                    value={salesmanFilters.route}
                    onChange={(e) =>
                      setSalesmanFilters({ ...salesmanFilters, route: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  >
                    <option value="">All Routes</option>
                    <option value="6350">6350</option>
                    <option value="6356">6356</option>
                    <option value="6335">6335</option>
                    <option value="6354">6354</option>
                    <option value="6348">6348</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-3 mt-1 border-t border-[#3C3C43]/5">
                <button
                  type="button"
                  onClick={() =>
                    setSalesmanFilters({
                      from: "",
                      to: "",
                      salesman: "",
                      route: "",
                    })
                  }
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </FilterPopup>

            <div className="ios-surface overflow-hidden">
              <PanelHeader
                icon={BarChart3}
                title="Salesman Collection Report"
                tools={<TableIO name="salesman-collection-report" onExport={() => addToast("Exported Salesman Report CSV", "success")} />}
              />
              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {[
                        "SALESMAN",
                        "ROUTE",
                        "TOTAL ORDERS",
                        "CASH SALES",
                        "CARD SALES",
                        "WALLET SALES",
                        "CREDIT SALES",
                        "TOTAL REVENUE",
                        "COLLECTED",
                        "PENDING", "ACTIONS",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {filteredSalesmanReport.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">{r.salesman}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{r.route}</td>
                        <td className="py-3.5 px-4 font-medium">{r.orders}</td>
                        <td className="py-3.5 px-4">AED {r.cash}</td>
                        <td className="py-3.5 px-4">AED {r.card}</td>
                        <td className="py-3.5 px-4">AED {r.wallet}</td>
                        <td className="py-3.5 px-4">AED {r.credit}</td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">AED {r.total}</td>
                        <td className="py-3.5 px-4 text-[#34C759] font-bold">
                          AED {r.collected}
                        </td>
                        <td className="py-3.5 pl-4 pr-6 text-[#FF3B30] font-bold">
                          AED {r.pending}
                        </td>
                        <td className="py-3.5 px-4 last:pr-6">
                          <button
                            type="button"
                            onClick={async () => (await confirmDelete(`salesman ${r.salesman}`, "Their commission records go with them; their orders stay, without a salesman. All of it moves to the Bin for 30 days, and restoring links everything back.")) && deleteSalesmanRow(r)}
                            className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: CUSTOMER REPORT (customer report.png) */}
        {activeTab === "customer" && (
          <>
            <FilterPopup title="Filter Parameters" className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    FROM DATE
                  </label>
                  <IosDateInput
                    value={customerFilters.from}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, from: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    TO DATE
                  </label>
                  <IosDateInput
                    value={customerFilters.to}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, to: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    SALESMAN ID
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    value={customerFilters.salesmanId}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, salesmanId: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    ROUTE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Route"
                    value={customerFilters.route}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, route: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    TRUCK
                  </label>
                  <input
                    type="text"
                    placeholder="Select Truck"
                    value={customerFilters.truck}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, truck: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    ZONE
                  </label>
                  <input
                    type="text"
                    placeholder="Select Zone"
                    value={customerFilters.zone}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, zone: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    PRODUCTS
                  </label>
                  <input
                    type="text"
                    placeholder="Select Products"
                    value={customerFilters.product}
                    onChange={(e) =>
                      setCustomerFilters({ ...customerFilters, product: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-3 mt-1 border-t border-[#3C3C43]/5">
                <button
                  type="button"
                  onClick={() =>
                    setCustomerFilters({
                      from: "",
                      to: "",
                      salesmanId: "",
                      route: "",
                      truck: "",
                      zone: "",
                      product: "",
                    })
                  }
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </FilterPopup>

            <div className="ios-surface overflow-hidden">
              <PanelHeader
                icon={Users}
                title="Customer Report"
                tools={<TableIO name="customer-report" onExport={() => addToast("Exported Customer Report", "success")} />}
              />
              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {[
                        "ID",
                        "NAME",
                        "RECENT DELIVERY",
                        "TOTAL ORDERS",
                        "ORDER REVENUE",
                        "SECURITY DEPOSIT",
                        "WALLET RECHARGE",
                        "PENDING PAYMENT", "ACTIONS",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {filteredCustomerReport.map((r) => (
                      <tr key={r.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{r.id}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#1C1C1E]">{r.name}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.recent_delivery}</td>
                        <td className="py-3.5 px-4 font-medium">{r.total_orders}</td>
                        <td className="py-3.5 px-4 font-medium">{r.order_revenue}</td>
                        <td className="py-3.5 px-4">{r.security_deposit}</td>
                        <td className="py-3.5 px-4 text-[#007AFF] font-medium">{r.wallet_recharge}</td>
                        <td className="py-3.5 pl-4 pr-6 text-[#FF3B30] font-semibold">{r.pending_payment}</td>
                        <td className="py-3.5 px-4 last:pr-6">
                          <button
                            type="button"
                            onClick={async () => (await confirmDelete(`customer ${r.name}`, "They move to Deleted Customers and the Bin. After 30 days they are deleted for good.")) && deleteCustomerRow(r)}
                            className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 3: TRUCK REPORT (truck reposrt.png) */}
        {activeTab === "truck" && (
          <>
            <FilterPopup title="Filter Parameters" className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    From
                  </label>
                  <IosDateInput
                    value={truckFilters.from}
                    onChange={(e) =>
                      setTruckFilters({ ...truckFilters, from: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    To
                  </label>
                  <IosDateInput
                    value={truckFilters.to}
                    onChange={(e) =>
                      setTruckFilters({ ...truckFilters, to: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Salesman ID
                  </label>
                  <input
                    type="text"
                    placeholder="Salesman ID"
                    value={truckFilters.salesmanId}
                    onChange={(e) =>
                      setTruckFilters({ ...truckFilters, salesmanId: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Route
                  </label>
                  <input
                    type="text"
                    placeholder="Route"
                    value={truckFilters.route}
                    onChange={(e) =>
                      setTruckFilters({ ...truckFilters, route: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Select Products
                  </label>
                  <input
                    type="text"
                    placeholder="All Products"
                    value={truckFilters.product}
                    onChange={(e) =>
                      setTruckFilters({ ...truckFilters, product: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-3 mt-1 border-t border-[#3C3C43]/5">
                <button
                  type="button"
                  onClick={() =>
                    setTruckFilters({
                      from: "",
                      to: "",
                      salesmanId: "",
                      route: "",
                      product: "",
                    })
                  }
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </FilterPopup>

            <div className="ios-surface overflow-hidden">
              <PanelHeader
                icon={Truck}
                title="Truck Report"
                tools={<TableIO name="truck-report" onExport={() => addToast("Exported Truck Report", "success")} />}
              />
              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {[
                        "TRUCK ID",
                        "SALESMAN",
                        "ROUTE",
                        "DATE",
                        "TOTAL LOADED",
                        "TOTAL DELIVERED",
                        "TOTAL RETURNED",
                        "MESSAGES SENT", "ACTIONS",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {filteredTruckReport.map((r) => (
                      <tr key={r.key} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-mono text-[11px] font-medium">{r.truck_id}</td>
                        <td className="py-3.5 px-4 font-semibold">{r.salesman}</td>
                        <td className="py-3.5 px-4 font-mono text-xs">{r.route}</td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.date}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#007AFF]">{r.loaded}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#34C759]">{r.delivered}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#FF9500]">{r.returned}</td>
                        <td className="py-3.5 pl-4 pr-6">{r.messages}</td>
                        <td className="py-3.5 px-4 last:pr-6">
                          <button
                            type="button"
                            onClick={async () => (await confirmDelete(`${r.truck_id}'s stock movements on ${r.date}`, `This deletes ${r.tx_ids.length} stock record(s). They move to the Bin, where you can restore them for 30 days.`)) && deleteTruckRow(r)}
                            className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: COMMISSION REPORT (commission repo.png) */}
        {activeTab === "commission" && (
          <>
            <FilterPopup title="Filter Parameters" className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
                Filter Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    From
                  </label>
                  <IosDateInput
                    value={commissionFilters.from}
                    onChange={(e) =>
                      setCommissionFilters({ ...commissionFilters, from: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    To
                  </label>
                  <IosDateInput
                    value={commissionFilters.to}
                    onChange={(e) =>
                      setCommissionFilters({ ...commissionFilters, to: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#8E8E93] uppercase mb-1">
                    Salesman
                  </label>
                  <input
                    type="text"
                    placeholder="Select Salesman"
                    value={commissionFilters.salesman}
                    onChange={(e) =>
                      setCommissionFilters({ ...commissionFilters, salesman: e.target.value })
                    }
                    className="w-full border border-[#3C3C43]/15 bg-[#F2F2F7] rounded-xl px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 pt-3 mt-1 border-t border-[#3C3C43]/5">
                <button
                  type="button"
                  onClick={() =>
                    setCommissionFilters({
                      from: "",
                      to: "",
                      salesman: "",
                    })
                  }
                  className="px-4 py-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => addToast("Report filters applied", "info")}
                  className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </FilterPopup>

            <div className="ios-surface overflow-hidden">
              <PanelHeader
                icon={Percent}
                title="Commission Report"
                tools={<TableIO name="commission-report" onExport={() => addToast("Exported Commission Report", "success")} />}
              />
              <div className="overflow-x-auto">
                <table className="ios-table w-full text-left border-collapse">
                  <thead>
                    <tr className="ios-thead">
                      {[
                        "SALESMAN",
                        "CITY",
                        "COMMISSION SCHEMES",
                        "TOTAL SALES",
                        "FIXED COMMISSION",
                        "PERCENTAGE COMMISSION",
                        "TOTAL COMMISSION",
                        "DETAILS", "ACTIONS",
                      ].map((c) => (
                        <th key={c} className="py-3 px-4 first:pl-6 last:pr-6">
                          <div className="flex items-center justify-between gap-1">
                            <span>{c}</span>
                            <ArrowUpDown className="w-3 h-3 text-[#007AFF]/70" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA] text-xs text-[#1C1C1E]">
                    {filteredCommissionReport.map((r, i) => (
                      <tr key={i} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="py-3.5 pl-6 pr-4 font-semibold text-[#1C1C1E]">
                          {r.salesman}
                        </td>
                        <td className="py-3.5 px-4 text-[#8E8E93]">{r.city}</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#E5E5EA] text-[#1C1C1E]">
                            {r.schemes}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold">{r.total_sales}</td>
                        <td className="py-3.5 px-4">{r.fixed_comm}</td>
                        <td className="py-3.5 px-4">{r.pct_comm}</td>
                        <td className="py-3.5 px-4 font-bold text-[#007AFF]">{r.total_comm}</td>
                        <td className="py-3.5 pl-4 pr-6 text-[#8E8E93]">-</td>
                        <td className="py-3.5 px-4 last:pr-6">
                          <button
                            type="button"
                            onClick={async () => (await confirmDelete(`the commission record for ${r.salesman}`)) && deleteCommissionRow(r)}
                            className="px-3 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#FF3B30] hover:bg-[#FF3B30]/10 text-[11px] font-semibold transition cursor-pointer active:scale-95"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#F2F2F7]/70 font-bold text-[#1C1C1E]">
                      <td colSpan={3} className="py-3.5 pl-6 pr-4">
                        Total:
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1C1C1E]">181,059.66</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4">0.00</td>
                      <td className="py-3.5 px-4 text-[#007AFF]">0.00</td>
                      <td className="py-3.5 pl-4 pr-6" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
