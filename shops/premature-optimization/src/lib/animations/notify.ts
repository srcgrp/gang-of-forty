import "notyf/notyf.min.css";
import { Notyf } from "notyf";

export const notify = new Notyf({
  duration: 5000,
  position: { x: "right", y: "bottom" },
  dismissible: true,
});
