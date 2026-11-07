import type { CartLine, Category, Offer, Product, StockData } from "../types";
import { CategorySlider } from "./CategorySlider";

interface Props {
  products: Product[];
  categories: Category[];
  cart: CartLine[];
  offers: Offer[];
  stock: StockData;
  onAdd: (p: Product) => void;
}

export function CategorySections({
  products,
  categories,
  cart,
  offers,
  stock,
  onAdd,
}: Props) {
  return (
    <div className="category-sections">
      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.categoryId === cat.id);
        if (catProducts.length === 0) return null;

        return (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            className="products-section"
            style={{ position: "relative" }}
            aria-labelledby={`cat-title-${cat.id}`}
          >
            {cat.slug && (
              <span
                id={cat.slug}
                className="section-anchor"
                aria-hidden="true"
              />
            )}
            <div className="products-section__head">
              <h2 id={`cat-title-${cat.id}`} className="section-head__title">
                <span aria-hidden="true">{cat.emoji || "📦"}</span> {cat.name}
              </h2>
              <span className="section-head__count">
                {catProducts.length.toLocaleString("fa-IR")} محصول
              </span>
            </div>
            <CategorySlider
              products={catProducts}
              cart={cart}
              offers={offers}
              stock={stock}
              onAdd={onAdd}
            />
          </section>
        );
      })}
    </div>
  );
}
