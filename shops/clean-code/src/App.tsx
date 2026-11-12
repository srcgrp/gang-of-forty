import Banner from "./components/Banner.tsx";
import CartPanel from "./components/CartPanel.tsx";
import CategoryNav from "./components/CategoryNav.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import {
  SAMPLE,
  SAMPLE_CATEGORIES,
  SAMPLE_HELP,
  SAMPLE_MENU,
  SAMPLE_OFFERS,
  SAMPLE_STOCK,
} from "./sample.ts";

function handlePick(id: number): void {
  console.log("pick", id);
}

function handleClear(): void {
  console.log("clear");
}

function handleAdd(id: number): void {
  console.log("add", id);
}

export default function App() {
  return (
    <>
      <Banner />
      <Header cartCount={0} menu={SAMPLE_MENU} />
      <main>
        <CategoryNav categories={SAMPLE_CATEGORIES} onPick={handlePick} />
        <ProductGrid
          products={SAMPLE}
          stock={SAMPLE_STOCK}
          offers={SAMPLE_OFFERS}
          onAdd={handleAdd}
        />
        <CartPanel onClear={handleClear} />
      </main>
      <Footer categories={SAMPLE_CATEGORIES} help={SAMPLE_HELP} />
    </>
  );
}
