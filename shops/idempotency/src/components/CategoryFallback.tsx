type Props = {
  loading: boolean;
};

export default function CategoryFallback({ loading }: Props) {
  return (
    <section id="categories" className="categories">
      <h2>دسته‌بندی‌ها</h2>
      <p>
        {loading
          ? "در حال دریافت دسته‌بندی‌ها..."
          : "دسته‌بندی‌ها فعلاً در دسترس نیستند."}
      </p>
    </section>
  );
}
