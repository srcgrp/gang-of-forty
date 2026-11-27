import { Link } from "@tanstack/react-router";
import type { Category, Offer, Product, StockData } from "../types";
import { CategorySlider } from "./CategorySlider";

interface Props {
  products: Product[];
  categories: Category[];
  offers: Offer[];
  stock: StockData;
}

export function CategorySections({
  products,
  categories,
  offers,
  stock,
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
              <div className="section-head__main">
                <h2 id={`cat-title-${cat.id}`} className="section-head__title">
                  <span aria-hidden="true">{cat.emoji || "📦"}</span> {cat.name}
                </h2>
                {cat.slug && (
                  <Link
                    to="/plp/$carouselId"
                    params={{ carouselId: cat.slug }}
                    search={{ sort: "default" }}
                    className="section-head__link"
                  >
                    مشاهده همه ←
                  </Link>
                )}
              </div>
              <span className="section-head__count">
                {catProducts.length.toLocaleString("fa-IR")} محصول
              </span>
            </div>
            <CategorySlider
              products={catProducts.slice(0, 6)}
              offers={offers}
              stock={stock}
            />
          </section>
        );
      })}
    </div>
  );
}
