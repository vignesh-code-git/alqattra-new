/** Currency and date helpers. The app is UAE-based, so AED with 2 decimals. */

export function aed(value, { withCode = true } = {}) {
  const n = Number(value);
  const safe = Number.isFinite(n) ? n : 0;
  const formatted = safe.toLocaleString('en-AE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return withCode ? `AED ${formatted}` : formatted;
}

export function int(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n).toLocaleString('en-AE') : '0';
}

export function shortDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-AE', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function initials(name) {
  if (!name) return '?';
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** 10/28/2026 - the short numeric date the designs use for "Last Ordered". */
export function numericDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-US');
}

/** Nov 09, 2026, 10:51 AM - date with time, as on the order cards. */
export function dateTime(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
