import type { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export function CategoryNav({ categories, selectedId, onSelect }: CategoryNavProps) {
  return (
    <nav className="cat-grid" style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <button 
        className={`cat-card ${selectedId === null ? 'active' : ''}`} 
        onClick={() => onSelect(null)}
      >
        همه
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`cat-card ${selectedId === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="cat-emoji">{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </nav>
  );
}