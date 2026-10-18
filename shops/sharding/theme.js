(function () {
  'use strict';

  const THEMES = ['auto', 'light', 'dark'];

  function getShopSlug() {
    const parts = location.pathname.split('/').filter(Boolean);
    const i = parts.indexOf('shops');
    return i !== -1 && parts[i + 1] ? parts[i + 1] : 'default';
  }

  const STORAGE_KEY = `shop:${getShopSlug()}:v1:theme`;

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return THEMES.includes(v) ? v : 'auto';
    } catch {
      return 'auto';
    }
  }

  function syncInputs(theme) {
    document.querySelectorAll('[data-theme-set]').forEach((input) => {
      input.checked = input.value === theme;
    });
  }

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) return;
    document.documentElement.dataset.theme = theme;
    syncInputs(theme);
  }

  function setTheme(theme) {
    if (!THEMES.includes(theme)) return;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    applyTheme(theme);
  }

  document.addEventListener('change', (e) => {
    const input = e.target.closest('[data-theme-set]');
    if (!input) return;
    setTheme(input.value);
  });

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && THEMES.includes(e.newValue)) {
      applyTheme(e.newValue);
    }
  });

  applyTheme(getStoredTheme());
})();