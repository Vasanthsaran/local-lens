'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { CategoryCardsGrid } from '../components/CategoryCardsGrid';
import { PlacesCarousel } from '../components/PlacesCarousel';
import { FoodGrid } from '../components/FoodGrid';
import { MapView } from '../components/MapView';
import { ValuePropFooterBar } from '../components/ValuePropFooterBar';
import { AITripPlannerModal } from '../components/AITripPlannerModal';
import { Sparkles, Search, X } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState('Andhra Pradesh');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [heroBg, setHeroBg] = useState<string>('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80');
  const [isAgentSearching, setIsAgentSearching] = useState<boolean>(false);
  const [agentSources, setAgentSources] = useState<any>(null);
  
  // Data State
  const [places, setPlaces] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);

  // Trigger AI Agent & Backend API search when Region/Location changes
  const runAgentSearch = (location: string) => {
    setIsAgentSearching(true);
    
    // 1. Fetch live AI Agent findings
    fetch(`http://localhost:8000/api/agent/discover?location=${encodeURIComponent(location)}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAgentSearching(false);
        if (data.places && data.places.length > 0) setPlaces(data.places);
        if (data.foods && data.foods.length > 0) setFoods(data.foods);
        if (data.hero_background_image) setHeroBg(data.hero_background_image);
        if (data.sources_analyzed) setAgentSources(data.sources_analyzed);
      })
      .catch((err) => {
        setIsAgentSearching(false);
        console.log('Error running AI Agent search, falling back to static REST endpoints:', err);
        // Fallback to static REST APIs if agent endpoint fails or is slow
        fetch(`http://localhost:8000/api/places?region=${encodeURIComponent(location)}`)
          .then((r) => r.json())
          .then((pData) => setPlaces(pData))
          .catch(() => {});
        fetch(`http://localhost:8000/api/food?region=${encodeURIComponent(location)}`)
          .then((r) => r.json())
          .then((fData) => setFoods(fData))
          .catch(() => {});
      });
  };

  // Fetch initial data on load
  useEffect(() => {
    runAgentSearch(selectedRegion);
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHeroSearch = (region: string, query: string) => {
    setSearchQuery(query);
    fetch(`http://localhost:8000/api/search?q=${encodeURIComponent(query || region)}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch(() => {
        setSearchResults({
          query,
          places: places.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
          foods: foods.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())),
        });
      });
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClick={() => {
          const el = document.getElementById('search-anchor');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFavoritesClick={() => alert(`Saved Favorites (${favorites.length} items)`)}
        onLoginClick={() => alert('Authentication modal coming soon!')}
        favoriteCount={favorites.length}
      />

      {/* Hero Section */}
      <HeroSection
        onSearch={(region, query) => {
          if (query) {
            handleHeroSearch(region, query);
            runAgentSearch(query);
          } else {
            runAgentSearch(region);
          }
        }}
        selectedRegion={selectedRegion}
        setSelectedRegion={(region) => {
          setSelectedRegion(region);
          runAgentSearch(region);
        }}
        heroBg={heroBg}
        isAgentSearching={isAgentSearching}
      />

      {/* AI Agent Analysis Indicator Banner */}
      {agentSources && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900 font-medium">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>
                <strong>AI Search Agent Active:</strong> Discovered live details for <strong>{selectedRegion}</strong> across <strong>{agentSources.web_articles_count} web pages</strong> and <strong>{agentSources.youtube_subtitles_analyzed} YouTube video transcripts</strong>!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Trip Planner Launcher Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex justify-end">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Plan Custom AI Trip with Claude</span>
        </button>
      </div>

      {/* Search Results Drawer / Banner if searching */}
      {searchResults && (
        <section id="search-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-lg relative">
            <button
              onClick={() => setSearchResults(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-emerald-900 mb-4">
              Search Results for "{searchResults.query}"
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.places?.map((p: any) => (
                <div key={p.id} className="p-3 border rounded-xl flex gap-3 items-center">
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-500">{p.location}</p>
                  </div>
                </div>
              ))}
              {searchResults.foods?.map((f: any) => (
                <div key={f.id} className="p-3 border rounded-xl flex gap-3 items-center">
                  <img src={f.image} alt={f.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{f.name}</h4>
                    <p className="text-xs text-emerald-700 font-bold">₹{f.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Category Cards Grid (4 Rounded Cards) */}
      <CategoryCardsGrid
        onCategoryClick={(catId) => {
          setActiveTab(catId);
        }}
      />

      {/* Main Content Sections */}
      <div className="space-y-4">
        {/* Popular Places Carousel */}
        <PlacesCarousel
          selectedRegion={selectedRegion}
          places={places}
          onSelectPlace={(p) => setSelectedItem(p)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Taste the Region Food Grid */}
        <FoodGrid
          foods={foods}
          onSelectFood={(f) => setSelectedItem(f)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Interactive Map View */}
        <MapView
          selectedRegion={selectedRegion}
          places={places}
          onSelectPlace={(p) => setSelectedItem(p)}
        />
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-48 rounded-2xl object-cover mb-4" />
            <h3 className="text-xl font-bold text-slate-900">{selectedItem.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{selectedItem.location || selectedItem.category}</p>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">{selectedItem.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-extrabold text-emerald-800">Rating: ★ {selectedItem.rating}</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Trip Planner Modal */}
      <AITripPlannerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Footer Value Proposition Bar */}
      <ValuePropFooterBar />
    </main>
  );
}
