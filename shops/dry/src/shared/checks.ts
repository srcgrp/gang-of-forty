export function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null && !Array.isArray(x)
}

export function isString(x:unknown): x is string {
    return typeof x=== 'string'
}

export function isNumber(x: unknown): x is number {
    return typeof x=== 'number' && Number.isFinite(x)
}