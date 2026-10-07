export type AreaUnit = 'sqft' | 'sqyd' | 'acre' | 'sqm';

export const CONVERSION_RATES: Record<AreaUnit, number> = {
  sqft: 1,
  sqyd: 9, // 1 sq yd = 9 sq ft
  acre: 43560, // 1 acre = 43,560 sq ft
  sqm: 10.7639, // 1 sq m = 10.7639 sq ft
};

export function convertArea(sqft: number, targetUnit: AreaUnit): number {
  return sqft / CONVERSION_RATES[targetUnit];
}

export function formatArea(sqft: number, targetUnit: AreaUnit = 'sqft'): string {
  const converted = convertArea(sqft, targetUnit);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: targetUnit === 'acre' ? 2 : 0,
  }).format(converted);

  const unitLabels: Record<AreaUnit, string> = {
    sqft: 'sq ft',
    sqyd: 'sq yd',
    acre: 'acres',
    sqm: 'sq m',
  };

  return `${formatted} ${unitLabels[targetUnit]}`;
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', '₹').trim();
}
