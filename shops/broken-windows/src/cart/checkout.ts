import type { CheckoutErrors, CheckoutField, CheckoutForm } from "../types.ts";

const FIELD_ORDER: CheckoutField[] = ["name", "phone", "address"];

export function toLatinDigits(text: string): string {
    return text
        .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
        .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
    const errors: CheckoutErrors = {};
    if (form.name.trim().length < 3) {
        errors.name = "نام و نام خانوادگی را وارد کنید.";
    }
    if (!/^09\d{9}$/.test(toLatinDigits(form.phone.trim()))) {
        errors.phone = "شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود.";
    }
    if (form.address.trim().length < 10) {
        errors.address = "نشانی را کامل‌تر بنویس.";
    }
    return errors;
}

export function firstErrorField(errors: CheckoutErrors): CheckoutField | null {
    return FIELD_ORDER.find((field) => errors[field] !== undefined) ?? null;
}