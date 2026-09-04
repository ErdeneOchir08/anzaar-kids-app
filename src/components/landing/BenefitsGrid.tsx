'use client';

import React from 'react';
import { Target, MessageSquareHeart, ShieldAlert, Sparkles } from 'lucide-react';

export const BenefitsGrid: React.FC = () => {
  const benefits = [
    {
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      tag: 'Төрөлхийн онцлог',
      tagColor: 'bg-indigo-50 text-indigo-700',
      title: 'Хүүхдийн зан төлөвийн суурь матриц',
      desc: 'Яагаад шинэ орчинд эсэргүүцдэг, ямар нөхцөлд тайван бөгөөд бүтээлч байдгийг тодорхойлно.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-600" />,
      tag: 'Эмзэг цэгүүд',
      tagColor: 'bg-rose-50 text-rose-700',
      title: 'Сэтгэл санааны хямралын өдөөгчүүд',
      desc: 'Хүүхдийг хямралд (Tantrum/Meltdown) хүргэдэг 3 гол сэрэл, хүчин зүйлийг урьдчилан танина.',
    },
    {
      icon: <MessageSquareHeart className="w-5 h-5 text-amber-600" />,
      tag: 'Ярианы скрипт',
      tagColor: 'bg-amber-50 text-amber-700',
      title: 'Хямралын үед хэлэх бэлэн хариултууд',
      desc: 'Уурлаж зөрүүдэлсэн үед "Ингэж хэлээрэй" vs "Бүү хэлээрэй" гэсэн бодит 3 алхамт дүрэм.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      tag: 'Өдөр тутмын хэмнэл',
      tagColor: 'bg-emerald-50 text-emerald-700',
      title: 'Дэлгэц, унтах цагийн тайван шилжилт',
      desc: 'Утас, ТВ хаах болон орой унтуулах үеийг хэрүүл маргаангүйгээр зохицуулах систем.',
    },
  ];

  return (
    <section id="benefits" className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
          Бодит үнэ цэн
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2">
          Энэхүү сорилоос та юу олж мэдэх вэ?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-lg mx-auto">
          Зөвхөн ерөнхий онол биш, таны хүүхдийн өдөр тутмын амьдралд хэрэгжих бодит заавар
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center">
                  {b.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.tagColor}`}>
                  {b.tag}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-zinc-900 leading-snug">{b.title}</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
