import React, { useState } from 'react';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { HOLIDAY_PRODUCTS } from '../../../data/holidayCatalog';
import { Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickTerms = [
    'Glass Ornaments',
    'Cashmere Throw',
    'Noël Candle',
    'Gourmet Hamper',
    'Cedar Wreath',
    'Stocking',
  ];

  const searchResults = query.trim()
    ? HOLIDAY_PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen px-4 pt-16 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <div className="relative z-10 inline-block bg-[#FAF7F0] rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-[#073D2B]/10">
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#073D2B]/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#073D2B] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search holiday gifts, glass ornaments, cashmere throws, candles..."
              className="w-full text-sm sm:text-base text-[#15233B] placeholder-[#15233B]/40 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#15233B]/50 hover:text-[#15233B] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-1 rounded-lg text-[#15233B]/60 hover:text-[#073D2B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Quick search terms */}
            {!query && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-semibold text-[#073D2B] tracking-wider">
                  Popular Holiday Searches:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickTerms.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#073D2B]/10 hover:border-[#073D2B]/30 text-xs font-medium text-[#15233B] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {query && searchResults.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs text-[#15233B]/60 block font-medium">
                  {searchResults.length} {searchResults.length === 1 ? 'gift' : 'gifts'} found:
                </span>

                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-white rounded-xl border border-[#073D2B]/10 flex items-center justify-between gap-3 shadow-xs hover:border-[#073D2B]/30 transition-colors"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-[#FAF7F0] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-[#073D2B] uppercase font-semibold block">
                            {product.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#15233B] truncate">
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
                        className="bg-[#073D2B] hover:bg-[#04261B] text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D8AF62]" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {query && searchResults.length === 0 && (
              <div className="text-center py-8 text-xs text-[#15233B]/60 space-y-2">
                <p>No holiday gifts matching "{query}"</p>
                <p className="text-[11px]">
                  Try searching for "ornament", "cashmere", "candle", or "honey"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
