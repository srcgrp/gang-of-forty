import type { Home, HomeSlide } from "../types";
export function renderHome(data: Home): void {
  const banner = document.querySelector<HTMLElement>("#banner");
  const track = banner?.querySelector<HTMLElement>(".banner__track");
  if (track) {
    const fragment = document.createDocumentFragment();
    const slides: HomeSlide[] = [data.hero, data.side];
    slides.forEach((slide) => fragment.append(createSlide(slide, false)));
    slides.forEach((slide) => fragment.append(createSlide(slide, true)));
    track.replaceChildren(fragment);
  }
  data.promos.forEach((promo, index) => {
    const target = document.querySelector<HTMLElement>(
      `#advertisement-${index + 1}`,
    );
    if (!target) return;
    const link = document.createElement("a");
    link.href = promo.href;
    link.style.backgroundColor = promo.color;
    const emoji = document.createElement("span");
    emoji.className = "advertisement__emoji";
    emoji.textContent = promo.emoji;
    emoji.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.className = "advertisement__text";
    text.textContent = promo.text;
    link.append(emoji, text);
    target.replaceChildren(link);
  });
}
function createSlide(slide: HomeSlide, duplicate: boolean): HTMLAnchorElement {
  const link = document.createElement("a");
  link.className = "banner__slide";
  link.href = slide.cta.href;
  if (duplicate) link.setAttribute("aria-hidden", "true");
  const emoji = document.createElement("span");
  emoji.className = "banner__slide-emoji";
  emoji.textContent = slide.emoji;
  emoji.setAttribute("aria-hidden", "true");
  const content = document.createElement("div");
  content.className = "banner__slide-content";
  const title = document.createElement("h2");
  title.className = "banner__slide-title";
  title.textContent = slide.title;
  const text = document.createElement("p");
  text.className = "banner__slide-text";
  text.textContent = slide.text;
  const cta = document.createElement("span");
  cta.className = "banner__slide-cta";
  cta.textContent = slide.cta.label;
  content.append(title, text, cta);
  link.append(emoji, content);
  return link;
}
