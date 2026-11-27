import { create } from 'zustand';
import type { ProductItem } from '../types';

type Slot = { key: string; target: HTMLElement; item: ProductItem };
type CardSlots = {
  slots: Slot[];
  mount: (slot: Slot) => void;
  unmount: (key: string) => void;
};

// A product may appear on several shelves. Each mounted control gets its own target.
export const useCardSlots = create<CardSlots>()((set) => ({
  slots: [],
  mount: (slot) => set((s) => ({ slots: [...s.slots, slot] })),
  unmount: (key) => set((s) => ({ slots: s.slots.filter((slot) => slot.key !== key) })),
}));
