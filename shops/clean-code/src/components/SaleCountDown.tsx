import { useEffect, useState } from "react";

export default function SaleCountdown() {
  const [left, setLeft] = useState(30);

  useEffect(function () {
    console.log("countdown start");
    const id = window.setInterval(function () {
      console.log("tick");
      setLeft(function (s) {
        return s - 1;
      });
    }, 1000);
    return function () {
      console.log("countdown cleanup");
      window.clearInterval(id);
    };
  }, []);

  return (
    <p className="sale-countdown">
      پایان حراج تا {left.toLocaleString("fa-IR")} ثانیه
    </p>
  );
}
