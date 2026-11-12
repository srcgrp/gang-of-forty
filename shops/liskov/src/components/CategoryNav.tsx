import type {Category} from '../types';

type CategoryNavProps = {
    categories: Category[];
    selectedCategoryId: number | null;
    onPick: (id: number) => void;
};

export default function CategoryNav({
    categories,
    selectedCategoryId,
    onPick,
}: CategoryNavProps) {
    return (
        <section
            id='all-categories'
            className='page-section'
            aria-labelledby='categories-title'
        >
            <h2 className='titles' id='categories-title'>
                دسته‌بندی‌ها
            </h2>
            <div className='categories'>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type='button'
                        className='categories-items'
                        aria-pressed={selectedCategoryId === category.id}
                        onClick={() => onPick(category.id)}
                    >
                        <span
                            className='category-icon'
                            style={{backgroundColor: category.color}}
                            aria-hidden='true'
                        >
                            {category.emoji}
                        </span>
                        {category.name}
                    </button>
                ))}
            </div>
        </section>
    );
}
