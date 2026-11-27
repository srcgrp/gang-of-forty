export type CheckoutField = "name" | "mobile" | "address";
export type CheckoutFormValues = Record<CheckoutField, string>;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;