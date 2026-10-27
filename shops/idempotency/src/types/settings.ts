export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const PRODUCT_FILTERS = ["all", "offers"] as const;
export type ProductFilter = (typeof PRODUCT_FILTERS)[number];