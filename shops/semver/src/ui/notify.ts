import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 6000,
  position: { x: 'left', y: 'bottom' },
  ripple: true,
  dismissible: true
});
