'use client';

import React from 'react';
import { Archetype, ChildProfile } from '../../types';
import { Sparkles, AlertCircle, CheckCircle, Lock, ArrowRight } from 'lucide-react';

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
    <div className="space-y-5">
      {/* 1. Superpowers Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
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
          {!isUnlocked && (
            <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1">
              <span>1 нь нээлттэй</span>
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {/* First Superpower - Always Free Preview */}
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
            <div className="relative rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 overflow-hidden">
              {/* Blurred background mockup */}
              <div className="filter blur-[4px] select-none pointer-events-none space-y-2 opacity-50">
                {archetype.superpowers.slice(1).map((power, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-zinc-600">
                    <span className="w-4 h-4 rounded-full bg-zinc-300" />
                    <span>{power}</span>
                  </div>
                ))}
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col items-center justify-center p-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-zinc-800 bg-white/95 px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm mb-1">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Үлдсэн 3 нуугдмал давуу тал түгжээтэй</span>
                </span>
                <p className="text-[11px] text-zinc-500">
                  9,900₮-ийн бүрэн гарын авлагаар бүрэн тайлагдана
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Growth Areas & Triggers Card (Locked Teaser) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-black text-zinc-900">
              Анхаарах & Дэмжлэг хэрэгтэй эмзэг бүсүүд
            </h3>
            <p className="text-[11px] text-zinc-500">Сэтгэл санааны хямралд хүргэдэг гол хүчин зүйлс</p>
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
          <div className="relative rounded-2xl border border-rose-200/70 bg-gradient-to-b from-rose-50/30 to-rose-50/60 p-6 text-center space-y-3 overflow-hidden">
            <div className="filter blur-[5px] select-none pointer-events-none space-y-2 text-left opacity-30">
              <p className="text-xs text-zinc-600">• Хэт ачаалалд амархан орох болон өөрийгөө түгжих эмзэг хандлага</p>
              <p className="text-xs text-zinc-600">• Шүүмжлэл, чанга дуу хоолойг хүндээр хүлээж авах сэтгэл зүйн эрсдэл</p>
              <p className="text-xs text-zinc-600">• Шинэ орчинд дасан зохицохдоо түгшүүр мэдрэх өдөр тутмын триггерүүд</p>
            </div>

            <div className="relative z-10 space-y-2 pt-1">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-black text-zinc-900 max-w-sm mx-auto leading-snug">
                {childProfile.name}-ийн хямралд хүргэдэг 3 гол триггер & сэргийлэх заавар
              </p>
              <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                Эдгээр эмзэг бүсийг урьдчилан таньснаар хүүхдээ гэнэт тэсэрч уйлахаас хамгаална.
              </p>

              {onOpenPayment && (
                <button
                  type="button"
                  onClick={onOpenPayment}
                  className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Эмзэг бүсийг тайлах (9,900₮)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Golden Communication Rules (Dos & Don'ts) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-card">
        <h3 className="text-base font-black text-zinc-900 mb-4">
          Харилцааны алтан дүрмүүд
        </h3>

        {isUnlocked ? (
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
                <AlertCircle className="w-4 h-4 text-rose-600" />
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
        ) : (
          <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center space-y-3 overflow-hidden">
            <div className="filter blur-[5px] select-none pointer-events-none grid grid-cols-2 gap-3 opacity-30 text-left">
              <div className="p-3 bg-white rounded-xl">
                <p className="font-bold text-xs">Хийх хэрэгтэй:</p>
                <p className="text-[11px]">• 5-10 минутын өмнө сануулах...</p>
              </div>
              <div className="p-3 bg-white rounded-xl">
                <p className="font-bold text-xs">Зайлсхийх:</p>
                <p className="text-[11px]">• Хүчээр түлхэж шахахгүй байх...</p>
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-zinc-800 bg-white px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Харилцааны алтан дүрмүүд түгжээтэй байна</span>
              </span>
              <p className="text-[11px] text-zinc-500">
                Хүүхдээ үгэндээ оруулахын тулд ямар үгнээс зайлсхийхийг бүрэн хөтчөөс уншаарай.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
