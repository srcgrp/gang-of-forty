export type CheckoutField = "name" | "mobile" | "address";
export type CheckoutForm = Record<CheckoutField, string>;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;
