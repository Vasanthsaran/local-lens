'use client';

import React from 'react';
import { Utensils, MapPin, Sparkles, Map } from 'lucide-react';

interface CategoryCardsGridProps {
  onCategoryClick: (category: string) => void;
}

export const CategoryCardsGrid: React.FC<CategoryCardsGridProps> = ({ onCategoryClick }) => {
  const categories = [
    {
      id: 'food',
      title: 'Food',
      subtext: 'Explore authentic local dishes and cuisines',
      icon: Utensils,
      iconBg: 'bg-amber-500 text-white',
      badgeBg: 'bg-amber-100 text-amber-800',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'places',
      title: 'Places',
      subtext: 'Discover famous tourist attractions and landmarks',
      icon: MapPin,
      iconBg: 'bg-blue-600 text-white',
      badgeBg: 'bg-blue-100 text-blue-800',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'culture',
      title: 'Culture',
      subtext: 'Experience local traditions, festivals and heritage',
      icon: Sparkles,
      iconBg: 'bg-purple-600 text-white',
      badgeBg: 'bg-purple-100 text-purple-800',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'map',
      title: 'Explore Map',
      subtext: 'Explore locations on interactive map',
      icon: Map,
      iconBg: 'bg-emerald-700 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cat.badgeBg}`}>
                    Browse
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  {cat.subtext}
                </p>
              </div>

              {/* Image preview */}
              <div className="mt-4 h-28 rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
