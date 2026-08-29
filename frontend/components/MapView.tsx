'use client';

import React, { useState } from 'react';
import { Place } from './PlacesCarousel';

interface MapViewProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  selectedRegion?: string;
}

const REGION_BOUNDS: Record<string, string> = {
  "Andhra Pradesh": "bbox=76.8%2C12.6%2C84.8%2C19.1",
  "Arunachal Pradesh": "bbox=91.5%2C26.5%2C97.5%2C29.5",
  "Assam": "bbox=89.5%2C24.0%2C96.0%2C28.0",
  "Bihar": "bbox=83.3%2C24.3%2C88.3%2C27.5",
  "Chhattisgarh": "bbox=80.2%2C17.8%2C84.4%2C24.1",
  "Goa": "bbox=73.6%2C14.9%2C74.4%2C15.8",
  "Gujarat": "bbox=68.1%2C20.1%2C74.5%2C24.7",
  "Haryana": "bbox=74.5%2C27.6%2C77.6%2C30.9",
  "Himachal Pradesh": "bbox=75.6%2C30.4%2C79.0%2C33.4",
  "Jharkhand": "bbox=83.3%2C21.9%2C87.9%2C25.3",
  "Karnataka": "bbox=74.1%2C11.6%2C78.6%2C18.5",
  "Kerala": "bbox=74.8%2C8.3%2C77.6%2C12.8",
  "Madhya Pradesh": "bbox=74.0%2C21.1%2C82.8%2C26.9",
  "Maharashtra": "bbox=72.6%2C15.6%2C80.9%2C22.0",
  "Manipur": "bbox=93.0%2C23.8%2C94.8%2C25.7",
  "Meghalaya": "bbox=89.8%2C25.0%2C92.8%2C26.2",
  "Mizoram": "bbox=92.2%2C21.9%2C93.4%2C24.5",
  "Nagaland": "bbox=93.3%2C25.2%2C95.3%2C27.0",
  "Odisha": "bbox=81.4%2C17.8%2C87.5%2C22.6",
  "Punjab": "bbox=73.9%2C29.5%2C76.9%2C32.5",
  "Rajasthan": "bbox=69.5%2C23.1%2C78.3%2C30.2",
  "Sikkim": "bbox=88.0%2C27.1%2C88.9%2C28.1",
  "Tamil Nadu": "bbox=76.2%2C8.1%2C80.3%2C13.6",
  "Telangana": "bbox=77.2%2C15.8%2C81.3%2C19.9",
  "Tripura": "bbox=91.1%2C22.9%2C92.7%2C24.5",
  "Uttar Pradesh": "bbox=77.1%2C23.9%2C84.6%2C30.4",
  "Uttarakhand": "bbox=77.6%2C28.7%2C81.1%2C31.5",
  "West Bengal": "bbox=85.8%2C21.5%2C89.9%2C27.2",
  "Andaman and Nicobar Islands": "bbox=92.2%2C6.7%2C94.0%2C13.7",
  "Chandigarh": "bbox=76.7%2C30.6%2C76.8%2C30.8",
  "Dadra and Nagar Haveli and Daman and Diu": "bbox=72.8%2C20.3%2C73.2%2C20.5",
  "Delhi": "bbox=76.8%2C28.4%2C77.3%2C28.9",
  "Jammu and Kashmir": "bbox=73.5%2C32.3%2C77.6%2C35.5",
  "Ladakh": "bbox=75.5%2C32.5%2C80.5%2C36.0",
  "Lakshadweep": "bbox=71.5%2C8.0%2C74.0%2C12.5",
  "Puducherry": "bbox=79.7%2C11.8%2C79.9%2C12.0"
};

export const MapView: React.FC<MapViewProps> = ({ places, onSelectPlace, selectedRegion = 'Andhra Pradesh' }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(places[0] || null);

  const bboxStr = REGION_BOUNDS[selectedRegion] || "bbox=68.0%2C8.0%2C97.0%2C37.0";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Interactive Region Map
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Explore coastal, natural and heritage landmarks across {selectedRegion}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-md">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-2 relative h-[450px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <iframe
            key={selectedRegion}
            title={`Interactive ${selectedRegion} Map`}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?${bboxStr}&amp;layer=mapnik`}
            className="w-full h-full rounded-xl"
          />
          
          {/* Overlay Floating Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
            <span className="font-bold text-emerald-900 block mb-1">📍 {selectedRegion} Region</span>
            <span className="text-slate-500 text-[11px] block">{places.length} Top Locations Pinned</span>
          </div>
        </div>

        {/* Selected Place Detail / List Side Panel */}
        <div className="flex flex-col h-[450px] overflow-y-auto pr-1 space-y-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider px-1">
            Featured Locations ({places.length})
          </h3>

          {places.length === 0 ? (
            <div className="p-4 text-xs text-slate-500 text-center">No locations found for this region.</div>
          ) : (
            places.map((place) => {
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
            })
          )}
        </div>
      </div>
    </section>
  );
};
