
import type { CartRowView } from "../logic/view";

const formatter = new Intl.NumberFormat("fa-IR");

function formatPrice(price: number): string {
  return `${formatter.format(price)} تومان`;
}


type CartAction = "increase" | "decrease" | "remove";

function createCartActionButton(
  productId: number,
  action: CartAction,
  text: string,
  label: string,
): HTMLButtonElement {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "cart-item-action";
  button.textContent = text;
  button.setAttribute("aria-label", label);

  button.dataset.cartAction = action;
  button.dataset.productId = String(productId);

  return button;
}

function createCartRow(item: CartRowView): HTMLElement {
  const row = document.createElement("article");
  row.className = "cart-item";

  const media = document.createElement(
    item.imagePath !== undefined ? "img" : "span",
  );

  media.className = "cart-item-media";

  if (media instanceof HTMLImageElement && item.imagePath) {
    media.src = item.imagePath;
    media.alt = "";
    media.loading = "lazy";
  } else {
    media.textContent = item.emoji ?? "🛒";
    media.setAttribute("aria-hidden", "true");
  }

  const details = document.createElement("div");
  details.className = "cart-item-details";

  const name = document.createElement("h3");
  name.className = "cart-item-name";
  name.textContent = item.name;

  const unit = document.createElement("span");
  unit.className = "cart-item-unit";
  unit.textContent = item.unit;

  const quantity = document.createElement("span");
  quantity.className = "cart-item-quantity";
  quantity.textContent = `تعداد: ${formatter.format(item.quantity)}`;

  const price = document.createElement("strong");
  price.className = "cart-item-price";
  price.textContent = formatPrice(item.price * item.quantity);

  details.append(name, unit);

  if (item.originalPrice !== undefined) {
    const original = document.createElement("del");
    original.className = "cart-item-old-price";
    original.textContent = formatPrice(
      item.originalPrice * item.quantity,
    );

    details.append(original);
  }

  details.append(price);
  const actions = document.createElement("div");
actions.className = "cart-item-actions";

const stepper = document.createElement("div");
stepper.className = "cart-item-stepper";

const increaseButton = createCartActionButton(
  item.id,
  "increase",
  "+",
  `افزایش تعداد ${item.name}`,
);
increaseButton.disabled = !item.canIncrease;

if (!item.canIncrease) {
  increaseButton.title = "به سقف موجودی این محصول رسیده‌اید";
}

const decreaseButton = createCartActionButton(
  item.id,
  "decrease",
  "−",
  `کاهش تعداد ${item.name}`,
);

const quantityValue = document.createElement("span");
quantityValue.className = "cart-item-quantity-value";
quantityValue.textContent = formatter.format(item.quantity);

stepper.append(
  increaseButton,
  quantityValue,
  decreaseButton,
);

const removeButton = createCartActionButton(
  item.id,
  "remove",
  "حذف",
  `حذف ${item.name} از سبد خرید`,
);

removeButton.classList.add("cart-item-remove");

actions.append(stepper, removeButton);
details.append(actions);
  row.append(media, details);

  return row;
}

export function renderCartPopover(
  items: CartRowView[],
  subtotal: number,
): void {
  const container = document.querySelector<HTMLElement>(
    "#cart-popover-items",
  );

  const subtotalElement = document.querySelector<HTMLElement>(
    "#cart-subtotal",
  );

  if (!container || !subtotalElement) {
    throw new Error("Cart popover content is missing.");
  }

  const clearButton = document.querySelector<HTMLButtonElement>(
  "#cart-clear",
);

if (!clearButton) {
  throw new Error("Cart clear button is missing.");
}

clearButton.hidden = items.length === 0;
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "cart-empty";
    empty.textContent = "سبد خرید شما خالی است.";

    container.replaceChildren(empty);
  } else {
    container.replaceChildren(...items.map(createCartRow));
  }

  subtotalElement.textContent = formatPrice(subtotal);
}
