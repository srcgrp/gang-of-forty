import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export const addedToCart = (name: string): void => {
  void Swal.fire({ toast: true, position: 'bottom-start', icon: 'success',
    titleText: `${name} به سبد خرید اضافه شد`, showConfirmButton: false,
    timer: 1800, timerProgressBar: true });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    void confetti({ particleCount: 30, spread: 55, origin: { y: 0.8 }, disableForReducedMotion: true });
  }
};
