import { Link } from "@tanstack/react-router";
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

export function SpecialOffers({ products, offers, stock }: Props) {
  const offerMap = new Map(offers.map((o) => [o.productId, o.percent]));
  const specials = products.filter((p) => offerMap.has(p.id)).slice(0, 6);

  if (specials.length === 0) return null;

  return (
    <section id="special" className="carousel-section">
      <div className="carousel-section__head">
        <h2 className="section-head__title">
          <span aria-hidden="true">🔥</span> پیشنهاد ویژه امروز
        </h2>
        <Link
          to="/plp/$carouselId"
          params={{ carouselId: "offers" }}
          search={{ sort: "default" }}
          className="section-head__link"
        >
          مشاهده همه ←
        </Link>
      </div>
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={{ enabled: true, momentumBounce: false }}
        dir="rtl"
        className="special-slider"
      >
        {specials.map((p) => (
          <SwiperSlide key={p.id} className="special-slider__slide">
            <ProductCard
              product={p}
              stock={stock.items[p.id]}
              discountPercent={offerMap.get(p.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
