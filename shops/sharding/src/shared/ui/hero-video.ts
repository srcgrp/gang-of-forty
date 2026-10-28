const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

export function startHeroVideo(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(prefers-reduced-data: reduce)').matches) return;
  if (!matchMedia('(min-width: 768px)').matches) return;
  const video = document.querySelector<HTMLVideoElement>('.hero-video__media');
  if (!video) return;
  video.src = `${ASSET_BASE}video/hero.mp4`;
  void video.play().catch(() => {});
}