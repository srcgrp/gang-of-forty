import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import Header from "./Header";
import { SearchContext } from "../hooks/SearchContext";
import { useThemeStore } from "../hooks/useThemeStore";

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <div className="app" data-theme={theme}>
        <Header />
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
}
