import type { Product } from "../types";
import { getJSON } from "./get-json";

export async function getProducts(
    signal?: AbortSignal
): Promise<Product[]> {
    const data = await getJSON("products.json", signal);

    if (!Array.isArray(data)) {
        throw new Error("Invalid products data");
    }

    if (!data.every(isProduct)) throw new Error("Invalid products data");
    return data;
}

function isProduct(value: unknown): value is Product {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    if (!("id" in value) || !("categoryId" in value) || !("name" in value) ||
        !("emoji" in value) || !("unit" in value) || !("price" in value)) return false;
    const product = value;

    return (
        typeof product.id === "number" &&
        typeof product.categoryId === "number" &&
        typeof product.name === "string" &&
        typeof product.emoji === "string" &&
        typeof product.unit === "string" &&
        typeof product.price === "number" &&
        (
            !("tags" in product) || product.tags === undefined ||
            (
                Array.isArray(product.tags) &&
                product.tags.every(
                    (tag: unknown) => typeof tag === "string"
                )
            )
        )
    );
}