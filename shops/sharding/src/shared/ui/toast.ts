import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 2200,
  position: { x: 'left', y: 'bottom' },
  dismissible: true,
  types: [
    {
      type: 'error',
      background: '#e11d48',
      icon: false,
    },
  ],
});