import type { CheckoutErrors, CheckoutField, CheckoutFormValues } from "../../types";

const FIELD_ORDER: CheckoutField[] = ["name", "mobile", "address"];
const MIN_NAME_LENGTH = 3;
const MIN_ADDRESS_LENGTH = 10;
const MOBILE_PATTERN = /^09\d{9}$/;
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function validateCheckout(form: CheckoutFormValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (form.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = "نام را کامل وارد کنید (حداقل ۳ حرف).";
  }
  if (!MOBILE_PATTERN.test(toEnglishDigits(form.mobile.trim()))) {
    errors.mobile = "شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود.";
  }
  if (form.address.trim().length < MIN_ADDRESS_LENGTH) {
    errors.address = "نشانی را کامل‌تر وارد کنید (حداقل ۱۰ حرف).";
  }
  return errors;
}

export function firstInvalidField(
  errors: CheckoutErrors,
): CheckoutField | undefined {
  return FIELD_ORDER.find((field) => errors[field] !== undefined);
}

function toEnglishDigits(text: string): string {
  return text.replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)));
}
