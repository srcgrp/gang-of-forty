import { loadShopData } from "./api/loadShop.ts";
import { buildPageView } from "./catalog/pageView.ts";
import type { LoadState } from "./types.ts";
import { clickedProductName } from "./ui/addButton.ts";
import { celebrateAdd } from "./ui/notify.ts";
import { findPageElements } from "./ui/page.ts";
import type { PageElements } from "./ui/page.ts";
import { renderPage } from "./ui/renderPage.ts";
import { scrollToHash } from "./ui/scroll.ts";
import { showStatus } from "./ui/status.ts";
import { setupViewAll } from "./ui/viewAll.ts";

const els: PageElements = findPageElements();
let state: LoadState = { status: "loading" };

function assertNever(x: never): never {
    throw new Error("حالتی رندر نشده: " + JSON.stringify(x));
}

function render(current: LoadState): void {
    switch (current.status) {
        case "loading":
            showStatus(els, "در حال بارگذاری...");
            break;
        case "empty":
            showStatus(els, "فعلاً محصولی نداریم.");
            break;
        case "error":
            console.error("خطا در بارگذاری:", current.message);
            showStatus(
                els,
                "متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.",
                "متأسفیم، دسته‌بندی‌ها بارگذاری نشدند."
            );
            break;
        case "success":
            renderPage(buildPageView(current), els);
            scrollToHash();
            break;
        default:
            assertNever(current);
    }
}

function setState(next: LoadState): void {
    state = next;
    render(state);
}

async function start(): Promise<void> {
    setState({ status: "loading" });
    setState(await loadShopData());
}

document.addEventListener("click", (event: MouseEvent): void => {
    const name: string | undefined = clickedProductName(event.target);
    if (name !== undefined) {
        celebrateAdd(name);
    }
});

setupViewAll();
void start();