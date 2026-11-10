import React from 'react';
import { ShieldCheck, Heart, Mail, Phone, MapPin, Truck } from 'lucide-react';

interface StructuredFooterProps {
  onSelectCategory: (category: string) => void;
  onOpenGiftFinder: () => void;
}

export const StructuredFooter: React.FC<StructuredFooterProps> = ({
  onSelectCategory,
  onOpenGiftFinder,
}) => {
  return (
    <footer className="bg-[#04261B] text-[#FAF7F0] border-t border-[#0d543d]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block font-serif text-2xl font-bold text-[#FAF7F0] tracking-tight">
              AitoBazar <span className="text-xs uppercase font-sans text-[#D8AF62] font-semibold tracking-widest ml-1">Holiday</span>
            </a>
            <p className="text-xs text-[#FAF7F0]/70 leading-relaxed max-w-sm">
              Dedicated to preserving the romance of the American holiday season. We partner with multi-generational European glass artisans, Scottish weavers, and New England apothecaries to bring heirloom beauty into your home.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D8AF62] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#D8AF62]" />
              <span>Certified US Commerce · Safe &amp; Verified Delivery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#D8AF62] tracking-wider">
              Holiday Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/70">
              <li>
                <button
                  onClick={() => onSelectCategory('Ornaments')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Glass Tree Ornaments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Cozy Apparel')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Scottish Cashmere Throws
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Home Fragrance')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Noël Balsam Candles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Gourmet Treats')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Spiced Honey &amp; Truffles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Home & Hearth')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Preserved Cedar Wreaths
                </button>
              </li>
            </ul>
          </div>

          {/* Gifting & Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#D8AF62] tracking-wider">
              Gifting Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F0]/70">
              <li>
                <button
                  onClick={onOpenGiftFinder}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Holiday Gift Finder Quiz
                </button>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Curated Gift Hampers
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Personalized Velvet Stockings
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Corporate &amp; Group Gifting
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Extended Returns Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#D8AF62] tracking-wider">
              Holiday Concierge
            </h4>
            <div className="space-y-2 text-xs text-[#FAF7F0]/70">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8AF62]" />
                <span>1-800-AITO-BAZAR</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D8AF62]" />
                <span>concierge@aitobazar.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8AF62]" />
                <span>Boston, MA &amp; Portland, OR</span>
              </p>
              <p className="text-[11px] text-[#FAF7F0]/50 pt-1">
                Mon–Sun 8am–10pm EST through Christmas Eve
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods & Legal Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#FAF7F0]/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#FAF7F0]/70 mr-1">Accepted Payment Methods:</span>
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'PayPal', 'Klarna'].map((method) => (
              <span
                key={method}
                className="bg-[#073D2B] text-white px-2 py-0.5 rounded border border-white/15 text-[10px] font-semibold tracking-wider font-mono"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>© 2025 AitoBazar Inc. All rights reserved.</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span className="text-[#D8AF62] font-semibold">United States (USD $)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
