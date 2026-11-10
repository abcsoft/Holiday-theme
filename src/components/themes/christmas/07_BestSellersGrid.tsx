import React, { useState, useMemo } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface BestSellersGridProps {
  products: Product[];
  activeCategory: string;
  activeBudget: string;
  wishlistIds: string[];
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const BestSellersGrid: React.FC<BestSellersGridProps> = ({
  products,
  activeCategory,
  activeBudget,
  wishlistIds,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}) => {
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleProductAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  const categories = [
    'All',
    'Ornaments',
    'Cozy Apparel',
    'Home Fragrance',
    'Gourmet Treats',
    'Home & Hearth',
  ];

  // Filter products by category and budget tier (memoized for high INP/responsiveness)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' ||
        activeCategory === 'Bundles' ||
        p.category === activeCategory;
      const matchesBudget =
        activeBudget === 'all' || p.budgetTier === activeBudget;
      return matchesCategory && matchesBudget;
    });
  }, [products, activeCategory, activeBudget]);

  return (
    <section id="catalog" className="py-16 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Holiday Catalog</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#073D2B] mt-1">
              Best-Selling Christmas Gifts
            </h2>
          </div>

          {/* Category Filter Tabs (Interactive buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#073D2B] text-white shadow-xs'
                      : 'bg-white text-[#15233B]/70 hover:text-[#073D2B] border border-[#073D2B]/10 hover:border-[#073D2B]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty state if filters leave zero products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#073D2B]/10 p-8 max-w-lg mx-auto">
            <p className="text-base font-semibold text-[#15233B]">
              No gifts found for this budget & category combination
            </p>
            <p className="text-xs text-[#15233B]/60 mt-1">
              Try choosing "All" or resetting your budget filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-[#073D2B] text-white text-xs font-semibold rounded-lg hover:bg-[#04261B] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Responsive Product Grid: 2-col mobile, 3-col tablet, 3-4-col desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )
                : 0;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#073D2B]/10 shadow-xs hover:shadow-lg transition-all duration-300 card-holiday relative"
                >
                  {/* Product Image Area */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF7F0] relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={400}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#073D2B] text-[#FAF7F0] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs shimmer-gold border border-[#D8AF62]/40">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Action */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Save ${product.name} to wishlist`
                      }
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        isWishlisted
                          ? 'bg-[#B51225] text-white'
                          : 'bg-white/90 text-[#15233B]/70 hover:text-[#B51225] hover:bg-white'
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={isWishlisted ? 'currentColor' : 'none'}
                      />
                    </button>

                    {/* Quick View Button Hover Overlay */}
                    <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                      <button
                        onClick={() => onQuickView(product)}
                        className="w-full bg-[#15233B]/90 hover:bg-[#15233B] text-white backdrop-blur-xs py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D8AF62]" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details Area */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Quiet Unboxed Metadata: Category · Stock */}
                      <div className="flex items-center justify-between text-[11px] text-[#15233B]/60 mb-1">
                        <span>{product.category}</span>
                        {product.stockCount <= 8 ? (
                          <span className="text-[#B51225] font-semibold">
                            Only {product.stockCount} left
                          </span>
                        ) : (
                          <span className="text-[#073D2B] font-medium">In Stock</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-sm sm:text-base font-semibold text-[#15233B] hover:text-[#B51225] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#15233B]/70 mt-1 line-clamp-2">
                        {product.subtitle}
                      </p>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center text-[#D8AF62]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-xs font-semibold text-[#15233B] font-mono tabular-nums">
                          {product.rating}
                        </span>
                        <span className="text-xs text-[#15233B]/50 tabular-nums">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>

                    {/* Price & Add to Cart row */}
                    <div className="pt-2 border-t border-[#073D2B]/5 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-bold text-[#073D2B] font-mono tabular-nums">
                            {formatUSD(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#15233B]/40 line-through font-mono tabular-nums">
                              {formatUSD(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        {discountPercent > 0 && (
                          <span className="text-[10px] text-[#B51225] font-semibold">
                            Save {discountPercent}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleProductAddToCart(product)}
                        aria-label={addedProductId === product.id ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
                        className={`${
                          addedProductId === product.id
                            ? 'bg-[#0d543d] text-white scale-102'
                            : 'bg-[#073D2B] hover:bg-[#04261B] text-white'
                        } p-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow active:scale-95 transition-all duration-200 cursor-pointer min-w-[36px] justify-center`}
                      >
                        {addedProductId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#D8AF62]" />
                            <span className="hidden sm:inline text-white">Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#D8AF62]" />
                            <span className="hidden sm:inline">Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
