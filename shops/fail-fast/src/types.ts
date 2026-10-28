
export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji: string;
  tags?: string[];
}

export interface Offer {
  productId: number;
  percent: number;
  label?: string;
}

export interface Stock {
  updatedAt?: string;
  items: Record<string, number>;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Shop {
  name: string;
  slogan: string;
  owner?: string;
  city: string;
  phone: string;
  hours: {
    open: string;
    close: string;
  };
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice?: string;
  about?: string;
  address?: string;
  schedule?: Array<{
    days: string;
    time: string;
  }>;
  menu?: Array<{
    label: string;
    href: string;
  }>;
  help?: Array<{
    label: string;
    href: string;
  }>;
  copyright?: string;
}

export interface OfferProduct extends Product {
  percent: number;
  quantity: number;
  discountedPrice: number;
}


export type ProductPrice = Pick<Product, "id" | "price">;

export type ShopConfig = Readonly<Shop>;

export const NOTIFICATION_TYPES = ["success", "error", "warning"] as const;


export type NotificationType = (typeof NOTIFICATION_TYPES)[number];


export const CATEGORY_IDS = {
  FRUITS: 1,
  DAIRY: 2,
  BAKERY: 3,
  PANTRY: 4,
  DRINKS: 5,
  PROTEIN: 6,
  SNACKS: 7,
} as const;

export type CategoryId = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS];
