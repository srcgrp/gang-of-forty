import { useEffect, useMemo, useState } from "react";
import type {
  Categories,
  Home,
  LoadState,
  Offers,
  ProductCardData,
  Shop,
  Stock,
} from "./types";
import { fetchSuggestions } from "./api/products";
import { fetchShop } from "./api/shop";
import { fetchHome } from "./api/home";
import { countCartItems } from "./cart/cart-logic";
import { toCard, visibleProducts } from "./catalog/catalog-logic";
import Storefront from "./components/Storefront";
import { useThemeStore } from "./hooks/useThemeStore";
import { useCartStore } from "./hooks/useCartStore";

export default function App() {
  const [categories, setCategories] = useState<Categories>([]);
  const [offers, setOffers] = useState<Offers>([]);
  const [stock, setStock] = useState<Stock>({ updatedAt: "", items: {} });
  const [home, setHome] = useState<Home | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const theme = useThemeStore((s) => s.theme);
  const cartCount = useCartStore((s) => countCartItems(s.lines));

  useEffect(() => {
    let ignore = false;
    Promise.all([fetchSuggestions(), fetchShop(), fetchHome()])
      .then(([suggestions, shopData, homeData]) => {
        if (!ignore) setCategories(shopData.categories);
        if (!ignore) setShop(shopData.shop);
        if (!ignore) setOffers(suggestions.offers);
        if (!ignore) setStock(suggestions.stock);
        if (!ignore) setHome(homeData);
        if (!ignore)
          setLoadState(
            suggestions.products.length
              ? { status: "success", products: suggestions.products }
              : { status: "empty" },
          );
      })
      .catch(() => {
        if (!ignore)
          setLoadState({
            status: "error",
            message:
              "دریافت اطلاعات فروشگاه با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
          });
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  useEffect(() => {
    document.title = `${shop?.name ?? "مینا"} · 🛒 ${cartCount.toLocaleString("fa-IR")}`;
  }, [cartCount, shop]);

  const products = loadState.status === "success" ? loadState.products : [];
  const cards: ProductCardData[] = useMemo(
    () =>
      visibleProducts(products, searchQuery).map((product) =>
        toCard(product, offers, stock.items),
      ),
    [products, searchQuery, offers, stock.items],
  );
  const handleRetry = () => {
    setLoadState({ status: "loading" });
    setAttempt((value) => value + 1);
  };

  return (
    <div className="app" data-theme={theme}>
      <Storefront
        categories={categories}
        home={home}
        shop={shop}
        loadState={loadState}
        cards={cards}
        searchQuery={searchQuery}
        selectedCategoryId={categoryId}
        isCartOpen={isCartOpen}
        isCountdownVisible={isCountdownVisible}
        onSearch={setSearchQuery}
        onPickCategory={setCategoryId}
        onRetry={handleRetry}
        onOpenCart={() => setIsCartOpen(true)}
        onCloseCart={() => setIsCartOpen(false)}
        onToggleCountdown={() => setIsCountdownVisible((visible) => !visible)}
      />
    </div>
  );
}
