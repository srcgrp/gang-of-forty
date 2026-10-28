import { getProducts } from "../api/products";
import { createProductCard } from "../ui/product-card";
import { showMessage } from "../ui/messages";
import type { LoadState, Product } from "../types";

const categoryId = 2;

export async function renderProducts(
    carousel: HTMLElement
): Promise<void> {
    renderState(carousel, { status: "loading" });

    let state: LoadState<Product[]>;

    try {
        const products = await getProducts();

        const filteredProducts = products.filter(
            (product) => product.categoryId === categoryId
        );

        state = filteredProducts.length > 0
            ? { status: "success", data: filteredProducts }
            : { status: "empty" };
    } catch (error: unknown) {
        console.error("خطا در دریافت محصولات:", error);

        state = {
            status: "error",
            message: "دریافت محصولات ناموفق بود. لطفاً صفحه را دوباره بارگذاری کنید."
        };
    }

    renderState(carousel, state);
}

function renderState(
    carousel: HTMLElement,
    state: LoadState<Product[]>
): void {
    switch (state.status) {
        case "loading":
            showMessage(carousel, "در حال بارگذاری محصولات...");
            break;

        case "success": {
            const fragment = document.createDocumentFragment();

            state.data.forEach((product) => {
                fragment.append(createProductCard(product));
            });

            carousel.replaceChildren(fragment);
            break;
        }

        case "empty":
            showMessage(carousel, "محصولی در این دسته‌بندی پیدا نشد.");
            break;

        case "error":
            showMessage(carousel, state.message);
            break;

        default:
            assertNever(state);
    }
}

function assertNever(value: never): never {
    throw new Error(`وضعیت پیش‌بینی‌نشده: ${value}`);
}