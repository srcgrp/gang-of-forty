import { Notyf } from "notyf";
import "notyf/notyf.min.css"

const notyf = new Notyf();

export function showCartToast(name: string): void {
    notyf.success(`${name} به سبد خرید اضافه شد`);
}