"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import {
  Truck,
  TrendingUp,
  UserPlus,
  Building2,
  Users2,
  UserX,
  WalletCards,
  CheckCircle2,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function DashboardPage() {
  const { addToast } = useToast();

  const [data, setData] = useState({
    metrics: {
      deliveries_today: 75,
      active_vehicles: 27,
      credit_sales: 5180.96,
      new_customers: 3,
      company_credit: 629585.24,
      customer_credit: 106067.82,
      deleted_customers: 3,
      total_collection: 18613.241,
    },
    top_products: [
      { name: "5 gal water", last_month: 0, this_month: 4677, change: "↑ Infinity%" },
      { name: "500ml PET Bottles", last_month: 0, this_month: 70, change: "↑ Infinity%" },
      { name: "empty bottle", last_month: 0, this_month: 12, change: "↑ Infinity%" },
      { name: "COOLER", last_month: 0, this_month: 4, change: "↑ Infinity%" },
    ],
  });

  const [selectedMonth, setSelectedMonth] = useState("November 2026");
  const [selectedProduct, setSelectedProduct] = useState("All Products");

  useEffect(() => {
    async function loadData() {
      const res = await apiService.getDashboardOverview();
      if (res) {
        setData(res);
      }
    }
    loadData();
  }, []);

  const m = data.metrics || {};

  // Doughnut chart config
  const revenueChartData = {
    labels: ["Cash", "Card", "Wallet", "Credit"],
    datasets: [
      {
        data: [70, 15, 10, 5],
        backgroundColor: ["#10b981", "#6366f1", "#06b6d4", "#f43f5e"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const collectionsChartData = {
    labels: ["Cash", "Card", "Wallet", "Credit"],
    datasets: [
      {
        data: [55, 30, 8, 7],
        backgroundColor: ["#6366f1", "#10b981", "#06b6d4", "#f43f5e"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "74%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 10,
        cornerRadius: 6,
      },
    },
  };

  // Line Chart config for Sales Trend
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales Trend (AED)",
        data: [0, 0.2, 0.5, 0.8, 1.0],
        borderColor: "#5948DB",
        backgroundColor: "rgba(89, 72, 219, 0.12)",
        tension: 0.35,
        fill: true,
        pointBackgroundColor: "#5948DB",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "#f1f5f9" },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
          callback: (val) => `AED ${val}`,
        },
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard Overview" subtitle="Dashboard" />

      <main className="p-5 space-y-5 flex-1 overflow-y-auto">
        {/* KPI Grid - 8 Cards with crisp enterprise borders and reduced border radius */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          <KpiCard
            title="Deliveries Today"
            value={m.deliveries_today ?? 75}
            icon={CheckCircle2}
            color="emerald"
          />
          <KpiCard
            title="Active Vehicles"
            value={m.active_vehicles ?? 27}
            icon={Truck}
            color="blue"
          />
          <KpiCard
            title="Credit Sales"
            value={`AED ${(m.credit_sales ?? 5180.96).toLocaleString()}`}
            icon={TrendingUp}
            color="amber"
          />
          <KpiCard
            title="New Customers"
            value={m.new_customers ?? 3}
            icon={UserPlus}
            color="cyan"
          />
          <KpiCard
            title="Company Credit"
            value={`AED ${(m.company_credit ?? 629585.24).toLocaleString()}`}
            icon={Building2}
            color="purple"
          />
          <KpiCard
            title="Customer Credit"
            value={`AED ${(m.customer_credit ?? 106067.82).toLocaleString()}`}
            icon={Users2}
            color="rose"
          />
          <KpiCard
            title="Deleted Customers"
            value={m.deleted_customers ?? 3}
            icon={UserX}
            color="slate"
          />
          <KpiCard
            title="Total collection"
            value={`AED ${(m.total_collection ?? 18613.241).toLocaleString()}`}
            icon={WalletCards}
            color="teal"
          />
        </div>

        {/* Charts Row: Revenue & Collections By Payment Method */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                  REVENUE
                </span>
                <h3 className="text-xs font-bold text-slate-800">By Payment Method</h3>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  addToast(`Revenue period: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="November 2026">November 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 h-auto sm:h-52 py-2 sm:py-0">
              <div className="w-44 h-44 relative">
                <Doughnut data={revenueChartData} options={doughnutOptions} />
              </div>

              <div className="space-y-2 text-xs w-40">
                <LegendItem color="bg-emerald-500" label="Cash" value="70%" />
                <LegendItem color="bg-indigo-500" label="Card" value="15%" />
                <LegendItem color="bg-cyan-500" label="Wallet" value="10%" />
                <LegendItem color="bg-rose-500" label="Credit" value="5%" />
              </div>
            </div>
          </div>

          {/* Collections Chart */}
          <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                  COLLECTIONS
                </span>
                <h3 className="text-xs font-bold text-slate-800">By Payment Method</h3>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  addToast(`Collections period: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="November 2026">November 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 h-auto sm:h-52 py-2 sm:py-0">
              <div className="w-44 h-44 relative">
                <Doughnut data={collectionsChartData} options={doughnutOptions} />
              </div>

              <div className="space-y-2 text-xs w-40">
                <LegendItem color="bg-indigo-500" label="Cash" value="55%" />
                <LegendItem color="bg-emerald-500" label="Card" value="30%" />
                <LegendItem color="bg-cyan-500" label="Wallet" value="8%" />
                <LegendItem color="bg-rose-500" label="Credit" value="7%" />
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Top Products Sales (With Vertical Column Divider Lines) & Performance Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products Table with Column Divider Lines */}
          <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                  Top Products Sales
                </h3>
                <Link
                  href="/utilities"
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>See all</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto touch-pan-x">
                <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                  <thead className="bg-[#5948DB] text-xs text-white tracking-normal border-b border-[#4A3AC9] font-semibold">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-r border-[#7161F0]/70 text-white">PRODUCT</th>
                      <th className="px-4 py-3 font-semibold text-center border-r border-[#7161F0]/70 text-white">LAST MONTH</th>
                      <th className="px-4 py-3 font-semibold text-center border-r border-[#7161F0]/70 text-white">THIS MONTH</th>
                      <th className="px-4 py-3 font-semibold text-right text-white">CHANGE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {data.top_products.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-slate-900 font-semibold border-r border-slate-200">
                          {p.name}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-500 font-mono border-r border-slate-200">
                          {p.last_month}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-800 font-bold font-mono border-r border-slate-200">
                          {p.this_month}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-600 font-mono">
                          {p.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right text-[11px] text-slate-500">
              Showing top 4 high-demand water SKUs
            </div>
          </div>

          {/* Performance Trend */}
          <div className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                  PERFORMANCE
                </span>
                <h3 className="text-xs font-bold text-slate-800">Product Sales Trend</h3>
              </div>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  addToast(`Trend SKU filtered: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="All Products">All Products</option>
                <option value="5 Gallon Drinking Water">5 Gallon Drinking Water</option>
                <option value="500ml PET Bottles">500ml PET Bottles</option>
              </select>
            </div>

            <div className="h-48 w-full pt-1">
              <Line data={trendData} options={lineOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-3 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase leading-tight line-clamp-1">
          {title}
        </span>
        <div className={`w-4.5 h-4.5 rounded-xs flex items-center justify-center border ${colorMap[color] || colorMap.slate}`}>
          <Icon className="w-2.5 h-2.5" />
        </div>
      </div>
      <div className="text-sm font-extrabold text-slate-900 tracking-tight truncate font-mono">
        {value}
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center justify-between text-xs py-0.5">
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-slate-600 font-medium">{label}</span>
      </div>
      <span className="text-slate-900 font-bold font-mono">{value}</span>
    </div>
  );
}
