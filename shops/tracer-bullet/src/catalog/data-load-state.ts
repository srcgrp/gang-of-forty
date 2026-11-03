import type { Data, LoadState } from "../types";

type DataLoadState = Extract<LoadState, { status: "empty" | "success" }>;

export function getDataLoadState(data: Data): DataLoadState {
    if (data.products.length === 0) {
        return { status: "empty" };
    }

    return { status: "success", data };
}