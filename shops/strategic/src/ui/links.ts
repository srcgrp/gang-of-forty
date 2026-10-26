/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { CATEGORY_PARAM } from '../types';

export const catalogUrl = (slug: string): string => `?${CATEGORY_PARAM}=${encodeURIComponent(slug)}`;