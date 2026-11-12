const MAX_REQUESTS = 5;
const REQUESTS = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ n, blocked: n > MAX_REQUESTS }));

export default function LearnDemo() {
  return (
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
  );
}