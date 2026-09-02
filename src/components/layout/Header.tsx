'use client';

import React from 'react';
import Link from 'next/link';
import { useQuiz } from '../../context/QuizContext';
import { Sparkles, ArrowRight, BookOpen, HelpCircle, Layers } from 'lucide-react';

export const Header: React.FC = () => {
  const { savedAssessments, startNewQuiz } = useQuiz();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-600 via-anzaar-600 to-rose-500 p-[1.5px] sm:p-[2px] shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-white rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <span className="text-sm sm:text-base font-black bg-gradient-to-br from-indigo-600 to-rose-500 bg-clip-text text-transparent">
                A
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950 font-sans">
                ANZAAR
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase px-1 sm:px-1.5 py-0.2 sm:py-0.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-md border border-indigo-200/60">
                KIDS
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium hidden md:block -mt-0.5">
              Хүүхдийн зан төлөв, сэтгэл зүйн оношилгоо
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-zinc-600">
          <a
            href="/#archetypes"
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>5 Хэв шинж</span>
          </a>
          <a
            href="/#benefits"
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Хөтөлбөрийн тухай</span>
          </a>
          <a
            href="/#faq"
            className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Асуулт хариулт</span>
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {savedAssessments.length > 0 && (
            <Link
              href="/result"
              className="text-[11px] sm:text-xs font-bold text-zinc-700 hover:text-indigo-600 bg-zinc-100 hover:bg-zinc-200/80 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all flex-shrink-0"
            >
              <span className="hidden sm:inline">Үр дүн </span>
              <span>({savedAssessments.length})</span>
            </Link>
          )}

          <Link
            href="/quiz?new=true"
            onClick={startNewQuiz}
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[11.5px] sm:text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/25 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-indigo-600/15 transition-all active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{savedAssessments.length > 0 ? '+ Сорил' : 'Сорил эхлэх'}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
};
