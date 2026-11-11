import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import { addItem, removeItem, totalPrice } from "./cart/cart";
import {
  fetchCategories,
  fetchHome,
  fetchOffers,
  fetchProducts,
  fetchShop,
  fetchStock,
} from "./api/shop-api";
import { countCartItems } from "./ui/cart-badge";
import type {
  CartLine,
  Category,
  Home,
  LoadState,
  Offer,
  ProductView,
  Shop,
} from "./types";

type StoreData = {
  categories: Category[];
  home: Home;
  shop: Shop;
};

const stateForProducts = (
  state: LoadState,
  products: ProductView[],
): LoadState => {
  if (state.status !== "success") return state;
  return products.length > 0
    ? { status: "success", products }
    : { status: "empty" };
};

export default function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [store, setStore] = useState<StoreData | null>(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      fetchProducts(),
      fetchOffers(),
      fetchStock(),
      fetchCategories(),
      fetchShop(),
      fetchHome(),
    ])
      .then(([products, offers, stock, categories, shop, home]) => {
        const offerByProduct = new Map<number, Offer>();
        offers.forEach((offer) => offerByProduct.set(offer.productId, offer));

        const productViews: ProductView[] = products.map((product) => {
          const offer = offerByProduct.get(product.id);
          const quantity = stock.items[String(product.id)];

          return {
            product,
            ...(offer ? { offer } : {}),
            ...(quantity !== undefined ? { stock: quantity } : {}),
          };
        });

        if (ignore) return;
        setStore({ categories, home, shop });

        if (ignore) return;
        setLoadState(
          productViews.length > 0
            ? { status: "success", products: productViews }
            : { status: "empty" },
        );
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setLoadState({
          status: "error",
          message: error instanceof Error ? error.message : "خطای نامشخص",
        });
      });

    return () => {
      ignore = true;
    };
  }, []);

  const productViews =
    loadState.status === "success" ? loadState.products : [];
  const products = productViews.map(({ product }) => product);
  const latestProducts = [...productViews]
    .sort((a, b) => b.product.id - a.product.id)
    .slice(0, 8);
  const visibleLatestProducts =
    categoryId === null
      ? latestProducts
      : latestProducts.filter(
          ({ product }) => product.categoryId === categoryId,
        );
  const latestState = stateForProducts(loadState, visibleLatestProducts);
  const categories = store?.categories ?? [];
  const cartCount = countCartItems(cart);
  const cartTotal = totalPrice(cart, products);

  const handleAdd = (productId: number): void => {
    setCart((currentCart) => addItem(currentCart, productId));
  };

  const handleRemove = (productId: number): void => {
    setCart((currentCart) => removeItem(currentCart, productId));
  };

  const categorySlugs = new Set(categories.map((category) => category.slug));

  return (
    <>
      <Header
        cartCount={cartCount}
        cartOpen={cartOpen}
        onCartClick={() => setCartOpen((isOpen) => !isOpen)}
        cart={cart}
        products={products}
        cartTotal={cartTotal}
        onCartRemove={handleRemove}
        categories={categories}
        activeCategoryId={categoryId}
        onCategoryPick={setCategoryId}
        shop={store?.shop ?? null}
        home={store?.home ?? null}
      />
      <main>
        <h2 id="categories" className="section-title">
          دسته‌بندی‌ها
        </h2>
        <article className="flex-item-categories">
          {categories.map((category) => (
            <a
              className="item"
              href={`#${category.slug}`}
              aria-label={`رفتن به دسته ${category.name}`}
              key={category.id}
            >
              <span className="category-emoji">{category.emoji}</span>
              <p>{category.name}</p>
            </a>
          ))}
        </article>

        <article id="category-shelves">
          {categories.map((category) => {
            const categoryProducts = productViews.filter(
              ({ product }) => product.categoryId === category.id,
            );

            return (
              <section
                className="category-shelf"
                id={category.slug}
                key={category.id}
              >
                <h2 className="section-title">
                  {category.emoji} {category.name}
                </h2>
                <ProductGrid
                  state={stateForProducts(loadState, categoryProducts)}
                  onAdd={handleAdd}
                />
              </section>
            );
          })}
        </article>

        <div id="carousels">
          {store?.home.carousels.map((carousel) => {
            const carouselProducts =
              carousel.source === "offers"
                ? productViews.filter((view) => view.offer !== undefined)
                : productViews.filter(
                    ({ product }) =>
                      product.categoryId === carousel.categoryId,
                  );
            const carouselId = categorySlugs.has(carousel.id)
              ? `carousel-${carousel.id}`
              : carousel.id;

            return (
              <section key={carousel.id}>
                <h2 className="section-title" id={carouselId}>
                  {carousel.emoji} {carousel.title}
                </h2>
                <ProductGrid
                  state={stateForProducts(loadState, carouselProducts)}
                  onAdd={handleAdd}
                />
              </section>
            );
          })}
        </div>

        <article className="feature-container" id="promos">
          {store?.home.promos.map((promo, index) => (
            <a
              className="promo-card"
              href={promo.href}
              style={{ backgroundColor: promo.color }}
              key={`${promo.href}-${index}`}
            >
              <span className="promo-emoji">{promo.emoji}</span>
              <span className="promo-text">{promo.text}</span>
            </a>
          ))}
        </article>

        <h2 id="latest-products" className="section-title">
          جدیدترین‌ها
        </h2>
        <ProductGrid state={latestState} onAdd={handleAdd} id="latest-carousel" />
      </main>
      <Footer shop={store?.shop ?? null} categories={categories} />
    </>
  );
}
