"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Date field with a premium, iOS-style calendar. A drop-in replacement for
 * <input type="date">: it takes and returns "YYYY-MM-DD" strings and calls
 * onChange with an input-like event ({ target: { value } }), so handlers that
 * read e.target.value keep working. Without a value prop it keeps its own
 * state. The field looks exactly like the site's date inputs (class
 * "ios-date-btn" shares their styles).
 *
 * The calendar opens in a portal on <body>, so popups with overflow-hidden
 * never clip it: a frosted card with the month in bold and the year in red,
 * round day cells, today in red, the chosen day as a blue gradient circle,
 * and quick Today / Clear buttons.
 */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const pad = (n) => String(n).padStart(2, "0");
const toIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseIso = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
};
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default function IosDateInput({
  value,
  defaultValue = "",
  onChange,
  placeholder = "dd/mm/yyyy",
  className = "",
  name,
  required,
  disabled,
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const current = controlled ? value || "" : inner;
  const selected = parseIso(current);

  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ y: 2026, m: 0 });
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  const place = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const w = 300;
    const h = 384;
    const left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    const below = r.bottom + 8 + h < window.innerHeight;
    setPos({ left, top: below ? r.bottom + 8 : Math.max(8, r.top - h - 8) });
  };

  useLayoutEffect(() => {
    if (open) place();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (popRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onMove = () => place();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [open]);

  const commit = (iso) => {
    if (!controlled) setInner(iso);
    onChange?.({ target: { value: iso, name } });
  };

  const toggle = () => {
    if (disabled) return;
    const d = selected || new Date();
    setView({ y: d.getFullYear(), m: d.getMonth() });
    setOpen((o) => !o);
  };

  const shift = (delta) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const today = new Date();
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const label = selected
    ? selected.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        name={name}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-required={required || undefined}
        onClick={toggle}
        className={`ios-date-btn ${className} text-left`}
      >
        <span className={label ? "" : "text-[#8E8E93]"}>{label || placeholder}</span>
      </button>

      {open &&
        pos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popRef}
            role="dialog"
            aria-label="Choose date"
            className="fixed z-[200] w-[300px] rounded-[22px] p-3.5 select-none text-[#1C1C1E] bg-white/95 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.06)] animate-in fade-in zoom-in-95 duration-150"
            style={{ left: pos.left, top: pos.top }}
          >
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[16px] font-bold tracking-[-0.01em]">
                {MONTHS[view.m]} <span className="text-[#FF3B30]">{view.y}</span>
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => shift(-1)}
                  aria-label="Previous month"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#007AFF] hover:bg-[#007AFF]/10 cursor-pointer"
                >
                  <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={2.6} />
                </button>
                <button
                  type="button"
                  onClick={() => shift(1)}
                  aria-label="Next month"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#007AFF] hover:bg-[#007AFF]/10 cursor-pointer"
                >
                  <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2.6} />
                </button>
              </span>
            </div>

            <div className="grid grid-cols-7 text-center pb-1">
              {WEEKDAYS.map((w, i) => (
                <span key={i} className="text-[10.5px] font-semibold text-[#8E8E93] py-1">
                  {w}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5 text-center">
              {cells.map((d, i) => {
                if (!d) return <span key={`e${i}`} />;
                const date = new Date(view.y, view.m, d);
                const isSel = sameDay(date, selected);
                const isToday = sameDay(date, today);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      commit(toIso(date));
                      setOpen(false);
                    }}
                    className={`mx-auto w-9 h-9 rounded-full text-[14px] tabular-nums flex items-center justify-center transition-all duration-100 cursor-pointer active:scale-90 ${
                      isSel
                        ? "text-white font-bold"
                        : isToday
                          ? "text-[#FF3B30] font-bold hover:bg-[#FF3B30]/10"
                          : "text-[#1C1C1E] hover:bg-[#007AFF]/10"
                    }`}
                    style={
                      isSel
                        ? {
                            background: "linear-gradient(160deg, #3D9BFF 0%, #007AFF 100%)",
                            boxShadow: "0 6px 14px -6px rgba(0,122,255,0.7)",
                          }
                        : undefined
                    }
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-[#3C3C43]/10">
              <button
                type="button"
                onClick={() => {
                  commit("");
                  setOpen(false);
                }}
                className="h-8 px-3.5 rounded-full bg-[#767680]/12 hover:bg-[#767680]/20 text-[#3C3C43] text-[12px] font-semibold cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  commit(toIso(today));
                  setOpen(false);
                }}
                className="h-8 px-4 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-[12px] font-semibold cursor-pointer"
              >
                Today
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
