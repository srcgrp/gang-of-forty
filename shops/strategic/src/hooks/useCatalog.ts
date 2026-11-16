import { useEffect, useState } from 'react';
import type { LoadState, ShopModel } from '../types';
import { loadApiData } from '../api/load';
import { errorState } from '../api/error-state';
import { buildModel } from '../features/products/build-model';
import { useCartStore } from './useCartStore';

type CatalogState = LoadState<ShopModel> & { retry: () => void };

export function useCatalog(): CatalogState {
  const [state, setState] = useState<LoadState<ShopModel>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let ignore = false;
    useCartStore.getState().startCatalogLoad();
    loadApiData()
      .then((data) => {
        if (ignore) return;
        const catalog = buildModel(data);
        useCartStore.getState().setCatalog(catalog.items);
        setState({ status: data.products.length ? 'success' : 'empty', data: catalog });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        useCartStore.getState().failCatalogLoad();
        setState(errorState(error));
      });
    return () => { ignore = true; };
  }, [attempt]);
  function retry() {
    setState({ status: 'loading' });
    setAttempt((previous) => previous + 1);
  }
  return { ...state, retry };
}
