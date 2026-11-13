import { useState } from "react";
import { useShopData } from "./hooks/useShopData";
import { ShopView } from "./components/ShopView";
import { SliderEnhancer } from "./components/SliderEnhancer";

export default function App() {
  const [attempt, setAttempt] = useState(0);
  const state = useShopData(attempt);

  if (state.status === "loading") {
    return (
      <div className="global-loader" role="status" aria-live="polite">
        <div className="global-loader__spinner" aria-hidden="true" />
        <div className="global-loader__text">در حال بارگذاری...</div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="state-error" role="alert">
        <span className="state-error__icon" aria-hidden="true">
          ⚠️
        </span>
        <h2 className="state-error__title">خطا در بارگذاری</h2>
        <p className="state-error__text">{state.message}</p>
        <div className="state-error__actions">
          <button
            type="button"
            className="btn-retry"
            onClick={() => setAttempt((a) => a + 1)}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SliderEnhancer />
      <ShopView data={state.data} />
    </>
  );
}
