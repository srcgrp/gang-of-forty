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
    component: PlpPage,
});

const routeTree = rootRoute.addChildren([homeRoute, plpRoute]);

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

        document.title = `سوپرمارکت شایان (${itemCount})`;
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
