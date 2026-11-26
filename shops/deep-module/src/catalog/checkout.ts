export interface CheckoutFormValues {
  name: string;
  mobile: string;
  address: string;
}

export interface CheckoutErrors {
  name?: string;
  mobile?: string;
  address?: string;
}

export function validateCheckout(values: CheckoutFormValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "نام و نام خانوادگی حداقل ۲ حرف باشد";
  }
  if (!/^09\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = "شماره موبایل معتبر ۱۱ رقمی با ۰۹ وارد کنید";
  }
  if (values.address.trim().length < 5) {
    errors.address = "آدرس کامل حداقل ۵ حرف باشد";
  }
  return errors;
}
