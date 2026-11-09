import {
  CART_LINES,
  CATEGORIES,
  HOME,
  SHOP,
  PRODUCTS,
  OFFERS,
  STOCK,
} from "./components/sampleData.ts";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import CategoryNav from "./components/CategoryNav.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Promos from "./components/Promo.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  function handleAdd(id: number) {
    console.log("add", id);
  }
  function handleRemove(id: number) {
    console.log("remove", id);
  }
  function handlePick(id: number) {
    console.log("pick", id);
  }

  const specialOffers = PRODUCTS.filter((p) =>
    OFFERS.some((o) => o.productId === p.id && o.label === "پیشنهاد ویژه"),
  );

  return (
    <>
      <Header
        shop={SHOP}
        categories={CATEGORIES}
        cartLines={CART_LINES}
        onRemove={handleRemove}
      />
      <main id="main-content">
        <Hero hero={HOME.hero} side={HOME.side} />
        <CategoryNav categories={CATEGORIES} onPick={handlePick} />
        <ProductGrid
          id="offers"
          title="پیشنهاد ویژه"
          products={specialOffers}
          offers={OFFERS}
          stock={STOCK}
          categories={CATEGORIES}
          onAdd={handleAdd}
        />

        <Promos promos={HOME.promos ?? []} />

        {CATEGORIES.map((category) => (
          <ProductGrid
            key={category.id}
            id={category.slug}
            title={category.name}
            products={PRODUCTS.filter((p) => p.categoryId === category.id)}
            offers={OFFERS}
            stock={STOCK}
            categories={CATEGORIES}
            onAdd={handleAdd}
          />
        ))}
      </main>
      
      <Footer shop={SHOP} categories={CATEGORIES} />
    </>
  );
}
