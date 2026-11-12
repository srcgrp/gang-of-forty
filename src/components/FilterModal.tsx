import type { Category } from "../types";
import type {
  DiscountFilter,
  FilterValues,
  SortFilter,
  StockFilter,
} from "../hooks/useFilters";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  filters: FilterValues;
  onChange: (patch: Partial<FilterValues>) => void;
  onReset: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  categories,
  filters,
  onChange,
  onReset,
}: FilterModalProps) {
  if (!isOpen) return null;

  const stocks: { v: StockFilter; l: string }[] = [
    { v: "all", l: "همه" },
    { v: "in", l: "موجود" },
    { v: "out", l: "ناموجود" },
  ];
  const discounts: { v: DiscountFilter; l: string }[] = [
    { v: "all", l: "همه" },
    { v: "yes", l: "دارای تخفیف" },
  ];
  const sorts: { v: SortFilter; l: string }[] = [
    { v: "default", l: "پیش‌فرض" },
    { v: "price-asc", l: "ارزان‌ترین" },
    { v: "price-desc", l: "گران‌ترین" },
    { v: "name", l: "حروف الفبا" },
  ];

  return (
    <div
      className="modal modal--open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
    >
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content modal__content--filter">
        <header className="modal__header">
          <h2 className="modal__title" id="filter-modal-title">
            <span aria-hidden="true">🎯</span> فیلتر محصولات
          </h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="بستن"
          >
            ✕
          </button>
        </header>

        <div className="modal__body">
          <div className="filter-group">
            <h3 className="filter-group__title">دسته‌بندی</h3>
            <div className="filter-chips">
              <button
                type="button"
                className={`filter-chip ${filters.categoryId === null ? "filter-chip--active" : ""}`}
                onClick={() => onChange({ categoryId: null })}
              >
                همه
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-chip ${filters.categoryId === cat.id ? "filter-chip--active" : ""}`}
                  onClick={() => onChange({ categoryId: cat.id })}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-group__title">وضعیت موجودی</h3>
            <div className="filter-chips">
              {stocks.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  className={`filter-chip ${filters.stock === s.v ? "filter-chip--active" : ""}`}
                  onClick={() => onChange({ stock: s.v })}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-group__title">تخفیف</h3>
            <div className="filter-chips">
              {discounts.map((d) => (
                <button
                  key={d.v}
                  type="button"
                  className={`filter-chip ${filters.discount === d.v ? "filter-chip--active" : ""}`}
                  onClick={() => onChange({ discount: d.v })}
                >
                  {d.l}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-group__title">مرتب‌سازی</h3>
            <div className="filter-chips">
              {sorts.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  className={`filter-chip ${filters.sort === s.v ? "filter-chip--active" : ""}`}
                  onClick={() => onChange({ sort: s.v })}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="modal__footer modal__footer--filter">
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            پاک کردن
          </button>
          <button type="button" className="btn btn--primary" onClick={onClose}>
            نمایش نتایج
          </button>
        </footer>
      </div>
    </div>
  );
}
