import React, { useState } from 'react';
import { Sparkles, Truck, Clock, X, ChevronRight } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenGiftFinder: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenGiftFinder }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Holiday announcements" className="bg-[#04261B] text-[#FAF7F0] border-b border-[#0d543d]/40 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* US Market & Shipping Promise */}
        <div className="hidden lg:flex items-center gap-3 text-[#D8AF62]">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Truck className="w-3.5 h-3.5 text-[#D8AF62]" aria-hidden="true" />
            <span>Free US Shipping over $49</span>
          </span>
          <span className="text-white/20" aria-hidden="true">|</span>
          <span className="text-[#FAF7F0]/80">Guaranteed Christmas Eve Delivery for orders by Dec 18</span>
        </div>

        {/* Center Promos / Copy Code */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 text-[#FAF7F0] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#D8AF62]" aria-hidden="true" />
            <span>The Holiday Gift Edit</span>
          </span>
          <span className="hidden sm:inline text-[#FAF7F0]/70">— Take 25% off with code</span>
          <span className="font-mono bg-[#073D2B] text-[#D8AF62] px-2 py-0.5 rounded border border-[#D8AF62]/30 font-semibold tracking-wider">
            MERRY25
          </span>
          <button
            onClick={onOpenGiftFinder}
            className="hidden md:inline-flex items-center gap-1 text-[#D8AF62] hover:text-[#F4DBA3] font-medium underline underline-offset-4 ml-2 transition-colors cursor-pointer"
          >
            <span>Gift Finder Quiz</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Currency & Dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[#FAF7F0]/70 text-[11px] font-medium">
            <span>Ship to:</span>
            <span className="font-semibold text-[#FAF7F0]">US ($ USD)</span>
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss holiday announcement"
            className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
