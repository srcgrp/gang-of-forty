import { Link } from "@tanstack/react-router";
import { useCartStore } from "../../hooks/useCartStore.ts";
import { useCatalog } from "../../hooks/useCatalog.ts";
import { cartCount } from "../../scripts/logic/cart/cart-lines.ts";
import type { CatalogData } from "../../scripts/types.ts";
import CheckoutForm from "../checkout/CheckoutForm.tsx";
import OrderSummary from "../checkout/OrderSummary.tsx";
import Page from "../Page.tsx";
import MainContent from "../shared/MainContent.tsx";
import HomeLinkStatus from "../status/HomeLinkStatus.tsx";

type CheckoutContentProps = Pick<CatalogData, "products" | "offers" | "shop">;

function CheckoutContent({ products, offers, shop }: CheckoutContentProps) {
  return (
    <MainContent>
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
    </MainContent>
  );
}

export default function CheckoutPage() {
  const isEmpty = useCartStore((s) => cartCount(s.cart) === 0);
  const { state, retry } = useCatalog();

  if (isEmpty)
    return (
      <MainContent>
        <HomeLinkStatus message="سبد خرید شما خالی است." />
      </MainContent>
    );

  return (
    <Page state={state} onRetry={retry}>
      {({ products, offers, shop }) => (
        <CheckoutContent products={products} offers={offers} shop={shop} />
      )}
    </Page>
  );
}
