import React, { useState } from 'react';
import { Menu, X, PlusCircle, PhoneCall, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onPostClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPostClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Browse Goats', href: '#browse' },
    { label: 'Animal Doctor', href: '#doctor' },
    { label: 'Sell Your Goat', href: '#sell' },
    { label: 'Metro Enterprises', href: '#metro' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d4734] text-white shadow-md border-b border-[#145d44]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a href="#home" className="flex items-center gap-2.5 text-white group shrink-0">
          <span className="bg-[#f5b025] text-[#072b20] font-black text-xl px-2.5 py-1 rounded-md tracking-wider shadow-sm group-hover:bg-[#e09f19] transition-colors">
            MGF
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white">
              Metro Goat Farm
            </span>
            <span className="text-[11px] text-emerald-200/80 font-medium tracking-wide">
              Metro Enterprises
            </span>
          </div>
        </a>

        {/* Nav Links Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-emerald-100">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#f5b025] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Desktop */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/917738991736?text=Hello%20Metro%20Goat%20Farm%2C%20I%20have%20an%20inquiry%20regarding%20goats."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white px-2.5 py-1.5 rounded-lg border border-emerald-700/60 hover:border-emerald-500 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#f5b025]" />
            <span>Support: +91 77389 91736</span>
          </a>

          <button
            onClick={onPostClick}
            className="inline-flex items-center gap-2 bg-[#f5b025] hover:bg-[#e09f19] text-[#072b20] font-bold text-sm px-4 py-2 rounded-full transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Listing</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onPostClick}
            className="sm:hidden inline-flex items-center gap-1 bg-[#f5b025] text-[#072b20] font-bold text-xs px-3 py-1.5 rounded-full"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#f5b025] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#072b20] border-t border-emerald-800/80 px-4 pt-3 pb-5 space-y-2.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-emerald-100 hover:text-[#f5b025] border-b border-emerald-900/40"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="https://wa.me/917738991736?text=Hello%20Metro%20Goat%20Farm%2C%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-emerald-200 bg-emerald-950/60 rounded-lg border border-emerald-800"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#f5b025]" />
              WhatsApp Help: +91 77389 91736
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
