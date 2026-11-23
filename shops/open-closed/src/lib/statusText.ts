import type { LoadState } from '../types.ts';

function assertNever(value: never): never {
    throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

export function statusText(state: LoadState, shownCount: number): string {
    switch (state.status) {
        case 'loading':
            return 'در حال بارگذاری محصولات…';
        case 'empty':
            return 'فعلاً محصولی در دسترس نیست.';
        case 'error':
            return state.message;
        case 'success':
            return shownCount === 0 ? 'فعلاً محصولی در این دسته نیست.' : '';
        default:
            return assertNever(state);
    }
}
