import type { Categories, LoadState, ProductCardData } from "../../types";
import ProductGrid from "../ProductGrid";
import CatalogError from "./CatalogError";
import CatalogLoading from "./CatalogLoading";

interface CatalogViewProps {
  state: LoadState;
  categories: Categories;
  cards: ProductCardData[];
  onAdd: (id: number) => void;
  onRetry: () => void;
}

export default function CatalogView({ state, categories, cards, onAdd, onRetry }: CatalogViewProps) {
  switch (state.status) {
    case "loading": return <CatalogLoading />;
    case "success": return (
      <>
        <ProductGrid id="offers" title="پیشنهاد ویژه امروز" emoji="🔥"
          products={cards.filter((card) => card.discountPercent !== undefined)} onAdd={onAdd} />
        {categories.map((category) => (
          <ProductGrid key={category.id} id={category.slug} title={category.name}
            emoji={category.emoji}
            products={cards.filter((card) => card.product.categoryId === category.id)}
            onAdd={onAdd} />
        ))}
      </>
    );
    case "empty": return <p className="product-empty" role="status">در حال حاضر محصولی برای نمایش وجود ندارد.</p>;
    case "error": return <CatalogError message={state.message} onRetry={onRetry} />;
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
}
