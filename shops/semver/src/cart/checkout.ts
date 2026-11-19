export const checkoutFields = [
  { key: "name", label: "نام", type: "text", autoComplete: "name" },
  { key: "mobile", label: "موبایل", type: "tel", autoComplete: "tel" },
  { key: "address", label: "آدرس", type: "text", autoComplete: "street-address" },
] as const;

export type CheckoutField = (typeof checkoutFields)[number]["key"];
export type CheckoutValues = Record<CheckoutField, string>;

export function checkoutErrors(values: CheckoutValues): CheckoutValues {
  const mobile = values.mobile
    .replace(/[۰-۹٠-٩]/g, (digit) => String(digit.charCodeAt(0) % 16))
    .replace(/[\s-]/g, "");

  return {
    name: values.name.trim() ? "" : "نام را وارد کنید.",
    mobile: /^(?:0|\+98)9\d{9}$/.test(mobile) ? "" : "شمارهٔ موبایل معتبر وارد کنید.",
    address: values.address.trim() ? "" : "آدرس را وارد کنید.",
  };
}
