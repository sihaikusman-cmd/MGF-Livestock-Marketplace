import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, ShieldCheck, ImagePlus, X, HelpCircle } from 'lucide-react';
import { GoatListing } from '../types.ts';
import { AVAILABLE_BREEDS, MUMBAI_LOCATIONS } from '../data/initialData.ts';

interface SellerFormProps {
  onAddListing: (listing: GoatListing) => void;
}

export const SellerForm: React.FC<SellerFormProps> = ({ onAddListing }) => {
  const [title, setTitle] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [seller, setSeller] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMsg('Image size exceeds 8MB limit. Please choose a smaller photo.');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (typeof evt.target?.result === 'string') {
          setPreviewImage(evt.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!previewImage) {
      setErrorMsg('Please upload at least one photo of your goat.');
      return;
    }

    if (!title.trim() || !breed || !age.trim() || !price || !city.trim() || !phone.trim()) {
      setErrorMsg('Please fill in all required fields marked with *.');
      return;
    }

    setIsSubmitting(true);

    const newListing: GoatListing = {
      id: `user_${Date.now()}`,
      title: title.trim(),
      breed,
      age: age.trim(),
      weight: weight.trim() ? weight.trim() : undefined,
      price: Number(price),
      city: city.trim(),
      state: 'Maharashtra',
      seller: seller.trim() || 'Verified Seller',
      phone: phone.trim(),
      whatsapp: sameAsPhone ? phone.trim() : whatsapp.trim() || phone.trim(),
      description: description.trim(),
      image: previewImage,
      isDemo: false,
      createdAt: Date.now(),
    };

    setTimeout(() => {
      onAddListing(newListing);
      // Reset form
      setTitle('');
      setBreed('');
      setAge('');
      setWeight('');
      setPrice('');
      setCity('Mumbai');
      setSeller('');
      setPhone('');
      setWhatsapp('');
      setDescription('');
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section id="sell" className="bg-[#f3f8f5] py-14 sm:py-18 border-b border-[#dbe6e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Context, Guidelines & Value */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0d4734]">
                Seller Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4734] tracking-tight">
                Post Your Goat Listing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect with thousands of buyers across Mumbai, Thane, Pune, and Maharashtra. Publish your listing in less than 2 minutes.
              </p>
            </div>

            {/* Seller Benefits Card */}
            <div className="bg-white rounded-xl p-5 border border-[#dbe6e0] space-y-3.5 shadow-2xs">
              <h3 className="font-bold text-sm text-[#1a2e26] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Why sell on Metro Goat Farm?
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d4734] shrink-0 mt-0.5" />
                  <span><strong>Zero commission:</strong> Keep 100% of the sale value.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d4734] shrink-0 mt-0.5" />
                  <span><strong>Direct phone calls:</strong> Serious buyers call or WhatsApp your number directly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d4734] shrink-0 mt-0.5" />
                  <span><strong>Local visibility:</strong> Highlighted to farmers & hobbyists in your city.</span>
                </li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-emerald-950 text-emerald-100 rounded-xl p-5 border border-emerald-800 text-xs sm:text-sm space-y-2">
              <span className="font-bold text-[#f5b025] block">
                💡 Tips for Quick Buyer Response
              </span>
              <p className="text-emerald-200/90 text-xs leading-relaxed">
                Provide clear daylight photos showing body length and height. Mention vaccination history and exact weight for faster inquiries.
              </p>
            </div>
          </div>

          {/* Right Column: Listing Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dbe6e0] shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg">
                    {errorMsg}
                  </div>
                )}

                {/* Photo Upload Box */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Goat Photo * <span className="text-slate-400 font-normal lowercase">(Max 8MB)</span>
                  </label>

                  {!previewImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#dbe6e0] hover:border-[#0d4734] bg-[#f8faf9] rounded-xl p-6 text-center cursor-pointer transition-colors group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0d4734] flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 block">
                        Click to select or upload a photo
                      </span>
                      <span className="text-xs text-slate-500 mt-1 block">
                        PNG, JPG, or WEBP from phone camera or gallery
                      </span>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-[#dbe6e0] h-52 bg-slate-900 group">
                      <img
                        src={previewImage}
                        alt="Listing Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>Change Photo</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & Breed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Pure Beetal Buck / Jamunapari Doe"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Breed *
                    </label>
                    <select
                      required
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    >
                      <option value="">Select Breed</option>
                      {AVAILABLE_BREEDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Age & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="text"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 1 Year / 2 Daant / 8 Months"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Weight <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 45 kg"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Price & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      required
                      min="500"
                      step="500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 25000"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Location in MH *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Malad, Thane, Pune"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Seller Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name / Farm Name
                    </label>
                    <input
                      type="text"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                      placeholder="e.g. Ahmed Shaikh / Metro Goat Farm"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9820194820"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                {/* WhatsApp Checkbox */}
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    id="samePhone"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="w-4 h-4 text-[#0d4734] rounded border-slate-300 focus:ring-[#0d4734]"
                  />
                  <label htmlFor="samePhone" className="cursor-pointer font-medium">
                    WhatsApp number is same as phone number
                  </label>
                </div>

                {!sameAsPhone && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. 9820194820"
                      className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all font-mono"
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Details & Health Record
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe horn size, maternal milk yield, vaccination (ETV, PPR), daily feeding diet, temperament..."
                    className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-lg text-sm text-slate-800 outline-none transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f5b025] hover:bg-[#e09f19] text-[#072b20] font-extrabold text-base py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-99 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Publishing Listing...</span>
                  ) : (
                    <span>Publish Listing Now →</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
