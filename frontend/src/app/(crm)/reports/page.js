"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import CalendarPopover from "@/components/CalendarPopover";
import { useToast } from "@/components/Toast";
import {
  Download,
  Printer,
  Calendar,
  BarChart3,
  TrendingUp,
  Coins,
  Truck,
  CheckCircle,
  FileSpreadsheet,
  Filter,
} from "lucide-react";

export default function ReportsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("salesman");
  const [selectedIds, setSelectedIds] = useState([]);
  const [dateRange, setDateRange] = useState("November 2026 (Month-to-Date)");

  // 1. Salesman Data (Figma Schema)
  const salesmanData = [
    {
      id: 104,
      salesman_name: "Anas",
      security_deposit: 0.0,
      order_collection: 430.0,
      wallet_recharge: 500.0,
      credit_collection: 120.0,
      total_collection: 1050.0,
    },
    {
      id: 108,
      salesman_name: "Nisar",
      security_deposit: 50.0,
      order_collection: 565.0,
      wallet_recharge: 200.0,
      credit_collection: 340.0,
      total_collection: 1155.0,
    },
    {
      id: 102,
      salesman_name: "Hashim",
      security_deposit: 0.0,
      order_collection: 320.0,
      wallet_recharge: 0.0,
      credit_collection: 0.0,
      total_collection: 320.0,
    },
    {
      id: 105,
      salesman_name: "Mufeed",
      security_deposit: 100.0,
      order_collection: 710.0,
      wallet_recharge: 350.0,
      credit_collection: 180.0,
      total_collection: 1340.0,
    },
    {
      id: 101,
      salesman_name: "Mohammed Rashid",
      security_deposit: 50.0,
      order_collection: 890.0,
      wallet_recharge: 600.0,
      credit_collection: 220.0,
      total_collection: 1760.0,
    },
    {
      id: 103,
      salesman_name: "Ahmed Al Mansoori",
      security_deposit: 0.0,
      order_collection: 640.0,
      wallet_recharge: 150.0,
      credit_collection: 90.0,
      total_collection: 880.0,
    },
  ];

  // 2. Customer Consumption Data
  const customerData = [
    {
      id: 101,
      customer_name: "Al Ain Palace Hotel",
      code: "CUST-AA-001",
      city: "AL AIN",
      monthly_consumed: 1450,
      wallet_balance: 1250.0,
      outstanding_due: 0.0,
      status: "VIP Paid",
    },
    {
      id: 102,
      customer_name: "Emirates Steel Staff Quarters",
      code: "CUST-AD-002",
      city: "ABU DHABI",
      monthly_consumed: 2100,
      wallet_balance: 45.0,
      outstanding_due: 4200.0,
      status: "Payment Due",
    },
    {
      id: 103,
      customer_name: "Oasis Kindergarten Al Ain",
      code: "CUST-AA-002",
      city: "AL AIN",
      monthly_consumed: 280,
      wallet_balance: 890.0,
      outstanding_due: 0.0,
      status: "VIP Paid",
    },
    {
      id: 104,
      customer_name: "Hilton Al Ain Executive Lounge",
      code: "CUST-AA-007",
      city: "AL AIN",
      monthly_consumed: 1800,
      wallet_balance: 2450.0,
      outstanding_due: 0.0,
      status: "VIP Paid",
    },
  ];

  // 3. Truck Inventory Data
  const truckData = [
    {
      id: 201,
      truck_plate: "DXB-78901 (Isuzu 4-Ton)",
      driver: "Mohammed Rashid",
      morning_load: 350,
      delivered: 280,
      empty_returned: 275,
      remaining_on_truck: 70,
    },
    {
      id: 202,
      truck_plate: "AA-45210 (Mitsubishi Canter)",
      driver: "Ahmed Al Mansoori",
      morning_load: 400,
      delivered: 380,
      empty_returned: 370,
      remaining_on_truck: 20,
    },
    {
      id: 203,
      truck_plate: "AD-88301 (Isuzu 5-Ton)",
      driver: "Bilal Farooq",
      morning_load: 450,
      delivered: 410,
      empty_returned: 400,
      remaining_on_truck: 40,
    },
  ];

  const filterTabs = [
    { id: "salesman", label: "Salesman Performance Report", count: salesmanData.length },
    { id: "customer", label: "Customer Consumption Report", count: customerData.length },
    { id: "truck", label: "Truck Daily Stock Tally", count: truckData.length },
  ];

  const handlePrint = () => {
    addToast("Preparing report print spooler...", "info");
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === "salesman") {
      csvContent += "ID,SALESMAN NAME,SECURITY DEPOSIT,ORDER COLLECTION,WALLET RECHARGE,CREDIT COLLECTION,TOTAL COLLECTION\n";
      salesmanData.forEach((r) => {
        csvContent += `${r.id},"${r.salesman_name}",${r.security_deposit},${r.order_collection},${r.wallet_recharge},${r.credit_collection},${r.total_collection}\n`;
      });
    } else if (activeTab === "customer") {
      csvContent += "Customer Name,Code,City,Monthly Consumed (Bottles),Wallet Balance (AED),Outstanding Due (AED),Status\n";
      customerData.forEach((r) => {
        csvContent += `"${r.customer_name}","${r.code}","${r.city}",${r.monthly_consumed},${r.wallet_balance},${r.outstanding_due},"${r.status}"\n`;
      });
    } else {
      csvContent += "Truck Plate,Driver,Morning Load,Delivered,Empty Returned,Remaining On Truck\n";
      truckData.forEach((r) => {
        csvContent += `"${r.truck_plate}","${r.driver}",${r.morning_load},${r.delivered},${r.empty_returned},${r.remaining_on_truck}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AlQattara_${activeTab}_report_nov2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Exported ${activeTab} report to CSV successfully!`, "success");
  };

  // Dynamic Columns based on activeTab
  const getColumns = () => {
    if (activeTab === "salesman") {
      return [
        {
          key: "id",
          label: "ID",
          sortable: true,
          render: (val) => (
            <span className="font-mono font-bold text-blue-700 text-xs bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60">
              {val}
            </span>
          ),
        },
        {
          key: "salesman_name",
          label: "SALESMAN NAME",
          sortable: true,
          render: (val) => (
            <div className="font-bold text-slate-900 text-xs">{val}</div>
          ),
        },
        {
          key: "security_deposit",
          label: "SECURITY DEPOSIT",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-slate-700 text-xs">
              AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          ),
        },
        {
          key: "order_collection",
          label: "ORDER COLLECTION",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-blue-700 text-xs">
              AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          ),
        },
        {
          key: "wallet_recharge",
          label: "WALLET RECHARGE",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-purple-700 text-xs">
              AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          ),
        },
        {
          key: "credit_collection",
          label: "CREDIT COLLECTION",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-amber-700 text-xs">
              AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          ),
        },
        {
          key: "total_collection",
          label: "TOTAL COLLECTION",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-black text-emerald-700 text-xs bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              AED {Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          ),
        },
      ];
    } else if (activeTab === "customer") {
      return [
        {
          key: "customer_name",
          label: "Customer Account",
          sortable: true,
          render: (val, row) => (
            <div>
              <div className="font-bold text-slate-900 text-xs">{val}</div>
              <div className="text-[10px] font-mono text-blue-600">{row.code} • {row.city}</div>
            </div>
          ),
        },
        {
          key: "monthly_consumed",
          label: "Monthly Quota",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-slate-900 text-xs">
              {val.toLocaleString()} Bottles
            </span>
          ),
        },
        {
          key: "wallet_balance",
          label: "Prepaid Wallet",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-emerald-700 text-xs">
              AED {val.toFixed(2)}
            </span>
          ),
        },
        {
          key: "outstanding_due",
          label: "Outstanding Due",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className={`font-mono font-bold text-xs ${val > 0 ? "text-rose-600" : "text-slate-400"}`}>
              AED {val.toFixed(2)}
            </span>
          ),
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          align: "center",
          render: (val) => (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                val.includes("Paid")
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {val}
            </span>
          ),
        },
      ];
    } else {
      return [
        {
          key: "truck_plate",
          label: "Vehicle & Plate",
          sortable: true,
          render: (val) => (
            <span className="font-mono font-bold text-slate-900 text-xs">{val}</span>
          ),
        },
        {
          key: "driver",
          label: "Driver in Charge",
          sortable: true,
          render: (val) => (
            <span className="font-medium text-slate-800 text-xs">{val}</span>
          ),
        },
        {
          key: "morning_load",
          label: "Morning Loaded",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono text-slate-700 text-xs">{val} Bottles</span>
          ),
        },
        {
          key: "delivered",
          label: "Delivered to Customer",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-blue-700 text-xs">{val} Bottles</span>
          ),
        },
        {
          key: "empty_returned",
          label: "Empty Bottles Recovered",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono text-slate-700 text-xs">{val}</span>
          ),
        },
        {
          key: "remaining_on_truck",
          label: "EOD Truck Balance",
          sortable: true,
          align: "right",
          render: (val) => (
            <span className="font-mono font-bold text-emerald-700 text-xs">{val} Bottles</span>
          ),
        },
      ];
    }
  };

  const getCurrentData = () => {
    if (activeTab === "salesman") return salesmanData;
    if (activeTab === "customer") return customerData;
    return truckData;
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Business Intelligence & Operational Reports" subtitle="Reports & Analytics" />

      <main className="p-6 space-y-5 flex-1 overflow-y-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Month Deliveries
              </span>
              <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              17,777 <span className="text-xs text-slate-400 font-normal">Bottles</span>
            </div>
            <div className="mt-1 text-[11px] text-blue-600 font-medium">
              Target on track (96.7%)
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Cash & Bank Inflow
              </span>
              <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-emerald-700">
              AED 133,050.00
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 font-medium">
              Zero uncollected arrears
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Fleet Recovery Rate
              </span>
              <div className="w-8 h-8 rounded-md bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-slate-900">
              95.4% Empty Return
            </div>
            <div className="mt-1 text-[11px] text-cyan-700 font-medium">
              16,960 polycarbonate shells recovered
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Commission Payout Due
              </span>
              <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold font-mono text-amber-700">
              AED 6,652.50
            </div>
            <div className="mt-1 text-[11px] text-amber-600 font-medium">
              For 5 active route drivers
            </div>
          </div>
        </div>

        {/* Date Filter & Export Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-md">
          <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
            <span className="text-slate-500">Reporting Cycle:</span>
            <CalendarPopover
              selectedDate={dateRange}
              onSelectDate={(newDate) => {
                setDateRange(newDate);
                addToast(`Report cycle updated to: ${newDate}`, "info");
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 rounded-md text-xs font-semibold border border-slate-200 hover:bg-slate-50 shadow-2xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold shadow-2xs transition-all active:scale-[0.98]"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* DataTable with Column Lines */}
        <DataTable
          columns={getColumns()}
          data={getCurrentData()}
          filterTabs={filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchPlaceholder="Search current report data..."
          searchKeys={
            activeTab === "salesman"
              ? ["staff_name", "route"]
              : activeTab === "customer"
              ? ["customer_name", "code", "city"]
              : ["truck_plate", "driver"]
          }
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </main>
    </div>
  );
}