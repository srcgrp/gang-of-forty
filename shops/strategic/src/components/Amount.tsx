export default function Amount({ total, old, discount }: { total: number; old: number; discount: number }) {
  return <>
    {old > total && <div className="mini-old">
      <span className="badge badge--sm">{discount.toLocaleString('fa-IR')}٪</span>
      <del>{old.toLocaleString('fa-IR')}</del>
    </div>}
    <span className="mini-price"><strong>{total.toLocaleString('fa-IR')}</strong><small>تومان</small></span>
  </>;
}
