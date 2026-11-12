export async function fireConfetti(): Promise<void> {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { default: confetti } = await import('canvas-confetti');
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.8 },
    colors: ['#B5C400', '#D9E85C', '#F5C24A', '#FFFFFF'],
  });
}