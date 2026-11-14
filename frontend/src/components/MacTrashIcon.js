import { useId } from "react";

/**
 * The Bin's icon, drawn after the macOS Dock Trash: a frosted, slightly
 * tapered mesh can with a dark rim. `full` adds crumpled paper poking out
 * of the top, the way the Dock shows a Trash with something in it.
 */
export default function MacTrashIcon({ full = false, className = "w-7 h-7", style }) {
  // Gradient ids must be unique per icon on the page.
  const id = useId().replace(/:/g, "");
  const u = (name) => `${name}-${id}`;
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <defs>
        {/* Cylinder shading: light in the middle, darker at the sides */}
        <linearGradient id={u("mt-body")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#B9BEC6" />
          <stop offset="0.35" stopColor="#F4F6F9" />
          <stop offset="0.6" stopColor="#E6E9EE" />
          <stop offset="1" stopColor="#A9AFB8" />
        </linearGradient>
        <linearGradient id={u("mt-rim")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C4C9D0" />
        </linearGradient>
        <radialGradient id={u("mt-inside")} cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#5E636B" />
          <stop offset="1" stopColor="#30343A" />
        </radialGradient>
        <clipPath id={u("mt-clip")}>
          <path d="M12 15 L52 15 L47.5 56 Q47 60 43 60 L21 60 Q17 60 16.5 56 Z" />
        </clipPath>
      </defs>

      {/* Shadow on the shelf */}
      <ellipse cx="32" cy="60.5" rx="15" ry="2.2" fill="#000" opacity="0.14" />

      {/* Body */}
      <path d="M12 15 L52 15 L47.5 56 Q47 60 43 60 L21 60 Q17 60 16.5 56 Z" fill={`url(#${u("mt-body")})`} opacity="0.96" />

      {/* Mesh: rows of small holes that narrow with the can */}
      <g clipPath={`url(#${u("mt-clip")})`} fill="#7D838C" opacity="0.38">
        {Array.from({ length: 9 }).map((_, r) => {
          const y = 21 + r * 4.4;
          const t = (y - 15) / 45; // 0 at the rim, 1 at the base
          const left = 13.5 + 3.8 * t;
          const right = 50.5 - 3.8 * t;
          const n = 9;
          return Array.from({ length: n }).map((__, c) => {
            // rounded so server and browser render the same numbers
            const x = Math.round((left + ((right - left) * (c + 0.5)) / n - 1.15) * 100) / 100;
            return <rect key={`${r}-${c}`} x={x} y={Math.round((y - 1.3) * 100) / 100} width="2.3" height="2.6" rx="0.9" />;
          });
        })}
      </g>

      {/* Vertical ribs */}
      <g clipPath={`url(#${u("mt-clip")})`} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.55">
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <line key={f} x1={12 + 40 * f} y1="15" x2={16.5 + 31 * f} y2="60" />
        ))}
      </g>

      {/* Edge outline */}
      <path
        d="M12 15 L52 15 L47.5 56 Q47 60 43 60 L21 60 Q17 60 16.5 56 Z"
        fill="none"
        stroke="#8A9099"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Opening: dark inside, then papers when full */}
      <ellipse cx="32" cy="15" rx="20" ry="5" fill={`url(#${u("mt-inside")})`} />
      {full && (
        <g>
          <path d="M20 15 Q21 6 28 7 Q31 3 36 7 Q42 5 43 11 Q46 13 44 16 L20 16 Z" fill="#FFFFFF" stroke="#C7CBD1" strokeWidth="0.8" />
          <path d="M26 10 L30 13 M34 8 L36 13 M39 10 L41 14" stroke="#C7CBD1" strokeWidth="0.8" fill="none" />
          <path d="M37 6 Q44 1 48 8 Q47 13 42 14 Z" fill="#F7F7F2" stroke="#C7CBD1" strokeWidth="0.8" />
        </g>
      )}

      {/* Rim */}
      <ellipse cx="32" cy="15" rx="20.5" ry="5.3" fill="none" stroke={`url(#${u("mt-rim")})`} strokeWidth="2.6" />
      <ellipse cx="32" cy="15" rx="21.8" ry="6.4" fill="none" stroke="#8A9099" strokeWidth="0.7" opacity="0.6" />
    </svg>
  );
}
