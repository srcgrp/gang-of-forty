export const formatNumber = (value: number): string => new Intl.NumberFormat('fa-IR').format(value);
export const money = (value: number): string => `${formatNumber(value)} تومان`;
