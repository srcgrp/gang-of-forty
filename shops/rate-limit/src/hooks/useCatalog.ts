import { useCallback, useEffect, useState } from 'react';
import { describeError } from '../api/errors';
import { loadCatalog } from '../catalog/loadCatalog';
import { toLoadState } from '../catalog/state';
import type { Catalog, LoadState } from '../types';

export function useCatalog(): LoadState<Catalog> {
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
