'use client';

import React from 'react';
import { Archetype, ChildProfile } from '../../types';
import { formatAgeGroup, getGenderLabel } from '../../lib/utils';
import { Sparkles, Quote, Eye } from 'lucide-react';

interface ArchetypeHeaderProps {
  archetype: Archetype;
  secondaryArchetype?: Archetype;
  childProfile: ChildProfile;
}

export const ArchetypeHeader: React.FC<ArchetypeHeaderProps> = ({
  archetype,
  secondaryArchetype,
  childProfile,
}) => {
  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/90 shadow-card relative overflow-hidden">
      {/* Background Soft Glow */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: archetype.color }}
      />

      {/* Top Header Row with Passport-like Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div className="inline-flex items-center gap-2 bg-zinc-100/90 px-3.5 py-1.5 rounded-xl text-xs font-bold text-zinc-800">
          <Eye className="w-3.5 h-3.5 text-indigo-600" />
          <span>{childProfile.name} ({getGenderLabel(childProfile.gender)})</span>
          <span>·</span>
          <span>{formatAgeGroup(childProfile.ageGroup)}</span>
        </div>

        <span
          className="text-xs font-black px-3.5 py-1.5 rounded-xl border shadow-sm flex items-center gap-1.5"
          style={{
            backgroundColor: `${archetype.color}15`,
            color: archetype.color,
            borderColor: `${archetype.color}40`,
          }}
        >
          <span>{archetype.badge}</span>
        </span>
      </div>

      {/* Main Archetype Title */}
      <div className="mb-5">
        <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
          {childProfile.name}-ийн зан төлөвийн үндсэн хэв шинж
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
          «{archetype.title}»
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-zinc-600 mt-1">
          {archetype.titleEn} — <span className="font-normal text-zinc-500">{archetype.subtitle}</span>
        </p>
      </div>

      {/* Inner Voice Quote Box */}
      <div className="bg-gradient-to-br from-zinc-50 to-indigo-50/30 rounded-2xl p-4 sm:p-5 border border-zinc-200/70 mb-5 relative">
        <Quote className="w-6 h-6 text-indigo-200 absolute top-3.5 right-3.5" />
        <p className="text-xs font-black text-indigo-900 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          {childProfile.name}-ийн дотоод дуу хоолой:
        </p>
        <p className="text-xs sm:text-sm text-zinc-800 font-semibold italic leading-relaxed">
          {archetype.coreMotto}
        </p>
      </div>

      {/* Psychological Summary */}
      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
        {archetype.summary}
      </p>

      {/* Secondary Archetype */}
      {secondaryArchetype && (
        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-600">
          <span className="font-bold text-zinc-800">Дагалдах хэв шинж:</span>
          <span
            className="font-bold px-2.5 py-0.5 rounded-lg border text-[11px]"
            style={{
              backgroundColor: `${secondaryArchetype.color}10`,
              color: secondaryArchetype.color,
              borderColor: `${secondaryArchetype.color}30`,
            }}
          >
            {secondaryArchetype.title}
          </span>
        </div>
      )}
    </div>
  );
};
