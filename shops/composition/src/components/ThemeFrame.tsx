import type { ReactNode } from "react";
import { useThemeStore } from "../hooks/useThemeStore";

type Props = { children: ReactNode };
export default function ThemeFrame({ children }: Props) {
  const theme = useThemeStore((state) => state.theme);
  return <div className="app" data-theme={theme}>{children}</div>;
}
