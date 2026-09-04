import { Archetype, ChildProfile, DimensionId, DimensionScore } from '@/types';
import { formatAgeGroup, getGenderLabel } from '@/lib/utils';
import { AGE_SPECIFIC_ADVICE } from '@/data/ageSpecificAdvice';
import { DIMENSIONS } from '@/data/questions';

interface GenerateEmailOptions {
  childProfile: ChildProfile;
  archetype: Archetype;
  scores?: Record<DimensionId, DimensionScore>;
  webAppUrl?: string;
  hasStoryImage?: boolean;
}

export function generatePlaybookEmailHtml({
  childProfile,
  archetype,
  scores,
  webAppUrl = 'https://anzaar-kids-app.vercel.app',
  hasStoryImage = false,
}: GenerateEmailOptions): string {
  const ageLabel = formatAgeGroup(childProfile.ageGroup);
  const genderLabel = getGenderLabel(childProfile.gender);

  // Age guidance data
  const ageData =
    AGE_SPECIFIC_ADVICE[childProfile.ageGroup]?.[archetype.id] ||
    AGE_SPECIFIC_ADVICE.preschool[archetype.id] ||
    AGE_SPECIFIC_ADVICE.preschool.calm_harmonizer;

  // Dimension scores fallback
  const dimSensitivity = scores?.sensitivity || { percentage: 75, level: 'high', levelDescription: 'Өндөр мэдрэг: Дуу чимээ, орчны өөрчлөлт, бусдын сэтгэл хөдлөлийг гүн тусгаж авдаг.' };
  const dimEnergy = scores?.energy || { percentage: 65, level: 'moderate', levelDescription: 'Тохируулгатай эрч хүч: Тоглоомын үед идэвхтэй, гэртээ тайван амрах чадвартай.' };
  const dimAdaptability = scores?.adaptability || { percentage: 55, level: 'moderate', levelDescription: 'Аажмаар дасагч: Танил орчиндоо нээлттэй, шинэ газарт эхэндээ ажиглах дуртай.' };
  const dimRegulation = scores?.regulation || { percentage: 70, level: 'moderate', levelDescription: 'Дунд зэргийн зохицуулалттай: Тайван үедээ өөрийгөө удирддаг, ядарсан үедээ сануулга шаардлагатай.' };

  return `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${childProfile.name}-ийн Зан Төлөвийн 12 Хуудас Бүрэн Хөтөч Ном</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f3f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f3f8;
      padding: 24px 10px;
    }
    .container {
      max-width: 660px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
      border: 1px solid #e2e8f0;
    }
    .hero {
      background: linear-gradient(135deg, #09090b 0%, #1e1b4b 50%, #311042 100%);
      color: #ffffff;
      padding: 44px 28px 36px 28px;
      text-align: center;
    }
    .hero-badge {
      display: inline-block;
      background-color: rgba(129, 140, 248, 0.2);
      border: 1px solid rgba(165, 180, 252, 0.35);
      color: #e0e7ff;
      font-size: 11px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 9999px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .hero-title {
      font-size: 27px;
      font-weight: 900;
      line-height: 1.25;
      margin: 0 0 12px 0;
      color: #ffffff;
    }
    .hero-highlight {
      color: #a5b4fc;
    }
    .hero-subtitle {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.55;
      margin: 0 0 22px 0;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    .profile-chips {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .chip {
      background-color: rgba(255, 255, 255, 0.14);
      color: #f8fafc;
      font-size: 11.5px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 10px;
    }
    .content {
      padding: 28px 22px;
    }
    .story-card-box {
      background: #fafaf9;
      border: 2px dashed #cbd5e1;
      border-radius: 22px;
      padding: 20px;
      text-align: center;
      margin-bottom: 30px;
    }
    .story-card-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .story-card-desc {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    .passport-img {
      max-width: 100%;
      height: auto;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
      border: 1px solid #e2e8f0;
      display: block;
      margin: 0 auto;
    }
    .page-section {
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.02);
    }
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
      margin-bottom: 16px;
    }
    .page-num {
      background-color: #e0e7ff;
      color: #3730a3;
      font-size: 12px;
      font-weight: 900;
      padding: 5px 10px;
      border-radius: 10px;
      letter-spacing: 0.5px;
    }
    .page-title {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      margin: 0;
    }
    .page-subtitle {
      font-size: 11px;
      color: #64748b;
      margin: 2px 0 0 0;
      font-weight: 500;
    }
    .text-body {
      font-size: 13px;
      line-height: 1.65;
      color: #334155;
    }
    .info-callout {
      background-color: #f8fafc;
      border-left: 4px solid #6366f1;
      padding: 14px 16px;
      border-radius: 10px;
      margin: 14px 0;
      font-size: 13px;
      line-height: 1.6;
      color: #1e293b;
    }
    .dim-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .dim-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .dim-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
    }
    .dim-badge {
      font-size: 12px;
      font-weight: 800;
      color: #4f46e5;
    }
    .progress-bar-bg {
      width: 100%;
      height: 7px;
      background-color: #e2e8f0;
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #6366f1, #ec4899);
      border-radius: 9999px;
    }
    .step-box {
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 16px;
    }
    .step-header {
      font-size: 12.5px;
      font-weight: 900;
      color: #9f1239;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-row {
      font-size: 12.5px;
      color: #1e293b;
      margin-bottom: 8px;
      line-height: 1.55;
    }
    .dialogue-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .dialogue-title {
      font-size: 13px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .dialogue-scenario {
      font-size: 12px;
      color: #475569;
      background: #ffffff;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .say-box {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 11px 14px;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .say-label {
      font-size: 11px;
      font-weight: 800;
      color: #065f46;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .say-text {
      font-size: 12px;
      color: #064e3b;
      font-style: italic;
      line-height: 1.55;
      margin: 0;
    }
    .dont-say-box {
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      padding: 11px 14px;
      border-radius: 12px;
    }
    .dont-say-label {
      font-size: 11px;
      font-weight: 800;
      color: #9f1239;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .dont-say-text {
      font-size: 12px;
      color: #881337;
      font-style: italic;
      line-height: 1.55;
      margin: 0;
    }
    .rule-item {
      font-size: 12.5px;
      color: #334155;
      padding: 11px 14px;
      background-color: #f8fafc;
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1px solid #e2e8f0;
      line-height: 1.55;
    }
    .dont-item {
      font-size: 12.5px;
      color: #881337;
      padding: 11px 14px;
      background-color: #fff1f2;
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1px solid #fecdd3;
      line-height: 1.55;
    }
    .superpower-box {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .growth-box {
      background-color: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .checklist-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      margin-bottom: 8px;
      font-size: 12.5px;
      line-height: 1.5;
    }
    .day-badge {
      background: #4f46e5;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff !important;
      font-size: 13.5px;
      font-weight: 800;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 16px;
      text-align: center;
      margin-top: 14px;
      box-shadow: 0 4px 16px rgba(79, 70, 229, 0.35);
    }
    .footer {
      background-color: #09090b;
      color: #94a3b8;
      text-align: center;
      padding: 34px 24px;
      font-size: 12px;
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      line-height: 1.6;
    }
    .footer-quote {
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- HERO COVER -->
      <div class="hero">
        <div class="hero-badge">ANZAAR PRO · 12 ХУУДАС БҮРЭН ХӨТӨЧ НОМ</div>
        <h1 class="hero-title">
          ${childProfile.name}-ийн Зан Төлөвийн <br>
          <span class="hero-highlight">Өсгөн Хүмүүжүүлэх Ном</span>
        </h1>
        <p class="hero-subtitle">
          «${archetype.title}» хэв шинжийн хүүхдийн мэдрэлийн систем, хямралыг тайлах бэлэн ярианы скриптүүд ба 12 бүлэг цогц удирдамж.
        </p>
        <div class="profile-chips">
          <span class="chip">Хүүхэд: ${childProfile.name}</span>
          <span class="chip">${ageLabel}</span>
          <span class="chip">${genderLabel}</span>
          <span class="chip">Хэв шинж: ${archetype.badge}</span>
        </div>
      </div>

      <div class="content">
        
        <!-- VIRAL STORY PASSPORT IMAGE SECTION -->
        <div class="story-card-box">
          <div class="story-card-title">📱 Instagram & Facebook Story Зураг</div>
          <div class="story-card-desc">
            Хүүхдийн тань онцлох чанаруудыг тод харуулсан паспорт карт. Та утсандаа хадгалан сошиалдаа нийтлэх эсвэл гэр бүлийн чатандаа хуваалцаарай.
          </div>
          ${
            hasStoryImage
              ? `<img src="cid:story_passport" alt="${childProfile.name} Anzaar Passport" class="passport-img" />`
              : `<div style="background:#ffffff;border-radius:14px;padding:16px;font-size:12px;color:#4f46e5;font-weight:bold;">
                  ✨ Зураг имэйлийн хавсралтаар (PNG) хамт илгээгдсэн болно.
                </div>`
          }
        </div>

        <!-- ========================================== -->
        <!-- PAGE 01 / 12: Framework & Neurobiology -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Тархины Сэтгэл Зүй ба Мэдрэлийн Систем</h2>
              <p class="page-subtitle">Хүүхдийн төрөлхийн зан төлөвийн шинжлэх ухааны суурь</p>
            </div>
            <span class="page-num">ХУУДАС 01 / 12</span>
          </div>
          <p class="text-body">
            Хүүхдийн зан төлөв (Temperament) бол гаднаас суралцсан дур зоргын араншин биш, харин <strong>түүний төв мэдрэлийн системийн төрөлхийн мэдрэг байдал, өдөөлтөд үзүүлэх физиологи хариу үйлдэл</strong> юм. Сэтгэл судлаач Thomas & Chess болон Mary Rothbart-ийн загвараар хүүхэд бүрийн мэдрэлийн систем орчны мэдээллийг өөрийн гэсэн хурд, шүүлтүүрээр хүлээн авдаг.
          </p>
          <div class="info-callout">
            <strong>🧠 ${childProfile.name}-ийн мэдрэлийн системийн онцлог:</strong><br>
            ${archetype.summary}
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 02 / 12: Core Archetype & Motto -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">«${archetype.title}» Хэв Шинжийн Гүнзгий Тайлал</h2>
              <p class="page-subtitle">Дотоод дуу хоолой ба суурь 5 онцлог шинж чанар</p>
            </div>
            <span class="page-num">ХУУДАС 02 / 12</span>
          </div>
          <div class="info-callout" style="border-left-color:#8b5cf6;background-color:#f5f3ff;">
            <strong>💬 ${childProfile.name}-ийн дотоод дуу хоолой (Core Motto):</strong><br>
            <em>${archetype.coreMotto}</em>
          </div>
          <p class="text-body" style="font-weight:700;margin-bottom:8px;">Энэхүү хэв шинжийн 5 суурь онцлог:</p>
          <ul style="margin:0;padding-left:20px;font-size:12.5px;color:#334155;line-height:1.65;">
            ${archetype.characteristics.map((c) => `<li style="margin-bottom:6px;">${c}</li>`).join('')}
          </ul>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 03 / 12: 4-Dimensions Part 1 -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Сэтгэл Зүйн 4 Хэмжүүр: Мэдрэмж ба Эрч Хүч</h2>
              <p class="page-subtitle">Мэдрэлийн системийн өдөөлтөд үзүүлэх хариу үйлдэл</p>
            </div>
            <span class="page-num">ХУУДАС 03 / 12</span>
          </div>

          <!-- Sensitivity -->
          <div class="dim-card">
            <div class="dim-header">
              <span class="dim-title">1. Мэдрэмжийн хүлээн авалт (Sensory Sensitivity)</span>
              <span class="dim-badge">${dimSensitivity.percentage}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${dimSensitivity.percentage}%;"></div>
            </div>
            <p class="text-body" style="margin:0;font-size:12px;">
              ${dimSensitivity.levelDescription}
            </p>
          </div>

          <!-- Energy -->
          <div class="dim-card">
            <div class="dim-header">
              <span class="dim-title">2. Биеийн хөдөлгөөн ба Эрч хүч (Physical Energy)</span>
              <span class="dim-badge">${dimEnergy.percentage}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${dimEnergy.percentage}%;"></div>
            </div>
            <p class="text-body" style="margin:0;font-size:12px;">
              ${dimEnergy.levelDescription}
            </p>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 04 / 12: 4-Dimensions Part 2 -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Сэтгэл Зүйн 4 Хэмжүүр: Дасан Зохицол ба Удирдлага</h2>
              <p class="page-subtitle">Шинэ зүйл ба сэтгэл хөдлөлөө барих чадвар</p>
            </div>
            <span class="page-num">ХУУДАС 04 / 12</span>
          </div>

          <!-- Adaptability -->
          <div class="dim-card">
            <div class="dim-header">
              <span class="dim-title">3. Шинэ зүйлд дасан зохицох чадвар (Adaptability)</span>
              <span class="dim-badge">${dimAdaptability.percentage}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${dimAdaptability.percentage}%;"></div>
            </div>
            <p class="text-body" style="margin:0;font-size:12px;">
              ${dimAdaptability.levelDescription}
            </p>
          </div>

          <!-- Regulation -->
          <div class="dim-card">
            <div class="dim-header">
              <span class="dim-title">4. Сэтгэл хөдлөлийн удирдлага ба Тэвчээр (Regulation)</span>
              <span class="dim-badge">${dimRegulation.percentage}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width:${dimRegulation.percentage}%;"></div>
            </div>
            <p class="text-body" style="margin:0;font-size:12px;">
              ${dimRegulation.levelDescription}
            </p>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 05 / 12: Crisis Protocol -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Хямралыг Тайлах 3 Алхамт Протокол</h2>
              <p class="page-subtitle">Хүүхэд бухимдаж, уурлаж, зөрүүдэлсэн үед барих дэс дараалал</p>
            </div>
            <span class="page-num">ХУУДАС 05 / 12</span>
          </div>

          <div class="step-box">
            <div class="step-header">⚡ Бухимдлыг дарах 3 шатлалт дүрэм:</div>
            <div class="step-row">
              <strong>1. Тайвшруулах (Calm):</strong> ${archetype.crisisScript.step1Calm}
            </div>
            <div class="step-row">
              <strong>2. Холбогдох (Connect):</strong> ${archetype.crisisScript.step2Connect}
            </div>
            <div class="step-row">
              <strong>3. Чиглүүлэх (Redirect):</strong> ${archetype.crisisScript.step3Redirect}
            </div>
          </div>
          <p class="text-body" style="font-size:12px;color:#64748b;">
            💡 <em>Сэтгэл зүйчийн зөвлөгөө: Хүүхэд бухимдаж байх үед уураар дарах эсвэл логик тайлбар хийх нь тархины амигдалаг улам цочроодог. Эхлээд сэтгэл хөдлөлийг нь аюулгүй гаргах боломж олгоорой.</em>
          </p>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 06 / 12: Word-for-Word Scripts -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Бодит Амьдралын Бэлэн Ярианы Скриптүүд</h2>
              <p class="page-subtitle">Өдөр тутмын 3 хямрал дээр «Ингэж хэлээрэй» vs «Бүү хэлээрэй»</p>
            </div>
            <span class="page-num">ХУУДАС 06 / 12</span>
          </div>

          ${archetype.dailyTriggers.map((trig, idx) => `
            <div class="dialogue-card">
              <div class="dialogue-title">💬 Нөхцөл байдал ${idx + 1}: ${trig.title}</div>
              <div class="dialogue-scenario">📌 <strong>Бодит жишээ:</strong> ${trig.scenario}</div>
              <div class="say-box">
                <div class="say-label">✓ Ингэж хэлээрэй (Дэмжих хандлага):</div>
                <div class="say-text">"${trig.recommendedResponse}"</div>
              </div>
              <div class="dont-say-box">
                <div class="dont-say-label">✕ Бүү хэлээрэй (Бухимдлыг өсгөнө):</div>
                <div class="dont-say-text">"${trig.avoidResponse}"</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- ========================================== -->
        <!-- PAGE 07 / 12: Age-Specific Roadmap -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">${ageData.ageTitle} Хөгжлийн Хөтөлбөр</h2>
              <p class="page-subtitle">${childProfile.name}-ийн одоогийн насны сэтгэл зүйн онцлог</p>
            </div>
            <span class="page-num">ХУУДАС 07 / 12</span>
          </div>

          <div class="info-callout" style="border-left-color:#0284c7;background-color:#f0f9ff;">
            <strong>🎯 Хөгжлийн гол фокус:</strong><br>
            ${ageData.developmentalFocus}
          </div>

          <div class="info-callout" style="border-left-color:#ea580c;background-color:#fff7ed;">
            <strong>⚠️ Энэ насанд тулгардаг хамгийн том бэрхшээл:</strong><br>
            ${ageData.topChallenge}
          </div>

          <div class="info-callout" style="border-left-color:#16a34a;background-color:#f0fdf4;">
            <strong>💡 Эцэг эхэд зориулсан бодит шийдэл:</strong><br>
            ${ageData.actionableTip}
          </div>

          <div class="dialogue-card" style="margin-top:14px;">
            <div class="dialogue-title">🗣️ Насны тусгай ярианы скрипт:</div>
            <div class="dialogue-scenario">📌 <strong>Нөхцөл:</strong> ${ageData.communicationScript.situation}</div>
            <div class="say-box">
              <div class="say-label">✓ Хүүхдэдээ хэлэх үг:</div>
              <div class="say-text">${ageData.communicationScript.whatToSay}</div>
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 08 / 12: Screen-Time Rule -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Дэлгэц Хураах 2 Минутын Алтан Дүрэм</h2>
              <p class="page-subtitle">Утас, ТВ булаахгүйгээр тайван шилжих аргачлал</p>
            </div>
            <span class="page-num">ХУУДАС 08 / 12</span>
          </div>

          <div class="info-callout" style="border-left-color:#3b82f6;background-color:#eff6ff;">
            <strong>📺 Дэлгэц хаах 2 минутын дүрэм:</strong><br>
            Гэнэт булааж унтраахын оронд: «Энэ бичлэг дуусмагц чи өөрөө улаан товчийг дарах уу, эсвэл хоёулаа хамт дарах уу?» гэж хүүхдэд шилжилтийн 2 минутын бэлтгэл олгож өөрийнх нь оролцоог хангаарай.
          </div>
          <p class="text-body">
            Хүүхдийн тархи дэлгэц үзэж байх үед их хэмжээний допамин ялгаруулдаг. Гэнэт таслах үед мэдрэлийн систем "цочрол"-д орж бухимдал үүсдэг. Харин урьдчилан 2 минутын сануулга өгч, товчийг өөрөөр нь даруулах нь түүнд хяналт мэдрүүлдэг.
          </p>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 09 / 12: Bedtime Routine -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Орой Тайван Унтуулах 3 Шатлалт Дэглэм</h2>
              <p class="page-subtitle">Мэдрэлийн системийг унтраах үдшийн зан үйл</p>
            </div>
            <span class="page-num">ХУУДАС 09 / 12</span>
          </div>

          <div class="info-callout" style="border-left-color:#8b5cf6;background-color:#f5f3ff;">
            <strong>🌙 ${childProfile.name}-д зориулсан оройн тайвшруулах хөтөлбөр:</strong><br>
            ${archetype.bedtimeTip}
          </div>

          <div class="step-box" style="background-color:#f8fafc;border-color:#e2e8f0;">
            <div class="step-header" style="color:#4338ca;">🛌 Үдшийн 3 алхамт унтуулах дараалал:</div>
            <div class="step-row">
              <strong>1. Мэдрэхүйн гэрлийг бүдгэрүүлэх (Унтахаас 45 минутын өмнө):</strong> Хурц гэрэл, дэлгэцийг унтрааж, зөөлөн шар гэрэл асаах.
            </div>
            <div class="step-row">
              <strong>2. Биеийг тайвшруулах мэдрэмж:</strong> Бүлээн усанд орох эсвэл хөлийг нь зөөлөн илэх.
            </div>
            <div class="step-row">
              <strong>3. Сэтгэл зүйн аюулгүй холбоо:</strong> Өдрийн хамгийн гоё 1 дурсамжийг ярилцаж, тэврээд унтуулах.
            </div>
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 10 / 12: Superpowers & Potential -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Төрөлхийн 4 Супер Хүч ба Ирээдүйн Авьяас</h2>
              <p class="page-subtitle">Түүний төрөлхийн хүч чадлыг амжилт болгон хөгжүүлэх нь</p>
            </div>
            <span class="page-num">ХУУДАС 10 / 12</span>
          </div>

          <div class="superpower-box">
            <div style="font-size:13px;font-weight:900;color:#166534;margin-bottom:10px;">
              ✨ ${childProfile.name}-ийн байгалийн хосгүй чадварууд:
            </div>
            <ul style="margin:0;padding-left:20px;font-size:12.5px;color:#14532d;line-height:1.7;">
              ${archetype.superpowers.map((sp) => `<li style="margin-bottom:6px;"><strong>✓</strong> ${sp}</li>`).join('')}
            </ul>
          </div>
          <p class="text-body" style="font-size:12.5px;">
            Эдгээр давуу талууд нь хүүхдийн ирээдүйн мэргэжил сонголт, нийгэм дэх амжилт, манлайллын үндэс суурь болно. Түүнийг бусад хүүхэдтэй бүү харьцуулаарай.
          </p>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 11 / 12: Growth & Vulnerabilities -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Хямрах Эрсдэлтэй 4 Эмзэг Бүс ба Хамгаалалт</h2>
              <p class="page-subtitle">Мэдрэлийн ядаргаа, түгшүүрээс урьдчилан хамгаалах аргачлал</p>
            </div>
            <span class="page-num">ХУУДАС 11 / 12</span>
          </div>

          <div class="growth-box">
            <div style="font-size:13px;font-weight:900;color:#92400e;margin-bottom:10px;">
              🛡️ Анхааран дэмжих эмзэг бүсүүд:
            </div>
            <ul style="margin:0;padding-left:20px;font-size:12.5px;color:#78350f;line-height:1.7;">
              ${archetype.growthAreas.map((ga) => `<li style="margin-bottom:6px;"><strong>!</strong> ${ga}</li>`).join('')}
            </ul>
          </div>
          <p class="text-body" style="font-size:12.5px;">
            Эмзэг бүс бол сул тал биш. Эцэг эхийн зөв дэмжлэгтэйгээр энэ нь хүүхдийн хамгийн бат бөх тэсвэр тэвчээр болж төлөвшдөг.
          </p>
        </div>

        <!-- ========================================== -->
        <!-- PAGE 12 / 12: Goodness-of-Fit & 7-Day Plan -->
        <!-- ========================================== -->
        <div class="page-section">
          <div class="page-header">
            <div>
              <h2 class="page-title">Эцэг Эх - Хүүхдийн Зохицол ба 7 Хоногийн Дадал</h2>
              <p class="page-subtitle">Goodness of Fit: Алтан дүрмүүд ба өдөр тутмын хяналтын чек-лист</p>
            </div>
            <span class="page-num">ХУУДАС 12 / 12</span>
          </div>

          <p class="text-body" style="font-weight:700;margin-bottom:8px;">✦ Эцэг эхийн баримтлах 4 Алтан Дүрэм (Хийх хэрэгтэй):</p>
          ${archetype.parentingDos.map((pDo) => `
            <div class="rule-item">
              <strong>✓</strong> ${pDo}
            </div>
          `).join('')}

          <p class="text-body" style="font-weight:700;margin:18px 0 8px 0;color:#9f1239;">✕ Хатуу хориглох 4 алдаа (Зайлсхийх зүйлс):</p>
          ${archetype.parentingDonts.map((pDont) => `
            <div class="dont-item">
              <strong>✕</strong> ${pDont}
            </div>
          `).join('')}

          <div style="margin-top:22px;">
            <p class="text-body" style="font-weight:800;margin-bottom:10px;color:#0f172a;">
              📅 7 Хоногийн Дадал Хэвшүүлэх Төлөвлөгөө:
            </p>
            <div class="checklist-row">
              <span class="day-badge">ӨДӨР 1–2</span>
              <span><strong>Шүүмжлэлгүй ажиглах:</strong> Хүүхдээ ямар нөхцөлд хамгийн их бухимдаж эсвэл баярлаж буйг тэмдэглэх.</span>
            </div>
            <div class="checklist-row">
              <span class="day-badge">ӨДӨР 3–4</span>
              <span><strong>Мэдрэмжийг нь нэрлэх:</strong> "Чи одоо ууртай байна", "Чи ядарсан байна" гэж сэтгэл хөдлөлийг нь үгээр илэрхийлж өгөх.</span>
            </div>
            <div class="checklist-row">
              <span class="day-badge">ӨДӨР 5–6</span>
              <span><strong>2 минутын шилжилт:</strong> Дэлгэц болон тоглоомоо хураах үед 2 минутын өмнө сануулж, өөрөөр нь шилжүүлэх.</span>
            </div>
            <div class="checklist-row">
              <span class="day-badge">ӨДӨР 7</span>
              <span><strong>Бататгал & Хайрын тэврэлт:</strong> Хүүхдэдээ "Би чамайг яг байгаагаар чинь хайрладаг" гэдгээ хэлж үнсэх.</span>
            </div>
          </div>
        </div>

        <!-- WEB LINK CTA -->
        <div style="text-align:center;padding:12px 0 24px 0;">
          <a href="${webAppUrl}/result" class="cta-button">
            📱 Веб дээрээс интерактив хэлбэрээр нээж үзэх ➔
          </a>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="footer-quote">«Хүүхэд тань таны хайр, ойлголцол дунд хамгийн сайхнаараа дэлбээлнэ.»</div>
        <div>ANZAAR Kids Хөгжлийн Сэтгэл Зүйн Баг · anzaar.mn</div>
        <div style="font-size:11px;color:#64748b;margin-top:8px;">Энэхүү 12 хуудас хөтөч ном нь таны худалдан авсан баталгаажсан хуулбар болно.</div>
      </div>

    </div>
  </div>
</body>
</html>`;
}
