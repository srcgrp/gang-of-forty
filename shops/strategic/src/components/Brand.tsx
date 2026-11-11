import Logo from './Logo';

export default function Brand() {
  return (
    <a className="logo" href="#top" aria-label="سوپرمارکت آرمین، بازگشت به بالای صفحه">
      <Logo />
      <span>
      <b>سوپرمارکت آرمین</b>
      <small>همه‌چیز برای یک خرید خوب</small>
      </span>
    </a>
  );
}