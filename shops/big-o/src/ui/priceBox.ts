import { formatNumber } from './format';

function createPrice(tag: 'del' | 'strong', amount: number): HTMLElement {
  const element = document.createElement(tag);
  element.textContent = `${formatNumber(amount)} تومان`;
  return element;
}

export function createPriceBox(price: number, finalPrice?: number): HTMLDivElement {
  const box = document.createElement('div');
  box.classList.add('price');
  if (finalPrice === undefined) {
    box.append(createPrice('strong', price));
  } else {
    box.append(createPrice('del', price), createPrice('strong', finalPrice));
  }
  return box;
}