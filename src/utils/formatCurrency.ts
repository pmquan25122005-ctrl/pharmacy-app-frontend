/**
 * Helper to format product price dynamically.
 * If price >= 1000, formats as Vietnamese Đồng (e.g., 35.000 đ).
 * Otherwise formats as USD (e.g., $1.50).
 */
export const formatCurrency = (price: number | string): string => {
  const numericPrice = Number(price) || 0;

  if (numericPrice >= 1000) {
    return `${numericPrice.toLocaleString('vi-VN')} đ`;
  }

  return `$${numericPrice.toFixed(2)}`;
};
