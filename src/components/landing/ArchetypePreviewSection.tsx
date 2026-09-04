'use client';

import React from 'react';
import { ARCHETYPES } from '../../data/archetypes';
import { ArchetypeId } from '../../types';

export const ArchetypePreviewSection: React.FC = () => {
  const archetypeList: { id: ArchetypeId; emoji: string; gradient: string }[] = [
    { id: 'gentle_observer', emoji: '🌿', gradient: 'from-pink-500 to-rose-500' },
    { id: 'energetic_pioneer', emoji: '⚡', gradient: 'from-amber-500 to-orange-500' },
    { id: 'focused_inquirer', emoji: '🔍', gradient: 'from-blue-600 to-indigo-600' },
    { id: 'social_radiant', emoji: '☀️', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'calm_harmonizer', emoji: '🌊', gradient: 'from-indigo-600 to-purple-600' },
  ];

  return (
    <section id="archetypes" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
          Сэтгэл зүйн 5 хэв шинж
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2">Таны хүүхэд аль нь вэ?</h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-md mx-auto">
          Хүүхэд бүрийн дотор өөрийн гэсэн онцгой авьяас ба өвөрмөц мэдрэмж нуугддаг
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archetypeList.map(({ id, emoji, gradient }) => {
          const arch = ARCHETYPES[id];
          return (
            <div
              key={id}
              className="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-card hover:shadow-card-hover transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-xl text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}
                >
                  {emoji}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-zinc-900">{arch.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{arch.subtitle}</p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-zinc-400 group-hover:text-indigo-600 transition-colors flex-shrink-0">
                →
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
