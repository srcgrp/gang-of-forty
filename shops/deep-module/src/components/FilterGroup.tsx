interface FilterOption<T extends string | number> {
  value: T;
  label: string;
}

interface FilterGroupProps<T extends string | number> {
  title: string;
  options: FilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
}

export function FilterGroup<T extends string | number>({
  title,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  return (
    <div className="filter-group">
      <h3 className="filter-group__title">{title}</h3>
      <div className="filter-chips">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            className={`filter-chip ${selected === opt.value ? "filter-chip--active" : ""}`}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
