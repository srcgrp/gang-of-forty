import type { Product, Category, Offer, Stock, CartLine } from '../types';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0;

export const isNumber = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER;

const isId = (value: unknown): value is number =>
    isNumber(value) && Number.isSafeInteger(value) && value > 0;

const isStrings = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');

export const isProduct = (value: unknown): value is Product =>
    isRecord(value) && isId(value.id) && isId(value.categoryId) &&
    isText(value.name) && isText(value.emoji) && isText(value.unit) &&
    isNumber(value.price) && isStrings(value.tags);

export const isCategory = (value: unknown): value is Category =>
    isRecord(value) && isId(value.id) && isText(value.slug) &&
    isText(value.name) && isText(value.emoji) &&
    (value.color === undefined || typeof value.color === 'string');

export const isOffer = (value: unknown): value is Offer =>
    isRecord(value) && isId(value.productId) && isNumber(value.percent) &&
    value.percent <= 100 && isText(value.label);

export const isStock = (value: unknown): value is Stock =>
    isRecord(value) && isText(value.updatedAt) && isRecord(value.items) &&
    Object.entries(value.items).every(([key, item]) =>
        /^[1-9]\d*$/.test(key) && isNumber(item) && Number.isSafeInteger(item));

export const isCartLine = (value: unknown): value is CartLine =>
    isRecord(value) && isId(value.id) && isId(value.quantity);
