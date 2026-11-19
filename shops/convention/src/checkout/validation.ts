export type CheckoutValues = { name: string; phone: string; address: string }

export function normalizePhone(phone: string): string {
  return phone.replace(/[۰-۹٠-٩]/g, (digit) => {
    const code = digit.charCodeAt(0)
    return String(code >= 1776 ? code - 1776 : code - 1632)
  }).trim()
}

export function checkoutErrors(values: CheckoutValues) {
  return {
    name: values.name.trim().length < 2 ? 'نام باید دست‌کم دو حرف داشته باشد.' : '',
    phone: /^09[0-9]{9}$/.test(normalizePhone(values.phone)) ? '' : 'شماره موبایل معتبر با ۰۹ وارد کنید (۱۱ رقم).',
    address: values.address.trim().length < 10 ? 'نشانی پستی باید دست‌کم ۱۰ حرف داشته باشد.' : '',
  }
}
