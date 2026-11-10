import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCart, validateCoupon, formatUSD } from './cartCalculations';
import { Product, CartItem } from '../types/commerce';

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Handcrafted Glass Ornament',
  slug: 'handcrafted-glass-ornament',
  subtitle: 'Artisan blown glass',
  description: 'Festive glass ornament with 24k gold leaf accents',
  category: 'Ornaments',
  price: 28.0,
  originalPrice: 35.0,
  currency: 'USD',
  rating: 4.9,
  reviewCount: 142,
  inStock: true,
  stockCount: 15,
  images: ['/test.jpg'],
  budgetTier: 'under-50',
  details: ['Handmade', '3.5 inches diameter'],
};

test('calculates empty cart correctly', () => {
  const result = calculateCart([]);
  assert.equal(result.itemCount, 0);
  assert.equal(result.subtotal, 0);
  assert.equal(result.total, 0);
  assert.equal(result.isFreeShipping, true);
});

test('calculates cart under free shipping threshold', () => {
  const items: CartItem[] = [
    {
      id: 'cart-1',
      productId: 'prod-1',
      product: mockProduct,
      quantity: 1,
    },
  ];

  const result = calculateCart(items);
  assert.equal(result.subtotal, 28.0);
  assert.equal(result.isFreeShipping, false);
  assert.equal(result.shippingFee, 6.95);
  assert.equal(result.freeShippingRemaining, 21.0);
});

test('qualifies for free shipping over $49 threshold', () => {
  const items: CartItem[] = [
    {
      id: 'cart-1',
      productId: 'prod-1',
      product: mockProduct,
      quantity: 2, // 28 * 2 = 56.0 >= 49
    },
  ];

  const result = calculateCart(items);
  assert.equal(result.subtotal, 56.0);
  assert.equal(result.isFreeShipping, true);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.freeShippingRemaining, 0);
  assert.equal(result.freeShippingProgress, 100);
});

test('applies MERRY25 coupon code for 25% discount', () => {
  const items: CartItem[] = [
    {
      id: 'cart-1',
      productId: 'prod-1',
      product: { ...mockProduct, price: 100 },
      quantity: 1,
    },
  ];

  const result = calculateCart(items, 'MERRY25');
  assert.equal(result.discountPercent, 25);
  assert.equal(result.discountAmount, 25);
  // Subtotal = 100, Discount = 25, Discounted Subtotal = 75
  // Free shipping because subtotal >= 49
  // Tax = 75 * 0.07 = 5.25
  // Total = 75 + 5.25 = 80.25
  assert.equal(result.taxAmount, 5.25);
  assert.equal(result.total, 80.25);
});

test('validates coupon codes accurately', () => {
  assert.equal(validateCoupon('MERRY25').valid, true);
  assert.equal(validateCoupon('holiday10').valid, true);
  assert.equal(validateCoupon('INVALID99').valid, false);
});

test('formats USD currency cleanly', () => {
  assert.equal(formatUSD(24.5), '$24.50');
  assert.equal(formatUSD(1250), '$1,250.00');
});
