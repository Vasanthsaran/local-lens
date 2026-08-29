'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, User, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
  onFavoritesClick: () => void;
  onLoginClick: () => void;
  favoriteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSearchClick,
  onFavoritesClick,
  onLoginClick,
  favoriteCount,
}) => {
  const navItems = [
    { id: 'home', label: 'Explore' },
    { id: 'places', label: 'Destinations' },
    { id: 'food', label: 'Culinary' },
    { id: 'culture', label: 'Heritage & Culture' },
    { id: 'map', label: 'Interactive Map' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/10 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
        
        {/* Left: Brand Logo with Signature Lens Motif */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full border-2 border-[#D8A657] flex items-center justify-center bg-black/40 backdrop-blur-md shadow-lg group-hover:border-[#FF6A4D] transition-colors duration-300">
            {/* Outer Lens aperture ticks */}
            <div className="absolute inset-0.5 rounded-full border border-dashed border-[#D8A657]/60 animate-spin-slow group-hover:border-[#FF6A4D]/80" />
            {/* Focal lens dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#FF6A4D] to-[#D8A657] shadow-inner" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif font-bold tracking-wider text-white flex items-center gap-0.5">
              Local<span className="text-[#FF6A4D] font-sans font-light tracking-normal">Lens</span>
            </h1>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8A657] font-medium">
              LUXURY HERITAGE & TRAVEL
            </span>
          </div>
        </Link>

        {/* Center Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6A4D] to-[#D8A657] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utilities */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchClick}
            className="p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onFavoritesClick}
            className="p-2.5 rounded-full text-white/80 hover:text-[#FF6A4D] hover:bg-white/10 backdrop-blur-sm transition-all relative"
            title="Saved Places"
          >
            <Heart className={`w-5 h-5 ${favoriteCount > 0 ? 'fill-[#FF6A4D] text-[#FF6A4D]' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF6A4D] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            onClick={onLoginClick}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs tracking-wider uppercase font-semibold transition-all transform active:scale-95 shadow-md"
          >
            <User className="w-3.5 h-3.5 text-[#D8A657]" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
};
