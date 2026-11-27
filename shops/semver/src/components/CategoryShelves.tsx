import { Fragment, type ReactNode } from "react";
import { CAROUSEL_PREVIEW_LIMIT, categoryProducts } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { Catalog, Category, ProductLoadState } from "../types";
import CarouselLink from "./CarouselLink";
import ProductGrid from "./ProductGrid";

type CategoryShelvesProps = {
  catalog: Catalog | null;
  categories: Category[];
  state: ProductLoadState;
  afterSection: (index: number) => ReactNode;
};

export default function CategoryShelves({ catalog, categories, state, afterSection }: CategoryShelvesProps) {
  const productViews = catalog?.products ?? [];

  return (
    <article id="category-shelves">
      {categories.map((category, index) => {
        const items = categoryProducts(productViews, category.id).slice(0, CAROUSEL_PREVIEW_LIMIT);
        return (
          <Fragment key={category.id}>
            <section className="category-shelf" id={category.slug}>
              <h2 className="section-title carousel-title">
                <span>{category.emoji} {category.name}</span>
                <CarouselLink carouselId={category.slug} title={category.name} />
              </h2>
              <ProductGrid state={stateForProducts(state, items)} />
            </section>
            {afterSection(index)}
          </Fragment>
        );
      })}
    </article>
  );
}
