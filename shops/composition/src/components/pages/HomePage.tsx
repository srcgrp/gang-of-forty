import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useHomeFilters } from "../../hooks/useHomeFilters";
import LoadStatus from "../LoadStatus";
import ShopView from "../ShopView";

export default function HomePage() {
  const state = useCatalog();
  const { categoryId, query, onPick } = useHomeFilters();
  const [saleOpen, setSaleOpen] = useState(false);
  if (state.status !== "success") {
    return <main id="main" className="wrap" tabIndex={-1}><h1>بت‌شاپ</h1>
      <LoadStatus state={state} onRetry={state.retry} /></main>;
  }
  return <ShopView data={state.data} categoryId={categoryId} query={query}
    saleOpen={saleOpen} onToggleSale={() => setSaleOpen(open => !open)} onPick={onPick} />;
}
