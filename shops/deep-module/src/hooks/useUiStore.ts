import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  wishlistOpen: boolean;
  userOpen: boolean;
  drawerOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setUserOpen: (open: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  cartOpen: false,
  wishlistOpen: false,
  userOpen: false,
  drawerOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setWishlistOpen: (wishlistOpen) => set({ wishlistOpen }),
  setUserOpen: (userOpen) => set({ userOpen }),
  setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
}));
