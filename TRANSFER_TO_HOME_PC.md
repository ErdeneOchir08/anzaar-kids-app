# 🚀 ANZAAR KIDS — Төслийг Гэрийн Компьютерт Шилжүүлэх Баримт бичиг (Antigravity Context Transfer)

Энэхүү файл нь ажлын компьютерээс гэрийн компьютер дээр Antigravity болон VS Code ашиглан төслийг ямар ч саадгүй, шууд үргэлжлүүлэн хөгжүүлэхэд шаардлагатай бүх мэдээллийг агуулсан болно.

---

## 💡 Гэрийн Antigravity-д шууд өгөх Промпт (Copy & Paste Prompt)
Гэрийн компьютер дээрээ Antigravity-г нээгээд доорх текстийг шууд илгээнэ үү:

```text
Би ажлын компьютер дээрээсээ Anzaar Kids төслийг гэрийн компьютер дээрээ шилжүүлж ирлээ. 
Төслийн үндсэн хавтас доторх TRANSFER_TO_HOME_PC.md файлыг уншаад одоогийн төслийн бүтэц, 
хийгдсэн шинэчлэлтүүд болон хийгдэх дараагийн ажлуудтай танилцаж бэлэн болсноо мэдэгдэнэ үү.
```

---

## 🛠️ 1. Гэрийн Компьютер дээр Төслийг Анх Тохируулах (Setup Instructions)

### Алхам 1: Git-ээс татах (Clone repository)
Терминал (Terminal / PowerShell) нээгээд төслөө хадгалах хавтсандаа дараах тушаалыг ажиллуулна:
```bash
git clone https://github.com/ErdeneOchir08/anzaar-kids-app.git
cd anzaar-kids-app
```
*(Хэрэв өмнө нь татсан байсан бол зүгээр л `git pull origin main` хийхэд хангалттай).*

### Алхам 2: Сангуудыг суулгах (Install dependencies)
```bash
npm install
```

### Алхам 3: Орчны хувьсагч үүсгэх (.env.local setup)
Git дээр нууц түлхүүрүүд хадгалагддаггүй тул төслийн үндсэн хавтсанд `.env.local` нэртэй шинэ файл үүсгээд дотор нь дараах өгөгдлийг хуулж хадгална:

```env
# QPay 3.0 Production API
QPAY_URL=https://merchant.qpay.mn/v2
QPAY_USERNAME=MONGOL_ZURKHAI
QPAY_PASSWORD=AyLIGGqd
QPAY_INVOICE_CODE=MONGOL_ZURKHAI_INVOICE
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Upstash Redis Permanent Cloud Database
UPSTASH_REDIS_REST_URL=https://adjusted-elk-98527.upstash.io
UPSTASH_REDIS_REST_TOKEN=gQAAAAAAAYDfAAIgcDJjYzI2NDBjODk5ODU0MjI3YWEwODFkMTRiMzhlMmYwOQ

# Gmail SMTP Email Delivery
GMAIL_USER=toshi12hitsu@gmail.com
GMAIL_APP_PASSWORD=hdjoymzdklpmhlvd
```

### Алхам 4: Local Серверийг ажиллуулах
```bash
npm run dev
```
Вэб хөтөч дээрээ `http://localhost:3000` хаягаар орж шалгана.

---

## 🌐 2. Лайв Систем ба Холбоосууд (Production Links)
- **GitHub Repository**: `https://github.com/ErdeneOchir08/anzaar-kids-app.git` (Салбар: `main`)
- **Vercel Production Live URL**: [https://anzaar-kids-app.vercel.app](https://anzaar-kids-app.vercel.app)
- **Админ самбар (Real-time Analytics)**: [https://anzaar-kids-app.vercel.app/admin](https://anzaar-kids-app.vercel.app/admin)

---

## 🏗️ 3. Технологийн Бүтэц & Архитектур (Tech Stack)
- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Lucide Icons + Canvas Confetti
- **Төлбөрийн систем**: QPay 3.0 шууд интеграци (Монголын 23 банкны апп, QR код, автомат 4 секундийн polling)
- **Датабааз & Аналитик**: Upstash Redis Cloud REST API (Бүх хандалт, сорил, төлбөрийн үйл явцыг алдагдалгүй бүртгэдэг)
- **И-мэйл хүргэлт**: Nodemailer + Gmail SMTP (`toshi12hitsu@gmail.com`)
- **Зураг үүсгэгч**: `html2canvas` (Instagram/Facebook Story хэмжээтэй Passport карт)

---

## 📂 4. Төслийн Гол Хуудсууд ба Файлууд

### Хуудсууд (App Router):
1. `src/app/page.tsx`: Үндсэн нүүр хуудас (Hero, Давуу талууд, 6 Хэв шинжийн танилцуулга, FAQ, CTA).
2. `src/app/quiz/page.tsx`: 20 асуулт бүхий хүүхдийн зан төлөвийн сорил + Хүүхдийн нэр/нас/хүйсийн тохиргоо + Тооцооллын дэлгэц.
3. `src/app/result/page.tsx`: Freemium үр дүнгийн хуудас. Хүүхдийн төрөлхийн хэв шинж, 4 тэнхлэгийн үнэлгээ, Story карт, түгжээтэй бүлгүүд, 9,900₮-ийн QPay төлбөрийн модал.
4. `src/app/guide/page.tsx`: Төлбөр төлсөн хэрэглэгчдийн үзэх **12 Хуудас Бүрэн Мастер Хөтөч Ном** (`FullPlaybookView.tsx`).
5. `src/app/admin/page.tsx`: Бодит цагийн хандалт, хөрвүүлэлт, төлбөрийн тайлан харах админ хуудас.

### Гол Компонентууд:
- `src/components/payment/QPayModal.tsx`: QPay-ийн QR зураг болон Монголын 23 банкны шууд холбоос бүхий модал. 4 секунд тутам төлбөр шалгана.
- `src/components/email/SendEmailModal.tsx`: Төлбөр төлөгдсөн хэрэглэгчдэд 12 хуудас ном + Story зургийг и-мэйлээр илгээх модал.
- `src/components/result/ShareStoryCard.tsx`: Story зураг рендерлэх карт (Canvas алдаа засагдсан).
- `src/components/playbook/FullPlaybookView.tsx`: 12 хуудас номын вэб хувилбар.
- `src/lib/email/template.ts`: 12 хуудас бүхий имэйл HTML загвар.
- `src/context/QuizContext.tsx`: `localStorage`-д суурилсан хэрэглэгчийн сорил, төлбөрийн төлөв хадгалалт (Page reload тэсвэртэй).

---

## ✅ 5. Саяхан Дуусгасан Гол Ажлууд (Recently Completed)
1. **Үнийн шинэчлэл**: Бүх систем дээр 9,900₮ болгосон (19,900₮-ийг хямдрал хэлбэрээр зурж харуулсан).
2. **Story Зургийн Canvas Алдааг Зассан**: `ShareStoryCard.tsx` дээр текст градиент клип ашигласнаас үүдэж гарчиг дээр гарч байсан ягаан дөрвөлжин блокийг бүрэн арилгасан.
3. **12 Хуудас Бүрэн Хөтөч Ном**: Амласан 12 хуудсанд хүргэж, 4 тэнхлэгийн онооны задлан шинжилгээ, насны тусгай онцлог, хямралын үеийн ярианы скриптүүд, хориглох алдаанууд (Don'ts), 7 хоногийн дадал чек-листийг имэйл болон вебд бүрэн оруулсан.
4. **Гар Утасны Дизайн (Mobile UX)**: Доод хэсгийн floating action bar, эрхий хуруунд зориулсан том товчлуурууд, банкны жагсаалтын байршлыг сайжруулсан.
5. **Paid-Only И-мэйл хүргэлт**: Facebook In-App Browser дээр файл татаж авч чаддаггүй асуудлыг бүрэн шийдэж, Gmail SMTP-ээр хэрэглэгчийн и-мэйл рүү 12 хуудас ном + зургийг илгээдэг болгосон.

---

## 🎯 6. Гэрийн Компьютер дээр Хийх Боломжтой Дараагийн Ажлууд (Next Tasks)
1. **Facebook OpenGraph (OG) Зураг оруулах**:
   - Facebook пост болон Messenger дээр линк тавихад гоёмсог том зураг (1200x630) харагддаг болгохын тулд `src/app/layout.tsx` болон `src/app/opengraph-image.tsx` эсвэл `public/` хавтсанд сошиал баннер зураг тохируулах.
2. **Favicon & Апп Icon оруулах**:
   - Хөтчийн tab дээр харагдах ANZAAR лого бүхий `favicon.ico` эсвэл `icon.png` нэмэх.
3. **Facebook Pixel & Meta Ad Tracking**:
   - Хэрэв Facebook-ээр төлбөртэй сурталчилгаа (Ads) явуулах гэж байгаа бол Meta Pixel ID холбож сорил эхлүүлэлт болон төлбөр төлөлтийг хянах.
