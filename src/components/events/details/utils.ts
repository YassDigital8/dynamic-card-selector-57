
/**
 * Format price display
 * @param price number
 * @returns formatted price string
 */
export const formatPrice = (price: number): string => {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
};

/**
 * Calculate inventory percentage for progress bar
 * @param remaining remaining inventory
 * @param total total inventory
 * @returns percentage value (0-100)
 */
export const calculateInventoryPercentage = (remaining?: number, total?: number): number => {
  if (!remaining || !total || total === 0) return 0;
  return (remaining / total) * 100;
};
