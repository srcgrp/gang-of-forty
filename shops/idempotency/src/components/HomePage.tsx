import { useState } from "react";
import { useCatalog } from "../hooks/useCatalog";
import StorePage from "./StorePage";

export default function HomePage() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { loadState, catalog, retry } = useCatalog();

  return (
    <StorePage
      data={catalog}
      loadState={loadState}
      onRetry={retry}
      categoryId={categoryId}
      query={query}
      onQuery={setQuery}
      onPickCategory={setCategoryId}
    />
  );
}
