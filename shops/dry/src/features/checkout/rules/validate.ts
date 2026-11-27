export const FIELDS = ['name', 'mobile', 'address'] as const
export type Field = (typeof FIELDS)[number]
export type CheckoutValues = Record<Field, string>
export type CheckoutErrors = Partial<Record<Field, string>>

export const LABELS: Record<Field, string> = {
  name: 'نام',
  mobile: 'موبایل',
  address: 'نشانی',
}

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {}
  if (values.name.trim().length < 3) errors.name = 'نام باید حداقل ۳ حرف باشد.'
  if (!/^09\d{9}$/.test(values.mobile.trim())) errors.mobile = 'موبایل باید مثل 09123456789 باشد.'
  if (values.address.trim().length < 10) errors.address = 'نشانی باید حداقل ۱۰ حرف باشد.'
  return errors
}