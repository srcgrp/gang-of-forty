import {useContext} from 'react';

import {AppContext} from './app-context';

import type {AppContextValue} from './app-context';

export function useAppContext(): AppContextValue {
    const context = useContext(AppContext);

    if (context === null) {
        throw new Error('useAppContext must be used inside AppProvider');
    }

    return context;
}
