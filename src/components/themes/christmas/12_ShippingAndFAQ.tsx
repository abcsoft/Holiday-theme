import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, HelpCircle, Calendar, ShieldCheck } from 'lucide-react';
import { HOLIDAY_FAQS } from '../../../data/holidayCatalog';

export const ShippingAndFAQ: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-01');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const shippingDeadlines = [
    { service: 'FedEx / UPS Ground', deadline: 'Dec 18, 11:59 PM EST', cost: 'FREE over $49 ($6.95 under)' },
    { service: 'Express 2-Day Air', deadline: 'Dec 21, 12:00 PM EST', cost: '$14.95' },
    { service: 'Priority Overnight', deadline: 'Dec 22, 2:00 PM EST', cost: '$24.95' },
  ];

  return (
    <section id="faq" className="py-16 bg-[#FAF7F0] border-b border-[#073D2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Holiday Shipping Deadlines */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B51225] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>US Holiday Logistics</span>
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#073D2B] mt-1">
                Guaranteed Christmas Eve Delivery Schedule
              </h2>
              <p className="text-xs sm:text-sm text-[#15233B]/70 mt-2">
                All shipments depart from our fulfillment centers in Massachusetts and Oregon with live tracking and insurance.
              </p>
            </div>

            {/* Timetable card */}
            <div className="bg-white rounded-xl p-5 border border-[#073D2B]/10 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#15233B] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D8AF62]" />
                <span>Cutoff Dates for Contiguous United States</span>
              </h3>

              <div className="space-y-3">
                {shippingDeadlines.map((dl) => (
                  <div
                    key={dl.service}
                    className="p-3 rounded-lg bg-[#FAF7F0] border border-[#073D2B]/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#15233B]">{dl.service}</p>
                      <p className="text-[11px] text-[#073D2B] font-medium">{dl.cost}</p>
                    </div>
                    <span className="font-mono font-bold text-[#B51225] bg-white px-2.5 py-1 rounded border border-[#B51225]/20">
                      {dl.deadline}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-[#15233B]/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#073D2B] shrink-0" />
                <span>If weather delays delivery past Dec 24, we will refund your shipping 100%.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#073D2B] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Customer Care</span>
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#073D2B] mt-1">
                Frequently Asked Holiday Questions
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {HOLIDAY_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-[#073D2B]/10 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F0]/40 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-[#15233B]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#073D2B] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#15233B]/50 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#15233B]/80 leading-relaxed border-t border-[#073D2B]/5 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
