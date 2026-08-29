'use client';

import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

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
  heroBg = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  isAgentSearching = false,
}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedRegion, query);
  };

  return (
    <div className="relative h-[480px] md:h-[540px] w-full flex items-center justify-center overflow-hidden">
      {/* High-res background photo with smooth transitions */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url('${heroBg}')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-slate-900/40 to-slate-950/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase drop-shadow-lg">
          DISCOVER YOUR REGION
        </h2>
        
        <p className="text-lg md:text-xl font-medium italic text-amber-200/90 drop-shadow">
          Authentic Places. Local Food. Real Experiences.
        </p>

        {/* Floating Glassmorphic Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-2xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2"
        >
          {/* Region Dropdown */}
          <div className="w-full md:w-48 flex items-center gap-2 bg-white/90 text-slate-800 px-4 py-3 rounded-xl md:rounded-full shadow-inner">
            <MapPin className="w-5 h-5 text-emerald-800 shrink-0" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent font-semibold text-sm outline-none w-full cursor-pointer"
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="All Regions">All Regions</option>
            </select>
          </div>

          {/* Text Input */}
          <div className="w-full flex-1 bg-white/90 text-slate-800 px-4 py-3 rounded-xl md:rounded-full shadow-inner flex items-center">
            <input
              type="text"
              placeholder="Search places, food, experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm placeholder-slate-400 font-medium outline-none"
            />
          </div>

          {/* Green Action Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl md:rounded-full shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>{isAgentSearching ? 'AI Searching...' : 'Search'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
