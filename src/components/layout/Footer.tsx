'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white/90 py-10 px-4 text-center text-xs text-zinc-500">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-zinc-900 text-sm tracking-tight">ANZAAR LAB</span>
        </div>

        <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
          «Хүүхдийн зан авир бүр цаанаа учир шалтгаантай. Түүнийг шүүмжлэхээс өмнө <strong>хайраар анзааръя</strong>.»
        </p>

        <div className="flex justify-center gap-5 text-xs text-zinc-600 font-medium pt-2">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Нүүр хуудас</Link>
          <Link href="/quiz" className="hover:text-indigo-600 transition-colors">Сорил өгөх</Link>
          <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Нууцлалын бодлого</Link>
        </div>

        <p className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-100">
          © {new Date().getFullYear()} ANZAAR.MN · Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </footer>
  );
};
