'use client';

import React from 'react';
import { DimensionId, DimensionScore } from '../../types';
import { DIMENSIONS } from '../../data/questions';

interface RadarChartProps {
  scores: Record<DimensionId, DimensionScore>;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores, size = 280 }) => {
  const center = size / 2;
  const radius = (size / 2) - 40;

  const dims: { id: DimensionId; angle: number; label: string; color: string }[] = [
    { id: 'sensitivity', angle: -90, label: 'Мэдрэг байдал', color: DIMENSIONS.sensitivity.color },
    { id: 'energy', angle: 0, label: 'Эрч хүч', color: DIMENSIONS.energy.color },
    { id: 'regulation', angle: 90, label: 'Өөрийгөө удирдах', color: DIMENSIONS.regulation.color },
    { id: 'adaptability', angle: 180, label: 'Дасан зохицол', color: DIMENSIONS.adaptability.color },
  ];

  const getCoordinates = (angleDeg: number, distance: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: center + distance * Math.cos(angleRad),
      y: center + distance * Math.sin(angleRad),
    };
  };

  const scorePoints = dims
    .map((d) => {
      const percentage = scores[d.id]?.percentage || 50;
      const dist = (percentage / 100) * radius;
      const { x, y } = getCoordinates(d.angle, dist);
      return `${x},${y}`;
    })
    .join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background webs */}
        {rings.map((ring, idx) => {
          const ringPoints = dims
            .map((d) => {
              const { x, y } = getCoordinates(d.angle, radius * ring);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={idx}
              points={ringPoints}
              fill={idx % 2 === 0 ? '#f8fafc' : 'none'}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={idx < 3 ? '3 3' : undefined}
            />
          );
        })}

        {/* Axes lines */}
        {dims.map((d) => {
          const { x, y } = getCoordinates(d.angle, radius);
          return (
            <line
              key={d.id}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Value polygon with Indigo/Violet glow */}
        <polygon
          points={scorePoints}
          fill="rgba(99, 102, 241, 0.28)"
          stroke="#4f46e5"
          strokeWidth="3"
          className="transition-all duration-700 ease-out"
        />

        {/* Data points */}
        {dims.map((d) => {
          const percentage = scores[d.id]?.percentage || 50;
          const dist = (percentage / 100) * radius;
          const { x, y } = getCoordinates(d.angle, dist);
          return (
            <g key={d.id} className="transition-all duration-700 ease-out">
              <circle cx={x} cy={y} r="5.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2.5" />
            </g>
          );
        })}

        {/* Labels */}
        {dims.map((d) => {
          const { x, y } = getCoordinates(d.angle, radius + 22);
          const percentage = scores[d.id]?.percentage || 50;
          return (
            <text
              key={d.id}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[11px] font-bold fill-zinc-800"
            >
              {d.label} ({percentage}%)
            </text>
          );
        })}
      </svg>
    </div>
  );
};
