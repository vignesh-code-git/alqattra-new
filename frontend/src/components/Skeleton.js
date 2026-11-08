"use client";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-md ${className}`}
      {...props}
    />
  );
}

export function MetricCardsSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200/90 rounded-md p-4 shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="h-3 w-14 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({
  columns = 7,
  rows = 8,
  showCards = true,
  title = "Loading records...",
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-5 p-6 animate-in fade-in duration-200">
      {/* Top Header Placeholder */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/70">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-3.5 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      {showCards && <MetricCardsSkeleton count={4} />}

      {/* Toolbar Filter Skeleton */}
      <div className="bg-slate-50 p-3 rounded-md border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="h-8 flex-1 max-w-sm rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-32 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      {/* Grid Table Skeleton */}
      <div className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Thead Skeleton */}
        <div className="bg-[#5948DB] px-4 py-3 flex items-center border-b border-[#4A3AC9]">
          <div className="w-8 shrink-0">
            <div className="w-4 h-4 rounded-xs bg-white/40 animate-pulse" />
          </div>
          <div className="flex-1 grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3.5 bg-white/40 rounded-xs animate-pulse" />
            ))}
          </div>
          <div className="w-16 shrink-0 flex justify-end">
            <div className="h-3.5 w-12 bg-white/40 rounded-xs animate-pulse" />
          </div>
        </div>

        {/* Shimmer Table Rows */}
        <div className="divide-y divide-slate-100 font-medium">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <div
              key={rIdx}
              className="px-4 py-3.5 flex items-center hover:bg-slate-50/50 transition-colors"
            >
              <div className="w-8 shrink-0">
                <Skeleton className="w-4 h-4 rounded-xs" />
              </div>
              <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                <div className="space-y-1">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
                <div>
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
                <div>
                  <Skeleton className="h-3.5 w-28" />
                </div>
                <div>
                  <Skeleton className="h-3.5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-3.5 w-20" />
                </div>
              </div>
              <div className="w-16 shrink-0 flex justify-end gap-1.5">
                <Skeleton className="h-7 w-14 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar Skeleton */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <Skeleton className="h-3.5 w-40" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-7 w-8 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSkeleton;
