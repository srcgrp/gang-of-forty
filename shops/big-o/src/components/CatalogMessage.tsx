import type { Catalog, LoadState } from "../types"

type CatalogMessageProps = {
  state: LoadState<Catalog>
  onRetry: () => void
}

// Shows a message for the states where there is no catalog to display yet
export default function CatalogMessage({ state, onRetry }: CatalogMessageProps) {
  switch (state.status) {
    case "loading":
      return <p className="msg load-msg">در حال بارگذاری...</p>
    case "error":
      return (
        <div className="msg error-msg" role="alert">
          <p>بارگذاری اطلاعات ممکن نشد. {state.message}</p>
          <button type="button" className="retry-button" onClick={onRetry}>تلاش دوباره</button>
        </div>
      )
    case "empty":
      return <p className="msg load-msg">محصولی یافت نشد.</p>
    case "success":
      return null
  }
}