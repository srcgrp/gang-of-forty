import type { MouseEvent } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useThemeStore } from "../hooks/useThemeStore";
import { getInPageHash, scrollToHash } from "../shared/ui/hash-links";

export default function Layout() {
  const theme = useThemeStore((state) => state.theme);
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();

  function handleClick(event: MouseEvent<HTMLDivElement>): void {
    const hash = getInPageHash(event.target);
    if (hash === null) return;

    event.preventDefault();
    if (pathname !== "/") {
      void navigate({ to: "/", hash });
      return;
    }
    window.requestAnimationFrame(() => scrollToHash(hash));
  }

  return (
    <div className="app-shell" data-theme={theme} onClick={handleClick}>
      <Outlet />
    </div>
  );
}
