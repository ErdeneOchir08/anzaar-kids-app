'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuiz } from '../../context/QuizContext';
import { QUESTIONS } from '../../data/questions';
import { ChildProfileSetup } from './ChildProfileSetup';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { CalculatingScreen } from './CalculatingScreen';
import { trackEvent } from '../../lib/tracker';

export const QuizRunner: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { childProfile, answers, setAnswer, calculateAndSetResult, startNewQuiz } = useQuiz();
  
  const [phase, setPhase] = useState<'profile' | 'questions' | 'calculating'>('profile');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (searchParams?.get('new') === 'true') {
      startNewQuiz();
      setPhase('profile');
    }
  }, [searchParams, startNewQuiz]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, phase]);

  const handleProfileComplete = () => {
    trackEvent('QUIZ_START', {
      childName: childProfile.name,
      ageGroup: childProfile.ageGroup,
    });
    setPhase('questions');
  };

  const handleSelectOption = (value: number) => {
    const currentQ = QUESTIONS[currentIndex];
    setAnswer(currentQ.id, value);

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        const res = calculateAndSetResult();
        trackEvent('QUIZ_COMPLETE', {
          childName: childProfile.name,
          ageGroup: childProfile.ageGroup,
          archetypeId: res.primaryArchetype.id,
          archetypeTitle: res.primaryArchetype.title,
        });
        setPhase('calculating');
      }
    }, 180);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setPhase('profile');
    }
  };

  const handleCalculationComplete = () => {
    router.push('/result');
  };

  if (phase === 'profile') {
    return (
      <div className="py-6 px-4">
        <ChildProfileSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  if (phase === 'calculating') {
    return (
      <CalculatingScreen
        childName={childProfile.name || 'Хүүхэд'}
        onComplete={handleCalculationComplete}
      />
    );
  }

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className="min-h-[85vh] flex flex-col justify-between pb-8">
      <div>
        <ProgressBar current={currentIndex} total={QUESTIONS.length} />
        <QuestionCard
          question={currentQ}
          selectedValue={answers[currentQ.id]}
          onSelect={handleSelectOption}
          onPrev={handlePrev}
          canPrev={true}
        />
      </div>
    </div>
  );
};
