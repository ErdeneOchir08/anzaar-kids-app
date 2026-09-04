'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Archetype, ChildProfile, DimensionId, DimensionScore } from '../../types';
import { formatAgeGroup, getGenderLabel } from '../../lib/utils';
import { downloadReportAsPdf } from '../../lib/pdfGenerator';
import { AGE_SPECIFIC_ADVICE } from '../../data/ageSpecificAdvice';
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
  Loader2,
  Brain,
  Shield,
  Compass,
  Tv,
  Users2,
  GraduationCap,
  Mail,
  Zap,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';
import { SendEmailModal } from '../email/SendEmailModal';

interface FullPlaybookViewProps {
  archetype: Archetype;
  childProfile: ChildProfile;
  scores: Record<DimensionId, DimensionScore>;
  invoiceId?: string;
}

export const FullPlaybookView: React.FC<FullPlaybookViewProps> = ({
  archetype,
  childProfile,
  scores,
  invoiceId,
}) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Age specific guidance
  const ageData =
    AGE_SPECIFIC_ADVICE[childProfile.ageGroup]?.[archetype.id] ||
    AGE_SPECIFIC_ADVICE.preschool[archetype.id] ||
    AGE_SPECIFIC_ADVICE.preschool.calm_harmonizer;

  // Fallbacks for scores
  const dimSensitivity = scores?.sensitivity || { percentage: 75, level: 'high', levelDescription: 'Өндөр мэдрэг: Дуу чимээ, орчны өөрчлөлт, бусдын сэтгэл хөдлөлийг гүн тусгаж авдаг.' };
  const dimEnergy = scores?.energy || { percentage: 65, level: 'moderate', levelDescription: 'Тохируулгатай эрч хүч: Тоглоомын үед идэвхтэй, гэртээ тайван амрах чадвартай.' };
  const dimAdaptability = scores?.adaptability || { percentage: 55, level: 'moderate', levelDescription: 'Аажмаар дасагч: Танил орчиндоо нээлттэй, шинэ газарт эхэндээ ажиглах дуртай.' };
  const dimRegulation = scores?.regulation || { percentage: 70, level: 'moderate', levelDescription: 'Дунд зэргийн зохицуулалттай: Тайван үедээ өөрийгөө удирддаг, ядарсан үедээ сануулга шаардлагатай.' };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      setDownloadSuccess(false);
      const safeName = `ANZAAR_${childProfile.name || 'Child'}_12_Huudas_Buren_Nom`;
      await downloadReportAsPdf('playbook-printable-content', safeName, (status) => {
        setDownloadStatus(status);
      });
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3500);
    } catch (err) {
      console.error('PDF generation failed', err);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Bar (Sticky & Hidden on print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-xl p-4 rounded-3xl border border-zinc-200 shadow-sm sticky top-16 z-30 print:hidden">
        <Link
          href="/result"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-4 py-2.5 rounded-2xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Оношилгоо руу буцах</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Send Email Button */}
          <button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-anzaar-600 to-rose-600 hover:shadow-indigo-600/30 px-4 py-2.5 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>И-мэйлээр авах</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-4 py-2.5 rounded-2xl transition-all active:scale-95 disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{downloadStatus || 'Бэлтгэж байна...'}</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>PDF Татагдлаа!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>PDF Татах</span>
              </>
            )}
          </button>

          {/* Optional Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Хэвлэх"
            className="inline-flex items-center justify-center w-10 h-10 text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-2xl transition-colors"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Printable Content Container */}
      <div id="playbook-printable-content" className="space-y-8 bg-white p-3 sm:p-8 rounded-[36px]">
        
        {/* Luxury Book Cover Header */}
        <div className="bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-900 text-white rounded-[32px] p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-zinc-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black px-4 py-1.5 rounded-full">
              <Eye className="w-3.5 h-3.5" />
              <span>ANZAAR PRO · 12 ХУУДАС БҮРЭН ХӨТӨЧ НОМ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {childProfile.name}-ийн Зан Төлөвийн <br />
              <span className="text-indigo-400">
                Өсгөн Хүмүүжүүлэх Ном
              </span>
            </h1>

            <p className="text-xs sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
              «{archetype.title}» хэв шинжийн хүүхдийн мэдрэлийн системийн онцлог, хямралыг тайлах бэлэн ярианы скриптүүд ба 12 бүлэг цогц удирдамж.
            </p>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold text-zinc-300 border-t border-zinc-800 pt-5">
              <span className="bg-white/10 px-3.5 py-1.5 rounded-xl">Хүүхэд: {childProfile.name}</span>
              <span className="bg-white/10 px-3.5 py-1.5 rounded-xl">{formatAgeGroup(childProfile.ageGroup)}</span>
              <span className="bg-white/10 px-3.5 py-1.5 rounded-xl">{getGenderLabel(childProfile.gender)}</span>
              <span className="bg-white/10 px-3.5 py-1.5 rounded-xl">Хэв шинж: {archetype.badge}</span>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* PAGE 01 / 12: Neurobiology Framework */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Тархины Сэтгэл Зүй ба Мэдрэлийн Системийн Онцлог
              </h2>
              <p className="text-xs text-zinc-500">Thomas & Chess болон Mary Rothbart-ийн шинжлэх ухааны суурь</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 01 / 12
            </span>
          </div>

          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-3">
            <p>
              Хүүхдийн зан төлөв (Temperament) бол гаднаас суралцсан дадал биш, харин <strong>түүний төв мэдрэлийн системийн төрөлхийн мэдрэг байдал, өдөөлтөд үзүүлэх хариу үйлдэл</strong> юм. 
            </p>
            <div className="bg-gradient-to-r from-indigo-50/70 to-purple-50/70 p-5 rounded-3xl border border-indigo-100 space-y-2">
              <span className="text-xs sm:text-sm font-black text-indigo-900 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                {childProfile.name}-ийн мэдрэлийн системийн ажиллагаа:
              </span>
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                ${archetype.summary}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 02 / 12: Core Archetype & Characteristics */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                «{archetype.title}» Хэв Шинжийн Гүнзгий Тайлал
              </h2>
              <p className="text-xs text-zinc-500">Дотоод дуу хоолой ба суурь 5 онцлог шинж чанар</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 02 / 12
            </span>
          </div>

          <div className="bg-purple-50/70 border border-purple-200 p-5 rounded-3xl space-y-1.5">
            <span className="text-xs font-black uppercase text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              {childProfile.name}-ийн дотоод дуу хоолой (Core Motto):
            </span>
            <p className="text-xs sm:text-sm text-purple-950 font-medium italic leading-relaxed">
              "{archetype.coreMotto}"
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs sm:text-sm font-black text-zinc-900">Энэхүү хэв шинжийн 5 суурь онцлог:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetype.characteristics.map((char, i) => (
                <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/70 text-xs sm:text-sm text-zinc-800 font-medium flex items-start gap-2.5">
                  <span className="text-indigo-600 font-black">•</span>
                  <span>{char}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 03 / 12: Dimensions Part 1 (Sensitivity & Energy) */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Сэтгэл Зүйн 4 Хэмжүүр: Мэдрэмж ба Эрч Хүч
              </h2>
              <p className="text-xs text-zinc-500">Мэдрэлийн системийн өдөөлтөд үзүүлэх хариу үйлдэл</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 03 / 12
            </span>
          </div>

          <div className="space-y-4">
            {/* Sensitivity */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  1. Мэдрэмжийн хүлээн авалт (Sensory Sensitivity)
                </span>
                <span className="text-sm font-black text-indigo-600">{dimSensitivity.percentage}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden mb-3">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${dimSensitivity.percentage}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-xl border border-zinc-200/80">
                {dimSensitivity.levelDescription}
              </p>
            </div>

            {/* Energy */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  2. Биеийн хөдөлгөөн ба Эрч хүч (Physical Energy)
                </span>
                <span className="text-sm font-black text-indigo-600">{dimEnergy.percentage}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden mb-3">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${dimEnergy.percentage}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-xl border border-zinc-200/80">
                {dimEnergy.levelDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 04 / 12: Dimensions Part 2 (Adaptability & Regulation) */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Сэтгэл Зүйн 4 Хэмжүүр: Дасан Зохицол ба Удирдлага
              </h2>
              <p className="text-xs text-zinc-500">Шинэ зүйл ба сэтгэл хөдлөлөө барих чадвар</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 04 / 12
            </span>
          </div>

          <div className="space-y-4">
            {/* Adaptability */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-500" />
                  3. Шинэ зүйлд дасан зохицох чадвар (Adaptability)
                </span>
                <span className="text-sm font-black text-indigo-600">{dimAdaptability.percentage}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden mb-3">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${dimAdaptability.percentage}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-xl border border-zinc-200/80">
                {dimAdaptability.levelDescription}
              </p>
            </div>

            {/* Regulation */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  4. Сэтгэл хөдлөлийн удирдлага ба Тэвчээр (Regulation)
                </span>
                <span className="text-sm font-black text-indigo-600">{dimRegulation.percentage}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2.5 overflow-hidden mb-3">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${dimRegulation.percentage}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed bg-white p-3 rounded-xl border border-zinc-200/80">
                {dimRegulation.levelDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 05 / 12: Tantrum 3-Step Protocol */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Хямралыг Тайлах 3 Алхамт Протокол
              </h2>
              <p className="text-xs text-zinc-500">Уурлаж, бухимдсан үед хэрэглэх дэс дараалал</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 05 / 12
            </span>
          </div>

          <div className="bg-rose-50/80 border border-rose-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-xs sm:text-sm font-black text-rose-900 flex items-center gap-2 uppercase tracking-wide">
              <Flame className="w-4 h-4 text-rose-600" />
              Бухимдлыг тайлах 3 алхам:
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
              <p><strong>1. Тайвшруулах (Calm):</strong> {archetype.crisisScript.step1Calm}</p>
              <p><strong>2. Холбогдох (Connect):</strong> {archetype.crisisScript.step2Connect}</p>
              <p><strong>3. Чиглүүлэх (Redirect):</strong> {archetype.crisisScript.step3Redirect}</p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 06 / 12: Real-Life Scripts */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Бодит Амьдралын Бэлэн Ярианы Скриптүүд
              </h2>
              <p className="text-xs text-zinc-500">Өдөр тутмын 3 хямрал дээр «Ингэж хэлээрэй» vs «Бүү хэлээрэй»</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 06 / 12
            </span>
          </div>

          <div className="space-y-5">
            {archetype.dailyTriggers.map((trig, idx) => (
              <div key={idx} className="bg-zinc-50 rounded-3xl p-6 border border-zinc-200 space-y-4">
                <h4 className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Нөхцөл байдал {idx + 1}: {trig.title}</span>
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 bg-white p-4 rounded-2xl border border-zinc-200/80">
                  📌 <strong>Бодит жишээ:</strong> {trig.scenario}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/90 p-4 sm:p-5 rounded-2xl border border-emerald-200">
                    <p className="text-xs font-black text-emerald-800 mb-1.5 flex items-center gap-1.5 uppercase">
                      <Check className="w-4 h-4" /> Ингэж хэлээрэй (Дэмжих зөв хандлага):
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-800 italic leading-relaxed">{trig.recommendedResponse}</p>
                  </div>

                  <div className="bg-rose-50/90 p-4 sm:p-5 rounded-2xl border border-rose-200">
                    <p className="text-xs font-black text-rose-800 mb-1.5 flex items-center gap-1.5 uppercase">
                      <AlertTriangle className="w-4 h-4" /> Бүү хэлээрэй (Бухимдлыг нэмэгдүүлнэ):
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-800 italic leading-relaxed">{trig.avoidResponse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 07 / 12: Age-Specific Guidance */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                {ageData.ageTitle} Хөгжлийн Хөтөлбөр
              </h2>
              <p className="text-xs text-zinc-500">{childProfile.name}-ийн одоогийн насны сэтгэл зүйн онцлог</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 07 / 12
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
              <span className="text-xs font-black text-sky-900">🎯 Хөгжлийн гол фокус:</span>
              <p className="text-xs sm:text-sm text-sky-950 font-medium">{ageData.developmentalFocus}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <span className="text-xs font-black text-amber-900">⚠️ Гол бэрхшээл:</span>
              <p className="text-xs sm:text-sm text-amber-950 font-medium">{ageData.topChallenge}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <span className="text-xs font-black text-emerald-900">💡 Бодит шийдэл:</span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium">{ageData.actionableTip}</p>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-2">
            <span className="text-xs font-black text-zinc-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Насны тусгай ярианы жишээ:
            </span>
            <p className="text-xs text-zinc-600">📌 <strong>Нөхцөл:</strong> {ageData.communicationScript.situation}</p>
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-emerald-900 text-xs sm:text-sm italic">
              «{ageData.communicationScript.whatToSay}»
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 08 / 12: Screen-Time 2-Minute Rule */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Дэлгэц Хураах 2 Минутын Алтан Дүрэм
              </h2>
              <p className="text-xs text-zinc-500">Утас, ТВ булаахгүйгээр тайван шилжих аргачлал</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 08 / 12
            </span>
          </div>

          <div className="bg-blue-50/70 p-5 rounded-3xl border border-blue-200 space-y-2">
            <span className="text-xs sm:text-sm font-black text-blue-950 flex items-center gap-2">
              <Tv className="w-4 h-4 text-blue-600" />
              Дэлгэц хаах 2 минутын дүрэм:
            </span>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
              Гэнэт унтраахын оронд: «Энэ бичлэг дуусмагц чи өөрөө улаан товчийг дарах уу, эсвэл хоёулаа хамт дарах уу?» гэж хүүхдэд шилжилтийн бэлтгэл олгож өөрийнх нь оролцоог хангаарай.
            </p>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 09 / 12: Bedtime Routine */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Орой Тайван Унтуулах 3 Шатлалт Дэглэм
              </h2>
              <p className="text-xs text-zinc-500">Мэдрэлийн системийг амраах зан үйл</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 09 / 12
            </span>
          </div>

          <div className="bg-indigo-50/70 p-5 rounded-3xl border border-indigo-100 space-y-2">
            <span className="text-xs sm:text-sm font-black text-indigo-950 flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" />
              {childProfile.name}-д зориулсан оройн тайвшруулах хөтөлбөр:
            </span>
            <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
              {archetype.bedtimeTip}
            </p>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 10 / 12: 4 Superpowers */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Төрөлхийн 4 Супер Хүч ба Ирээдүйн Авьяас
              </h2>
              <p className="text-xs text-zinc-500">Түүний төрөлхийн хүч чадлыг амжилт болгон хөгжүүлэх нь</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 10 / 12
            </span>
          </div>

          <div className="p-5 bg-emerald-50/60 rounded-3xl border border-emerald-200/70 space-y-3">
            <span className="text-xs sm:text-sm font-black text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Хүүхдийн гол супер хүч чадварууд:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-800">
              {archetype.superpowers.map((sp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{sp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 11 / 12: Growth & Vulnerabilities */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Хямрах Эрсдэлтэй 4 Эмзэг Бүс ба Хамгаалалт
              </h2>
              <p className="text-xs text-zinc-500">Мэдрэлийн ядаргаа, түгшүүрээс хамгаалах аргачлал</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 11 / 12
            </span>
          </div>

          <div className="p-5 bg-amber-50/60 rounded-3xl border border-amber-200/70 space-y-3">
            <span className="text-xs sm:text-sm font-black text-amber-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              Анхаарч дэмжих эмзэг бүсүүд:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-800">
              {archetype.growthAreas.map((ga, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">!</span>
                  <span>{ga}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========================================== */}
        {/* PAGE 12 / 12: Goodness-of-Fit & 7-Day Plan */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                Эцэг Эх - Хүүхдийн Зохицол ба 7 Хоногийн Дадал
              </h2>
              <p className="text-xs text-zinc-500">Goodness of Fit: Алтан дүрэм ба хэрэгжүүлэх чек-лист</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-xl border border-indigo-100">
              ХУУДАС 12 / 12
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-black text-emerald-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Эцэг эхийн баримтлах 4 Алтан Дүрэм (Хийх хэрэгтэй):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetype.parentingDos.map((pDo, i) => (
                <div key={i} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-zinc-800 flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>{pDo}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xs sm:text-sm font-black text-rose-900 flex items-center gap-2 pt-3">
              <X className="w-4 h-4 text-rose-600" />
              Хатуу хориглох 4 алдаа (Зайлсхийх зүйлс):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetype.parentingDonts.map((pDont, i) => (
                <div key={i} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5">
                  <span className="text-rose-600 font-black">✕</span>
                  <span>{pDont}</span>
                </div>
              ))}
            </div>

            {/* 7-Day Plan */}
            <div className="pt-4 space-y-3">
              <h3 className="text-xs sm:text-sm font-black text-zinc-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                7 Хоногийн Дадал Хэвшүүлэх Төлөвлөгөө:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                  <span className="font-black text-indigo-600 block mb-1">Өдөр 1–2: Шүүмжлэлгүй ажиглах</span>
                  <p className="text-zinc-600">Хүүхдийнхээ бухимдах болон баярлах триггерийг зөвхөн ажиглаж тэмдэглэх.</p>
                </div>
                <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                  <span className="font-black text-indigo-600 block mb-1">Өдөр 3–4: Мэдрэмжийг нэрлэх</span>
                  <p className="text-zinc-600">Бухимдсан үед нь "Чи одоо гомдсон байна" гэж үгээр тайлбарлаж өгөх.</p>
                </div>
                <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                  <span className="font-black text-indigo-600 block mb-1">Өдөр 5–6: 2 минутын шилжилт</span>
                  <p className="text-zinc-600">Дэлгэц хураах үед 2 минутын өмнө сануулж өөрөөр нь товчийг даруулах.</p>
                </div>
                <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                  <span className="font-black text-indigo-600 block mb-1">Өдөр 7: Бататгал & Тэврэлт</span>
                  <p className="text-zinc-600">"Би чамайг яг байгаагаар чинь хайрладаг" гэдгээ хэлж үнсэх.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-zinc-900 to-indigo-950 text-white p-8 rounded-3xl mt-6 text-center space-y-2">
            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-1" />
            <p className="text-base sm:text-lg font-black">
              «Хүүхэд тань таны хайр, ойлголцол дунд хамгийн сайхнаараа дэлбээлнэ.»
            </p>
            <p className="text-xs text-zinc-400 font-medium">
              ANZAAR Kids Хөгжлийн Сэтгэл Зүйн Баг · anzaar.mn
            </p>
          </div>
        </section>

      </div>

      {/* Bottom Delivery Actions (Email & PDF) */}
      <div className="bg-gradient-to-br from-indigo-950 via-zinc-900 to-black p-6 sm:p-8 rounded-[32px] text-white text-center space-y-4 shadow-2xl print:hidden border border-indigo-500/30">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black">
            Энэхүү 12 хуудас ном & Story зургийг и-мэйлээрээ үүрд хадгалах уу?
          </h3>
          <p className="text-xs text-zinc-300 max-w-md mx-auto">
            Утсан дээрээ хайж төөрөхгүйн тулд и-мэйл хаяг руугаа шууд илгээн үүрд найдвартай хадгалаарай.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-anzaar-500 to-rose-500 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>И-мэйлээр 12 хуудас ном & зураг авах</span>
          </button>
          
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm py-4 px-8 rounded-2xl border border-white/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75"
          >
            <Download className="w-4 h-4" />
            <span>Төхөөрөмждөө PDF татах</span>
          </button>
        </div>
      </div>

      {/* Send Email Modal */}
      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        archetype={archetype}
        childProfile={childProfile}
        scores={scores}
        invoiceId={invoiceId}
      />
    </div>
  );
};
