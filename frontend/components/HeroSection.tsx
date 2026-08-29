'use client';

import React, { useState } from 'react';
import { MapPin, Search, Compass, Sparkles, Utensils, Landmark, Flame } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (region: string, query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  heroBg?: string;
  isAgentSearching?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  selectedRegion,
  setSelectedRegion,
  heroBg = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2400&q=85', // Majestic Taj / Indian Palace sunset
  isAgentSearching = false,
}) => {
  const [cravingQuery, setCravingQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedRegion, cravingQuery);
  };

  const tagPills = [
    { label: 'Royal Palaces', query: 'Palace' },
    { label: 'Authentic Thali', query: 'Thali' },
    { label: 'Sunset Vantage', query: 'Sunset' },
    { label: 'Heritage Forts', query: 'Fort' },
    { label: 'Street Flavors', query: 'Street Food' },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      {/* Immersive background photo of a beautiful Indian palace at sunset */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('${heroBg}')`,
        }}
      >
        {/* Warm Dusk Gradient Overlay: Deep umber (#1a0e09) top/bottom gradient so palace stays hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e09]/90 via-black/40 to-[#0f0805]" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-[#1a0e09]/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white space-y-8 mt-10">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D8A657]/40 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#D8A657]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D8A657]">
            DISCOVER THE MAJESTIC & UNTOUCHED
          </span>
        </div>

        {/* Headline with Playfair Display & Italic Coral Accent */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.08] text-white drop-shadow-2xl">
          Experience India's <br />
          <span className="italic font-normal text-[#FF6A4D]">Royal Wonders</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-sans font-light text-slate-200/90 leading-relaxed drop-shadow">
          Unveil timeless grand palaces, legendary local flavors, and curated cultural gems guided by insider perspective.
        </p>

        {/* Clean, glassmorphism floating search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/25 p-3 rounded-3xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-3 relative z-30 group hover:border-white/40 transition-all"
        >
          {/* Field 1: "Where to?" */}
          <div className="w-full md:w-1/2 flex items-center gap-3 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl md:rounded-full transition-all group-focus-within:border-[#D8A657]/60">
            <MapPin className="w-5 h-5 text-[#D8A657] shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] uppercase font-bold text-[#D8A657] tracking-wider">
                Where to?
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-white font-medium text-sm outline-none w-full cursor-pointer appearance-none [&>option]:bg-zinc-900 [&>option]:text-white"
              >
                <option value="Rajasthan">Rajasthan (Jaipur & Udaipur)</option>
                <option value="Agra & Delhi">Agra & Delhi (Mughal Heritage)</option>
                <option value="Kerala">Kerala (Backwaters & Forts)</option>
                <option value="Goa">Goa (Coastal Heritage)</option>
                <option value="Karnataka">Karnataka (Mysore Palace)</option>
                <option value="Tamil Nadu">Tamil Nadu (Grand Temples)</option>
                <option value="Madhya Pradesh">Madhya Pradesh (Ancient Forts)</option>
                <option value="West Bengal">West Bengal (Kolkata Heritage)</option>
                <option value="All Regions">All India Destinations</option>
              </select>
            </div>
          </div>

          {/* Divider line for wide view */}
          <div className="hidden md:block w-px h-10 bg-white/20" />

          {/* Field 2: "What are you craving?" */}
          <div className="w-full md:w-1/2 flex items-center gap-3 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl md:rounded-full transition-all group-focus-within:border-[#FF6A4D]/60">
            <Utensils className="w-5 h-5 text-[#FF6A4D] shrink-0" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] uppercase font-bold text-[#D8A657] tracking-wider">
                What are you craving?
              </label>
              <input
                type="text"
                placeholder="Royal Thali, Heritage Walks, Sunset View..."
                value={cravingQuery}
                onChange={(e) => setCravingQuery(e.target.value)}
                className="w-full bg-transparent text-white text-sm placeholder-white/40 font-medium outline-none"
              />
            </div>
          </div>

          {/* Bright Coral Search Button with Spinning Aperture Ring Motif */}
          <button
            type="submit"
            className="w-full md:w-auto px-9 py-4 bg-[#FF6A4D] hover:bg-[#E85538] text-white font-bold text-sm tracking-wide rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(255,106,77,0.4)] transition-all flex items-center justify-center gap-3 shrink-0 transform active:scale-95 group/btn"
          >
            {/* Signature spinning aperture ring motif */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <div className={`absolute inset-0 border-2 border-dashed border-white/80 rounded-full ${isAgentSearching ? 'animate-spin' : 'group-hover/btn:animate-spin-slow'}`} />
              <Search className="w-3.5 h-3.5 text-white" />
            </div>
            <span>{isAgentSearching ? 'Exploring...' : 'Search'}</span>
          </button>
        </form>

        {/* Quick-filter tag pills below search bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs text-white/60 font-medium flex items-center gap-1 mr-1">
            <Flame className="w-3.5 h-3.5 text-[#FF6A4D]" /> Trending searches:
          </span>
          {tagPills.map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setCravingQuery(tag.query);
                onSearch(selectedRegion, tag.query);
              }}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-200 backdrop-blur-md transition-all hover:scale-105 hover:border-[#D8A657]/50"
            >
              {tag.label}
            </button>
          ))}
        </div>

      </div>

      {/* Hero Bottom Ambient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0805] via-[#0f0805]/70 to-transparent pointer-events-none" />
    </div>
  );
};
