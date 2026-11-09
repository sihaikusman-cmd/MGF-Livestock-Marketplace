import React from 'react';
import { ArrowRight, PlusCircle, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_metro_goat_farm_1794223341189.jpg';

interface HeroProps {
  onPostClick: () => void;
  onBrowseClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPostClick, onBrowseClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d4734] via-[#10563e] to-[#083324] text-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-600/40 text-[#f5b025] text-xs font-bold tracking-wider uppercase">
              Metro Goat Farm Marketplace
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance">
              Buy and Sell Goats Directly.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
              No middleman. No fees. Find healthy breeder bucks, dairy does, and prime kids near you in Mumbai and Maharashtra. Call the owner directly.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseClick}
                className="inline-flex items-center justify-center gap-2 bg-[#f5b025] hover:bg-[#e09f19] text-[#072b20] font-bold text-sm sm:text-base px-6 py-3 rounded-full transition-all shadow-lg shadow-black/20 hover:shadow-black/30 active:scale-98 cursor-pointer"
              >
                <span>Find Goats</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPostClick}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#f5b025]" />
                <span>Post Your Goat</span>
              </button>
            </div>

            {/* Quick Micro Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-200/90 font-medium border-t border-emerald-700/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f5b025]" />
                Zero Commission Platform
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f5b025]" />
                Direct Phone / WhatsApp Contact
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f5b025]" />
                Veterinary Support in Mumbai
              </span>
            </div>
          </div>

          {/* Right Column: Hero Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-600/40 shadow-2xl shadow-emerald-950/50 group bg-emerald-900/30">
              <img
                src={heroImg}
                alt="Metro Goat Farm Beetal Buck"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs uppercase tracking-wider font-bold text-[#f5b025]">
                  Featured Champion Breed
                </span>
                <span className="text-white font-bold text-lg leading-tight">
                  Beetal & Jamunapari Lineage
                </span>
                <span className="text-xs text-emerald-200 mt-1">
                  Connect directly with verified breeders & farm owners
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
