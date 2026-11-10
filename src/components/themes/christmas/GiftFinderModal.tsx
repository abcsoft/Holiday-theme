import React, { useState } from 'react';
import { X, Gift, Sparkles, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { HOLIDAY_PRODUCTS } from '../../../data/holidayCatalog';
import { Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onQuickView,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [recipient, setRecipient] = useState<string>('her');
  const [budget, setBudget] = useState<string>('under-50');
  const [vibe, setVibe] = useState<string>('cozy');

  if (!isOpen) return null;

  // Filter products based on selected criteria
  const matchedProducts = HOLIDAY_PRODUCTS.filter((p) => {
    const matchesRecipient = !p.recipients || p.recipients.includes(recipient as any);
    const matchesBudget = budget === 'all' || p.budgetTier === budget;
    return matchesRecipient && matchesBudget;
  });

  const finalMatches = matchedProducts.length > 0 ? matchedProducts.slice(0, 3) : HOLIDAY_PRODUCTS.slice(0, 3);

  const handleReset = () => {
    setStep(1);
    setRecipient('her');
    setBudget('under-50');
    setVibe('cozy');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <div className="relative z-10 inline-block align-bottom bg-[#FAF7F0] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-[#073D2B]/10">
          {/* Header */}
          <div className="p-5 bg-[#073D2B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#D8AF62]" />
              <h2 className="text-lg font-serif font-bold text-[#FAF7F0]">
                Holiday Gift Concierge Quiz
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close gift quiz"
              className="text-white/70 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Recipient */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                    Step 1 of 3
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#073D2B] mt-1">
                    Who are you shopping for this holiday?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'her', label: 'For Her', desc: 'Luxury throws, fragrances & jewelry' },
                    { id: 'him', label: 'For Him', desc: 'Cashmere woolens, mulling spices' },
                    { id: 'hostess', label: 'The Gracious Hostess', desc: 'Gourmet hampers & glass barware' },
                    { id: 'home', label: 'The Family & Hearth', desc: 'Cedar wreaths & tree ornaments' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecipient(opt.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        recipient === opt.id
                          ? 'border-[#073D2B] bg-[#073D2B] text-white shadow-xs'
                          : 'border-[#073D2B]/10 bg-white text-[#15233B] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.label}</p>
                      <p className={`text-[10px] mt-0.5 ${recipient === opt.id ? 'text-white/80' : 'text-[#15233B]/60'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-[#B51225] hover:bg-[#8F0D1C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Next: Select Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                    Step 2 of 3
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#073D2B] mt-1">
                    What is your target budget for this gift?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'under-25', label: 'Under $25', desc: 'Stocking stuffers & small treasures' },
                    { id: 'under-50', label: 'Under $50', desc: 'Artisan candles & glass bauble sets' },
                    { id: 'under-100', label: 'Under $100', desc: 'Evergreen wreaths & gourmet hampers' },
                    { id: 'luxury-150', label: 'Luxury Splurge ($150+)', desc: 'Scottish cashmere & brass lanterns' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBudget(opt.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        budget === opt.id
                          ? 'border-[#073D2B] bg-[#073D2B] text-white shadow-xs'
                          : 'border-[#073D2B]/10 bg-white text-[#15233B] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.label}</p>
                      <p className={`text-[10px] mt-0.5 ${budget === opt.id ? 'text-white/80' : 'text-[#15233B]/60'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-[#073D2B] hover:underline"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#B51225] hover:bg-[#8F0D1C] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Next: Choose Vibe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Vibe */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                    Step 3 of 3
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#073D2B] mt-1">
                    What holiday aesthetic do they cherish?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cozy', label: 'Cozy Fireside Hearth', desc: 'Blankets, amber candles, mulled wine' },
                    { id: 'heirloom', label: 'Classic Victorian Heirloom', desc: 'Mouth-blown glass ornaments with 24k gold' },
                    { id: 'gourmet', label: 'Artisanal Gourmet Treat', desc: 'Spiced Vermont honey & gold truffles' },
                    { id: 'festive', label: 'Festive Natural Greenery', desc: 'Preserved cedar wreaths & eucalyptus' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVibe(opt.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        vibe === opt.id
                          ? 'border-[#073D2B] bg-[#073D2B] text-white shadow-xs'
                          : 'border-[#073D2B]/10 bg-white text-[#15233B] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <p className="font-semibold text-xs">{opt.label}</p>
                      <p className={`text-[10px] mt-0.5 ${vibe === opt.id ? 'text-white/80' : 'text-[#15233B]/60'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-[#073D2B] hover:underline"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-[#073D2B] hover:bg-[#04261B] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D8AF62]" />
                    <span>See Matched Gifts</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                      Concierge Curated Matches
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#073D2B] mt-0.5">
                      Tailored Holiday Recommendations
                    </h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-[#073D2B] hover:underline cursor-pointer"
                  >
                    Restart Quiz
                  </button>
                </div>

                <div className="space-y-3">
                  {finalMatches.map((product) => (
                    <div
                      key={product.id}
                      className="p-3.5 bg-white rounded-xl border border-[#073D2B]/10 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1"
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover bg-[#FAF7F0] border border-[#073D2B]/5"
                        />
                        <div>
                          <span className="text-[10px] text-[#073D2B] font-semibold uppercase block">
                            {product.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#15233B] line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-[#073D2B] tabular-nums">
                            {formatUSD(product.price)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onClose();
                        }}
                        className="bg-[#073D2B] hover:bg-[#04261B] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D8AF62]" />
                        <span>Add</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#15233B]/60">
                    All gifts arrive in our signature archival gift box with guaranteed Christmas Eve delivery.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
