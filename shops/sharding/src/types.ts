export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
  image?: string;
};

export type Offer = {
  productId: number;
  percent: number;
};

export type StockData = {
  items: Record<string, number>;
};

export type ShopLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type Shop = {
  name: string;
  slogan: string;
  phone?: string;
  phoneLink?: string;
  email?: string;
  address?: string;
  about: string;
  copyright: string;
  notice: string;
  searchPlaceholder?: string;
  topbarLinks: ShopLink[];
  menu: ShopLink[];
  help: ShopLink[];
  schedule: { days: string; time: string }[];
  labels: {
    location: string;
    account: string;
    cart: string;
    deptButton: string;
    footerTop: string;
    footerHelpTitle: string;
    footerContactTitle: string;
    footerScheduleTitle: string;
    mobileMenuTitle: string;
  };
  deptMenu?: DeptMenuItem[];
};

export type DeptMenuItem = {
  label: string;
  href: string;
  modifier: string;
  columns: {
    title: string;
    links: string[];
  }[];
  promo: {
    image: string;
    title: string;
    desc: string;
  };
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color?: string;
  image?: string;
};

export type CarouselConfig = {
  id: string;
  title: string;
  emoji?: string;
  sub?: string;
  categoryId?: number;
  source?: 'offers';
  variant?: string;
};

export type HomeBanner = {
  image?: string;
  alt?: string;
  href?: string;
  text?: string;
  emoji?: string;
  color?: string;
};

export type HomeHero = {
  title?: string;
  desc?: string;
  text?: string;
  cta?: string | { label: string; href: string };
  ctaHref?: string;
  ctaLabel?: string;
};

export type Home = {
  hero?: HomeHero;
  banners?: HomeBanner[];
  promos?: HomeBanner[];
  side?: { title?: string; text?: string; emoji?: string; cta?: { href: string } };
  carousels: CarouselConfig[];
  weeklyTitle?: string;
  categoriesTitle?: string;
};