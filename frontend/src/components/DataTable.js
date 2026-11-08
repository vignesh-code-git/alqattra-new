"use client";

import { useState, useMemo, useRef } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar as CalendarIcon,
  Filter,
  X,
  RotateCcw,
  Download,
  Upload,
  ChevronDown,
  Check,
  FileSpreadsheet,
  AlertCircle,
  Undo2,
  SlidersHorizontal,
} from "lucide-react";
import { useToast } from "@/components/Toast";

export default function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  searchPlaceholder = "Search records...",
  searchKeys = [],
  filterTabs = [],
  activeTab = "All",
  onTabChange,
  actions = null,
  selectable = true,
  selectedIds = [],
  onSelectionChange,
  emptyMessage = "No records found",
  initialSortField = "",
  initialSortAsc = true,
  dateKey = "", // Optional explicit date field key
  onImport = null, // Optional callback: (importedRows) => void
  onRestore = null, // Optional callback: (row) => void
  exportFilename = "crm_export.csv",
}) {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("ALL"); // ALL or specific col key
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [dateRange, setDateRange] = useState("ALL"); // ALL, TODAY, YESTERDAY, 7DAYS, THIS_MONTH, LAST_MONTH, CUSTOM
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendarPopover, setShowCalendarPopover] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(10); // 0-indexed: 10 = Nov
  const [calendarYear, setCalendarYear] = useState(2026);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortAsc, setSortAsc] = useState(initialSortAsc);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importModalData, setImportModalData] = useState(null); // Preview of imported data
  const pageSize = 10;

  // Detect which field contains a date in a row
  const detectedDateKey = useMemo(() => {
    if (dateKey) return dateKey;
    if (!data || data.length === 0) return "";
    const sample = data[0];
    const candidateKeys = [
      "date",
      "created_at",
      "order_date",
      "delivery_date",
      "invoice_date",
      "last_recharge",
      "issue_date",
      "due_date",
      "timestamp",
      "visit_date",
      "settlement_date",
      "recharge_date",
      "joined_date",
      "updated_on",
    ];
    for (const k of candidateKeys) {
      if (sample[k] !== undefined) return k;
    }
    const anyDateKey = Object.keys(sample).find(
      (k) => k.toLowerCase().includes("date") || k.toLowerCase().includes("time")
    );
    return anyDateKey || "";
  }, [data, dateKey]);

  // Sorting
  const handleSort = (key) => {
    if (sortField === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(key);
      setSortAsc(true);
    }
  };

  // Helper for deep recursive search across all fields of an object
  const deepMatches = (val, query) => {
    if (val == null) return false;
    if (typeof val === "object") {
      return Object.values(val).some((nested) => deepMatches(nested, query));
    }
    return val.toString().toLowerCase().includes(query);
  };

  // Date boundary calculation (relative to 2026-11-08 reference date)
  const isDateInRange = (rowDateStr) => {
    if (!rowDateStr || dateRange === "ALL") return true;

    try {
      let rowYMD = "";
      if (rowDateStr.includes("/")) {
        const parts = rowDateStr.split("/");
        if (parts.length === 3) {
          rowYMD = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
        }
      } else {
        const rowDate = new Date(rowDateStr);
        if (isNaN(rowDate.getTime())) return true;
        rowYMD = rowDate.toISOString().slice(0, 10);
      }

      const todayStr = "2026-11-08"; // System anchor date
      const today = new Date(todayStr);

      if (dateRange === "TODAY") {
        return rowYMD === todayStr;
      }
      if (dateRange === "YESTERDAY") {
        const yest = new Date(today);
        yest.setDate(yest.getDate() - 1);
        const yestStr = yest.toISOString().slice(0, 10);
        return rowYMD === yestStr;
      }
      if (dateRange === "7DAYS") {
        const past7 = new Date(today);
        past7.setDate(past7.getDate() - 7);
        const past7Str = past7.toISOString().slice(0, 10);
        return rowYMD >= past7Str && rowYMD <= todayStr;
      }
      if (dateRange === "THIS_MONTH") {
        return rowYMD.startsWith("2026-11");
      }
      if (dateRange === "LAST_MONTH") {
        return rowYMD.startsWith("2026-10");
      }
      if (dateRange === "CUSTOM") {
        if (startDate && rowYMD < startDate) return false;
        if (endDate && rowYMD > endDate) return false;
        return true;
      }
    } catch {
      return true;
    }
    return true;
  };

  // Modern Calendar month days calculation
  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }
    return days;
  }, [calendarYear, calendarMonth]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleSelectCalendarDay = (day) => {
    if (!day) return;
    const formatted = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!startDate || (startDate && endDate)) {
      setStartDate(formatted);
      setEndDate("");
      setDateRange("CUSTOM");
    } else if (startDate && !endDate) {
      if (formatted < startDate) {
        setEndDate(startDate);
        setStartDate(formatted);
      } else {
        setEndDate(formatted);
      }
      setDateRange("CUSTOM");
    }
    setCurrentPage(1);
  };

  // Formatted Label for the Date Button
  const getCalendarLabel = () => {
    switch (dateRange) {
      case "TODAY":
        return "Today (Nov 08)";
      case "YESTERDAY":
        return "Yesterday (Nov 07)";
      case "7DAYS":
        return "Last 7 Days";
      case "THIS_MONTH":
        return "This Month (Nov 2026)";
      case "LAST_MONTH":
        return "Last Month (Oct 2026)";
      case "CUSTOM":
        if (startDate && endDate) return `${startDate} → ${endDate}`;
        if (startDate) return `From: ${startDate}`;
        return "Custom Range";
      default:
        return "All Dates";
    }
  };

  // Filtered & Sorted Data
  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase();

    return data
      .filter((row) => {
        // Date range filtering
        if (detectedDateKey && !isDateInRange(row[detectedDateKey])) {
          return false;
        }

        // Search filtering
        if (!q) return true;

        if (selectedField !== "ALL") {
          const val = row[selectedField];
          return deepMatches(val, q);
        }

        if (searchKeys.length > 0) {
          return searchKeys.some((k) => deepMatches(row[k], q));
        }

        return Object.values(row).some((val) => deepMatches(val, q));
      })
      .sort((a, b) => {
        if (!sortField) return 0;
        let valA = a[sortField];
        let valB = b[sortField];

        // Number comparison if both numeric
        if (typeof valA === "number" && typeof valB === "number") {
          return sortAsc ? valA - valB : valB - valA;
        }
        const numA = parseFloat(valA);
        const numB = parseFloat(valB);
        if (!isNaN(numA) && !isNaN(numB) && !valA?.toString().startsWith("0")) {
          return sortAsc ? numA - numB : numB - numA;
        }

        // String comparison
        valA = (valA || "").toString().toLowerCase();
        valB = (valB || "").toString().toLowerCase();
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [
    data,
    search,
    selectedField,
    searchKeys,
    dateRange,
    startDate,
    endDate,
    detectedDateKey,
    sortField,
    sortAsc,
  ]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearch("");
    setSelectedField("ALL");
    setDateRange("ALL");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    setShowCalendarPopover(false);
    setShowFilterPopover(false);
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedField !== "ALL" ||
    dateRange !== "ALL" ||
    startDate !== "" ||
    endDate !== "";

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Select All
  const toggleSelectAll = () => {
    if (!onSelectionChange) return;
    if (selectedIds.length === paginatedData.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(paginatedData.map((d) => d.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      addToast("No records available to export", "error");
      return;
    }

    try {
      const exportCols = columns.filter((c) => c.key && c.label);
      const headers = exportCols.map((c) => `"${c.label}"`).join(",");
      const rows = filteredData.map((row) =>
        exportCols
          .map((c) => {
            let val = row[c.key];
            if (val == null) val = "";
            val = val.toString().replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(",")
      );

      const csvContent = [headers, ...rows].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", exportFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast(`Exported ${filteredData.length} records to ${exportFilename}`, "success");
    } catch {
      addToast("Failed to export CSV. Please try again.", "error");
    }
  };

  // Template Download for CSV Import
  const handleDownloadTemplate = () => {
    try {
      const exportCols = columns.filter((c) => c.key && c.label && c.key !== "actions");
      const headers = exportCols.map((c) => `"${c.label}"`).join(",");
      const sampleRow = exportCols
        .map((c) => {
          if (c.key.includes("phone")) return `"+971 50 123 4567"`;
          if (c.key.includes("email")) return `"client@example.ae"`;
          if (c.key.includes("date")) return `"2026-11-08"`;
          if (c.key.includes("city")) return `"AL AIN"`;
          if (c.key.includes("code") || c.key.includes("no") || c.key.includes("id")) return `"SAMPLE-001"`;
          if (c.key.includes("amount") || c.key.includes("price") || c.key.includes("total")) return `"150.00"`;
          if (c.key.includes("qty") || c.key.includes("quantity")) return `"10"`;
          return `"Sample ${c.label}"`;
        })
        .join(",");
      const csvContent = [headers, sampleRow].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `template_${exportFilename}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast(`Downloaded CSV template: template_${exportFilename}`, "info");
    } catch {
      addToast("Failed to generate CSV template", "error");
    }
  };

  const handleConfirmImport = () => {
    if (!importModalData?.rows) return;
    if (onImport) {
      onImport(importModalData.rows);
      addToast(`Successfully imported ${importModalData.rows.length} records into database!`, "success");
    } else {
      addToast(`Verified ${importModalData.rows.length} records from ${importModalData.filename}`, "success");
    }
    setImportModalData(null);
    setShowImportModal(false);
  };

  // Import from CSV
  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (!text) return;

        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          addToast("CSV must contain a header row and at least 1 data row", "error");
          return;
        }

        const parseLine = (line) => {
          const res = [];
          let cur = "";
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"' || ch === "'") {
              inQuotes = !inQuotes;
            } else if (ch === "," && !inQuotes) {
              res.push(cur.trim());
              cur = "";
            } else {
              cur += ch;
            }
          }
          res.push(cur.trim());
          return res;
        };

        const headerCols = parseLine(lines[0]);
        const parsedRows = [];
        for (let i = 1; i < lines.length; i++) {
          const values = parseLine(lines[i]);
          const row = { id: Date.now() + i };
          headerCols.forEach((colName, cIdx) => {
            const matchedCol = columns.find(
              (c) =>
                c.label?.toLowerCase() === colName.toLowerCase() ||
                c.key?.toLowerCase() === colName.toLowerCase()
            );
            const key = matchedCol ? matchedCol.key : colName.toLowerCase().replace(/\s+/g, "_");
            row[key] = values[cIdx] || "";
          });
          parsedRows.push(row);
        }

        setImportModalData({
          filename: file.name,
          count: parsedRows.length,
          preview: parsedRows.slice(0, 5),
          rows: parsedRows,
          headerCols,
        });

        addToast(`Parsed ${parsedRows.length} records from ${file.name}. Review preview to confirm.`, "info");
      } catch {
        addToast("Failed to parse CSV file. Please verify CSV format.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-3.5">
      {/* Hidden File Input for CSV Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Control bar: Tabs, Filter Icon Popover, Modern Calendar, and CSV Import/Export */}
      <div className="flex flex-col gap-3">
        {/* Top line: Tabs + Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {filterTabs.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium overflow-x-auto max-w-full border border-slate-200 no-scrollbar">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onTabChange && onTabChange(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-colors duration-150 outline-none focus:outline-none flex items-center gap-1.5 whitespace-nowrap text-xs cursor-pointer select-none ${
                    activeTab === tab.id
                      ? tab.id === "Deleted"
                        ? "bg-rose-600 text-white border-rose-600 shadow-xs font-semibold"
                        : "bg-white text-[#5948DB] border-slate-200 shadow-xs font-semibold"
                      : tab.id === "Deleted"
                      ? "border-transparent text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        activeTab === tab.id
                          ? tab.id === "Deleted"
                            ? "bg-white/20 text-white"
                            : "bg-[#5948DB]/10 text-[#5948DB]"
                          : tab.id === "Deleted"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 sm:ml-auto flex-wrap sm:flex-nowrap">
            {actions}
          </div>
        </div>

        {/* Toolbar: Search with Filter Icon popover, New Style Calendar, Import & Export */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shadow-2xs">
          {/* Left: Search input + Column Filter Icon style button */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={
                  selectedField === "ALL"
                    ? searchPlaceholder
                    : `Filtering by ${columns.find((c) => c.key === selectedField)?.label || selectedField}...`
                }
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8.5 pr-8 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5948DB]/20 focus:border-[#5948DB] shadow-2xs transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Icon Button (Replaces bulky universal dropdown) */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowFilterPopover(!showFilterPopover)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 shadow-2xs cursor-pointer outline-none focus:outline-none select-none ${
                  selectedField !== "ALL"
                    ? "bg-[#5948DB]/10 border-[#5948DB] text-[#5948DB] font-semibold"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
                title="Filter by specific column"
              >
                <Filter className="w-3.5 h-3.5 text-[#5948DB]" />
                <span className="hidden sm:inline">
                  {selectedField === "ALL"
                    ? "Filter"
                    : columns.find((c) => c.key === selectedField)?.label || "Filtered"}
                </span>
                {selectedField !== "ALL" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5948DB]" />
                )}
              </button>

              {/* Column Filter Popover */}
              {showFilterPopover && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowFilterPopover(false)} />
                  <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#5948DB]" />
                        <span>Filter Column Scope</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowFilterPopover(false)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 max-h-52 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedField("ALL");
                          setShowFilterPopover(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border flex items-center justify-between text-xs transition-colors duration-150 outline-none focus:outline-none select-none cursor-pointer ${
                          selectedField === "ALL"
                            ? "bg-[#5948DB] border-[#5948DB] text-white font-semibold"
                            : "border-transparent text-slate-700 hover:bg-slate-50 font-normal"
                        }`}
                      >
                        <span>All Columns (Universal)</span>
                        {selectedField === "ALL" && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>

                      {columns
                        .filter((c) => c.key && c.label && c.key !== "actions")
                        .map((col) => (
                          <button
                            key={col.key}
                            type="button"
                            onClick={() => {
                              setSelectedField(col.key);
                              setShowFilterPopover(false);
                              setCurrentPage(1);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg border flex items-center justify-between text-xs transition-colors duration-150 outline-none focus:outline-none select-none cursor-pointer ${
                              selectedField === col.key
                                ? "bg-[#5948DB] border-[#5948DB] text-white font-semibold"
                                : "border-transparent text-slate-700 hover:bg-slate-50 font-normal"
                            }`}
                          >
                            <span>{col.label}</span>
                            {selectedField === col.key && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                        ))}
                    </div>

                    {selectedField !== "ALL" && (
                      <div className="pt-2 border-t border-slate-100 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedField("ALL");
                            setShowFilterPopover(false);
                            setCurrentPage(1);
                          }}
                          className="text-[11px] text-[#5948DB] font-medium hover:underline cursor-pointer"
                        >
                          Clear Column Filter
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: New Style Calendar, CSV Import & Export */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* New Style Modern Interactive Calendar Popover */}
            {detectedDateKey && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCalendarPopover(!showCalendarPopover)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors duration-150 shadow-2xs cursor-pointer whitespace-nowrap outline-none focus:outline-none select-none ${
                    dateRange !== "ALL"
                      ? "bg-[#5948DB]/10 border-[#5948DB] text-[#5948DB] font-semibold"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  title="Filter by calendar date"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#5948DB] shrink-0" />
                  <span>{getCalendarLabel()}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {/* Modern Calendar Dropdown Popover */}
                {showCalendarPopover && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCalendarPopover(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 space-y-3.5 text-xs">
                      {/* Popover Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                          <CalendarIcon className="w-4 h-4 text-[#5948DB]" />
                          <span>Interactive Calendar Filter</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowCalendarPopover(false)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Presets Grid */}
                      <div>
                        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                          {[
                            { id: "ALL", label: "All Time" },
                            { id: "TODAY", label: "Today" },
                            { id: "YESTERDAY", label: "Yesterday" },
                            { id: "7DAYS", label: "Last 7 Days" },
                            { id: "THIS_MONTH", label: "This Month" },
                            { id: "LAST_MONTH", label: "Last Month" },
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setDateRange(p.id);
                                setCurrentPage(1);
                                if (p.id !== "CUSTOM") {
                                  setShowCalendarPopover(false);
                                }
                              }}
                              className={`px-2 py-1.5 rounded-lg border text-center font-medium transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none ${
                                dateRange === p.id
                                  ? "bg-[#5948DB] border-[#5948DB] text-white font-semibold shadow-xs"
                                  : "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Modern Interactive Monthly Calendar Picker */}
                      <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2.5">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-slate-800 text-xs">
                            {monthNames[calendarMonth]} {calendarYear}
                          </span>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Days of Week Header */}
                        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400">
                          <span>Su</span>
                          <span>Mo</span>
                          <span>Tu</span>
                          <span>We</span>
                          <span>Th</span>
                          <span>Fr</span>
                          <span>Sa</span>
                        </div>

                        {/* Calendar Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {calendarDays.map((day, idx) => {
                            if (!day) {
                              return <div key={`empty-${idx}`} className="h-7" />;
                            }

                            const cellDateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const isStart = startDate === cellDateStr;
                            const isEnd = endDate === cellDateStr;
                            const inRange = startDate && endDate && cellDateStr > startDate && cellDateStr < endDate;
                            const isToday = cellDateStr === "2026-11-08";

                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                onClick={() => handleSelectCalendarDay(day)}
                                className={`h-7 w-full rounded-lg font-medium transition-all text-xs flex items-center justify-center cursor-pointer ${
                                  isStart || isEnd
                                    ? "bg-[#5948DB] text-white font-bold shadow-xs"
                                    : inRange
                                    ? "bg-[#5948DB]/15 text-[#5948DB] font-semibold"
                                    : isToday
                                    ? "border border-[#5948DB] text-[#5948DB] font-bold"
                                    : "text-slate-700 hover:bg-white hover:shadow-2xs"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected Range Display & Actions */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setDateRange("ALL");
                            setStartDate("");
                            setEndDate("");
                            setShowCalendarPopover(false);
                            setCurrentPage(1);
                          }}
                          className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                        >
                          Clear Date
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCalendarPopover(false)}
                          className="px-4 py-1.5 bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-medium rounded-lg shadow-xs cursor-pointer"
                        >
                          Apply Filter
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* CSV Import Button */}
            <button
              type="button"
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-[0.98] shrink-0"
              title="Import records from a CSV spreadsheet"
            >
              <Upload className="w-3.5 h-3.5 text-[#5948DB]" />
              <span>Import CSV</span>
            </button>

            {/* CSV Template Download Button */}
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-[0.98] shrink-0"
              title="Download pre-formatted CSV template"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Template</span>
            </button>

            {/* CSV Export Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-[0.98] shrink-0"
              title="Export displayed records to CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-medium transition-all shadow-2xs cursor-pointer shrink-0"
                title="Reset all search, field, and date filters"
              >
                <RotateCcw className="w-3 h-3 text-rose-600" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Table Container - With Red Border Support for Deleted Items */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#5948DB] text-xs text-white border-b border-[#4A3AC9] font-semibold sticky top-0 z-10 shadow-2xs">
              <tr>
                {selectable && (
                  <th className="px-3.5 py-3 text-center border-r border-[#7161F0]/70 select-none w-10">
                    <input
                      type="checkbox"
                      checked={
                        paginatedData.length > 0 &&
                        selectedIds.length === paginatedData.length
                      }
                      onChange={toggleSelectAll}
                      className="rounded-xs border-white/60 text-[#5948DB] accent-white focus:ring-0 cursor-pointer"
                    />
                  </th>
                )}
                {columns.map((col, idx) => (
                  <th
                    key={col.key || idx}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-4 py-3 font-semibold border-r border-[#7161F0]/70 last:border-r-0 select-none text-white ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    } ${
                      col.sortable
                        ? "cursor-pointer hover:bg-[#4A3AC9] transition-colors"
                        : ""
                    }`}
                    style={{ width: col.width }}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${
                        col.align === "right"
                          ? "justify-end"
                          : col.align === "center"
                          ? "justify-center"
                          : "justify-start"
                      }`}
                    >
                      <span className="text-white font-semibold tracking-wide text-xs">
                        {col.label}
                      </span>
                      {col.sortable && (
                        <ArrowUpDown
                          className={`w-3.5 h-3.5 transition-colors ${
                            sortField === col.key
                              ? "text-[#C4BCFB] font-black"
                              : "text-white/60 hover:text-white"
                          }`}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, rIdx) => (
                  <tr key={rIdx} className="animate-pulse">
                    {selectable && (
                      <td className="px-3.5 py-3.5 text-center border-r border-slate-100">
                        <div className="w-4 h-4 rounded-xs bg-slate-200 mx-auto" />
                      </td>
                    )}
                    {columns.map((col, cIdx) => (
                      <td
                        key={col.key || cIdx}
                        className="px-4 py-3.5 border-r border-slate-100 last:border-r-0"
                      >
                        <div
                          className="h-3.5 bg-slate-200 rounded-xs"
                          style={{
                            width: `${Math.max(35, 40 + ((cIdx * 19 + rIdx * 7) % 55))}%`,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="font-bold text-slate-700 text-sm">
                        {emptyMessage}
                      </span>
                      <p className="text-xs text-slate-400 max-w-sm">
                        No records match the current filter criteria across the selected fields or date range.
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="mt-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#5948DB] text-xs font-semibold hover:bg-blue-100 flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Clear All Filters</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rIdx) => {
                  const isSelected = selectedIds.includes(row.id);
                  const isDeleted = row.status === "Deleted" || row.is_deleted === true;

                  return (
                    <tr
                      key={row.id || rIdx}
                      className={`transition-colors ${
                        isDeleted
                          ? "bg-rose-50/60 hover:bg-rose-50/90 border-l-4 border-l-rose-500 border-y-2 border-y-rose-300 text-slate-900"
                          : isSelected
                          ? "bg-blue-50/50 hover:bg-blue-50/70"
                          : rIdx % 2 === 1
                          ? "bg-slate-50/40 hover:bg-blue-50/30"
                          : "bg-white hover:bg-blue-50/30"
                      }`}
                    >
                      {selectable && (
                        <td className={`px-3.5 py-3 text-center border-r ${isDeleted ? "border-rose-200" : "border-slate-200"}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(row.id)}
                            className="rounded-xs border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                      )}
                      {columns.map((col, cIdx) => (
                        <td
                          key={col.key || cIdx}
                          className={`px-4 py-3 border-r ${
                            isDeleted ? "border-rose-200" : "border-slate-200"
                          } last:border-r-0 ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          }`}
                        >
                          {col.key === "actions" && isDeleted && onRestore ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-300 uppercase">
                                Deleted
                              </span>
                              <button
                                type="button"
                                onClick={() => onRestore(row)}
                                className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                                title="Restore this record back to active state"
                              >
                                <Undo2 className="w-3 h-3" />
                                <span>Restore</span>
                              </button>
                            </div>
                          ) : col.render ? (
                            col.render(row[col.key], row)
                          ) : (
                            row[col.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Pagination & Item counts */}
        <div className="px-3 sm:px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-800">{filteredData.length}</span> entries
            {hasActiveFilters && (
              <span className="ml-2 font-semibold text-[#5948DB] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 text-[11px]">
                Filtered
              </span>
            )}
            {selectedIds.length > 0 && (
              <span className="ml-2 font-semibold text-[#5948DB]">({selectedIds.length} selected)</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-1 shadow-2xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <span className="px-3 py-1 rounded-lg bg-[#5948DB] text-white font-semibold text-xs shadow-2xs">
              {currentPage}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-1 shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CSV Import Popup Message Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#5948DB] flex items-center justify-center border border-blue-200 shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Import CSV Records</h3>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Upload your CSV file to import records directly into the CRM database.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowImportModal(false);
                  setImportModalData(null);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If no file parsed yet: show Dropzone / Upload action + Template download */}
            {!importModalData ? (
              <div className="space-y-4 py-2">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#5948DB] rounded-xl p-8 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#5948DB] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">
                    Click to browse or drop your CSV file here
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-normal">
                    Supports standard CSV files with matching column names
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="mt-4 px-4 py-1.5 rounded-lg bg-[#5948DB] hover:bg-[#4A3AC9] text-white text-xs font-medium shadow-xs"
                  >
                    Select CSV File
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-slate-800 block">Need the exact CSV format?</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      Download our template with pre-filled headers and sample row.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-white text-[#5948DB] hover:text-[#4A3AC9] font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Template</span>
                  </button>
                </div>
              </div>
            ) : (
              /* If file parsed: show Preview & Confirmation */
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-emerald-900">
                      File: {importModalData.filename}
                    </span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-medium">
                      {importModalData.count} Records Ready
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImportModalData(null);
                      fileInputRef.current?.click();
                    }}
                    className="text-[11px] font-medium text-[#5948DB] hover:underline"
                  >
                    Choose Different File
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700">Previewing First 5 Records:</span>
                  <div className="border border-slate-200 rounded-lg overflow-x-auto max-h-56">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-[10px] text-slate-700 uppercase font-semibold border-b border-slate-200">
                        <tr>
                          {importModalData.headerCols.map((col, idx) => (
                            <th key={idx} className="px-3 py-2 border-r border-slate-200 last:border-r-0 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {importModalData.preview.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {importModalData.headerCols.map((col, cIdx) => {
                              const matchedCol = columns.find(
                                (c) =>
                                  c.label?.toLowerCase() === col.toLowerCase() ||
                                  c.key?.toLowerCase() === col.toLowerCase()
                              );
                              const k = matchedCol ? matchedCol.key : col.toLowerCase().replace(/\s+/g, "_");
                              return (
                                <td key={cIdx} className="px-3 py-1.5 border-r border-slate-100 last:border-r-0 text-slate-700 whitespace-nowrap">
                                  {row[k] || "-"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="text-xs font-medium text-[#5948DB] hover:text-[#4A3AC9] flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Template</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportModalData(null);
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
                >
                  Cancel
                </button>
                {importModalData && (
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="px-4 py-1.5 rounded-lg bg-[#5948DB] hover:bg-[#4A3AC9] text-white font-medium text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Confirm & Import Records</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
