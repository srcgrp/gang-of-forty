import type { Banner } from "../types"
import { isLink } from "./isLink"

export function isBanner(value: unknown): value is Banner {
    if (typeof value !== "object" || value === null) {
        return false
    }

    return (
        "title" in value &&
        typeof value.title === "string" &&
        "text" in value &&
        typeof value.text === "string" &&
        "emoji" in value &&
        typeof value.emoji === "string" &&
        "cta" in value &&
        isLink(value.cta)
    )
}