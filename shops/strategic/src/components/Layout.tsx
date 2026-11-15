import type { ReactNode } from 'react';
import { useThemeStore } from '../hooks/useThemeStore';

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  return (
    <div className="app" data-theme={theme}>
      {children}
    </div>
  );
}