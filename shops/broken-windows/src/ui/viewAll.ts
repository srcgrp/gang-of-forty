import { VIEW_ALL_LABELS } from "../types.ts";
import type { ViewAllLabel } from "../types.ts";
import { getEl } from "./dom.ts";

const [LABEL_MORE, LABEL_BACK] = VIEW_ALL_LABELS;

function setupCarousel(link: HTMLAnchorElement, article: HTMLElement): void {
    const items: HTMLDivElement = getEl<HTMLDivElement>(".special-offer-items", article);
    const label: HTMLSpanElement = getEl<HTMLSpanElement>("span", link);
    const isRtl: boolean = getComputedStyle(items).direction === "rtl";

    const atEnd = (): boolean =>
        Math.abs(items.scrollLeft) + items.clientWidth >= items.scrollWidth - 2;

    link.addEventListener("click", (event: MouseEvent): void => {
        event.preventDefault();
        if (atEnd()) {
            items.scrollTo({ left: 0, behavior: "smooth" });
            return;
        }
        const gap: number = parseFloat(getComputedStyle(items).columnGap) || 0;
        const page: number = items.clientWidth + gap;
        items.scrollBy({ left: isRtl ? -page : page, behavior: "smooth" });
    });

    items.addEventListener(
        "scroll",
        (): void => {
            const next: ViewAllLabel = atEnd() ? LABEL_BACK : LABEL_MORE;
            label.textContent = next;
        },
        { passive: true }
    );
}

export function setupViewAll(): void {
    document.querySelectorAll<HTMLAnchorElement>(".items-header-link").forEach((link: HTMLAnchorElement): void => {
        const article: HTMLElement | null = link.closest("article");
        if (article) {
            setupCarousel(link, article);
        }
    });
}