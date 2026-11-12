const REPEATS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {REPEATS.map((n) => (
          <span key={n}>🚚 ارسال رایگان برای خریدهای بالای ۱ میلیون تومان</span>
        ))}
      </div>
    </div>
  );
}