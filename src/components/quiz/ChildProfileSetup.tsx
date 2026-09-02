'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../../context/QuizContext';
import { AgeGroup, Gender } from '../../types';
import { Sparkles, ArrowRight, User, Check, Users } from 'lucide-react';

interface ChildProfileSetupProps {
  onComplete: () => void;
}

export const ChildProfileSetup: React.FC<ChildProfileSetupProps> = ({ onComplete }) => {
  const router = useRouter();
  const { childProfile, setChildProfile, savedAssessments, loadChildAssessment } = useQuiz();
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('preschool');
  const [gender, setGender] = useState<Gender>('boy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChildProfile({
      name: name.trim() || 'Хүүхэд',
      ageGroup,
      gender,
    });
    onComplete();
  };

  const ageOptions: { id: AgeGroup; label: string; range: string; icon: string }[] = [
    { id: 'toddler', label: 'Балчир нас', range: '1 – 3 нас', icon: '🍼' },
    { id: 'preschool', label: 'Сургуулийн өмнөх', range: '4 – 6 нас', icon: '🎨' },
    { id: 'school', label: 'Бага анги', range: '7 – 10 нас', icon: '🎒' },
    { id: 'preteen', label: 'Өсвөр нас', range: '11+ нас', icon: '⚡' },
  ];

  const handleSelectExisting = (id: string) => {
    loadChildAssessment(id);
    router.push('/result');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Existing Children Quick Switcher (If any exist) */}
      {savedAssessments.length > 0 && (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-zinc-200/90 shadow-sm space-y-3">
          <p className="text-xs font-bold text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Өмнө нь оношилсон хүүхдүүд:</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {savedAssessments.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectExisting(item.id)}
                className="inline-flex items-center gap-2 bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-900 border border-indigo-200/70 px-4 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                <span className="text-base">{item.childProfile.gender === 'girl' ? '👧' : '👦'}</span>
                <span>{item.childProfile.name}</span>
                <span className="text-[11px] text-indigo-500 font-normal">
                  ({item.primaryArchetype.title.split(' ')[0]})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main New Child Setup Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-anzaar-600 to-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/25">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Хүүхдийн мэдээлэл
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1.5">
            Сорил өгөх хүүхдийнхээ нэр, насны ангиллыг сонгоно уу
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Child Name / Nickname */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wider">
              Хүүхдийн нэр эсвэл дууддаг нэр
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Жишээ: Ану, Тэмүүлэн..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-200 text-sm sm:text-base font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-zinc-50/60"
              />
              <User className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wider">
              Хүйс
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('boy')}
                className={`p-3.5 rounded-2xl text-xs sm:text-sm font-black border transition-all flex items-center justify-center gap-2.5 ${
                  gender === 'boy'
                    ? 'bg-indigo-50/90 border-indigo-600 text-indigo-900 shadow-sm ring-2 ring-indigo-600/30'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="text-xl">👦</span>
                <span>Хүү</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('girl')}
                className={`p-3.5 rounded-2xl text-xs sm:text-sm font-black border transition-all flex items-center justify-center gap-2.5 ${
                  gender === 'girl'
                    ? 'bg-rose-50/90 border-rose-600 text-rose-900 shadow-sm ring-2 ring-rose-600/30'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <span className="text-xl">👧</span>
                <span>Охин</span>
              </button>
            </div>
          </div>

          {/* Age Group Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-2 uppercase tracking-wider">
              Насны бүлэг
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ageOptions.map((opt) => {
                const isSelected = ageGroup === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAgeGroup(opt.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[90px] ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-600 text-indigo-950 shadow-sm ring-2 ring-indigo-600/30'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{opt.icon}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-black">{opt.range}</p>
                      <p className="text-[10.5px] text-zinc-500 font-medium">{opt.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit & Start Questions */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/30 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
          >
            <span>Асуултууд руу шилжих</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
