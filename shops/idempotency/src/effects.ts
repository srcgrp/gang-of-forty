
import confetti from "canvas-confetti";

function showOffersConfetti() {
  const title = document.querySelector<HTMLElement>(
    "#carousel-title-offers"
  );

  if (!title) {
    return;
  }

  const rect = title.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const originX = centerX / window.innerWidth;
  const originY = centerY / window.innerHeight;

  confetti({
    particleCount: 30,
    spread: 70,
    startVelocity: 18,
    gravity: 0.8,
    scalar: 0.9,
    ticks: 90,
    shapes: ["circle"],
    colors: ["#7C1021", "#075568", "#6C9B60", "#D6AA54"],
    origin: {
      x: originX,
      y: originY,
    },
  });
}

export function setupOffersConfetti() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const offersLink = target.closest<HTMLAnchorElement>(
      'a[href="#offers"]'
    );

    if (!offersLink) {
      return;
    }

    setTimeout(() => {
      showOffersConfetti();
    }, 500);
  });
}
