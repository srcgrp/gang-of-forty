export function TopBar({ notice }: { notice?: string | undefined }) {
  return (
    <div className="topbar" role="region" aria-label="اطلاع‌رسانی">
      <div className="topbar__inner">
        <span>{notice || "ارسال رایگان برای خرید بالای ۵۰۰ هزار تومان"}</span>
      </div>
    </div>
  );
}
