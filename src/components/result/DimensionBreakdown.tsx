'use client';

import React, { useState } from 'react';
import { DimensionId, DimensionScore } from '../../types';
import { RadarChart } from '../charts/RadarChart';
import { DimensionBarChart } from '../charts/DimensionBarChart';
import { Radar, BarChart2 } from 'lucide-react';

interface DimensionBreakdownProps {
  scores: Record<DimensionId, DimensionScore>;
}

export const DimensionBreakdown: React.FC<DimensionBreakdownProps> = ({ scores }) => {
  const [viewMode, setViewMode] = useState<'radar' | 'bars'>('radar');

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-black text-zinc-900">4 Тэнхлэгийн матриц</h3>
          <p className="text-xs text-zinc-500">Сэтгэл зүйн үндсэн тэнхлэгүүдийн үнэлгээ</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-zinc-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setViewMode('radar')}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'radar'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Радар</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bars')}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'bars'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Жагсаалт</span>
          </button>
        </div>
      </div>

      {viewMode === 'radar' ? (
        <div className="py-2 flex flex-col items-center">
          <RadarChart scores={scores} size={280} />
          <div className="mt-5 pt-4 border-t border-zinc-100 w-full text-center">
            <button
              type="button"
              onClick={() => setViewMode('bars')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
            >
              Дэлгэрэнгүй түвшний тайлбарыг харах →
            </button>
          </div>
        </div>
      ) : (
        <DimensionBarChart scores={scores} />
      )}
    </div>
  );
};
