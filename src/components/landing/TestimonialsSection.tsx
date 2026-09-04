'use client';

import React from 'react';
import { Star } from 'lucide-react';

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
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900">Эцэг эхчүүдийн бодит сэтгэгдэл</h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">Олон зуун гэр бүлийн харилцаанд эерэг өөрчлөлт авчирсан туршлага</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-zinc-200/80 shadow-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(r.stars)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed italic">
                {r.comment}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100">
              <p className="text-xs font-black text-zinc-900">{r.name}</p>
              <span className="text-[10.5px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">
                {r.archetype}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
