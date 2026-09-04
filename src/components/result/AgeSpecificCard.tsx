'use client';

import React from 'react';
import { Archetype, ChildProfile } from '../../types';
import { AGE_SPECIFIC_ADVICE } from '../../data/ageSpecificAdvice';
import { formatAgeGroup } from '../../lib/utils';
import { Calendar, Target, AlertCircle, Sparkles, MessageCircle, Lock, ArrowRight } from 'lucide-react';

interface AgeSpecificCardProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  isUnlocked?: boolean;
  onOpenPayment?: () => void;
}

export const AgeSpecificCard: React.FC<AgeSpecificCardProps> = ({
  archetype,
  childProfile,
  isUnlocked = false,
  onOpenPayment,
}) => {
  const ageData = AGE_SPECIFIC_ADVICE[childProfile.ageGroup]?.[archetype.id];

  if (!ageData) return null;

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-zinc-900">
              {formatAgeGroup(childProfile.ageGroup)}-ны тусгай зөвлөмж
            </h3>
            <p className="text-[11px] text-zinc-500">
              {childProfile.name}-ийн одоогийн насны үе шатанд тохирсон чиглүүлэг
            </p>
          </div>
        </div>
      </div>

      {/* Developmental Focus (Always Free) */}
      <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/60 p-4 rounded-2xl border border-indigo-100 space-y-1">
        <span className="text-[10.5px] font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1">
          <Target className="w-3.5 h-3.5" />
          Энэ насны гол хөгжлийн онцлог:
        </span>
        <p className="text-xs sm:text-sm font-bold text-zinc-900">
          {ageData.developmentalFocus}
        </p>
      </div>

      {/* Unlocked Full Advice vs Locked Teaser */}
      {isUnlocked ? (
        <div className="space-y-3">
          {/* Top Challenge */}
          <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs text-zinc-800">
            <p className="font-bold text-rose-900 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              Тулгардаг нийтлэг бэрхшээл:
            </p>
            <p className="leading-relaxed">{ageData.topChallenge}</p>
          </div>

          {/* Action Tip */}
          <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-zinc-800">
            <p className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Эцэг эхэд зориулсан оновчтой шийдэл:
            </p>
            <p className="leading-relaxed">{ageData.actionableTip}</p>
          </div>

          {/* Real Script */}
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
            <span className="text-[11px] font-black text-zinc-700 flex items-center gap-1.5 uppercase">
              <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
              {ageData.communicationScript.situation}:
            </span>
            <p className="text-xs sm:text-sm font-bold italic text-indigo-900 bg-white p-3 rounded-xl border border-zinc-200/80 leading-relaxed">
              {ageData.communicationScript.whatToSay}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/30 via-white to-indigo-50/20 p-5 text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs sm:text-sm font-black text-zinc-900 max-w-sm mx-auto leading-snug">
            {formatAgeGroup(childProfile.ageGroup)}-ны ярианы бэлэн скриптүүд
          </h4>
          <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
            Хүүхэд зөрүүдлэх, бухимдах үед тайвшруулах бодит үгс болон шийдлийг бүрэн хөтөч номд дэлгэрэнгүй тусгасан.
          </p>

          {onOpenPayment && (
            <button
              type="button"
              onClick={onOpenPayment}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-anzaar-600 hover:shadow-indigo-600/25 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
            >
              <span>Ярианы скриптийг нээх (9,900₮)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
