import {useEffect, useState} from 'react';

import {loadData} from '../../api';

import type {LoadState} from '../types';

export function useCatalog() {
    const [attempt, setAttempt] = useState(0);
    const [loadState, setLoadState] = useState<LoadState>({
        status: 'loading',
    });

    useEffect(() => {
        let ignore = false;

        loadData()
            .then((data) => {
                if (ignore) return;

                setLoadState(
                    data.products.length === 0
                        ? {status: 'empty'}
                        : {status: 'success', data},
                );
            })
            .catch((error: unknown) => {
                if (ignore) return;

                setLoadState({
                    status: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'دریافت اطلاعات با خطا مواجه شد.',
                });
            });

        return () => {
            ignore = true;
        };
    }, [attempt]);

    const retry = (): void => {
        setLoadState({status: 'loading'});
        setAttempt((previous) => previous + 1);
    };

    return {loadState, retry};
}
