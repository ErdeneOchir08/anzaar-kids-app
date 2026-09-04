'use client';

import React from 'react';
import { Archetype, ChildProfile } from '../../types';
import { Sparkles, AlertCircle, CheckCircle, Lock, ArrowRight, Check, X } from 'lucide-react';

interface SuperpowersAndGrowthProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  isUnlocked?: boolean;
  onOpenPayment?: () => void;
}

export const SuperpowersAndGrowth: React.FC<SuperpowersAndGrowthProps> = ({
  archetype,
  childProfile,
  isUnlocked = false,
  onOpenPayment,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Superpowers Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-black text-zinc-900">
                {childProfile.name}-ийн онцлох давуу талууд
              </h3>
              <p className="text-[11px] text-zinc-500">Төрөлхийн авьяас чадвар ба онцлог шинж</p>
            </div>
          </div>
          {!isUnlocked && (
            <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl">
              1 нь нээлттэй
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {/* First Superpower - Always Free */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-xs sm:text-sm font-semibold text-zinc-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>{archetype.superpowers[0]}</span>
          </div>

          {/* Remaining Superpowers */}
          {isUnlocked ? (
            archetype.superpowers.slice(1).map((power, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-xs sm:text-sm font-semibold text-zinc-800"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{power}</span>
              </div>
            ))
          ) : (
            <div className="space-y-2 pt-1">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="p-3 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 flex items-center justify-between text-xs text-zinc-500"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-semibold text-zinc-600">Нэмэлт давуу тал #{num + 1}</span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600">Түгжээтэй</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Growth Areas & Triggers Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-zinc-900">
              Анхаарах эмзэг талууд
            </h3>
            <p className="text-[11px] text-zinc-500">Уурлаж, бухимдах үед нөлөөлдөг гол нөхцөлүүд</p>
          </div>
        </div>

        {isUnlocked ? (
          <div className="space-y-2.5">
            {archetype.growthAreas.map((area, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs sm:text-sm font-medium text-zinc-800"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-rose-200/90 bg-gradient-to-br from-rose-50/40 via-white to-rose-50/30 p-5 text-center space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-xs sm:text-sm font-black text-zinc-900 max-w-sm mx-auto leading-snug">
              {childProfile.name}-ийн бухимдах 3 гол нөхцөл & сэргийлэх арга
            </h4>
            <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Хүүхдийг зөрүүдлэх үед бус, урьдчилан таньж тайван зохицуулах практик зөвлөгөө.
            </p>
            {onOpenPayment && (
              <button
                type="button"
                onClick={onOpenPayment}
                className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
              >
                <span>Бүрэн хөтчөөс нээх (9,900₮)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. Daily Communication Principles (Dos & Don'ts) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-card">
        <h3 className="text-base font-black text-zinc-900 mb-1">
          Өдөр тутмын харилцаанд баримтлах зарчим
        </h3>
        <p className="text-[11px] text-zinc-500 mb-4">Хүүхэдтэйгээ ойлголцоход туслах алхмууд</p>

        {isUnlocked ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Dos */}
            <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-200/60">
              <h4 className="text-xs font-black text-indigo-900 mb-2.5 flex items-center gap-1.5 uppercase tracking-wide">
                <Check className="w-4 h-4 text-indigo-600" />
                Дэмжих зөв хандлага:
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
                <X className="w-4 h-4 text-rose-600" />
                Зайлсхийх алдаа:
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
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 text-center space-y-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-zinc-800 bg-white px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Харилцааны зөвлөмжүүд түгжээтэй байна</span>
            </span>
            <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
              Хүүхдийнхээ эсэргүүцлийг бууруулах, үгэндээ оруулахад баримтлах алхмуудыг бүрэн хөтчөөс уншаарай.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
