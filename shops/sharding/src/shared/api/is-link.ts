import { isRecord } from './is-record';
import type { Link } from '../types';

export function isLink(v: unknown): v is Link {
  if (!isRecord(v) || typeof v.label !== 'string' || typeof v.href !== 'string') return false;
  return /^(https?:|\/|#|tel:|mailto:)/i.test(v.href) || !v.href.includes(':');
}