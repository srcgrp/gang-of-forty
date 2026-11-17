import { useState } from "react";
import { useStoreData } from "./features/products/hooks/useStoreData";
import StorePage from "./components/StorePage";
import { useThemeStore } from "./hooks/useThemeStore";
export default function App() {
  const theme = useThemeStore((state) => state.theme);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { loadState, storeData, retry } = useStoreData();

  return (
    <div className="app-shell" data-theme={theme}>
      <StorePage
        data={storeData}
        loadState={loadState}
        onRetry={retry}
        categoryId={categoryId}
        query={query}
        onQuery={setQuery}
        onPickCategory={setCategoryId}
      />
    </div>
  );
}
