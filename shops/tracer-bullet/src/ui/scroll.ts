export function scrollToHash(): void {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}