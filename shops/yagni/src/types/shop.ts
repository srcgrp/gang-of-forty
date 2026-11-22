export type Schedule = { days: string; time: string };
export type MenuItem = { label: string; href: string };
export type HelpItem = { label: string; href: string };
export type Shop = {
  readonly name: string;
  readonly slogan: string;
  readonly owner: string;
  readonly city: string;
  readonly phone: string;
  readonly hours: Readonly<{ open: string; close: string }>;
  readonly deliveryFee: number;
  readonly freeDeliveryOver: number;
  readonly currency: string;
  readonly notice: string;
  readonly about: string;
  readonly address: string;
  readonly schedule: readonly Schedule[];
  menu: MenuItem[];
  help: HelpItem[];
  readonly copyright: string;
};
export type ShopData = {
  shop: Shop;
  categories: Array<{ id: number; slug: string; name: string; emoji: string; color: string }>;
};
