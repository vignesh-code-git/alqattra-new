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
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Calendar,
  Filter
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

// Canvas text does not inherit CSS, so point Chart.js at the same stack.
const CHART_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
ChartJS.defaults.font.family = CHART_FONT;
ChartJS.defaults.font.size = 11;
ChartJS.defaults.color = "#8E8E93";

/**
 * Categorical palette for the payment-method split.
 * Validated on a white surface with the dataviz validator (adjacent pairlist):
 * worst adjacent CVD dE 27.6, worst normal-vision dE 35.3, wrap pair
 * (Credit -> Cash) CVD dE 34.1. Orange and green sit below 3:1 contrast on
 * white, so the relief rule applies: every slice is directly labelled with its
 * name and share in the legend beneath the chart.
 */
const PAYMENT_SERIES = [
  { key: "Cash", color: "#007AFF" },
  { key: "Card", color: "#FF9500" },
  { key: "Wallet", color: "#AF52DE" },
  { key: "Credit", color: "#34C759" },
];

/** Short form for the figure inside a donut's hole, e.g. AED 5.82M */
function compactAED(n) {
  const v = Number(n) || 0;
  if (v >= 1_000_000) return `AED ${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 10_000) return `AED ${(v / 1_000).toFixed(1)}K`;
  return `AED ${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

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
  const [showFilters, setShowFilters] = useState(false);
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterTerritory, setFilterTerritory] = useState("All");
  const [filterSalesRep, setFilterSalesRep] = useState("All");
  const [filterTruck, setFilterTruck] = useState("All");

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

  // --- Payment-method split -------------------------------------------------
  // One hue per entity, used identically in both donuts, so "Cash" is the same
  // colour everywhere. Order is the validated categorical sequence (worst
  // adjacent CVD dE 27.6, normal-vision 35.3 on a white surface).
  const revenueSplit = { Cash: 70, Card: 15, Wallet: 10, Credit: 5 };
  const collectionsSplit = { Cash: 55, Card: 30, Wallet: 8, Credit: 7 };

  const buildDonut = (split) => ({
    labels: PAYMENT_SERIES.map((s) => s.key),
    datasets: [
      {
        data: PAYMENT_SERIES.map((s) => split[s.key] ?? 0),
        backgroundColor: PAYMENT_SERIES.map((s) => s.color),
        // 2px gap in the surface colour separates touching segments
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderAlign: "inner",
        hoverBorderColor: "#FFFFFF",
        hoverOffset: 6,
        spacing: 0,
      },
    ],
  });

  const revenueChartData = buildDonut(revenueSplit);
  const collectionsChartData = buildDonut(collectionsSplit);

  const donutOptions = (centerValue, centerLabel) => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    layout: { padding: 6 },
    animation: { animateRotate: true, duration: 600, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      centerText: { value: centerValue, label: centerLabel },
      tooltip: {
        backgroundColor: "rgba(28,28,30,0.92)",
        cornerRadius: 12,
        padding: { top: 9, bottom: 9, left: 12, right: 12 },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 2,
        boxPadding: 7,
        usePointStyle: false,
        titleColor: "#FFFFFF",
        titleFont: { size: 13, weight: "600" },
        bodyColor: "rgba(255,255,255,0.68)",
        bodyFont: { size: 11, weight: "500" },
        caretSize: 5,
        callbacks: {
          // Value leads, label follows
          title: (items) => `${items[0].parsed}%`,
          label: (ctx) => ` ${ctx.label}`,
        },
      },
    },
  });

  // Hero figure drawn in the ring's hole
  const centerTextPlugin = {
    id: "centerText",
    afterDatasetsDraw(chart, _args, opts) {
      if (!opts || !opts.value) return;
      const { ctx, chartArea } = chart;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#1C1C1E";
      ctx.font = "600 20px " + CHART_FONT;
      ctx.fillText(opts.value, x, y - 7);
      ctx.fillStyle = "#8E8E93";
      ctx.font = "500 10px " + CHART_FONT;
      ctx.fillText(String(opts.label || "").toUpperCase(), x, y + 13);
      ctx.restore();
    },
  };

  // Line Chart config for Sales Trend — single series, so no legend box
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales Trend",
        data: [0, 0.2, 0.5, 0.8, 1.0],
        borderColor: "#007AFF",
        // area wash, not a saturated block
        backgroundColor: "rgba(0,122,255,0.10)",
        borderWidth: 2,
        tension: 0.38,
        fill: true,
        pointBackgroundColor: "#007AFF",
        // 2px ring in the surface colour
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        // hit target larger than the mark
        pointHitRadius: 24,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(28,28,30,0.92)",
        cornerRadius: 12,
        padding: { top: 9, bottom: 9, left: 12, right: 12 },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 2,
        boxPadding: 7,
        titleColor: "rgba(255,255,255,0.68)",
        titleFont: { size: 11, weight: "500" },
        bodyColor: "#FFFFFF",
        bodyFont: { size: 13, weight: "600" },
        caretSize: 5,
        callbacks: {
          label: (ctx) => ` AED ${Number(ctx.parsed.y).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: { color: "#8E8E93", font: { size: 11 }, padding: 6 },
      },
      y: {
        border: { display: false },
        // hairline, solid, one step off the surface
        grid: { color: "rgba(60,60,67,0.10)", lineWidth: 1, drawTicks: false },
        ticks: {
          color: "#8E8E93",
          font: { size: 11 },
          padding: 8,
          callback: (val) => `AED ${val}`,
        },
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Dashboard Overview"
        subtitle="Dashboard"
        actions={
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="px-3.5 py-1.5 rounded-full bg-[#767680]/12 hover:bg-[#767680]/20 text-[#1C1C1E] text-[11.5px] font-semibold transition cursor-pointer active:scale-95 inline-flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
        }
      />

      <main className="p-5 space-y-5 flex-1 overflow-y-auto">
        {/* iOS Dashboard Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[6px] p-4">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#3C3C43]/10">
              <div className="px-6 py-4 border-b border-[#3C3C43]/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1C1C1E]">Dashboard Filters</h3>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] cursor-pointer"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4 text-xs text-[#3C3C43]">
                <div>
                  <label className="block font-semibold text-[#8E8E93] mb-1">From Date</label>
                  <input
                    type="date"
                    value={filterFromDate || "2026-09-07"}
                    onChange={(e) => setFilterFromDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#1C1C1E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#8E8E93] mb-1">To Date</label>
                  <input
                    type="date"
                    value={filterToDate || "2026-09-07"}
                    onChange={(e) => setFilterToDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#1C1C1E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#8E8E93] mb-1">Filter By</label>
                  <select
                    value={filterTerritory}
                    onChange={(e) => setFilterTerritory(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-[#1C1C1E] bg-white"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-3.5 bg-[#F9F9FB] border-t border-[#3C3C43]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-1.5 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1C1C1E] text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFilters(false);
                    addToast("Dashboard filters applied", "success");
                  }}
                  className="px-5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-semibold shadow-sm shadow-[#007AFF]/25 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KPI Grid - iOS Metric Cards */}
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

        {/* Charts Row: iOS Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <div className="bg-white rounded-3xl border border-[#3C3C43]/10 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F2F2F7] pb-3 mb-3">
              <div>
                <span className="text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-wider block">
                  REVENUE
                </span>
                <h3 className="text-xs font-bold text-[#2C2C2E]">By Payment Method</h3>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  addToast(`Revenue period: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-[#F2F2F7] border border-[#E5E5EA] rounded-md text-xs font-semibold text-[#3C3C43] cursor-pointer focus:outline-none"
              >
                <option value="November 2026">November 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            <div className="flex flex-col items-center justify-center py-1">
              <div className="w-[196px] h-[196px] relative">
                <Doughnut
                  data={revenueChartData}
                  options={donutOptions(
                    compactAED(m.total_revenue ?? 5817740.39),
                    "Total revenue"
                  )}
                  plugins={[centerTextPlugin]}
                />
              </div>

              <SplitLegend split={revenueSplit} />
            </div>
          </div>

          {/* Collections Chart */}
          <div className="bg-white rounded-3xl border border-[#3C3C43]/10 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F2F2F7] pb-3 mb-3">
              <div>
                <span className="text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-wider block">
                  COLLECTIONS
                </span>
                <h3 className="text-xs font-bold text-[#2C2C2E]">By Payment Method</h3>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  addToast(`Collections period: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-[#F2F2F7] border border-[#E5E5EA] rounded-md text-xs font-semibold text-[#3C3C43] cursor-pointer focus:outline-none"
              >
                <option value="November 2026">November 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            <div className="flex flex-col items-center justify-center py-1">
              <div className="w-[196px] h-[196px] relative">
                <Doughnut
                  data={collectionsChartData}
                  options={donutOptions(
                    compactAED(m.total_collection ?? 18613.24),
                    "Total collected"
                  )}
                  plugins={[centerTextPlugin]}
                />
              </div>

              <SplitLegend split={collectionsSplit} />
            </div>
          </div>
        </div>

        {/* Lower Row: Top Products Sales (With Vertical Column Divider Lines) & Performance Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products Table with Column Divider Lines */}
          <div className="ios-surface overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 bg-[#F9F9FB] border-b border-[#3C3C43]/10 flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#1C1C1E] tracking-tight uppercase">
                  Top Products Sales
                </h3>
                <Link
                  href="/utilities"
                  className="text-[11px] font-semibold text-[#007AFF] hover:underline flex items-center gap-1"
                >
                  <span>See all</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto touch-pan-x">
                <table className="ios-table w-full text-left text-xs border-collapse min-w-[500px]">
                  <thead className="ios-thead">
                    <tr>
                      <th className="px-4 py-3 font-semibold">PRODUCT</th>
                      <th className="px-4 py-3 font-semibold text-center">LAST MONTH</th>
                      <th className="px-4 py-3 font-semibold text-center">THIS MONTH</th>
                      <th className="px-4 py-3 font-semibold text-right">CHANGE</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {data.top_products.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#F2F2F7]/50 transition-colors">
                        <td className="px-4 py-3 text-[#1C1C1E] font-semibold">
                          {p.name}
                        </td>
                        <td className="px-4 py-3 text-center text-[#8E8E93] font-mono">
                          {p.last_month}
                        </td>
                        <td className="px-4 py-3 text-center text-[#1C1C1E] font-bold font-mono">
                          {p.this_month}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[#34C759] font-mono">
                          {p.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-[#F9F9FB] border-t border-[#3C3C43]/10 text-right text-[11px] text-[#8E8E93]">
              Showing top 4 high-demand water SKUs
            </div>
          </div>

          {/* Performance Trend */}
          <div className="bg-white rounded-3xl border border-[#3C3C43]/10 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#F2F2F7] pb-3 mb-2">
              <div>
                <span className="text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-wider block">
                  PERFORMANCE
                </span>
                <h3 className="text-xs font-bold text-[#2C2C2E]">Product Sales Trend</h3>
              </div>
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  addToast(`Trend SKU filtered: ${e.target.value}`, "info");
                }}
                className="px-2.5 py-1 bg-[#F2F2F7] border border-[#E5E5EA] rounded-md text-xs font-semibold text-[#3C3C43] cursor-pointer focus:outline-none"
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
    emerald: "bg-[#EBFAEF] text-[#34C759] border-[#BCEFC9]",
    blue: "bg-[#EAF4FF] text-[#007AFF] border-[#BFDDFF]",
    amber: "bg-[#FFF6E8] text-[#FF9500] border-[#FFE0AD]",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    rose: "bg-[#FFF1F0] text-[#FF3B30] border-[#FFD5D2]",
    slate: "bg-[#F2F2F7] text-[#636366] border-[#E5E5EA]",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
  };

  return (
    <div className="bg-white rounded-2xl border border-[#3C3C43]/10 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-1.5 mb-1.5">
        <span className="text-[9.5px] font-semibold text-[#8E8E93] tracking-[0.02em] uppercase leading-[1.25] min-h-[2.1em]">
          {title}
        </span>
        <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${colorMap[color] || colorMap.slate}`}>
          <Icon className="w-2.5 h-2.5" />
        </div>
      </div>
      <div className="text-[13.5px] font-bold text-[#1C1C1E] tracking-tight truncate font-mono">
        {value}
      </div>
    </div>
  );
}

/**
 * Legend + direct labels for a donut. Every slice is named with its share here,
 * which is what lets the lower-contrast slots (orange, green) ship on a white
 * surface. Text stays in ink tokens; only the swatch carries the series hue.
 */
function SplitLegend({ split }) {
  const rows = PAYMENT_SERIES.map((s) => ({ ...s, value: split[s.key] ?? 0 }));
  return (
    <div className="mt-4 w-full max-w-[280px] space-y-px">
      {rows.map((r) => (
        <div
          key={r.key}
          className="flex items-center gap-2.5 py-[5px] text-[12px] leading-none"
        >
          <span
            className="w-2.5 h-2.5 rounded-[3px] shrink-0"
            style={{ backgroundColor: r.color }}
            aria-hidden="true"
          />
          <span className="text-[#3C3C43] font-medium flex-1 min-w-0 truncate">
            {r.key}
          </span>
          <span className="text-[#1C1C1E] font-semibold tabular-nums">{r.value}%</span>
        </div>
      ))}
    </div>
  );
}
