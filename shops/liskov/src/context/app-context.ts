import {createContext} from 'react';

import type {LoadState} from '../types';

export type AppContextValue = {
    loadState: LoadState;
    retry: () => void;
    query: string;
    onQuery: (value: string) => void;
    selectedCategoryId: number | null;
    onPickCategory: (id: number | null) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);
