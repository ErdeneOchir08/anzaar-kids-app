import React, { Suspense } from 'react';
import { QuizRunner } from '../../components/quiz/QuizRunner';

export const metadata = {
  title: 'Сорил өгөх — ANZAAR PRO',
  description: 'Хүүхдийн зан төлөв, сэтгэл зүйг оношлох 20 асуулт бүхий ухаалаг сорил',
};

export default function QuizPage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
          </div>
        }
      >
        <QuizRunner />
      </Suspense>
    </div>
  );
}
