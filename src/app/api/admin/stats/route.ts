import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

// Force dynamic on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const data = await getAnalyticsData();
    const events = data.events || [];

    // Filter by real types
    const pageViews = data.totalVisitors || 0;
    const quizStarts = events.filter((e) => e.type === 'QUIZ_START').length;
    const quizCompletions = events.filter((e) => e.type === 'QUIZ_COMPLETE').length;
    const payments = events.filter((e) => e.type === 'PAYMENT_SUCCESS');
    const paymentInits = events.filter((e) => e.type === 'PAYMENT_INIT').length;

    // Total Real Revenue
    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 9900), 0);

    // Real Archetype Distribution
    const archetypeCounts: Record<string, { title: string; count: number }> = {
      gentle_observer: { title: 'Зөөлөн Мэдрэмжтэй Ажиглагч', count: 0 },
      energetic_pioneer: { title: 'Эрч хүчтэй Манлайлагч', count: 0 },
      focused_inquirer: { title: 'Бодлоготой Судлаач', count: 0 },
      social_radiant: { title: 'Нээлттэй Нархан', count: 0 },
      calm_harmonizer: { title: 'Тогтуун Зохицогч', count: 0 },
    };

    // Real Age Distribution
    const ageCounts: Record<string, number> = {
      toddler: 0,
      preschool: 0,
      school: 0,
      preteen: 0,
    };

    events.forEach((e) => {
      if (e.archetypeId && archetypeCounts[e.archetypeId]) {
        archetypeCounts[e.archetypeId].count += 1;
      }
      if (e.ageGroup && ageCounts[e.ageGroup] !== undefined) {
        ageCounts[e.ageGroup] += 1;
      }
    });

    // Real conversion rates
    const quizCompletionRate = pageViews > 0 ? ((quizCompletions / pageViews) * 100).toFixed(1) : '0.0';
    const paymentConversionRate = quizCompletions > 0 ? ((payments.length / quizCompletions) * 100).toFixed(1) : '0.0';

    return NextResponse.json({
      kpis: {
        totalVisitors: pageViews,
        quizStarts,
        quizCompletions,
        totalPayments: payments.length,
        totalRevenue,
        quizCompletionRate,
        paymentConversionRate,
      },
      funnel: [
        { step: 'Зочилсон (Visitors)', count: pageViews, percentage: pageViews > 0 ? 100 : 0 },
        { step: 'Сорил эхлүүлсэн (Started)', count: quizStarts, percentage: pageViews > 0 ? Math.round((quizStarts / pageViews) * 100) : 0 },
        { step: 'Оношилгоо дуусгасан (Completed)', count: quizCompletions, percentage: pageViews > 0 ? Math.round((quizCompletions / pageViews) * 100) : 0 },
        { step: 'Төлбөрийн цонх нээсэн (Checkout)', count: paymentInits, percentage: pageViews > 0 ? Math.round((paymentInits / pageViews) * 100) : 0 },
        { step: 'Хөтөч худалдан авсан (Paid)', count: payments.length, percentage: pageViews > 0 ? Math.round((payments.length / pageViews) * 100) : 0 },
      ],
      archetypeDistribution: Object.entries(archetypeCounts).map(([id, val]) => ({
        id,
        title: val.title,
        count: val.count,
      })),
      ageDistribution: ageCounts,
      recentPayments: payments.slice(0, 30),
      recentActivity: events.slice(0, 30),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
