import { useEffect, useState } from "react"
import type { LoadState } from "../types"
import { loadShopData, getLoadErrorMessage } from "../api/loadShopData"

export function useCatalog() {
    const [state, setState] = useState<LoadState>({ status: "loading" })
    const [attempt, setAttempt] = useState(0)

    useEffect(function () {
        let ignore = false

        function showSlowConnection(message: string): void {
            if (!ignore) {
                setState({ status: "loading", message })
            }
        }

        loadShopData(showSlowConnection)
            .then(function (data) {
                if (!ignore) {
                    setState(data.products.length > 0
                        ? { status: "success", data }
                        : { status: "empty" })
                }
            })
            .catch(function (error: unknown) {
                if (!ignore) {
                    setState({ status: "error", message: getLoadErrorMessage(error) })
                }
            })

        return function () {
            ignore = true
        }
    }, [attempt])

    function retry(): void {
        setState({ status: "loading" })
        setAttempt((previousAttempt) => previousAttempt + 1)
    }

    return { state, retry }
}