"use client";

/**
 * Colourful status card, used for the headline figures on every CRM page.
 *
 * One colour per card: a soft tint of it fades into white behind the card,
 * a bloom of it sits in the corner, and it fills the icon badge with a
 * matching glow. The label and figure stay in neutral ink so they read well
 * on every tint.
 *
 *   <StatCard label="TOTAL ORDERS" value="128" icon={ShoppingCart} color="#007AFF" />
 */

/** "#RRGGBB" + alpha (0-1) -> "rgba(r,g,b,a)" */
function rgba(hex, alpha) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Pulls the hex out of a Tailwind class such as "bg-[#FF6B4A]". */
export function hexFromTone(tone, fallback = "#007AFF") {
  const hit = String(tone || "").match(/#[0-9a-fA-F]{3,6}/);
  return hit ? hit[0] : fallback;
}

export default function StatCard({ label, value, icon: Icon, color = "#007AFF", hint, size = "md" }) {
  const compact = size === "sm";
  return (
    <div
      className={`group relative overflow-hidden flex items-center justify-between gap-3 ${
        compact ? "rounded-2xl p-4" : "rounded-3xl p-5"
      }`}
      // The card's colour fading into white (as before), kept flat - no
      // shadow - with a thin whitish edge so it stands off the page.
      style={{
        background: `linear-gradient(140deg, ${rgba(color, 0.16)} 0%, #FFFFFF 72%)`,
        border: "1px solid rgba(255,255,255,0.95)",
      }}
    >

      <div className="relative min-w-0">
        <div className="text-[10.5px] font-semibold text-[#6C6C70] uppercase tracking-[0.06em]">
          {label}
        </div>
        <div
          className={`font-bold text-[#1C1C1E] tracking-tight truncate tabular-nums mt-1 ${
            compact ? "text-xl" : "text-[26px] leading-tight"
          }`}
        >
          {value}
        </div>
        {hint ? <div className="text-[11px] text-[#8E8E93] mt-0.5 truncate">{hint}</div> : null}
      </div>

      {Icon ? (
        <div
          className={`stat-icon relative shrink-0 flex items-center justify-center text-white ${
            compact ? "w-10 h-10 rounded-xl" : "w-12 h-12 rounded-2xl"
          }`}
          style={{ backgroundColor: color }}
        >
          <Icon className={compact ? "w-[18px] h-[18px]" : "w-[22px] h-[22px]"} strokeWidth={2.3} />
        </div>
      ) : null}
    </div>
  );
}
