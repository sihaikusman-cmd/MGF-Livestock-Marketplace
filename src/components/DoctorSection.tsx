import React, { useState } from 'react';
import { Phone, MessageSquare, AlertCircle, HeartPulse, Activity, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const DoctorSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const doctorPhone = '+91 77389 91736';
  const whatsappUrl = `https://wa.me/917738991736?text=Hello%20Metro%20Goat%20Farm%2C%20I%20need%20an%20animal%20doctor%20number%20in%20Mumbai.`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+917738991736');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="doctor" className="bg-[#e7f2ed] py-14 sm:py-18 border-y border-[#cde0d7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#d2e3dc] shadow-sm">
          {/* Information & Disclaimer Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0d4734]">
              <HeartPulse className="w-4 h-4 text-[#0d4734]" />
              <span>Mumbai Support</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4734] tracking-tight">
              Need an Animal Doctor?
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Metro Goat Farm helps you get phone numbers of independent animal doctors and livestock veterinary practitioners in Mumbai and adjoining suburbs.
            </p>

            {/* Crucial Disclaimer Box with subtle hairline styling */}
            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/90 text-xs sm:text-sm text-amber-950 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Important Disclaimer</span>
              </div>
              <p className="leading-relaxed text-amber-900/90">
                Metro Goat Farm (MGF) does not have in-house doctors. We only assist by sharing contact numbers of independent animal doctors serving Mumbai. Doctor visits, treatment, and consultation fees must be discussed and confirmed directly with the doctor.
              </p>
            </div>

            {/* Common Scenarios Covered */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <Activity className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Emergency Visits</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Vaccination & Deworming</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Diet & Health Checks</span>
              </div>
            </div>
          </div>

          {/* Action Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#0d4734] text-white rounded-xl p-6 sm:p-8 text-center space-y-4 shadow-md border border-[#145d44]">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl shadow-inner">
                🩺
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  Request Doctor Number
                </h3>
                <p className="text-xs text-emerald-200/90 mt-1 max-w-xs mx-auto">
                  WhatsApp Metro Goat Farm for Mumbai independent doctor contacts.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
                  Support Helpline
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#f5b025] tabular-nums tracking-wide block mt-1">
                  {doctorPhone}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#f5b025] hover:bg-[#e09f19] text-[#072b20] font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-sm active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us for Doctor Info</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+917738991736"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#f5b025]" />
                    <span>Call Helpline</span>
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#f5b025]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <span>Copy Number</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-emerald-300/80">
                Operating hours: 9:00 AM – 9:00 PM IST (Daily)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
