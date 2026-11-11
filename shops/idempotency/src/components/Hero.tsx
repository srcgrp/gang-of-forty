import { useEffect, useMemo, useState } from "react";
import type { Hero as HomeHero } from "../shared/types/home";
import { createHeroSlides } from "../shared/ui/hero/slides";

type Props = {
  hero: HomeHero | null;
};

export default function Hero({ hero }: Props) {
  const slides = useMemo(() => (hero ? createHeroSlides(hero) : []), [hero]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index] ?? slides[0];

  return (
    <section
      className={`hero${slide?.image.endsWith("/bg4.webp") ? " hero-slide-three" : ""}`}
      aria-labelledby="hero-title"
      style={slide ? { backgroundImage: `url("${slide.image}")` } : undefined}
    >
      <img
        className="hero-ornament"
        src="./asset/banners/border.webp"
        alt=""
        aria-hidden="true"
      />

      <div className="hero-content">
        <h1 id="hero-title">{slide?.title ?? "تازگی، هر روز در خانه شما"}</h1>

        <p>
          {slide?.text ?? "انتخابی تازه از محصولات روزمره با حال‌وهوای ایرانی."}
        </p>

        <a className="hero-button" href={slide?.cta.href ?? "#products"}>
          {slide?.cta.label ?? "مشاهده محصولات فروشگاه"}
        </a>
      </div>

      <img
        className="hero-ornament hero-ornament-bottom"
        src="./asset/banners/border.webp"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
