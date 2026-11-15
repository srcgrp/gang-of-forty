import { Outlet } from "@tanstack/react-router";
import { useThemeStore } from "../hooks/useThemeStore";

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="app" data-theme={theme}>
      <Outlet />
    </div>
  );
}
