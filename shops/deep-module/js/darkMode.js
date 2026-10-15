const THEME_BTN_SELECTOR = "#theme-btn";
const ICON_SELECTOR = ".theme-btn__icon";

// آیکون خورشید (برای نمایش در حالت دارک — تا کاربر بتونه به لایت سوییچ کنه)
const SVG_SUN = `
<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
     viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="4"></circle>
  <path d="M12 2v2"></path>
  <path d="M12 20v2"></path>
  <path d="m4.93 4.93 1.41 1.41"></path>
  <path d="m17.66 17.66 1.41 1.41"></path>
  <path d="M2 12h2"></path>
  <path d="M20 12h2"></path>
  <path d="m6.34 17.66-1.41 1.41"></path>
  <path d="m19.07 4.93-1.41 1.41"></path>
</svg>`;

// آیکون ماه (برای نمایش در حالت لایت — تا کاربر بتونه به دارک سوییچ کنه)
const SVG_MOON = `
<svg class="svg_theme" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
     viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
</svg>`;

// تبدیل رشته SVG به عنصر DOM بدون innerHTML
function createSvgElement(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString.trim(), "image/svg+xml");
  return doc.documentElement;
}

function getTheme() {
  try {
    return localStorage.getItem("theme") || "auto";
  } catch {
    return "auto";
  }
}

function setTheme(theme) {
  const html = document.documentElement;
  const icon = document.querySelector(ICON_SELECTOR);

  html.classList.remove("dark-theme", "light-theme");

  let svgString = null;

  if (theme === "dark") {
    html.classList.add("dark-theme");
    svgString = SVG_SUN;
  } else if (theme === "light") {
    html.classList.add("light-theme");
    svgString = SVG_MOON;
  } else {
    // auto
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark-theme");
      svgString = SVG_SUN;
    } else {
      svgString = SVG_MOON;
    }
  }

  if (icon && svgString) {
    const svgElement = createSvgElement(svgString);
    icon.replaceChildren(svgElement);
  }

  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

// اعمال اولیه
setTheme(getTheme());

// گوش دادن به تغییرات تم سیستم برای حالت auto
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (getTheme() === "auto") {
      setTheme("auto");
    }
  });

// کلیک — با event delegation
document.addEventListener("click", (e) => {
  const btn = e.target.closest(THEME_BTN_SELECTOR);
  if (!btn) return;

  const isDark = document.documentElement.classList.contains("dark-theme");
  setTheme(isDark ? "light" : "dark");
});
