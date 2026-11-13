"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Keeps a page in step with the shared CRM backend.
 *
 * The website and the mobile app write to the same Django API, so anything
 * the app saves must show up here without a manual reload. This hook:
 *   - loads the data on mount,
 *   - re-fetches every `intervalMs` while the tab is visible,
 *   - re-fetches immediately when the tab regains focus,
 *   - exposes `refresh()` so a page can reload right after its own save.
 *
 * `loader` must return the data, or null if the request failed (which is
 * what apiService does). A failed poll keeps the last good data and sets
 * `error`, so a brief outage never blanks the page.
 */
export default function useLiveData(loader, { intervalMs = 15000 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  const inFlight = useRef(false);
  const mounted = useRef(true);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      const result = await loaderRef.current();
      if (!mounted.current) return;
      if (result == null) {
        setError("Could not reach the CRM server.");
      } else {
        setData(result);
        setError(null);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (mounted.current) setError(err?.message || "Could not load data.");
    } finally {
      inFlight.current = false;
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    refresh();

    const tick = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const timer = setInterval(tick, intervalMs);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", tick);

    return () => {
      mounted.current = false;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [refresh, intervalMs]);

  return { data, loading, error, lastUpdated, refresh };
}
