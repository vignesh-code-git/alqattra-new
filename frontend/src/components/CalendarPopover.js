"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Check } from "lucide-react";

export default function CalendarPopover({
  selectedDate = "8 Nov 2026",
  onSelectDate,
  buttonClassName = "",
  label = "Date Filter",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(8);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const presets = [
    { label: "Today", value: "8 Nov 2026", day: 8, month: 10, year: 2026 },
    { label: "Yesterday", value: "7 Nov 2026", day: 7, month: 10, year: 2026 },
    { label: "This Week", value: "Nov 2 - Nov 8, 2026", day: 8, month: 10, year: 2026 },
    { label: "This Month", value: "November 2026", day: 8, month: 10, year: 2026 },
    { label: "Last Month", value: "October 2026", day: 31, month: 9, year: 2026 },
  ];

  // Calculate days in current month & starting day
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    const dateStr = `${day} ${months[currentMonth].substring(0, 3)} ${currentYear}`;
    onSelectDate && onSelectDate(dateStr);
    setIsOpen(false);
  };

  const handlePresetClick = (preset) => {
    setSelectedDay(preset.day);
    setCurrentMonth(preset.month);
    setCurrentYear(preset.year);
    onSelectDate && onSelectDate(preset.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          buttonClassName ||
          "flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E5EA] rounded-md text-xs font-semibold text-[#3C3C43] hover:bg-[#F2F2F7] hover:border-[#C7C7CC] shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
        }
        title="Open Calendar"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-[#007AFF]" />
        <span className="font-medium text-[#2C2C2E]">{selectedDate || label}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white border border-[#E5E5EA] rounded-md shadow-xl p-3 sm:p-3.5 z-50 animate-in fade-in zoom-in-95 select-none">
            {/* Calendar Header with Month/Year Navigation */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#F2F2F7]">
              <span className="text-xs font-bold text-[#1C1C1E]">
                {months[currentMonth]} {currentYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded hover:bg-[#F2F2F7] text-[#8E8E93] hover:text-[#2C2C2E] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded hover:bg-[#F2F2F7] text-[#8E8E93] hover:text-[#2C2C2E] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1 mb-3">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePresetClick(p)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors duration-150 outline-none focus:outline-none select-none cursor-pointer ${
                    selectedDate === p.value
                      ? "bg-[#007AFF] text-white border-[#007AFF]"
                      : "bg-[#F2F2F7] text-[#636366] border-[#E5E5EA] hover:bg-[#F2F2F7] hover:text-[#1C1C1E]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider mb-1">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Blank offset days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`blank-${i}`} className="h-7 w-7" />
              ))}

              {/* Month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isSelected =
                  selectedDay === dayNum &&
                  currentMonth === 10 &&
                  currentYear === 2026;
                const isToday = dayNum === 8 && currentMonth === 10 && currentYear === 2026;

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => handleDayClick(dayNum)}
                    className={`h-7 w-7 rounded-sm flex items-center justify-center font-medium border transition-colors duration-150 text-[11px] outline-none focus:outline-none select-none cursor-pointer ${
                      isSelected
                        ? "bg-[#007AFF] text-white font-bold border-[#007AFF] shadow-2xs"
                        : isToday
                        ? "border-[#4EA6FF] text-[#007AFF] font-bold bg-[#EAF4FF]/50"
                        : "border-transparent text-[#3C3C43] hover:bg-[#F2F2F7]"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Footer with Clear/Close */}
            <div className="mt-3 pt-2 border-t border-[#F2F2F7] flex items-center justify-between text-[11px]">
              <span className="text-[#8E8E93] font-mono">Today: 8 Nov 2026</span>
              <button
                type="button"
                onClick={() => handleDayClick(8)}
                className="text-[#007AFF] hover:text-[#0062CC] font-bold"
              >
                Go to Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}