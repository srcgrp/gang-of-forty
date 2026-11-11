import type { LoadState } from '../types.ts';
import type { AddHandler } from './card.ts';
import { showEmpty, showError, showLoading, showProducts } from './states.ts';

export type Handlers = { onAdd: AddHandler; onRetry: () => void };

function assertNever(value: never): never {
    throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

export function render(state: LoadState, handlers: Handlers): void {
    switch (state.status) {
        case 'loading':
            showLoading();
            break;
        case 'success':
            showProducts(state.products, handlers.onAdd);
            break;
        case 'empty':
            showEmpty();
            break;
        case 'error':
            showError(state.message, handlers.onRetry);
            break;
        default:
            assertNever(state);
    }
}