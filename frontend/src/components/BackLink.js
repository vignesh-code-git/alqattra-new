"use client";

import { ChevronLeft } from "lucide-react";

/**
 * iOS-style back affordance for a sub-view (new / edit / detail screens).
 * Deliberately a plain text button, not a toolbar — pages carry one header.
 */
export default function BackLink({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-1.5 mb-1 inline-flex items-center gap-0.5 pl-1 pr-2.5 py-1 rounded-lg text-[#007AFF] hover:bg-[#007AFF]/8 active:bg-[#007AFF]/14 text-[13px] font-medium transition cursor-pointer"
    >
      <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      {label}
    </button>
  );
}
