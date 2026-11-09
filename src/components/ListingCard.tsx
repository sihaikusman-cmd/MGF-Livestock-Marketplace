import React, { useState } from 'react';
import { GoatListing } from '../types.ts';
import { Phone, MessageCircle, MapPin, Trash2, Share2, Check } from 'lucide-react';

interface ListingCardProps {
  listing: GoatListing;
  onContact: (listing: GoatListing) => void;
  onDelete?: (listing: GoatListing) => void;
  canDelete?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onContact,
  onDelete,
  canDelete = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(listing.price);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this ${listing.breed} goat for ${formattedPrice} in ${listing.city} on Metro Goat Farm (MGF)!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText} Contact: ${listing.phone}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#dbe6e0] hover:border-emerald-700/40 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-52 sm:h-56 bg-slate-100 overflow-hidden shrink-0">
        {!imageError ? (
          <img
            src={listing.image}
            alt={listing.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950 text-emerald-100 p-4 text-center">
            <span className="text-3xl mb-1">🐐</span>
            <span className="text-xs font-semibold text-emerald-200">{listing.breed}</span>
          </div>
        )}

        {/* Verification or Category Label (Quiet subtle label) */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#072b20]/85 text-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs tracking-wide">
            {listing.isDemo ? 'Sample Listing' : 'Direct Seller'}
          </span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          title="Share Listing"
          className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-md shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Price */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-[#1a2e26] line-clamp-1 group-hover:text-[#0d4734] transition-colors">
              {listing.title}
            </h3>
            <span className="font-extrabold text-base sm:text-lg text-[#0d4734] tabular-nums whitespace-nowrap">
              {formattedPrice}
            </span>
          </div>

          {/* Clean Unboxed Metadata with Typographic Separator (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 mb-2.5">
            <span className="text-emerald-900 font-semibold">{listing.breed}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{listing.age}</span>
            {listing.weight && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="tabular-nums">{listing.weight}</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {listing.description || 'Healthy livestock raised with proper nutrition and care. Call seller for inspections and details.'}
          </p>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#dbe6e0] flex items-center justify-between gap-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#0d4734] shrink-0" />
            <span className="truncate">{listing.city}{listing.state ? `, ${listing.state}` : ''}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(listing);
                }}
                title="Delete listing"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 hover:border-rose-600 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}

            <a
              href={`tel:${listing.phone}`}
              className="p-1.5 text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
              title="Call Seller"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onContact(listing)}
              className="inline-flex items-center gap-1.5 bg-[#0d4734] hover:bg-[#155d45] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#f5b025]" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
