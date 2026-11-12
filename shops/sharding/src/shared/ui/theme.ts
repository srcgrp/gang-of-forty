import type { Theme } from '../types';
import { isTheme } from '../types';

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll<HTMLInputElement>('input[data-theme-set]').forEach((input) => {
    input.checked = input.value === theme;
  });
}

export function setupTheme(initial: Theme, onChange: (theme: Theme) => void): void {
  applyTheme(initial);
  document.addEventListener('change', (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (!e.target.matches('input[data-theme-set]')) return;
    if (isTheme(e.target.value)) {
      applyTheme(e.target.value);
      onChange(e.target.value);
    }
  });
}