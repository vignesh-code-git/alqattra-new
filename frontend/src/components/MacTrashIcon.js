import { useId } from "react";

/**
 * The Bin's icon, drawn in the style of the macOS Dock Trash: a frosted
 * white cylinder, slightly narrower at the base, covered in a fine grid of
 * square perforations that wrap round the can (so the columns squeeze
 * together towards the edges and each row curves with the cylinder), a
 * rounded metal lip with the dark inside showing, and a plain band at the
 * foot. `full` adds crumpled paper rising out of the top, the way the Dock
 * shows a Trash with something in it.
 */

// Geometry (viewBox 0 0 64 64)
const CX = 32;
const TOP = { y: 13, rx: 21, ry: 5.6 };
const BOT = { y: 57, rx: 16.6, ry: 4.2 };
const r2 = (n) => Math.round(n * 100) / 100; // same numbers on server and browser

// Perforations: rows down the can, columns spread round the front half.
const ROWS = 13;
const COLS = 17;
const holes = [];
for (let r = 0; r < ROWS; r++) {
  const t = 0.13 + (r / (ROWS - 1)) * 0.72; // leave the lip and the foot band plain
  const yc = TOP.y + t * (BOT.y - TOP.y);
  const R = TOP.rx + t * (BOT.rx - TOP.rx);
  const ry = TOP.ry + t * (BOT.ry - TOP.ry);
  const step = (Math.PI * 0.92) / COLS;
  for (let c = 0; c < COLS; c++) {
    const th = -Math.PI * 0.46 + step * (c + 0.5);
    const w = R * step * Math.cos(th) * 0.6;
    const h = 1.75;
    if (w < 0.35) continue;
    holes.push({
      x: r2(CX + R * Math.sin(th) - w / 2),
      y: r2(yc + ry * Math.cos(th) - h / 2),
      w: r2(w),
      h,
      // inside of the can is darker near the top
      o: r2(0.62 - t * 0.3),
    });
  }
}

const bodyPath = `M${CX - TOP.rx} ${TOP.y} L${CX - BOT.rx} ${BOT.y} A${BOT.rx} ${BOT.ry} 0 0 0 ${CX + BOT.rx} ${BOT.y} L${CX + TOP.rx} ${TOP.y} Z`;

// The front curve of the plain band at the foot.
const bandT = 0.9;
const band = {
  y: TOP.y + bandT * (BOT.y - TOP.y),
  rx: TOP.rx + bandT * (BOT.rx - TOP.rx),
  ry: TOP.ry + bandT * (BOT.ry - TOP.ry),
};

export default function MacTrashIcon({ full = false, className = "w-7 h-7", style }) {
  // Gradient ids must be unique per icon on the page.
  const id = useId().replace(/:/g, "");
  const u = (name) => `${name}-${id}`;
  const url = (name) => `url(#${u(name)})`;

  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <defs>
        {/* Frosted cylinder: bright just left of centre, greyer at the sides */}
        <linearGradient id={u("body")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#BFC4CB" />
          <stop offset="0.18" stopColor="#E9ECEF" />
          <stop offset="0.38" stopColor="#FFFFFF" />
          <stop offset="0.62" stopColor="#F3F5F7" />
          <stop offset="0.86" stopColor="#D8DCE1" />
          <stop offset="1" stopColor="#B3B9C1" />
        </linearGradient>
        {/* Soft top-to-bottom shading over the body */}
        <linearGradient id={u("shade")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#8D949D" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={u("hole")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5F656E" />
          <stop offset="1" stopColor="#9097A0" />
        </linearGradient>
        {/* Metal lip */}
        <linearGradient id={u("lip")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F7F8FA" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#B7BCC3" />
        </linearGradient>
        <radialGradient id={u("inside")} cx="0.5" cy="0.15" r="0.95">
          <stop offset="0" stopColor="#6A7079" />
          <stop offset="0.6" stopColor="#3E434A" />
          <stop offset="1" stopColor="#24272C" />
        </radialGradient>
        <linearGradient id={u("paper")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E4E6EA" />
        </linearGradient>
        <clipPath id={u("clip")}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      {/* Shadow under the can */}
      <ellipse cx={CX} cy={BOT.y + 2.6} rx={BOT.rx + 1} ry="2" fill="#000" opacity="0.16" />

      {/* Body */}
      <path d={bodyPath} fill={url("body")} />

      {/* Perforations */}
      <g clipPath={url("clip")} fill={url("hole")}>
        {holes.map((h, i) => (
          <rect key={i} x={h.x} y={h.y} width={h.w} height={h.h} rx="0.45" opacity={h.o} />
        ))}
      </g>

      {/* Shading, foot band and a vertical highlight streak */}
      <path d={bodyPath} fill={url("shade")} />
      <path
        d={`M${r2(CX - band.rx)} ${r2(band.y)} A${r2(band.rx)} ${r2(band.ry)} 0 0 0 ${r2(CX + band.rx)} ${r2(band.y)}`}
        fill="none"
        stroke="#9FA6AF"
        strokeWidth="0.6"
        opacity="0.7"
      />
      <path d="M22 19 L24 59" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" clipPath={url("clip")} />

      {/* Outline */}
      <path d={bodyPath} fill="none" stroke="#8C939C" strokeWidth="0.7" opacity="0.75" />

      {/* Opening: the dark inside of the can */}
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 1.4} ry={TOP.ry - 1.1} fill={url("inside")} />
      {/* Light catching the inner front wall */}
      <path
        d={`M${CX - TOP.rx + 2.5} ${TOP.y + 0.6} A${TOP.rx - 2.5} ${TOP.ry - 1.6} 0 0 0 ${CX + TOP.rx - 2.5} ${TOP.y + 0.6}`}
        fill="none"
        stroke="#9AA1AA"
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Crumpled paper when the Bin has something in it */}
      {full && (
        <g stroke="#B9BEC5" strokeWidth="0.6" strokeLinejoin="round">
          <path d="M17 14 L18.5 8.5 L22.5 6 L27 7.5 L29 4.5 L33.5 5.5 L35 9 L31 13 L24 15.5 Z" fill={url("paper")} />
          <path d="M30 13 L32.5 6.5 L37.5 3.5 L42.5 5 L46 9.5 L45.5 13.5 L39 15.5 Z" fill={url("paper")} />
          <path d="M37 10 L41 7.5 L44 11 L40.5 14 Z" fill="#EDEFF2" />
          <path d="M22 13.5 L23.5 9.5 L27 10.5 L26 14.5 Z" fill="#F0F1F4" />
          <path d="M20.5 9.5 L24 11.5 M28.5 6 L30 10 M35 6.5 L38 9.5 M42 6 L43 11" fill="none" />
        </g>
      )}

      {/* Rounded lip */}
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 0.7} ry={TOP.ry - 0.5} fill="none" stroke={url("lip")} strokeWidth="2.4" />
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx + 0.5} ry={TOP.ry + 0.7} fill="none" stroke="#8C939C" strokeWidth="0.6" opacity="0.8" />
      <ellipse cx={CX} cy={TOP.y} rx={TOP.rx - 1.9} ry={TOP.ry - 1.6} fill="none" stroke="#7D848D" strokeWidth="0.45" opacity="0.7" />
    </svg>
  );
}
