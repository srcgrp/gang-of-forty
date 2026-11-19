import type { Catalog, LoadState } from "../../types";
import { carouselProducts } from "../../catalog/catalog-logic";
import { visibleProducts } from "../../catalog/visible-products";
import ProductGrid from "../ProductGrid";
import CatalogError from "./CatalogError";
import CatalogLoading from "./CatalogLoading";

interface CatalogViewProps {
  state: LoadState<Catalog>;
  searchQuery: string;
  onRetry: () => void;
}

export default function CatalogView({
  state,
  searchQuery,
  onRetry,
}: CatalogViewProps) {
  switch (state.status) {
    case "loading":
      return <CatalogLoading />;
    case "success": {
      // Keep every category section visible, even when home.json only defines
      // the offers carousel. Configured category carousels are reused.
      const configuredCarousels = [...state.data.carousels];
      const hasOffersCarousel = configuredCarousels.some(
        (carousel) => carousel.id === "offers" || carousel.source === "offers",
      );

      if (!hasOffersCarousel) {
        configuredCarousels.unshift({
          id: "offers",
          title: "پیشنهاد ویژه امروز",
          emoji: "🔥",
          source: "offers",
        });
      }

      for (const category of state.data.categories) {
        const alreadyConfigured = configuredCarousels.some(
          (carousel) => carousel.categoryId === category.id,
        );

        if (!alreadyConfigured) {
          configuredCarousels.push({
            id: category.slug,
            title: category.name,
            emoji: category.emoji,
            categoryId: category.id,
          });
        }
      }

      return (
        <>
          {configuredCarousels.map((carousel) => {
            const products = carouselProducts(state.data, carousel.id);
            if (products === null) return null;

            const visible = new Set(
              visibleProducts(
                products.map((item) => item.product),
                searchQuery,
              ).map((product) => product.id),
            );

            return (
              <ProductGrid
                key={carousel.id}
                id={carousel.id}
                title={carousel.title}
                emoji={carousel.emoji}
                products={products.filter((item) => visible.has(item.product.id))}
                showAll
              />
            );
          })}
        </>
      );
    }
    case "empty":
      return (
        <p className="product-empty" role="status">
          در حال حاضر محصولی برای نمایش وجود ندارد.
        </p>
      );
    case "error":
      return <CatalogError message={state.message} onRetry={onRetry} />;
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
