'use client';

import React, { useRef, useState } from 'react';
import { Archetype, ChildProfile } from '../../types';
import { formatAgeGroup } from '../../lib/utils';
import { Share2, Download, Sparkles, Check, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareStoryCardProps {
  archetype: Archetype;
  childProfile: ChildProfile;
}

export const ShareStoryCard: React.FC<ShareStoryCardProps> = ({
  archetype,
  childProfile,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#fafaf8',
        useCORS: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${childProfile.name}_anzaar_passport.png`;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate share image', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left column on desktop: Info & CTA */}
        <div className="md:col-span-5 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
            <Share2 className="w-3.5 h-3.5" />
            <span>Story зураг татах</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-zinc-900 leading-snug">
            {childProfile.name}-ийн зан төлөвийн картыг бусадтай хуваалцах
          </h3>

          <p className="text-xs text-zinc-500 leading-relaxed">
            Instagram Story болон гэр бүлийн чатандаа оруулахад зориулсан хүүхдийн тань онцлох чанаруудыг багтаасан тусгай зураг.
          </p>

          <div className="pt-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleDownloadImage}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white text-xs font-black py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-95 disabled:opacity-60"
            >
              {isGenerating ? (
                <span>Зургийг бэлтгэж байна...</span>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Story зураг татагдлаа!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Зураг татаж авах (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right column on desktop: Story Preview */}
        <div className="md:col-span-7 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-xs sm:max-w-sm rounded-[28px] p-6 text-zinc-900 border border-zinc-200 shadow-xl relative overflow-hidden bg-gradient-to-br from-white via-zinc-50 to-indigo-50/50"
          >
            {/* Decorative Corner Glow */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-25 pointer-events-none"
              style={{ backgroundColor: archetype.color }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center">
                  <Eye className="w-3 h-3" />
                </div>
                <span className="text-[10.5px] font-black tracking-wider uppercase text-zinc-900">
                  ANZAAR KIDS
                </span>
              </div>
              <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                {formatAgeGroup(childProfile.ageGroup)}
              </span>
            </div>

            {/* Child & Archetype */}
            <div className="my-3 text-center">
              <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                ЗАН ТӨЛӨВИЙН ХЭВ ШИНЖ
              </span>
              <h4 className="text-xl font-black text-zinc-900 mt-1.5 leading-snug">
                {childProfile.name} бол <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">
                  «{archetype.title}»
                </span>
              </h4>
              <p className="text-[11px] text-zinc-500 font-semibold mt-0.5">
                {archetype.subtitle}
              </p>
            </div>

            {/* Superpowers */}
            <div className="bg-white/95 rounded-2xl p-3.5 border border-zinc-200/90 my-3 space-y-1.5 shadow-sm">
              <p className="text-[11px] font-black text-zinc-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {childProfile.name}-ийн онцлох чанарууд:
              </p>
              {archetype.superpowers.slice(0, 3).map((sp, idx) => (
                <p key={idx} className="text-[11px] text-zinc-700 flex items-start gap-1.5 font-medium leading-tight">
                  <span className="text-indigo-600 font-black">✓</span>
                  <span>{sp}</span>
                </p>
              ))}
            </div>

            {/* Motto quote */}
            <p className="text-[11px] text-zinc-600 italic text-center px-2 py-1 leading-relaxed">
              "{archetype.coreMotto}"
            </p>

            {/* Footer Branding */}
            <div className="mt-4 pt-3 border-t border-zinc-200/80 flex items-center justify-between text-[10px] text-zinc-400 font-medium">
              <span>anzaar.mn</span>
              <span>Хайраар анзааръя ✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
