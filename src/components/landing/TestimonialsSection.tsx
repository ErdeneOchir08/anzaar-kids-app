'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Б. Номин (4 настай охины ээж)',
      comment: '«Манай охин яагаад шинэ газар очоод зууралддаг байсныг "Зөөлөн Мэдрэмжтэй Ажиглагч" төрөл гэдгээр нь ойлгосон. Одоо би түүнийг шахдаггүй, харин дэмждэг болсон. Гэрт хэрүүл маргаан маш их багассан!»',
      stars: 5,
      archetype: 'Зөөлөн Мэдрэмжтэй Ажиглагч',
    },
    {
      name: 'Т. Бат-Эрдэнэ (6 настай хүүгийн аав)',
      comment: '«Хүү маань өөрийнхөөрөө зүтгээд байхаар нь өөдөөс нь хатуураад л байсан. "Эрч хүчтэй Манлайлагч" төрлийн зөвлөмжийн дагуу 2 сонголт өгдөг болсноос хойш хүүхэдтэйгээ ойлголцох маш хялбар болсон.»',
      stars: 5,
      archetype: 'Эрч хүчтэй Манлайлагч',
    },
    {
      name: 'Э. Уянга (7 настай хүүгийн ээж)',
      comment: '«PDF бүрэн гарын авлагыг нь худалдаж авсан. Tantrum-ийн үед яг юу гэж хэлэх скрипт нь үнэхээр бодитой тусалсан. Ээж аав бүрт санал болгож байна.»',
      stars: 5,
      archetype: 'Бодлоготой Судлаач',
    },
  ];

  return (
    <section className="py-8 px-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-900">Эцэг эхчүүдийн бодит сэтгэгдэл</h2>
        <p className="text-xs text-stone-500 mt-1">Олон зуун гэр бүлийн харилцаанд эерэг өөрчлөлт авчирсан туршлага</p>
      </div>

      <div className="space-y-3.5">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {[...Array(r.stars)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {r.archetype}
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">{r.comment}</p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-stone-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
