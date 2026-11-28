import {AppContext} from './app-context';

import type {ReactNode} from 'react';
import type {AppContextValue} from './app-context';

type AppProviderProps = {
    value: AppContextValue;
    children: ReactNode;
};

export function AppProvider({value, children}: AppProviderProps) {
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
