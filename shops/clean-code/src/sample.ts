import type { Category, Offer, Product } from "./types/product.ts";

export const SAMPLE: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "شیر",
    emoji: "🥛",
    unit: "لیتر",
    price: 50000,
    tags: [],
  },
  {
    id: 2,
    categoryId: 1,
    name: "ماست",
    emoji: "🥣",
    unit: "کیلو",
    price: 80000,
    tags: [],
  },
  {
    id: 3,
    categoryId: 2,
    name: "نان",
    emoji: "🍞",
    unit: "عدد",
    price: 20000,
    tags: [],
  },
];

export const SAMPLE_STOCK: Record<number, number> = {
  1: 5,
  2: 0,
  3: 12,
};

export const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, slug: "dairy", name: "لبنیات", emoji: "🥛", color: "#fff" },
  { id: 2, slug: "bakery", name: "نانوایی", emoji: "🍞", color: "#fff" },
];

export const SAMPLE_OFFERS: Offer[] = [
  { productId: 1, percent: 20, label: "پیشنهاد روز" },
  { productId: 3, percent: 10, label: "تخفیف نان" },
];

export const SAMPLE_MENU: { label: string; href: string }[] = [
  { label: "دسته‌ها", href: "#categories" },
  { label: "سبد خرید", href: "#cart" },
  { label: "تماس", href: "#contact" },
];

export const SAMPLE_HELP: { label: string; href: string }[] = [
  { label: "روش ارسال", href: "#contact" },
  { label: "تماس با فروشگاه", href: "#contact" },
];
