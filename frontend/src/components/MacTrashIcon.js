"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * The Bin's icon, in the style of the macOS Dock Trash, see-through:
 * a frosted glass cylinder whose square perforations are real holes, so
 * whatever is behind the icon shows through. Through the front wall you
 * see the back wall's mesh, the floor and anything inside the can.
 *
 * Two looks, set by `count` (items in the Bin):
 *   0      empty: clear glass, nothing inside.
 *   1+     full: crumpled paper inside, piling higher as the count grows
 *          (a little, about half, nearly full, then spilling over the top).
 * The paper rises and sinks smoothly when the count changes, and a paper
 * ball drops in whenever the count goes up.
 *
 * `full` is still accepted for a fixed full look (same as count={10}).
 */

// Geometry (viewBox 0 0 64 64)
const CX = 32;
const TOP = { y: 13, rx: 21, ry: 5.6 };
const BOT = { y: 57, rx: 16.6, ry: 4.2 };
const r2 = (n) => Math.round(n * 100) / 100; // same numbers on server and browser

const ROWS = 13;
const COLS = 17;

/** Perforations for the front wall (side = 1) or the back wall (side = -1). */
function mesh(side) {
  const out = [];
  for (let r = 0; r < ROWS; r++) {
    const t = 0.13 + (r / (ROWS - 1)) * 0.72; // plain lip and foot band
    const yc = TOP.y + t * (BOT.y - TOP.y);
    const R = TOP.rx + t * (BOT.rx - TOP.rx);
    const ry = TOP.ry + t * (BOT.ry - TOP.ry);
    const step = (Math.PI * 0.92) / COLS;
    for (let c = 0; c < COLS; c++) {
      const th = -Math.PI * 0.46 + step * (c + 0.5);
      const w = R * step * Math.cos(th) * 0.6;
      const h = 1.75;
      if (w < 0.35) continue;
      out.push({
        x: r2(CX + R * Math.sin(th) - w / 2),
        // front rows curve down towards you, back rows curve up
        y: r2(yc + side * ry * Math.cos(th) - h / 2),
        w: r2(w),
        h,
      });
    }
  }
  return out;
}
const FRONT = mesh(1);
const BACK = mesh(-1);

const bodyPath = `M${CX - TOP.rx} ${TOP.y} L${CX - BOT.rx} ${BOT.y} A${BOT.rx} ${BOT.ry} 0 0 0 ${CX + BOT.rx} ${BOT.y} L${CX + TOP.rx} ${TOP.y} Z`;
// Same outline pulled in a little: the inner face of the glass.
const innerPath = `M${CX - TOP.rx + 1.3} ${TOP.y + 1.5} L${CX - BOT.rx + 1.1} ${BOT.y - 0.4} A${BOT.rx - 1.1} ${BOT.ry - 0.7} 0 0 0 ${CX + BOT.rx - 1.1} ${BOT.y - 0.4} L${CX + TOP.rx - 1.3} ${TOP.y + 1.5}`;

const bandT = 0.9;
const band = {
  y: TOP.y + bandT * (BOT.y - TOP.y),
  rx: TOP.rx + bandT * (BOT.rx - TOP.rx),
  ry: TOP.ry + bandT * (BOT.ry - TOP.ry),
};

/* The paper pile: one tall heap whose crumpled top sits at y = 18 (full).
   It is clipped to the can and slid down to show less paper. */
const HEAP_TOP = 18;
const heapPoints = [
  [8, 22], [11, 19.5], [14, 21.5], [17, 18], [20, 20.5], [23, 17.5], [26, 19.8],
  [29, 16.8], [32, 19.2], [35, 17], [38, 20], [41, 17.6], [44, 20.2], [47, 18.2],
  [50, 21], [53, 19], [56, 22],
];
const heapPath =
  `M6 72 L${heapPoints.map(([x, y]) => `${x} ${y}`).join(" L")} L58 72 Z`;
// Folds and the edges of single sheets inside the pile
const heapFolds = [
  "M12 26 L16 23 L19 27", "M24 22 L27 26 L31 23", "M35 24 L38 28 L42 24",
  "M45 23 L48 27", "M15 33 L19 30 L23 34", "M28 31 L32 35 L35 31",
  "M40 32 L44 29 L47 33", "M18 41 L22 38 L26 42", "M31 40 L35 43",
  "M38 39 L42 42 L46 38", "M21 49 L25 46 L28 50", "M34 48 L38 51 L42 47",
];
// Light/shadow patches give the pile some depth
const heapShades = [
  "M17 18 L20 20.5 L18 27 L13 25 Z", "M29 16.8 L32 19.2 L30 25 L26 23 Z",
  "M41 17.6 L44 20.2 L42 26 L38 24 Z", "M22 30 L27 33 L24 38 L19 35 Z",
  "M36 34 L41 37 L38 42 L33 39 Z",
];

/** Where the top of the pile sits for a given count. */
function pileTop(count) {
  if (count <= 0) return 70; // out of sight below the floor
  if (count <= 2) return 49;
  if (count <= 5) return 40;
  if (count <= 9) return 30;
  return HEAP_TOP; // 10 or more: full to the brim
}

export default function MacTrashIcon({ count, full = false, className = "w-7 h-7", style }) {
  const n = count ?? (full ? 10 : 0);
  // Gradient and mask ids must be unique per icon on the page.
  const id = useId().replace(/:/g, "");
  const u = (name) => `${name}-${id}`;
  const url = (name) => `url(#${u(name)})`;

  // A paper ball drops in each time the count goes up.
  const prev = useRef(n);
  const [drop, setDrop] = useState(0);
  useEffect(() => {
    if (n > prev.current) setDrop((d) => d + 1);
    prev.current = n;
  }, [n]);

  const shift = pileTop(n) - HEAP_TOP;
  const overflowing = n >= 10;

  return (
    <svg viewBox="0 0 64 64" className={className} style={{ overflow: "visible", ...style }} aria-hidden="true">
      <defs>
        {/* Frosted glass: clear in the middle, more frosted towards the edges */}
        <linearGradient id={u("glass")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#AEB4BC" stopOpacity="0.92" />
          <stop offset="0.1" stopColor="#DDE1E6" stopOpacity="0.72" />
          <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#F7F8FA" stopOpacity="0.32" />
          <stop offset="0.8" stopColor="#E3E6EA" stopOpacity="0.55" />
          <stop offset="0.94" stopColor="#C9CED4" stopOpacity="0.8" />
          <stop offset="1" stopColor="#A8AEB7" stopOpacity="0.95" />
        </linearGradient>
        {/* A faint cool tint from top to bottom, like thick glass */}
        <linearGradient id={u("tint")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#B9C3CF" stopOpacity="0.22" />
        </linearGradient>
        {/* The back wall seen through the front: fainter */}
        <linearGradient id={u("back")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#C3C9D0" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#E8EBEE" stopOpacity="0.45" />
          <stop offset="1" stopColor="#BDC3CB" stopOpacity="0.32" />
        </linearGradient>
        {/* Polished metal lip */}
        <linearGradient id={u("lip")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#E9ECEF" />
          <stop offset="0.35" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#D3D7DC" />
          <stop offset="1" stopColor="#A9AFB7" />
        </linearGradient>
        <radialGradient id={u("inside")} cx="0.5" cy="0.1" r="0.9">
          <stop offset="0" stopColor="#7F8690" stopOpacity="0.34" />
          <stop offset="1" stopColor="#7F8690" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id={u("paper")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#F1F2F4" />
          <stop offset="1" stopColor="#D9DCE1" />
        </linearGradient>
        <clipPath id={u("clip")}>
          <path d={bodyPath} />
        </clipPath>
        {/* Holes are cut out of each wall, so they are truly see-through */}
        <mask id={u("frontHoles")} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          {FRONT.map((h, i) => (
            <rect key={i} x={h.x} y={h.y} width={h.w} height={h.h} rx="0.45" fill="#000" />
          ))}
        </mask>
        <mask id={u("backHoles")} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          {BACK.map((h, i) => (
            <rect key={i} x={h.x} y={h.y} width={h.w} height={h.h} rx="0.45" fill="#000" />
          ))}
        </mask>
      </defs>

      {/* Soft shadow under the can */}
      <ellipse cx={CX} cy={BOT.y + 2.6} rx={BOT.rx + 1.5} ry="2.1" fill="#000" opacity="0.13" />

      {/* Back wall and floor, seen through the front */}
      <path d={bodyPath} fill={url("back")} mask={url("backHoles")} />
      <ellipse cx={CX} cy={BOT.y} rx={BOT.rx - 0.8} ry={BOT.ry - 0.8} fill="#8F969F" opacity="0.2" />

      {/* Paper inside the can, behind the front mesh. Slides up and down. */}
      <g clipPath={url("clip")}>
        <g
          style={{
            transform: `translateY(${shift}px)`,
            transition: "transform 700ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          <path d={heapPath} fill={url("paper")} stroke="#BCC1C8" strokeWidth="0.55" strokeLinejoin="round" />
          <g fill="#E3E6EA" opacity="0.9">
            {heapShades.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g fill="none" stroke="#BCC1C8" strokeWidth="0.55" strokeLinejoin="round" strokeLinecap="round">
            {heapFolds.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
      </g>

      {/* Front wall: frosted glass with real holes, plus a faint tint */}
      <path d={bodyPath} fill={url("glass")} mask={url("frontHoles")} />
      <path d={bodyPath} fill={url("tint")} mask={url("frontHoles")} />

      {/* Foot band line */}
      <path
        d={`M${r2(CX - band.rx)} ${r2(band.y)} A${r2(band.rx)} ${r2(band.ry)} 0 0 0 ${r2(CX + band.rx)} ${r2(band.y)}`}
        fill="none"
        stroke="#99A0A9"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Reflections: a bright streak on the left, a softer one on the right */}
      <g clipPath={url("clip")} strokeLinecap="round">
        <path d="M20.5 18 L22.8 58" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.75" />
        <path d="M24.2 18 L25.9 58" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.55" />
        <path d="M45.5 18 L43.2 58" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Glass thickness: inner face line and outer edge */}
      <path d={innerPath} fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" />
      <path d={bodyPath} fill="none" stroke="#858C96" strokeWidth="0.75" opacity="0.75" />

      {/* Opening */}
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 1.4} ry={TOP.ry - 1.1} fill={url("inside")} />

      {/* Full to the brim: paper heaped over the top */}
      <g
        style={{
          opacity: overflowing ? 1 : 0,
          transform: overflowing ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 400ms ease, transform 600ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        stroke="#BCC1C8"
        strokeWidth="0.55"
        strokeLinejoin="round"
      >
        <path d="M17.5 15 L19 9.5 L23 6.8 L27 8.2 L29.5 5.2 L33.8 6.2 L35.5 9.8 L31.5 13.8 L24 16.5 Z" fill={url("paper")} />
        <path d="M31 14 L33.5 7.2 L38 4.6 L42.8 6.2 L45.6 10.4 L45 14.6 L38.6 16.6 Z" fill={url("paper")} />
        <path d="M23 9.8 L26 12.2 M29.8 6.4 L31.2 10.6 M36 7.2 L38.8 10.2 M42.2 7 L43.4 11.8" fill="none" />
      </g>

      {/* A paper ball dropping in when something is deleted */}
      {drop > 0 && (
        <g key={drop} className="bin-drop">
          <circle cx={CX + 2} cy="6" r="3.4" fill={url("paper")} stroke="#BCC1C8" strokeWidth="0.55" />
          <path d={`M${CX} 5 L${CX + 2.5} 7 L${CX + 4} 4.5`} fill="none" stroke="#BCC1C8" strokeWidth="0.5" />
        </g>
      )}

      {/* Rounded metal lip */}
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 0.7} ry={TOP.ry - 0.5} fill="none" stroke={url("lip")} strokeWidth="2.5" />
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx + 0.55} ry={TOP.ry + 0.75} fill="none" stroke="#858C96" strokeWidth="0.6" opacity="0.8" />
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 1.95} ry={TOP.ry - 1.65} fill="none" stroke="#858C96" strokeWidth="0.45" opacity="0.55" />
      {/* Shine on the front of the lip */}
      <path
        d={`M${CX - 12} ${TOP.y + 4.6} Q${CX - 4} ${TOP.y + 5.6} ${CX + 3} ${TOP.y + 5.3}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
