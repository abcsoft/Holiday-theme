import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HOLIDAY_COLLECTIONS } from '../../../data/holidayCatalog';

interface ShopByCollectionProps {
  onSelectCollection: (filterKey: string) => void;
}

export const ShopByCollection: React.FC<ShopByCollectionProps> = ({ onSelectCollection }) => {
  return (
    <section id="collections" className="py-16 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B51225]" />
              <span>Curated Seasonal Edits</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#073D2B] mt-1">
              Shop by Christmas Collection
            </h2>
          </div>
          <p className="text-sm text-[#15233B]/70 max-w-md leading-relaxed">
            Explore heritage decor, warm highland textiles, and handcrafted gifts curated by our New England artisans.
          </p>
        </div>

        {/* 6-Collection Grid with Perspective 3D Transforms */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 card-perspective">
          {HOLIDAY_COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => onSelectCollection(col.filterKey)}
              className="group text-left flex flex-col bg-white rounded-xl overflow-hidden border border-[#073D2B]/10 shadow-xs hover:border-[#D8AF62]/50 transition-all duration-300 card-perspective-inner cursor-pointer relative"
            >
              {/* Subtle top velvet ribbon accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D8AF62]/40 to-transparent group-hover:via-[#B51225] transition-colors duration-300" />

              <div className="aspect-square w-full overflow-hidden bg-[#FAF7F0] relative">
                <img
                  src={col.image}
                  alt={col.title}
                  width={320}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04261B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 text-[#073D2B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm transform translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#15233B] group-hover:text-[#B51225] transition-colors line-clamp-1">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-[#15233B]/60 mt-0.5 line-clamp-1">
                    {col.tagline}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#073D2B]/5 text-[10px]">
                  <span className="font-semibold text-[#073D2B]">
                    {col.count}
                  </span>
                  <span className="text-[#D8AF62] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    View &rarr;
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
