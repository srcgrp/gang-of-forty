import type { CartLine, Product } from "../../types"; // import only the types (verbatimModuleSyntax needs "import type")

// Adds one unit of a product to the cart and returns a NEW array
export function addToCart(
  cart: CartLine[], // the current cart lines
  product: Product, // the product the user clicked "+" on
  unitPrice: number // the price after discount for one unit
): CartLine[] { // returns a new array, never the old one
  // Check if this product already has a line in the cart
  const exists = cart.some((line) => line.id === product.id);
  // If the product is already there, we only increase its quantity
  if (exists) {
    // map builds a brand-new array
    return cart.map((line) =>
      // copy the matching line with qty + 1, keep other lines unchanged
      line.id === product.id ? { ...line, qty: line.qty + 1 } : line
    );
  }
  // Otherwise create a new line with quantity 1
  const newLine: CartLine = {
    id: product.id, // product id
    name: product.name, // product name for display
    emoji: product.emoji, // product emoji for display
    unit: product.unit, // unit text like "1 kg"
    price: unitPrice, // price after discount
    qty: 1, // first unit
  };
  // Return a new array: old lines (spread) plus the new line at the end
  return [...cart, newLine];
}