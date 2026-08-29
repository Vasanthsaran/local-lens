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
  
  // Data State
  const [places, setPlaces] = useState<any[]>([]);
  const [foods, setFoods] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);

  // Fetch initial data from FastAPI backend
  useEffect(() => {
    fetch('http://localhost:8000/api/places?region=Andhra Pradesh')
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.log('Backend fallback used for places', err));

    fetch('http://localhost:8000/api/food?region=Andhra Pradesh')
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.log('Backend fallback used for foods', err));
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
        onSearch={handleHeroSearch}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

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
          places={places.length > 0 ? places : [
            { id: 'rk-beach', name: 'RK Beach', location: 'Visakhapatnam', region: 'Andhra Pradesh', category: 'Coastal & Beach', rating: 4.5, review_count: 12450, description: 'Picturesque urban beach along the Bay of Bengal.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', highlights: [] },
            { id: 'araku-valley', name: 'Araku Valley', location: 'Araku', region: 'Andhra Pradesh', category: 'Hill Station & Nature', rating: 4.6, review_count: 8920, description: 'Serene hill station in Eastern Ghats.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', highlights: [] },
            { id: 'kailasagiri', name: 'Kailasagiri', location: 'Visakhapatnam', region: 'Andhra Pradesh', category: 'Landmark & Views', rating: 4.4, review_count: 6540, description: 'Hilltop park offering panoramic views.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', highlights: [] },
            { id: 'borra-caves', name: 'Borra Caves', location: 'Araku', region: 'Andhra Pradesh', category: 'Heritage & Geology', rating: 4.5, review_count: 9810, description: 'Million-year-old limestone caves.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', highlights: [] }
          ]}
          onSelectPlace={(p) => setSelectedItem(p)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Taste the Region Food Grid */}
        <FoodGrid
          foods={foods.length > 0 ? foods : [
            { id: 'andhra-meals', name: 'Andhra Meals', region: 'Andhra Pradesh', category: 'Traditional', price: 120, description: 'Traditional banana leaf thali.', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80', rating: 4.8, trust_score: 98.5, dietary: 'Vegetarian' },
            { id: 'gongura-pachadi', name: 'Gongura Pachadi', region: 'Andhra Pradesh', category: 'Spicy', price: 60, description: 'Fiery tangy sorrel leaf chutney.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', rating: 4.7, trust_score: 96.0, dietary: 'Vegetarian' },
            { id: 'bamboo-chicken', name: 'Bamboo Chicken', region: 'Andhra Pradesh', category: 'Non-Veg', price: 250, description: 'Slow-roasted chicken in green bamboo.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', rating: 4.9, trust_score: 99.2, dietary: 'Non-Vegetarian' },
            { id: 'pesarattu', name: 'Pesarattu', region: 'Andhra Pradesh', category: 'Tiffin', price: 80, description: 'Nutritious green gram crepe.', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80', rating: 4.6, trust_score: 94.5, dietary: 'Vegetarian' }
          ]}
          onSelectFood={(f) => setSelectedItem(f)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Interactive Map View */}
        <MapView
          places={places.length > 0 ? places : []}
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
