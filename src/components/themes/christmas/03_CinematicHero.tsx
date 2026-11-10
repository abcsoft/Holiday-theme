import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Gift } from 'lucide-react';
import { HERO_IMAGE, HERO_IMAGE_MOBILE } from '../../../data/holidayCatalog';

interface CinematicHeroProps {
  onShopGiftsClick: () => void;
  onExploreCollectionsClick: () => void;
  onOpenGiftFinder: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onShopGiftsClick,
  onExploreCollectionsClick,
  onOpenGiftFinder,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const [isDesktopCapable, setIsDesktopCapable] = useState(false);

  useEffect(() => {
    // Only enable mouse movement on desktop pointers without reduced motion
    const checkCapability = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktopCapable(hasFinePointer && !prefersReducedMotion);
    };

    checkCapability();
    window.addEventListener('resize', checkCapability);
    return () => window.removeEventListener('resize', checkCapability);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktopCapable || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized between -0.5 and +0.5
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      setOffsets({ x: normX, y: normY });
    },
    [isDesktopCapable]
  );

  const handleMouseLeave = useCallback(() => {
    setOffsets({ x: 0, y: 0 });
  }, []);

  // Subtle transform calculations for desktop depth
  const glowTransform = isDesktopCapable
    ? `translate3d(${offsets.x * -24}px, ${offsets.y * -24}px, 0)`
    : 'none';
  const textTransform = isDesktopCapable
    ? `translate3d(${offsets.x * -6}px, ${offsets.y * -6}px, 0)`
    : 'none';
  const frameTransform = isDesktopCapable
    ? `perspective(1000px) rotateY(${offsets.x * 6}deg) rotateX(${-offsets.y * 6}deg) translate3d(${offsets.x * 10}px, ${offsets.y * 10}px, 0)`
    : 'none';
  const badgeTransform = isDesktopCapable
    ? `translate3d(${offsets.x * 16}px, ${offsets.y * 16}px, 20px)`
    : 'none';

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#073D2B] text-[#FAF7F0] pt-12 pb-16 lg:py-24 select-none"
    >
      {/* Layer 1: Ambient Holiday Glows with depth shift */}
      <div
        className="absolute top-0 right-1/4 w-[520px] h-[520px] bg-[#D8AF62]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: glowTransform }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-[420px] h-[420px] bg-[#B51225]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: glowTransform }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Layer 2: Left Column - Editorial Headline & Actions */}
          <div
            className="lg:col-span-7 space-y-6 text-left transition-transform duration-300 ease-out"
            style={{ transform: textTransform }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D8AF62]">
              <Sparkles className="w-3.5 h-3.5 shimmer-gold" aria-hidden="true" />
              <span>The 2025 Holiday Collection · Handcrafted in Small Batches</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF7F0] tracking-tight leading-[1.1] text-balance">
              Celebrate the Season with Timeless Heirlooms.
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F0]/85 font-normal max-w-xl leading-relaxed">
              Discover authentic European mouth-blown glass ornaments, pure Scottish cashmere throws, and artisanal New England holiday gourmet hampers crafted for unforgettable fireside moments.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopGiftsClick}
                className="bg-[#B51225] hover:bg-[#8F0D1C] text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-xl hover:translate-y-[-2px] flex items-center gap-2.5 active:scale-98 cursor-pointer"
              >
                <span>Shop Christmas Gifts</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCollectionsClick}
                className="bg-transparent hover:bg-white/10 text-[#FAF7F0] border border-[#FAF7F0]/30 hover:border-[#FAF7F0] px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer hover:translate-y-[-2px]"
              >
                <span>Explore Collections</span>
              </button>

              <button
                onClick={onOpenGiftFinder}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#D8AF62] hover:text-[#F4DBA3] hover:underline underline-offset-4 py-2 cursor-pointer transition-colors"
              >
                <Gift className="w-4 h-4" />
                <span>Need ideas? Try our 60-second Gift Quiz</span>
              </button>
            </div>

            {/* Quiet Trust Adjacency Proof */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#FAF7F0]/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D8AF62]" />
                <span>Guaranteed Christmas Delivery</span>
              </div>
              <span className="text-white/20" aria-hidden="true">·</span>
              <div>
                <span>Complimentary Holiday Gift Box with Satin Ribbon</span>
              </div>
              <span className="text-white/20" aria-hidden="true">·</span>
              <div className="tabular-nums font-mono text-[#D8AF62]">
                4.9/5 ★ from 2,400+ Verified US Givers
              </div>
            </div>
          </div>

          {/* Layer 3: Right Column - 3D Parallax Lifestyle Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle ornamental gold ambient background glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#D8AF62]/40 via-transparent to-[#B51225]/30 -z-10 blur-md opacity-80" />

              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#04261B] aspect-[4/3] sm:aspect-[16/11] transition-transform duration-300 ease-out"
                style={{ transform: frameTransform }}
              >
                <picture className="w-full h-full block">
                  <source media="(max-width: 640px)" srcSet={HERO_IMAGE_MOBILE} type="image/webp" />
                  <source srcSet={HERO_IMAGE} type="image/webp" />
                  <img
                    src={HERO_IMAGE}
                    alt="Warmly lit American living room decorated for Christmas with fireside hearth, evergreen tree, and wrapped gifts"
                    width={640}
                    height={440}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transform hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </picture>

                {/* Scrim overlay for crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04261B]/85 via-[#04261B]/20 to-transparent pointer-events-none" />

                {/* Floating Micro-Badge with distinct depth elevation */}
                <div
                  className="absolute bottom-4 left-4 right-4 bg-[#073D2B]/90 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center justify-between text-xs shadow-lg transition-transform duration-200 ease-out glow-warm"
                  style={{ transform: badgeTransform }}
                >
                  <div>
                    <p className="font-semibold text-[#FAF7F0] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8AF62]" aria-hidden="true" />
                      <span>The Fireside Hearth Hamper</span>
                    </p>
                    <p className="text-[11px] text-[#D8AF62]">Limited batch of 250 curated boxes</p>
                  </div>
                  <span className="font-mono text-[#FAF7F0] font-bold text-sm tabular-nums">
                    $165 USD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
