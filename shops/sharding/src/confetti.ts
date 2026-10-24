import confetti from 'canvas-confetti';

export function fireConfetti(): void {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.8 },
    colors: ['#B5C400', '#D9E85C', '#F5C24A', '#FFFFFF'] 
  });
}