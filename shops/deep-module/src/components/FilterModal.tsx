import type { Category } from "../types";
import type { DiscountFilter, FilterValues, StockFilter } from "../hooks/useFilters";
import { Modal } from "./Modal";
import { FilterGroup } from "./FilterGroup";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  filters: FilterValues;
  onChange: (patch: Partial<FilterValues>) => void;
  onReset: () => void;
}

const STOCK_OPTS: { value: StockFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "in", label: "فقط موجود" },
  { value: "out", label: "ناموجود" },
];

const DISCOUNT_OPTS: { value: DiscountFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "yes", label: "فقط تخفیف‌دار" },
];

export function FilterModal({ isOpen, onClose, categories, filters, onChange, onReset }: FilterModalProps) {
  const categoryOptions = [
    { value: "all", label: "همه" },
    ...categories.map((c) => ({ value: String(c.id), label: `${c.emoji || "📦"} ${c.name}` })),
  ];
  const selectedCategory = filters.categoryId === null ? "all" : String(filters.categoryId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="filter-modal-title" contentClassName="modal__content--sheet">
      <header className="modal__header">
        <h2 className="modal__title" id="filter-modal-title">فیلتر محصولات</h2>
        <button type="button" className="modal__close" onClick={onClose} aria-label="بستن">✕</button>
      </header>
      <div className="modal__body">
        <FilterGroup
          title="دسته‌بندی"
          options={categoryOptions}
          selected={selectedCategory}
          onSelect={(val) => onChange({ categoryId: val === "all" ? null : Number(val) })}
        />
        <FilterGroup title="وضعیت موجودی" options={STOCK_OPTS} selected={filters.stock} onSelect={(stock) => onChange({ stock })} />
        <FilterGroup title="تخفیف" options={DISCOUNT_OPTS} selected={filters.discount} onSelect={(discount) => onChange({ discount })} />
      </div>
      <footer className="modal__footer modal__footer--filter">
        <button type="button" className="btn btn--ghost" onClick={onReset}>پاک کردن فیلترها</button>
        <button type="button" className="btn btn--primary" onClick={onClose}>اعمال</button>
      </footer>
    </Modal>
  );
}
