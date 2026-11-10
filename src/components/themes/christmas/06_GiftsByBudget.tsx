import React from 'react';
import { Sparkles, DollarSign, Gift, ArrowRight } from 'lucide-react';

interface GiftsByBudgetProps {
  activeBudget: string;
  onSelectBudget: (budgetTier: string) => void;
  onOpenGiftFinder: () => void;
}

export const GiftsByBudget: React.FC<GiftsByBudgetProps> = ({
  activeBudget,
  onSelectBudget,
  onOpenGiftFinder,
}) => {
  const budgetOptions = [
    { id: 'all', label: 'All Budgets', sub: 'Explore full catalog' },
    { id: 'under-25', label: 'Gifts Under $25', sub: 'Stocking stuffers & small joys' },
    { id: 'under-50', label: 'Gifts Under $50', sub: 'Hostess gifts & glass baubles' },
    { id: 'under-100', label: 'Gifts Under $100', sub: 'Artisan hampers & wreaths' },
    { id: 'luxury-150', label: 'Splurges $150+', sub: 'Cashmere & solid brass lanterns' },
  ];

  const recipientTags = [
    { label: 'Gifts for Her', icon: '🎁' },
    { label: 'Gifts for Him', icon: '🌲' },
    { label: 'Hostess & Entertaining', icon: '✨' },
    { label: 'Family & Hearth', icon: '🕯️' },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#073D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center justify-center gap-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Effortless Holiday Gifting</span>
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#073D2B]">
            Find the Perfect Gift by Budget
          </h2>
          <p className="text-sm text-[#15233B]/70">
            Thoughtfully priced for every person on your list. Every gift qualifies for complimentary holiday gift wrapping.
          </p>
        </div>

        {/* Budget Cards / Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {budgetOptions.map((opt) => {
            const isSelected = activeBudget === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectBudget(opt.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#073D2B] text-white border-[#073D2B] shadow-md scale-[1.02]'
                    : 'bg-[#FAF7F0] text-[#15233B] border-[#073D2B]/10 hover:border-[#073D2B]/30 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold tracking-tight">
                      {opt.label}
                    </span>
                    <DollarSign
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-[#D8AF62]' : 'text-[#073D2B]/50'
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[11px] leading-snug ${
                      isSelected ? 'text-white/80' : 'text-[#15233B]/60'
                    }`}
                  >
                    {opt.sub}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold">
                  <span className={isSelected ? 'text-[#D8AF62]' : 'text-[#073D2B]'}>
                    {isSelected ? 'Viewing' : 'Shop'}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Concierge Banner Link */}
        <div className="mt-8 p-4 rounded-xl bg-[#FAF7F0] border border-[#D8AF62]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#073D2B] text-[#D8AF62] flex items-center justify-center shrink-0 font-serif text-lg">
              ✨
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#073D2B]">
                Stuck choosing? Let our Holiday Gift Concierge match your list.
              </h4>
              <p className="text-xs text-[#15233B]/70">
                Answer 3 quick questions about recipient and vibe to get instant curated recommendations.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenGiftFinder}
            className="bg-[#B51225] hover:bg-[#8F0D1C] text-white px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
          >
            <span>Launch Gift Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
