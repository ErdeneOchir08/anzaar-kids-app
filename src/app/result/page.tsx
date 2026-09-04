'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../../context/QuizContext';
import { ChildSelectorBar } from '../../components/result/ChildSelectorBar';
import { ArchetypeHeader } from '../../components/result/ArchetypeHeader';
import { DimensionBreakdown } from '../../components/result/DimensionBreakdown';
import { SuperpowersAndGrowth } from '../../components/result/SuperpowersAndGrowth';
import { AgeSpecificCard } from '../../components/result/AgeSpecificCard';
import { ShareStoryCard } from '../../components/result/ShareStoryCard';
import { PaywallOffer } from '../../components/result/PaywallOffer';
import { QPayModal } from '../../components/payment/QPayModal';
import { PlusCircle, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const { result, isUnlocked, startNewQuiz } = useQuiz();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If no result is loaded yet
  if (!result) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-zinc-900">Оношилгоо хийгдээгүй байна</h2>
        <p className="text-xs text-zinc-500">
          Та эхлээд хүүхдийнхээ зан төлөвийн сорилыг бөглөж байж энэхүү дүгнэлтийг харах боломжтой.
        </p>
        <Link
          href="/quiz?new=true"
          onClick={startNewQuiz}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3.5 px-6 rounded-2xl shadow-lg transition-all"
        >
          <span>Сорил эхлэх</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleStartNewChild = () => {
    startNewQuiz();
    router.push('/quiz?new=true');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    router.push('/guide');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 0. Multi-Child Selector & Switcher Bar */}
      <ChildSelectorBar />

      {/* 1. Header with Archetype & Core Traits (Full-Width Hero Section) */}
      <ArchetypeHeader
        archetype={result.primaryArchetype}
        secondaryArchetype={result.secondaryArchetype}
        childProfile={result.childProfile}
      />

      {/* 2. Balanced 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Dimensions & Age-Specific Guidance */}
        <div className="space-y-6">
          <DimensionBreakdown scores={result.dimensionScores} />
          <AgeSpecificCard
            archetype={result.primaryArchetype}
            childProfile={result.childProfile}
            isUnlocked={isUnlocked}
            onOpenPayment={() => setIsPaymentOpen(true)}
          />
        </div>

        {/* Right Column: Strengths & Growth Areas (with locked teaser cards) */}
        <div className="space-y-6">
          <SuperpowersAndGrowth
            archetype={result.primaryArchetype}
            childProfile={result.childProfile}
            isUnlocked={isUnlocked}
            onOpenPayment={() => setIsPaymentOpen(true)}
          />
        </div>
      </div>

      {/* 3. Direct PDF Unlock & Playbook Download Offer (Full Width Premium Banner) */}
      <PaywallOffer
        archetype={result.primaryArchetype}
        childProfile={result.childProfile}
        isUnlocked={isUnlocked}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* 4. Viral Instagram Story Share Card (Full Width / 2-Col on Desktop) */}
      <ShareStoryCard
        archetype={result.primaryArchetype}
        childProfile={result.childProfile}
      />

      {/* 5. Bottom Actions: Copy Link & New Child */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-8 border-t border-zinc-200/90">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-white px-5 py-3 rounded-2xl border border-zinc-200 shadow-sm transition-all hover:bg-zinc-50"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Холбоосыг хууллаа!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Дүгнэлтийн холбоосыг хуулах</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleStartNewChild}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 py-3 px-5 rounded-2xl transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Өөр хүүхдэд шинэ сорил эхлэх</span>
        </button>
      </div>

      {/* QPay Modal */}
      <QPayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
