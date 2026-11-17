import { useCatalog } from "./hooks/useCatalog";
import Page from "./components/Page";
import Layout from "./components/Layout";

export default function App() {
  const { state, retry } = useCatalog();

  return (
    <Layout>
      <Page state={state} onRetry={retry} />
    </Layout>
  );
}
