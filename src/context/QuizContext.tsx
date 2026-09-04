'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AssessmentResult, ChildProfile } from '../types';
import { calculateAssessmentResult } from '../lib/scoringEngine';

interface QuizContextType {
  childProfile: ChildProfile;
  setChildProfile: (profile: ChildProfile) => void;
  answers: Record<number, number>;
  setAnswer: (questionId: number, value: number) => void;
  result: AssessmentResult | null;
  savedAssessments: AssessmentResult[];
  calculateAndSetResult: () => AssessmentResult;
  isUnlocked: boolean;
  unlockPremium: (invoiceId?: string) => void;
  startNewQuiz: () => void;
  loadChildAssessment: (id: string) => void;
  deleteAssessment: (id: string) => void;
}

const defaultProfile: ChildProfile = {
  name: '',
  ageGroup: 'preschool',
  gender: 'boy',
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const STORAGE_KEY_SAVED_LIST = 'anzaar_saved_assessments_v2';
const STORAGE_KEY_ACTIVE_ID = 'anzaar_active_assessment_id_v2';
const STORAGE_KEY_DRAFT_ANSWERS = 'anzaar_draft_answers_v2';
const STORAGE_KEY_DRAFT_PROFILE = 'anzaar_draft_profile_v2';

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [childProfile, setChildProfileState] = useState<ChildProfile>(defaultProfile);
  const [answers, setAnswersState] = useState<Record<number, number>>({});
  const [savedAssessments, setSavedAssessments] = useState<AssessmentResult[]>([]);
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedListStr = localStorage.getItem(STORAGE_KEY_SAVED_LIST);
      let list: AssessmentResult[] = [];
      if (savedListStr) {
        list = JSON.parse(savedListStr);
        setSavedAssessments(list);
      }

      const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (activeId && list.length > 0) {
        const found = list.find((a) => a.id === activeId);
        if (found) {
          setActiveResultId(found.id);
          setChildProfileState(found.childProfile);
        }
      } else if (list.length > 0) {
        // Default to most recent assessment
        const mostRecent = list[0];
        setActiveResultId(mostRecent.id);
        setChildProfileState(mostRecent.childProfile);
      } else {
        const draftProfile = localStorage.getItem(STORAGE_KEY_DRAFT_PROFILE);
        if (draftProfile) setChildProfileState(JSON.parse(draftProfile));
        const draftAnswers = localStorage.getItem(STORAGE_KEY_DRAFT_ANSWERS);
        if (draftAnswers) setAnswersState(JSON.parse(draftAnswers));
      }
    } catch (e) {
      console.error('Failed to load assessment data', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setChildProfile = (profile: ChildProfile) => {
    setChildProfileState(profile);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_DRAFT_PROFILE, JSON.stringify(profile));
    }
  };

  const setAnswer = (questionId: number, value: number) => {
    setAnswersState((prev) => {
      const updated = { ...prev, [questionId]: value };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_DRAFT_ANSWERS, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const calculateAndSetResult = () => {
    const res = calculateAssessmentResult(childProfile, answers);
    
    // Check if this child was already unlocked
    const existing = savedAssessments.find(
      (a) => a.childProfile.name.toLowerCase() === childProfile.name.toLowerCase()
    );
    if (existing?.isUnlocked) {
      res.isUnlocked = true;
    }

    const updatedList = [res, ...savedAssessments.filter((a) => a.id !== res.id)];
    setSavedAssessments(updatedList);
    setActiveResultId(res.id);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(updatedList));
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, res.id);
      localStorage.removeItem(STORAGE_KEY_DRAFT_ANSWERS);
    }

    return res;
  };

  const unlockPremium = (invoiceId?: string) => {
    if (!activeResultId) return;

    const updatedList = savedAssessments.map((item) => {
      if (item.id === activeResultId) {
        return { 
          ...item, 
          isUnlocked: true,
          invoiceId: invoiceId || item.invoiceId,
        };
      }
      return item;
    });

    setSavedAssessments(updatedList);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(updatedList));
    }
  };

  const startNewQuiz = () => {
    setChildProfileState({
      name: '',
      ageGroup: 'preschool',
      gender: 'boy',
    });
    setAnswersState({});
    setActiveResultId(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_DRAFT_PROFILE);
      localStorage.removeItem(STORAGE_KEY_DRAFT_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    }
  };

  const loadChildAssessment = (id: string) => {
    const found = savedAssessments.find((a) => a.id === id);
    if (found) {
      setActiveResultId(found.id);
      setChildProfileState(found.childProfile);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_ACTIVE_ID, found.id);
      }
    }
  };

  const deleteAssessment = (id: string) => {
    const filtered = savedAssessments.filter((a) => a.id !== id);
    setSavedAssessments(filtered);
    if (activeResultId === id) {
      const nextActive = filtered[0]?.id || null;
      setActiveResultId(nextActive);
      if (filtered[0]) {
        setChildProfileState(filtered[0].childProfile);
      } else {
        setChildProfileState(defaultProfile);
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(filtered));
    }
  };

  const currentResult = savedAssessments.find((a) => a.id === activeResultId) || null;

  return (
    <QuizContext.Provider
      value={{
        childProfile,
        setChildProfile,
        answers,
        setAnswer,
        result: currentResult,
        savedAssessments,
        calculateAndSetResult,
        isUnlocked: currentResult?.isUnlocked || false,
        unlockPremium,
        startNewQuiz,
        loadChildAssessment,
        deleteAssessment,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
