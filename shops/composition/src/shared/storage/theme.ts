export function loadTheme(): boolean {
  try { return localStorage.getItem("batshop-theme") === "dark"; }
  catch { return false; }
}
export function saveTheme(dark: boolean): void {
  try { localStorage.setItem("batshop-theme", dark ? "dark" : "light"); }
  catch { return; }
}
