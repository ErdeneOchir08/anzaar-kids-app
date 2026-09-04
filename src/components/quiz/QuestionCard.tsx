'use client';

import React from 'react';
import { Question } from '../../types';
import { DEFAULT_OPTIONS, DIMENSIONS } from '../../data/questions';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedValue?: number;
  onSelect: (value: number) => void;
  onPrev?: () => void;
  canPrev: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedValue,
  onSelect,
  onPrev,
  canPrev,
}) => {
  const dim = DIMENSIONS[question.dimension];
  const options = question.options || DEFAULT_OPTIONS;

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="bg-white rounded-[28px] sm:rounded-3xl p-4 sm:p-10 border border-zinc-200/90 shadow-card">
        {/* Top Dimension Pill & Back */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span
            className="text-[11px] sm:text-xs font-black px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm"
            style={{
              backgroundColor: `${dim.color}15`,
              color: dim.color,
              borderColor: `${dim.color}35`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dim.color }}
            />
            {dim.name}
          </span>

          {canPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-zinc-400 hover:text-zinc-800 transition-colors py-1.5 px-2.5 sm:px-3 rounded-xl hover:bg-zinc-100"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Буцах</span>
            </button>
          )}
        </div>

        {/* Question Prompt */}
        <h2 className="text-lg sm:text-2xl font-black text-zinc-900 leading-snug mb-3 sm:mb-4">
          {question.prompt}
        </h2>

        {/* Question Subtext */}
        {question.subtext && (
          <p className="text-xs sm:text-sm text-zinc-600 bg-zinc-50 rounded-2xl p-3 sm:p-4 border border-zinc-200/60 mb-4 sm:mb-6 leading-relaxed">
            💡 <strong>Жишээ нь:</strong> {question.subtext}
          </p>
        )}

        {/* 5 Distinct Option Buttons */}
        <div className="space-y-2 sm:space-y-3">
          {options.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSelect(opt.value)}
                className={`w-full p-3.5 sm:p-5 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 active:scale-[0.99] ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 shadow-md ring-2 ring-indigo-600/30'
                    : 'bg-zinc-50/70 border-zinc-200 text-zinc-800 hover:bg-zinc-100/90 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-zinc-200/80 text-zinc-600'
                    }`}
                  >
                    {opt.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold leading-tight">
                    {opt.label}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
