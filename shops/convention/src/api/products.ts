import type { Product } from "../types";
import { getJSON } from "./get-json";

export async function getProducts(): Promise<Product[]> {
    const data = await getJSON("products.json");

    if (!Array.isArray(data)) {
        throw new Error("Invalid products data");
    }

    const validProducts = data.filter(isProduct);

    if (validProducts.length !== data.length) {
        console.warn(
            `${data.length - validProducts.length} invalid products were ignored.`
        );
    }

    return validProducts;
}

function isProduct(value: unknown): value is Product {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const product = value as Record<string, unknown>;

    return (
        typeof product.id === "number" &&
        typeof product.categoryId === "number" &&
        typeof product.name === "string" &&
        typeof product.emoji === "string" &&
        typeof product.unit === "string" &&
        typeof product.price === "number" &&
        (
            product.tags === undefined ||
            (
                Array.isArray(product.tags) &&
                product.tags.every(
                    (tag: unknown) => typeof tag === "string"
                )
            )
        )
    );
}