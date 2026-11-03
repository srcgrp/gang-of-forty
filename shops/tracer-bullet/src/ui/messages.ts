export function showMessage(carousel: HTMLElement, text: string): void {
    carousel.replaceChildren();

    const li: HTMLLIElement = document.createElement("li");
    li.textContent = text;
    li.classList.add("message");

    carousel.append(li);
}

export function showBlockMessage(
    container: HTMLElement,
    text: string
): void {
    container.replaceChildren();

    const p: HTMLParagraphElement = document.createElement("p");
    p.textContent = text;
    p.classList.add("message");

    container.append(p);
}