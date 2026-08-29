'use client';

import React from 'react';
import { Star, ShieldCheck, Heart, Utensils } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  region: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  trust_score: float;
  dietary: string;
}

interface FoodGridProps {
  foods: Food[];
  onSelectFood: (food: Food) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const FoodGrid: React.FC<FoodGridProps> = ({
  foods,
  onSelectFood,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Taste the Region
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Authentic dishes verified by local reviews and dish trust scores
          </p>
        </div>
        <button className="text-emerald-800 text-sm font-bold hover:underline">
          View All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foods.map((food) => {
          const isFav = favorites.includes(food.id);
          return (
            <div
              key={food.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectFood(food)}
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category / Tag Badge */}
                <div className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                  {food.category}
                </div>

                {/* Trust Score Badge */}
                <div className="absolute bottom-2 left-3 bg-emerald-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trust: {food.trust_score}%</span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(food.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 shadow transition-transform active:scale-90"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {food.name}
                    </h3>
                    <span className="text-sm font-extrabold text-emerald-800">
                      ₹{food.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {food.rating}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">{food.dietary}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {food.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Utensils className="w-3 h-3 text-amber-600" />
                    Local Specialty
                  </span>
                  <span className="text-xs font-bold text-emerald-800 group-hover:underline">
                    View Recipe &amp; Spots &rarr;
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
