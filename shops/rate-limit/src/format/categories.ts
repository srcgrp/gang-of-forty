import type { CategoryGroup, CategorySection } from "../types";
import { toPersianDigits } from "./price";

export const withCountText = (groups: CategoryGroup[]): CategorySection[] =>
  groups.map((group) => ({
    ...group,
    countText: `${toPersianDigits(group.items.length)} کالا`,
  }));
