import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../../../types/commerce';
import { formatUSD } from '../../../utils/cartCalculations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Your saved holiday wishlist"
          className="w-screen max-w-md bg-[#FAF7F0] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#073D2B]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B51225] fill-[#B51225]" />
              <h2 className="text-lg font-serif font-bold text-[#073D2B]">
                Saved Holiday Gifts
              </h2>
              <span className="text-xs bg-[#B51225]/10 text-[#B51225] font-mono px-2 py-0.5 rounded-full font-bold">
                {wishlistProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#15233B]/60 hover:text-[#073D2B] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#B51225]/5 text-[#B51225] flex items-center justify-center mx-auto text-2xl">
                  ❤️
                </div>
                <h3 className="text-base font-serif font-bold text-[#15233B]">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#15233B]/60 max-w-xs mx-auto">
                  Click the heart icon on any ornament, blanket or gift set to save it for your holiday gift list.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 bg-white rounded-xl border border-[#073D2B]/10 shadow-xs items-center justify-between"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#FAF7F0] shrink-0 border border-[#073D2B]/5"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] text-[#073D2B] font-semibold uppercase block">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-semibold text-[#15233B] truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold font-mono text-[#073D2B] tabular-nums mt-0.5 block">
                      {formatUSD(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="bg-[#073D2B] hover:bg-[#04261B] text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Move to shopping bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D8AF62]" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-[#15233B]/40 hover:text-[#B51225] rounded-lg transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
