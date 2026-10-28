import { createProductSearch } from "./catalog/product-search";
import { getDataLoadState } from "./catalog/data-load-state";
import { prepareCarousels } from "./catalog/carousel-cards";
import { readCartCount, saveCartCount } from "./storage/cart-count-storage";
import { addOneToCart } from "./cart/cart-count";
import { loadData } from "./api/load-data";
import { renderLoadState } from "./ui/load-state-view";
import { createSearchResultsList, attachSearchListeners, renderSearchPlaceholder } from "./ui/search";
import { renderCartCount } from "./ui/cart";
import { handleCartClick } from "./ui/cart-click";
import { showCartToast } from "./ui/toast";
import { scrollToHash } from "./ui/scroll";
import { getPageElements } from "./ui/page-elements";
import { renderPage } from "./ui/render-page";
import { renderCarouselList } from "./ui/carousel-list";

let cartCount = readCartCount();

async function init(): Promise<void> {
    const elements = getPageElements();
    const { categoryList, carouselsContainer, searchInput } = elements;
    const resultsList = createSearchResultsList(searchInput);
    const searchForm = searchInput.closest<HTMLFormElement>("form");
    if (!searchForm) throw new Error("search form is missing");

    carouselsContainer.addEventListener("click", (event: MouseEvent) => {
        handleCartClick(event, carouselsContainer, name => {
            cartCount = addOneToCart(cartCount);
            saveCartCount(cartCount);
            renderCartCount(cartCount);
            showCartToast(name);
        });
    });

    renderLoadState({ status: "loading" }, categoryList, carouselsContainer);

    try {
        const loadedData = await loadData();
        const state = getDataLoadState(loadedData);
        renderLoadState(state, categoryList, carouselsContainer);
        if (state.status !== "success") return;

        const data = state.data;
        renderCartCount(cartCount);
        renderCarouselList(carouselsContainer, prepareCarousels(data));
        renderPage(elements, data);
        scrollToHash();

        const searchProducts = createProductSearch(data.products);
        attachSearchListeners(
            searchInput,
            searchForm,
            query => searchProducts(query).map(result => result.name),
            resultsList
        );
        renderSearchPlaceholder(searchInput, data.products.length);
    } catch (error: unknown) {
        console.error(error);
        renderLoadState({
            status: "error",
            message: "بارگذاری فروشگاه ناموفق بود. لطفاً صفحه را دوباره بارگذاری کنید."
        }, categoryList, carouselsContainer);
    }
}

init();