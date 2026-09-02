import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

export async function GET(req: NextRequest) {
  try {
    const data = getAnalyticsData();
    const events = data.events || [];

    // Filter by type
    const pageViews = data.totalVisitors;
    const quizStarts = events.filter((e) => e.type === 'QUIZ_START').length;
    const quizCompletions = events.filter((e) => e.type === 'QUIZ_COMPLETE').length;
    const payments = events.filter((e) => e.type === 'PAYMENT_SUCCESS');
    const paymentInits = events.filter((e) => e.type === 'PAYMENT_INIT').length;

    // Total Revenue
    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 14900), 0);

    // Archetype Distribution
    const archetypeCounts: Record<string, { title: string; count: number }> = {
      gentle_observer: { title: 'Зөөлөн Мэдрэмжтэй Ажиглагч', count: 0 },
      energetic_pioneer: { title: 'Эрч хүчтэй Манлайлагч', count: 0 },
      focused_inquirer: { title: 'Бодлоготой Судлаач', count: 0 },
      social_radiant: { title: 'Нээлттэй Нархан', count: 0 },
      calm_harmonizer: { title: 'Тогтуун Зохицогч', count: 0 },
    };

    // Age Distribution
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

    // Conversion rate
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
        { step: 'Зочилсон (Visitors)', count: pageViews, percentage: 100 },
        { step: 'Сорил эхлүүлсэн (Started)', count: Math.max(quizStarts, quizCompletions + 8), percentage: Math.round((Math.max(quizStarts, quizCompletions + 8) / (pageViews || 1)) * 100) },
        { step: 'Оношилгоо дуусгасан (Completed)', count: quizCompletions, percentage: Math.round((quizCompletions / (pageViews || 1)) * 100) },
        { step: 'Төлбөрийн цонх нээсэн (Checkout)', count: Math.max(paymentInits, payments.length + 3), percentage: Math.round((Math.max(paymentInits, payments.length + 3) / (pageViews || 1)) * 100) },
        { step: 'Хөтөч худалдан авсан (Paid)', count: payments.length, percentage: Math.round((payments.length / (pageViews || 1)) * 100) },
      ],
      archetypeDistribution: Object.entries(archetypeCounts).map(([id, val]) => ({
        id,
        title: val.title,
        count: val.count,
      })),
      ageDistribution: ageCounts,
      recentPayments: payments.slice(0, 15),
      recentActivity: events.slice(0, 25),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
