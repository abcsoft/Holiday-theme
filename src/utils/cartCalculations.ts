import { CartItem } from '../types/commerce';

export const FREE_SHIPPING_THRESHOLD = 49.0;
export const STANDARD_SHIPPING_RATE = 6.95;
export const GIFT_WRAP_FEE = 5.0;
export const ESTIMATED_TAX_RATE = 0.07; // 7% US average sales tax

export interface CartCalculationResult {
  itemCount: number;
  subtotal: number;
  discountCode: string | null;
  discountAmount: number;
  discountPercent: number;
  shippingFee: number;
  isFreeShipping: boolean;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  giftWrapFee: number;
  taxAmount: number;
  total: number;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateCart(
  items: CartItem[],
  appliedCoupon: string | null = null,
  hasGiftWrap: boolean = false
): CartCalculationResult {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.selectedVariant?.price ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  // Discount code handling
  let discountPercent = 0;
  let freesShippingViaCoupon = false;

  if (appliedCoupon) {
    const code = appliedCoupon.trim().toUpperCase();
    if (code === 'MERRY25') {
      discountPercent = 25;
    } else if (code === 'HOLIDAY10') {
      discountPercent = 10;
    } else if (code === 'FREESHIP') {
      freesShippingViaCoupon = true;
    }
  }

  const discountAmount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  const isFreeShipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || freesShippingViaCoupon;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_RATE;
  const freeShippingRemaining = Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const giftWrapFee = hasGiftWrap && items.length > 0 ? GIFT_WRAP_FEE : 0;
  const taxableAmount = Math.max(0, discountedSubtotal);
  const taxAmount = Math.round(taxableAmount * ESTIMATED_TAX_RATE * 100) / 100;

  const total = items.length === 0 ? 0 : Math.round((discountedSubtotal + shippingFee + giftWrapFee + taxAmount) * 100) / 100;

  return {
    itemCount,
    subtotal: Math.round(subtotal * 100) / 100,
    discountCode: appliedCoupon,
    discountAmount,
    discountPercent,
    shippingFee,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingProgress,
    giftWrapFee,
    taxAmount,
    total,
  };
}

export function validateCoupon(code: string): { valid: boolean; message: string; discountPercent?: number } {
  const normalized = code.trim().toUpperCase();
  if (normalized === 'MERRY25') {
    return { valid: true, message: '25% Holiday Discount applied!', discountPercent: 25 };
  }
  if (normalized === 'HOLIDAY10') {
    return { valid: true, message: '10% Holiday Savings applied!', discountPercent: 10 };
  }
  if (normalized === 'FREESHIP') {
    return { valid: true, message: 'Free Standard Shipping applied!' };
  }
  return { valid: false, message: 'Invalid or expired holiday promo code. Try MERRY25' };
}
