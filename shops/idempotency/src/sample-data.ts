import type {
  Product,
  Category,
  Offer,
  Stock,
} from "./shared/types/products";


export const SAMPLE: Product[] = [
  {
    id: 101,
    name: "سیب",
    categoryId: 1,
    price: 85000,
    unit: "۱ کیلوگرم",
  },
  {
    id: 201,
    name: "شیر کم‌چرب",
    categoryId: 2,
    price: 32000,
    unit: "۱ لیتر",
  },
  {
    id: 202,
    name: "پنیر",
    categoryId: 2,
    price: 85000,
    unit: "۴۰۰ گرم",
  },
  {
    id: 301,
    name: "نان سنگک",
    categoryId: 3,
    price: 15000,
    unit: "۱ عدد",
  },
];

export const SAMPLE_OFFERS: Offer[] = [
  {
    productId: 202,
    percent: 20,
    label: "پیشنهاد ویژه",
  },
];

export const SAMPLE_STOCK: Stock = {
  items: {
    101: 8,
    201: 5,
    202: 2,
    301: 0,
  },
};

export const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, name: "میوه و سبزی", slug: "fruits" },
  { id: 2, name: "لبنیات", slug: "dairy" },
  { id: 3, name: "نان و غلات", slug: "bakery" },
];