import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { CountUp } from 'countup.js';
import type {Product,CardInfo} from './types';
import { getData } from './api/getData';
import { loadCartCount, saveCartCount } from './storage/cart';
import { getCategoryID, filterProductsByCategoryID, filterSpecialProducts } from './catalog/filters';
import { renderStatus } from './ui/status';
import { getHtmlElement } from './ui/getHtmlElement';
import { renderCategories, renderCategoryLinks } from './ui/categories';
import { renderShop } from './ui/shop';
import { getCardInfo } from './catalog/cardInfo';
import { renderProducts } from './ui/renderProducts';

let cartCount: number = loadCartCount();

const notyf = new Notyf({
    position: { x: "center", y: "top" },
});

// Adds one product to the cart: shows a success toast, increases cartCount,
// saves it in localStorage and refreshes the counter in the header.
// productName: name of the product shown in the toast.
function addToCart(productName: string) {
    notyf.success(`محصول ${productName} با موفقیت به سبد خرید اضافه شد.`);
    const previousCount = cartCount;
    cartCount += 1;
    saveCartCount(cartCount);
    updateCartNumber(previousCount,cartCount);
}

// Shows the cart count in the header counter with Persian digits.
// startNumber/endNumber: the counter animates from the first to the second
// (equal numbers mean no animation). Animation is skipped if the user prefers reduced motion.
function updateCartNumber(startNumber : number ,endNumber : number) {
    const counter = getHtmlElement<HTMLElement>(".product-counter");
    const reduceMotion: boolean = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const countUp = new CountUp(counter, endNumber, {
        startVal: startNumber ,
        duration: reduceMotion ? 0 : 0.5,
        formattingFn: (n: number) => new Intl.NumberFormat('fa-IR').format(n),
    });
    countUp.start();
}

// Entry point: loads the data, then renders the carousels.
// Errors are caught here, because this is the one place that knows about the page.
async function init() {
    const containers = ["#dairy", "#special-products", ".categories"];
    try {
        containers.forEach(container => {
            renderStatus({status: 'loading'}, container)
        });

        const { categories, products, offeredProducts, stock, shop } = await getData();

        const getInfo = (product: Product): CardInfo => getCardInfo(product, offeredProducts, stock);
        const onAdd = (product: Product): void => addToCart(product.name);

        containers.forEach(container => {
            renderStatus({ status: 'success', products }, container)
        });
        updateCartNumber(cartCount,cartCount);
        renderCategories(categories);
        renderCategoryLinks(categories);
        renderShop(shop);

        //Get "لبنیات" products
        const categoryId = getCategoryID("لبنیات", categories);
        const filteredProducts = filterProductsByCategoryID(categoryId, products);

        //Get "پیشنهاد امروز" products
        const specialProducts = filterSpecialProducts(offeredProducts, products, stock);

        // Render the dairy and special products carousel
        if (filteredProducts.length === 0) {
            renderStatus({ status: 'empty' }, "#dairy");
        } 
        else {
            renderStatus({ status: 'success', products: filteredProducts }, "#dairy");
            renderProducts("dairy", filteredProducts, getInfo, onAdd);
        }
        
        if (specialProducts.length === 0) {
            renderStatus({ status: 'empty' }, "#special-products");
        } 
        else {
            renderStatus({ status: 'success', products: specialProducts }, "#special-products");
            renderProducts("special-products", specialProducts, getInfo, onAdd);
        }

    } catch (error) {
        const reason = error instanceof Error ? error.message : "خطای ناشناخته";
        containers.forEach(container => {
            renderStatus({status : 'error', message: `بارگذاری اطلاعات ممکن نشد. ${reason}`}, container)
        });
        console.error(error);
    }
}

init();
