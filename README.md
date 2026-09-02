# 🌟 Kynd Nurture+ — Хүүхдийн Зан Төлөв & Сэтгэл Хөдлөлийн Оношилгооны Платформ

Монгол эцэг эхчүүдэд зориулсан, хүүхдийн төрөлхийн зан төлөв (Temperament) болон сэтгэл зүйн онцлогийг тодорхойлох **Mobile-First V1 Production-Ready** веб аппликейшн.

---

## ✨ Онцлог давуу талууд

1. **4 Тэнхлэгт Сэтгэл Зүйн Матриц**:
   - Сэтгэл хөдлөлийн мэдрэг байдал (Sensitivity & Reactivity)
   - Өөрийгөө удирдах чадвар & Тэвчээр (Self-Regulation & Persistence)
   - Нийгэмших эрч хүч & Дасан зохицол (Social Energy & Adaptability)
   - Хөдөлгөөний эрч хүч & Санаачилга (Activity Level & Agency)

2. **5 Зан Төлөвийн Хэв Шинж (Archetypes)**:
   - 🌿 **Зөөлөн Мэдрэмжтэй Ажиглагч** (The Gentle Observer)
   - ⚡ **Эрч хүчтэй Манлайлагч** (The Energetic Pioneer)
   - 🔍 **Бодлоготой Судлаач** (The Focused Inquirer)
   - ☀️ **Нээлттэй Нархан** (The Social Radiant)
   - 🌊 **Тогтуун Зохицогч** (The Calm Harmonizer)

3. **Бизнес & Борлуулалтын Модель (Freemium Conversion Funnel)**:
   - **Үнэгүй хэсэг**: Хүүхдийн үндсэн хэв шинж, 4 тэнхлэгийн радар график, супер давуу талууд, Instagram Story зураг үүсгэгч.
   - **Төлбөртэй хэсэг (14,900₮)**: 12+ хуудас бүхий хувьчилсан гарын авлага, хямралын үеийн бэлэн ярианы скриптүүд, орой тайван унтуулах протокол, хэвлэх боломжтой PDF.

4. **Монголын Банкуудын Төлбөрийн Систем (QPay)**:
   - QPay 3.0 QR код болон Хаан Банк, SocialPay, Голомт, Төрийн Банк, ХХБ, Хас Банкны апп руу шууд үсрэх товчлуурууд.
   - Тестийн үед шууд турших баталгаажуулалтын систем.

---

## 🚀 Төслийг ажиллуулах (Quick Start)

### 1. Хөгжүүлэлтийн горимд ажиллуулах
```bash
npm run dev
```
Хөтөч дээрээ [http://localhost:3000](http://localhost:3000) хаягаар орж үзнэ үү.

### 2. Продакшн хувилбарыг бүтээх & шалгах
```bash
npm run build
npm start
```

---

## 📁 Бүтэц (Project Architecture)

```
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, Header & Footer, QuizProvider
│   │   ├── page.tsx           # Нүүр хуудас (Landing Page)
│   │   ├── quiz/page.tsx      # 20 асуулт бүхий интерактив сорил
│   │   ├── result/page.tsx    # Оношилгооны үр дүн, радар диаграмм, QPay модал
│   │   ├── guide/page.tsx     # 12+ хуудас бүрэн гарын авлага & PDF хэвлэх
│   │   └── privacy/page.tsx   # Нууцлалын бодлого
│   ├── components/
│   │   ├── landing/           # Hero, Benefits, Archetypes, Reviews, FAQ
│   │   ├── quiz/              # ProfileSetup, QuestionCard, ProgressBar, Calculating
│   │   ├── result/            # ArchetypeHeader, DimensionBreakdown, ShareCard, Paywall
│   │   ├── payment/           # QPayModal (QR & Bank buttons)
│   │   ├── playbook/          # FullPlaybookView (Tantrum scripts & bedtime routines)
│   │   └── charts/            # RadarChart (SVG), DimensionBarChart
│   ├── context/
│   │   └── QuizContext.tsx    # Global state & LocalStorage persistence
│   ├── data/
│   │   ├── questions.ts       # 20 асуулт ба тэнхлэгийн тохиргоо
│   │   └── archetypes.ts      # 5 хэв шинжийн монгол тайлбар, зөвлөмжүүд
│   ├── lib/
│   │   ├── scoringEngine.ts   # Сэтгэл зүйн оношилгоо, радар онооны алгоритм
│   │   └── utils.ts           # Туслах функцууд
│   └── types/
│       └── index.ts           # TypeScript интерфэйсүүд
```

---

## 🛠️ Цаашид нэмэх боломжууд
- [ ] Бодит QPay API merchant credentials тохируулах (`.env.local`)
- [ ] Meta Pixel болон Google Analytics ID-гаа `layout.tsx`-д байршуулах
- [ ] Vercel дээр 1-товчлуураар deploy хийх
