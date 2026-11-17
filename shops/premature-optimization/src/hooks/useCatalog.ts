import { useCallback, useEffect, useState } from "react";
import type { LoadState } from "../scripts/types";
import { USER_MESSAGES } from "../api/api-config";
import { loadCatalog } from "../api/index-api";

const LOADING: LoadState = { status: "loading" };
const UNKNOWN_ERROR: LoadState = {
  status: "error",
  message: USER_MESSAGES.unknown,
};

export function useCatalog() {
  const [state, setState] = useState<LoadState>(LOADING);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .catch(() => UNKNOWN_ERROR)
      .then((next) => {
        if (!ignore) setState(next);
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState(LOADING);
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
