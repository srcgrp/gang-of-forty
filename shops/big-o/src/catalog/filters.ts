import type { Category, Product, Offer, Stock } from '../types';

// Finds a category by its name and returns its id.
// categories: array from categories.json, name: the category to look for.
// Note: find() returns undefined if nothing matches.
export function getCategoryID(name: string, categories: Category[]) {
    const categoryItem = categories.find(element => element.name === name);
    if(categoryItem === undefined) {
        throw new Error(`There isn't any category with ${name} name`);
    }
    return categoryItem.id;
    
}


// Returns only the products that belong to the given category.
// id: category id (a number), products: array from products.json.
export function filterProductsByCategoryID(id: number, products: Product[]) {
    const filteredProducts = products.filter(item => item.categoryId === id);
    return filteredProducts;
}


// Returns only the products that have a discount and are in stock.
// offers: array from offers.json, products: array from products.json,
// stock: object from stock.json (stock.items[id] is the quantity).
export function filterSpecialProducts(offers: Offer[], products: Product[], stock: Stock) {
    const specialProducts = products.filter(item => offers.some(offer => item.id === offer.productId) && (stock.items[item.id] ?? 0) > 0);
    return specialProducts;
}
