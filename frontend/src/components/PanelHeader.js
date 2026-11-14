"use client";

import { Download } from "lucide-react";

/**
 * Header bar for a page's primary record list.
 *
 * Same look as the dashboard panels: it sits on the card's soft blue tint,
 * with a solid blue icon badge and a matching glow, and the title in dark ink. Page-level actions live here via `actions`, which is why pages
 * no longer carry a separate toolbar.
 */
export default function PanelHeader({
  icon: Icon,
  title,
  subtitle,
  actionLabel = "Export",
  onAction,
  actions,
  tools,
  children,
}) {
  return (
    <div
      // No fill of its own: the card behind it carries the dashboard-panel
      // tint, so the colour flows from the title down into the table.
      className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 border-b border-[#3C3C43]/[0.07]"
    >
      <div className="min-w-0 flex items-center gap-3">
        {Icon && (
          <span
            className="w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(160deg, #007AFFC7 0%, #007AFF 100%)",
              boxShadow: "0 6px 14px -5px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={2.3} />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-[#1C1C1E] font-bold text-[15px] tracking-[-0.014em] leading-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#6C6C70] text-[11px] leading-tight mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actions}
        {children}
        {tools}
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="px-3.5 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-[11.5px] font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition shadow-[0_6px_14px_-6px_rgba(0,122,255,0.6)]"
          >
            <Download className="w-3.5 h-3.5" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
