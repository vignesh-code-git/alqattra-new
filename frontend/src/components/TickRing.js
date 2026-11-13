"use client";

import { useState } from "react";

/**
 * Radial tick chart: a ring of thin rounded spokes, like a gauge dial.
 *
 * Spokes are shared out between the segments by their share and drawn in the
 * segment's colour, fading from light at the start of each segment to full
 * strength at its end, with a one-spoke gap between segments. A large figure
 * and a small label sit in the middle. Hovering a segment brightens it,
 * fades the rest, and shows its name and share in the middle instead.
 *
 *   <TickRing segments={[{ key: "Cash", value: 70, color: "#007AFF" }]}
 *             value="5.82M" label="AED total revenue" />
 */
const r2 = (n) => Math.round(n * 100) / 100;

export default function TickRing({ segments, value, label, size = 230, ticks = 84 }) {
  const [active, setActive] = useState(null);

  const c = size / 2;
  const rOuter = size / 2 - 6;
  const rInner = rOuter - size * 0.12;
  const total = segments.reduce((s, x) => s + (Number(x.value) || 0), 0) || 1;

  // Give every non-empty segment at least one spoke, then share the rest by size.
  const usable = ticks - segments.filter((s) => s.value > 0).length; // one gap spoke per segment
  let counts = segments.map((s) => (s.value > 0 ? Math.max(1, Math.round((s.value / total) * usable)) : 0));
  let diff = usable - counts.reduce((a, b) => a + b, 0);
  for (let i = 0; diff !== 0 && i < 200; i++) {
    const k = counts.indexOf(Math.max(...counts));
    counts[k] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }

  const spokes = [];
  let slot = 0;
  segments.forEach((seg, si) => {
    const n = counts[si];
    for (let j = 0; j < n; j++) {
      spokes.push({ slot: slot++, si, color: seg.color, t: n > 1 ? j / (n - 1) : 1 });
    }
    if (n > 0) slot++; // gap
  });

  const step = 360 / ticks;
  const hovered = active != null ? segments[active] : null;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={segments.map((s) => `${s.key} ${Math.round((s.value / total) * 100)}%`).join(", ")}
        onMouseLeave={() => setActive(null)}
      >
        {spokes.map((sp, i) => {
          const a = ((sp.slot * step - 90) * Math.PI) / 180;
          const dim = active != null && active !== sp.si;
          const lift = active === sp.si ? 4 : 0;
          // light at the start of a segment, full colour at its end
          const opacity = dim ? 0.12 : 0.32 + 0.68 * sp.t;
          return (
            <line
              key={i}
              // rounded so the server and the browser draw identical numbers
              x1={r2(c + rInner * Math.cos(a))}
              y1={r2(c + rInner * Math.sin(a))}
              x2={r2(c + (rOuter + lift) * Math.cos(a))}
              y2={r2(c + (rOuter + lift) * Math.sin(a))}
              stroke={sp.color}
              strokeWidth={r2(size * 0.0135)}
              strokeLinecap="round"
              opacity={r2(opacity)}
              className="tick-ring-spoke cursor-pointer"
              style={{ animationDelay: `${i * 9}ms` }}
              onMouseEnter={() => setActive(sp.si)}
            >
              <title>{`${segments[sp.si].key}: ${Math.round((segments[sp.si].value / total) * 100)}%`}</title>
            </line>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        {hovered ? (
          <>
            <span className="text-[38px] font-light text-[#1C1C1E] tracking-[-0.03em] leading-none tabular-nums">
              {Math.round((hovered.value / total) * 100)}%
            </span>
            <span className="mt-1.5 text-[12px] font-semibold" style={{ color: hovered.color }}>
              {hovered.key}
            </span>
          </>
        ) : (
          <>
            <span className="text-[38px] font-light text-[#1C1C1E] tracking-[-0.03em] leading-none tabular-nums">
              {value}
            </span>
            <span className="mt-1.5 text-[12px] font-medium text-[#3C3C43]">{label}</span>
          </>
        )}
      </div>
    </div>
  );
}
