import type { MouseEvent } from "react";

type Props = {
  title: string;
};

function moveCarousel(
  event: MouseEvent<HTMLButtonElement>,
  direction: "start" | "end",
): void {
  const section = event.currentTarget.closest(".home-carousel-section");

  const track = section?.querySelector<HTMLElement>(".product-track");

  if (!track) return;

  track.scrollTo({
    left: direction === "start" ? 0 : -track.scrollWidth,
    behavior: "smooth",
  });
}

export default function CarouselControls({ title }: Props) {
  return (
    <div className="carousel-controls">
      <button
        type="button"
        className="carousel-arrow carousel-arrow-start"
        aria-label={`رفتن به ابتدای ${title}`}
        onClick={(event) => moveCarousel(event, "start")}
      >
        →
      </button>

      <button
        type="button"
        className="carousel-arrow carousel-arrow-end"
        aria-label={`رفتن به انتهای ${title}`}
        onClick={(event) => moveCarousel(event, "end")}
      >
        ←
      </button>
    </div>
  );
}
