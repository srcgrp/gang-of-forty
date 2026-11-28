import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { describeError } from '../api/errors';
import { loadCatalog } from '../catalog/loadCatalog';
import { toLoadState } from '../catalog/state';
import type { Catalog, LoadState } from '../types';

export const CatalogContext = createContext<LoadState<Catalog> | null>(null);

export function useCatalog(): LoadState<Catalog> {
  const state = useContext(CatalogContext);
  if (state === null) throw new Error('useCatalog requires CatalogContext');
  return state;
}

export function useCatalogLoader(): LoadState<Catalog> {
  const [state, setState] = useState<LoadState<Catalog>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((a) => a + 1);
  }, []);

  useEffect(() => {
    let ignore = false;
    loadCatalog()
      .then((catalog) => {
        if (!ignore) setState(toLoadState(catalog));
      })
      .catch((err: unknown) => {
        if (!ignore) setState({ status: 'error', message: describeError(err), retry });
      });
    return () => {
      ignore = true;
    };
  }, [attempt, retry]);

  return state;
}
