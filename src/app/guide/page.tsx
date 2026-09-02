'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../../context/QuizContext';
import { FullPlaybookView } from '../../components/playbook/FullPlaybookView';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function GuidePage() {
  const router = useRouter();
  const { result, isUnlocked } = useQuiz();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Оношилгоо хийгдээгүй байна</h2>
        <p className="text-xs text-stone-500">
          Та эхлээд хүүхдийнхээ зан төлөвийн сорилыг бөглөнө үү.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all"
        >
          <span>Сорил эхлэх</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Гарын авлага түгжээтэй байна</h2>
        <p className="text-xs text-stone-500">
          Энэхүү 12+ хуудас бүрэн хөтөч номыг үзэхийн тулд оношилгооны хуудаснаас QPay-ээр нээнэ үү.
        </p>
        <Link
          href="/result"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all"
        >
          <span>Оношилгооны хуудас руу очих</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FullPlaybookView
        archetype={result.primaryArchetype}
        childProfile={result.childProfile}
        scores={result.dimensionScores}
      />
    </div>
  );
}
