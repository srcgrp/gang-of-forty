import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  offers: Offer[];
  stock: StockData;
}

export function CategorySlider({ products, offers, stock }: Props) {
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));
  const visible = products.slice(0, 6);

  return (
    <Swiper
      modules={[FreeMode]}
      slidesPerView="auto"
      spaceBetween={16}
      freeMode={{ enabled: true, sticky: false, momentumBounce: false }}
      dir="rtl"
      className="category-slider"
    >
      {visible.map((p) => (
        <SwiperSlide key={p.id} className="category-slider__slide">
          <ProductCard
            product={p}
            stock={stock.items[p.id]}
            discountPercent={offerMap.get(p.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
