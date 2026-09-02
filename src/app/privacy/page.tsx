import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Нууцлалын бодлого — Kynd Nurture+',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Нүүр хуудас руу буцах</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="flex items-center gap-2 text-emerald-700">
          <Shield className="w-5 h-5" />
          <h1 className="text-xl font-bold text-stone-900">Нууцлалын бодлого</h1>
        </div>

        <p>
          Kynd Nurture+ нь хэрэглэгч болон тэдний хүүхдийн мэдээллийн аюулгүй байдал, нууцлалыг чандлан хадгалдаг.
        </p>

        <h2 className="text-sm font-bold text-stone-900 pt-2">1. Мэдээлэл цуглуулалт ба хадгалалт</h2>
        <p>
          Таны сорилд өгсөн хариултууд болон хүүхдийн нэр/насны мэдээлэл нь зөвхөн дүгнэлт боловсруулах зорилгоор таны төхөөрөмж дээр (Local Storage) хадгалагдана. Бид таны зөвшөөрөлгүйгээр хувийн мэдээллийг гуравдагч этгээдэд дамжуулахгүй.
        </p>

        <h2 className="text-sm font-bold text-stone-900 pt-2">2. Төлбөрийн аюулгүй байдал</h2>
        <p>
          Бүх төлбөрийн гүйлгээ нь Монгол Улсын банкуудын нэгдсэн QPay төлбөрийн системээр дамжин 100% шифрлэгдсэн сувгаар найдвартай хийгддэг. Бид хэрэглэгчийн банкны картын мэдээллийг хадгалдаггүй.
        </p>
      </div>
    </div>
  );
}
