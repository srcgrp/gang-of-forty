
import type { HeroSlide } from "../types";
import { renderHero } from "./hero/render";

function showHeroSlide(slide: HeroSlide): void {
  const heroSection = document.querySelector<HTMLElement>(".hero");

  if (!heroSection) {
    throw new Error("Hero section is missing from the DOM.");
  }

  renderHero(slide);

  heroSection.classList.toggle(
    "hero-slide-three",
    slide.image.endsWith("/bg4.webp"),
  );

  heroSection.style.backgroundImage = `url("${slide.image}")`;
}

export function startHeroSlider(slides: HeroSlide[]): void {
  const firstSlide = slides[0];

  if (!firstSlide) {
    throw new Error("Hero slider needs at least one slide.");
  }

  let currentIndex = 0;
  showHeroSlide(firstSlide);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;

    const slide = slides[currentIndex];

    if (slide) {
      showHeroSlide(slide);
    }
  }, 5000);
}
