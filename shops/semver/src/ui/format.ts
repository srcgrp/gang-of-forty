export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

export const formatCount = (count: number): string => {
  return new Intl.NumberFormat('fa-IR').format(count);
};
