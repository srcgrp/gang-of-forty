import type { CardInfo, Product } from './types';
import { getData } from './api/getData';
import { loadCartCount, saveCartCount } from './storage/cart';
import { nextCartCount } from './cart/nextCartCount';
import { getCardInfo } from './catalog/cardInfo';
import { getCategoryID, filterProductsByCategoryID, filterSpecialProducts } from './catalog/filters';
import { renderStatus } from './ui/status';
import { renderCategories, renderCategoryLinks } from './ui/categories';
import { renderShop } from './ui/shop';
import { renderCarousel } from './ui/renderCarousel';
import { updateCartNumber } from './ui/updateCartNumber';
import { notifyAdded } from './ui/notifyAdded';

let cartCount: number = loadCartCount();

// Adds one product to the cart: increases cartCount, saves it,
// refreshes the counter in the header and shows a toast.
// product: the product that was added.
function addToCart(product: Product) {
    const previousCount: number = cartCount;
    cartCount = nextCartCount(cartCount);
    saveCartCount(cartCount);
    updateCartNumber(previousCount, cartCount);
    notifyAdded(product.name);
}

// Entry point: loads the data, then renders the page.
// Errors are caught here, because this is the one place that knows about the page.
async function init() {
    const containers = ["#dairy", "#special-products", ".categories"];
    try {
        containers.forEach(container => {
            renderStatus({ status: 'loading' }, container);
        });

        const { categories, products, offeredProducts, stock, shop } = await getData();

        containers.forEach(container => {
            renderStatus({ status: 'success', products }, container);
        });
        updateCartNumber(cartCount, cartCount);
        renderCategories(categories);
        renderCategoryLinks(categories);
        renderShop(shop);

        // How a card gets its info, and what happens when a card's button is clicked
        const getInfo = (product: Product): CardInfo => getCardInfo(product, offeredProducts, stock);
        const onAdd = (product: Product) => addToCart(product);

        //Get "لبنیات" products
        const categoryId = getCategoryID("لبنیات", categories);
        const dairyProducts = filterProductsByCategoryID(categoryId, products);

        //Get "پیشنهاد امروز" products
        const specialProducts = filterSpecialProducts(offeredProducts, products, stock);

        // Render the dairy and special products carousel
        renderCarousel("dairy", dairyProducts, getInfo, onAdd);
        renderCarousel("special-products", specialProducts, getInfo, onAdd);

    } catch (error) {
        const reason = error instanceof Error ? error.message : "خطای ناشناخته";
        containers.forEach(container => {
            renderStatus({ status: 'error', message: `بارگذاری اطلاعات ممکن نشد. ${reason}` }, container);
        });
        console.error(error);
    }
}

init();