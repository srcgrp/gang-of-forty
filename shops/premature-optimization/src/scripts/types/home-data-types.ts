export interface CallToAction {
  label: string;
  href: string;
}
export interface BannerData {
  title: string;
  text: string;
  name?: string;
  emoji: string;
  cta?: CallToAction;
}
export interface Promo {
  text: string;
  href: string;
  name?: string;
  emoji: string;
}
export interface CarouselConfig {
  id: string;
  title: string;
  emoji?: string | null;
  source?: string;
  categoryId?: number | null;
  category?: { id: number };
}
export interface Home {
  hero?: BannerData | null;
  side?: BannerData | null;
  promos?: Promo[];
  carousels?: CarouselConfig[];
}
