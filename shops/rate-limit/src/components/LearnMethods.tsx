const METHODS = [
  { fa: 'پنجرهٔ ثابت', en: 'Fixed Window' },
  { fa: 'پنجرهٔ لغزان', en: 'Sliding Window' },
  { fa: 'سطل توکن', en: 'Token Bucket' },
  { fa: 'سطل نشتی', en: 'Leaky Bucket' },
];

export default function LearnMethods() {
  return (
    <div className="learn-methods">
      <span className="learn-methods-label">روش‌های رایج:</span>
      <ul className="learn-chips">
        {METHODS.map((m) => (
          <li key={m.en}>
            {m.fa} <small dir="ltr">{m.en}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}