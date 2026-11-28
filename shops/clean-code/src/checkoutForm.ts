export type CheckoutForm = { name: string; mobile: string; address: string };

export function getCheckoutErrors(form: CheckoutForm) {
  return {
    name: form.name.trim() === "" ? "نام را وارد کنید" : "",
    mobile: /^\d{10,11}$/.test(form.mobile.trim()) ? "" : "موبایل معتبر نیست",
    address: form.address.trim() === "" ? "نشانی را وارد کنید" : "",
  };
}
