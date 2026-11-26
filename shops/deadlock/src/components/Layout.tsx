import { Outlet } from "@tanstack/react-router";
import { useThemeStore } from "../hooks/useThemeStore";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const theme = useThemeStore((state) => state.theme);
  return <div className="app" data-theme={theme}><Header /><Outlet /><Footer /></div>;
}
