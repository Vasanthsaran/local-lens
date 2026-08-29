'use client';

import React, { useEffect, useState } from 'react';
import { Place } from './PlacesCarousel';

interface MapViewProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
}

export const MapView: React.FC<MapViewProps> = ({ places, onSelectPlace }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(places[0] || null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Interactive Region Map
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Explore coastal, natural and heritage landmarks across Andhra Pradesh
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-md">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-2 relative h-[450px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <iframe
            title="Interactive Andhra Pradesh Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://www.openstreetmap.org/export/embed.html?bbox=79.0000%2C13.0000%2C84.0000%2C19.0000&amp;layer=mapnik"
            className="w-full h-full rounded-xl"
          />
          
          {/* Overlay Floating Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
            <span className="font-bold text-emerald-900 block mb-1">📍 Andhra Pradesh Region</span>
            <span className="text-slate-500 text-[11px] block">{places.length} Top Locations Pinned</span>
          </div>
        </div>

        {/* Selected Place Detail / List Side Panel */}
        <div className="flex flex-col h-[450px] overflow-y-auto pr-1 space-y-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider px-1">
            Featured Locations ({places.length})
          </h3>

          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            return (
              <div
                key={place.id}
                onClick={() => {
                  setSelectedPlace(place);
                  onSelectPlace(place);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{place.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{place.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-amber-600">★ {place.rating}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      {place.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
