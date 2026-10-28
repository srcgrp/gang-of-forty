import type { Home, Shelf } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';
import { isLink } from './is-link';

function isShelf(v: unknown): v is Shelf {
  return (
    isRecord(v) &&
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    (v.source === undefined || v.source === 'offers') &&
    (v.categoryId === undefined || typeof v.categoryId === 'number')
  );
}

function isHome(v: unknown): v is Home {
  if (!isRecord(v)) return false;
  
  if (v.hero !== undefined) {
    if (!isRecord(v.hero)) return false;
    if (v.hero.title !== undefined && typeof v.hero.title !== 'string') return false;
    if (v.hero.text !== undefined && typeof v.hero.text !== 'string') return false;
    if (v.hero.cta !== undefined && !isLink(v.hero.cta)) return false;
  }
  
  if (v.carousels !== undefined) {
    if (!Array.isArray(v.carousels)) return false;
    if (!v.carousels.every(isShelf)) return false;
  }
  
  return true;
}

export async function loadHome(): Promise<Home> {
  const data = await getJSON('home.json');
  if (!isRecord(data)) throw new Error('Invalid home.json');
  
  if (isRecord(data.hero) && data.hero.cta !== undefined && !isLink(data.hero.cta)) {
    delete data.hero.cta;
  }
  
  if (!isHome(data)) throw new Error('Invalid home.json');
  return data;
}