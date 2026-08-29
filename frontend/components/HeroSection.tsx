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
              <option value="All Regions">All Regions</option>
              <optgroup label="States">
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </optgroup>
              <optgroup label="Union Territories">
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </optgroup>
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
