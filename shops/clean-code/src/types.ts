export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};

export type Offer = {
  productId: number;
  percent: number;
  label: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};

export type Stock = {
  updatedAt: string;
  items: Record<string, number>;
};

export type Shop = {
  name: string;
  slogan: string;
  owner: string;
  city: string;
  phone: string;
  hours: {
    open: string;
    close: string;
  };
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string;
  about: string;
  address: string;
  schedule: {
    days: string;
    time: string;
  }[];
  menu: {
    label: string;
    href: string;
  }[];
  help: {
    label: string;
    href: string;
  }[];
  copyright: string;
};

export type Home = {
  hero: {
    title: string;
    text: string;
    emoji: string;
    cta: {
      label: string;
      href: string;
    };
  };
  side: {
    title: string;
    text: string;
    emoji: string;
    cta: {
      label: string;
      href: string;
    };
  };
  promos: {
    text: string;
    emoji: string;
    color: string;
    href: string;
  }[];
  carousels: Array<
    | { id: string; title: string; emoji: string; source: "offers" }
    | { id: string; title: string; emoji: string; categoryId: number }
  >;
};

export type MakeItem = (product: Product) => HTMLElement;

export type CartItem = Product & { qty: number };

export type FrozenShop = Readonly<Shop>;

export const SORTS = ["price", "name", "newest"] as const;
export type Sort = (typeof SORTS)[number];

export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };
