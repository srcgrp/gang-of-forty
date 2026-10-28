export function scrollToHash(): void {
    if (!location.hash) return;
    const target: HTMLElement | null = document.getElementById(location.hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}