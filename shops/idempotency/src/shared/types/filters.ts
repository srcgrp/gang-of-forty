export const FILTER_FIELDS = ["category", "query"] as const;

export type FilterField = (typeof FILTER_FIELDS)[number];

export type FilterState = {
  category: string | null;
  query: string;
};