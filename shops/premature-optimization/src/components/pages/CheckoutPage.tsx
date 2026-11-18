import { Link } from "@tanstack/react-router";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { cartCount } from "../../scripts/logic/cart/cart-lines.ts";
import CheckoutForm from "../checkout/CheckoutForm.tsx";
import OrderSummary from "../checkout/OrderSummary.tsx";
import Page from "../Page.tsx";
import HomeLinkStatus from "../status/HomeLinkStatus.tsx";

export default function CheckoutPage() {
  const isEmpty = useCartStore((s) => cartCount(s.cart) === 0);
  const { state, retry } = useCatalog();

  if (isEmpty)
    return (
      <main id="main-content" tabIndex={-1}>
        <HomeLinkStatus message="سبد خرید شما خالی است." />
      </main>
    );

  return (
    <Page state={state} onRetry={retry}>
      {({ products, offers, shop }) => (
        <main id="main-content" tabIndex={-1}>
          <section className="checkout">
            <div className="recommendation-heading">
              <div className="recommendation-title-wrapper">
                <h2 className="recommendation-title">تسویه حساب</h2>
              </div>
              <Link className="view-all-link" to="/">
                بازگشت به صفحه اصلی
              </Link>
            </div>
            <div className="checkout-layout">
              <OrderSummary products={products} offers={offers} shop={shop} />
              <CheckoutForm />
            </div>
          </section>
        </main>
      )}
    </Page>
  );
}
