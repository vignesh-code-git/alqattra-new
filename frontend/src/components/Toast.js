"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold animate-in slide-in-from-bottom-5 transition-all ${
              t.type === "success"
                ? "bg-white border-[#BCEFC9] text-[#2C2C2E] shadow-[#34C759]/10"
                : t.type === "error"
                ? "bg-white border-[#FFD5D2] text-[#2C2C2E] shadow-[#FF3B30]/10"
                : "bg-white border-[#BFDDFF] text-[#2C2C2E] shadow-[#007AFF]/10"
            }`}
          >
            {t.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#34C759] shrink-0" />}
            {t.type === "error" && <AlertCircle className="w-4 h-4 text-[#FF3B30] shrink-0" />}
            {t.type === "info" && <Info className="w-4 h-4 text-[#007AFF] shrink-0" />}
            <span className="flex-1 leading-snug">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 text-[#8E8E93] hover:text-[#636366] rounded-lg"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { addToast: (msg) => console.log(msg) };
  }
  return ctx;
}
