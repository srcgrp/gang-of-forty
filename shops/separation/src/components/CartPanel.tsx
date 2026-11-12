export default function CartPanel({ count }: { count: number }) {
  return (
    <section id="cart" className="section">
      <h2>{`سبد خرید (${count.toLocaleString('fa-IR')})`}</h2>
      <p>سبد خالی است.</p>
    </section>
  )
}
