const POINTS = [
  { icon: '⚡', title: 'سرویس سریع می‌مونه', text: 'اگه همه یک‌دفعه هجوم بیارن، سرور کند می‌شه یا از کار می‌افته. محدودیت نرخ جلوی این فشار رو می‌گیره.' },
  { icon: '🛡️', title: 'جلوی سوءاستفاده', text: 'ربات‌ها، حدس زدن پشت‌سرهم رمز عبور و حمله‌های سنگین رو کند یا متوقف می‌کنه.' },
  { icon: '⚖️', title: 'استفادهٔ عادلانه', text: 'هیچ کاربری نمی‌تونه همهٔ منابع رو برای خودش برداره؛ نوبت به همه می‌رسه.' },
];

const METHODS = [
  { fa: 'پنجرهٔ ثابت', en: 'Fixed Window' },
  { fa: 'پنجرهٔ لغزان', en: 'Sliding Window' },
  { fa: 'سطل توکن', en: 'Token Bucket' },
  { fa: 'سطل نشتی', en: 'Leaky Bucket' },
];

const MAX_REQUESTS = 5;
const REQUESTS = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ n, blocked: n > MAX_REQUESTS }));

export default function LearnSection() {
  return (
    <section className="learn" id="rate-limit" aria-labelledby="learn-title">
      <div className="learn-intro">
        <span className="learn-eyebrow">🪐 یه تکه دانش</span>
        <h2 className="learn-title" id="learn-title">
          محدودیت نرخ (<span dir="ltr">Rate Limit</span>) یعنی چی؟
        </h2>
        <p className="learn-lead">
          یعنی مشخص می‌کنیم هر کاربر یا برنامه در یک بازهٔ زمانی، حداکثر چند درخواست می‌تونه به یک سرویس بفرسته؛ مثلاً
          ۱۰۰ درخواست در دقیقه. از اون بیشتر شد، سرویس مؤدبانه می‌گه «یه کم صبر کن».
        </p>
      </div>

      <div className="learn-body">
        <ul className="learn-points">
          {POINTS.map((p) => (
            <li className="learn-point" key={p.title}>
              <span className="learn-icon" aria-hidden="true">{p.icon}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
          <li className="learn-point">
            <span className="learn-icon" aria-hidden="true">⏳</span>
            <div>
              <h3>بعد از رد شدن چی؟</h3>
              <p>
                سرور خطای <code dir="ltr">429</code> می‌ده و معمولاً می‌گه چقدر صبر کنی (<code dir="ltr">Retry-After</code>).
                بعدش دوباره می‌تونی امتحان کنی.
              </p>
            </div>
          </li>
        </ul>

        <aside className="learn-demo" aria-labelledby="learn-demo-title">
          <p className="learn-demo-title" id="learn-demo-title">یه مثال ساده</p>
          <p className="learn-demo-sub">حداکثر ۵ درخواست در هر دقیقه</p>

          <ol className="learn-requests" aria-hidden="true">
            {REQUESTS.map(({ n, blocked }) => (
              <li key={n} className={blocked ? 'is-blocked' : 'is-ok'}>
                {n.toLocaleString('fa-IR')}
              </li>
            ))}
          </ol>

          <p className="learn-demo-note">
            پنج درخواست اول پذیرفته می‌شن. درخواست ششم و هفتم با خطای <code dir="ltr">429 Too Many Requests</code>{' '}
            برمی‌گردن، یعنی «یه کم صبر کن و بعد دوباره امتحان کن».
          </p>
        </aside>
      </div>

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

      <p className="learn-foot">
        اسم فروشگاه ما هم از همین‌جا میاد؛ ولی اینجا برای رسیدن تازه‌ها محدودیتی در کار نیست
      </p>
    </section>
  );
}