import sunIcon from "../../../icons/sun.svg";
import moonIcon from "../../../icons/moon.svg";
export function applyTheme(dark: boolean): void {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) throw new Error("دکمه تغییر تم پیدا نشد.");
  const icon = document.createElement("img");
  icon.alt = "";
  icon.width = 24;
  icon.height = 24;
  icon.src = dark ? sunIcon : moonIcon;
  button.replaceChildren(icon);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  button.setAttribute("aria-label", dark ? "فعال کردن تم روشن" : "فعال کردن تم تیره");
}
export function bindTheme(onChange: () => void): void {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) throw new Error("دکمه تغییر تم پیدا نشد.");
  button.addEventListener("click", onChange);
}
