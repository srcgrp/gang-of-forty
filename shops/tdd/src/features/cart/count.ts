export function nextCartCount(count: number): number {
    return count < Number.MAX_SAFE_INTEGER ? count + 1 : count
}
