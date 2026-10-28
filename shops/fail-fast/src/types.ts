// =============================================================================
// Core Domain Types — Based on actual JSON API responses
// =============================================================================

/**
 * Represents a product in the catalog.
 * Source: /api/products.json
 */
export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji: string;
  tags?: string[];
}

/**
 * Represents a discount offer for a specific product.
 * Source: /api/offers.json
 */
export interface Offer {
  productId: number;
  percent: number;
  label?: string;
}

/**
 * Represents stock/inventory data.
 * Source: /api/stock.json
 */
export interface Stock {
  updatedAt?: string;
  items: Record<string, number>;
}

/**
 * Represents a product category.
 * Source: /api/categories.json
 */
export interface Category {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

/**
 * Represents shop configuration and metadata.
 * Source: /api/shop.json
 */
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

// =============================================================================
// Derived Types — For application use
// =============================================================================

/**
 * A product combined with its offer and stock information.
 * Used for displaying daily offers with discount pricing.
 */
export interface OfferProduct extends Product {
  percent: number;
  quantity: number;
  discountedPrice: number;
}

/**
 * Represents a line item in the shopping cart.
 * (Future implementation — currently only cartCount is used)
 */
export interface CartLine {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Utility type: Pick specific fields from Product for price calculations.
 * Useful when only id and price are needed (e.g., in cart totals).
 * 
 * Example usage:
 *   const priceInfo: ProductPrice = { id: 201, price: 38000 };
 */
export type ProductPrice = Pick<Product, "id" | "price">;

/**
 * Utility type: Make Shop configuration read-only.
 * Prevents accidental mutation of shop data after loading.
 * 
 * Example usage:
 *   const shopConfig: Readonly<Shop> = await fetchShop();
 *   shopConfig.name = "New Name"; // Error: cannot assign
 */
export type ShopConfig = Readonly<Shop>;

// =============================================================================
// Constants with `as const` and Derived Types
// =============================================================================

/**
 * Valid notification types supported by the application.
 * Used with Notyf notification library.
 */
export const NOTIFICATION_TYPES = ["success", "error", "warning"] as const;

/**
 * Union type derived from NOTIFICATION_TYPES array.
 * Ensures type safety when specifying notification type.
 */
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

/**
 * Category IDs for filtering products.
 * Based on actual categories in /api/categories.json
 */
export const CATEGORY_IDS = {
  FRUITS: 1,
  DAIRY: 2,
  BAKERY: 3,
  PANTRY: 4,
  DRINKS: 5,
  PROTEIN: 6,
  SNACKS: 7,
} as const;

/**
 * Type for category ID values.
 * Useful for type-safe category filtering.
 */
export type CategoryId = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS];
