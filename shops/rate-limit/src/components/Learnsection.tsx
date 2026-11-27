import LearnDemo from './LearnDemo';
import LearnMethods from './LearnMethods';

const POINTS = [
  { icon: '⚡', title: 'سرویس سریع می‌مونه', text: 'اگه همه یک‌دفعه هجوم بیارن، سرور کند می‌شه یا از کار می‌افته. محدودیت نرخ جلوی این فشار رو می‌گیره.' },
  { icon: '🛡️', title: 'جلوی سوءاستفاده', text: 'ربات‌ها، حدس زدن پشت‌سرهم رمز عبور و حمله‌های سنگین رو کند یا متوقف می‌کنه.' },
  { icon: '⚖️', title: 'استفادهٔ عادلانه', text: 'هیچ کاربری نمی‌تونه همهٔ منابع رو برای خودش برداره؛ نوبت به همه می‌رسه.' },
];

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

        <LearnDemo />
      </div>

      <LearnMethods />

      <p className="learn-foot">
        اسم فروشگاه ما هم از همین‌جا میاد؛ ولی اینجا برای رسیدن تازه‌ها محدودیتی در کار نیست
      </p>
    </section>
  );
}