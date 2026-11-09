import React from 'react';
import { Phone, MapPin, Tag, ShieldCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-[#dbe6e0] py-3.5 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm font-semibold text-[#1a2e26]">
          <div className="flex items-center justify-center gap-2 py-1">
            <Phone className="w-4 h-4 text-[#0d4734]" />
            <span>Direct Seller Phone Calls</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1 border-t sm:border-t-0 sm:border-x border-slate-200">
            <MapPin className="w-4 h-4 text-[#0d4734]" />
            <span>Local Listings Across Mumbai & MH</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1 border-t sm:border-t-0 border-slate-200">
            <Tag className="w-4 h-4 text-[#0d4734]" />
            <span>100% Free — Zero Commission</span>
          </div>
        </div>
      </div>
    </div>
  );
};
