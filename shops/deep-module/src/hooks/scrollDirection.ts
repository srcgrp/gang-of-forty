export interface ScrollState {
  hidden: boolean;
  anchorY: number;
}

export function nextScrollState(prev: ScrollState, y: number): ScrollState {
  if (y <= 100) return { hidden: false, anchorY: y };
  const diff = y - prev.anchorY;
  if (diff >= 10) return { hidden: true, anchorY: y };
  if (diff <= -10) return { hidden: false, anchorY: y };
  return prev;
}
