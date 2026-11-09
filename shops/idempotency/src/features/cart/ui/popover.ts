
export function setupCartPopover(): void {
  const widget = document.querySelector<HTMLElement>("#cart-widget");
  const trigger = document.querySelector<HTMLButtonElement>("#cart-trigger");
  const popover = document.querySelector<HTMLElement>("#cart-popover");
  const closeButton = document.querySelector<HTMLButtonElement>(
    "#cart-popover-close",
  );

  if (!widget || !trigger || !popover || !closeButton) {
    throw new Error("Cart popover elements are missing.");
  }

  let pointerType = "mouse";

  function positionPopover(): void {
    if (!widget || !trigger || !popover) {
      return;
    }

    const widgetRect = widget.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const width = Math.min(360, window.innerWidth - 24);

    const left = Math.max(
      12,
      Math.min(triggerRect.left, window.innerWidth - width - 12),
    );

    popover.style.left = `${left - widgetRect.left}px`;
  }

  function setOpen(open: boolean): void {
    if (!popover || !trigger) {
      return;
    }

    if (open) {
      positionPopover();
    }

    popover.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
  }

  widget.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      setOpen(true);
    }
  });

  widget.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
      setOpen(false);
    }
  });

  trigger.addEventListener("pointerdown", (event) => {
    pointerType = event.pointerType;
  });

  trigger.addEventListener("click", (event) => {
    if (event.detail === 0 || pointerType !== "mouse") {
      setOpen(popover.hasAttribute("hidden"));
    } else {
      setOpen(true);
    }
  });

  closeButton.addEventListener("click", () => {
    setOpen(false);
  });

  document.addEventListener("pointerdown", (event) => {
    if (event.target instanceof Node && !widget.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popover.hidden) {
      setOpen(false);
      trigger.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!popover.hidden) {
      positionPopover();
    }
  });
}
