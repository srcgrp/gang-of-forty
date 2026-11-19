import {Outlet} from '@tanstack/react-router';

import {buildContext} from '../catalog/context';
import {filterProducts} from '../catalog/filter-products';
import {useAppContext} from '../context/useAppContext';
import {useThemeStore} from '../hooks/useThemeStore';
import Footer from './Footer';
import Header from './Header';
import LoadStateView from './LoadStateView';

export default function Layout() {
    const {loadState, retry, query, onQuery, onPickCategory} = useAppContext();

    const theme = useThemeStore((state) => state.theme);

    if (loadState.status !== 'success') {
        return <LoadStateView loadState={loadState} onRetry={retry} />;
    }

    const {data} = loadState;
    const context = buildContext(data);
    const searchResults = filterProducts(data.products, null, query);

    return (
        <div className='app' data-theme={theme}>
            <a className='skip-link' href='#main'>
                پرش به محتوای اصلی
            </a>

            <Header
                shop={data.shop}
                categories={data.categories}
                query={query}
                onQuery={onQuery}
                onPickCategory={onPickCategory}
                products={data.products}
                searchResults={searchResults}
                stockById={context.stockById}
                offerByProductId={context.offerByProductId}
                categoryById={context.categoryById}
            />

            <Outlet />

            <Footer data={data} />
        </div>
    );
}
