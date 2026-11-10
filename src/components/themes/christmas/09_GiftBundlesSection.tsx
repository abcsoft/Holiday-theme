import React, { useState } from 'react';
import { Gift, Check, Sparkles, ShoppingBag, Tag } from 'lucide-react';
import { HOLIDAY_BUNDLES, HOLIDAY_PRODUCTS } from '../../../data/holidayCatalog';
import { GiftBundle, Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface GiftBundlesSectionProps {
  onAddBundleToCart: (bundle: GiftBundle) => void;
  onAddToCart: (product: Product, note?: string) => void;
}

export const GiftBundlesSection: React.FC<GiftBundlesSectionProps> = ({
  onAddBundleToCart,
  onAddToCart,
}) => {
  const [monogramText, setMonogramText] = useState('VANCE');
  const [monogramAdded, setMonogramAdded] = useState(false);

  const personalizedStocking = HOLIDAY_PRODUCTS.find((p) => p.id === 'stk-01')!;

  const handleAddPersonalized = () => {
    onAddToCart(personalizedStocking, `Monogram: ${monogramText}`);
    setMonogramAdded(true);
    setTimeout(() => setMonogramAdded(false), 2500);
  };

  return (
    <section id="bundles" className="py-16 bg-white border-b border-[#073D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center justify-center gap-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Curated Sets &amp; Monograms</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#073D2B]">
            Holiday Gift Bundles &amp; Keepsakes
          </h2>
          <p className="text-sm text-[#15233B]/70">
            Artfully bundled with built-in savings. Delivered in our keepsake gift hampers with custom calligraphy gift cards.
          </p>
        </div>

        {/* 2-Column Bundles Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {HOLIDAY_BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-8 border border-[#073D2B]/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase font-semibold text-[#B51225] tracking-wider">
                    Curated Bundle
                  </span>
                  <span className="bg-[#B51225] text-white text-[11px] font-bold px-2.5 py-0.5 rounded font-mono">
                    {bundle.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#073D2B]">
                  {bundle.title}
                </h3>
                <p className="text-xs text-[#073D2B] font-medium mt-0.5">
                  {bundle.subtitle}
                </p>

                <p className="text-xs text-[#15233B]/80 mt-3 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Items Included list */}
                <div className="mt-5 space-y-2 pt-4 border-t border-[#073D2B]/10">
                  <p className="text-xs font-semibold text-[#15233B]">
                    Included in this box:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#15233B]/70">
                    {bundle.itemsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#073D2B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="mt-8 pt-4 border-t border-[#073D2B]/10 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-[#073D2B] tabular-nums">
                      {formatUSD(bundle.price)}
                    </span>
                    <span className="text-sm font-mono text-[#15233B]/40 line-through tabular-nums">
                      {formatUSD(bundle.originalPrice)}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#B51225] font-semibold">
                    Instant ${bundle.savings} bundle discount
                  </span>
                </div>

                <button
                  onClick={() => onAddBundleToCart(bundle)}
                  className="bg-[#073D2B] hover:bg-[#04261B] text-white px-5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8AF62]" />
                  <span>Add Entire Bundle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Personalized Keepsake Feature: Monogrammed Stocking */}
        <div className="bg-[#073D2B] text-[#FAF7F0] rounded-2xl p-6 sm:p-10 border border-[#D8AF62]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase font-semibold text-[#D8AF62] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Personalization</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF7F0]">
              Heirloom Velvet Stockings with Gold Monogram
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed">
              Crafted from heavyweight French cotton velvet with antique shearling cuffs. Personalize with your family name or initial in hand-stitched gold silk thread at no additional charge.
            </p>
          </div>

          {/* Interactive Monogram Preview & Add */}
          <div className="bg-[#04261B] p-5 rounded-xl border border-white/10 w-full lg:w-auto min-w-[300px] sm:min-w-[340px] space-y-4">
            <div>
              <label htmlFor="monogram-input" className="block text-[11px] uppercase font-semibold text-[#D8AF62] mb-1">
                Enter Monogram / Family Name:
              </label>
              <input
                id="monogram-input"
                type="text"
                maxLength={12}
                value={monogramText}
                onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                placeholder="E.G. VANCE"
                className="w-full bg-[#073D2B] border border-white/20 rounded-lg px-3 py-2 text-sm font-serif font-bold tracking-widest text-[#D8AF62] uppercase placeholder-white/30 focus:outline-none focus:border-[#D8AF62]"
              />
            </div>

            {/* Live Visual Preview Card */}
            <div className="p-3 bg-[#073D2B]/70 rounded-lg border border-dashed border-[#D8AF62]/40 text-center">
              <span className="text-[10px] text-[#FAF7F0]/60 uppercase block">Embroidery Preview:</span>
              <span className="font-serif text-lg font-bold text-[#D8AF62] tracking-widest mt-1 block">
                {monogramText.trim() || 'YOUR NAME'}
              </span>
            </div>

            <button
              onClick={handleAddPersonalized}
              className="w-full bg-[#B51225] hover:bg-[#8F0D1C] text-white py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
            >
              {monogramAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Personalized Stocking Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D8AF62]" />
                  <span>Add Stocking ({formatUSD(personalizedStocking.price)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
