import type { CartItem, Shop} from "../types";
import { isRecord } from "./guards";

// Check if the input is a correct form of a shop or not
export function isShop(x: unknown): x is Shop {
    return (
        isRecord(x) &&
        typeof x.name === 'string' &&
        typeof x.slogan === 'string' && 
        typeof x.owner === 'string' && 
        typeof x.city === 'string' && 
        typeof x.phone === 'string' &&
        (isRecord(x.hours) && typeof x.hours.open === 'string' && typeof x.hours.close === 'string') &&
        typeof x.deliveryFee === 'number' && 
        typeof x.freeDeliveryOver === 'number' &&
        typeof x.currency === 'string'
    )
}

// Check if the input is a correct form of a cart item or not
// qty must be a positive integer, so a damaged localStorage value is dropped
export function isCartItem(x: unknown): x is CartItem {
  return (
    isRecord(x) &&
    typeof x.id === 'number' &&
    typeof x.name === 'string' && 
    typeof x.price === 'number' && 
    typeof x.qty === 'number' &&
    Number.isInteger(x.qty) &&
    x.qty > 0
  )
}

