import type { Metadata, Viewport } from 'next';
import './globals.css';
import { QuizProvider } from '../context/QuizContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PageTracker } from '../components/analytics/PageTracker';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#8b5cf6',
};

export const metadata: Metadata = {
  title: 'ANZAAR (Анзаар) — Хүүхдийн сэтгэл зүй, зан төлөвийн ухаалаг сорил',
  description: 'Хүүхдээ хайраар анзаарч, шинжлэх ухаанчаар ойлгоё. 20 богино асуултаар хүүхдийнхээ төрөлхийн зан төлөвийг тодорхойлж, хямралыг тайлах бодит ярианы скрипттэй болоорой.',
  openGraph: {
    title: 'ANZAAR — Хүүхдийн зан төлөвийн сорил',
    description: 'Хүүхдээ үнэн зөвөөр таньж, өдөр тутмын хямралыг давах ухаалаг хөтөч',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className="overflow-x-hidden">
      <body className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col selection:bg-anzaar-200 selection:text-anzaar-900 text-zinc-900 bg-[#fafaf8]">
        <QuizProvider>
          <PageTracker />
          <Header />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
