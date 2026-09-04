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
  Download,
  ShieldCheck,
  Check,
  Mail
} from 'lucide-react';

interface PaywallOfferProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  isUnlocked: boolean;
  onOpenPayment: () => void;
  onOpenEmail?: () => void;
}

export const PaywallOffer: React.FC<PaywallOfferProps> = ({
  archetype,
  childProfile,
  isUnlocked,
  onOpenPayment,
  onOpenEmail,
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
          <h3 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
            {childProfile.name}-ийн 12+ хуудас бүрэн хөтөч нээгдлээ!
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 max-w-md mx-auto leading-relaxed">
            Та энэхүү гарын авлагыг и-мэйлээрээ үүрд найдвартай хадгалах эсвэл шууд онлайнаар унших боломжтой.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onOpenEmail && (
            <button
              type="button"
              onClick={onOpenEmail}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-anzaar-500 to-rose-500 hover:opacity-95 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>И-мэйлээр Хөтөч Ном & Зураг авах</span>
            </button>
          )}

          <Link
            href="/guide"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Онлайнаар Унших & PDF</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-black rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
      {/* Mesh Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-wide uppercase bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>АНЗААР PRO ХӨТӨЧ · 50% ХЯМДРАЛ</span>
        </span>
        <span className="text-xs text-zinc-500 font-bold line-through">
          19,900₮
        </span>
      </div>

      {/* 2-Column Responsive Layout on Large Screens */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2">
            «{archetype.title}» хүүхдийг өсгөн хүмүүжүүлэх 12+ хуудас бүрэн гарын авлага
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Зөвхөн оношийг нь мэдэх биш, өдөр тутмын хямралыг тайлах <strong>бэлэн ярианы скрипт болон PDF ном</strong>-оо шууд утсандаа татаж аваарай.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.04] p-4 sm:p-5 rounded-2xl border border-white/10">
          <div className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
            <MessageSquare className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Уурлаж зөрүүдэлсэн үед хэлэх үгс:</strong> Хүүхдээ тайвшруулах бодит 3 алхамт бэлэн хариултууд.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
            <BookOpen className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Дэлгэц, тоглоом хураах зөв дадал:</strong> Утас хаах үеийн хэрүүл маргааныг эцэслэх 2 минутын дүрэм.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
            <Moon className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Орой тайван унтуулах дэглэм:</strong> Мэдрэлийг нь амрааж, сэтгэлийг дулаацуулах оройн тайван дадал.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-zinc-200 leading-relaxed">
            <Download className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Утас, компьютертоо PDF-ээр хадгалах:</strong> 12+ хуудас бүрэн номыг төхөөрөмж дээрээ шууд татах боломж.
            </span>
          </div>
        </div>

        {/* Pricing Card & CTA */}
        <div className="bg-white/10 rounded-2xl p-5 sm:p-6 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span className="text-3xl sm:text-4xl font-black text-white">9,900₮</span>
              <span className="text-xs text-zinc-300 font-semibold">нэг удаагийн төлбөр</span>
            </div>
            <p className="text-[11px] text-emerald-300 font-bold mt-1 flex items-center gap-1 justify-center sm:justify-start">
              <ShieldCheck className="w-3.5 h-3.5" /> Төлбөр хийгдсэний дараа шууд PDF татах товч гарч ирнэ
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenPayment}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-anzaar-500 to-rose-500 hover:shadow-indigo-500/30 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 flex-shrink-0"
          >
            <Lock className="w-4 h-4 text-white" />
            <span>QPAY-ЭЭР ШУУД НЭЭХ & PDF ТАТАХ (9,900₮)</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
