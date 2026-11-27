import { useCallback, useId, type ReactNode } from 'react';
import { useCardSlots } from '../hooks/useCardSlots';
import type { ProductItem } from '../types';

export default function ProductPurchase({ item, children }: { item: ProductItem; children: ReactNode }) {
  const key = useId();
  const mount = useCardSlots((s) => s.mount);
  const unmount = useCardSlots((s) => s.unmount);
  const register = useCallback((target: HTMLDivElement | null) => {
    if (target === null) return;
    mount({ key, item, target });
    return () => unmount(key);
  }, [key, item, mount, unmount]);
  return <>{children}<div className="quantity-target" ref={register} /></>;
}
