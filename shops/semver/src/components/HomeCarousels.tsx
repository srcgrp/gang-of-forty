import { stateForProducts } from "../catalog/product-state";
import type { Category, Home, LoadState } from "../types";
import ProductGrid from "./ProductGrid";
import SaleCountdown from "./SaleCountdown";

type HomeCarouselsProps = {
  home: Home | null;
  categories: Category[];
  state: LoadState;
  onAdd: (id: number) => void;
  variant: "offers" | "other";
};

export default function HomeCarousels({ home, categories, state, onAdd, variant }: HomeCarouselsProps) {
  const productViews = state.status === "success" ? state.products : [];
  const slugs = new Set(categories.map((category) => category.slug));

  return (
    <div id={variant === "offers" ? "carousels" : undefined}>
      {home?.carousels
        .filter((carousel) => (carousel.source === "offers") === (variant === "offers"))
        .map((carousel) => {
        const items = carousel.source === "offers"
          ? productViews.filter((view) => view.offer !== undefined)
          : productViews.filter(({ product }) => product.categoryId === carousel.categoryId);
        const id = slugs.has(carousel.id) ? `carousel-${carousel.id}` : carousel.id;
        return (
          <section key={carousel.id}>
            <h2 className="section-title" id={id}>
              {carousel.emoji} {carousel.title}
              {carousel.source === "offers" && <SaleCountdown />}
            </h2>
            <ProductGrid state={stateForProducts(state, items)} onAdd={onAdd} />
          </section>
        );
      })}
    </div>
  );
}
