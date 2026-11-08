"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TerritoryContext = createContext({
  territory: "ALL",
  setTerritory: () => {},
});

export function TerritoryProvider({ children }) {
  const [territory, setTerritoryState] = useState("ALL");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("alqattara_territory") : null;
    if (saved) {
      setTerritoryState(saved);
    }
  }, []);

  const setTerritory = (t) => {
    setTerritoryState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("alqattara_territory", t);
    }
  };

  return (
    <TerritoryContext.Provider value={{ territory, setTerritory }}>
      {children}
    </TerritoryContext.Provider>
  );
}

export function useTerritory() {
  return useContext(TerritoryContext);
}