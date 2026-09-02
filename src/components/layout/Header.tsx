'use client';

import React from 'react';
import Link from 'next/link';
import { useQuiz } from '../../context/QuizContext';
import { Sparkles, ArrowRight, BookOpen, HelpCircle, Layers } from 'lucide-react';

export const Header: React.FC = () => {
  const { savedAssessments, startNewQuiz } = useQuiz();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl border-b border-zinc-200/80 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-anzaar-600 to-rose-500 p-[2px] shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-base font-black bg-gradient-to-br from-indigo-600 to-rose-500 bg-clip-text text-transparent">
                A
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-zinc-950 font-sans">
                ANZAAR
              </span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-md border border-indigo-200/60">
                KIDS
              </span>
            </div>
            <span className="text-[10.5px] text-zinc-400 font-medium hidden sm:block -mt-0.5">
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
        <div className="flex items-center gap-2.5">
          {savedAssessments.length > 0 && (
            <Link
              href="/result"
              className="text-xs font-bold text-zinc-700 hover:text-indigo-600 bg-zinc-100 hover:bg-zinc-200/80 px-3 sm:px-3.5 py-2 rounded-xl transition-all"
            >
              <span className="hidden sm:inline">Миний үр дүн </span>
              <span>({savedAssessments.length})</span>
            </Link>
          )}

          <Link
            href="/quiz?new=true"
            onClick={startNewQuiz}
            className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/25 px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/15 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{savedAssessments.length > 0 ? 'Шинэ сорил' : 'Сорил эхлэх'}</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>
    </header>
  );
};
