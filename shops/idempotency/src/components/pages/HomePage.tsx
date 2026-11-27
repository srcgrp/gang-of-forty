import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { useCatalog } from "../../hooks/useCatalog";
import { scrollToHash } from "../../shared/ui/hash-links";
import StorePage from "../StorePage";

export default function HomePage() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { loadState, catalog, retry } = useCatalog();
  const hash = useLocation({ select: (location) => location.hash });

  useEffect(() => {
    if (hash && loadState.status !== "loading") scrollToHash(hash);
  }, [hash, loadState.status]);

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
