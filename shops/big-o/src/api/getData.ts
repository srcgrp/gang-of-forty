import { isCategory, isProduct, isOffer, isShop, isStock } from './guards';

// Filtering the iput data by their guards and return the filtered data and the number of rejected data
export function keepValidData<Type>(inputArray: unknown , guard: (x: unknown) => x is Type): Type[]  {
    if (!Array.isArray(inputArray)) {
    return [];
    }
    const validItems = inputArray.filter(guard);
    const rejectedCount = inputArray.length - validItems.length;
    if (rejectedCount > 0) {
        console.warn(`${rejectedCount} invalid items were removed.`)
    }
    return validItems;
}


// Fetches one JSON file and returns its parsed data.
// Throws if the request fails or the response is not ok (e.g. 404),
// so the caller can show an error message.
// path: path to the JSON file.
export async function getJSON(path: string): Promise<unknown> {
    const res = await fetch(path);

    if (!res.ok) {
        throw new Error(`فایل ${path.split('/').at(-1)} بارگذاری نشد (کد ${res.status})`);
    }
    try {
        return await res.json();
    } catch {
        throw new Error(`فایل ${path.split('/').at(-1)} معتبر نیست`);
    }
}


// Loads categories, products, offers and stock in parallel with Promise.all,
// so total wait time is the slowest request, not the sum.
// Returns { categories, products, offeredProducts, stock, shop }.
// Any failure is rethrown to the caller.
export async function getData() {
    const [rawCategories, rawProducts, rawOfferedProducts, stock, shop] = await Promise.all([
        getJSON('../../api/categories.json'),
        getJSON('../../api/products.json'),
        getJSON('../../api/offers.json'),
        getJSON('../../api/stock.json'),
        getJSON('../../api/shop.json')]);
    const categories = keepValidData(rawCategories,isCategory);
    const products = keepValidData(rawProducts, isProduct);
    const offeredProducts = keepValidData(rawOfferedProducts, isOffer);
    if (!isShop(shop)) { throw new Error("اطلاعات فروشگاه معتبر نیست.") }
    if (!isStock(stock)) { throw new Error("اطلاعات موجودی معتبر نیست.") }   
    return { categories, products, offeredProducts, stock, shop };
}