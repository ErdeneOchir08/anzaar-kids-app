'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-14 sm:pb-16 px-3 sm:px-4 w-full max-w-full">
      {/* Background Soft Ambient Gradient Glow (Constrained inside section) */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-80 max-w-full rounded-full bg-gradient-to-tr from-indigo-300/25 via-anzaar-300/20 to-rose-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-xl text-center w-full min-w-0">
        {/* Top Tag Pill */}
        <div className="mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-indigo-200/80 bg-white/95 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-indigo-950 shadow-sm shadow-indigo-500/5 backdrop-blur-md max-w-full">
          <span className="flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-anzaar-600 text-white flex-shrink-0">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </span>
          <span className="truncate">Шинжлэх ухаанд суурилсан оношилгоо</span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-950 leading-tight">
          Хүүхдээ шүүмжлэх биш, <br />
          эхлээд <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-anzaar-600 to-rose-500 font-black">
            АНЗААР
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-rose-400" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 5.5 Q 25 1 50 4 T 99 3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>!
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-600 max-w-lg mx-auto">
          «Зөрүүд, дураараа, хэт мэдрэмтгий» зангийн цаана хүүхдийн <strong>төрөлхийн сэтгэл зүйн онцлог</strong> байдаг. 20 асуултаар хүүхдээ ягштал таньж, өдөр тутмын хямралыг тайлах бэлэн ярианы хөтөч аваарай.
        </p>

        {/* 4 Pillars Mini Floating Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-left">
          <div className="bg-white/90 p-2 sm:p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center text-[11px] sm:text-xs flex-shrink-0">🌿</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-800 leading-tight truncate">Мэдрэг байдал</span>
          </div>
          <div className="bg-white/90 p-2 sm:p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] sm:text-xs flex-shrink-0">🛡️</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-800 leading-tight truncate">Өөрийгөө удирдах</span>
          </div>
          <div className="bg-white/90 p-2 sm:p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] sm:text-xs flex-shrink-0">✨</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-800 leading-tight truncate">Нийгэмшил</span>
          </div>
          <div className="bg-white/90 p-2 sm:p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-[11px] sm:text-xs flex-shrink-0">⚡</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-800 leading-tight truncate">Эрч хүч</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2.5">
          <Link
            href="/quiz"
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black text-white shadow-xl shadow-indigo-600/25 transition-all duration-200 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.98]"
          >
            <span>СОРИЛ ЭХЛЭХ (3 МИНУТ)</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Үнэгүй суурь оношилгоо
            </span>
            <span>·</span>
            <span>Зөв, буруу хариултгүй</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-7 sm:mt-9 rounded-3xl bg-white/80 border border-zinc-200/80 p-3 sm:p-4 shadow-sm grid grid-cols-3 gap-1 sm:gap-2 text-center">
          <div className="min-w-0">
            <p className="text-base sm:text-xl font-black text-zinc-900">5,400+</p>
            <p className="text-[9.5px] sm:text-[11px] text-zinc-500 font-medium leading-tight">Оролцсон эцэг эх</p>
          </div>
          <div className="border-x border-zinc-200 min-w-0">
            <p className="text-base sm:text-xl font-black text-indigo-600">5 Төрөл</p>
            <p className="text-[9.5px] sm:text-[11px] text-zinc-500 font-medium leading-tight">Зан төлөвийн хэв шинж</p>
          </div>
          <div className="min-w-0">
            <p className="text-base sm:text-xl font-black text-rose-500">4.9 / 5.0</p>
            <p className="text-[9.5px] sm:text-[11px] text-zinc-500 font-medium leading-tight">Сэтгэл ханамж</p>
          </div>
        </div>
      </div>
    </section>
  );
};
