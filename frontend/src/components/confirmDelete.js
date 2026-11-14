"use client";

import { createRoot } from "react-dom/client";
import { Trash2 } from "lucide-react";

/**
 * iOS-style "are you sure?" alert for deletes, callable from any handler:
 *
 *   if (await confirmDelete("order DN-123")) await handleDeleteOrder(row);
 *
 * Resolves true when the user taps Delete, false on Cancel, Escape or a tap
 * outside. `note` replaces the default line about the Bin.
 */
export default function confirmDelete(what, note = "It moves to the Bin, where you can restore it for 30 days.") {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);

    const done = (ok) => {
      document.removeEventListener("keydown", onKey);
      root.unmount();
      host.remove();
      resolve(ok);
    };
    const onKey = (e) => {
      if (e.key === "Escape") done(false);
      if (e.key === "Enter") done(true);
    };
    document.addEventListener("keydown", onKey);

    root.render(
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/30 backdrop-blur-[6px] p-4 animate-in fade-in duration-150"
        onMouseDown={(e) => e.target === e.currentTarget && done(false)}
      >
        <div
          role="alertdialog"
          aria-label={`Delete ${what}`}
          className="w-full max-w-[290px] rounded-[18px] bg-white/95 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] overflow-hidden text-center animate-in zoom-in-95 duration-150"
        >
          <div className="px-5 pt-5 pb-4">
            <span className="mx-auto mb-3 w-11 h-11 rounded-full bg-[#FF3B30]/12 text-[#FF3B30] flex items-center justify-center">
              <Trash2 className="w-5 h-5" strokeWidth={2.3} />
            </span>
            <h3 className="text-[15px] font-semibold text-[#1C1C1E] leading-snug">Delete {what}?</h3>
            <p className="mt-1 text-[12.5px] text-[#6C6C70] leading-snug">{note}</p>
          </div>
          <div className="grid grid-cols-2 border-t border-[#3C3C43]/12">
            <button
              type="button"
              onClick={() => done(false)}
              className="py-3 text-[15px] text-[#007AFF] hover:bg-[#767680]/[0.08] cursor-pointer border-r border-[#3C3C43]/12"
            >
              Cancel
            </button>
            <button
              type="button"
              autoFocus
              onClick={() => done(true)}
              className="py-3 text-[15px] font-semibold text-[#FF3B30] hover:bg-[#FF3B30]/[0.06] cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
}
