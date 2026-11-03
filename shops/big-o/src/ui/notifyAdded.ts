import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({ position: { x: 'center', y: 'top' } });

// Shows a success toast after a product is added to the cart.
export function notifyAdded(productName: string): void {
  notyf.success(`محصول ${productName} با موفقیت به سبد خرید اضافه شد.`);
}