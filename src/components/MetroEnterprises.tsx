import React from 'react';
import { METRO_BUSINESSES } from '../data/initialData.ts';
import { Phone, MapPin, Building2, UtensilsCrossed, CalendarCheck2 } from 'lucide-react';

export const MetroEnterprises: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Food & Dining':
        return <UtensilsCrossed className="w-5 h-5 text-emerald-800" />;
      case 'Real Estate':
        return <Building2 className="w-5 h-5 text-emerald-800" />;
      case 'Event Venue':
        return <CalendarCheck2 className="w-5 h-5 text-emerald-800" />;
      default:
        return <Building2 className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <section id="metro" className="bg-white py-14 sm:py-18 border-b border-[#dbe6e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0d4734]">
            Group Businesses
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4734] mt-1 tracking-tight">
            Metro Enterprises
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Metro Goat Farm is part of the Metro Enterprises ecosystem, serving Mumbai with trustworthy dining, property advisory, and celebratory venues in Malad (W).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METRO_BUSINESSES.map((biz) => (
            <div
              key={biz.id}
              className="bg-[#f3f8f5] rounded-xl p-6 border border-[#dbe6e0] flex flex-col justify-between hover:border-emerald-600/30 transition-all hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-emerald-100/70">
                    {getIcon(biz.category)}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {biz.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1a2e26]">
                  {biz.name}
                </h3>
                <p className="text-xs text-emerald-900 font-medium mb-3">
                  {biz.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {biz.description}
                </p>

                <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#0d4734] shrink-0 mt-0.5" />
                  <span>{biz.address}</span>
                </div>
              </div>

              {/* Phone Contacts */}
              <div className="pt-4 border-t border-[#dbe6e0] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Direct Inquiries:
                </span>
                <div className="flex flex-col gap-1.5 font-mono">
                  {biz.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0d4734] hover:text-[#e09f19] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#f5b025] shrink-0" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
