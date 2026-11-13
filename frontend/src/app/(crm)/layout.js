"use client";

import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";
import { TerritoryProvider } from "@/context/TerritoryContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function CRMContent({ children }) {
  const { isCollapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex text-[#1C1C1E]">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col min-w-0 bg-[#F2F2F7] min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-0 lg:ml-[4.5rem]" : "ml-0 lg:ml-[13.5rem]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function CRMLayout({ children }) {
  return (
    <ToastProvider>
      <TerritoryProvider>
        <SidebarProvider>
          <CRMContent>{children}</CRMContent>
        </SidebarProvider>
      </TerritoryProvider>
    </ToastProvider>
  );
}
