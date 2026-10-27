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
  let currentIndex = 0;

  showHeroSlide(slides[currentIndex]);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showHeroSlide(slides[currentIndex]);
  }, 5000);
}