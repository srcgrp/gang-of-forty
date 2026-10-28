export type Category = {
    id: number,
    slug: string,
    name: string,
    emoji: string
};

export type Product = { 
    id: number,
    categoryId: number,
    name: string,
    emoji: string,
    unit: string,
    price: number,
    tags: string[]
};

export type Offer = {
    productId: number,
    percent: number,
    label: string
};

export type Stock = {
    updatedAt: string,
    items: Record<string,number>
};

export type Shop = {
    name: string,
    slogan: string,
    owner: string,
    city: string,
    phone: string,
    hours: { open: string, close: string },
    deliveryFee: number,
    freeDeliveryOver: number,
    currency: string
}

// Define object for keeping inStock : Remain number of products, label: Name of offer, percent: the percentage of offer on product.
export interface CardInfo extends Partial<Pick<Offer, 'label' | 'percent'>> { inStock?: boolean }

const MESSAGE_TYPES = ['load', 'error'] as const;

export type MessageType = (typeof MESSAGE_TYPES)[number];

export type LinkItem = {
    label: string,
    href: string
};

// This type has n't used yet, the cart is a plain count for now.
export interface CartItem extends Pick<Product, 'name'|'price'|'id'> {qty: number}

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string }