import { Link } from '@tanstack/react-router';
import Logo from './Logo';

export default function Brand() {
  return (
    <Link className="logo" to="/" search={{}} aria-label="سوپرمارکت آرمین، بازگشت به صفحه اصلی">
      <Logo />
      <span>
      <b>سوپرمارکت آرمین</b>
      <small>همه‌چیز برای یک خرید خوب</small>
      </span>
    </Link>
  );
}