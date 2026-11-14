"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import PanelHeader from "@/components/PanelHeader";
import MacTrashIcon from "@/components/MacTrashIcon";
import confirmDelete from "@/components/confirmDelete";
import { useToast } from "@/components/Toast";
import { apiService } from "@/services/api";
import useLiveData from "@/hooks/useLiveData";

const BIN_DAYS = 30;

const fmtDate = (iso) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// Countdown colour: calm while there's time, orange in the last week, red in the last 3 days.
const urgency = (days) => (days <= 3 ? "#FF3B30" : days <= 7 ? "#FF9500" : "#34C759");

/** Tell the sidebar to refresh its Bin icon (empty / with paper). */
const binChanged = () => window.dispatchEvent(new Event("bin-changed"));

export default function BinPage() {
  const { addToast } = useToast();
  const loadBin = useCallback(async () => {
    const items = await apiService.getBin();
    return Array.isArray(items) ? items : items?.results ?? null;
  }, []);
  const live = useLiveData(loadBin);
  const items = useMemo(() => live.data ?? [], [live.data]);

  const [offlineNotified, setOfflineNotified] = useState(false);
  useEffect(() => {
    if (live.error && !offlineNotified) {
      addToast("Cannot reach the CRM server - showing the last loaded data", "error");
      setOfflineNotified(true);
    }
    if (!live.error && offlineNotified) setOfflineNotified(false);
  }, [live.error, offlineNotified, addToast]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [busy, setBusy] = useState(null);

  const types = useMemo(() => ["All", ...new Set(items.map((i) => i.item_type))], [items]);
  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(
      (i) =>
        (type === "All" || i.item_type === type) &&
        (!q || i.name.toLowerCase().includes(q) || i.item_type.toLowerCase().includes(q))
    );
  }, [items, search, type]);

  const restore = async (item) => {
    setBusy(item.id);
    const ok = await apiService.restoreBinItem(item.id);
    setBusy(null);
    if (!ok) {
      addToast(`Could not restore "${item.name}" - a record with the same details may exist again`, "error");
      return;
    }
    addToast(`Restored ${item.item_type.toLowerCase()} "${item.name}"`, "success");
    binChanged();
    await live.refresh();
  };

  const purgeNow = async (item) => {
    if (!(await confirmDelete(`"${item.name}" for good`, "It is removed from the Bin and can't be restored."))) return;
    setBusy(item.id);
    await apiService.purgeBinItem(item.id);
    setBusy(null);
    addToast(`"${item.name}" deleted for good`, "info");
    binChanged();
    await live.refresh();
  };

  const emptyBin = async () => {
    if (!items.length) return;
    const n = items.length;
    if (!(await confirmDelete(`all ${n} item${n === 1 ? "" : "s"} in the Bin`, "They are deleted for good and can't be restored."))) return;
    const res = await apiService.emptyBin();
    if (!res) {
      addToast("Could not empty the Bin - check the CRM server", "error");
      return;
    }
    addToast(`Bin emptied: ${res.purged} item${res.purged === 1 ? "" : "s"} deleted for good`, "info");
    binChanged();
    await live.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display',sans-serif]">
      <Header title="Bin" subtitle="Deleted items" />

      <main className="flex-1 p-4 sm:p-6 space-y-5">
        <div className="ios-surface rounded-[24px] overflow-hidden">
          <PanelHeader
            title="Bin"
            subtitle={`Deleted items stay here for ${BIN_DAYS} days, then they are deleted for good`}
            actions={
              <button
                type="button"
                onClick={emptyBin}
                disabled={!items.length}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FF3B30]/10 border border-[#FF3B30]/50 text-[#D70015] text-[11.5px] font-semibold cursor-pointer active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Empty Bin
              </button>
            }
          />

          {/* Toolbar: type filter + search */}
          <div className="px-6 py-3.5 bg-[#F9F9FB] border-b border-[#3C3C43]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#3C3C43]">
            <div className="flex flex-wrap items-center gap-1.5">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition cursor-pointer ${
                    type === t
                      ? "bg-[#007AFF] border-[#007AFF] text-white"
                      : "bg-white border-[#007AFF]/20 text-[#3C3C43] hover:bg-[#007AFF]/10"
                  }`}
                >
                  {t}
                  {t !== "All" && (
                    <span className="ml-1 opacity-70">{items.filter((i) => i.item_type === t).length}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8E8E93]">Search:</span>
              <input
                type="text"
                placeholder="Filter deleted items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl px-3 py-1.5 w-52 bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="ios-table w-full text-left">
              <thead>
                <tr className="ios-thead">
                  <th className="py-3 px-6">ITEM</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">DELETED</th>
                  <th className="py-3 px-4">DELETED FOR GOOD IN</th>
                  <th className="py-3 px-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[12.5px] text-[#1C1C1E]">
                {shown.map((item) => {
                  const c = urgency(item.days_left);
                  return (
                    <tr key={item.id} className="hover:bg-[#F2F2F7]/50 transition-colors">
                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-[#1C1C1E] whitespace-nowrap">{item.name}</div>
                        {item.related_count > 0 && (
                          <div className="text-[11px] text-[#8E8E93] mt-0.5">
                            with {item.related_count} linked record{item.related_count === 1 ? "" : "s"}
                          </div>
                        )}
                        {item.kind === "soft" && (
                          <div className="text-[11px] text-[#8E8E93] mt-0.5">Also listed under Deleted Customers</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8E8E93]/12 text-[#3C3C43] text-[11px] font-semibold whitespace-nowrap">
                          {item.item_type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#8E8E93] text-xs font-mono whitespace-nowrap">{fmtDate(item.deleted_at)}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-24 h-1.5 rounded-full bg-[#3C3C43]/10 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${(item.days_left / BIN_DAYS) * 100}%`, backgroundColor: c }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[#3C3C43] whitespace-nowrap">
                            {item.days_left} day{item.days_left === 1 ? "" : "s"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={busy === item.id}
                            onClick={() => restore(item)}
                            className="px-3.5 py-1 rounded-full bg-white border border-[#34C759]/60 text-[#248A3D] hover:bg-[#34C759]/10 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer disabled:opacity-50"
                          >
                            Restore
                          </button>
                          <button
                            type="button"
                            disabled={busy === item.id}
                            onClick={() => purgeNow(item)}
                            className="px-3.5 py-1 rounded-full bg-white border border-[#FF3B30]/50 text-[#D70015] hover:bg-[#FF3B30]/10 text-[11px] font-semibold whitespace-nowrap transition cursor-pointer disabled:opacity-50"
                          >
                            Delete Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-14">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <MacTrashIcon className="w-20 h-20" />
                        <div className="text-[15px] font-semibold text-[#1C1C1E]">
                          {items.length ? "No matching items" : live.loading ? "Loading..." : "The Bin is empty"}
                        </div>
                        <div className="text-[12px] text-[#8E8E93] max-w-sm">
                          Anything you delete comes here first. You can restore it within {BIN_DAYS} days.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
