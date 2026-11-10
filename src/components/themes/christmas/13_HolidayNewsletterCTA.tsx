import React, { useState } from 'react';
import { Mail, Sparkles, Check, ArrowRight, Gift } from 'lucide-react';

interface HolidayNewsletterCTAProps {
  onApplyDiscount: (code: string) => void;
}

export const HolidayNewsletterCTA: React.FC<HolidayNewsletterCTAProps> = ({ onApplyDiscount }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `HOLIDAY10`;
    setGeneratedCode(code);
    setSubscribed(true);
    onApplyDiscount(code);
  };

  return (
    <section className="py-20 bg-[#073D2B] text-[#FAF7F0] relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute bottom-0 right-10 w-96 h-96 bg-[#D8AF62]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D8AF62]">
          <Gift className="w-3.5 h-3.5" />
          <span>The AitoBazar Holiday Circle</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF7F0] tracking-tight">
          Give Wonder. Enjoy 10% Off Your First Holiday Order.
        </h2>

        <p className="text-sm sm:text-base text-[#FAF7F0]/80 max-w-xl mx-auto leading-relaxed">
          Join our seasonal insider list to receive early access to limited heirloom ornament batches, private shopping hours, and complimentary gift wrap.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-[#04261B] border border-white/20 rounded-lg pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D8AF62] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#B51225] hover:bg-[#8F0D1C] text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <span>Get 10% Off</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="bg-[#04261B] border border-[#D8AF62]/40 rounded-2xl p-6 max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>Welcome to the Holiday Circle!</span>
            </div>
            <p className="text-xs text-[#FAF7F0]/80">
              Your 10% savings coupon has been auto-applied to your shopping bag:
            </p>
            <div className="font-mono text-xl font-bold text-[#D8AF62] tracking-widest bg-[#073D2B] py-2 px-4 rounded-lg inline-block border border-[#D8AF62]/30">
              {generatedCode}
            </div>
            <p className="text-[11px] text-[#FAF7F0]/60">
              Check your bag to see your updated total with discount and free shipping threshold.
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 text-[11px] text-[#FAF7F0]/60 pt-2">
          <span>No spam, ever</span>
          <span aria-hidden="true">·</span>
          <span>Unsubscribe anytime</span>
          <span aria-hidden="true">·</span>
          <span>Privacy guaranteed</span>
        </div>
      </div>
    </section>
  );
};
