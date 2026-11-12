export function createAddButton(name: string, unavailable: boolean): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.className = "add-button";
    button.textContent = "+";
    button.dataset.name = name;
    if (unavailable) {
        button.disabled = true;
        button.setAttribute("aria-label", name + " ناموجود است");
    } else {
        button.setAttribute("aria-label", "افزودن " + name + " به سبد خرید");
    }
    return button;
}

export function clickedProductName(target: EventTarget | null): string | undefined {
    if (!(target instanceof Element)) return undefined;
    const button: HTMLButtonElement | null = target.closest<HTMLButtonElement>(".add-button");
    if (!button || button.disabled) return undefined;
    return button.dataset.name ?? "کالا";
}