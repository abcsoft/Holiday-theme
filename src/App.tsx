import React, { useState } from 'react';
import { HOLIDAY_PRODUCTS, HOLIDAY_BUNDLES } from './data/holidayCatalog';
import { Product, ProductVariant, CartItem, GiftBundle } from './types/commerce';
import { validateCoupon } from './utils/cartCalculations';

// Christmas Theme Sections (src/components/themes/christmas/)
import { AnnouncementBar } from './components/themes/christmas/01_AnnouncementBar';
import { HolidayNavigation } from './components/themes/christmas/02_HolidayNavigation';
import { CinematicHero } from './components/themes/christmas/03_CinematicHero';
import { TrustBenefitsStrip } from './components/themes/christmas/04_TrustBenefitsStrip';
import { ShopByCollection } from './components/themes/christmas/05_ShopByCollection';
import { GiftsByBudget } from './components/themes/christmas/06_GiftsByBudget';
import { BestSellersGrid } from './components/themes/christmas/07_BestSellersGrid';
import { CampaignPromotion } from './components/themes/christmas/08_CampaignPromotion';
import { GiftBundlesSection } from './components/themes/christmas/09_GiftBundlesSection';
import { TrendingRecommendations } from './components/themes/christmas/10_TrendingRecommendations';
import { VerifiedReviews } from './components/themes/christmas/11_VerifiedReviews';
import { ShippingAndFAQ } from './components/themes/christmas/12_ShippingAndFAQ';
import { HolidayNewsletterCTA } from './components/themes/christmas/13_HolidayNewsletterCTA';
import { StructuredFooter } from './components/themes/christmas/14_StructuredFooter';

// Utilities & Critical UI
import { SnowfallEffect } from './components/themes/christmas/SnowfallEffect';
import { ScrollReveal } from './components/ui/ScrollReveal';

// Code-split non-critical Modals & Drawers (lazy-loaded on interaction)
const CartDrawer = React.lazy(() => import('./components/themes/christmas/CartDrawer').then(m => ({ default: m.CartDrawer })));
const CheckoutModal = React.lazy(() => import('./components/themes/christmas/CheckoutModal').then(m => ({ default: m.CheckoutModal })));
const QuickViewModal = React.lazy(() => import('./components/themes/christmas/QuickViewModal').then(m => ({ default: m.QuickViewModal })));
const GiftFinderModal = React.lazy(() => import('./components/themes/christmas/GiftFinderModal').then(m => ({ default: m.GiftFinderModal })));
const WishlistDrawer = React.lazy(() => import('./components/themes/christmas/WishlistDrawer').then(m => ({ default: m.WishlistDrawer })));
const SearchModal = React.lazy(() => import('./components/themes/christmas/SearchModal').then(m => ({ default: m.SearchModal })));
const ThemePreviewToolbar = React.lazy(() => import('./components/ThemePreviewToolbar').then(m => ({ default: m.ThemePreviewToolbar })));

export default function App() {
  // Theme State
  const [currentThemeId, setCurrentThemeId] = useState('christmas-premium');

  // Filter states
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeBudget, setActiveBudget] = useState<string>('all');

  // Cart State (Initialized with 1 item to showcase shipping progress & cart readiness)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-item-1',
      productId: HOLIDAY_PRODUCTS[0].id,
      product: HOLIDAY_PRODUCTS[0],
      selectedVariant: HOLIDAY_PRODUCTS[0].variants?.[0],
      quantity: 1,
    },
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('MERRY25');
  const [hasGiftWrap, setHasGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('Wishing you a warm and joyful Christmas!');

  // Wishlist State (Initialized with 1 item)
  const [wishlistIds, setWishlistIds] = useState<string[]>([HOLIDAY_PRODUCTS[1].id]);

  // Modal / Drawer visibility
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [giftFinderOpen, setGiftFinderOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Idle prefetching of interactive dialogs after critical paint
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefetch = () => {
      import('./components/themes/christmas/CartDrawer');
      import('./components/themes/christmas/QuickViewModal');
    };
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(prefetch, { timeout: 2500 });
    } else {
      setTimeout(prefetch, 2000);
    }
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, variant?: ProductVariant, quantity: number = 1, note?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (note) updated[existingIndex].giftNote = note;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        product,
        selectedVariant: variant ?? product.variants?.[0],
        quantity,
        giftNote: note,
      };
      return [...prev, newItem];
    });

    setCartOpen(true);
  };

  const handleAddBundleToCart = (bundle: GiftBundle) => {
    // Add each bundle product to cart
    bundle.products.forEach((prod) => {
      handleAddToCart(prod, undefined, 1, `Part of ${bundle.title}`);
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = (code: string) => {
    const result = validateCoupon(code);
    if (result.valid) {
      setAppliedCoupon(code.toUpperCase());
    }
    return result;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const wishlistProducts = HOLIDAY_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation / Scroll handlers
  const scrollToCatalog = (category?: string) => {
    if (category) setActiveCategory(category);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#FAF7F0] text-[#15233B] flex flex-col relative selection:bg-[#B51225] selection:text-white">
      {/* Decorative Snowfall (with prefers-reduced-motion safety) */}
      <SnowfallEffect />

      {/* 01. Slim Promotional Announcement Bar */}
      <AnnouncementBar onOpenGiftFinder={() => setGiftFinderOpen(true)} />

      {/* 02. Premium Responsive Navigation */}
      <HolidayNavigation
        cartCount={cartItemCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGiftFinder={() => setGiftFinderOpen(true)}
        onSelectCategory={(cat) => scrollToCatalog(cat)}
      />

      <main className="flex-1">
        {/* 03. Large Cinematic Christmas Hero */}
        <CinematicHero
          onShopGiftsClick={() => scrollToCatalog()}
          onExploreCollectionsClick={scrollToCollections}
          onOpenGiftFinder={() => setGiftFinderOpen(true)}
        />

        {/* 04. Shipping, Returns and Security Benefits */}
        <ScrollReveal>
          <TrustBenefitsStrip />
        </ScrollReveal>

        {/* 05. Shop by Christmas Collection */}
        <ScrollReveal>
          <ShopByCollection
            onSelectCollection={(filterKey) => scrollToCatalog(filterKey)}
          />
        </ScrollReveal>

        {/* 06. Curated Gift Collections by Budget */}
        <ScrollReveal>
          <GiftsByBudget
            activeBudget={activeBudget}
            onSelectBudget={(budgetTier) => {
              setActiveBudget(budgetTier);
              scrollToCatalog();
            }}
            onOpenGiftFinder={() => setGiftFinderOpen(true)}
          />
        </ScrollReveal>

        {/* 07. Best-Selling Christmas Products */}
        <ScrollReveal>
          <BestSellersGrid
            products={HOLIDAY_PRODUCTS}
            activeCategory={activeCategory}
            activeBudget={activeBudget}
            wishlistIds={wishlistIds}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            onAddToCart={(product) => handleAddToCart(product)}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        </ScrollReveal>

        {/* 08. Holiday Campaign Promotion */}
        <ScrollReveal>
          <CampaignPromotion
            onShopCampaign={() => scrollToCatalog()}
            onApplyCoupon={handleApplyCoupon}
          />
        </ScrollReveal>

        {/* 09. Gift Bundles and Personalized Gifts */}
        <ScrollReveal>
          <GiftBundlesSection
            onAddBundleToCart={handleAddBundleToCart}
            onAddToCart={(prod, note) => handleAddToCart(prod, undefined, 1, note)}
          />
        </ScrollReveal>

        {/* 10. Trending Gifts / Seasonal Recommendations */}
        <ScrollReveal>
          <TrendingRecommendations
            products={HOLIDAY_PRODUCTS}
            onAddToCart={(product) => handleAddToCart(product)}
            onQuickView={(product) => setQuickViewProduct(product)}
          />
        </ScrollReveal>

        {/* 11. Verified Customer Reviews */}
        <ScrollReveal>
          <VerifiedReviews />
        </ScrollReveal>

        {/* 12. Shipping Information and FAQ */}
        <ScrollReveal>
          <ShippingAndFAQ />
        </ScrollReveal>

        {/* 13. Final Holiday Shopping CTA */}
        <ScrollReveal>
          <HolidayNewsletterCTA onApplyDiscount={handleApplyCoupon} />
        </ScrollReveal>
      </main>

      {/* 14. Premium Structured Footer */}
      <StructuredFooter
        onSelectCategory={(cat) => scrollToCatalog(cat)}
        onOpenGiftFinder={() => setGiftFinderOpen(true)}
      />

      {/* Code-split Suspense Boundary for Modals & Drawers */}
      <React.Suspense fallback={null}>
        {/* Interactive Cart Drawer */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          appliedCoupon={appliedCoupon}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          onProceedToCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
          hasGiftWrap={hasGiftWrap}
          onToggleGiftWrap={setHasGiftWrap}
          giftNote={giftNote}
          onUpdateGiftNote={setGiftNote}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={cartItems}
          appliedCoupon={appliedCoupon}
          hasGiftWrap={hasGiftWrap}
          giftNote={giftNote}
          onOrderSuccess={() => {
            setCartItems([]);
            setHasGiftWrap(false);
            setGiftNote('');
          }}
        />

        {/* Quick View Modal */}
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(quickViewProduct.id)}
          />
        )}

        {/* Gift Finder Quiz Wizard */}
        {giftFinderOpen && (
          <GiftFinderModal
            isOpen={giftFinderOpen}
            onClose={() => setGiftFinderOpen(false)}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {/* Wishlist Drawer */}
        {wishlistOpen && (
          <WishlistDrawer
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
            wishlistProducts={wishlistProducts}
            onRemoveFromWishlist={handleToggleWishlist}
            onMoveToCart={handleMoveToCart}
          />
        )}

        {/* Instant Search Modal */}
        {searchOpen && (
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
          />
        )}

        {/* Storefront Theme Resolver & Architecture Preview Toolbar */}
        <ThemePreviewToolbar
          currentThemeId={currentThemeId}
          onSelectTheme={setCurrentThemeId}
        />
      </React.Suspense>
    </div>
  );
}
