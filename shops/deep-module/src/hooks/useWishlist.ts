import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "../shared/ui/toast";

const KEY = "wishlist";

function read(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => typeof id === "number");
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<number[]>(read);

  // ✅ idsRef برای تصمیم‌گیری در callbackهای stable
  const idsRef = useRef(ids);
  useEffect(() => {
    idsRef.current = ids;
  }, [ids]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const add = useCallback((id: number, name: string): void => {
    if (idsRef.current.includes(id)) return;
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    toast.success(`${name} به علاقه‌مندی‌ها اضافه شد ❤️`);
  }, []);

  const remove = useCallback((id: number): void => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggle = useCallback((id: number, name: string): void => {
    const has = idsRef.current.includes(id);
    setIds((prev) => (has ? prev.filter((x) => x !== id) : [...prev, id]));
    toast.success(
      has
        ? `${name} از علاقه‌مندی‌ها حذف شد`
        : `${name} به علاقه‌مندی‌ها اضافه شد ❤️`,
    );
  }, []);

  const clear = useCallback((): void => setIds([]), []);

  return { ids, add, remove, toggle, clear };
}
