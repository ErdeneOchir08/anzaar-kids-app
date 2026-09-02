'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Энэхүү сорил хэдэн насны хүүхдэд тохиромжтой вэ?',
      a: 'Энэхүү сорил нь 1-ээс 12 хүртэлх насны хүүхдүүдийн зан төлөв, сэтгэл хөдлөлийн онцлогийг тодорхойлоход зориулагдсан. Насны бүлэг бүрийн хувьд ялгаатай зөвлөмжүүд өгөгддөг.',
    },
    {
      q: 'Сорил үнэгүй юу?',
      a: 'Тийм ээ! 20 асуулт бүхий үндсэн оношилгоо, хүүхдийн зан төлөвийн хэв шинж (Archetype), 4 хэмжээсийн үнэлгээ, давуу тал болон анхаарах зүйлсийг үнэ төлбөргүй харах боломжтой. Хэрэв та 12+ хуудас бүхий нарийвчилсан гарын авлага, хямралын үеийн ярианы скрипт бүхий бүрэн номыг авахыг хүсвэл QPay-ээр худалдан авах боломжтой.',
    },
    {
      q: 'Нэгээс олон хүүхэдтэй бол дахиж өгч болох уу?',
      a: 'Тийм ээ, та хүүхэд бүртээ тусад нь сорил өгч, тус бүрийнх нь ялгаатай онцлог, хэрэгцээг олж мэдэх боломжтой.',
    },
  ];

  return (
    <section className="py-8 px-4 max-w-xl mx-auto mb-10">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-900">Түгээмэл асуулт, хариулт</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-2 font-semibold text-stone-900 text-sm"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
