'use client';

import React from 'react';
import Link from 'next/link';
import { Archetype, ChildProfile } from '../../types';
import { 
  Lock, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Moon, 
  ArrowRight,
  Download
} from 'lucide-react';

interface PaywallOfferProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  isUnlocked: boolean;
  onOpenPayment: () => void;
}

export const PaywallOffer: React.FC<PaywallOfferProps> = ({
  archetype,
  childProfile,
  isUnlocked,
  onOpenPayment,
}) => {
  if (isUnlocked) {
    return (
      <div className="w-full bg-gradient-to-br from-indigo-900 via-anzaar-900 to-zinc-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl text-center space-y-4 border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-zinc-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-3.5 py-1 rounded-full border border-indigo-400/30">
            АНЗААР PRO · ТӨЛБӨР БАТАЛГААЖСАН
          </span>
          <h3 className="text-2xl font-black mt-2 tracking-tight">
            {childProfile.name}-ийн 12+ хуудас бүрэн хөтөч нээгдлээ!
          </h3>
          <p className="text-xs text-zinc-300 mt-1.5 max-w-sm mx-auto leading-relaxed">
            Та энэхүү гарын авлагыг хүссэн үедээ онлайнаар унших эсвэл PDF файл болгон төхөөрөмждөө шууд татаж авах боломжтой.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/guide"
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs py-4 px-7 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>PDF Файлаар Татах & Унших</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-black rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
      {/* Mesh Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-wide uppercase bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>АНЗААР PRO ХӨТӨЧ · 50% ХЯМДРАЛ</span>
        </span>
        <span className="text-xs text-zinc-500 font-bold line-through">
          29,900₮
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2">
        «{archetype.title}» хүүхдийг өсгөн хүмүүжүүлэх 12+ хуудас бүрэн гарын авлага
      </h3>
      <p className="text-xs text-zinc-300 leading-relaxed mb-6">
        Зөвхөн оношийг нь мэдэх биш, өдөр тутмын хямралыг тайлах <strong>бэлэн ярианы скрипт болон PDF ном</strong>-оо шууд утсандаа татаж аваарай.
      </p>

      {/* Feature Pills */}
      <div className="space-y-3 mb-6 bg-white/[0.04] p-4 sm:p-5 rounded-2xl border border-white/10">
        <div className="flex items-start gap-3 text-xs text-zinc-200 leading-relaxed">
          <MessageSquare className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Хямралын үеийн ярианы скриптүүд:</strong> Зөрүүдлэх, газар хэвтэж уйлах үед яг юу гэж хэлэх 3 алхамт дүрэм.
          </span>
        </div>

        <div className="flex items-start gap-3 text-xs text-zinc-200 leading-relaxed">
          <BookOpen className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Дэлгэц & Тоглоом хураах протокол:</strong> Шилжилтийн үеийг хэрүүл маргаангүй зохицуулах арга.
          </span>
        </div>

        <div className="flex items-start gap-3 text-xs text-zinc-200 leading-relaxed">
          <Moon className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Орой тайван унтуулах хөтөлбөр:</strong> Мэдрэлийн ядаргааг тайлж, сэтгэлийг дулаацуулах оройн зан үйл.
          </span>
        </div>

        <div className="flex items-start gap-3 text-xs text-zinc-200 leading-relaxed">
          <Download className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Төхөөрөмждөө шууд PDF татаж авах:</strong> Утас, таблет, компьютертоо файл хэлбэрээр шууд хадгалах боломж.
          </span>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-white">14,900₮</span>
          <span className="text-xs text-zinc-400 font-semibold">нэг удаагийн төлбөр</span>
        </div>

        <button
          type="button"
          onClick={onOpenPayment}
          className="w-full bg-gradient-to-r from-indigo-500 via-anzaar-500 to-rose-500 hover:shadow-indigo-500/30 text-white font-black text-sm py-4 px-6 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Lock className="w-4 h-4 text-white" />
          <span>QPAY-ЭЭР ШУУД НЭЭХ & PDF ТАТАХ (14,900₮)</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>

        <p className="text-[11px] text-zinc-400 text-center font-medium">
          ⚡ Төлбөр хийгдсэний дараа шууд PDF татах товч гарч ирнэ · 100% найдвартай
        </p>
      </div>
    </div>
  );
};
