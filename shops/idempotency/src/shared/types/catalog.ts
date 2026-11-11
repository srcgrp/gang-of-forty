export type ProductCardView = {
  id: number;
  name: string;
  unit: string;
  emoji?: string;
  imagePath?: string;
  price: number;
  discountedPrice?: number;
  offerPercent?: number;
  offerLabel?: string;
  isAvailable: boolean;
};

export type CarouselView = {
  id: string;
  title: string;
  cards: ProductCardView[];
};