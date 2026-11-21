import { FetchError } from '../api/http.ts';

export function errorMessage(err: unknown): string {
    if (err instanceof TypeError) {
        return 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
    }
    if (err instanceof FetchError && err.kind === 'http') {
        return 'فهرست محصولات پیدا نشد. کمی بعد دوباره تلاش کنید.';
    }
    return 'اطلاعات محصولات درست دریافت نشد. کمی بعد دوباره تلاش کنید.';
}
