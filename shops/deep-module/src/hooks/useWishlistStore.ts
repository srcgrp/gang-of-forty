import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "../shared/ui/toast";

interface WishlistState {
  ids: number[];
  toggle: (id: number, name: string) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id, name) => {
        const has = get().ids.includes(id);
        set({
          ids: has ? get().ids.filter((x) => x !== id) : [...get().ids, id],
        });
        toast.success(
          has
            ? `${name} از علاقه‌مندی‌ها حذف شد`
            : `${name} به علاقه‌مندی‌ها اضافه شد ❤️`,
        );
      },
      remove: (id) => set({ ids: get().ids.filter((x) => x !== id) }),
      clear: () => set({ ids: [] }),
    }),
    { name: "sabzkaleh-wishlist" },
  ),
);
