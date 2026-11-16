import { useEffect, useState } from "react";
import type { LoadState } from "./scripts/types";
import { USER_MESSAGES } from "./api/api-config.ts";
import { loadCatalog } from "./api/index-api.ts";
import { readQuery, writeQuery } from "./scripts/storage/query-url.ts";
import Page from "./components/Page.tsx";
import Layout from "./components/Layout.tsx";

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [query, setQuery] = useState(readQuery);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((next) => {
        if (ignore) return;
        setState(next);
      })
      .catch(() => {
        if (ignore) return;
        setState({ status: "error", message: USER_MESSAGES.unknown });
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  useEffect(() => writeQuery(query), [query]);

  const handleRetry = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  return (
    <Layout>
      <Page
        state={state}
        categoryId={categoryId}
        query={query}
        onPick={setCategoryId}
        onQuery={setQuery}
        onRetry={handleRetry}
      />
    </Layout>
  );
}
