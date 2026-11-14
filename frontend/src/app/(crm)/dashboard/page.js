"use client";

import { useEffect, useState } from "react";
import FilterPopup from "@/components/FilterPopup";
import Header from "@/components/Header";
import { apiService } from "@/services/api";
import TickRing from "@/components/TickRing";
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
  Filter,
  PieChart,
  Wallet,
  Trophy,
  LineChart,
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
  Filler,
  Title
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import IosDateInput from "@/components/IosDateInput";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
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
        // Rounded segment ends with a small surface-coloured gap between them
        borderWidth: 0,
        borderRadius: 8,
        spacing: 3,
        hoverOffset: 8,
      },
    ],
  });

  const revenueChartData = buildDonut(revenueSplit);
  const collectionsChartData = buildDonut(collectionsSplit);

  const donutOptions = (centerValue, centerLabel) => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "76%",
    layout: { padding: 10 },
    animation: { animateRotate: true, animateScale: true, duration: 900, easing: "easeOutQuart" },
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

  // Hero figure in the ring's hole, a soft grey track behind the ring, and a
  // gentle drop shadow under the segments.
  const centerTextPlugin = {
    id: "centerText",
    beforeDatasetsDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      const arc = meta?.data?.[0];
      if (!arc) return;
      const { x, y, innerRadius, outerRadius } = arc.getProps(
        ["x", "y", "innerRadius", "outerRadius"],
        true
      );
      const { ctx } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, (innerRadius + outerRadius) / 2, 0, Math.PI * 2);
      ctx.lineWidth = outerRadius - innerRadius;
      ctx.strokeStyle = "#F2F2F7";
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
    },
    afterDatasetsDraw(chart, _args, opts) {
      const { ctx, chartArea } = chart;
      ctx.restore(); // ends the shadow started in beforeDatasetsDraw
      if (!opts || !opts.value) return;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#8E8E93";
      ctx.font = "600 9.5px " + CHART_FONT;
      ctx.fillText(String(opts.label || "").toUpperCase(), x, y - 14);
      ctx.fillStyle = "#1C1C1E";
      ctx.font = "700 22px " + CHART_FONT;
      ctx.fillText(opts.value, x, y + 6);
      ctx.restore();
    },
  };

  // Line Chart config for Sales Trend - single series, so no legend box.
  // Premium look: a blue-to-violet stroke with a soft glow beneath it, an
  // area wash that fades to nothing, and only the latest point marked.
  const TREND_FROM = "#0A84FF";
  const TREND_TO = "#AF52DE";
  const trendValues = [0, 0.2, 0.5, 0.8, 1.0];
  const lastIdx = trendValues.length - 1;
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales Trend",
        data: trendValues,
        borderColor: (c) => {
          const { ctx, chartArea } = c.chart;
          if (!chartArea) return TREND_FROM;
          const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          g.addColorStop(0, TREND_FROM);
          g.addColorStop(1, TREND_TO);
          return g;
        },
        backgroundColor: (c) => {
          const { ctx, chartArea } = c.chart;
          if (!chartArea) return "rgba(94,92,230,0.12)";
          const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, "rgba(94,92,230,0.26)");
          g.addColorStop(0.6, "rgba(94,92,230,0.07)");
          g.addColorStop(1, "rgba(94,92,230,0)");
          return g;
        },
        borderWidth: 3,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        cubicInterpolationMode: "monotone",
        fill: "start",
        // only the latest value carries a marker; the rest appear on hover
        pointRadius: (c) => (c.dataIndex === lastIdx ? 5 : 0),
        pointBackgroundColor: TREND_TO,
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2.5,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: (c) => (c.dataIndex === lastIdx ? TREND_TO : "#5E5CE6"),
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBorderWidth: 2.5,
        // hit target larger than the mark
        pointHitRadius: 24,
      },
    ],
  };

  // Glow under the line, a halo round the latest point, and a dashed guide
  // line under the cursor.
  const trendPremium = {
    id: "trendPremium",
    beforeDatasetDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      ctx.shadowColor = "rgba(94,92,230,0.42)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 8;
    },
    afterDatasetDraw(chart) {
      chart.ctx.restore();
    },
    afterDatasetsDraw(chart) {
      const pt = chart.getDatasetMeta(0)?.data?.[lastIdx];
      if (!pt) return;
      const { ctx } = chart;
      ctx.save();
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(175,82,222,0.16)";
      ctx.fill();
      ctx.restore();
    },
    afterDraw(chart) {
      const active = chart.tooltip?.getActiveElements?.() || [];
      if (!active.length) return;
      const { ctx, chartArea } = chart;
      const x = active[0].element.x;
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(94,92,230,0.45)";
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 14, right: 12 } },
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(28,28,30,0.9)",
        cornerRadius: 12,
        padding: { top: 9, bottom: 9, left: 12, right: 12 },
        displayColors: false,
        titleColor: "rgba(255,255,255,0.65)",
        titleFont: { size: 11, weight: "500" },
        bodyColor: "#FFFFFF",
        bodyFont: { size: 14, weight: "700" },
        caretSize: 6,
        caretPadding: 10,
        callbacks: {
          label: (ctx) => `AED ${Number(ctx.parsed.y).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: { color: "#8E8E93", font: { size: 11, weight: "500" }, padding: 8 },
      },
      y: {
        beginAtZero: true,
        border: { display: false, dash: [3, 5] },
        // dashed hairlines, well behind the data
        grid: { color: "rgba(60,60,67,0.10)", lineWidth: 1, drawTicks: false },
        ticks: {
          color: "#8E8E93",
          font: { size: 11 },
          padding: 10,
          maxTicksLimit: 5,
          callback: (val) => `AED ${val}`,
        },
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Dashboard Overview" subtitle="Dashboard" />

      <main className="p-5 space-y-5 flex-1 overflow-y-auto">
        {/* Dashboard filters, on the page itself */}
        <FilterPopup title="Dashboard Period" className="p-5">
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full sm:w-[170px]">
              <label className="block text-[10.5px] font-bold uppercase tracking-[0.05em] mb-1">From Date</label>
              <IosDateInput
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
                className="w-full px-3 py-2 text-xs"
              />
            </div>
            <div className="w-full sm:w-[170px]">
              <label className="block text-[10.5px] font-bold uppercase tracking-[0.05em] mb-1">To Date</label>
              <IosDateInput
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
                className="w-full px-3 py-2 text-xs"
              />
            </div>
            <div className="w-full sm:w-[150px]">
              <label className="block text-[10.5px] font-bold uppercase tracking-[0.05em] mb-1">Filter By</label>
              <select
                value={filterTerritory}
                onChange={(e) => setFilterTerritory(e.target.value)}
                className="w-full px-3 py-2 text-xs"
              >
                <option value="All">All Time</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFilterFromDate("");
                  setFilterToDate("");
                  setFilterTerritory("All");
                  addToast("Dashboard filters cleared", "info");
                }}
                className="h-[34px] px-2 text-[#007AFF] hover:text-[#0062cc] text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => addToast("Dashboard filters applied", "success")}
                className="h-[34px] px-5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold cursor-pointer shadow-sm inline-flex items-center gap-1.5"
              >
                <Filter className="w-3 h-3" />
                Apply
              </button>
            </div>
          </div>
        </FilterPopup>

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
          <DashPanel tone="blue">
            <div className="flex items-center justify-between border-b border-[#3C3C43]/[0.07] pb-3 mb-3">
              <PanelTitle tone="blue" icon={PieChart} eyebrow="REVENUE" title="By Payment Method" />
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
              <TickRing
                segments={PAYMENT_SERIES.map((p) => ({ ...p, value: revenueSplit[p.key] ?? 0 }))}
                value={compactAED(m.total_revenue ?? 5817740.39).replace("AED ", "")}
                label="AED total revenue"
                amount={m.total_revenue ?? 5817740.39}
              />

              <SplitLegend split={revenueSplit} total={m.total_revenue ?? 5817740.39} />
            </div>
          </DashPanel>

          {/* Collections Chart */}
          <DashPanel tone="green">
            <div className="flex items-center justify-between border-b border-[#3C3C43]/[0.07] pb-3 mb-3">
              <PanelTitle tone="green" icon={Wallet} eyebrow="COLLECTIONS" title="By Payment Method" />
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
              <TickRing
                segments={PAYMENT_SERIES.map((p) => ({ ...p, value: collectionsSplit[p.key] ?? 0 }))}
                value={compactAED(m.total_collection ?? 18613.24).replace("AED ", "")}
                label="AED total collected"
                amount={m.total_collection ?? 18613.24}
              />

              <SplitLegend split={collectionsSplit} total={m.total_collection ?? 18613.24} />
            </div>
          </DashPanel>
        </div>

        {/* Lower Row: Top Products Sales (With Vertical Column Divider Lines) & Performance Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products Table with Column Divider Lines */}
          <DashPanel tone="orange" flush className="flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 border-b border-[#3C3C43]/[0.07] flex items-center justify-between">
                <PanelTitle tone="orange" icon={Trophy} eyebrow="Best sellers" title="Top Products Sales" />
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
                          {/* No sales last month means there is no percentage to show */}
                          {Number(p.last_month) === 0 && Number(p.this_month) > 0 ? "New" : String(p.change).includes("Infinity") ? "-" : p.change}
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
          </DashPanel>

          {/* Performance Trend */}
          <DashPanel tone="purple" className="flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#3C3C43]/[0.07] pb-3 mb-2">
              <PanelTitle tone="purple" icon={LineChart} eyebrow="PERFORMANCE" title="Product Sales Trend" />
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

            <div className="h-52 w-full pt-1">
              <Line data={trendData} options={lineOptions} plugins={[trendPremium]} />
            </div>
          </DashPanel>
        </div>
      </main>
    </div>
  );
}

/**
 * Dashboard panel: a tint of its colour fades into white from the top, and the title carries a
 * matching icon badge. `flush` drops the padding for edge-to-edge tables.
 */
const PANEL_TONES = {
  blue: { solid: "#007AFF", tint: "rgba(0,122,255,0.09)", glow: "rgba(0,122,255,0.4)" },
  green: { solid: "#34C759", tint: "rgba(52,199,89,0.10)", glow: "rgba(52,199,89,0.4)" },
  orange: { solid: "#FF9500", tint: "rgba(255,149,0,0.10)", glow: "rgba(255,149,0,0.4)" },
  purple: { solid: "#AF52DE", tint: "rgba(175,82,222,0.09)", glow: "rgba(175,82,222,0.4)" },
};

function DashPanel({ tone = "blue", flush = false, className = "", children }) {
  const t = PANEL_TONES[tone] || PANEL_TONES.blue;
  return (
    <div
      className={`relative overflow-hidden rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-14px_rgba(0,0,0,0.18)] ${
        flush ? "" : "p-5"
      } ${className}`}
      style={{ background: `linear-gradient(180deg, ${t.tint} 0%, #FFFFFF 160px)` }}
    >
      {children}
    </div>
  );
}

function PanelTitle({ tone = "blue", icon: Icon, eyebrow, title }) {
  const t = PANEL_TONES[tone] || PANEL_TONES.blue;
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-white"
        style={{
          background: `linear-gradient(160deg, ${t.solid}C7 0%, ${t.solid} 100%)`,
          boxShadow: `0 6px 14px -5px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.35)`,
        }}
      >
        <Icon className="w-[18px] h-[18px]" strokeWidth={2.3} />
      </div>
      <div className="min-w-0">
        <span
          className="block text-[10px] font-extrabold uppercase tracking-[0.08em]"
          style={{ color: t.solid }}
        >
          {eyebrow}
        </span>
        <h3 className="text-[13px] font-bold text-[#1C1C1E] truncate">{title}</h3>
      </div>
    </div>
  );
}

/**
 * Colourful status tile: a soft tint of the tile's colour behind the card, a
 * solid icon badge with a matching glow, and the figure in dark ink so it
 * stays readable on every tint.
 */
const KPI_TONES = {
  emerald: { solid: "#34C759", from: "#EAFBEF", glow: "rgba(52,199,89,0.35)" },
  blue: { solid: "#007AFF", from: "#E8F2FF", glow: "rgba(0,122,255,0.35)" },
  amber: { solid: "#FF9500", from: "#FFF4E3", glow: "rgba(255,149,0,0.35)" },
  cyan: { solid: "#32ADE6", from: "#E6F6FD", glow: "rgba(50,173,230,0.35)" },
  purple: { solid: "#AF52DE", from: "#F6EDFC", glow: "rgba(175,82,222,0.35)" },
  rose: { solid: "#FF3B30", from: "#FFECEB", glow: "rgba(255,59,48,0.35)" },
  slate: { solid: "#8E8E93", from: "#F2F2F7", glow: "rgba(142,142,147,0.35)" },
  teal: { solid: "#30B0C7", from: "#E7F7FA", glow: "rgba(48,176,199,0.35)" },
};

function KpiCard({ title, value, icon: Icon, color }) {
  const tone = KPI_TONES[color] || KPI_TONES.slate;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-3.5 flex flex-col justify-between gap-3"
      style={{ background: `linear-gradient(145deg, ${tone.from} 0%, #FFFFFF 78%)`, border: "1px solid rgba(255,255,255,0.95)" }}
    >
      <div className="relative flex items-start justify-between gap-2">
        <span className="text-[10px] font-semibold text-[#6C6C70] tracking-[0.03em] uppercase leading-[1.25] min-h-[2.5em]">
          {title}
        </span>
        <div
          className="stat-icon w-8 h-8 shrink-0 rounded-[10px] flex items-center justify-center text-white"
          style={{ backgroundColor: tone.solid }}
        >
          <Icon className="w-4 h-4" strokeWidth={2.4} />
        </div>
      </div>
      <div className="relative text-[16px] font-bold text-[#1C1C1E] tracking-tight truncate tabular-nums">
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
function SplitLegend({ split, total }) {
  const rows = PAYMENT_SERIES.map((s) => ({ ...s, value: split[s.key] ?? 0 }));
  return (
    <div className="mt-5 w-full grid grid-cols-2 gap-2">
      {rows.map((r) => (
        <div
          key={r.key}
          className="rounded-2xl bg-[#F9F9FB] px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white shadow-sm"
              style={{ backgroundColor: r.color }}
              aria-hidden="true"
            />
            <span className="text-[12px] text-[#3C3C43] font-medium flex-1 min-w-0 truncate">
              {r.key}
            </span>
            <span className="text-[13px] text-[#1C1C1E] font-bold tabular-nums">{r.value}%</span>
          </div>
          {/* Share bar: the hue marks identity; the figures stay in ink. */}
          <div className="mt-2 h-1.5 rounded-full bg-[#E5E5EA] overflow-hidden" aria-hidden="true">
            <div
              className="h-full rounded-full"
              style={{ width: `${r.value}%`, backgroundColor: r.color }}
            />
          </div>
          {total ? (
            <div className="mt-1.5 text-[10.5px] text-[#8E8E93] font-medium tabular-nums">
              {compactAED((total * r.value) / 100)}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
