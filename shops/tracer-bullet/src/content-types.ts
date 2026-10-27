export type Link = {
  label: string;
  href: string;
};

export type ScheduleRow = {
  days: string;
  time: string;
};

export type Promo = {
  text: string;
  emoji: string;
  color: string;
  href: string;
};

export type Banner = {
  title: string;
  text: string;
  emoji: string;
  cta: Link;
};

export type Shop = {
  slogan: string;
  phone: string;
  notice: string;
  about: string;
  address: string;
  schedule: ScheduleRow[];
  menu: Link[];
  help: Link[];
};

export type OffersCarousel = {
  id: string;
  title: string;
  emoji: string;
  source: string;
};

export type CategoryCarousel = {
  id: string;
  title: string;
  emoji: string;
  categoryId: number;
};

export type Carousel = OffersCarousel | CategoryCarousel;

export type Home = {
  hero: Banner;
  side: Banner;
  promos: Promo[];
  carousels: Carousel[];
};