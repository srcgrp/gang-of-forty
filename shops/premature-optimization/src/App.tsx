import { useCatalog } from "./hooks/useCatalog.ts";
import Page from "./components/Page.tsx";
import Layout from "./components/Layout.tsx";

export default function App() {
  const { state, retry } = useCatalog();

  return (
    <Layout>
      <Page state={state} onRetry={retry} />
    </Layout>
  );
}
