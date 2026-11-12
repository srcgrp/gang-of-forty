import { offerProducts } from "../features/products/offer.ts";
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
  const onOffer = offerProducts(products, offers);
  const used: Record<string, boolean> = {};
  const featured = home.carousels.map(function (item) {
    used[item.id] = true;
    const list =
      "categoryId" in item
        ? products.filter(function (p) {
            return p.categoryId === item.categoryId;
          })
        : onOffer;
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
