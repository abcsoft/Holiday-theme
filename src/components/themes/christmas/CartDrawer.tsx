import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Gift, Truck, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../../../types/commerce';
import { calculateCart, formatUSD, validateCoupon, FREE_SHIPPING_THRESHOLD } from '../../../utils/cartCalculations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onApplyCoupon: (code: string) => { valid: boolean; message: string };
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
  hasGiftWrap: boolean;
  onToggleGiftWrap: (val: boolean) => void;
  giftNote: string;
  onUpdateGiftNote: (note: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  hasGiftWrap,
  onToggleGiftWrap,
  giftNote,
  onUpdateGiftNote,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!isOpen) return null;

  const cartCalculations = calculateCart(items, appliedCoupon, hasGiftWrap);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = onApplyCoupon(couponInput);
    if (!res.valid) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Your holiday shopping bag"
          className="w-screen max-w-md bg-[#FAF7F0] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#073D2B]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-[#073D2B]">
                Holiday Shopping Bag
              </h2>
              <span className="text-xs bg-[#073D2B]/10 text-[#073D2B] font-mono px-2 py-0.5 rounded-full font-bold">
                {cartCalculations.itemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#15233B]/60 hover:text-[#073D2B] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3.5 bg-[#073D2B] text-white text-xs space-y-1.5">
            <div className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5 text-[#D8AF62]">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {cartCalculations.isFreeShipping
                    ? "🎉 You've unlocked FREE US Holiday Shipping!"
                    : `Add ${formatUSD(cartCalculations.freeShippingRemaining)} more for FREE US Shipping`}
                </span>
              </span>
              <span className="font-mono text-[11px] text-[#FAF7F0]/70">
                ${FREE_SHIPPING_THRESHOLD} target
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D8AF62] transition-all duration-300"
                style={{ width: `${cartCalculations.freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#073D2B]/5 text-[#073D2B] flex items-center justify-center mx-auto text-2xl font-serif">
                  🎁
                </div>
                <h3 className="text-base font-serif font-bold text-[#15233B]">
                  Your holiday bag is empty
                </h3>
                <p className="text-xs text-[#15233B]/60 max-w-xs mx-auto">
                  Explore our handcrafted glass ornaments, cashmere throws, and holiday gourmet gifts.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#073D2B] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#04261B] transition-colors cursor-pointer"
                >
                  Start Holiday Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const unitPrice = item.selectedVariant?.price ?? item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 bg-white rounded-xl border border-[#073D2B]/10 shadow-xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-[#FAF7F0] shrink-0 border border-[#073D2B]/5"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#15233B] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="text-[#15233B]/40 hover:text-[#B51225] transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <p className="text-[11px] text-[#073D2B] font-medium">
                            {item.selectedVariant.name}
                          </p>
                        )}
                        {item.giftNote && (
                          <p className="text-[10px] text-[#B51225] font-semibold italic">
                            {item.giftNote}
                          </p>
                        )}

                        <div className="text-xs font-bold font-mono text-[#073D2B] tabular-nums pt-1">
                          {formatUSD(unitPrice)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#073D2B]/20 rounded-lg bg-[#FAF7F0] overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#15233B]/70 hover:bg-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-[#15233B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#15233B]/70 hover:bg-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-[#15233B] tabular-nums">
                          {formatUSD(unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Gift Wrap & Packaging Option */}
            {items.length > 0 && (
              <div className="p-3.5 bg-white rounded-xl border border-[#D8AF62]/40 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasGiftWrap}
                    onChange={(e) => onToggleGiftWrap(e.target.checked)}
                    className="mt-0.5 rounded text-[#073D2B] focus:ring-[#073D2B]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#073D2B] flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#D8AF62]" />
                      <span>Signature Forest Green Holiday Gift Wrap (+$5.00)</span>
                    </span>
                    <p className="text-[11px] text-[#15233B]/70 mt-0.5">
                      Includes handmade gold velvet bow and customized printed gift card.
                    </p>
                  </div>
                </label>

                {hasGiftWrap && (
                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="Add a personalized gift message to recipient..."
                      value={giftNote}
                      onChange={(e) => onUpdateGiftNote(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg bg-[#FAF7F0] border border-[#073D2B]/15 text-[#15233B] placeholder-[#15233B]/40 focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <div className="p-3.5 bg-white rounded-xl border border-[#073D2B]/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#15233B]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#B51225]" />
                    <span>Holiday Promo Code</span>
                  </span>
                  <span className="text-[11px] text-[#073D2B] font-medium">Try MERRY25</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-800">
                        {appliedCoupon}
                      </span>
                      <span className="text-emerald-700 font-medium">
                        ({cartCalculations.discountPercent}% OFF applied)
                      </span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      placeholder="Enter MERRY25"
                      className="flex-1 uppercase font-mono text-xs px-3 py-2 rounded-lg bg-[#FAF7F0] border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                    <button
                      type="submit"
                      className="bg-[#073D2B] hover:bg-[#04261B] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-[#B51225] font-medium">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#073D2B]/10 space-y-3">
              <div className="space-y-1.5 text-xs text-[#15233B]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">
                    {formatUSD(cartCalculations.subtotal)}
                  </span>
                </div>

                {cartCalculations.discountAmount > 0 && (
                  <div className="flex justify-between text-[#B51225] font-semibold">
                    <span>Holiday Discount ({cartCalculations.discountPercent}%)</span>
                    <span className="font-mono tabular-nums">
                      -{formatUSD(cartCalculations.discountAmount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard US Shipping</span>
                  <span className="font-mono tabular-nums">
                    {cartCalculations.isFreeShipping ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatUSD(cartCalculations.shippingFee)
                    )}
                  </span>
                </div>

                {cartCalculations.giftWrapFee > 0 && (
                  <div className="flex justify-between">
                    <span>Signature Holiday Gift Wrap</span>
                    <span className="font-mono tabular-nums">
                      {formatUSD(cartCalculations.giftWrapFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated State Sales Tax (7%)</span>
                  <span className="font-mono tabular-nums">
                    {formatUSD(cartCalculations.taxAmount)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#073D2B]/10 flex justify-between text-base font-bold text-[#073D2B]">
                  <span>Total (USD)</span>
                  <span className="font-mono tabular-nums text-lg">
                    {formatUSD(cartCalculations.total)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#B51225] hover:bg-[#8F0D1C] text-white py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#15233B]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#073D2B]" />
                <span>256-Bit SSL Encrypted &amp; Guaranteed Christmas Eve Delivery</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
