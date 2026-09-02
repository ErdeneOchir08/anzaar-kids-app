'use client';

import React from 'react';
import { Archetype, ChildProfile } from '../../types';
import { Sparkles, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface SuperpowersAndGrowthProps {
  archetype: Archetype;
  childProfile: ChildProfile;
}

export const SuperpowersAndGrowth: React.FC<SuperpowersAndGrowthProps> = ({
  archetype,
  childProfile,
}) => {
  return (
    <div className="space-y-4">
      {/* Superpowers Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-zinc-900">
              {childProfile.name}-ийн супер давуу талууд
            </h3>
            <p className="text-[11px] text-zinc-500">Төрөлхийн хүч чадал ба онцгой авьяас</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {archetype.superpowers.map((power, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs font-semibold text-zinc-800"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{power}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Areas & Triggers Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-zinc-900">
              Анхаарах & Дэмжлэг хэрэгтэй хэсгүүд
            </h3>
            <p className="text-[11px] text-zinc-500">Сэтгэл санааны хямралд хүргэдэг хүчин зүйлс</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {archetype.growthAreas.map((area, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs font-medium text-zinc-800"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 mt-1.5" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Dos and Don'ts */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <h3 className="text-base font-black text-zinc-900 mb-4">
          Харилцааны алтан дүрмүүд
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Dos */}
          <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-200/60">
            <h4 className="text-xs font-black text-indigo-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              Хийх хэрэгтэй:
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700">
              {archetype.parentingDos.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200/60">
            <h4 className="text-xs font-black text-rose-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wide">
              <XCircle className="w-4 h-4 text-rose-600" />
              Зайлсхийх зүйлс:
            </h4>
            <ul className="space-y-2 text-xs text-zinc-700">
              {archetype.parentingDonts.slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
