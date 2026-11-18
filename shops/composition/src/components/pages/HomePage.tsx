import { useState } from "react";
import { useCatalog } from "../../hooks/useCatalog";
import LoadStatus from "../LoadStatus";
import ShopView from "../ShopView";

export default function HomePage() {
  const state = useCatalog();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [saleOpen, setSaleOpen] = useState(false);
  if (state.status !== "success") {
    return <main className="wrap"><h1>بت‌شاپ</h1><LoadStatus state={state} onRetry={state.retry} /></main>;
  }
  return <ShopView data={state.data} categoryId={categoryId}
    query={query} onQuery={setQuery} saleOpen={saleOpen} onToggleSale={() => setSaleOpen(open => !open)}
    onPick={setCategoryId} />;
}
