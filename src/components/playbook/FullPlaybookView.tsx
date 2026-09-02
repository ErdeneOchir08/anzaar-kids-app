'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Archetype, ChildProfile, DimensionId, DimensionScore } from '../../types';
import { formatAgeGroup, getGenderLabel } from '../../lib/utils';
import { downloadReportAsPdf } from '../../lib/pdfGenerator';
import { 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  Eye, 
  MessageSquare, 
  Moon, 
  Heart, 
  CheckCircle, 
  AlertTriangle,
  Flame,
  Check,
  Download,
  Loader2
} from 'lucide-react';

interface FullPlaybookViewProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  scores: Record<DimensionId, DimensionScore>;
}

export const FullPlaybookView: React.FC<FullPlaybookViewProps> = ({
  archetype,
  childProfile,
  scores,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      setDownloadSuccess(false);
      const safeName = `ANZAAR_${childProfile.name || 'Child'}_Garyn_Avlag`;
      await downloadReportAsPdf('playbook-printable-content', safeName, (status) => {
        setDownloadStatus(status);
      });
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3500);
    } catch (err) {
      console.error('PDF generation failed', err);
      // Fallback to window.print if canvas generation has any issue
      if (typeof window !== 'undefined') {
        window.print();
      }
    } finally {
      setIsDownloading(false);
      setDownloadStatus('');
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Bar (Sticky & Hidden on print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl border border-zinc-200 shadow-sm sticky top-15 z-30 print:hidden">
        <Link
          href="/result"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Оношилгоо руу буцах</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Direct PDF Download Button */}
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 hover:shadow-indigo-600/30 px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{downloadStatus || 'Бэлтгэж байна...'}</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>PDF Татагдлаа!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>PDF Файл Татах</span>
              </>
            )}
          </button>

          {/* Optional Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Хэвлэх"
            className="inline-flex items-center justify-center w-9 h-9 text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Printable Content Container */}
      <div id="playbook-printable-content" className="space-y-8 bg-white p-2 sm:p-4 rounded-3xl">
        {/* Luxury Book Cover Header */}
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-zinc-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black px-3.5 py-1 rounded-full mb-4">
              <Eye className="w-3.5 h-3.5" />
              <span>ANZAAR PRO · 12+ ХУУДАС БҮРЭН ХӨТӨЧ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-2">
              {childProfile.name}-ийн Зан Төлөвийн <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-anzaar-300 to-rose-300">
                Өсгөн Хүмүүжүүлэх Ном
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mb-6 leading-relaxed">
              «{archetype.title}» хэв шинжийн хүүхдийн сэтгэл зүйн динамик, хямралыг тайлах бэлэн ярианы скриптүүд ба өдөр тутмын хөтөлбөр.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-bold text-zinc-300 border-t border-zinc-800 pt-4">
              <span className="bg-white/10 px-3 py-1 rounded-xl">Хүүхэд: {childProfile.name}</span>
              <span className="bg-white/10 px-3 py-1 rounded-xl">{formatAgeGroup(childProfile.ageGroup)}</span>
              <span className="bg-white/10 px-3 py-1 rounded-xl">{getGenderLabel(childProfile.gender)}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: Deep Psychology Analysis */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <span className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center text-sm border border-indigo-100">
              01
            </span>
            <h2 className="text-lg font-black text-zinc-900">
              Сэтгэл зүйн гүнзгий задлан шинжилгээ
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {childProfile.name}-ийн зан төлөв бол гаднаас суралцсан зуршил биш, харин түүний төв мэдрэлийн системийн төрөлхийн онцлог (Temperament) юм. Түүний тархи сэрэл, дуу чимээ, өөрчлөлтөд дараах байдлаар хариу үйлдэл үзүүлдэг:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {archetype.characteristics.map((char, i) => (
              <div key={i} className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200/70 text-xs text-zinc-800 font-medium flex items-start gap-2">
                <span className="text-indigo-600 font-black">•</span>
                <span>{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Tantrum / Meltdown Crisis Scripts */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <span className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-700 font-black flex items-center justify-center text-sm border border-rose-100">
              02
            </span>
            <div>
              <h2 className="text-lg font-black text-zinc-900">
                Хямралын үеийн ярианы бэлэн скриптүүд
              </h2>
              <p className="text-xs text-zinc-500">Уурлаж, зөрүүдэлсэн үед яг юу гэж хэлэх вэ?</p>
            </div>
          </div>

          {/* 3 Step Formula */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-5 space-y-2.5">
            <h3 className="text-xs font-black text-rose-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Flame className="w-4 h-4 text-rose-600" />
              3 Алхамт Хямрал Тайлах Дүрэм:
            </h3>
            <div className="space-y-2 text-xs text-zinc-800 leading-relaxed font-medium">
              <p><strong>Алхам 1 (Тайвшруулах):</strong> {archetype.crisisScript.step1Calm}</p>
              <p><strong>Алхам 2 (Холбогдох):</strong> {archetype.crisisScript.step2Connect}</p>
              <p><strong>Алхам 3 (Чиглүүлэх):</strong> {archetype.crisisScript.step3Redirect}</p>
            </div>
          </div>

          {/* Real life scenarios */}
          <div className="space-y-4">
            {archetype.dailyTriggers.map((trig, idx) => (
              <div key={idx} className="bg-zinc-50 rounded-3xl p-5 border border-zinc-200 space-y-3">
                <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Нөхцөл {idx + 1}: {trig.title}</span>
                </h4>
                <p className="text-xs text-zinc-600 bg-white p-3 rounded-2xl border border-zinc-200/80">
                  📌 <strong>Нөхцөл байдал:</strong> {trig.scenario}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-emerald-50/90 p-3.5 rounded-2xl border border-emerald-200">
                    <p className="text-[11px] font-black text-emerald-800 mb-1 flex items-center gap-1 uppercase">
                      <Check className="w-3.5 h-3.5" /> Ингэж хэлээрэй:
                    </p>
                    <p className="text-xs text-zinc-800 italic leading-relaxed">{trig.recommendedResponse}</p>
                  </div>

                  <div className="bg-rose-50/90 p-3.5 rounded-2xl border border-rose-200">
                    <p className="text-[11px] font-black text-rose-800 mb-1 flex items-center gap-1 uppercase">
                      <AlertTriangle className="w-3.5 h-3.5" /> Бүү хэлээрэй:
                    </p>
                    <p className="text-xs text-zinc-800 italic leading-relaxed">{trig.avoidResponse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Bedtime & Daily Transition Blueprint */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <span className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center text-sm border border-indigo-100">
              03
            </span>
            <div>
              <h2 className="text-lg font-black text-zinc-900">
                Оройн унтуулах & Шилжилтийн протокол
              </h2>
              <p className="text-xs text-zinc-500">Унтах цагийн хэрүүл маргааныг эцэслэх зан үйл</p>
            </div>
          </div>

          <div className="bg-indigo-50/60 rounded-3xl p-5 border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-black text-xs">
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>{childProfile.name}-д зориулсан оройн тусгай зөвлөмж:</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
              {archetype.bedtimeTip}
            </p>
          </div>
        </section>

        {/* SECTION 4: Goodness-of-Fit & Parent Connection */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <span className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 font-black flex items-center justify-center text-sm border border-amber-100">
              04
            </span>
            <div>
              <h2 className="text-lg font-black text-zinc-900">
                Эцэг эх - Хүүхдийн зохицол (Goodness of Fit)
              </h2>
              <p className="text-xs text-zinc-500">Хүүхдийн зан төлөвийг эвдэхгүйгээр хэрхэн зөв чиглүүлэх вэ?</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <p>
              Хүүхэд хүмүүжүүлэхэд хамгийн гол түлхүүр нь хүүхдийг өөрчлөх биш, <strong>түүний төрөлхийн онцлогт тохирсон орчин, дэмжлэгийг бий болгох</strong> явдал юм. Хэрэв та өөрөө түргэн ууртай эсвэл хатуу зарчимч бол, «{archetype.title}» хүүхэдтэй харилцахдаа амьсгалаа гүнзгий авч, 5 секундын түр завсарлага авч заншаарай.
            </p>
          </div>

          <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 mt-4 text-center">
            <Heart className="w-7 h-7 text-rose-500 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-black text-zinc-900">
              «Хүүхэд тань таны хайр, тэвчээр дунд хамгийн сайхнаараа дэлбээлнэ.»
            </p>
            <p className="text-[11px] text-zinc-400 mt-1 font-medium">
              ANZAAR Kids Сэтгэл Зүйн Баг · anzaar.mn
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Download CTA */}
      <div className="text-center pt-4 print:hidden">
        <button
          type="button"
          disabled={isDownloading}
          onClick={handleDownloadPdf}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-anzaar-600 to-indigo-700 text-white font-black text-xs py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/25 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Энэхүү гарын авлагыг төхөөрөмждөө PDF-ээр хадгалах</span>
        </button>
      </div>
    </div>
  );
};
