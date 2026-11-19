import {useEffect, useState} from 'react';

import {
    createHashHistory,
    createRootRoute,
    createRoute,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';

import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import PlpPage from './components/pages/PlpPage';
import ProductPage from './components/pages/ProductPage';
import {AppProvider} from './context/AppContext';
import {useCartStore} from './hooks/useCartStore';
import {useCatalog} from './hooks/useCatalog';

const rootRoute = createRootRoute({
    component: Layout,
    notFoundComponent: NotFound,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const plpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/plp/$carouselId',
    validateSearch: (
        search: Record<string, unknown>,
    ): {sort: 'default' | 'price'} => ({
        sort: search.sort === 'price' ? 'price' : 'default',
    }),
    component: PlpPage,
});

const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product/$productId',
    component: ProductPage,
});

const routeTree = rootRoute.addChildren([homeRoute, plpRoute, productRoute]);

const router = createRouter({
    routeTree,
    history: createHashHistory(),
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    const cart = useCartStore((state) => state.lines);
    const {loadState, retry} = useCatalog();

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (loadState.status !== 'success') return;

        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.title = `╪│┘ê┘╛╪▒┘à╪º╪▒┌⌐╪¬ ╪┤╪º█î╪º┘å (${itemCount})`;
    }, [cart, loadState]);

    return (
        <AppProvider
            value={{
                loadState,
                retry,
                query,
                onQuery: setQuery,
                selectedCategoryId,
                onPickCategory: setSelectedCategoryId,
            }}
        >
            <RouterProvider router={router} />
        </AppProvider>
    );
}
