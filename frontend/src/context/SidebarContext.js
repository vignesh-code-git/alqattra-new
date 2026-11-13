"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext({
  isMobileOpen: false,
  toggleMobileSidebar: () => {},
  closeMobileSidebar: () => {},
  openMobileSidebar: () => {},
  isCollapsed: true,
  toggleCollapse: () => {},
  setIsCollapsed: () => {},
});

export function SidebarProvider({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Collapsed = compact icon rail (the default); expanded shows labels.
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Remember the rail/expanded choice across reloads
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("aq.sidebarCollapsed");
      if (saved !== null) setIsCollapsed(saved === "1");
    } catch {
      // storage unavailable - keep the icon rail default
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("aq.sidebarCollapsed", isCollapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [isCollapsed]);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileOpen(false);
  const openMobileSidebar = () => setIsMobileOpen(true);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isMobileOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
        openMobileSidebar,
        isCollapsed,
        toggleCollapse,
        setIsCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
