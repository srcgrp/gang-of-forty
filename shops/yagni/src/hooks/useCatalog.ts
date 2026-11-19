import { useEffect, useState } from "react";
import { fetchSuggestions } from "../api/products";
import { fetchShop } from "../api/shop";
import { fetchHome } from "../api/home";
import type { Catalog, LoadState } from "../types";

const ERROR_MESSAGE =
  "دریافت اطلاعات فروشگاه با خطا مواجه شد. لطفاً دوباره تلاش کنید.";

export function useCatalog(attempt = 0): LoadState<Catalog> {
  const [state, setState] = useState<LoadState<Catalog>>({
    status: "loading",
  });

  useEffect(() => {
    let ignore = false;

    setState({ status: "loading" });

    Promise.all([fetchSuggestions(), fetchShop(), fetchHome()])
      .then(([suggestions, shopData, home]) => {
        if (ignore) return;

        const catalog: Catalog = {
          products: suggestions.products,
          offers: suggestions.offers,
          stock: suggestions.stock,
          categories: shopData.categories,
          shop: shopData.shop,
          home,
          carousels: home.carousels,
        };

        setState(
          catalog.products.length > 0
            ? { status: "success", data: catalog }
            : { status: "empty", data: catalog },
        );
      })
      .catch(() => {
        if (!ignore) {
          setState({ status: "error", message: ERROR_MESSAGE });
        }
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  return state;
}
