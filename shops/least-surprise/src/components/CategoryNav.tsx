interface CategoryNavProps {
  readonly selectedCategory: string;
  readonly onSelectCategory: (category: string) => void;
}

interface CategoryItem {
  readonly id: string;
  readonly label: string;
}

const CATEGORIES: readonly CategoryItem[] = [
  { id: 'all', label: 'همه محصولات' },
  { id: 'dairy', label: 'لبنیات' },
  { id: 'bread', label: 'نان و شیرینی' },
];

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <nav className="category-nav" aria-label="دسته‌بندی محصولات">
      <div className="category-list">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
