import type { CartLine } from './types';

export type CartControls = {
  lines: readonly CartLine[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};