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
  const add = (id: number, name: string): void => {
    setIds((prev) => {
      if (prev.includes(id)) return prev;
      toast.success(`${name} به علاقه‌مندی‌ها اضافه شد ❤️`);
      return [...prev, id];
    });
  };

  const remove = (id: number): void => {
    setIds((prev) => prev.filter((x) => x !== id));
  };

  const clear = (): void => setIds([]);

  return { ids, add, remove, clear };
}
