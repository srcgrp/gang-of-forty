import { useCatalog } from "../../hooks/useCatalog.ts";
import Catalog from "../catalog/Catalog.tsx";
import Page from "../Page.tsx";

export default function HomePage() {
  const { state, retry } = useCatalog();

  return (
    <Page state={state} onRetry={retry}>
      {(data) => <Catalog data={data} />}
    </Page>
  );
}
