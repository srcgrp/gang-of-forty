import { useState, useEffect } from "react";
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

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const toggle = (id: number, name: string): void => {
    const wasLiked = ids.includes(id);
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    if (wasLiked) toast.success(`${name} از علاقه‌مندی‌ها حذف شد`);
    else toast.success(`${name} به علاقه‌مندی‌ها اضافه شد ❤️`);
  };

  const remove = (id: number): void => {
    setIds((prev) => prev.filter((x) => x !== id));
  };

  const clear = (): void => setIds([]);

  return { ids, toggle, remove, clear };
}
