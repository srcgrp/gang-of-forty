import { Outlet } from "@tanstack/react-router";
import { useThemeStore } from "../hooks/useThemeStore";
import Banner from "./Banner";
import Header from "./Header";

export default function Layout() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <div className="app" data-theme={theme}>
      <Banner />
      <Header />
      <Outlet />
    </div>
  );
}
