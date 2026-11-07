import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import type { CartLine, Offer, Product, StockData } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  cart: CartLine[];
  offers: Offer[];
  stock: StockData;
  onAdd: (p: Product) => void;
}

export function SpecialOffers({ products, cart, offers, stock, onAdd }: Props) {
  const cartMap = new Map(cart.map((i) => [i.id, i.quantity]));
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));
  const specials = products.filter((p) => offerMap.has(p.id));

  if (specials.length === 0) return null;

  return (
    <section id="special" className="carousel-section">
      <div className="carousel-section__head">
        <h2 className="section-head__title">
          <span aria-hidden="true">🔥</span> پیشنهاد ویژه امروز
        </h2>
        <a href="#all-products" className="section-head__link">
          مشاهده همه ←
        </a>
      </div>
      <Swiper
        modules={[FreeMode, Navigation]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={{ enabled: true, momentumBounce: false }}
        navigation
        dir="rtl"
        className="special-slider"
      >
        {specials.map((p) => (
          <SwiperSlide key={p.id} className="special-slider__slide">
            <ProductCard
              product={p}
              stock={stock.items[p.id]}
              discountPercent={offerMap.get(p.id)}
              cartQuantity={cartMap.get(p.id) ?? 0}
              onAdd={() => onAdd(p)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
