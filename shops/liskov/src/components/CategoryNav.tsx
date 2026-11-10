import type {Category} from '../types';

type CategoryNavProps = {
    categories: Category[];
};

export default function CategoryNav({categories}: CategoryNavProps) {
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
                    <a
                        key={category.id}
                        href={`#${category.slug}`}
                        className='categories-items'
                    >
                        <span
                            className='category-icon'
                            style={{backgroundColor: category.color}}
                            aria-hidden='true'
                        >
                            {category.emoji}
                        </span>
                        {category.name}
                    </a>
                ))}
            </div>
        </section>
    );
}
