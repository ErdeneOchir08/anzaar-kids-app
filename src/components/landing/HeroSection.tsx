'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Zap, Eye, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-18 px-4">
      {/* Dynamic Aesthetic Gradient Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-300/30 via-anzaar-300/30 to-coral-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Top Tag Pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-1.5 text-xs font-bold text-indigo-900 shadow-sm shadow-indigo-500/5 backdrop-blur-md">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-anzaar-600 text-white">
            <Sparkles className="h-3 w-3" />
          </span>
          <span>Шинжлэх ухаанд суурилсан сэтгэл зүйн сорил</span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-[42px] sm:leading-[1.18]">
          Хүүхдээ шүүмжлэх биш, <br />
          эхлээд <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-anzaar-600 to-rose-500 font-black">
            АНЗААР
            <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-rose-400" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 5.5 Q 25 1 50 4 T 99 3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>!
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 max-w-lg mx-auto">
          «Зөрүүд, дураараа, хэт мэдрэмтгий» зангийн цаана хүүхдийн <strong>төрөлхийн сэтгэл зүйн онцлог</strong> байдаг. 20 асуултаар хүүхдээ ягштал таньж, өдөр тутмын хямралыг тайлах бэлэн ярианы хөтөч аваарай.
        </p>

        {/* 4 Pillars Mini Floating Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
          <div className="bg-white/80 p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center text-xs">🌿</span>
            <span className="text-[11px] font-bold text-zinc-800 leading-tight">Мэдрэг байдал</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">🛡️</span>
            <span className="text-[11px] font-bold text-zinc-800 leading-tight">Өөрийгөө удирдах</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✨</span>
            <span className="text-[11px] font-bold text-zinc-800 leading-tight">Нийгэмшил</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-xs">⚡</span>
            <span className="text-[11px] font-bold text-zinc-800 leading-tight">Эрч хүч</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/quiz"
            className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 px-8 py-4 text-base font-black text-white shadow-xl shadow-indigo-600/25 transition-all duration-200 hover:shadow-indigo-600/40 hover:scale-[1.01] active:scale-[0.98]"
          >
            <span>СОРИЛ ЭХЛЭХ (3 МИНУТ)</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Үнэгүй суурь оношилгоо
            </span>
            <span>·</span>
            <span>Зөв, буруу хариултгүй</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 rounded-3xl bg-white/70 border border-zinc-200/70 p-4 shadow-sm grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xl font-black text-zinc-900">5,400+</p>
            <p className="text-[11px] text-zinc-500 font-medium">Оролцсон эцэг эх</p>
          </div>
          <div className="border-x border-zinc-200">
            <p className="text-xl font-black text-indigo-600">5 Төрөл</p>
            <p className="text-[11px] text-zinc-500 font-medium">Зан төлөвийн хэв шинж</p>
          </div>
          <div>
            <p className="text-xl font-black text-rose-500">4.9 / 5.0</p>
            <p className="text-[11px] text-zinc-500 font-medium">Сэтгэл ханамж</p>
          </div>
        </div>
      </div>
    </section>
  );
};
