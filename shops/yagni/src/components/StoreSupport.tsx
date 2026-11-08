const services = [
  { icon: "express", label: "امکان تحویل اکسپرس" },
  { icon: "payment", label: "امکان پرداخت در محل" },
  { icon: "support", label: "۷ روز هفته، ۲۴ ساعته" },
  { icon: "return", label: "۲ روز ضمانت بازگشت کالا" },
  { icon: "original", label: "ضمانت اصل بودن کالا" },
];

export default function StoreSupport() {
  return (
    <section className="support anchor-section" id="support" aria-label="خدمات فروشگاه">
      {services.map((service) => (
        <a className="support-item" href="#footer" key={service.icon}>
          <svg className="support-icon" aria-hidden="true"><use href={`/sprite.svg#${service.icon}`} /></svg>
          <span>{service.label}</span>
        </a>
      ))}
    </section>
  );
}
