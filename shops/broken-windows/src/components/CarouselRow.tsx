import ProductGrid from "./ProductGrid.tsx";
import type { LoadedState } from "../types.ts";
import { carouselProducts } from "../catalog/carouselProducts.ts";
import { carouselTitle } from "../catalog/carouselTitle.ts";
import { searchProducts } from "../catalog/lookup.ts";

const PREVIEW_COUNT = 6;

type Props = { data: LoadedState; carouselId: string; query: string };

export default function CarouselRow({ data, carouselId, query }: Props) {
  const all = carouselProducts(data, carouselId);
  const title = carouselTitle(data, carouselId);
  if (all === null || title === null) return null;
  const matches = searchProducts(all, query);
  return (
    <ProductGrid
      title={title}
      id={carouselId}
      products={matches.slice(0, PREVIEW_COUNT)}
      offers={data.offers}
      stock={data.stock}
      viewAll={{ carouselId, total: matches.length }}
    />
  );
}