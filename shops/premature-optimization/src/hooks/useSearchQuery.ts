import { useEffect, useState } from "react";
import { readQuery, writeQuery } from "../scripts/storage/query-url.ts";

export function useSearchQuery() {
  const [query, setQuery] = useState(readQuery);

  useEffect(() => writeQuery(query), [query]);

  return [query, setQuery] as const;
}
