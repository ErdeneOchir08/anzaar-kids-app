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
      a: 'Тийм ээ! 20 асуулт бүхий үндсэн оношилгоо, хүүхдийн зан төлөвийн хэв шинж (Archetype), 4 хэмжээсийн үнэлгээ, давуу тал болон суурь зөвлөмжийг үнэ төлбөргүй харах боломжтой. Хэрэв та 12+ хуудас бүхий нарийвчилсан гарын авлага, хямралын үеийн ярианы скрипт бүхий бүрэн номыг авахыг хүсвэл 9,900₮-өөр QPay-ээр шууд худалдан авах боломжтой.',
    },
    {
      q: 'Нэгээс олон хүүхэдтэй бол дахиж өгч болох уу?',
      a: 'Тийм ээ, та хүүхэд бүртээ тусад нь сорил өгч, бүх хүүхдийнхээ оношилгоог нэг дор хадгалан хооронд нь хялбархан шилжин харах боломжтой.',
    },
  ];

  return (
    <section id="faq" className="py-12 px-4 sm:px-6 max-w-3xl mx-auto mb-12">
      <div className="text-center mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
          Асуулт, хариулт
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-2">Түгээмэл асуултууд</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-bold text-zinc-900 text-xs sm:text-sm"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
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
