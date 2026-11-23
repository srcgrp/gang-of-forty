import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  position: { x: "center", y: "top" },
  duration: 2500,
  dismissible: true,
  ripple: false,
});

export const toast = {
  success: (msg: string): void => {
    notyf.success(msg);
  },
  error: (msg: string): void => {
    notyf.error(msg);
  },
};