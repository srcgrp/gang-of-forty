import { categoryProducts } from "../catalog/carousel-products";
import { stateForProducts } from "../catalog/product-state";
import type { Category, ProductLoadState } from "../types";
import ProductGrid from "./ProductGrid";

type CategoryShelvesProps = {
  categories: Category[];
  state: ProductLoadState;
};

export default function CategoryShelves({ categories, state }: CategoryShelvesProps) {
  const productViews = state.status === "success" ? state.data : [];

  return (
    <article id="category-shelves">
      {categories.map((category) => {
        const items = categoryProducts(productViews, category.id);
        return (
          <section className="category-shelf" id={category.slug} key={category.id}>
            <h2 className="section-title">
              {category.emoji} {category.name}
            </h2>
            <ProductGrid state={stateForProducts(state, items)} />
          </section>
        );
      })}
    </article>
  );
}
