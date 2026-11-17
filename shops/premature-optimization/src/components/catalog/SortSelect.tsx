import type { Sort } from "../../scripts/types";
import {
  SORTS,
  SORT_LABELS,
  isSort,
} from "../../scripts/logic/catalog/sort-products.ts";

type SortSelectProps = { value: Sort; onChange: (sort: Sort) => void };

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="sort-control">
      <span className="sort-control-label">مرتب‌سازی:</span>
      <span className="sort-select-wrap">
        <select
          className="sort-select"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            if (isSort(next)) onChange(next);
          }}
        >
          {SORTS.map((sort) => (
            <option key={sort} value={sort}>
              {SORT_LABELS[sort]}
            </option>
          ))}
        </select>
        <span className="sort-arrow" aria-hidden="true">
          ˅
        </span>
      </span>
    </label>
  );
}
