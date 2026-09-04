'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round(((current + 1) / total) * 100);

  const getEncouragement = (pct: number) => {
    if (pct <= 25) return 'Амжилттай эхэллээ! ✨';
    if (pct <= 50) return 'Таны хариултууд маш тодорхой байна! 🎯';
    if (pct <= 75) return 'Хүүхдийн тань онцлог тодорхой болж байна! 💡';
    return 'Сүүлийн хэдхэн асуулт үлдлээ! 🌟';
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 sticky top-14 sm:top-16 z-30 py-3 px-4 shadow-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-700 mb-2">
          <span className="bg-zinc-100 px-2.5 py-0.5 rounded-md text-[11px] font-black text-zinc-800">
            {current + 1} / {total}
          </span>
          <span className="text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200/80 text-[11px] font-bold">
            {getEncouragement(percentage)}
          </span>
          <span className="font-black text-zinc-900">{percentage}%</span>
        </div>

        <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-anzaar-500 to-rose-500 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
