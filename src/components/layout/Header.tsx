'use client';

import React from 'react';
import Link from 'next/link';
import { useQuiz } from '../../context/QuizContext';
import { Eye, ArrowUpRight, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const { savedAssessments, startNewQuiz } = useQuiz();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 border-b border-zinc-200/70 transition-all">
      <div className="max-w-xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand Logo & Typography */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-anzaar-600 to-rose-500 p-[1.5px] shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Eye className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-zinc-900 font-sans">
                ANZAAR
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200/60">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Хүүхдийн сэтгэл зүйн сорил
            </span>
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {savedAssessments.length > 0 && (
            <Link
              href="/result"
              className="text-xs font-bold text-zinc-700 hover:text-indigo-600 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-all"
            >
              Үр дүн үзэх ({savedAssessments.length})
            </Link>
          )}

          <Link
            href="/quiz?new=true"
            onClick={startNewQuiz}
            className="group inline-flex items-center gap-1.5 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-full shadow-md shadow-zinc-900/10 transition-all active:scale-95"
          >
            <span>{savedAssessments.length > 0 ? '+ Шинэ хүүхэд' : 'Сорил эхлэх'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
};
