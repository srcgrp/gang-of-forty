import type { Theme } from '../types';
import { setupMobileMenu } from './mobile-menu';
import { setupMegaMenu } from './mega-menu-events';
import { setupTheme } from './theme';

export function setupStaticEvents(h: {
  theme: Theme;
  onTheme: (theme: Theme) => void;
}) {
  setupMobileMenu();
  setupMegaMenu();
  setupTheme(h.theme, h.onTheme);
}