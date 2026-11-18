import type { Sort } from '../types';
import { parseSort } from '../catalog/filter';
type SortSelectProps = { value: Sort; onSort: (sort: Sort) => void };
export default function SortSelect({ value, onSort }: SortSelectProps) {
    return <div className="catalog-tools">
        <label htmlFor="sort">مرتب‌سازی محصولات</label>
        <select id="sort" value={value} onChange={event => onSort(parseSort(event.target.value))}>
            <option value="default">ترتیب اصلی</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
        </select>
    </div>;
}
