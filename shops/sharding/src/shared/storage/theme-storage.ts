import type { Theme } from '../types';
import { isTheme } from '../types';
import { STORAGE_KEYS } from './keys';

export function loadTheme(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEYS.theme);
    return isTheme(v) ? v : 'auto';
  } catch {
    return 'auto';
  }
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch (err) {
    console.warn('[theme] failed to persist theme preference', err);
  }
}