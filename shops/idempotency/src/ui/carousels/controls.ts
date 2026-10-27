export function createCarouselControls(
  track: HTMLElement,
  title: string,
): HTMLElement {
  const controls = document.createElement("div");
  controls.className = "carousel-controls";

  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.className = "carousel-arrow carousel-arrow-start";
  startButton.textContent = "→";
  startButton.setAttribute(
    "aria-label",
    `رفتن به ابتدای ${title}`,
  );

  const endButton = document.createElement("button");
  endButton.type = "button";
  endButton.className = "carousel-arrow carousel-arrow-end";
  endButton.textContent = "←";
  endButton.setAttribute(
    "aria-label",
    `رفتن به انتهای ${title}`,
  );

  startButton.addEventListener("click", () =>
    track.scrollTo({ left: 0, behavior: "smooth" }),
  );

  endButton.addEventListener("click", () =>
    track.scrollTo({
      left: -track.scrollWidth,
      behavior: "smooth",
    }),
  );

  controls.append(startButton, endButton);
  return controls;
}