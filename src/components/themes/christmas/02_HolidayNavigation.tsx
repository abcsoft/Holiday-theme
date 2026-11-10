import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Gift, Menu, X, Sparkles } from 'lucide-react';

interface HolidayNavigationProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenGiftFinder: () => void;
  onSelectCategory: (category: string) => void;
}

export const HolidayNavigation: React.FC<HolidayNavigationProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenGiftFinder,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Glass Ornaments', category: 'Ornaments' },
    { label: 'Cozy Cashmere', category: 'Cozy Apparel' },
    { label: 'Holiday Hearth', category: 'Home & Hearth' },
    { label: 'Gourmet Treats', category: 'Gourmet Treats' },
    { label: 'Gift Bundles', category: 'Bundles' },
  ];

  const handleNavClick = (category: string) => {
    onSelectCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#073D2B]/10 transition-shadow">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-[#073D2B] hover:text-[#B51225] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <a
          href="#home"
          className="flex items-baseline gap-1.5 sm:gap-2 text-xl sm:text-3xl font-serif font-bold text-[#073D2B] tracking-tight whitespace-nowrap shrink-0 hover:text-[#04261B] transition-colors"
        >
          <span>AitoBazar</span>
          <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest text-[#B51225] font-semibold">
            Holiday
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#15233B]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.category)}
              className="text-[#15233B]/80 hover:text-[#B51225] transition-colors hover:underline underline-offset-8 decoration-1 decoration-[#B51225] whitespace-nowrap shrink-0 cursor-pointer font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onOpenGiftFinder}
            className="flex items-center gap-1.5 text-[#073D2B] hover:text-[#B51225] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Gift className="w-4 h-4 text-[#D8AF62]" />
            <span>Gift Concierge</span>
          </button>
        </nav>

        {/* Zone 3: Primary interactive controls & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search holiday products"
            className="p-1.5 sm:p-2 text-[#15233B]/80 hover:text-[#073D2B] transition-colors rounded-full hover:bg-[#073D2B]/5 cursor-pointer"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            aria-label={`Wishlist with ${wishlistCount} saved items`}
            className="relative p-1.5 sm:p-2 text-[#15233B]/80 hover:text-[#B51225] transition-colors rounded-full hover:bg-[#B51225]/5 cursor-pointer"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 rounded-full bg-[#B51225] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#073D2B] text-white px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg hover:bg-[#04261B] transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8AF62]" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">Bag</span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D8AF62] text-[#04261B] text-[11px] sm:text-xs font-bold flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F0] border-b border-[#073D2B]/10 px-4 pt-3 pb-6 space-y-3">
          <p className="text-xs uppercase tracking-wider text-[#073D2B]/70 font-semibold px-2">
            Christmas Collections
          </p>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.category)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#15233B] hover:bg-[#073D2B]/5 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenGiftFinder();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#073D2B] hover:bg-[#073D2B]/5 rounded-md flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#D8AF62]" />
              <span>Holiday Gift Concierge Quiz</span>
            </button>
          </div>
          <div className="pt-3 border-t border-[#073D2B]/10 flex items-center justify-between px-2 text-xs text-[#15233B]/70">
            <span>Currency: USD ($)</span>
            <span className="text-[#073D2B] font-medium">Free US Shipping &gt; $49</span>
          </div>
        </div>
      )}
    </header>
  );
};
