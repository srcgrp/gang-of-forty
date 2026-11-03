export function handleCartClick(
    event: MouseEvent,
    container: HTMLElement,
    onAdd: (name: string) => void
): void {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest<HTMLButtonElement>(
        'button[data-action="add-to-cart"]'
    );

    if (!button || !container.contains(button)) return;

    const name = button.dataset.name ?? "محصول";
    onAdd(name);
}