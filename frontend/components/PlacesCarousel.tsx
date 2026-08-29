'use client';

import React, { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Place {
  id: str;
  name: string;
  location: string;
  region: string;
  category: string;
  rating: number;
  review_count: number;
  description: string;
  image: string;
  highlights: string[];
}

interface PlacesCarouselProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const PlacesCarousel: React.FC<PlacesCarouselProps> = ({
  places,
  onSelectPlace,
  favorites,
  onToggleFavorite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, places.length - 1) : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= places.length ? 0 : prev + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Places in Andhra Pradesh
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Handpicked natural, coastal and historical attractions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-emerald-800 text-sm font-bold hover:underline">
            View All
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid / Carousel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {places.map((place) => {
          const isFav = favorites.includes(place.id);
          return (
            <div
              key={place.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectPlace(place)}
            >
              {/* Image Header with Badge */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{place.rating}</span>
                  <span className="text-[10px] text-slate-400">({place.review_count})</span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(place.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 shadow transition-transform active:scale-90"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {place.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{place.location}, {place.region}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {place.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                    {place.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 group-hover:underline">
                    Explore Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
