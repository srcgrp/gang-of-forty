import { memo, useCallback, useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import { useHomeFilters } from "../../hooks/useHomeFilters";
import LoadStatus from "../LoadStatus";
import ShopView from "../ShopView";

function HomePage() {
  const state = useCatalog();
  const { categoryId, query, onPick } = useHomeFilters();
  const [saleOpen, setSaleOpen] = useState(false);
  const toggleSale = useCallback(() => setSaleOpen(open => !open), []);
  if (state.status !== "success") {
    return <main id="main" className="wrap" tabIndex={-1}><h1>بت‌شاپ</h1>
      <LoadStatus state={state} onRetry={state.retry} /></main>;
  }
  return <ShopView data={state.data} categoryId={categoryId} query={query}
    saleOpen={saleOpen} onToggleSale={toggleSale} onPick={onPick} />;
}

export default memo(HomePage);
