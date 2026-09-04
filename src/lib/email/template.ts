import { Archetype, ChildProfile, DimensionId, DimensionScore } from '@/types';
import { formatAgeGroup, getGenderLabel } from '@/lib/utils';

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

  return `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${childProfile.name}-ийн Зан Төлөвийн Бүрэн Хөтөч Ном</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #27272a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f4f7;
      padding: 24px 12px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      border: 1px solid #e4e4e7;
    }
    .hero {
      background: linear-gradient(135deg, #09090b 0%, #1e1b4b 100%);
      color: #ffffff;
      padding: 40px 28px;
      text-align: center;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
    }
    .badge {
      display: inline-block;
      background-color: rgba(99, 102, 241, 0.2);
      border: 1px solid rgba(165, 180, 252, 0.3);
      color: #c7d2fe;
      font-size: 11px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 9999px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .hero-title {
      font-size: 26px;
      font-weight: 900;
      line-height: 1.25;
      margin: 0 0 10px 0;
      color: #ffffff;
    }
    .hero-highlight {
      color: #818cf8;
    }
    .hero-subtitle {
      font-size: 14px;
      color: #d4d4d8;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .tags {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tag {
      background-color: rgba(255, 255, 255, 0.12);
      color: #f4f4f5;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 8px;
    }
    .content {
      padding: 28px 24px;
    }
    .story-card-box {
      background: #fafaf9;
      border: 2px dashed #cbd5e1;
      border-radius: 20px;
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
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
      border: 1px solid #e2e8f0;
      display: block;
      margin: 0 auto;
    }
    .section {
      background-color: #ffffff;
      border: 1px solid #f1f5f9;
      border-radius: 20px;
      padding: 22px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
      margin-bottom: 16px;
    }
    .section-num {
      background-color: #e0e7ff;
      color: #4338ca;
      font-size: 13px;
      font-weight: 900;
      padding: 6px 10px;
      border-radius: 12px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 900;
      color: #18181b;
      margin: 0;
    }
    .section-desc {
      font-size: 11px;
      color: #71717a;
      margin: 2px 0 0 0;
    }
    .card-highlight {
      background-color: #f8fafc;
      border-left: 4px solid #6366f1;
      padding: 14px;
      border-radius: 8px;
      margin-bottom: 14px;
      font-size: 13px;
      line-height: 1.6;
      color: #334155;
    }
    .step-box {
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .step-title {
      font-size: 13px;
      font-weight: 900;
      color: #9f1239;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-item {
      font-size: 12.5px;
      color: #1e293b;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .step-item:last-child {
      margin-bottom: 0;
    }
    .dialogue-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
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
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      margin-bottom: 12px;
    }
    .say-box {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 10px 14px;
      border-radius: 10px;
      margin-bottom: 8px;
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
      line-height: 1.5;
      margin: 0;
    }
    .dont-say-box {
      background-color: #fff1f2;
      border: 1px solid #fecdd3;
      padding: 10px 14px;
      border-radius: 10px;
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
      line-height: 1.5;
      margin: 0;
    }
    .rule-item {
      font-size: 12.5px;
      color: #334155;
      padding: 10px 14px;
      background-color: #f8fafc;
      border-radius: 10px;
      margin-bottom: 8px;
      border: 1px solid #e2e8f0;
      line-height: 1.5;
    }
    .superpower-box {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .superpower-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #166534;
      margin-bottom: 6px;
    }
    .growth-box {
      background-color: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 14px;
    }
    .growth-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #92400e;
      margin-bottom: 6px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff !important;
      font-size: 13.5px;
      font-weight: 800;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 14px;
      text-align: center;
      margin-top: 14px;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
    }
    .footer {
      background-color: #09090b;
      color: #a1a1aa;
      text-align: center;
      padding: 30px 24px;
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
      
      <!-- HERO HEADER -->
      <div class="hero">
        <div class="badge">ANZAAR PRO · ХҮҮХДИЙН ЗАН ТӨЛӨВИЙН ХӨТӨЧ</div>
        <h1 class="hero-title">
          ${childProfile.name}-ийн Зан Төлөвийн <br>
          <span class="hero-highlight">Өсгөн Хүмүүжүүлэх Ном</span>
        </h1>
        <p class="hero-subtitle">
          «${archetype.title}» хэв шинжийн хүүхдийн мэдрэлийн системийн онцлог, бэлэн ярианы скриптүүд ба өдөр тутмын хүмүүжлийн цогц хөтөлбөр.
        </p>
        <div class="tags">
          <span class="tag">Хүүхэд: ${childProfile.name}</span>
          <span class="tag">${ageLabel}</span>
          <span class="tag">${genderLabel}</span>
          <span class="tag">Хэв шинж: ${archetype.badge}</span>
        </div>
      </div>

      <div class="content">
        
        <!-- POSTABLE STORY PASSPORT IMAGE SECTION -->
        <div class="story-card-box">
          <div class="story-card-title">📱 Instagram & Facebook Story Зураг</div>
          <div class="story-card-desc">
            Хүүхдийн тань онцлох чанарууд бүхий тусгай карт. Та энэхүү зургийг утсандаа хадгалан сошиалдаа нийтлэх эсвэл гэр бүлийн чатандаа хуваалцах боломжтой.
          </div>
          ${
            hasStoryImage
              ? `<img src="cid:story_passport" alt="${childProfile.name} Anzaar Passport" class="passport-img" />`
              : `<div style="background:#ffffff;border-radius:14px;padding:16px;font-size:12px;color:#6366f1;font-weight:bold;">
                  ✨ Зураг имэйлийн хавсралтаар давхар хавсаргагдсан болно.
                </div>`
          }
        </div>

        <!-- CHAPTER 1 -->
        <div class="section">
          <div class="section-header">
            <span class="section-num">01</span>
            <div>
              <h2 class="section-title">Тархины сэтгэл зүй ба Мэдрэлийн систем</h2>
              <p class="section-desc">Thomas & Chess болон Mary Rothbart-ийн сэтгэл зүйн загвар</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.6;color:#3f3f46;margin-top:0;">
            Хүүхдийн зан төлөв (Temperament) бол гаднаас суралцсан дадал биш, харин <strong>түүний төв мэдрэлийн системийн төрөлхийн мэдрэг байдал, өдөөлтөд үзүүлэх хариу үйлдэл</strong> юм.
          </p>
          <div class="card-highlight">
            <strong>🧠 ${childProfile.name}-ийн мэдрэлийн системийн онцлог:</strong><br>
            ${archetype.summary}
          </div>
          <div style="font-size:12.5px;color:#3f3f46;line-height:1.6;">
            <strong>Онцлох шинж чанарууд:</strong>
            <ul style="margin:8px 0 0 0;padding-left:20px;">
              ${archetype.characteristics.map(c => `<li style="margin-bottom:4px;">${c}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- CHAPTER 2 -->
        <div class="section">
          <div class="section-header">
            <span class="section-num">02</span>
            <div>
              <h2 class="section-title">Бухимдал, зөрүүдлэлтийг тайлах бэлэн үгс</h2>
              <p class="section-desc">Хүүхэд бухимдсан үед эцэг эх яг юу гэж хэлэх вэ?</p>
            </div>
          </div>
          
          <div class="step-box">
            <div class="step-title">⚡ Бухимдлыг тайлах 3 алхам:</div>
            <div class="step-item"><strong>1. Тайвшруулах (Calm):</strong> ${archetype.crisisScript.step1Calm}</div>
            <div class="step-item"><strong>2. Холбогдох (Connect):</strong> ${archetype.crisisScript.step2Connect}</div>
            <div class="step-item"><strong>3. Чиглүүлэх (Redirect):</strong> ${archetype.crisisScript.step3Redirect}</div>
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

        <!-- CHAPTER 3 -->
        <div class="section">
          <div class="section-header">
            <span class="section-num">03</span>
            <div>
              <h2 class="section-title">Дэлгэц хураах 2 минутын дүрэм & Унтуулах хөтөлбөр</h2>
              <p class="section-desc">Шилжилтийн үеийн зөрчлийг эцэслэх дадал</p>
            </div>
          </div>
          <div class="card-highlight" style="border-left-color:#3b82f6;background-color:#eff6ff;">
            <strong>📺 Дэлгэц (Утас, ТВ) хаах 2 минутын дүрэм:</strong><br>
            Гэнэт унтраахын оронд: «Энэ бичлэг дуусмагц чи өөрөө улаан товчийг дарах уу, эсвэл хоёулаа хамт дарах уу?» гэж хүүхдэд шилжилтийн бэлтгэл олгож өөрийнх нь оролцоог хангаарай.
          </div>
          <div class="card-highlight" style="border-left-color:#8b5cf6;background-color:#f5f3ff;">
            <strong>🌙 ${childProfile.name}-д зориулсан оройн унтуулах дэглэм:</strong><br>
            ${archetype.bedtimeTip}
          </div>
        </div>

        <!-- CHAPTER 4 -->
        <div class="section">
          <div class="section-header">
            <span class="section-num">04</span>
            <div>
              <h2 class="section-title">Сургууль, авьяас чадвар & Хөгжүүлэх чиглэл</h2>
              <p class="section-desc">Төрөлхийн давуу талыг амжилт болгон хөгжүүлэх нь</p>
            </div>
          </div>
          <div class="superpower-box">
            <div class="superpower-title">✨ ${childProfile.name}-ийн супер хүч чадварууд:</div>
            <ul style="margin:0;padding-left:18px;font-size:12px;color:#166534;line-height:1.6;">
              ${archetype.superpowers.map(sp => `<li>${sp}</li>`).join('')}
            </ul>
          </div>
          <div class="growth-box">
            <div class="growth-title">🛡️ Анхаарч дэмжих эмзэг бүсүүд:</div>
            <ul style="margin:0;padding-left:18px;font-size:12px;color:#92400e;line-height:1.6;">
              ${archetype.growthAreas.map(ga => `<li>${ga}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- CHAPTER 5 -->
        <div class="section">
          <div class="section-header">
            <span class="section-num">05</span>
            <div>
              <h2 class="section-title">Эцэг эх - Хүүхдийн зохицол (Goodness of Fit)</h2>
              <p class="section-desc">Харилцааны 4 алтан дүрэм</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.6;color:#3f3f46;margin-top:0;">
            «${archetype.title}» хүүхэдтэй харилцахдаа өдөр тутамдаа дараах 4 дүрмийг мөрдлөг болгоорой:
          </p>
          ${archetype.parentingDos.map(pDo => `
            <div class="rule-item">
              <strong>✦</strong> ${pDo}
            </div>
          `).join('')}
        </div>

        <!-- WEB LINK CTA -->
        <div style="text-align:center;padding:12px 0 20px 0;">
          <a href="${webAppUrl}/result" class="cta-button">
            📱 Веб дээрээс интерактив хэлбэрээр нээж үзэх
          </a>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="footer-quote">«Хүүхэд тань таны хайр, ойлголцол дунд хамгийн сайхнаараа дэлбээлнэ.»</div>
        <div>ANZAAR Kids Хөгжлийн Сэтгэл Зүйн Баг · anzaar.mn</div>
        <div style="font-size:10px;color:#71717a;margin-top:8px;">Энэхүү и-мэйл нь таны хийсэн оношилгооны баталгаажсан хуулбар болно.</div>
      </div>

    </div>
  </div>
</body>
</html>`;
}
