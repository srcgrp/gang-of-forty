import type { Hero, HeroSlide } from "../types";

export function createHeroSlides(hero: Hero): HeroSlide[] {
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