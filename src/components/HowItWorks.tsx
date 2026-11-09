import React from 'react';
import { Camera, Search, PhoneCall } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      icon: Camera,
      title: 'Post Your Goat',
      description: 'Upload clear photos, select the breed, set your direct price in ₹, and provide your active contact number.',
    },
    {
      num: '2',
      icon: Search,
      title: 'Buyers Search',
      description: 'Buyers and dairy farmers search by breed, age, and location across Mumbai, Thane, Pune, and nearby districts.',
    },
    {
      num: '3',
      icon: PhoneCall,
      title: 'Direct Deal',
      description: 'Interested buyers contact you straight away via direct phone call or WhatsApp to finalize inspections and payment.',
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-16 border-b border-[#dbe6e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0d4734]">
            Transparent & Simple
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4734] mt-1 tracking-tight">
            How Metro Goat Farm Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A 100% peer-to-peer livestock marketplace connecting genuine goat breeders, hobbyists, and buyers without broker commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#f3f8f5] rounded-xl p-6 sm:p-7 border border-[#dbe6e0] flex flex-col relative group hover:border-emerald-600/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0d4734] text-[#f5b025] flex items-center justify-center font-extrabold text-lg shadow-sm">
                    {step.num}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-100/60 text-[#0d4734]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-bold text-lg text-[#1a2e26] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
