import { stateForProducts } from "../catalog/product-state";
import type { Category, LoadState } from "../types";
import ProductGrid from "./ProductGrid";

type CategoryShelvesProps = {
  categories: Category[];
  state: LoadState;
  onAdd: (id: number) => void;
};

export default function CategoryShelves({ categories, state, onAdd }: CategoryShelvesProps) {
  const productViews = state.status === "success" ? state.products : [];

  return (
    <article id="category-shelves">
      {categories.map((category) => {
        const items = productViews.filter(
          ({ product }) => product.categoryId === category.id,
        );
        return (
          <section className="category-shelf" id={category.slug} key={category.id}>
            <h2 className="section-title">
              {category.emoji} {category.name}
            </h2>
            <ProductGrid state={stateForProducts(state, items)} onAdd={onAdd} />
          </section>
        );
      })}
    </article>
  );
}
