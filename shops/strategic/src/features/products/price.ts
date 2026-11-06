/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */


export const finalPrice = (price: number, percent: number): number => Math.round(price * (100 - percent) / 100);
export const validPercent = (percent: number | undefined): number =>
  percent !== undefined && Number.isFinite(percent) && percent >= 0 && percent <= 100 ? percent : 0;
export const inStock = (stock: number): boolean => stock > 0;