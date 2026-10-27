import type { Link } from "../types"

export function isLink(value: unknown): value is Link {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "label" in value &&
        typeof value.label === "string" &&
        "href" in value &&
        typeof value.href === "string"
    )
}