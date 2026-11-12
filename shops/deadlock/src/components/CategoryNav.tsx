const CATEGORIES = [
  { id: 1, name: "میوه و سبزی", emoji: "🍎" },
  { id: 2, name: "لبنیات", emoji: "🥛" },
  { id: 3, name: "نان و شیرینی", emoji: "🥖" },
  { id: 4, name: "خواربار", emoji: "🍚" },
  { id: 5, name: "نوشیدنی", emoji: "🧃" },
  { id: 6, name: "پروتئین", emoji: "🍗" },
  { id: 7, name: "تنقلات", emoji: "🍪" },
];

type CategoryNavProps = {
  onPick: (id: number | null) => void;
};

export default function CategoryNav({ onPick }: CategoryNavProps) {
  return (
    <section className="category" id="categories">
      <h2 className="titels">دسته‌بندی‌ها</h2>
      <div className="carousel">
        <button
          type="button"
          className="Categories"
          onClick={() => onPick(null)}
        >
          <span className="category-emoji" aria-hidden="true">🛒</span>
          <h3>همه محصولات</h3>
        </button>

        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className="Categories"
            onClick={() => onPick(category.id)}
          >
            <span className="category-emoji" aria-hidden="true">
              {category.emoji}
            </span>
            <h3>{category.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}
