import { useCatalog } from "./hooks/useCatalog.ts";
import Status from "./components/Status.tsx";
import ShopPage from "./components/ShopPage.tsx";

export default function App() {
  const state = useCatalog();

  if (state.status !== "success") {
    return <Status state={state} />;
  }

  return <ShopPage data={state.data} />;
}