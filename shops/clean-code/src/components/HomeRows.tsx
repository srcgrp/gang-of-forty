import { carouselProducts } from "../catalog/carouselProducts";
import type { Category, Offer, Product } from "../types/product.ts";
import type { Home } from "../types/shop.ts";
import CarouselSection from "./CarouselSection.tsx";

type HomeRowsProps = {
  home: Home;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  stock: Record<string, number>;
  onAdd: (id: number) => void;
};

export default function HomeRows({
  home,
  categories,
  products,
  offers,
  stock,
  onAdd,
}: HomeRowsProps) {
  const catalog = { products, offers, home };
  const used: Record<string, boolean> = {};

  const featured = home.carousels.map(function (item) {
    used[item.id] = true;
    const list = carouselProducts(catalog, item.id) ?? [];
    return (
      <CarouselSection
        key={item.id}
        id={item.id}
        title={item.emoji + " " + item.title}
        products={list}
        stock={stock}
        offers={offers}
        onAdd={onAdd}
      />
    );
  });

  const more = categories
    .filter(function (cat) {
      return !used[cat.slug];
    })
    .map(function (cat) {
      const list = products.filter(function (p) {
        return p.categoryId === cat.id;
      });
      return (
        <CarouselSection
          key={cat.id}
          id={cat.slug}
          title={cat.emoji + " " + cat.name}
          products={list}
          stock={stock}
          offers={offers}
          onAdd={onAdd}
        />
      );
    });

  return (
    <>
      <div id="featured">{featured}</div>
      <div id="carousels">{more}</div>
    </>
  );
}
