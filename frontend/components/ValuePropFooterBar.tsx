'use client';

import React from 'react';
import { CheckCircle, MapPin, Award, Heart } from 'lucide-react';

export const ValuePropFooterBar: React.FC = () => {
  const props = [
    {
      icon: CheckCircle,
      title: 'Authentic & Reliable',
      subtext: 'Curated local information',
      color: 'text-emerald-700 bg-emerald-100',
    },
    {
      icon: MapPin,
      title: 'Local Insights',
      subtext: 'Discover like a local',
      color: 'text-amber-700 bg-amber-100',
    },
    {
      icon: Award,
      title: 'Best Experiences',
      subtext: 'Handpicked recommendations',
      color: 'text-blue-700 bg-blue-100',
    },
    {
      icon: Heart,
      title: 'Save Favorites',
      subtext: 'Bookmark your favorites',
      color: 'text-rose-700 bg-rose-100',
    },
  ];

  return (
    <footer className="w-full bg-slate-900 text-white mt-16 border-t border-slate-800">
      {/* 4 Value Proposition Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur">
          {props.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-2">
                <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{p.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-emerald-400">LOCAL LENS</span>
            <span>&copy; {new Date().getFullYear()} Local Lens Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">API Documentation</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
