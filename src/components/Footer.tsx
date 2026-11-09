import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#072b20] text-emerald-200/80 text-xs py-10 border-t border-emerald-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-800/40">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="bg-[#f5b025] text-[#072b20] font-black text-lg px-2 py-0.5 rounded-md tracking-wider">
              MGF
            </span>
            <div>
              <span className="font-extrabold text-white text-base block tracking-tight">
                Metro Goat Farm
              </span>
              <span className="text-[11px] text-emerald-300">
                A Division of Metro Enterprises · Malad (W), Mumbai
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 font-semibold text-emerald-100">
            <a href="#browse" className="hover:text-[#f5b025] transition-colors">
              Browse Goats
            </a>
            <a href="#doctor" className="hover:text-[#f5b025] transition-colors">
              Animal Doctor Mumbai
            </a>
            <a href="#sell" className="hover:text-[#f5b025] transition-colors">
              Post Listing
            </a>
            <a href="#metro" className="hover:text-[#f5b025] transition-colors">
              Metro Enterprises
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-400/80">
          <div>
            © {currentYear} Metro Goat Farm (MGF). Metro Enterprises. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Direct farmer-to-buyer platform with zero commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
