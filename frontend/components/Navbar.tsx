'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, MapPin, Compass, Utensils, Landmark, Sparkles } from 'lucide-react';

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
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'places', label: 'Places', icon: Landmark },
    { id: 'culture', label: 'Culture', icon: Sparkles },
    { id: 'map', label: 'Map', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <div className="relative">
              <MapPin className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-emerald-900 flex items-center gap-1">
              LOCAL <span className="text-amber-600">LENS</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Discover a place like a local.</p>
          </div>
        </Link>

        {/* Center Links with Icons */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utilities */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSearchClick}
            className="p-2.5 rounded-full text-slate-600 hover:text-emerald-900 hover:bg-slate-100 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onFavoritesClick}
            className="p-2.5 rounded-full text-slate-600 hover:text-amber-600 hover:bg-slate-100 transition-colors relative"
            title="Favorites"
          >
            <Heart className={`w-5 h-5 ${favoriteCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Dark Green Pill Button */}
          <button
            onClick={onLoginClick}
            className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};
