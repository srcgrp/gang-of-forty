import { asApiFailure } from '../api/http';
import type { ApiErrorKind, LoadState } from '../types';

export const ERROR_TEXT = {
  network: 'ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  http: 'سرور فایل مورد نیاز را پیدا نکرد یا پاسخ درستی نداد.',
  parse: 'اطلاعات دریافتی از سرور خراب است و خوانده نمی‌شود.',
  timeout: 'پاسخ سرور بیش از اندازه طول کشید. دوباره تلاش کنید.',
  shape: 'ساختار اطلاعات دریافتی با انتظار ما نمی‌خواند.',
} satisfies Record<ApiErrorKind, string>;

export function errorState(error: unknown): LoadState {
  const failure = asApiFailure(error);
  return { status: 'error', message: ERROR_TEXT[failure.kind], failure };
}