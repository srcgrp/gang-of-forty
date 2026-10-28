import { notyf } from '../../../shared/ui/toast';
import { fireConfetti } from '../../../shared/ui/confetti';

export function showCartFeedback(name: string, before: number, after: number, isMaxStock = false): void {
  if (isMaxStock) {
    notyf.error(`بیشتر از موجودی انبار ${name} نمی‌توانید اضافه کنید.`);
    return;
  }
  if (after > before) {
    notyf.success(`${name} به سبد اضافه شد`);
    void fireConfetti();
  } else if (after < before) {
    notyf.error(`${name} از سبد حذف شد`);
  }
}