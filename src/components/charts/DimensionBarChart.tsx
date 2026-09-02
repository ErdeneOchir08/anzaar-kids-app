'use client';

import React from 'react';
import { DimensionId, DimensionScore } from '../../types';
import { DIMENSIONS } from '../../data/questions';
import { HeartHandshake, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface DimensionBarChartProps {
  scores: Record<DimensionId, DimensionScore>;
}

const icons: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
};

export const DimensionBarChart: React.FC<DimensionBarChartProps> = ({ scores }) => {
  const dimensionList: DimensionId[] = ['sensitivity', 'regulation', 'adaptability', 'energy'];

  return (
    <div className="space-y-4 w-full">
      {dimensionList.map((dimId) => {
        const info = DIMENSIONS[dimId];
        const score = scores[dimId] || { percentage: 50, level: 'moderate', levelDescription: '' };

        return (
          <div key={dimId} className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: info.color }}
                >
                  {icons[info.iconName] || <Sparkles className="w-4 h-4" />}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">{info.name}</h4>
                  <p className="text-[11px] text-stone-500">{info.shortDesc}</p>
                </div>
              </div>
              <span className="text-base font-bold text-stone-800">{score.percentage}%</span>
            </div>

            {/* Progress track */}
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${score.percentage}%`,
                  backgroundColor: info.color,
                }}
              />
            </div>

            {/* Level badge and description */}
            <p className="text-[12px] text-stone-600 bg-stone-50 rounded-xl p-2 border border-stone-100 leading-relaxed">
              {score.levelDescription}
            </p>
          </div>
        );
      })}
    </div>
  );
};
