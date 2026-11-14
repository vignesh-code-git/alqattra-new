"use client";

import { useRef } from "react";
import { useToast } from "@/components/Toast";

/**
 * Import / Export buttons for a table, shown in the table card's own header
 * next to its other buttons (PanelHeader's `tools` slot).
 *
 * Export downloads this card's table as a CSV file: the header row and
 * every row currently shown, without the Actions column. An optional
 * onExport callback still runs afterwards, so pages keep their own messages.
 * A page with its own full exporter passes it as exportFn instead.
 *
 * Import opens a file picker for CSV files and reports how many rows the file
 * holds. Saving imported rows to the server is not connected yet, and the
 * message says so.
 *
 *   <PanelHeader title="Orders" tools={<TableIO name="orders" />} />
 */
export default function TableIO({ name = "table", onExport, exportFn }) {
  const barRef = useRef(null);
  const fileRef = useRef(null);
  const { addToast } = useToast();

  const exportCsv = () => {
    // Pages with their own exporter (built from the full data set) use it.
    if (exportFn) return exportFn();
    const table = barRef.current?.closest(".ios-surface")?.querySelector("table");
    if (!table) {
      addToast("No table to export", "info");
      return;
    }
    const headCells = [...table.querySelectorAll("thead th")];
    const skip = new Set(
      headCells.map((th, i) => (/^\s*actions?\s*$/i.test(th.textContent) ? i : -1)).filter((i) => i >= 0)
    );
    const cell = (el) => `"${el.textContent.replace(/\s+/g, " ").trim().replace(/"/g, '""')}"`;
    const rows = [headCells.filter((_, i) => !skip.has(i)).map(cell).join(",")];
    table.querySelectorAll("tbody tr").forEach((tr) => {
      const tds = [...tr.children];
      if (tds.length <= 1) return; // empty-state row
      rows.push(tds.filter((_, i) => !skip.has(i)).map(cell).join(","));
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (onExport) onExport();
    else addToast(`Exported ${rows.length - 1} rows`, "success");
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result).split(/\r?\n/).filter((l) => l.trim());
      const count = Math.max(0, lines.length - 1);
      addToast(`Read ${count} rows from ${file.name}. Saving imports to the server isn't connected yet.`, "info");
    };
    reader.readAsText(file);
  };

  return (
    <div ref={barRef} className="flex items-center gap-2">
      <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#AF52DE]/10 border border-[#AF52DE]/50 text-[#8E3BBF] text-[11.5px] font-semibold cursor-pointer active:scale-95 transition"
      >
        Import
      </button>
      <button
        type="button"
        onClick={exportCsv}
        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#34C759]/10 border border-[#34C759]/60 text-[#248A3D] text-[11.5px] font-semibold cursor-pointer active:scale-95 transition"
      >
        Export
      </button>
    </div>
  );
}
