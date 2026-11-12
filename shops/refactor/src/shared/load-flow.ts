import type { LoadDeps } from '../types';

export const createLoadFlow = (deps: LoadDeps): (() => Promise<void>) => {
  let controller: AbortController | undefined;
  return async (): Promise<void> => {
    controller?.abort();
    const current = new AbortController();
    controller = current;
    deps.show({ status: 'loading' });
    try {
      const data = await deps.load(current.signal);
      if (controller !== current) return;
      deps.show({ status: data.products.length ? 'success' : 'empty', data });
    } catch (error: unknown) {
      if (controller !== current) return;
      const message = deps.explain(error, current.signal.aborted);
      current.abort();
      deps.show({ status: 'error', message });
    }
  };
};