type CheckoutValues = {
  name: string
  mobile: string
  address: string
}

type CheckoutErrors = {
  name?: string
  mobile?: string
  address?: string
}

export function validateCheckout(
  values: CheckoutValues,
): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'نام و نام خانوادگی را وارد کنید.'
  }

  if (!/^09\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.'
  }

  if (values.address.trim().length < 10) {
    errors.address = 'آدرس باید حداقل ۱۰ کاراکتر باشد.'
  }

  return errors
}