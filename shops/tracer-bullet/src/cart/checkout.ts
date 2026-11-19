import type { CheckoutErrors, CheckoutValues } from "../types.ts";

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (values.name.trim().length === 0) errors.name = "لطفا نام را وارد کنید";
  if (!/^09\d{9}$/.test(values.mobile.trim())) errors.mobile = "این شماره معتبر نیست";
  if (values.address.trim().length < 10) errors.address = "لطفا آدرس را کامل وارد کنید";

  return errors;
}