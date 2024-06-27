export const discountPercentage = (mrp, price) => {
  return ((mrp - price) / mrp).toFixed(2) * 100;
};
