import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useCatalog } from '../../hooks/useCatalog';
import { carouselProducts } from '../../catalog/carousels';
import { visibleProducts } from '../../catalog/filter';
import Hero from '../Hero';
import CategoryNav from '../CategoryNav';
import ProductGrid from '../ProductGrid';
import Banners from '../Banners';
import Status from '../Status';
import CartPanel from '../CartPanel';

export default function HomePage() {
    const state = useCatalog();
    const [selected, setSelected] = useState<number | null>(null);

    return <>
        <Hero />
        <Status state={state} />

        {state.status === 'success' && <>
            <CategoryNav
                categories={state.data.categories}
                selected={selected}
                onPick={setSelected}
            />

            {state.data.home.carousels.map(carousel => (
                <section key={carousel.id}>
                    <ProductGrid
                        id={carousel.id}
                        title={`${carousel.emoji} ${carousel.title}`}
                        products={carouselProducts(state.data, carousel.id) ?? []}
                        offers={state.data.offers}
                        stock={state.data.stock}
                    />

                    <Link to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
                        مشاهده همه
                    </Link>
                </section>
            ))}

            <Banners />

            <ProductGrid
                id="catalog"
                title="همه محصولات فروشگاه"
                products={visibleProducts(
                    state.data.products,
                    {
                        categoryId: selected,
                        query: '',
                        sort: 'default'
                    },
                    state.data.offers
                )}
                offers={state.data.offers}
                stock={state.data.stock}
            />

            <CartPanel
                products={state.data.products}
                offers={state.data.offers}
            />
        </>}
    </>;
}
