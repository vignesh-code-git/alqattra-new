"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Date and clock for the top header, styled like the header's other
 * controls (notification bell, profile avatar): a 36px rounded badge filled
 * with a colour gradient and a soft glow, with its text beside it in ink.
 *
 * Calendar: the iOS Calendar app icon (white tile, red weekday, large day
 * number). Clicking it opens an iOS-style month view with today circled red. Clock badge (green): a white analogue face whose hands move every
 * second. Uses the browser's local time. Nothing renders until the first
 * tick, so server and client markup match.
 */

const badge = (hex, rgb) => ({
  background: `linear-gradient(160deg, rgba(${rgb},0.78) 0%, ${hex} 100%)`,
  boxShadow: `0 6px 14px -4px rgba(${rgb},0.55), inset 0 1px 0 rgba(255,255,255,0.35)`,
});

export default function HeaderClock() {
  const [now, setNow] = useState(null);
  const [calOpen, setCalOpen] = useState(false);
  const [view, setView] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="hidden md:block w-[230px] h-9" aria-hidden="true" />;

  const weekdayShort = now.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
  const weekdayLong = now.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const [clock, meridiem] = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).split(" ");

  const s = now.getSeconds();
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;

  return (
    <div className="hidden md:flex items-center gap-4 mr-1 select-none">
      {/* Date: iOS Calendar app icon; click for the month view */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setView({ y: now.getFullYear(), m: now.getMonth() });
            setCalOpen((o) => !o);
          }}
          aria-haspopup="dialog"
          aria-expanded={calOpen}
          title={`${weekdayLong}, ${dayMonth}`}
          className="group flex items-center gap-2 rounded-xl cursor-pointer outline-none"
        >
          <span className="w-9 h-9 rounded-[10px] bg-white flex flex-col items-center justify-center leading-none shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_14px_-6px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.04] transition-transform duration-150 group-hover:-translate-y-0.5">
            <span className="text-[7.5px] font-semibold tracking-[0.04em] text-[#FF3B30]">{weekdayShort}</span>
            <span className="text-[18px] font-light text-[#1C1C1E] tabular-nums tracking-[-0.03em] mt-[1px]">{now.getDate()}</span>
          </span>
          <span className="leading-tight text-left">
            <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-[#FF3B30]">{weekdayLong}</span>
            <span className="block text-[12.5px] font-semibold text-[#1C1C1E] tabular-nums">{dayMonth}</span>
          </span>
        </button>

        {calOpen && view && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setCalOpen(false)} />
            <div
              role="dialog"
              aria-label="Calendar"
              className="ios-pop absolute right-0 mt-3 z-50 w-[300px] rounded-[22px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.06)] p-3.5 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-[17px] font-bold tracking-[-0.01em] text-[#1C1C1E]">
                  {MONTHS[view.m]} <span className="text-[#FF3B30]">{view.y}</span>
                </span>
                <span className="flex items-center gap-1">
                  {[
                    [-1, ChevronLeft, "Previous month"],
                    [1, ChevronRight, "Next month"],
                  ].map(([d, Ico, lbl]) => (
                    <button
                      key={d}
                      type="button"
                      aria-label={lbl}
                      onClick={() =>
                        setView(({ y, m }) => {
                          const n = new Date(y, m + d, 1);
                          return { y: n.getFullYear(), m: n.getMonth() };
                        })
                      }
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#FF3B30] hover:bg-[#FF3B30]/10 cursor-pointer"
                    >
                      <Ico className="w-[18px] h-[18px]" strokeWidth={2.6} />
                    </button>
                  ))}
                </span>
              </div>

              <div className="grid grid-cols-7 text-center pb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => (
                  <span key={i} className="text-[10.5px] font-semibold text-[#8E8E93] py-1">{w}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 text-center">
                {Array.from({ length: new Date(view.y, view.m, 1).getDay() }, (_, i) => (
                  <span key={`e${i}`} />
                ))}
                {Array.from({ length: new Date(view.y, view.m + 1, 0).getDate() }, (_, i) => {
                  const d = i + 1;
                  const isToday = view.y === now.getFullYear() && view.m === now.getMonth() && d === now.getDate();
                  const wk = new Date(view.y, view.m, d).getDay();
                  return (
                    <span
                      key={d}
                      className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-[14px] tabular-nums ${
                        isToday ? "text-white font-bold" : wk === 0 || wk === 6 ? "text-[#8E8E93]" : "text-[#1C1C1E]"
                      }`}
                      style={
                        isToday
                          ? { background: "linear-gradient(160deg, #FF6B5E 0%, #FF3B30 100%)", boxShadow: "0 6px 14px -6px rgba(255,59,48,0.75)" }
                          : undefined
                      }
                    >
                      {d}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#3C3C43]/10">
                <span className="text-[12px] text-[#6C6C70]">
                  Today · <span className="font-semibold text-[#1C1C1E]">{weekdayLong}, {dayMonth}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setView({ y: now.getFullYear(), m: now.getMonth() })}
                  className="h-7 px-3 rounded-full bg-[#FF3B30]/10 hover:bg-[#FF3B30]/16 text-[#FF3B30] text-[11.5px] font-semibold cursor-pointer"
                >
                  Today
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Clock */}
      <div className="flex items-center gap-2" title="Local time">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={badge("#34C759", "52,199,89")}>
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" aria-hidden="true">
            <circle cx="12" cy="12" r="10.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
            {Array.from({ length: 12 }, (_, i) => (
              <line
                key={i}
                x1="12"
                y1="2.9"
                x2="12"
                y2={i % 3 === 0 ? 4.6 : 3.8}
                stroke="#FFFFFF"
                strokeWidth={i % 3 === 0 ? 1.1 : 0.6}
                strokeLinecap="round"
                transform={`rotate(${i * 30} 12 12)`}
              />
            ))}
            <line x1="12" y1="12" x2="12" y2="7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" transform={`rotate(${h * 30} 12 12)`} />
            <line x1="12" y1="12" x2="12" y2="4.8" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" transform={`rotate(${m * 6} 12 12)`} />
            <line x1="12" y1="13.6" x2="12" y2="4" stroke="#D9FFE2" strokeWidth="0.6" strokeLinecap="round" transform={`rotate(${s * 6} 12 12)`} />
            <circle cx="12" cy="12" r="1.1" fill="#FFFFFF" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#28A745]">Time</div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[14px] font-bold text-[#1F9D45] tabular-nums">{clock}</span>
            <span className="text-[9.5px] font-semibold text-[#8E8E93]">{meridiem}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
