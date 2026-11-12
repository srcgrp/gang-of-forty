import { useState } from "react";
import { useShopData } from "./hooks/useShopData";
import { ShopView } from "./components/ShopView";
import { SliderEnhancer } from "./components/SliderEnhancer";

export default function App() {
  const [attempt, setAttempt] = useState(0);
  const state = useShopData(attempt);

  if (state.status === "loading") {
    return <div className="global-loader">در حال بارگذاری...</div>;
  }
  if (state.status === "error") {
    return (
      <div className="state-error">
        <p>{state.message}</p>
        <button onClick={() => setAttempt((a) => a + 1)}>تلاش مجدد</button>
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
