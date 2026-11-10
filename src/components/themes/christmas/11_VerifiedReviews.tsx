import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { VERIFIED_REVIEWS } from '../../../data/holidayCatalog';

export const VerifiedReviews: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews =
    filterRating === 'all'
      ? VERIFIED_REVIEWS
      : VERIFIED_REVIEWS.filter((r) => r.rating === filterRating);

  return (
    <section className="py-16 bg-white border-b border-[#073D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real Customer Stories</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#073D2B] mt-1">
              Loved by Holiday Givers Across America
            </h2>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-[#073D2B] text-white'
                  : 'bg-[#FAF7F0] text-[#15233B]/70 hover:bg-[#FAF7F0]/80'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                filterRating === 5
                  ? 'bg-[#073D2B] text-white'
                  : 'bg-[#FAF7F0] text-[#15233B]/70 hover:bg-[#FAF7F0]/80'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current text-[#D8AF62]" />
              <span>5 Stars Only</span>
            </button>
          </div>
        </div>

        {/* Reviews 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF7F0] rounded-xl p-5 border border-[#073D2B]/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#D8AF62]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <h3 className="text-sm font-bold text-[#15233B]">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-[#15233B]/80 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* Author & Verification Info */}
              <div className="pt-3 border-t border-[#073D2B]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#15233B]">
                    {rev.author}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#073D2B]">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#15233B]/60">
                  <span>{rev.location}</span>
                  <span>{rev.date}</span>
                </div>
                <p className="text-[10px] text-[#073D2B] font-medium pt-0.5 line-clamp-1">
                  Item: {rev.purchasedItem}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
