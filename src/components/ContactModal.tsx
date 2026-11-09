import React, { useState, useEffect } from 'react';
import { GoatListing } from '../types.ts';
import { X, Phone, MessageSquare, Copy, Check, MapPin, ShieldCheck, Trash2 } from 'lucide-react';

interface ContactModalProps {
  listing: GoatListing | null;
  onClose: () => void;
  onDelete?: (listing: GoatListing) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ listing, onClose, onDelete }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!listing) return null;

  const cleanPhone = listing.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = (listing.whatsapp || listing.phone).replace(/[^0-9]/g, '');

  const whatsappPhone = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;

  const whatsappMessage = encodeURIComponent(
    `Hello ${listing.seller}, I saw your listing for "${listing.title}" (₹${listing.price.toLocaleString('en-IN')}) on Metro Goat Farm. Is it still available?`
  );

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(listing.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0d4734] text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5b025] block">
              Direct Seller Contact
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {listing.isDemo ? 'Sample Listing Demo' : listing.seller}
            </h3>
            <p className="text-xs text-emerald-200 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{listing.city}{listing.state ? `, ${listing.state}` : ''}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Goat Summary Bar */}
          <div className="flex items-center gap-3 p-3 bg-[#f3f8f5] rounded-xl border border-[#dbe6e0]">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-[#1a2e26] truncate">
                {listing.title}
              </h4>
              <div className="text-xs text-slate-500 font-medium">
                {listing.breed} · {listing.age}
              </div>
              <div className="text-sm font-extrabold text-[#0d4734] tabular-nums mt-0.5">
                {formattedPrice}
              </div>
            </div>
          </div>

          {/* Contact Numbers Display */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-medium">
              Seller Contact Number
            </span>
            <div className="text-2xl font-black font-mono text-[#0d4734] tracking-wide">
              {listing.phone}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${listing.phone}`}
              className="flex items-center justify-center gap-2 w-full bg-[#0d4734] hover:bg-[#155d45] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors active:scale-98"
            >
              <Phone className="w-4 h-4 text-[#f5b025]" />
              <span>Call Seller Directly</span>
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyPhone}
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Number Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Phone Number</span>
                </>
              )}
            </button>

            {/* Delete Listing Button */}
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onDelete(listing);
                }}
                className="flex items-center justify-center gap-2 w-full bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-rose-200 hover:border-rose-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Listing</span>
              </button>
            )}
          </div>

          {/* Safety Notice */}
          <div className="pt-2 text-[11px] text-slate-500 flex items-start gap-1.5 border-t border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              For your safety, inspect livestock in person before paying. Metro Goat Farm does not take payments or hold deposits.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
