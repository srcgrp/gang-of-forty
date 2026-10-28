import type { Shop } from '../types';
import { isRecord, isNumber } from './guards';

export const isShop = (value: unknown): value is Shop => {
    if (!isRecord(value) || !isRecord(value.hours)) return false;
    const texts: unknown[] = [
        value.name, value.slogan, value.owner, value.city, value.phone,
        value.hours.open, value.hours.close, value.currency
    ];
    return texts.every(text => typeof text === 'string') &&
        isNumber(value.deliveryFee) && isNumber(value.freeDeliveryOver);
};
