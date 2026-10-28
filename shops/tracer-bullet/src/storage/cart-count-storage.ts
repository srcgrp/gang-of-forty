const CART_COUNT_KEY = "tracer-bullet:cartCount";
export function readCartCount(): number{
    const savedValue = localStorage.getItem(CART_COUNT_KEY);
    if (savedValue === null){
        return 0;
    }
    const count = Number(savedValue);
    if (!Number.isInteger(count) || count < 0){
        return 0;
    }
    return count;
}
export function saveCartCount(count: number): void {
    localStorage.setItem(CART_COUNT_KEY, String(count));
}