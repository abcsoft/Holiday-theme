import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Truck, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { CartItem } from '../../../types/commerce';
import { calculateCart, formatUSD } from '../../../utils/cartCalculations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string | null;
  hasGiftWrap: boolean;
  giftNote: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  hasGiftWrap,
  giftNote,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'klarna'>('card');

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '(555) 382-9104',
    address: '742 Evergreen Terrace',
    city: 'Boston',
    state: 'MA',
    zip: '02108',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '884',
  });

  const [orderNumber, setOrderNumber] = useState('AB-2025-8492');
  const [paidTotal, setPaidTotal] = useState<number>(0);

  if (!isOpen) return null;

  const baseCalculations = calculateCart(items, appliedCoupon, hasGiftWrap);

  // Extra shipping upgrade adjustment
  let extraShippingCost = 0;
  if (shippingMethod === 'express') extraShippingCost = 14.95;
  if (shippingMethod === 'overnight') extraShippingCost = 24.95;

  const finalShipping = baseCalculations.isFreeShipping && shippingMethod === 'standard'
    ? 0
    : baseCalculations.shippingFee + extraShippingCost;

  const currentFinalTotal = Math.round((baseCalculations.total + (finalShipping - baseCalculations.shippingFee)) * 100) / 100;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setPaidTotal(currentFinalTotal);
    const randomOrderNum = `AB-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(randomOrderNum);

    setTimeout(() => {
      setStep('confirmed');
      onOrderSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => step !== 'processing' && onClose()}
        />

        <div className="relative z-10 inline-block align-bottom bg-[#FAF7F0] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-[#073D2B]/10">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#073D2B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D8AF62]" />
              <h2 className="text-lg font-serif font-bold text-[#FAF7F0]">
                {step === 'confirmed' ? 'Holiday Order Confirmed' : 'Secure Holiday Checkout (USD)'}
              </h2>
            </div>
            {step !== 'processing' && (
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="text-white/70 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {step === 'processing' && (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#073D2B] border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#073D2B]">
                Securing Your Holiday Delivery...
              </h3>
              <p className="text-xs text-[#15233B]/70 max-w-sm mx-auto">
                Authorizing 256-bit payment, generating your packing slip, and notifying our fulfillment center.
              </p>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#073D2B] mt-1">
                  Thank You for Shopping with AitoBazar!
                </h3>
                <p className="text-xs sm:text-sm text-[#15233B]/70 mt-1 max-w-md mx-auto">
                  Confirmation receipt and tracking updates have been sent to{' '}
                  <span className="font-semibold text-[#15233B]">{formData.email}</span>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white rounded-xl p-5 border border-[#073D2B]/10 text-left space-y-3 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#073D2B]/10">
                  <span className="text-[#15233B]/60">Order Reference:</span>
                  <span className="font-mono font-bold text-[#073D2B] text-sm">
                    {orderNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#15233B]/60">Delivery Address:</span>
                  <span className="font-medium text-[#15233B]">
                    {formData.address}, {formData.city}, {formData.state} {formData.zip}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#15233B]/60">Estimated Delivery:</span>
                  <span className="font-bold text-[#073D2B]">
                    By December 22, 2025 (Guaranteed)
                  </span>
                </div>

                {hasGiftWrap && (
                  <div className="flex justify-between items-center text-[#B51225] font-semibold">
                    <span>Gift Wrap:</span>
                    <span>Signature Forest Green Box &amp; Card</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-[#073D2B]/10 font-bold text-sm text-[#073D2B]">
                  <span>Total Charged:</span>
                  <span className="font-mono">{formatUSD(paidTotal || currentFinalTotal)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-[#073D2B] hover:bg-[#04261B] text-white px-8 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#073D2B] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#D8AF62]" />
                  <span>1. US Shipping Address</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      Email for Order Updates
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    >
                      <option value="MA">MA - Massachusetts</option>
                      <option value="NY">NY - New York</option>
                      <option value="CA">CA - California</option>
                      <option value="TX">TX - Texas</option>
                      <option value="CO">CO - Colorado</option>
                      <option value="WA">WA - Washington</option>
                      <option value="FL">FL - Florida</option>
                      <option value="IL">IL - Illinois</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#073D2B]/15 text-[#15233B] focus:outline-none focus:border-[#073D2B]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Speed Choice */}
              <div className="space-y-2 pt-2 border-t border-[#073D2B]/10">
                <label className="block text-[11px] font-semibold text-[#073D2B] uppercase tracking-wider">
                  2. Delivery Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'standard'
                        ? 'border-[#073D2B] bg-[#073D2B]/5 font-semibold'
                        : 'border-[#073D2B]/10 bg-white'
                    }`}
                  >
                    <p className="text-[#15233B]">Standard Ground</p>
                    <p className="text-[11px] text-[#073D2B]">
                      {baseCalculations.isFreeShipping ? 'FREE' : '$6.95'}
                    </p>
                    <span className="text-[10px] text-[#15233B]/60">Delivers Dec 20–22</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'express'
                        ? 'border-[#073D2B] bg-[#073D2B]/5 font-semibold'
                        : 'border-[#073D2B]/10 bg-white'
                    }`}
                  >
                    <p className="text-[#15233B]">2-Day Express</p>
                    <p className="text-[11px] text-[#073D2B]">+$14.95</p>
                    <span className="text-[10px] text-[#15233B]/60">Guaranteed Dec 22</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('overnight')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      shippingMethod === 'overnight'
                        ? 'border-[#073D2B] bg-[#073D2B]/5 font-semibold'
                        : 'border-[#073D2B]/10 bg-white'
                    }`}
                  >
                    <p className="text-[#15233B]">Priority Overnight</p>
                    <p className="text-[11px] text-[#073D2B]">+$24.95</p>
                    <span className="text-[10px] text-[#15233B]/60">Guaranteed Dec 23</span>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-[#073D2B]/10">
                <label className="block text-[11px] font-semibold text-[#073D2B] uppercase tracking-wider">
                  3. Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#073D2B] bg-[#073D2B] text-white'
                        : 'border-[#073D2B]/15 bg-white text-[#15233B]'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'applepay'
                        ? 'border-[#073D2B] bg-[#073D2B] text-white'
                        : 'border-[#073D2B]/15 bg-white text-[#15233B]'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'border-[#073D2B] bg-[#073D2B] text-white'
                        : 'border-[#073D2B]/15 bg-white text-[#15233B]'
                    }`}
                  >
                    <span>Klarna (4x)</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-white rounded-lg border border-[#073D2B]/15 space-y-2">
                    <div>
                      <label className="block text-[10px] text-[#15233B]/60 uppercase font-semibold">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        readOnly
                        className="w-full text-xs font-mono font-bold text-[#15233B] bg-transparent outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] text-[#15233B]/60 uppercase font-semibold">
                          Expires
                        </label>
                        <input
                          type="text"
                          value={formData.expDate}
                          readOnly
                          className="w-full text-xs font-mono text-[#15233B] bg-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#15233B]/60 uppercase font-semibold">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          readOnly
                          className="w-full text-xs font-mono text-[#15233B] bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary and Place Order */}
              <div className="pt-4 border-t border-[#073D2B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-xs text-[#15233B]/60 block">Order Total:</span>
                  <span className="text-2xl font-bold font-mono text-[#073D2B] tabular-nums">
                    {formatUSD(currentFinalTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#B51225] hover:bg-[#8F0D1C] text-white py-3.5 px-8 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize &amp; Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
