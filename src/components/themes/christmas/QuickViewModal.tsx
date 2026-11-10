import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Heart, Check, Truck, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activePrice = selectedVariant?.price ?? product.price;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <div className="relative z-10 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-[#073D2B]/10">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              aria-label="Close product view"
              className="p-1.5 rounded-full bg-white/90 text-[#15233B] hover:bg-[#FAF7F0] shadow-xs cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 bg-[#FAF7F0]">
            {/* Left: Gallery */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#073D2B]/10 relative">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#073D2B] text-[#FAF7F0] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider font-mono">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple images */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                        selectedImage === idx ? 'border-[#073D2B]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#15233B]/60">
                  <span className="uppercase tracking-wider font-medium">{product.category}</span>
                  {product.stockCount <= 8 ? (
                    <span className="text-[#B51225] font-semibold">
                      Only {product.stockCount} left in stock - ships today
                    </span>
                  ) : (
                    <span className="text-[#073D2B] font-semibold">In Stock &amp; Ready to Ship</span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#073D2B]">
                  {product.name}
                </h3>

                <p className="text-xs text-[#073D2B] font-medium">
                  {product.subtitle}
                </p>

                {/* Star rating */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex text-[#D8AF62]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#15233B] font-mono tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#15233B]/60">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-bold font-mono text-[#073D2B] tabular-nums">
                    {formatUSD(activePrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-[#15233B]/40 line-through tabular-nums">
                      {formatUSD(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#15233B]/80 leading-relaxed pt-1">
                  {product.description}
                </p>

                {/* Variants selector if available */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[11px] font-semibold text-[#15233B]/70 uppercase">
                      Select Finish / Option:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedVariant?.id === v.id
                              ? 'bg-[#073D2B] text-white border-[#073D2B] shadow-xs'
                              : 'bg-white text-[#15233B] border-[#073D2B]/15 hover:border-[#073D2B]/40'
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="space-y-3 pt-3 border-t border-[#073D2B]/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#073D2B]/20 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-xs font-bold text-[#15233B] hover:bg-[#FAF7F0]"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-[#15233B]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-xs font-bold text-[#15233B] hover:bg-[#FAF7F0]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#B51225] hover:bg-[#8F0D1C] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D8AF62]" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#B51225] text-white border-[#B51225]'
                        : 'bg-white text-[#15233B]/70 border-[#073D2B]/15 hover:text-[#B51225]'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Trust guarantee bullets */}
                <div className="bg-white/80 p-3 rounded-xl border border-[#073D2B]/5 space-y-1 text-[11px] text-[#15233B]/75">
                  <div className="flex items-center gap-2 text-[#073D2B] font-medium">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free US delivery on orders over $49</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#073D2B]" />
                    <span>Guaranteed safe arrival in protective holiday gift box</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
