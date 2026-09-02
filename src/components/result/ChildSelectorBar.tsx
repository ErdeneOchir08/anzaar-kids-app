'use client';

import React from 'react';
import Link from 'next/link';
import { useQuiz } from '../../context/QuizContext';
import { Users, Plus, Check } from 'lucide-react';

export const ChildSelectorBar: React.FC = () => {
  const { savedAssessments, result, loadChildAssessment, startNewQuiz } = useQuiz();

  if (savedAssessments.length <= 1) {
    return (
      <div className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-zinc-200/80 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <span className="text-base">{result?.childProfile.gender === 'girl' ? '👧' : '👦'}</span>
          <span className="font-bold text-zinc-900">
            Оношилгоо: <strong>{result?.childProfile.name}</strong>
          </span>
        </div>
        <Link
          href="/quiz?new=true"
          onClick={startNewQuiz}
          className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Өөр хүүхэд нэмэх</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-4 border border-zinc-200 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>Таны хүүхдүүдийн оношилгоо ({savedAssessments.length}):</span>
        </span>

        <Link
          href="/quiz?new=true"
          onClick={startNewQuiz}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>Шинэ сорил</span>
        </Link>
      </div>

      {/* Children Chips */}
      <div className="flex flex-wrap gap-2">
        {savedAssessments.map((item) => {
          const isActive = result?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => loadChildAssessment(item.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm ring-2 ring-zinc-900'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200/80'
              }`}
            >
              <span>{item.childProfile.gender === 'girl' ? '👧' : '👦'}</span>
              <span>{item.childProfile.name}</span>
              {isActive && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
