import { CAROUSEL_PREVIEW_LIMIT, categoryProducts, configuredCategoryCarousel } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { Catalog, ProductLoadState } from "../types";
import CarouselLink from "./CarouselLink";
import ProductGrid from "./ProductGrid";

type CategoryShelvesProps = {
  catalog: Catalog | null;
  state: ProductLoadState;
};

export default function CategoryShelves({ catalog, state }: CategoryShelvesProps) {
  const categories = catalog?.categories.filter(({ id }) => !configuredCategoryCarousel(catalog, id)) ?? [];
  const productViews = catalog?.products ?? [];

  return (
    <article id="category-shelves">
      {categories.map((category) => {
        const items = categoryProducts(productViews, category.id).slice(0, CAROUSEL_PREVIEW_LIMIT);
        return (
          <section className="category-shelf" id={category.slug} key={category.id}>
            <h2 className="section-title carousel-title">
              <span>{category.emoji} {category.name}</span>
              <CarouselLink carouselId={category.slug} title={category.name} />
            </h2>
            <ProductGrid state={stateForProducts(state, items)} />
          </section>
        );
      })}
    </article>
  );
}
