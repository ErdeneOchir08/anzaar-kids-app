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
import { SendEmailModal } from '../../components/email/SendEmailModal';
import { PlusCircle, ArrowRight, Sparkles, Copy, Check, Lock, Download, Mail } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const { result, isUnlocked, startNewQuiz } = useQuiz();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
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
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8 pb-28 lg:pb-8">
      {/* 0. Multi-Child Selector & Switcher Bar */}
      <ChildSelectorBar />

      {/* 1. Header with Archetype & Core Traits (Full-Width Hero Section) */}
      <ArchetypeHeader
        archetype={result.primaryArchetype}
        secondaryArchetype={result.secondaryArchetype}
        childProfile={result.childProfile}
      />

      {/* 2. Balanced 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
        {/* Left Column: Dimensions & Age-Specific Guidance */}
        <div className="space-y-5 sm:space-y-6">
          <DimensionBreakdown scores={result.dimensionScores} />
          <AgeSpecificCard
            archetype={result.primaryArchetype}
            childProfile={result.childProfile}
            isUnlocked={isUnlocked}
            onOpenPayment={() => setIsPaymentOpen(true)}
          />
        </div>

        {/* Right Column: Strengths & Growth Areas (with locked teaser cards) */}
        <div className="space-y-5 sm:space-y-6">
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
        onOpenEmail={() => setIsEmailModalOpen(true)}
      />

      {/* 4. Viral Instagram Story Share Card */}
      <ShareStoryCard
        archetype={result.primaryArchetype}
        childProfile={result.childProfile}
      />

      {/* 5. Bottom Actions: Copy Link & New Child */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-6 border-t border-zinc-200/90">
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

      {/* 6. Sticky Mobile Bottom Floating Action Bar (High-Converting on Phone) */}
      {!isUnlocked ? (
        <div className="fixed bottom-3 inset-x-3 z-40 lg:hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="bg-zinc-950/95 backdrop-blur-xl text-white p-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center justify-between gap-3">
            <div className="min-w-0 pl-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-amber-400">9,900₮</span>
                <span className="text-[10.5px] text-zinc-400 line-through">19,900₮</span>
              </div>
              <p className="text-[10px] text-zinc-300 font-medium truncate">
                {result.childProfile.name}-ийн 12+ хуудас бүрэн хөтөч
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPaymentOpen(true)}
              className="flex-shrink-0 bg-gradient-to-r from-indigo-500 via-anzaar-500 to-rose-500 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Нээх & PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-3 inset-x-3 z-40 lg:hidden animate-in fade-in slide-in-from-bottom-3 duration-300 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            className="flex-1 bg-gradient-to-r from-indigo-600 via-anzaar-600 to-rose-600 text-white p-3.5 rounded-2xl shadow-2xl border border-indigo-400/40 flex items-center justify-center gap-2 text-xs font-black active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">И-мэйлээр Ном & Зураг авах</span>
          </button>
          
          <Link
            href="/guide"
            title="Онлайнаар унших"
            className="flex-shrink-0 bg-zinc-900/90 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-zinc-700 flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* QPay Modal */}
      <QPayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Send Email Modal */}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        archetype={result.primaryArchetype}
        childProfile={result.childProfile}
        scores={result.dimensionScores}
        invoiceId={result.invoiceId}
      />
    </div>
  );
}
