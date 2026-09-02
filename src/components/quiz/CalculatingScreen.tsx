'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Eye } from 'lucide-react';

interface CalculatingScreenProps {
  onComplete: () => void;
  childName: string;
}

export const CalculatingScreen: React.FC<CalculatingScreenProps> = ({
  onComplete,
  childName,
}) => {
  const [step, setStep] = useState(0);

  const steps = [
    'Хариултуудыг нэгтгэж байна...',
    '4 хэмжээст сэтгэл зүйн матрицыг тооцоолж байна...',
    `${childName}-ийн зан төлөвийн хэв шинжийг (Archetype) оношилж байна...`,
    'Хувьчилсан зөвлөмжүүдийг боловсруулж байна...',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 650);
    const timer2 = setTimeout(() => setStep(2), 1400);
    const timer3 = setTimeout(() => setStep(3), 2200);
    const timer4 = setTimeout(() => onComplete(), 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 max-w-md mx-auto text-center">
      {/* Animated Glowing Iris Spinner */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-anzaar-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse">
            <Eye className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-zinc-900 mb-2">
        {childName}-ийн дүгнэлтийг бэлтгэж байна
      </h2>
      <p className="text-xs text-zinc-500 mb-8 max-w-xs mx-auto">
        ANZAAR алгоритм хүүхдийн сэтгэл зүйн өвөрмөц матрицыг боловсруулж байна
      </p>

      {/* Progress check steps */}
      <div className="w-full bg-white rounded-3xl p-5 border border-zinc-200/90 shadow-card space-y-3.5 text-left">
        {steps.map((text, idx) => {
          const isDone = step > idx;
          const isCurrent = step === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                isDone
                  ? 'text-indigo-700 font-bold'
                  : isCurrent
                  ? 'text-zinc-900 font-black'
                  : 'text-zinc-400 font-medium'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-zinc-300 flex-shrink-0" />
              )}
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
