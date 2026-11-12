import type { Category } from '../types';
type CategoryNavProps = {
    categories: Category[];
    selected: number | null;
    onPick: (id: number | null) => void;
};
export default function CategoryNav({ categories, selected, onPick }: CategoryNavProps) {
    return <section id="categories" className="categories" aria-labelledby="categories-title">
        <h2 id="categories-title">چه چیزی لازم داری؟</h2>
        <div id="category-filters" className="category-list">
            <button type="button" aria-pressed={selected === null} onClick={() => onPick(null)}>همه</button>
            {categories.map(category => <button type="button" key={category.id}
                aria-pressed={selected === category.id} onClick={() => onPick(category.id)}>
                <span aria-hidden="true">{category.emoji}</span>{category.name}
            </button>)}
        </div>
    </section>;
}
