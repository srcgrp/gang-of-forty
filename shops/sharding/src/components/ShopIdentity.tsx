type ShopIdentityProps = { name: string; slogan: string; loading: boolean }

export default function ShopIdentity({ name, slogan, loading }: ShopIdentityProps) {
  return (
    <a href="#" className="identity" aria-label="بازگشت به بالای صفحه">
      <span className="identity__logo" aria-hidden="true">
        <img className="logo-img" src="./assets/images/logo/kiwi-fruit.svg" alt="" width="48" height="48" />
      </span>
      <span className="identity__text">
        <span className={`identity__name ${loading ? 'skeleton skeleton--brand' : ''}`}>
          {loading ? ' ' : name}
        </span>
        <span className={`identity__tagline ${loading ? 'skeleton skeleton--tagline' : ''}`}>
          {loading ? ' ' : slogan}
        </span>
      </span>
    </a>
  )
}
