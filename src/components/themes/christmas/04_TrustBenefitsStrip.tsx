import React from 'react';
import { Truck, CalendarCheck, RotateCcw, ShieldCheck } from 'lucide-react';

export const TrustBenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Holiday Shipping',
      subtitle: 'On all US orders over $49',
      highlight: 'FedEx & UPS Express',
    },
    {
      icon: CalendarCheck,
      title: 'Christmas Eve Delivery',
      subtitle: 'Guaranteed cutoff Dec 18',
      highlight: 'On-time promise',
    },
    {
      icon: RotateCcw,
      title: 'Extended Holiday Returns',
      subtitle: 'Shop stress-free through Jan 31',
      highlight: 'Free return labels',
    },
    {
      icon: ShieldCheck,
      title: 'Secure 256-Bit Checkout',
      subtitle: 'Apple Pay, Cards, PayPal & Klarna',
      highlight: 'Bank-grade encryption',
    },
  ];

  return (
    <section aria-label="Customer trust and holiday shipping benefits" className="bg-[#FAF7F0] border-b border-[#073D2B]/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/70 border border-[#073D2B]/5 shadow-xs hover:border-[#073D2B]/20 transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-[#073D2B]/5 text-[#073D2B] shrink-0">
                  <Icon className="w-5 h-5 text-[#073D2B]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#15233B]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#15233B]/70">
                    {b.subtitle}
                  </p>
                  <span className="inline-block text-[11px] font-medium text-[#073D2B]">
                    {b.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
