import { useCountdown } from "../hooks/useCountdown";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toFa(s: string): string {
  return s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)] ?? d);
}

export function SaleCountdown() {
  const t = useCountdown();

  if (t.isExpired) {
    return (
      <div className="sale-countdown sale-countdown--expired">
        <span className="sale-countdown__label">⏰</span>
        <strong className="sale-countdown__title">حراج به پایان رسید</strong>
      </div>
    );
  }

  const cells = [
    { value: t.days, label: "روز" },
    { value: t.hours, label: "ساعت" },
    { value: t.minutes, label: "دقیقه" },
    { value: t.seconds, label: "ثانیه" },
  ];

  return (
    <div className="sale-countdown" role="timer" aria-live="off">
      <div className="sale-countdown__head">
        <span className="sale-countdown__flame" aria-hidden="true">
          🔥
        </span>
        <strong className="sale-countdown__title">حراج ویژه پایان هفته</strong>
        <span className="sale-countdown__label">فرصت محدود</span>
      </div>
      <div className="sale-countdown__timer">
        {cells.map((c) => (
          <div key={c.label} className="sale-countdown__cell">
            <span className="sale-countdown__value">{toFa(pad(c.value))}</span>
            <span className="sale-countdown__unit">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
