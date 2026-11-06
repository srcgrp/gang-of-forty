/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiErrorKind } from '../types';

export const ERROR_TEXT = {
  network: 'ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  http: 'سرور فایل مورد نیاز را پیدا نکرد یا پاسخ درستی نداد.',
  parse: 'اطلاعات دریافتی از سرور خراب است و خوانده نمی‌شود.',
  timeout: 'پاسخ سرور بیش از اندازه طول کشید. دوباره تلاش کنید.',
  shape: 'ساختار اطلاعات دریافتی با انتظار ما نمی‌خواند.',
} satisfies Record<ApiErrorKind, string>;