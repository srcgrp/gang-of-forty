export type CheckoutValues = { name: string; mobile: string; address: string }

export function validateCheckout(values: CheckoutValues) {
    const mobile = values.mobile.trim().replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    return {
        name: values.name.trim() ? '' : 'نام را وارد کنید.',
        mobile: /^09\d{9}$/.test(mobile) ? '' : 'شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود.',
        address: values.address.trim() ? '' : 'نشانی را وارد کنید.',
    }
}
