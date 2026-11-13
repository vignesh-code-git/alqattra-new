"use client";

import { Download } from "lucide-react";

/**
 * Header bar for a page's primary record list.
 *
 * Plain surface with a hairline underneath — no gradient — so the table's own
 * header row stays the darkest thing in the card. Page-level actions live here
 * via `actions`, which is why pages no longer carry a separate toolbar.
 */
export default function PanelHeader({
  icon: Icon,
  title,
  subtitle,
  actionLabel = "Export",
  onAction,
  actions,
  children,
}) {
  return (
    <div className="px-[18px] py-3 bg-[#007AFF] flex items-center justify-between gap-3">
      <div className="min-w-0 flex items-center gap-2.5">
        {Icon && (
          <span className="w-7 h-7 rounded-[8px] bg-white/20 text-white flex items-center justify-center shrink-0">
            <Icon className="w-[15px] h-[15px]" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-white font-semibold text-[15px] tracking-[-0.014em] leading-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-[11px] leading-tight mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actions}
        {children}
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-white/90 text-[#007AFF] text-[11.5px] font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
          >
            <Download className="w-3.5 h-3.5" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
