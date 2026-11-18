import ShopView from "./components/ShopView.tsx";
import Status from "./components/Status.tsx";
import { useCatalog } from "./hooks/useCatalog.ts";
import { useThemeStore } from "./hooks/useThemeStore";

export default function App() {
  const theme = useThemeStore((s) => s.theme);
  const { load, retry } = useCatalog();

  if (load.status !== "success") {
    return (
      <div className="app" data-theme={theme}>
        <Status state={load} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="app" data-theme={theme}>
      <ShopView load={load} />
    </div>
  );
}
