"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";

/**
 * Collapsible filters.
 *
 * The page shows a compact filter bar (purple filter badge, title and a
 * "Show Filters" button). Pressing the button slides the page's filter
 * fields open underneath the bar, inside the same card; pressing it again
 * ("Hide Filters") slides them shut. The fields themselves are unchanged.
 *
 *   <FilterPopup title="Filter Orders" className="p-5"> ...fields... </FilterPopup>
 */
export default function FilterPopup({ title = "Filters", className = "p-5", children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ios-surface ios-filter overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
            style={{
              background: "linear-gradient(160deg, #AF52DECC 0%, #AF52DE 100%)",
              boxShadow: "0 6px 14px -5px rgba(175,82,222,0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <Filter className="w-4 h-4" strokeWidth={2.4} />
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#AF52DE]">Filters</div>
            <div className="text-[13px] font-semibold text-[#1C1C1E] truncate">{title}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="h-[34px] px-4 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold cursor-pointer shadow-[0_6px_14px_-6px_rgba(0,122,255,0.6)] inline-flex items-center gap-1.5 active:scale-95 transition"
        >
          <Filter className="w-3.5 h-3.5" />
          {open ? "Hide Filters" : "Show Filters"}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            strokeWidth={2.6}
          />
        </button>
      </div>

      {/* Slides down from the bar: the row grows from 0fr to 1fr */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={`ios-filter-popup border-t border-[#AF52DE]/12 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
