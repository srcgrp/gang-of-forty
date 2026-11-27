import { useEffect, useState } from "react";
import type { LoadState } from "../types.ts";
import { loadShopData } from "../api/loadShop.ts";

export function useCatalog(): { state: LoadState; retry: () => void } {
    const [state, setState] = useState<LoadState>({ status: "loading" });
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let ignore = false;
        loadShopData().then((result) => {
            if (ignore) return;
            setState(result);
        });
        return () => {
            ignore = true;
        };
    }, [attempt]);

    function retry() {
        setState({ status: "loading" });
        setAttempt((n) => n + 1);
    }

    return { state, retry };
}