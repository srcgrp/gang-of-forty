import Fuse from "fuse.js";
import type { Product } from "../types";

export function createProductSearch(products: Product[]) {
    const fuse = new Fuse<Product>(products, {
        keys: ["name"],
        threshold: 0.3,
    });

    return (query: string): Product[] => {
        return fuse.search(query.trim()).map(result => result.item);
    };
}