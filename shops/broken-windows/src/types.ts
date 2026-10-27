export type LoadState =
    | { status: "loading" }
    | {
          status: "success";
          products: Product[];
          offers: Offer[];
          stock: StockData;
          categories: Category[];
          shop: Shop;
      }


    | { status: "empty" }
    | { status: "error"; message: string };

export type LoadedState = Extract<LoadState, { status: "success" }>;


export type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};
export type Category = {
    id: number;
    name: string;
    emoji: string;
    slug: string;
    color: string;
};
export type Offer = {
    productId: number;
    percent: number;
    label: string;
};
export type StockData = {
    items: Record<number, number>;
};
export type MenuEntry = {
    label: string;
    href: string;
};
export type Shop = {
    notice: string;
    slogan: string;
    phone: string;
    address: string;
    about: string;
    menu: MenuEntry[];
};
export type CartItem = {
    productId: Product["id"];
    qty: number;
};

export type CartLine = Pick<Product, "id" | "name" | "emoji" | "unit" | "price"> & {
    qty: number;
}; 
export const VIEW_ALL_LABELS = ["مشاهده همه", "بازگشت به ابتدا"] as const;
export type ViewAllLabel = (typeof VIEW_ALL_LABELS)[number];