import { getAndShowCategories, getAndShowSubMenus } from './funcs/categorys.js';
import { getAndShowAllProducts, getAndShowHeroBanner, getndShowFooterInfos, updateSearchPlaceholders, initAddToCart } from './funcs/products.js'

window.addEventListener('load', () => {
    getAndShowCategories();
    getAndShowAllProducts();
    getAndShowSubMenus()
    getAndShowHeroBanner()
    getndShowFooterInfos()
    updateSearchPlaceholders()
    initAddToCart()

});