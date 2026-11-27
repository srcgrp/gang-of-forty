import type { Carousel, Home } from '../types';
import { getJSON } from './http';
import { isRecord } from './guards';
const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const isCarousel = (value: unknown): value is Carousel =>
    isRecord(value) && isText(value.id) && /^[a-z0-9-]+$/.test(value.id) &&
    isText(value.title) && isText(value.emoji) &&
    ((value.source === 'offers' && value.categoryId === undefined) ||
        (value.source === undefined && typeof value.categoryId === 'number' &&
            Number.isSafeInteger(value.categoryId) && value.categoryId > 0));
export const loadHome = async (): Promise<Home> => {
    const data: unknown = await getJSON('home.json');
    if (!isRecord(data) || !Array.isArray(data.carousels)) throw new Error('Invalid home data');
    const rows: unknown[] = data.carousels;
    if (!rows.every(isCarousel)) throw new Error('Invalid carousel');
    if (new Set(rows.map(row => row.id)).size !== rows.length) throw new Error('Duplicate carousel');
    return { carousels: rows };
};
