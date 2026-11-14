"use client";

import { useState } from "react";

/**
 * Radial tick chart: a ring of thin rounded spokes, like a gauge dial.
 *
 * Spokes are shared out between the segments by their share and drawn in the
 * segment's colour, fading from light at the start of each segment to full
 * strength at its end, with a one-spoke gap between segments. A large figure
 * and a small label sit in the middle.
 *
 * Hover: the pointed-at segment's spokes reach outwards at full colour while
 * the other colours stay visible but a little softer, a thin bracket arc in
 * its colour wraps the segment, and a callout pinned to the segment's
 * midpoint by a short leader line shows its name, share and amount on a
 * light tint of its colour (like the selected sidebar item).
 *
 *   <TickRing segments={[{ key: "Cash", value: 70, color: "#007AFF" }]}
 *             value="5.82M" label="AED total revenue" amount={5817740} />
 */

const r2 = (n) => Math.round(n * 100) / 100;

function fmtAED(n) {
  const v = Number(n) || 0;
  if (v >= 1_000_000) return `AED ${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `AED ${(v / 1_000).toFixed(1)}K`;
  return `AED ${v.toFixed(0)}`;
}

export default function TickRing({ segments, value, label, amount, size = 230, ticks = 84 }) {
  const [active, setActive] = useState(null);

  const c = size / 2;
  const rOuter = size / 2 - 14;
  const rInner = rOuter - size * 0.115;
  const total = segments.reduce((s, x) => s + (Number(x.value) || 0), 0) || 1;

  // Give every non-empty segment at least one spoke, then share the rest by size.
  const usable = ticks - segments.filter((s) => s.value > 0).length; // one gap spoke per segment
  const counts = segments.map((s) => (s.value > 0 ? Math.max(1, Math.round((s.value / total) * usable)) : 0));
  let diff = usable - counts.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0 && i < 200; i++) {
    const k = counts.indexOf(Math.max(...counts));
    counts[k] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }

  const spokes = [];
  const span = []; // first and last slot of each segment
  let slot = 0;
  segments.forEach((seg, si) => {
    const n = counts[si];
    span[si] = n ? [slot, slot + n - 1] : null;
    for (let j = 0; j < n; j++) {
      spokes.push({ slot: slot++, si, color: seg.color, t: n > 1 ? j / (n - 1) : 1 });
    }
    if (n > 0) slot++; // gap
  });

  const step = 360 / ticks;
  const rad = (deg) => ((deg - 90) * Math.PI) / 180;
  const pt = (r, deg) => [c + r * Math.cos(rad(deg)), c + r * Math.sin(rad(deg))];

  // Hover indication geometry
  const hov = active != null && span[active] ? segments[active] : null;
  let bracket = null;
  let callout = null;
  if (hov) {
    const [s0, s1] = span[active];
    const a0 = s0 * step - step * 0.35;
    const a1 = s1 * step + step * 0.35;
    const rb = rOuter + 9;
    const [x0, y0] = pt(rb, a0);
    const [x1, y1] = pt(rb, a1);
    const large = a1 - a0 > 180 ? 1 : 0;
    bracket = `M ${r2(x0)} ${r2(y0)} A ${rb} ${rb} 0 ${large} 1 ${r2(x1)} ${r2(y1)}`;

    const mid = (a0 + a1) / 2;
    const [lx0, ly0] = pt(rb, mid);
    const [lx1, ly1] = pt(rb + 14, mid);
    const right = Math.cos(rad(mid)) >= 0;
    callout = {
      line: [r2(lx0), r2(ly0), r2(lx1), r2(ly1)],
      x: lx1,
      y: ly1,
      right,
      share: Math.round((hov.value / total) * 100),
      amount: amount != null ? fmtAED((Number(amount) * hov.value) / total) : null,
    };
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        overflow="visible"
        role="img"
        aria-label={segments.map((s) => `${s.key} ${Math.round((s.value / total) * 100)}%`).join(", ")}
        onMouseLeave={() => setActive(null)}
      >
        {spokes.map((sp, i) => {
          const dim = active != null && active !== sp.si;
          const on = active === sp.si;
          const reach = on ? 5 : 0;
          const [x1, y1] = pt(rInner - (on ? 2 : 0), sp.slot * step);
          const [x2, y2] = pt(rOuter + reach, sp.slot * step);
          // light at the start of a segment, full colour at its end
          // the other colours stay visible, just a little softer
          const base = 0.32 + 0.68 * sp.t;
          const opacity = dim ? base * 0.6 : on ? 0.55 + 0.45 * sp.t : base;
          return (
            <line
              key={i}
              // rounded so the server and the browser draw identical numbers
              x1={r2(x1)}
              y1={r2(y1)}
              x2={r2(x2)}
              y2={r2(y2)}
              stroke={sp.color}
              strokeWidth={r2(size * (on ? 0.016 : 0.0135))}
              strokeLinecap="round"
              opacity={r2(opacity)}
              className="tick-ring-spoke cursor-pointer"
              style={{ animationDelay: `${i * 9}ms` }}
              onMouseEnter={() => setActive(sp.si)}
            />
          );
        })}

        {/* Indication: bracket arc round the segment and a leader line */}
        {hov && (
          <g className="tick-ring-indicator" pointerEvents="none">
            <path d={bracket} fill="none" stroke={hov.color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <line
              x1={callout.line[0]}
              y1={callout.line[1]}
              x2={callout.line[2]}
              y2={callout.line[3]}
              stroke={hov.color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx={callout.line[0]} cy={callout.line[1]} r="3" fill="#FFFFFF" stroke={hov.color} strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Callout pinned to the end of the leader line */}
      {hov && (
        <div
          className="tick-ring-callout absolute z-20 pointer-events-none"
          style={{
            left: callout.x,
            top: callout.y,
            transform: `translate(${callout.right ? "6px" : "calc(-100% - 6px)"}, -50%)`,
          }}
        >
          {/* Same as the selected sidebar item: a flat, light tint of the
              segment's colour over white, no dot */}
          <div
            className="px-3 py-1.5 rounded-[12px] whitespace-nowrap shadow-[0_6px_18px_-10px_rgba(0,0,0,0.3)]"
            style={{ background: `linear-gradient(${hov.color}1F, ${hov.color}1F), #FFFFFF` }}
          >
            <span className="leading-tight block">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[12px] font-semibold text-[#1C1C1E]">{hov.key}</span>
                <span className="text-[12px] font-bold tabular-nums" style={{ color: hov.color }}>
                  {callout.share}%
                </span>
              </span>
              {callout.amount && (
                <span className="block text-[10.5px] text-[#6C6C70] tabular-nums">{callout.amount}</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Centre figure stays as the total */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span className="text-[36px] font-light text-[#1C1C1E] tracking-[-0.03em] leading-none tabular-nums">
          {value}
        </span>
        <span className="mt-1.5 text-[12px] font-medium text-[#3C3C43]">{label}</span>
      </div>
    </div>
  );
}
