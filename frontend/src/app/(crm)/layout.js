"use client";

import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";
import { TerritoryProvider } from "@/context/TerritoryContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function CRMLayout({ children }) {
  return (
    <ToastProvider>
      <TerritoryProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />
            <div className="flex-1 ml-0 lg:ml-64 flex flex-col min-w-0 bg-[#f8fafc] min-h-screen">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </TerritoryProvider>
    </ToastProvider>
  );
}