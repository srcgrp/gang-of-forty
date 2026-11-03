import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "success",
      background: "#07566b",
      icon: {
        className: "notyf__icon--success",
        tagName: "i",
        color: "#07566b",
      },
    },
  ],
});

export function showCartToast(): void {
  notyf.success("محصول به سبد خرید اضافه شد");
}