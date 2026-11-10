import React from 'react';
import { Sparkles, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface TrendingRecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const TrendingRecommendations: React.FC<TrendingRecommendationsProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  // Highlight top 4 trending or staff pick items
  const trendingItems = products.slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF7F0] border-b border-[#073D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Holiday Favorites</span>
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#073D2B] mt-1">
              Trending Gifts of the Season
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#15233B]/70 max-w-sm">
            Most-requested items trending across US holiday wishlists this week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-[#073D2B]/10 p-4 flex flex-col justify-between card-holiday shadow-xs hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="aspect-square rounded-lg overflow-hidden relative bg-[#FAF7F0] cursor-pointer" onClick={() => onQuickView(item)}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    width={280}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#073D2B] text-[#D8AF62] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-mono shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-[#15233B]/60 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3
                    onClick={() => onQuickView(item)}
                    className="text-sm font-semibold text-[#15233B] hover:text-[#B51225] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#D8AF62] text-xs mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-[#15233B] font-mono tabular-nums">
                      {item.rating}
                    </span>
                    <span className="text-[#15233B]/50 tabular-nums">
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#073D2B]/5 flex items-center justify-between">
                <span className="font-bold font-mono text-base text-[#073D2B] tabular-nums">
                  {formatUSD(item.price)}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onQuickView(item)}
                    aria-label={`Quick view ${item.name}`}
                    className="p-2 text-[#15233B]/70 hover:text-[#073D2B] rounded-lg border border-[#073D2B]/10 hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onAddToCart(item)}
                    aria-label={`Add ${item.name} to bag`}
                    className="bg-[#073D2B] hover:bg-[#04261B] text-white p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D8AF62]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
