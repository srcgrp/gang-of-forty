export type HomeSlide = {
  emoji: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
};
export type Promo = {
  href: string;
  color: string;
  emoji: string;
  text: string;
};
export type HomeCarousel = {
  id: string;
  title: string;
  emoji: string;
  source?: "offers";
  categoryId?: number;
};
export type Home = {
  hero: HomeSlide;
  side: HomeSlide;
  promos: Promo[];
  carousels: HomeCarousel[];
};
