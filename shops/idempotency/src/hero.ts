
import type { Hero } from "./types";

function createHeroSlides(hero: Hero) {
  return [
    {
      ...hero,
      image: "/asset/banners/bg1.webp",
    },
    {
      ...hero,
      title: "صبحی خوش‌طعم با تازه‌خانه",
      text: "از نان تازه تا لبنیات و خوراکی‌های خوشمزه، همه برای یک صبحانه دلچسب.",
      cta: {
        label: "خرید محصولات صبحانه",
        href: "#dairy",
      },
      image: "/asset/banners/bg3.webp",
    },
    {
      ...hero,
      title: "طراوت با نوشیدنی های تازه‌خانه",
      text: "از تازگی طبیعت تا سفره خانه شما، هر روز همراه لحظه‌های خوش.",
      cta: {
        label: "کشف محصولات تازه",
        href: "#drinks",
      },
      image: "/asset/banners/bg4.webp",
    },
  ];
}

function renderHero(hero: Hero) {
  const title = document.querySelector("#hero-title");
  const text = document.querySelector("#hero-text");
  const cta = document.querySelector<HTMLAnchorElement>("#hero-cta");

  if (!title || !text || !cta) {
    throw new Error("Required hero elements are missing from the DOM.");
  }

  title.textContent = hero.title;
  text.textContent = hero.text;
  cta.textContent = hero.cta.label;
  cta.href = hero.cta.href;
}

function showHeroSlide(slide: Hero & { image: string }) {
  const heroSection = document.querySelector<HTMLElement>(".hero");

  if (!heroSection) {
    throw new Error("Hero section is missing from the DOM.");
  }

  renderHero(slide);

  heroSection.classList.toggle(
    "hero-slide-three",
    slide.image === "/asset/banners/bg4.webp"
  );

  heroSection.style.backgroundImage = `url("${slide.image}")`;
}

export function startHeroSlider(hero: Hero) {
  const slides = createHeroSlides(hero);
  let currentIndex = 0;

  showHeroSlide(slides[currentIndex]);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showHeroSlide(slides[currentIndex]);
  }, 5000);
}
