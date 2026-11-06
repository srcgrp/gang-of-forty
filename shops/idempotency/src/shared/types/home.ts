export type Hero = {
  title: string;
  text: string;
  cta: {
    label: string;
    href: string;
  };
};

export type HeroSlide = Hero & {
  image: string;
};

export type HomeCarousel = {
  id: string;
  title: string;
  source?: string;
  categoryId?: number;
};

export type Promo = {
  href: string;
  text: string;
};

export type Home = {
  hero: Hero;
  side: Hero;
  promos: Promo[];
  carousels: HomeCarousel[];
};