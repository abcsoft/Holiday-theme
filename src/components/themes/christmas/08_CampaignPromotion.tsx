import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_BANNER_IMAGE, CAMPAIGN_BANNER_IMAGE_MOBILE } from '../../../data/holidayCatalog';

interface CampaignPromotionProps {
  onShopCampaign: () => void;
  onApplyCoupon: (code: string) => void;
}

export const CampaignPromotion: React.FC<CampaignPromotionProps> = ({
  onShopCampaign,
  onApplyCoupon,
}) => {
  const [copied, setCopied] = useState(false);

  // Live countdown timer to Christmas Shipping Cutoff (Dec 18, 23:59:59 EST)
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.('MERRY25');
    onApplyCoupon('MERRY25');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 bg-[#04261B] text-[#FAF7F0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#D8AF62]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#073D2B] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D8AF62]/20 shadow-2xl">
          {/* Campaign Details Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D8AF62]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Holiday Promotion · Ends Soon</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF7F0] leading-tight">
              The Evergreen Edit: Take 25% Off Handcrafted Gifts.
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F0]/85 max-w-lg leading-relaxed">
              Order now to guarantee delivery under the tree by Christmas Eve. Includes complimentary archival gift packaging and our bespoke calligraphy gift card.
            </p>

            {/* Countdown Clock */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#D8AF62] font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Christmas Delivery Cutoff Timer:</span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.minutes },
                  { label: 'Secs', val: timeLeft.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center bg-[#04261B] border border-white/10 rounded-xl px-3.5 py-2 min-w-[62px]"
                  >
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#FAF7F0] tabular-nums">
                      {String(unit.val).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase font-sans text-[#FAF7F0]/60 tracking-wider">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Copy Module & CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center bg-[#04261B] rounded-lg border border-[#D8AF62]/40 px-3.5 py-2.5 gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase text-[#FAF7F0]/60 block font-semibold">
                    Promo Code
                  </span>
                  <span className="font-mono text-base font-bold text-[#D8AF62] tracking-wider">
                    MERRY25
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="bg-[#073D2B] hover:bg-[#0d543d] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={onShopCampaign}
                className="bg-[#B51225] hover:bg-[#8F0D1C] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Shop Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#FAF7F0]/70 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D8AF62]" />
              <span>Free standard US shipping automatically applies over $49.</span>
            </div>
          </div>

          {/* Campaign Image Right */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/10 group">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={CAMPAIGN_BANNER_IMAGE_MOBILE} type="image/webp" />
                <source srcSet={CAMPAIGN_BANNER_IMAGE} type="image/webp" />
                <img
                  src={CAMPAIGN_BANNER_IMAGE}
                  alt="Evergreen pine wreath, gold velvet ribbon, brass candle lanterns, wrapped artisan gift parcels"
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/15 text-xs text-white">
                <span className="font-semibold block">The Evergreen Hearth Wreath &amp; Lantern</span>
                <span className="text-[11px] text-[#D8AF62]">Hand-assembled with preserved Pacific cedar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
