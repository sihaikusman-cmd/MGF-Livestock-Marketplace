import React, { useState, useEffect, useMemo } from 'react';
import { GoatListing, FilterState } from './types.ts';
import { INITIAL_DEMO_LISTINGS, AVAILABLE_BREEDS } from './data/initialData.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustBar } from './components/TrustBar.tsx';
import { ListingCard } from './components/ListingCard.tsx';
import { DoctorSection } from './components/DoctorSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { SellerForm } from './components/SellerForm.tsx';
import { MetroEnterprises } from './components/MetroEnterprises.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { DeleteModal } from './components/DeleteModal.tsx';
import { Footer } from './components/Footer.tsx';
import { Search, Filter, RotateCcw, ArrowUpDown, Plus, Sparkles, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'mgf_listings_data';

export default function App() {
  const [listings, setListings] = useState<GoatListing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((item: GoatListing) => item.id));
          const missingDemos = INITIAL_DEMO_LISTINGS.filter((demo) => !existingIds.has(demo.id));
          if (missingDemos.length > 0) {
            return [...parsed, ...missingDemos];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load listings from storage', e);
    }
    return INITIAL_DEMO_LISTINGS;
  });

  const [activeListingForContact, setActiveListingForContact] = useState<GoatListing | null>(null);
  const [listingToDelete, setListingToDelete] = useState<GoatListing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    breed: '',
    location: '',
    maxPrice: 0,
    sortBy: 'featured',
  });

  // Save listings whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    } catch (e) {
      console.error('Failed to persist listings', e);
    }
  }, [listings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddListing = (newListing: GoatListing) => {
    setListings((prev) => [newListing, ...prev]);
    showToast('Your goat listing has been published successfully!');
    const browseEl = document.getElementById('browse');
    if (browseEl) {
      browseEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteClick = (listing: GoatListing) => {
    setListingToDelete(listing);
  };

  const handleConfirmDelete = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    setListingToDelete(null);
    if (activeListingForContact?.id === id) {
      setActiveListingForContact(null);
    }
    showToast('Listing deleted successfully.');
  };

  const handleRestoreDefaults = () => {
    setListings(INITIAL_DEMO_LISTINGS);
    showToast('Sample goat listings restored.');
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      breed: '',
      location: '',
      maxPrice: 0,
      sortBy: 'featured',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        const query = filters.search.trim().toLowerCase();
        const matchSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.breed.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.seller.toLowerCase().includes(query);

        const matchBreed = !filters.breed || item.breed === filters.breed;

        const locQuery = filters.location.trim().toLowerCase();
        const matchLocation =
          !locQuery ||
          item.city.toLowerCase().includes(locQuery) ||
          (item.state && item.state.toLowerCase().includes(locQuery));

        return matchSearch && matchBreed && matchLocation;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'newest') return b.createdAt - a.createdAt;
        return 0; // 'featured' keeps original ordering (user first, then verified demo)
      });
  }, [listings, filters]);

  const hasActiveFilters = Boolean(
    filters.search || filters.breed || filters.location || filters.sortBy !== 'featured'
  );

  return (
    <div className="min-h-screen bg-[#f3f8f5] text-[#1a2e26] flex flex-col font-sans selection:bg-[#f5b025]/30">
      {/* Header */}
      <Header onPostClick={() => scrollToSection('sell')} />

      {/* Main Content */}
      <main id="home" className="flex-1">
        {/* Hero Section */}
        <Hero
          onPostClick={() => scrollToSection('sell')}
          onBrowseClick={() => scrollToSection('browse')}
        />

        {/* Trust Bar */}
        <TrustBar />

        {/* Browse & Marketplace Section */}
        <section id="browse" className="py-14 sm:py-18">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d4734]">
                  Live Marketplace
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4734] mt-1 tracking-tight">
                  Available Goats
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Search by breed or city and contact verified goat owners directly.
                </p>
              </div>

              {/* Counter */}
              <div className="text-xs font-semibold text-slate-500 tabular-nums">
                Showing <span className="font-bold text-[#0d4734]">{filteredListings.length}</span> of {listings.length} listings
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dbe6e0] shadow-sm mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                {/* Search Input */}
                <div className="lg:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                    placeholder="Search by breed, buck, dairy..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-xl text-sm text-slate-800 outline-none transition-all"
                  />
                </div>

                {/* Breed Dropdown */}
                <div className="lg:col-span-3">
                  <select
                    value={filters.breed}
                    onChange={(e) => setFilters((f) => ({ ...f, breed: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-xl text-sm text-slate-800 outline-none transition-all cursor-pointer"
                  >
                    <option value="">All Breeds</option>
                    {AVAILABLE_BREEDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Input */}
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                    placeholder="City (e.g. Mumbai)"
                    className="w-full px-3.5 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-xl text-sm text-slate-800 outline-none transition-all"
                  />
                </div>

                {/* Sort By Dropdown */}
                <div className="lg:col-span-2 flex items-center gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }))
                    }
                    className="w-full px-3 py-2.5 bg-[#f3f8f5] focus:bg-white border border-[#dbe6e0] focus:border-[#0d4734] focus:ring-1 focus:ring-[#0d4734] rounded-xl text-xs sm:text-sm text-slate-800 outline-none transition-all cursor-pointer font-medium"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>

                  {hasActiveFilters && (
                    <button
                      onClick={handleClearFilters}
                      title="Reset filters"
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Breed Filter Segmented Buttons (Interactive control following §1.A) */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold mr-1">Quick Select:</span>
                <button
                  onClick={() => setFilters((f) => ({ ...f, breed: '' }))}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    filters.breed === ''
                      ? 'bg-[#0d4734] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  All
                </button>
                {AVAILABLE_BREEDS.filter((b) => b !== 'Other').map((b) => (
                  <button
                    key={b}
                    onClick={() => setFilters((f) => ({ ...f, breed: b }))}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 ${
                      filters.breed === b
                        ? 'bg-[#0d4734] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onContact={setActiveListingForContact}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl p-12 text-center border border-[#dbe6e0] shadow-xs max-w-lg mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-3xl mb-3">
                  🐐
                </div>
                <h3 className="text-lg font-bold text-[#1a2e26]">
                  {listings.length === 0 ? 'All listings have been deleted' : 'No goats found matching your filters'}
                </h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  {listings.length === 0
                    ? 'You can post a new goat listing or restore the sample listings anytime.'
                    : 'Try adjusting your search keywords, clear the breed selection, or reset filters.'}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {listings.length === 0 ? (
                    <button
                      onClick={handleRestoreDefaults}
                      className="inline-flex items-center gap-2 bg-[#0d4734] hover:bg-[#155d45] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Sample Goats</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex items-center gap-2 bg-[#0d4734] hover:bg-[#155d45] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All Filters</span>
                    </button>
                  )}
                  <button
                    onClick={() => scrollToSection('sell')}
                    className="inline-flex items-center gap-2 bg-[#f5b025] hover:bg-[#e09f19] text-[#072b20] text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Your Goat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Doctor Section (Mumbai Support) */}
        <DoctorSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Seller Portal Form */}
        <SellerForm onAddListing={handleAddListing} />

        {/* Metro Enterprises Section */}
        <MetroEnterprises />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        listing={activeListingForContact}
        onClose={() => setActiveListingForContact(null)}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Modal (Iframe-safe custom modal) */}
      <DeleteModal
        listing={listingToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setListingToDelete(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#072b20] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-xl flex items-center gap-2.5 border border-emerald-700/60 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#f5b025] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
