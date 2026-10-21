
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
    return;
  }

  title.textContent = hero.title;
  text.textContent = hero.text;
  cta.textContent = hero.cta.label;
  cta.href = hero.cta.href;
}

function showHeroSlide(slide: Hero & { image: string }) {
  renderHero(slide);

  const heroSection = document.querySelector<HTMLElement>(".hero");

  if (heroSection) {
    heroSection.classList.toggle(
      "hero-slide-three",
      slide.image === "/asset/banners/bg4.webp"
    );
  }

  if (!heroSection) {
    return;
  }

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
