import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import type { Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  offers: Offer[];
  stock: StockData;
  onAdd: (p: Product) => void;
}

export function CategorySlider({ products, offers, stock, onAdd }: Props) {
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));

  return (
    <Swiper
      modules={[FreeMode, Navigation]}
      slidesPerView="auto"
      spaceBetween={16}
      freeMode={{ enabled: true, sticky: false, momentumBounce: false }}
      navigation
      dir="rtl"
      className="category-slider"
    >
      {products.map((p) => (
        <SwiperSlide key={p.id} className="category-slider__slide">
          <ProductCard
            product={p}
            stock={stock.items[p.id]}
            discountPercent={offerMap.get(p.id)}
            onAdd={() => onAdd(p)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}